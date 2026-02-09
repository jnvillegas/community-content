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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->enum('type', ['WORKSHOP', 'MEETUP', 'WEBINAR', 'TRIP']);
            $table->enum('status', ['draft', 'published', 'cancelled', 'completed'])->default('draft');

            // Location details
            $table->string('location')->nullable();
            $table->text('location_url')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->string('virtual_url')->nullable(); // Zoom, Meet, YouTube

            // Timing
            $table->timestamp('start_date');
            $table->timestamp('end_date');
            $table->string('timezone', 50)->default('America/Argentina/Tucuman');

            // Enrollment control
            $table->unsignedInteger('max_participants')->nullable();
            $table->timestamp('registration_deadline')->nullable();
            $table->string('cover_image')->nullable();

            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');

            // Business Logic
            $table->boolean('requires_subscription')->default(true);
            $table->boolean('requires_registration')->default(true);
            $table->decimal('price', 10, 2)->nullable();

            $table->timestamps();
            $table->softDeletes();

            // Indexes for frequent searches
            $table->index('start_date');
            $table->index('status');
            $table->index('type');
            $table->index('created_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
