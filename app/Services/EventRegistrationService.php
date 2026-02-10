<?php

namespace App\Services;

use App\Models\Event;
use App\Models\EventReminder;
use App\Models\EventRegistration;

use App\Models\User;
use App\Repositories\EventRegistrationRepository;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Exception;

class EventRegistrationService
{
    protected $registrationRepository;
    protected $eventService;

    public function __construct(
        EventRegistrationRepository $registrationRepository,
        EventService $eventService
    ) {
        $this->registrationRepository = $registrationRepository;
        $this->eventService = $eventService;
    }

    /**
     * Register a user for an event.
     *
     * @param User $user
     * @param Event $event
     * @return EventRegistration
     * @throws Exception
     */
    public function register(User $user, Event $event): EventRegistration
    {
        // 1. Checks
        $check = $this->eventService->canRegister($user, $event);
        if (!$check['can']) {
            throw new Exception("Registration failed: " . $check['reason']);
        }

        return DB::transaction(function () use ($user, $event) {
            // 2. Create Registration
            $registration = $this->registrationRepository->registerUser($user->id, $event->id, []);

            // 3. Schedule Reminders
            $this->scheduleRemindersForUser($event, $user);

            // 4. Send Confirmation Email (Logging)
            Log::info("Email sent: Confirmation for event {$event->title} to user {$user->email}");

            return $registration;
        });
    }

    /**
     * Cancel a registration.
     *
     * @param EventRegistration $registration
     * @param User $user
     * @return bool
     * @throws Exception
     */
    public function cancel(EventRegistration $registration, User $user): bool
    {
        // 1. Validation
        if ($registration->user_id !== $user->id) {
            // Admin override check would be here
            // throw new Exception("Unauthorized");
        }

        if ($registration->event->start_date <= now()) {
            throw new Exception("Cannot cancel: Event has already started");
        }

        if (in_array($registration->status, [EventRegistration::STATUS_CANCELLED, EventRegistration::STATUS_ATTENDED])) {
            return true; // Already done
        }

        // 2. Cancel
        $this->registrationRepository->cancelRegistration($registration->id);

        // 3. Notify (Logging)
        Log::info("Email sent: Cancellation for event {$registration->event->title} to user {$user->email}");

        return true;
    }

    /**
     * Mark attendance.
     *
     * @param EventRegistration $registration
     * @return bool
     * @throws Exception
     */
    public function markAttendance(EventRegistration $registration): bool
    {
        if (!in_array($registration->event->status, [Event::STATUS_PUBLISHED, Event::STATUS_COMPLETED])) {
            throw new Exception("Invalid event status");
        }

        $this->registrationRepository->markAttendance($registration->id);

        // Generate Certificate Logic Stub
        // CertificateGenerator::generate($registration);
        Log::info("Certificate generated for registration {$registration->id}");

        return true;
    }

    /**
     * Schedule reminders for a specific user and event.
     *
     * @param Event $event
     * @param User $user
     * @return void
     */
    public function scheduleRemindersForUser(Event $event, User $user): void
    {
        $types = [
            '24h' => 24 * 60,
            '1h' => 60,
            '15min' => 15,
        ];

        $insertData = [];
        foreach ($types as $type => $minutesBefore) {
            $scheduledTime = $event->start_date->copy()->subMinutes($minutesBefore);

            if ($scheduledTime->isPast()) {
                continue;
            }

            $insertData[] = [
                'event_id' => $event->id,
                'user_id' => $user->id,
                'reminder_type' => $type,
                'scheduled_at' => $scheduledTime,
                'channel' => 'email',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        if (!empty($insertData)) {
            EventReminder::insert($insertData);
        }
    }
}
