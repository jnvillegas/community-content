<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('wallpapers', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('alt')->nullable();
            $table->string('src'); // URL o path de la imagen
            $table->boolean('is_locked')->default(false);
            $table->string('lock_text')->nullable();
            $table->string('lock_subtitle')->nullable();
            $table->enum('category', ['mobile', 'desktop', 'both'])->default('both');
            $table->string('resolution')->nullable(); // ej: "1920x1080"
            $table->string('file_size')->nullable(); // ej: "2.5 MB"
            $table->integer('downloads_count')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->timestamp('published_at')->nullable();
            $table->foreignId('author_id')->nullable()->constrained('users')->onDelete('set null');
            $table->softDeletes();
            $table->timestamps();

            // Índices para optimización
            $table->index('status');
            $table->index('is_locked');
            $table->index('is_featured');
            $table->index('published_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wallpapers');
    }
};
