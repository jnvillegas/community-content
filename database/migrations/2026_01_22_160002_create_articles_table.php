<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('content')->nullable();
            $table->text('excerpt')->nullable();
            $table->string('featured_image')->nullable();
            $table->enum('status', ['draft', 'published', 'scheduled', 'private'])->default('draft');
            $table->timestamp('published_at')->nullable();

            // Relación con el autor
            $table->foreignId('author_id')->constrained('users')->onDelete('cascade');

            // SEO Fields
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();

            $table->timestamps();
            $table->softDeletes(); // Para que nada se borre permanentemente por accidente
        });

        // Tabla pivot para artículos y categorías (Muchos a Muchos)
        Schema::create('article_category_pivot', function (Blueprint $table) {
            $table->id();
            $table->foreignId('article_id')->constrained('articles')->onDelete('cascade');
            $table->foreignId('category_id')->constrained('article_categories')->onDelete('cascade');
        });

        // Tabla pivot para artículos y etiquetas (Muchos a Muchos)
        Schema::create('article_tag_pivot', function (Blueprint $table) {
            $table->id();
            $table->foreignId('article_id')->constrained('articles')->onDelete('cascade');
            $table->foreignId('tag_id')->constrained('article_tags')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('article_tag_pivot');
        Schema::dropIfExists('article_category_pivot');
        Schema::dropIfExists('articles');
    }
};
