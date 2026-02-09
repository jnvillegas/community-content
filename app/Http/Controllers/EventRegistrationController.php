<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterEventRequest;
use App\Models\Event;
use App\Services\EventRegistrationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Exception;

class EventRegistrationController extends Controller
{
    protected $registrationService;

    public function __construct(EventRegistrationService $registrationService)
    {
        $this->registrationService = $registrationService;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RegisterEventRequest $request, int $eventId): RedirectResponse
    {
        $event = Event::findOrFail($eventId);

        try {
            $this->registrationService->register(Auth::user(), $event);

            return redirect()->back()->with('success', 'Te has inscrito al evento exitosamente.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $eventId): RedirectResponse
    {
        // Note: Route passed "event" (id or model). If the route binding is active, it might be the model.
        // But Controller method signature says "int $eventId".
        // Assuming route definition: Route::delete('/events/{event}/unregister')
        // Laravel usually binds {event} to Model if exists, or ID string.
        // I'll stick to ID for lookup to match Service signature need or fetch registration.

        // Service expects (EventRegistration $registration, User $user).
        // I need to find the registration for this user and event.

        $event = Event::findOrFail($eventId);
        $user = Auth::user();

        $registration = $event->registrations()->where('user_id', $user->id)->first();

        if (!$registration) {
            return redirect()->back()->with('error', 'No estás inscrito en este evento.');
        }

        try {
            $this->registrationService->cancel($registration, $user);
            return redirect()->back()->with('success', 'Inscripción cancelada.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
