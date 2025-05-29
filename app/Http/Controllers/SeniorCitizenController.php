<?php

namespace App\Http\Controllers;

use App\Models\SeniorCitizen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SeniorCitizenController extends Controller
{
    /**
     * Display a listing of the senior citizens.
     */    public function index(Request $request)
    {
        $seniors = SeniorCitizen::with('barangay')
            ->when($request->search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('first_name', 'like', "%{$search}%")
                        ->orWhere('middle_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%")
                        ->orWhere('senior_citizen_id', 'like', "%{$search}%");
                });
            })            ->when($request->barangay, function ($query, $barangay) {
                $query->where('barangay_id', $barangay);
            })
            ->when($request->sort, function ($query, $sort) {
                $direction = $request->direction ?? 'asc';
                $query->orderBy($sort, $direction);
            }, function ($query) {
                $query->orderBy('last_name', 'asc');
            })
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('SeniorCitizens/Index', [
            'seniors' => $seniors,
            'filters' => $request->only(['search', 'barangay', 'sort', 'direction']),
        ]);
    }

    /**
     * Show the form for creating a new senior citizen.
     */
    public function create()
    {
        return Inertia::render('SeniorCitizens/Create');
    }

    /**
     * Store a newly created senior citizen in storage.
     */
    public function store(Request $request)
    {        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'suffix' => 'nullable|string|max:10',
            'birth_date' => 'required|date',
            'place_of_birth' => 'nullable|string|max:255',
            'gender' => 'required|string|in:Male,Female',
            'nationality' => 'nullable|string|max:100',
            'civil_status' => 'required|string|in:Single,Married,Widowed,Separated,Divorced',
            'address' => 'required|string|max:255',
            'barangay' => 'required|string|max:255',
            'contact_number' => 'nullable|string|max:20',
            'emergency_contact_name' => 'nullable|string|max:255',
            'emergency_contact_number' => 'nullable|string|max:20',
            'photo' => 'required|image|max:2048', // Changed to required
            'birth_certificate' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120', // Changed to required
        ]);

        // Generate a unique Senior Citizen ID
        $seniorId = 'SC-' . date('Y') . '-' . Str::padLeft(SeniorCitizen::count() + 1, 6, '0');

        // Handle photo upload
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('seniors/photos', 'public');
            $validated['photo_path'] = $photoPath;
        }

        // Handle birth certificate upload
        if ($request->hasFile('birth_certificate')) {
            $birthCertPath = $request->file('birth_certificate')->store('seniors/documents', 'public');
            $validated['birth_certificate_path'] = $birthCertPath;
        }

        $validated['senior_citizen_id'] = $seniorId;        $senior = SeniorCitizen::create($validated);

        // Additional logic could be added here for automatically creating related records
        // such as adding the senior to specific benefits programs, etc.

        return redirect()->route('seniors.index')
            ->with('success', 'Senior citizen registered successfully. They have been added to the masterlist and are now eligible for ID generation, benefits tracking, and event participation.');
    }

    /**
     * Display the specified senior citizen.
     */
    public function show(SeniorCitizen $senior)
    {
        $senior->load(['benefits', 'events']);
        
        return Inertia::render('SeniorCitizens/Show', [
            'senior' => $senior,
        ]);
    }

    /**
     * Show the form for editing the specified senior citizen.
     */
    public function edit(SeniorCitizen $senior)
    {
        return Inertia::render('SeniorCitizens/Edit', [
            'senior' => $senior,
        ]);
    }

    /**
     * Update the specified senior citizen in storage.
     */
    public function update(Request $request, SeniorCitizen $senior)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'suffix' => 'nullable|string|max:10',
            'birth_date' => 'required|date',
            'gender' => 'required|string|in:Male,Female',
            'civil_status' => 'required|string|in:Single,Married,Widowed,Separated,Divorced',
            'address' => 'required|string|max:255',
            'barangay' => 'required|string|max:255',
            'contact_number' => 'nullable|string|max:20',
            'emergency_contact_name' => 'nullable|string|max:255',
            'emergency_contact_number' => 'nullable|string|max:20',            'photo' => 'nullable|image',
            'birth_certificate' => 'nullable|file|mimes:pdf,jpg,jpeg,png',
            'is_deceased' => 'boolean',
            'deceased_date' => 'nullable|date|required_if:is_deceased,1',
        ]);

        // Handle photo upload
        if ($request->hasFile('photo')) {
            if ($senior->photo_path) {
                Storage::disk('public')->delete($senior->photo_path);
            }
            $photoPath = $request->file('photo')->store('seniors/photos', 'public');
            $validated['photo_path'] = $photoPath;
        }

        // Handle birth certificate upload
        if ($request->hasFile('birth_certificate')) {
            if ($senior->birth_certificate_path) {
                Storage::disk('public')->delete($senior->birth_certificate_path);
            }
            $birthCertPath = $request->file('birth_certificate')->store('seniors/documents', 'public');
            $validated['birth_certificate_path'] = $birthCertPath;
        }

        $senior->update($validated);

        return redirect()->route('seniors.show', $senior)
            ->with('success', 'Senior citizen updated successfully.');
    }

    /**
     * Remove the specified senior citizen from storage.
     */
    public function destroy(SeniorCitizen $senior)
    {
        // Delete associated files
        if ($senior->photo_path) {
            Storage::disk('public')->delete($senior->photo_path);
        }
        
        if ($senior->birth_certificate_path) {
            Storage::disk('public')->delete($senior->birth_certificate_path);
        }
        
        $senior->delete();
        
        return redirect()->route('seniors.index')
            ->with('success', 'Senior citizen deleted successfully.');
    }

    /**
     * Mark a senior citizen as deceased.
     */
    public function markAsDeceased(Request $request, SeniorCitizen $senior)
    {
        $validated = $request->validate([
            'deceased_date' => 'required|date',
        ]);

        $senior->update([
            'is_deceased' => true,
            'deceased_date' => $validated['deceased_date'],
        ]);

        return redirect()->route('seniors.show', $senior)
            ->with('success', 'Senior citizen marked as deceased.');
    }

    /**
     * Generate a PDF of the senior citizen's profile.
     */
    public function generatePdf(SeniorCitizen $senior)
    {
        // Implementation for generating PDF will be added later
        // This will require a PDF library like dompdf or laravel-dompdf
        
        return redirect()->route('seniors.show', $senior)
            ->with('info', 'PDF generation feature coming soon.');
    }
}
