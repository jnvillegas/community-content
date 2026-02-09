<?php

namespace App\Repositories;

use App\Models\Event;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class EventRepository
{
    /**
     * Get upcoming events with filters.
     *
     * @param array $filters
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getUpcomingEvents(array $filters = []): Collection
    {
        $query = Event::query()
            ->upcoming()
            ->published()
            ->with(['createdBy', 'categories'])
            ->withCount('registrations');

        if (!empty($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        if (!empty($filters['category_id'])) {
            $query->whereHas('categories', function ($q) use ($filters) {
                $q->where('event_categories.id', $filters['category_id']);
            });
        }

        if (!empty($filters['search'])) {
            $search = '%' . $filters['search'] . '%';
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', $search)
                    ->orWhere('description', 'like', $search);
            });
        }

        if (!empty($filters['date_from'])) {
            $query->where('start_date', '>=', $filters['date_from']);
        }

        if (!empty($filters['date_to'])) {
            $query->where('start_date', '<=', $filters['date_to']);
        }

        return $query->get();
    }

    /**
     * Get past events with filters.
     *
     * @param array $filters
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getPastEvents(array $filters = []): Collection
    {
        $query = Event::query()
            ->past()
            ->published() // Usually we show past events that were published
            ->with(['createdBy', 'categories'])
            ->withCount('registrations');

        // Apply similar filters if needed, usually just search or category
        if (!empty($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        if (!empty($filters['category_id'])) {
            $query->whereHas('categories', function ($q) use ($filters) {
                $q->where('event_categories.id', $filters['category_id']);
            });
        }

        if (!empty($filters['search'])) {
            $search = '%' . $filters['search'] . '%';
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', $search)
                    ->orWhere('description', 'like', $search);
            });
        }

        return $query->get();
    }

    /**
     * Get event by slug with standard relations.
     *
     * @param string $slug
     * @return \App\Models\Event|null
     */
    public function getEventBySlug(string $slug): ?Event
    {
        return Event::with(['createdBy', 'categories', 'registrations.user'])
            ->where('slug', $slug)
            ->first();
    }

    /**
     * Get events where the user is registered.
     *
     * @param int $userId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getUserRegisteredEvents(int $userId): Collection
    {
        return Event::whereHas('registrations', function ($query) use ($userId) {
            $query->where('user_id', $userId)
                ->where('status', '!=', \App\Models\EventRegistration::STATUS_CANCELLED);
        })
            ->orderBy('start_date', 'asc')
            ->get();
    }

    /**
     * Create a new event.
     *
     * @param array $data
     * @return \App\Models\Event
     */
    public function createEvent(array $data): Event
    {
        $event = Event::create($data);

        if (!empty($data['categories'])) {
            $event->categories()->attach($data['categories']);
        }

        return $event;
    }

    /**
     * Update an event.
     *
     * @param int $eventId
     * @param array $data
     * @return bool
     */
    public function updateEvent(int $eventId, array $data): bool
    {
        $event = Event::find($eventId);

        if (!$event) {
            return false;
        }

        return DB::transaction(function () use ($event, $data) {
            $updated = $event->update($data);

            if (isset($data['categories'])) {
                $event->categories()->sync($data['categories']);
            }

            return $updated;
        });
    }

    /**
     * Delete an event (soft delete).
     *
     * @param int $eventId
     * @return bool
     */
    public function deleteEvent(int $eventId): bool
    {
        return Event::destroy($eventId) > 0;
    }

    /**
     * Get events created by a specific user.
     *
     * @param int $userId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getEventsCreatedBy(int $userId): Collection
    {
        return Event::where('created_by', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
