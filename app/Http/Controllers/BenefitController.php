<?php

namespace App\Http\Controllers;

use App\Models\Benefit;
use App\Models\SeniorCitizen;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BenefitController extends Controller
{
    /**
     * Display a listing of the benefits.
     */
    public function index(Request $request)
    {
        $benefits = Benefit::query()
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->orderBy('name', 'asc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Benefits/Index', [
            'benefits' => $benefits,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new benefit.
     */
    public function create()
    {
        return Inertia::render('Benefits/Create');
    }

    /**
     * Store a newly created benefit in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:benefits',
            'description' => 'nullable|string',
        ]);

        Benefit::create($validated);

        return redirect()->route('benefits.index')
            ->with('success', 'Benefit created successfully.');
    }

    /**
     * Display the specified benefit.
     */
    public function show(Benefit $benefit)
    {
        $benefit->load(['seniors' => function ($query) {
            $query->orderBy('last_name', 'asc');
        }]);
        
        return Inertia::render('Benefits/Show', [
            'benefit' => $benefit,
        ]);
    }

    /**
     * Show the form for editing the specified benefit.
     */
    public function edit(Benefit $benefit)
    {
        return Inertia::render('Benefits/Edit', [
            'benefit' => $benefit,
        ]);
    }

    /**
     * Update the specified benefit in storage.
     */
    public function update(Request $request, Benefit $benefit)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:benefits,name,' . $benefit->id,
            'description' => 'nullable|string',
        ]);

        $benefit->update($validated);

        return redirect()->route('benefits.index')
            ->with('success', 'Benefit updated successfully.');
    }

    /**
     * Remove the specified benefit from storage.
     */
    public function destroy(Benefit $benefit)
    {
        $benefit->delete();
        
        return redirect()->route('benefits.index')
            ->with('success', 'Benefit deleted successfully.');
    }

    /**
     * Display the benefits tracker.
     */
    public function tracker(Request $request)
    {
        $seniors = SeniorCitizen::query()
            ->with('benefits')
            ->when($request->search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('first_name', 'like', "%{$search}%")
                        ->orWhere('middle_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%")
                        ->orWhere('senior_citizen_id', 'like', "%{$search}%");
                });
            })            ->when($request->barangay, function ($query, $barangay) {
                $query->whereHas('barangay', function($q) use ($barangay) {
                    $q->where('id', $barangay);
                });
            })
            ->orderBy('last_name', 'asc')
            ->paginate(10)
            ->withQueryString();

        $benefits = Benefit::all();

        return Inertia::render('Benefits/Tracker', [
            'seniors' => $seniors,
            'benefits' => $benefits,
            'filters' => $request->only(['search', 'barangay']),
        ]);
    }

    /**
     * Assign a benefit to a senior citizen.
     */
    public function assignBenefit(Request $request, SeniorCitizen $senior)
    {
        $validated = $request->validate([
            'benefit_id' => 'required|exists:benefits,id',
            'date_received' => 'required|date',
            'remarks' => 'nullable|string',
        ]);

        $senior->benefits()->attach($validated['benefit_id'], [
            'date_received' => $validated['date_received'],
            'remarks' => $validated['remarks'] ?? null,
        ]);

        return redirect()->back()
            ->with('success', 'Benefit assigned successfully.');
    }

    /**
     * Remove a benefit from a senior citizen.
     */
    public function removeBenefit(Request $request, SeniorCitizen $senior)
    {
        $validated = $request->validate([
            'benefit_id' => 'required|exists:benefits,id',
        ]);

        $senior->benefits()->detach($validated['benefit_id']);

        return redirect()->back()
            ->with('success', 'Benefit removed successfully.');
    }    /**
     * Generate a PDF report of benefits.
     */
    public function generateReport(Request $request)
    {
        $benefits = Benefit::with(['seniors' => function ($query) {
            $query->orderBy('last_name', 'asc');
        }])->get();

        $totalSeniors = SeniorCitizen::count();
        $currentDate = now()->format('F d, Y');

        $pdf = \PDF::loadView('pdfs.benefits-report', [
            'benefits' => $benefits,
            'totalSeniors' => $totalSeniors,
            'currentDate' => $currentDate,
        ]);

        return $pdf->download('benefits-report-' . now()->format('Y-m-d') . '.pdf');
    }
}
