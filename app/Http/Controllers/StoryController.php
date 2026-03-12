<?php

namespace App\Http\Controllers;

use App\Models\Story;
use App\Models\StoryLike;
use App\Models\StoryComment;
use App\Models\StoryImage;
use App\Models\StoryView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class StoryController extends Controller
{
    public function index()
    {
        $stories = Story::with(['user', 'likes', 'comments.user', 'images'])
            ->latest()
            ->get();

        if (request()->header('X-Inertia')) {
            return redirect()->route('dashboard');
        }

        // Increment views for the stories being served
        Story::whereIn('id', $stories->pluck('id'))->increment('views_count');

        $formattedStories = $stories->map(function ($story) {
            return [
                'id' => $story->id,
                'title' => $story->title,
                'description' => $story->description,
                'content_url' => $story->content_url,
                'images' => $story->images->map(fn($img) => $img->image_url),
                'likes_count' => $story->likes->count(),
                'is_liked' => auth()->check() ? $story->isLikedBy(auth()->user()) : false,
                'is_viewed' => auth()->check() ? $story->isViewedBy(auth()->user()) : false,
                'comments' => $story->comments->map(function ($comment) {
                    return [
                        'id' => $comment->id,
                        'content' => $comment->content,
                        'user' => [
                            'name' => $comment->user->name,
                            'avatar' => $comment->user->avatar ?? 'https://api.dicebear.com/7.x/avataaars/svg?seed=' . $comment->user->name,
                        ],
                        'created_at' => $comment->created_at->diffForHumans(),
                    ];
                }),
                'author' => [
                    'name' => $story->user->name,
                    'avatar' => $story->user->avatar ?? 'https://api.dicebear.com/7.x/avataaars/svg?seed=' . $story->user->name,
                ],
                'created_at' => $story->created_at->diffForHumans(),
            ];
        });

        return response()->json($stories);
    }

    public function update(Request $request, Story $story)
    {
        if ($story->user_id !== auth()->id() && !auth()->user()->hasRole('admin')) {
            abort(403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'deleted_image_ids' => 'nullable|array',
            'deleted_image_ids.*' => 'integer',
            'images' => 'nullable|array',
            'images.*' => 'image|max:5120',
        ]);

        $story->update([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        // Process deletions
        if ($request->has('deleted_image_ids')) {
            foreach ($request->deleted_image_ids as $id) {
                $image = StoryImage::where('story_id', $story->id)->find($id);
                if ($image) {
                    // Use getRawOriginal to get the path without the accessor's URL prefix
                    $path = $image->getRawOriginal('image_url');
                    Storage::disk('public')->delete($path);
                    $image->delete();
                }
            }
        }

        // Process new uploads
        if ($request->hasFile('images')) {
            $lastOrder = $story->images()->max('order') ?? -1;
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('stories', 'public');
                StoryImage::create([
                    'story_id' => $story->id,
                    'image_url' => $path,
                    'order' => $lastOrder + $index + 1,
                ]);
            }
        }

        // Update content_url if it was pointing to a deleted image or needs refresh
        $firstImage = $story->fresh()->images()->orderBy('order')->first();
        if ($firstImage) {
            $story->update(['content_url' => $firstImage->getRawOriginal('image_url')]);
        }

        return back()->with('success', 'Story updated successfully!');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'images' => 'required|array|min:1',
            'images.*' => 'image|max:5120', // 5MB
        ]);

        $imagePaths = [];
        foreach ($request->file('images') as $index => $image) {
            $path = $image->store('stories', 'public');
            $imagePaths[] = [
                'url' => $path,
                'order' => $index
            ];
        }

        $story = Story::create([
            'title' => $request->title,
            'description' => $request->description,
            'slug' => Str::slug($request->title) . '-' . Str::random(5),
            'content_url' => $imagePaths[0]['url'],
            'user_id' => auth()->id(),
        ]);

        foreach ($imagePaths as $img) {
            StoryImage::create([
                'story_id' => $story->id,
                'image_url' => $img['url'],
                'order' => $img['order'],
            ]);
        }

        return back()->with('success', 'Story created successfully!');
    }

    public function like(Story $story)
    {
        $like = StoryLike::where('user_id', auth()->id())
            ->where('story_id', $story->id)
            ->first();

        if ($like) {
            $like->delete();
        } else {
            StoryLike::create([
                'user_id' => auth()->id(),
                'story_id' => $story->id,
            ]);
        }

        if (auth()->check()) {
            StoryView::updateOrCreate(
                ['user_id' => auth()->id(), 'story_id' => $story->id]
            )->touch();
        }

        return back();
    }

    public function comment(Request $request, Story $story)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        StoryComment::create([
            'user_id' => auth()->id(),
            'story_id' => $story->id,
            'content' => $request->content,
        ]);

        if (auth()->check()) {
            StoryView::updateOrCreate(
                ['user_id' => auth()->id(), 'story_id' => $story->id]
            )->touch();
        }

        return back();
    }

    public function destroy(Story $story)
    {
        if ($story->user_id !== auth()->id() && !auth()->user()->hasRole('admin')) {
            abort(403);
        }

        // Delete associated images from storage if necessary
        foreach ($story->images as $image) {
            $path = str_replace('/storage/', '', $image->image_url);
            Storage::disk('public')->delete($path);
        }

        $story->delete();

        return back()->with('success', 'Historia eliminada correctamente');
    }

    public function markAsViewed(Story $story)
    {
        if (auth()->check()) {
            StoryView::updateOrCreate(
                ['user_id' => auth()->id(), 'story_id' => $story->id]
            )->touch();
        }

        return back()->with('success', 'Historia marcada como vista');
    }
}
