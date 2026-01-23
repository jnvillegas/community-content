<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleCategory;
use App\Models\ArticleTag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    /**
     * Display a listing of the articles.
     */
    public function index(): Response
    {
        $articles = Article::with(['categories', 'author'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('articles/Index', [
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
        return Inertia::render('articles/Show', [
            'article' => $article->load(['categories', 'tags', 'author']),
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
            'featured_image' => 'nullable|string',
        ]);

        $article = Article::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'excerpt' => $validated['excerpt'],
            'status' => $validated['status'],
            'author_id' => auth()->id(),
            'meta_title' => $validated['meta_title'],
            'meta_description' => $validated['meta_description'],
            'featured_image' => $validated['featured_image'],
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
        return Inertia::render('articles/Edit', [
            'article' => $article->load(['categories', 'tags', 'author']),
            'categories' => ArticleCategory::all(),
            'tags' => ArticleTag::all()
        ]);
    }

    /**
     * Update the specified article in storage.
     */
    public function update(Request $request, Article $article): RedirectResponse
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
            'featured_image' => 'nullable|string',
        ]);

        $article->update([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'excerpt' => $validated['excerpt'],
            'status' => $validated['status'],
            'meta_title' => $validated['meta_title'],
            'meta_description' => $validated['meta_description'],
            'featured_image' => $validated['featured_image'],
            'published_at' => ($validated['status'] === 'published' && !$article->published_at) ? now() : $article->published_at,
        ]);

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
}
