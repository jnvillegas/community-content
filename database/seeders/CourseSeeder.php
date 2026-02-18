<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = \App\Models\User::first();
        if (!$user)
            return;

        $course = \App\Models\Course::create([
            'title' => 'Mastering Content Creation',
            'slug' => 'mastering-content-creation',
            'description' => 'Learn the secrets of a professional creator and how to scale your brand.',
            'cover_image' => 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=2070&auto=format&fit=crop',
            'instructor_id' => $user->id,
            'status' => 'published',
        ]);

        $module1 = \App\Models\Module::create([
            'course_id' => $course->id,
            'title' => 'Introduction to Strategy',
            'order' => 1,
        ]);

        \App\Models\Lesson::create([
            'module_id' => $module1->id,
            'title' => 'Finding Your Niche',
            'slug' => 'finding-your-niche',
            'content_type' => 'video',
            'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'duration' => 600,
            'order' => 1,
        ]);

        \App\Models\Lesson::create([
            'module_id' => $module1->id,
            'title' => 'Defining Your Audience',
            'slug' => 'defining-your-audience',
            'content_type' => 'text',
            'content_body' => 'In this lesson, we cover who your target audience is...',
            'order' => 2,
        ]);

        $module2 = \App\Models\Module::create([
            'course_id' => $course->id,
            'title' => 'Technical Setup',
            'order' => 2,
        ]);

        \App\Models\Lesson::create([
            'module_id' => $module2->id,
            'title' => 'Choosing Your Gear',
            'slug' => 'choosing-your-gear',
            'content_type' => 'video',
            'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'duration' => 1200,
            'order' => 1,
        ]);
    }
}
