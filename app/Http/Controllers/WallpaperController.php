<?php

namespace App\Http\Controllers;

use App\Models\Wallpaper;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class WallpaperController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:manage wallpapers', except: ['index', 'show', 'download']),
        ];
    }

    /**
     * Display a listing of wallpapers for admin panel.
     */
    public function index(): Response
    {
        $wallpapers = Wallpaper::with('author')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('wallpapers/Index', [
            'wallpapers' => $wallpapers,
        ]);
    }

    /**
     * Show the form for creating a new wallpaper.
     */
    public function create(): Response
    {
        return Inertia::render('wallpapers/Create');
    }

    /**
     * Store a newly created wallpaper in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:wallpapers,slug',
            'alt' => 'nullable|string',
            'src' => 'nullable|string', // Make nullable to allow file upload replacement
            'image_file' => 'nullable|image|max:10240', // 10MB limit
            'is_locked' => 'boolean',
            'lock_text' => 'nullable|string|max:255',
            'lock_subtitle' => 'nullable|string|max:255',
            'category' => 'required|in:mobile,desktop,both',
            'resolution' => 'nullable|string|max:50',
            'file_size' => 'nullable|string|max:50',
            'is_featured' => 'boolean',
            'status' => 'required|in:draft,published,archived',
            'published_at' => 'nullable|date',
        ]);

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('wallpapers', 'public');
            $validated['src'] = '/storage/' . $path;
        }

        if (empty($validated['src'])) {
            return back()->withErrors(['src' => 'Please provide an Image URL or upload a file.']);
        }

        $validated['author_id'] = auth()->id();

        Wallpaper::create($validated);

        return redirect()->route('wallpapers.index')
            ->with('success', 'Wallpaper creado exitosamente.');
    }

    /**
     * Display the specified wallpaper.
     */
    public function show(Wallpaper $wallpaper): Response
    {
        $wallpaper->load('author');

        return Inertia::render('wallpapers/Show', [
            'wallpaper' => $wallpaper,
        ]);
    }

    /**
     * Show the form for editing the specified wallpaper.
     */
    public function edit(Wallpaper $wallpaper): Response
    {
        return Inertia::render('wallpapers/Edit', [
            'wallpaper' => $wallpaper,
        ]);
    }

    public function update(Request $request, Wallpaper $wallpaper): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:wallpapers,slug,' . $wallpaper->id,
            'alt' => 'nullable|string',
            'src' => 'nullable|string',
            'image_file' => 'nullable|image|max:10240',
            'is_locked' => 'boolean',
            'lock_text' => 'nullable|string|max:255',
            'lock_subtitle' => 'nullable|string|max:255',
            'category' => 'required|in:mobile,desktop,both',
            'resolution' => 'nullable|string|max:50',
            'file_size' => 'nullable|string|max:50',
            'is_featured' => 'boolean',
            'status' => 'required|in:draft,published,archived',
            'published_at' => 'nullable|date',
        ]);

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('wallpapers', 'public');
            $validated['src'] = '/storage/' . $path;
        }

        // If src is still empty (and no new file), keep original src? 
        // Typically update request might send 'src' as existing string.
        // If 'src' is null from form but we didn't upload file, we might lose image if not careful.
        // Frontend should send existing 'src' if not changing, or we should handle logic here.
        if (empty($validated['src']) && !$request->hasFile('image_file')) {
            // Keep existing src if nothing provided (optional fail-safe)
            $validated['src'] = $wallpaper->src;
        }

        $wallpaper->update($validated);

        return redirect()->route('wallpapers.index')
            ->with('success', 'Wallpaper actualizado exitosamente.');
    }

    /**
     * Remove the specified wallpaper from storage.
     */
    public function destroy(Wallpaper $wallpaper): RedirectResponse
    {
        $wallpaper->delete();

        return redirect()->route('wallpapers.index')
            ->with('success', 'Wallpaper eliminado exitosamente.');
    }

    /**
     * Download a wallpaper and increment download count.
     */
    public function download(Wallpaper $wallpaper): RedirectResponse
    {
        // Increment download counter
        $wallpaper->incrementDownloads();

        // Redirect to the image URL for download
        return redirect($wallpaper->src);
    }
}

