<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Module;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    public function store(Request $request, Course $course)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $maxOrder = $course->modules()->max('order') ?? 0;

        $course->modules()->create([
            'title' => $validated['title'],
            'order' => $maxOrder + 1,
        ]);

        return back()->with('success', 'Module added successfully.');
    }

    public function update(Request $request, Course $course, Module $module)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'order' => 'integer',
        ]);

        $module->update($validated);

        return back()->with('success', 'Module updated successfully.');
    }

    public function destroy(Course $course, Module $module)
    {
        $module->delete();

        return back()->with('success', 'Module deleted successfully.');
    }
}
