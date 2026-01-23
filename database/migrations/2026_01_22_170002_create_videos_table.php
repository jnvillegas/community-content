<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('youtube_id'); // ID del video de YouTube (ej: dQw4w9WgXcQ)
            $table->string('thumbnail_url')->nullable();
            $table->string('duration')->nullable(); // Ej: 15:30
            $table->string('location')->nullable(); // Ej: Bali, Indonesia
            $table->enum('status', ['draft', 'published', 'private'])->default('draft');
            $table->boolean('is_featured')->default(false);

            // Relación con el autor (Tú)
            $table->foreignId('author_id')->constrained('users')->onDelete('cascade');

            // SEO
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });

        // Pivot para Categorías
        Schema::create('video_category_pivot', function (Blueprint $table) {
            $table->id();
            $table->foreignId('video_id')->constrained('videos')->onDelete('cascade');
            $table->foreignId('category_id')->constrained('video_categories')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('video_category_pivot');
        Schema::dropIfExists('videos');
    }
};
