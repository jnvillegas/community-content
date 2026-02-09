<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SendEventReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-event-reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting event reminders check...');

        $reminders = \App\Models\EventReminder::with(['user', 'event'])
            ->whereNull('sent_at')
            ->where('scheduled_at', '<=', now())
            ->get();

        $this->info("Found {$reminders->count()} pending reminders.");

        foreach ($reminders as $reminder) {
            try {
                $reminder->user->notify(new \App\Notifications\EventReminder($reminder->event));

                $reminder->update(['sent_at' => now()]);
                $this->info("Sent reminder {$reminder->id} to user {$reminder->user_id}");
            } catch (\Exception $e) {
                $this->error("Failed to send reminder {$reminder->id}: " . $e->getMessage());
            }
        }

        $this->info('Done.');
    }
}
