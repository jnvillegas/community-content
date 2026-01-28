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
}
