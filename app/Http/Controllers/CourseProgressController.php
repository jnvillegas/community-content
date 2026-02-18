<?php

namespace App\Http\Controllers;

use App\Models\CourseProgress;
use App\Models\Lesson;
use Illuminate\Http\Request;

class CourseProgressController extends Controller
{
    public function toggleComplete(Request $request, Lesson $lesson)
    {
        $progress = CourseProgress::updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'lesson_id' => $lesson->id,
            ],
            [
                'completed_at' => $request->completed ? now() : null,
            ]
        );

        return back()->with('success', $request->completed ? 'Lesson marked as completed!' : 'Lesson marked as incomplete.');
    }
}
