<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EventCategory;
use Illuminate\Support\Str;

class EventCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Workshops',
            'Meetups',
            'Webinars',
            'Lives en vivo',
            'Networking'
        ];

        foreach ($categories as $name) {
            EventCategory::firstOrCreate(
                ['name' => $name],
                ['slug' => Str::slug($name)]
            );
        }
    }
}
