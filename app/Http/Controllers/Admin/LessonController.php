<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LessonController extends Controller
{
    public function store(Request $request, Module $module)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content_type' => 'required|in:video,text',
            'video_url' => 'nullable|string',
            'content_body' => 'nullable|string',
            'duration' => 'nullable|string',
        ]);

        $maxOrder = $module->lessons()->max('order') ?? 0;

        $module->lessons()->create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']),
            'content_type' => $validated['content_type'],
            'video_url' => $validated['video_url'],
            'content_body' => $validated['content_body'],
            'duration' => $validated['duration'],
            'order' => $maxOrder + 1,
        ]);

        return back()->with('success', 'Lesson added successfully.');
    }

    public function update(Request $request, Module $module, Lesson $lesson)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content_type' => 'required|in:video,text',
            'video_url' => 'nullable|string',
            'content_body' => 'nullable|string',
            'duration' => 'nullable|string',
            'order' => 'integer',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        $lesson->update($validated);

        return back()->with('success', 'Lesson updated successfully.');
    }

    public function destroy(Module $module, Lesson $lesson)
    {
        $lesson->delete();

        return back()->with('success', 'Lesson deleted successfully.');
    }
}
