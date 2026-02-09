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
        Schema::create('event_reminders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->enum('reminder_type', ['24h', '1h', '15min', 'custom']);
            $table->timestamp('scheduled_at');
            $table->timestamp('sent_at')->nullable();
            $table->enum('channel', ['email', 'whatsapp', 'push']);

            $table->timestamps();

            // Indexes
            $table->index(['scheduled_at', 'sent_at']); // Critical for the worker picking up pending reminders
            $table->index('event_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_reminders');
    }
};
