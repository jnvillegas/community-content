<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventCategory;
use App\Models\User;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Services\EventService;
use App\Services\EventRegistrationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Exception;

class EventController extends Controller
{
    protected $eventService;
    protected $registrationService;

    public function __construct(EventService $eventService, EventRegistrationService $registrationService)
    {
        $this->eventService = $eventService;
        $this->registrationService = $registrationService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $events = Event::with(['createdBy', 'categories'])
            ->latest() // or ordered by start_date
            ->paginate(15);

        return Inertia::render('Admin/Events/Index', [
            'events' => $events,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Events/Create', [
            'categories' => EventCategory::all(),
            'types' => [
                Event::TYPE_WORKSHOP,
                Event::TYPE_MEETUP,
                Event::TYPE_WEBINAR,
                Event::TYPE_TRIP,
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request): RedirectResponse
    {
        Log::info('EventController::store - Start');

        try {
            Log::info('EventController::store - Request Validated');
            $data = $request->validated();

            // Log::info('EventController::store - Data:', $data); // Causing crash due to UploadedFile

            $data['type'] = $data['event_type'];
            unset($data['event_type']);

            Log::info('EventController::store - Calling Service');
            // dd('Ready to call service', Auth::user(), $data);
            $event = $this->eventService->createEvent(Auth::user(), $data);
            Log::info('EventController::store - Service Returned Event ID: ' . $event->id);

            return redirect()->route('admin.events.index')
                ->with('success', 'Event created successfully.');
        } catch (Exception $e) {
            Log::error('EventController::store - Exception: ' . $e->getMessage());
            Log::error($e->getTraceAsString());

            return redirect()->back()
                ->with('error', 'Error creating event: ' . $e->getMessage())
                ->withInput();
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $slug): Response
    {
        $event = Event::with('categories')->where('slug', $slug)->firstOrFail();

        return Inertia::render('Admin/Events/Edit', [
            'event' => $event,
            'categories' => EventCategory::all(),
            'types' => [
                Event::TYPE_WORKSHOP,
                Event::TYPE_MEETUP,
                Event::TYPE_WEBINAR,
                Event::TYPE_TRIP,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, string $slug): RedirectResponse
    {
        $event = Event::where('slug', $slug)->firstOrFail();

        try {
            $data = $request->validated();

            // Map event_type if present
            if (isset($data['event_type'])) {
                $data['type'] = $data['event_type'];
                unset($data['event_type']);
            }

            $this->eventService->updateEvent($event, Auth::user(), $data);

            return redirect()->route('admin.events.index')
                ->with('success', 'Event updated successfully.');
        } catch (Exception $e) {
            return redirect()->back()
                ->with('error', 'Error updating event: ' . $e->getMessage())
                ->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $slug): RedirectResponse
    {
        $event = Event::where('slug', $slug)->firstOrFail();

        try {
            $this->eventService->deleteEvent($event, Auth::user());
            return redirect()->route('admin.events.index')
                ->with('success', 'Event deleted successfully.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Display event statistics.
     */
    public function stats(string $slug): Response
    {
        $event = Event::where('slug', $slug)->firstOrFail();
        $stats = $this->eventService->getEventStats($event);

        return Inertia::render('Admin/Events/Stats', [
            'event' => $event,
            'stats' => $stats,
        ]);
    }

    /**
     * Display list of attendees.
     */
    public function attendees(string $slug): Response
    {
        $event = Event::with(['registrations.user'])->where('slug', $slug)->firstOrFail();

        $registrations = $event->registrations()
            ->with('user')
            ->latest()
            ->paginate(20);

        return Inertia::render('Admin/Events/Attendees', [
            'event' => $event,
            'registrations' => $registrations,
        ]);
    }

    /**
     * Mark attendance for a user.
     */
    public function markAttendance(string $slug, int $userId): RedirectResponse
    {
        $event = Event::where('slug', $slug)->firstOrFail();

        // Find registration
        $registration = $event->registrations()->where('user_id', $userId)->firstOrFail();

        try {
            $this->registrationService->markAttendance($registration);
            return redirect()->back()->with('success', 'Attendance marked successfully.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
