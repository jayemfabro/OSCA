<?php

namespace App\Http\Controllers;

use App\Models\Benefit;
use App\Models\Event;
use App\Models\SeniorCitizen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with analytics.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Basic statistics
        $stats = [
            'totalSeniors' => SeniorCitizen::count(),
            'activeSeniors' => SeniorCitizen::where('is_deceased', false)->count(),
            'deceasedSeniors' => SeniorCitizen::where('is_deceased', true)->count(),
            'totalEvents' => Event::count(),
            'upcomingEvents' => Event::where('status', 'upcoming')->count(),
            'totalBenefits' => Benefit::count(),
        ];
        
        // For admin role, include analytics
        $analytics = [];
        
        if ($user->isAdmin()) {
            // Gender distribution
            $genderDistribution = SeniorCitizen::select('gender', DB::raw('count(*) as total'))
                ->groupBy('gender')
                ->get();
                
            // Age distribution
            $ageDistribution = [
                '60-64' => SeniorCitizen::whereRaw('TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) BETWEEN 60 AND 64')->count(),
                '65-69' => SeniorCitizen::whereRaw('TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) BETWEEN 65 AND 69')->count(),
                '70-74' => SeniorCitizen::whereRaw('TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) BETWEEN 70 AND 74')->count(),
                '75-79' => SeniorCitizen::whereRaw('TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) BETWEEN 75 AND 79')->count(),
                '80+' => SeniorCitizen::whereRaw('TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) >= 80')->count(),
            ];
              // Barangay distribution
            $barangayDistribution = SeniorCitizen::select('barangays.name as barangay', DB::raw('count(*) as total'))
                ->join('barangays', 'senior_citizens.barangay_id', '=', 'barangays.id')
                ->groupBy('barangays.id', 'barangays.name')
                ->orderBy('total', 'desc')
                ->get();
                
            // Monthly registrations for the current year
            $currentYear = date('Y');
            $monthlyRegistrations = SeniorCitizen::selectRaw('MONTH(created_at) as month, COUNT(*) as total')
                ->whereYear('created_at', $currentYear)
                ->groupBy('month')
                ->orderBy('month')
                ->get()
                ->keyBy('month')
                ->map(function ($item) {
                    return $item->total;
                })
                ->toArray();
                
            // Ensure all months are represented
            for ($i = 1; $i <= 12; $i++) {
                if (!isset($monthlyRegistrations[$i])) {
                    $monthlyRegistrations[$i] = 0;
                }
            }
            ksort($monthlyRegistrations);
            
            // Benefits distribution
            $benefitsDistribution = DB::table('benefit_senior')
                ->join('benefits', 'benefits.id', '=', 'benefit_senior.benefit_id')
                ->select('benefits.name', DB::raw('count(*) as total'))
                ->groupBy('benefits.name')
                ->orderBy('total', 'desc')
                ->limit(5)
                ->get();
                
            $analytics = [
                'genderDistribution' => $genderDistribution,
                'ageDistribution' => $ageDistribution,
                'barangayDistribution' => $barangayDistribution,
                'monthlyRegistrations' => $monthlyRegistrations,
                'benefitsDistribution' => $benefitsDistribution,
            ];
        }
        
        // Recent events
        $recentEvents = Event::orderBy('start_date', 'desc')
            ->limit(5)
            ->get();
            
        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'analytics' => $analytics,
            'recentEvents' => $recentEvents,
            'userRole' => $user->role,
        ]);
    }
}
