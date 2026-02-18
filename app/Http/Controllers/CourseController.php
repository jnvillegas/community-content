<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Course;
use App\Models\Lesson;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::with('instructor')
            ->where('status', 'published')
            ->latest()
            ->get();

        return Inertia::render('Academy/Index', [
            'courses' => $courses
        ]);
    }

    public function show($slug)
    {
        $course = Course::with(['instructor', 'modules.lessons'])
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('Academy/CourseShow', [
            'course' => $course
        ]);
    }

    public function lesson(Request $request, $courseSlug, $lessonSlug)
    {
        $course = Course::with(['modules.lessons'])->where('slug', $courseSlug)->firstOrFail();

        $lesson = Lesson::where('slug', $lessonSlug)
            ->whereHas('module', function ($query) use ($course) {
                $query->where('course_id', $course->id);
            })
            ->with(['module.course.modules.lessons'])
            ->firstOrFail();

        $userProgress = \App\Models\CourseProgress::where('user_id', $request->user()->id)
            ->whereHas('lesson', function ($query) use ($course) {
                $query->whereHas('module', function ($q) use ($course) {
                    $q->where('course_id', $course->id);
                });
            })
            ->get();

        return Inertia::render('Academy/LessonShow', [
            'course' => $course,
            'lesson' => $lesson,
            'userProgress' => $userProgress
        ]);
    }
}
