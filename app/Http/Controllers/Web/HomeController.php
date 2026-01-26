<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Video;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $featuredArticles = Article::with(['categories', 'author'])
            ->where('status', 'published')
            ->orderBy('published_at', 'desc')
            ->take(4)
            ->get()
            ->map(function ($article) {
                return [
                    'id'       => $article->id,
                    'title'    => $article->title,
                    'subtitle' => $article->excerpt 
                        ?? Str::limit(strip_tags($article->content), 100)
                        ?? 'Sin descripción disponible',
                    'image'    => $article->featured_image ?? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOUHQsY59ST3MJ3pyj6dgxIM7x2Qhub5vCaPVJN2p52k405wzS48LhWRkc6KDAXOTBfyFTcR2yH40ZG8Rn6QO3wsBZph8PE-a71TM9JiZX0bkw3-sJ2C3EUXISaBnV20BY3K2uZSNBrSXmlAAOkX6Tfc2mvnq-aLGlANU-sqzmqO9y3Ox_EVGOynK21o4qcgN2e3jlXyEGWf6YkAcYGs6YH_YUqSK3yyC5pH-5GsK6ENP_FwQfs9W1zYbJpOz_7fda_qs6x1URMck',
                    'location' => $article->categories->first()?->name ?? 'General',
                    // 'url'   => route('articles.show', $article->slug),
                ];
            });

            $featuredVideos = Video::with(['categories', 'author'])
            // ->where('status', 'published')                 
            ->orderBy('created_at', 'desc')                 
            ->take(3)                                      
            ->get()
            ->map(function ($video) {
                return [
                    'id'          => $video->id,
                    'title'       => $video->title,
                    'subtitle'    => $video->description 
                        ?? 'Sin descripción disponible',
                    'youtube_id'  => $video->youtube_id,
                    'thumbnail'   => $video->thumbnail_url,
                    'location'    => $video->location ?? $video->categories->first()?->name ?? 'General',
                    'duration'    => $video->duration,
                    // 'url'      => route('videos.show', $video->id),
                ];
            });
return Inertia::render('web/views/Home/Home', [
        'featuredArticles' => $featuredArticles,
        'featuredVideos' => $featuredVideos,
    ]);
    }
}