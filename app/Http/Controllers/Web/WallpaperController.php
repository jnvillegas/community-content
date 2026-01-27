<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Wallpaper;
use Inertia\Inertia;

class WallpaperController extends Controller
{
    /**
     * Display wallpapers for the public page.
     */
    public function index()
    {
        $wallpapers = Wallpaper::where('status', 'published')
            ->latest('created_at')
            ->paginate(12)
            ->through(function ($wallpaper) {
                return [
                    'id' => $wallpaper->id,
                    'title' => $wallpaper->title,
                    'slug' => $wallpaper->slug,
                    'alt' => $wallpaper->alt,
                    'src' => $wallpaper->src,

                    'is_locked' => (bool) $wallpaper->is_locked,
                    'lock_text' => $wallpaper->lock_text,
                    'lock_subtitle' => $wallpaper->lock_subtitle,

                    'category' => $wallpaper->category,
                    'downloads' => $wallpaper->downloads_count,
                    'is_featured' => (bool) $wallpaper->is_featured,

                    'published_at' => optional($wallpaper->published_at)
                        ?->format('d M Y'),
                ];
            });

        return Inertia::render('web/views/Wallpaper/Wallpaper', [
            'wallpapers' => $wallpapers,
        ]);
    }

    public function download(Wallpaper $wallpaper): RedirectResponse
    {
        // Increment download counter
        $wallpaper->incrementDownloads();

        // Redirect to the image URL for download
        return redirect($wallpaper->src);
    }
}
