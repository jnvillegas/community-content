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
        $wallpapers = Wallpaper::published()
            ->orderBy('is_featured', 'desc')
            ->orderBy('published_at', 'desc')
            ->get();

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
