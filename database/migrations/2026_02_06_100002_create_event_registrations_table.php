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
        Schema::create('event_registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->enum('status', ['pending', 'confirmed', 'attended', 'cancelled', 'no_show'])->default('confirmed');
            $table->timestamp('registration_date')->useCurrent();
            $table->timestamp('attended_at')->nullable();

            // Certificates
            $table->boolean('certificate_issued')->default(false);
            $table->string('certificate_url')->nullable();

            $table->text('notes')->nullable();
            $table->timestamps();

            // Prevent double registration
            $table->unique(['event_id', 'user_id']);

            // Indexes
            $table->index('status');
            $table->index('user_id'); // Frequently searching a user's events
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_registrations');
    }
};
