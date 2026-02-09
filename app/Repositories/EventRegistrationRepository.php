<?php

namespace App\Repositories;

use App\Models\EventRegistration;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class EventRegistrationRepository
{
    /**
     * Get registrations for a specific user.
     *
     * @param int $userId
     * @param string $status
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getUserRegistrations(int $userId, string $status = 'all'): Collection
    {
        $query = EventRegistration::with(['event.createdBy'])
            ->where('user_id', $userId);

        if ($status !== 'all') {
            if ($status === 'upcoming') {
                $query->whereHas('event', function ($q) {
                    $q->upcoming();
                })->where('status', '!=', EventRegistration::STATUS_CANCELLED);
            } elseif ($status === 'past') {
                $query->whereHas('event', function ($q) {
                    $q->past();
                });
            } else {
                $query->where('status', $status);
            }
        }

        return $query->get();
    }

    /**
     * Get all registrations for an event.
     *
     * @param int $eventId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getEventRegistrations(int $eventId): Collection
    {
        return EventRegistration::with('user')
            ->where('event_id', $eventId)
            ->get();
    }

    /**
     * Check if a user is already registered for an event.
     *
     * @param int $userId
     * @param int $eventId
     * @return bool
     */
    public function isUserRegistered(int $userId, int $eventId): bool
    {
        return EventRegistration::where('user_id', $userId)
            ->where('event_id', $eventId)
            ->where('status', '!=', EventRegistration::STATUS_CANCELLED)
            ->exists();
    }

    /**
     * Count registrations for an event by status.
     *
     * @param int $eventId
     * @param string $status
     * @return int
     */
    public function getRegistrationCount(int $eventId, string $status = EventRegistration::STATUS_CONFIRMED): int
    {
        return EventRegistration::where('event_id', $eventId)
            ->where('status', $status)
            ->count();
    }

    /**
     * Register a user for an event.
     *
     * @param int $userId
     * @param int $eventId
     * @param array $data
     * @return \App\Models\EventRegistration
     */
    public function registerUser(int $userId, int $eventId, array $data = []): EventRegistration
    {
        return EventRegistration::create(array_merge([
            'user_id' => $userId,
            'event_id' => $eventId,
            'status' => EventRegistration::STATUS_CONFIRMED,
        ], $data));
    }

    /**
     * Cancel a registration.
     *
     * @param int $registrationId
     * @return bool
     */
    public function cancelRegistration(int $registrationId): bool
    {
        $registration = EventRegistration::find($registrationId);

        if (!$registration) {
            return false;
        }

        return $registration->update(['status' => EventRegistration::STATUS_CANCELLED]);
    }

    /**
     * Mark attendance for a registration.
     *
     * @param int $registrationId
     * @return bool
     */
    public function markAttendance(int $registrationId): bool
    {
        $registration = EventRegistration::find($registrationId);

        if (!$registration) {
            return false;
        }

        return $registration->update([
            'status' => EventRegistration::STATUS_ATTENDED,
            'attended_at' => now(),
        ]);
    }

    /**
     * Get users to remind for an event.
     *
     * @param int $eventId
     * @param string $reminderType
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getUsersToRemind(int $eventId, string $reminderType): Collection
    {
        // This logic assumes we want to find users who haven't received this reminder type yet
        // OR simply listing all users who are confirmed.
        // Based on the request "Usuarios que deben recibir recordatorio", we'll return confirmed users.
        // Filtering by whether they ALREADY received it would likely happen in the Service/Job layer checking the event_reminders table.

        return User::whereHas('eventRegistrations', function ($q) use ($eventId) {
            $q->where('event_id', $eventId)
                ->where('status', EventRegistration::STATUS_CONFIRMED);
        })->get();
    }
}
