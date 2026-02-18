<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CourseProgress;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AcademyDashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_students' => User::count(), // Simplified for now, could be uniquely enrolled students
            'total_courses' => Course::count(),
            'total_completions' => CourseProgress::whereNotNull('completed_at')->count(),
            'average_progress' => $this->calculateAverageProgress(),
        ];

        $courses = Course::withCount('modules')
            ->with(['instructor'])
            ->get()
            ->map(function ($course) {
                return [
                    'id' => $course->id,
                    'title' => $course->title,
                    'slug' => $course->slug,
                    'modules_count' => $course->modules_count,
                    'students_count' => CourseProgress::whereHas('lesson.module', function ($query) use ($course) {
                        $query->where('course_id', $course->id);
                    })->distinct('user_id')->count('user_id'),
                ];
            });

        return Inertia::render('Admin/Academy/Dashboard', [
            'stats' => $stats,
            'courses' => $courses,
        ]);
    }

    private function calculateAverageProgress()
    {
        $lessonsCount = DB::table('lessons')->count();
        if ($lessonsCount === 0)
            return 0;

        $completionsCount = DB::table('course_progress')
            ->whereNotNull('completed_at')
            ->count();

        $usersCount = DB::table('users')->count();
        if ($usersCount === 0)
            return 0;

        // Roughly: total completions / (total possible completions)
        return round(($completionsCount / ($lessonsCount * $usersCount)) * 100, 1);
    }
}
