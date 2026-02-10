<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventsController extends Controller
{
    public function index()
    {
        $events = Event::latest()->take(5)->get();

        return Inertia::render('web/views/Community/Community', [
            'events' => $events,
        ]);
    }
}