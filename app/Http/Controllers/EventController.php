<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\SeniorCitizen;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the events.
     */
    public function index(Request $request)
    {
        $events = Event::query()
            ->when($request->search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhere('location', 'like', "%{$search}%");
                });
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->orderBy('start_date', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Events/Index', [
            'events' => $events,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new event.
     */
    public function create()
    {
        return Inertia::render('Events/Create');
    }

    /**
     * Store a newly created event in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'location' => 'nullable|string|max:255',
            'status' => 'required|string|in:upcoming,ongoing,completed,cancelled',
        ]);

        Event::create($validated);

        return redirect()->route('events.index')
            ->with('success', 'Event created successfully.');
    }

    /**
     * Display the specified event.
     */
    public function show(Event $event)
    {
        $event->load(['seniors' => function ($query) {
            $query->orderBy('last_name', 'asc');
        }]);
        
        return Inertia::render('Events/Show', [
            'event' => $event,
        ]);
    }

    /**
     * Show the form for editing the specified event.
     */
    public function edit(Event $event)
    {
        return Inertia::render('Events/Edit', [
            'event' => $event,
        ]);
    }

    /**
     * Update the specified event in storage.
     */
    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'location' => 'nullable|string|max:255',
            'status' => 'required|string|in:upcoming,ongoing,completed,cancelled',
        ]);

        $event->update($validated);

        return redirect()->route('events.index')
            ->with('success', 'Event updated successfully.');
    }

    /**
     * Remove the specified event from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();
        
        return redirect()->route('events.index')
            ->with('success', 'Event deleted successfully.');
    }

    /**
     * Register a senior citizen for an event.
     */
    public function registerSenior(Request $request, Event $event)
    {
        $validated = $request->validate([
            'senior_ids' => 'required|array',
            'senior_ids.*' => 'exists:senior_citizens,id',
        ]);

        foreach ($validated['senior_ids'] as $seniorId) {
            if (!$event->seniors->contains($seniorId)) {
                $event->seniors()->attach($seniorId, [
                    'attended' => false,
                ]);
            }
        }

        return redirect()->back()
            ->with('success', 'Seniors registered for the event.');
    }

    /**
     * Mark attendance for a senior citizen at an event.
     */
    public function markAttendance(Request $request, Event $event)
    {
        $validated = $request->validate([
            'senior_id' => 'required|exists:senior_citizens,id',
            'attended' => 'required|boolean',
            'remarks' => 'nullable|string',
        ]);

        $event->seniors()->updateExistingPivot($validated['senior_id'], [
            'attended' => $validated['attended'],
            'remarks' => $validated['remarks'] ?? null,
        ]);

        return redirect()->back()
            ->with('success', 'Attendance updated.');
    }

    /**
     * Remove a senior citizen from an event.
     */
    public function removeSenior(Request $request, Event $event)
    {
        $validated = $request->validate([
            'senior_id' => 'required|exists:senior_citizens,id',
        ]);

        $event->seniors()->detach($validated['senior_id']);

        return redirect()->back()
            ->with('success', 'Senior removed from the event.');
    }
}
