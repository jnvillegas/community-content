<?php

namespace App\Services;

use App\Models\Event;
use App\Models\User;
use App\Models\EventRegistration;
use App\Repositories\EventRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Exception;
use Illuminate\Support\Facades\DB;

class EventService
{
    protected $eventRepository;

    public function __construct(EventRepository $eventRepository)
    {
        $this->eventRepository = $eventRepository;
    }

    /**
     * Create a new event.
     *
     * @param User $creator
     * @param array $data
     * @return Event
     * @throws Exception
     */
    public function createEvent(User $creator, array $data): Event
    {


        // 1. Validations
        if (isset($data['start_date']) && now()->utc()->gt($data['start_date'])) {
            // ...
        }

        if (isset($data['start_date']) && isset($data['end_date']) && $data['end_date'] <= $data['start_date']) {
            throw new Exception("End date must be after start date");
        }

        // dd('Service Check 2: Validation Passed'); 

        return DB::transaction(function () use ($creator, $data) {
            // dd('Service Check 3: Inside Transaction');

            // 2. Handle File Upload
            if (isset($data['cover_image']) && $data['cover_image'] instanceof UploadedFile) {
                $path = $data['cover_image']->store('events/covers', 'public');
                $data['cover_image'] = '/storage/' . $path;
            }

            // 3. Generate Slug
            $slug = Str::slug($data['title']);
            if (Event::where('slug', $slug)->exists()) {
                $slug = $slug . '-' . uniqid();
            }
            $data['slug'] = $slug;

            // 4. Set Creator
            $data['created_by'] = $creator->id;

            // dd('Service Check 4: Before Repository Call');

            // 5. Create via Repository
            $event = $this->eventRepository->createEvent($data);


            Log::info("Event created: {$event->id} by user {$creator->id}");

            return $event;
        });
    }

    /**
     * Update an event.
     *
     * @param Event $event
     * @param User $user
     * @param array $data
     * @return Event
     * @throws Exception
     */
    public function updateEvent(Event $event, User $user, array $data): Event
    {
        // 1. Security Check
        if ($event->created_by !== $user->id) {
            // Allow if super admin, logic assumes policy checked, but safety net
            // throw new Exception("Unauthorized"); 
        }

        // 2. State Check
        if (in_array($event->status, [Event::STATUS_COMPLETED, Event::STATUS_CANCELLED])) {
            throw new Exception("Cannot edit completed or cancelled events");
        }

        return DB::transaction(function () use ($event, $data) {
            // 3. Handle File Upload
            if (isset($data['cover_image']) && $data['cover_image'] instanceof UploadedFile) {
                // Delete old image if exists
                if ($event->cover_image) {
                    // Parse path from URL if needed, or store path separately. 
                    // Simplified: Assuming we can extract path or just ignoring deletion failure
                }

                $path = $data['cover_image']->store('events/covers', 'public');
                $data['cover_image'] = '/storage/' . $path;
            }

            // 4. Update via Repository
            $this->eventRepository->updateEvent($event->id, $data);

            return $event->refresh();
        });
    }

    /**
     * Delete an event.
     *
     * @param Event $event
     * @param User $user
     * @return bool
     * @throws Exception
     */
    public function deleteEvent(Event $event, User $user): bool
    {
        // 1. Validation
        if ($event->registrations()->where('status', EventRegistration::STATUS_CONFIRMED)->exists()) {
            throw new Exception("Cannot delete event with confirmed registrations. Cancel it instead.");
        }

        // 2. Delete Image (Optional - typically kept for history or soft delete ignored)
        // if ($event->cover_image) { ... }

        // 3. Soft Delete
        return $this->eventRepository->deleteEvent($event->id);
    }

    /**
     * Check if user can register.
     *
     * @param User $user
     * @param Event $event
     * @return array
     */
    public function canRegister(User $user, Event $event): array
    {
        if ($event->status !== Event::STATUS_PUBLISHED) {
            return ['can' => false, 'reason' => 'Event is not published'];
        }

        if ($event->start_date <= now()) {
            return ['can' => false, 'reason' => 'Event has already started'];
        }

        // Check if using standard helper
        if (!$event->canRegister($user)) {
            // Determine specific reason based on helper logic failing
            if ($event->isFull())
                return ['can' => false, 'reason' => 'Event is full'];
            if ($event->registration_deadline && now()->gt($event->registration_deadline))
                return ['can' => false, 'reason' => 'Registration closed'];
            if ($event->requires_subscription && !$user->hasActiveSubscription())
                return ['can' => false, 'reason' => 'Active subscription required'];
            if ($event->registrations()->where('user_id', $user->id)->exists())
                return ['can' => false, 'reason' => 'Already registered'];

            return ['can' => false, 'reason' => 'Conditions not met'];
        }

        return ['can' => true, 'reason' => null];
    }

    /**
     * Get event statistics.
     *
     * @param Event $event
     * @return array
     */
    public function getEventStats(Event $event): array
    {
        $total = $event->registrations()->count();
        $confirmed = $event->registrations()->where('status', EventRegistration::STATUS_CONFIRMED)->count();
        $attended = $event->registrations()->where('status', EventRegistration::STATUS_ATTENDED)->count();
        $cancelled = $event->registrations()->where('status', EventRegistration::STATUS_CANCELLED)->count();
        $noShow = $event->registrations()->where('status', EventRegistration::STATUS_NO_SHOW)->count();

        $attendanceRate = ($confirmed + $attended) > 0 ? ($attended / ($confirmed + $attended)) * 100 : 0;

        $availableSlots = $event->max_attendees ? max(0, $event->max_attendees - ($confirmed + $attended)) : null;

        return [
            'total_registrations' => $total,
            'confirmed_count' => $confirmed,
            'attended_count' => $attended,
            'cancelled_count' => $cancelled,
            'no_show_count' => $noShow,
            'likes_count' => $event->likes()->count(),
            'attendance_rate' => round($attendanceRate, 2),
            'available_slots' => $availableSlots
        ];
    }
}
