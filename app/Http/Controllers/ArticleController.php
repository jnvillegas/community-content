<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleCategory;
use App\Models\ArticleTag;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\ArticleLike;
use App\Models\ArticleComment;


class ArticleController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:manage articles', except: ['index', 'show', 'gallery', 'toggleLike', 'storeComment']),
            new Middleware('auth', only: ['index', 'show', 'toggleLike', 'storeComment']),
            new Middleware('permission:view gallery', only: ['gallery']),
        ];
    }

    public function index(): Response
    {
        $articles = Article::with(['categories', 'author'])
            ->withCount(['likes', 'comments'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        $stats = [
            'total_articles' => Article::count(),
            'total_likes' => ArticleLike::whereHas('article')->count(),
            'total_comments' => ArticleComment::whereHas('article')->count(),
            'published_count' => Article::where('status', 'published')->count(),
        ];

        $recentComments = ArticleComment::whereHas('article')
            ->with(['user', 'article'])
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
                    'article_title' => $comment->article->title ?? 'Articulo eliminado',
                    'created_at' => $comment->created_at->diffForHumans(),
                ];
            });

        return Inertia::render('articles/Index', [
            'articles' => $articles,
            'stats' => $stats,
            'recentComments' => $recentComments,
        ]);

    }

    /**
     * Display a gallery of article images.
     */
    public function gallery(): Response
    {
        $articles = Article::whereNotNull('featured_image')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('articles/Gallery', [
            'articles' => $articles
        ]);
    }

    /**
     * Show the form for creating a new article.
     */
    public function create(): Response
    {
        return Inertia::render('articles/Create', [
            'categories' => ArticleCategory::all(),
            'tags' => ArticleTag::all()
        ]);
    }

    /**
     * Display the specified article.
     */
    public function show(Article $article): Response
    {
        $article->load(['categories', 'tags', 'author', 'likes', 'comments.user']);
        
        $article->likes_count = $article->likes->count();
        $article->is_liked = Auth::check() ? $article->isLikedBy(Auth::user()) : false;
        $article->comments_count = $article->comments->count();

        return Inertia::render('articles/Show', [
            'article' => $article,
        ]);
    }


    /**
     * Store a newly created article in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'status' => 'required|in:draft,published,private',
            'categories' => 'array',
            'tags' => 'array',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'featured_image' => 'nullable|image|max:5120', // 5MB Max
        ]);

        $imagePath = null;
        if ($request->hasFile('featured_image')) {
            $imagePath = $request->file('featured_image')->store('articles', 'public');
        }

        $article = Article::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'excerpt' => $validated['excerpt'],
            'status' => $validated['status'],
            'author_id' => auth()->id(),
            'meta_title' => $validated['meta_title'],
            'meta_description' => $validated['meta_description'],
            'featured_image' => $imagePath,
            'published_at' => $validated['status'] === 'published' ? now() : null,
        ]);

        if (!empty($validated['categories'])) {
            $article->categories()->attach($validated['categories']);
        }

        if (!empty($validated['tags'])) {
            $article->tags()->attach($validated['tags']);
        }

        return redirect()->route('articles.index')->with('success', 'Articulo creado!');
    }

    /**
     * Show the form for editing the specified article.
     */
    public function edit(Article $article): Response
    {
        $article->load(['categories', 'tags', 'author']);
        Log::debug('Edit article content length: ' . strlen($article->content ?? ''));
        Log::debug('Edit article content has base64: ' . (str_contains($article->content ?? '', 'base64') ? 'YES' : 'NO'));
        Log::debug('Edit article content has img: ' . (str_contains($article->content ?? '', '<img') ? 'YES' : 'NO'));
        return Inertia::render('articles/Edit', [
            'article' => $article,
            'categories' => ArticleCategory::all(),
            'tags' => ArticleTag::all()
        ]);
    }

    /**
     * Update the specified article in storage.
     */
    public function update(Request $request, Article $article): RedirectResponse
    {
        Log::debug('Article update request:', $request->except('featured_image'));
        Log::debug('Request files:', array_keys($request->allFiles()));
        Log::debug('Has featured_image file:', ['has' => $request->hasFile('featured_image')]);
        // Note: 'featured_image' can be nullable string (existing URL) or file (new upload)
        // Inertia might send 'null' string if cleared, or the file object.
        // If it's a file, we validate it as image. If it's a string, we assume it's keeping the old one (or updating text url, but we prioritize file).

        $rules = [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'status' => 'required|in:draft,published,private',
            'categories' => 'array',
            'tags' => 'array',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
        ];

        // Only validate as image if it IS a file upload
        if ($request->hasFile('featured_image')) {
            $rules['featured_image'] = 'nullable|image|max:5120';
        }

        $validated = $request->validate($rules);

        $dataToUpdate = [
            'title' => $validated['title'],
            'content' => $validated['content'],
            'excerpt' => $validated['excerpt'],
            'status' => $validated['status'],
            'meta_title' => $validated['meta_title'],
            'meta_description' => $validated['meta_description'],
            'published_at' => ($validated['status'] === 'published' && !$article->published_at) ? now() : $article->published_at,
        ];

        if ($request->hasFile('featured_image')) {
            $dataToUpdate['featured_image'] = $request->file('featured_image')->store('articles', 'public');
        }
        // If no file sent, we do NOT update 'featured_image', keeping the old one.
        // Unless we want to support deleting the image? (Usually handled by sending null to specific endpoint or handled here if input is explictly null).
        // For now, simple logic: Upload = Replace. No Upload = Keep.

        $article->update($dataToUpdate);

        $article->categories()->sync($request->categories ?? []);
        $article->tags()->sync($request->tags ?? []);

        return redirect()->route('articles.index')->with('success', 'Articulo actualizado.');
    }

    /**
     * Remove the specified article from storage.
     */
    public function destroy(Article $article): RedirectResponse
    {
        $article->delete();
        return redirect()->back()->with('success', 'Articulo eliminado.');
    }

    public function toggleLike(Article $article): RedirectResponse
    {
        Log::debug('Toggling like for article: ' . $article->slug . ' by user: ' . Auth::id());
        $user = Auth::user();
        $like = $article->likes()->where('user_id', $user->id)->first();

        if ($like) {
            Log::debug('Removing like');
            $like->delete();
        } else {
            Log::debug('Adding like');
            $article->likes()->create(['user_id' => $user->id]);
        }

        return back();
    }

    public function storeComment(Article $article, Request $request): RedirectResponse
    {
        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $article->comments()->create([
            'user_id' => Auth::id(),
            'content' => $request->input('content'),
        ]);

        return back();
    }
}

