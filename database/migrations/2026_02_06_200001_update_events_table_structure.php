<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Step 1: Drop the check constraint on type column (PostgreSQL specific)
        DB::statement("ALTER TABLE events DROP CONSTRAINT IF EXISTS events_type_check");

        // Step 2: Change type column from ENUM/VARCHAR to plain VARCHAR
        DB::statement("ALTER TABLE events ALTER COLUMN type TYPE VARCHAR(50)");

        // Step 3: Update any old type values to new ones (if any exist)
        DB::table('events')->where('type', 'presencial')->update(['type' => 'WORKSHOP']);
        DB::table('events')->where('type', 'webinar')->update(['type' => 'WEBINAR']);
        DB::table('events')->where('type', 'live')->update(['type' => 'MEETUP']);
        DB::table('events')->where('type', 'hybrid')->update(['type' => 'TRIP']);

        // Step 4: Rename max_attendees to max_participants if it exists
        if (Schema::hasColumn('events', 'max_attendees')) {
            Schema::table('events', function (Blueprint $table) {
                $table->renameColumn('max_attendees', 'max_participants');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Reverse column rename
        if (Schema::hasColumn('events', 'max_participants')) {
            Schema::table('events', function (Blueprint $table) {
                $table->renameColumn('max_participants', 'max_attendees');
            });
        }

        // Reverse type value changes
        DB::table('events')->where('type', 'WORKSHOP')->update(['type' => 'presencial']);
        DB::table('events')->where('type', 'WEBINAR')->update(['type' => 'webinar']);
        DB::table('events')->where('type', 'MEETUP')->update(['type' => 'live']);
        DB::table('events')->where('type', 'TRIP')->update(['type' => 'hybrid']);
    }
};
