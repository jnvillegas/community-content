<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Fix stories table
        DB::table('stories')->get()->each(function ($story) {
            if (Str::contains($story->content_url, '/storage/')) {
                $relativePath = Str::after($story->content_url, '/storage/');
                DB::table('stories')
                    ->where('id', $story->id)
                    ->update(['content_url' => $relativePath]);
            }
        });

        // Fix story_images table
        DB::table('story_images')->get()->each(function ($image) {
            if (Str::contains($image->image_url, '/storage/')) {
                $relativePath = Str::after($image->image_url, '/storage/');
                DB::table('story_images')
                    ->where('id', $image->id)
                    ->update(['image_url' => $relativePath]);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Reverting would require knowing the exact APP_URL at migration time, 
        // which is unreliable. Since we added accessors to the models, 
        // the relative paths are safer even if we don't revert.
    }
};
