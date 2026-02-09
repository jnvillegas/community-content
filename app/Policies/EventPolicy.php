<?php

namespace App\Policies;

use App\Models\Event;
use App\Models\User;
use App\Services\EventService;
use Illuminate\Auth\Access\Response;

class EventPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true; // Public list is visible. Admin list checks 'role:admin'.
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(?User $user, Event $event): bool
    {
        if ($event->status === Event::STATUS_PUBLISHED) {
            return true;
        }

        // If not published, only creator or admin
        if (!$user) {
            return false;
        }

        return $user->hasRole('admin') || $user->id === $event->created_by;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Event $event): bool
    {
        return $user->hasRole('admin') || $user->id === $event->created_by;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Event $event): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can register for the event.
     */
    public function register(User $user, Event $event): bool
    {
        // Delegate to service domain logic
        // Note: Policy handles authorization (permission), Service handles business rules.
        // User asked to delegate here.
        // Typically Policy checks "Can I TRY to register?" and Service checks "Is there space?".
        // But we follow instructions.
        $service = app(EventService::class);
        return $service->canRegister($user, $event)['can'];
    }
}
