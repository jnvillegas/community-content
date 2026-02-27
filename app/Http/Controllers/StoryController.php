<?php

namespace App\Http\Controllers;

use App\Models\Story;
use App\Models\StoryLike;
use App\Models\StoryComment;
use App\Models\StoryImage;
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
                'url' => Storage::url($path),
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
}
