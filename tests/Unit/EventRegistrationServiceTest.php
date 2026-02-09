<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Event;
use App\Models\EventRegistration;
use App\Models\EventReminder;
use App\Services\EventRegistrationService;
use App\Services\EventService;
use App\Repositories\EventRegistrationRepository;
use App\Repositories\EventRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Exception;

class EventRegistrationServiceTest extends TestCase
{
    use RefreshDatabase;

    protected $registrationService;
    protected $eventService;

    protected function setUp(): void
    {
        parent::setUp();

        // Setup real services/repos
        $eventRepo = new EventRepository();
        $this->eventService = new EventService($eventRepo);

        $registrationRepo = new EventRegistrationRepository();
        $this->registrationService = new EventRegistrationService(
            $registrationRepo,
            $this->eventService
        );
    }

    public function test_user_can_register_to_event()
    {
        Mail::fake();

        $user = User::factory()->create();
        $event = Event::factory()->published()->create([
            'start_date' => now()->addDays(5),
            'requires_subscription' => false,
        ]);

        $registration = $this->registrationService->register($user, $event);

        $this->assertDatabaseHas('event_registrations', [
            'user_id' => $user->id,
            'event_id' => $event->id,
            'status' => EventRegistration::STATUS_CONFIRMED,
        ]);

        $this->assertInstanceOf(EventRegistration::class, $registration);
    }

    public function test_user_cannot_register_twice()
    {
        $user = User::factory()->create();
        $event = Event::factory()->published()->create([
            'requires_subscription' => false,
        ]);

        // First registration
        EventRegistration::factory()->confirmed()->create([
            'user_id' => $user->id,
            'event_id' => $event->id,
        ]);

        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Registration failed: Already registered");

        $this->registrationService->register($user, $event);
    }

    public function test_user_cannot_register_to_past_event()
    {
        $user = User::factory()->create();
        $event = Event::factory()->published()->create([
            'start_date' => now()->subDay(),
            'end_date' => now()->subHours(2),
            'requires_subscription' => false,
        ]);

        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Registration failed: Event has already started");

        $this->registrationService->register($user, $event);
    }

    public function test_user_cannot_register_after_deadline()
    {
        $user = User::factory()->create();
        $event = Event::factory()->published()->create([
            'start_date' => now()->addDays(5),
            'registration_deadline' => now()->subDay(),
            'requires_subscription' => false,
        ]);

        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Registration failed: Registration closed");

        $this->registrationService->register($user, $event);
    }

    public function test_user_can_cancel_registration()
    {
        $user = User::factory()->create();
        $event = Event::factory()->published()->create(['start_date' => now()->addDays(5)]);

        $registration = EventRegistration::factory()->confirmed()->create([
            'user_id' => $user->id,
            'event_id' => $event->id,
        ]);

        $result = $this->registrationService->cancel($registration, $user);

        $this->assertTrue($result);
        $this->assertDatabaseHas('event_registrations', [
            'id' => $registration->id,
            'status' => EventRegistration::STATUS_CANCELLED,
        ]);
    }

    public function test_user_cannot_cancel_after_event_started()
    {
        $user = User::factory()->create();
        $event = Event::factory()->published()->create(['start_date' => now()->subHour()]);

        $registration = EventRegistration::factory()->confirmed()->create([
            'user_id' => $user->id,
            'event_id' => $event->id,
        ]);

        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Cannot cancel: Event has already started");

        $this->registrationService->cancel($registration, $user);
    }

    public function test_admin_can_mark_attendance()
    {
        $registration = EventRegistration::factory()->confirmed()->create();
        // Assuming admin check is bypassed or controlled by caller for this unit test

        $this->registrationService->markAttendance($registration);

        $this->assertDatabaseHas('event_registrations', [
            'id' => $registration->id,
            'status' => EventRegistration::STATUS_ATTENDED,
        ]);

        $this->assertNotNull($registration->refresh()->attended_at);
        // Check fuzzy time delta if needed, usually just NotNull is enough
    }

    public function test_schedule_reminders_creates_correct_records()
    {
        // Event in 3 days
        $event = Event::factory()->published()->create([
            'start_date' => now()->addDays(3),
        ]);

        // 5 registrations
        EventRegistration::factory()->count(5)->confirmed()->create(['event_id' => $event->id]);

        $this->registrationService->scheduleReminders($event);

        // Should create 3 reminders per user (24h, 1h, 15min) * 5 users = 15 reminders
        // BUT logic depends on current time vs scheduled time.
        // Event is in 72 hours.
        // 24h before = in 48 hours (Future) -> Created
        // 1h before = in 71 hours (Future) -> Created
        // 15min before = in 71.75 hours (Future) -> Created

        $this->assertDatabaseCount('event_reminders', 15);

        $this->assertDatabaseHas('event_reminders', [
            'event_id' => $event->id,
            'reminder_type' => EventReminder::TYPE_24H,
        ]);
    }
}
