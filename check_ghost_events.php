<?php

use App\Models\Activity;
use App\Models\Event;
use Illuminate\Contracts\Console\Kernel;

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Kernel::class)->bootstrap();

echo "Checking Events...\n";
$eventsCount = Event::count();
$softDeletedEventsCount = Event::onlyTrashed()->count();
echo "Total Events (Active): $eventsCount\n";
echo "Total Events (Soft Deleted): $softDeletedEventsCount\n";

if ($eventsCount > 0) {
    echo "Active Events found:\n";
    foreach (Event::all() as $e) {
        echo "ID: {$e->id}, Title: {$e->title}, Deleted At: {$e->deleted_at}\n";
    }
}

echo "\nChecking ALL Activities...\n";
$activities = Activity::with('subject')->latest()->get();
echo "Total Activities: " . $activities->count() . "\n";

foreach ($activities as $a) {
    echo "ID: {$a->id}, Type: {$a->type}, Subject ID: {$a->subject_id}, Subject Type: {$a->subject_type}, Subject exists: " . ($a->subject ? 'YES' : 'NO') . "\n";
}
