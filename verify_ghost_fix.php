<?php

use App\Models\Activity;
use App\Models\Event;
use App\Models\EventComment;
use App\Models\User;
use Illuminate\Contracts\Console\Kernel;

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Kernel::class)->bootstrap();

$user = User::first();
if (!$user) {
    echo "Need a user to test.\n";
    exit(1);
}

echo "Simulating orphaned EventComment activity...\n";

// 1. Create an event
$event = Event::create([
    'title' => 'Temporary Event',
    'slug' => 'temp-event-' . time(),
    'start_date' => now()->addDays(1),
    'end_date' => now()->addDays(2),
    'type' => 'MEETUP',
    'status' => 'published',
    'created_by' => $user->id,
]);

// 2. Create a comment
$comment = EventComment::create([
    'event_id' => $event->id,
    'user_id' => $user->id,
    'content' => 'Ghost comment',
]);

// 3. Find the activity for the comment
$activity = Activity::where('subject_type', EventComment::class)
    ->where('subject_id', $comment->id)
    ->latest()
    ->first();

if (!$activity) {
    echo "Activity not found.\n";
    exit(1);
}

echo "Activity found: ID {$activity->id}, Type {$activity->type}\n";

// 4. Soft delete the event WITHOUT triggering the comment deletion (simulating old state)
// We use DB directly to avoid triggering Eloquent hooks if they exist
\Illuminate\Support\Facades\DB::table('events')->where('id', $event->id)->update(['deleted_at' => now()]);

echo "Event soft-deleted manually.\n";

// 5. Simulate DashboardController logic
$subject = $activity->subject;
echo "Initial subject in activity: " . get_class($subject) . "\n";
echo "Parent event exists? " . ($subject->event ? 'YES' : 'NO') . "\n";

// Apply the new fix logic
if ($activity->type === 'created_eventlike' || $activity->type === 'created_eventcomment') {
    $subject = $subject->event ?? null;
    $activity->setRelation('subject', $subject);
}

echo "Normalized subject: " . ($activity->subject ? get_class($activity->subject) : 'NULL') . "\n";

if ($activity->subject === null) {
    echo "SUCCESS: Orphaned activity subject is now NULL and will be filtered out!\n";
} else {
    echo "FAILURE: Orphaned activity subject is still present.\n";
}

// Cleanup
$comment->delete();
\Illuminate\Support\Facades\DB::table('events')->where('id', $event->id)->delete();
