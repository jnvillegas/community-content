<?php

namespace App\Http\Controllers;

use App\Models\Video;
use App\Models\VideoCategory;
use Illuminate\Http\Request;
use App\Models\VideoLike;
use App\Models\VideoComment;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class VideoController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:manage videos', except: ['index', 'show', 'gallery', 'toggleLike', 'storeComment']),
            new Middleware('permission:view video gallery', only: ['gallery']),
            new Middleware('auth', only: ['toggleLike', 'storeComment']),
        ];
    }

    public function gallery(): Response
    {
        $videos = Video::with(['author', 'categories'])->latest()->get();

        return Inertia::render('videos/Gallery', [
            'videos' => $videos
        ]);
    }

    public function index(Request $request): Response
    {
        $query = Video::with(['author', 'categories'])
            ->withCount(['likes', 'comments'])
            ->latest();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $filter = $request->input('filter', 'recent');

        if ($filter === 'trending') {
            $query->where('is_featured', true);
        }

        $videos = $query->paginate(12)->withQueryString();

        $stats = [
            'total_videos' => Video::count(),
            'total_likes' => VideoLike::whereHas('video')->count(),
            'total_comments' => VideoComment::whereHas('video')->count(),
            'total_views' => 0, // Placeholder as views_count is not in schema yet
        ];

        $recentComments = VideoComment::whereHas('video')
            ->with(['user', 'video'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($comment) {
                return [
                    'id' => $comment->id,
                    'content' => $comment->content,
                    'user' => [
                        'name' => $comment->user->name,
                        'avatar' => $comment->user->profile_photo_url,
                    ],
                    'video_title' => $comment->video->title ?? 'Video eliminado',
                    'created_at' => $comment->created_at->diffForHumans(),
                ];
            });

        return Inertia::render('videos/Index', [
            'videos' => $videos,
            'stats' => $stats,
            'recentComments' => $recentComments,
            'filters' => $request->only(['search', 'filter'])
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('videos/Create', [
            'categories' => VideoCategory::all()
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'youtube_id' => 'required|string',
            'description' => 'nullable|string',
            'duration' => 'nullable|string',
            'location' => 'nullable|string',
            'location_url' => 'nullable|url',
            'status' => 'required|in:draft,published,private',
            'thumbnail_url' => 'nullable|string',
            'categories' => 'array',
        ]);

        $video = Video::create([
            'title' => $validated['title'],
            'youtube_id' => $validated['youtube_id'],
            'description' => $validated['description'],
            'duration' => $validated['duration'],
            'location' => $validated['location'],
            'location_url' => $validated['location_url'] ?? null,
            'status' => $validated['status'],
            'thumbnail_url' => $validated['thumbnail_url'],
            'author_id' => auth()->id(),
        ]);

        if (!empty($validated['categories'])) {
            $video->categories()->attach($validated['categories']);
        }

        return redirect()->route('videos.index')->with('success', 'Video cargado correctamente.');
    }

    public function show(Video $video): Response
    {
        $video->load(['categories', 'author', 'comments.user']);
        $video->loadCount(['likes', 'comments']);
        
        $video->is_liked = auth()->check() ? $video->isLikedBy(auth()->user()) : false;

        return Inertia::render('videos/Show', [
            'video' => $video,
            'relatedVideos' => Video::where('id', '!=', $video->id)->limit(4)->get()
        ]);
    }

    public function toggleLike(Video $video): RedirectResponse
    {
        $user = auth()->user();
        $like = $video->likes()->where('user_id', $user->id)->first();

        if ($like) {
            $like->delete();
        } else {
            $video->likes()->create(['user_id' => $user->id]);
        }

        return back();
    }

    public function storeComment(Request $request, Video $video): RedirectResponse
    {
        $validated = $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $video->comments()->create([
            'user_id' => auth()->id(),
            'content' => $validated['content'],
        ]);

        return back();
    }

    public function edit(Video $video): Response
    {
        return Inertia::render('videos/Edit', [
            'video' => $video->load('categories'),
            'categories' => VideoCategory::all()
        ]);
    }

    public function update(Request $request, Video $video): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'youtube_id' => 'required|string',
            'description' => 'nullable|string',
            'duration' => 'nullable|string',
            'location' => 'nullable|string',
            'location_url' => 'nullable|url',
            'status' => 'required|in:draft,published,private',
        ]);

        $video->update($validated);
        $video->categories()->sync($request->categories ?? []);

        return redirect()->route('videos.index')->with('success', 'Video actualizado.');
    }

    public function destroy(Video $video): RedirectResponse
    {
        $video->delete();
        return redirect()->route('videos.index')->with('success', 'Video eliminado.');
    }
}
