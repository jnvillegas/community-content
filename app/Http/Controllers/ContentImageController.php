<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContentImageController extends Controller
{
    /**
     * Upload an image for use in TipTap editor content.
     * Returns the public URL of the stored image.
     */
    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|max:5120', // 5MB max
        ]);

        $path = $request->file('image')->store('articles/content', 'public');

        return response()->json([
            'url' => asset('storage/' . $path),
        ]);
    }
}
