<?php

namespace App\Http\Controllers;

use App\Models\Video;
use App\Models\VideoCategory;
use Illuminate\Http\Request;
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
            new Middleware('permission:manage videos', except: ['index', 'show']),
        ];
    }

    public function index(Request $request): Response
    {
        $query = Video::with(['categories', 'author']);

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $filter = $request->input('filter', 'recent');

        match ($filter) {
            'trending' => $query->where('is_featured', true)->orderBy('created_at', 'desc'),
            'all' => $query->orderBy('created_at', 'desc'),
            default => $query->orderBy('created_at', 'desc'),
        };

        $videos = $query->paginate(12)->withQueryString();

        return Inertia::render('videos/Index', [
            'videos' => $videos,
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
        return Inertia::render('videos/Show', [
            'video' => $video->load(['categories', 'author']),
            'relatedVideos' => Video::where('id', '!=', $video->id)->limit(4)->get()
        ]);
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
