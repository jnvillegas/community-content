<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class BlogController extends Controller
{
    /**
     * Muestra un artículo/blog específico según su ID
     */
    public function show(int $id): Response
    {
        try {
            $article = Article::with([
                'categories', 
                'tags',
                'author'
            ])
            ->where('id', $id)
            ->where('status', 'published')
            ->firstOrFail();

            $articleData = [
                'id'              => $article->id,
                'title'           => $article->title,
                'slug'            => $article->slug,
                'content'         => $article->content,
                'excerpt'         => $article->excerpt,
                'featured_image'  => $article->featured_image,
                'published_at'    => $article->published_at?->format('d M Y'),
                'author'          => [
                    'name'   => $article->author?->name ?? 'Anónimo',
                    'avatar' => $article->author?->avatar ?? null,
                ],
                'categories'      => $article->categories->pluck('name')->toArray(),
                'tags'            => $article->tags->pluck('name')->toArray(),
                'meta'            => [
                    'title'       => $article->meta_title ?? $article->title,
                    'description' => $article->meta_description ?? $article->excerpt,
                ],
            ];

            $relatedArticles = Article::with('categories')
                ->where('id', '!=', $article->id)
                ->where('status', 'published')
                ->whereHas('categories', function ($q) use ($article) {
                    $q->whereIn('article_categories.id', $article->categories->pluck('id'));
                })
                ->orWhere('published_at', '<', $article->published_at)
                ->latest('published_at')
                ->take(3)
                ->get()
                ->map(function ($related) {
                    return [
                        'id'    => $related->id,
                        'title' => $related->title,
                        'image' => $related->featured_image,
                    ];
                });

            return Inertia::render('web/views/BlogDetail/BlogDetail', [
                'article'         => $articleData,
                'relatedArticles' => $relatedArticles,
            ]);

        } catch (ModelNotFoundException $e) {
            abort(404, 'Artículo no encontrado');
        }
    }

/**
 * Muestra la página principal del blog (listado de artículos)
*/
    public function index(): Response
    {
        $articles = Article::with(['categories', 'author'])
            ->where('status', 'published')
            ->latest('published_at')
            ->paginate(10)
            ->through(function ($article) {
                return [
                    'id'             => $article->id,
                    'title'          => $article->title,
                    'slug'           => $article->slug,
                    'excerpt'        => $article->excerpt,
                    'location'       => $article->categories->first()?->name ?? 'General',
                    'featured_image' => $article->featured_image ?? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOUHQsY59ST3MJ3pyj6dgxIM7x2Qhub5vCaPVJN2p52k405wzS48LhWRkc6KDAXOTBfyFTcR2yH40ZG8Rn6QO3wsBZph8PE-a71TM9JiZX0bkw3-sJ2C3EUXISaBnV20BY3K2uZSNBrSXmlAAOkX6Tfc2mvnq-aLGlANU-sqzmqO9y3Ox_EVGOynK21o4qcgN2e3jlXyEGWf6YkAcYGs6YH_YUqSK3yyC5pH-5GsK6ENP_FwQfs9W1zYbJpOz_7fda_qs6x1URMck',
                    'published_at'   => $article->published_at?->format('d M Y'),
                    'author'         => [
                        'name' => $article->author?->name ?? 'Anónimo',
                    ],
                    'categories'     => $article->categories->pluck('name'),
                ];
            });
        return Inertia::render('web/views/Blog/Blog', [
            'articles' => $articles,
        ]);
    }
}