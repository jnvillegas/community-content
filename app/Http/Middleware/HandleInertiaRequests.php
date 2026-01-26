<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\Article;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
                'unread_notifications_count' => $request->user() ? $request->user()->unreadNotifications()->count() : 0,
            ],
            'sidebarOpen' => !$request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',

            // 'featuredArticles' => fn () => Article::with(['categories', 'author'])
            //     ->where('status', 'published')              
            //     ->orderBy('published_at', 'desc')            
            //     ->take(4)                                   
            //     ->get()
            //     ->map(function ($article) {
            //         return [
            //             'id'       => $article->id,
            //             'title'    => $article->title,
            //             'subtitle' => $article->excerpt 
            //                 ?? Str::limit(strip_tags($article->content), 100)
            //                 ?? 'Sin descripción disponible',
            //             'image'    => $article->featured_image 
            //                 ?? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOUHQsY59ST3MJ3pyj6dgxIM7x2Qhub5vCaPVJN2p52k405wzS48LhWRkc6KDAXOTBfyFTcR2yH40ZG8Rn6QO3wsBZph8PE-a71TM9JiZX0bkw3-sJ2C3EUXISaBnV20BY3K2uZSNBrSXmlAAOkX6Tfc2mvnq-aLGlANU-sqzmqO9y3Ox_EVGOynK21o4qcgN2e3jlXyEGWf6YkAcYGs6YH_YUqSK3yyC5pH-5GsK6ENP_FwQfs9W1zYbJpOz_7fda_qs6x1URMck',
            //             'location' => $article->categories->first()?->name ?? 'Location',
            //             // Opcional: si querés linkear al artículo
            //             // 'url'      => route('articles.show', $article->slug),
            //         ];
            //     }),
        ];
    }
}
