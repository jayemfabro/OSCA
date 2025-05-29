<?php

namespace App\Http\Controllers;

use App\Models\Barangay;
use App\Models\SeniorCitizen;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeniorRegistrationController extends Controller
{
    public function create()
    {
        return Inertia::render('Seniors/Registration', [
            'barangays' => Barangay::all()
        ]);
    }

    public function store(Request $request)
    {        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'suffix' => 'nullable|string|max:10',
            'birth_date' => 'required|date',
            'gender' => 'required|in:Male,Female',
            'civil_status' => 'required|in:Single,Married,Widowed,Divorced,Separated',
            'address' => 'required|string|max:255',
            'contact_number' => 'nullable|string|max:20',
            'barangay_id' => 'required|exists:barangays,id',
            'emergency_contact_name' => 'nullable|string|max:255',
            'emergency_contact_number' => 'nullable|string|max:20',
        ]);        // Generate a unique Senior Citizen ID by finding the highest existing ID and incrementing
        $latestId = SeniorCitizen::where('senior_citizen_id', 'like', 'SC-' . date('Y') . '-%')
            ->orderByRaw('CAST(SUBSTRING(senior_citizen_id, -6) AS UNSIGNED) DESC')
            ->value('senior_citizen_id');
        
        if ($latestId) {
            $lastNumber = (int) substr($latestId, -6);
            $nextNumber = $lastNumber + 1;
        } else {
            $nextNumber = 1;
        }
        
        $seniorId = 'SC-' . date('Y') . '-' . str_pad($nextNumber, 6, '0', STR_PAD_LEFT);
        $validated['senior_citizen_id'] = $seniorId;

        $senior = SeniorCitizen::create($validated);

        return redirect()->route('seniors.index')
            ->with('message', 'Senior citizen registered successfully.');
    }
}
