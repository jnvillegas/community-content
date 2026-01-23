<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class PostController extends Controller
{
    public function index(): Response
    {
        $posts = Post::orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('posts/Index', ['posts' => $posts]);
    }

    public function create(): Response
    {
        return Inertia::render('posts/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'attributes' => 'nullable|array',
        ]);

        Post::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'content' => $request->content,
            'attributes' => $request->attributes,
        ]);

        return redirect('/posts')->with('success', 'Post created successfully.');
    }

    public function edit(Post $post): Response
    {
        return Inertia::render('posts/Edit', ['post' => $post]);
    }

    public function update(Request $request, Post $post): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'attributes' => 'nullable|array',
        ]);

        $post->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'content' => $request->content,
            'attributes' => $request->attributes,
        ]);

        return redirect('/posts')->with('success', 'Post updated successfully.');
    }

    public function destroy(Post $post): RedirectResponse
    {
        $post->delete();
        return redirect()->back()->with('success', 'Post deleted successfully.');
    }
}
