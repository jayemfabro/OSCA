<?php

namespace App\Http\Controllers;

use App\Models\SeniorCitizen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class IdGenerationController extends Controller
{
    /**
     * Display a listing of senior citizens for ID generation.
     */
    public function index(Request $request)
    {
        $seniors = SeniorCitizen::query()
            ->when($request->search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('first_name', 'like', "%{$search}%")
                        ->orWhere('middle_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%")
                        ->orWhere('senior_citizen_id', 'like', "%{$search}%");
                });
            })
            ->when($request->barangay, function ($query, $barangay) {
                $query->where('barangay_id', $barangay);
            })
            ->with('barangay')
            ->orderBy('last_name', 'asc')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('IdGeneration/Index', [
            'seniors' => $seniors,
            'filters' => $request->only(['search', 'barangay']),
        ]);
    }

    /**
     * Show the form for editing/customizing an ID.
     */
    public function edit(SeniorCitizen $senior)
    {
        return Inertia::render('IdGeneration/Edit', [
            'senior' => $senior,
        ]);
    }

    /**
     * Generate the QR code for a senior citizen ID.
     */
    public function generateQrCode(SeniorCitizen $senior)
    {
        try {
            // For now, we're not generating actual QR codes due to GD extension issues
            // Instead, return the senior ID as text that will be displayed in the ID card
            return response()->json([
                'senior_id' => $senior->senior_citizen_id,
                'message' => 'QR code generation requires GD extension'
            ]);
        } catch (\Exception $e) {
            \Log::error('QR Code generation failed: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to generate QR code: ' . $e->getMessage()
            ], 500);
        }
    }    /**
     * Generate a PDF of the senior citizen ID.
     */
    public function printId(SeniorCitizen $senior)
    {
        try {
            // Generate QR code data
            $qrData = json_encode([
                'id' => $senior->senior_citizen_id,
                'name' => $senior->full_name,
                'birth_date' => $senior->birth_date->format('Y-m-d'),
            ]);

            // Generate QR code image
            $qrCodeUrl = $this->generateQrCodeAsDataUri($qrData);
            
            // Get the photo URL if available
            $photoUrl = null;
            if ($senior->photo_path) {
                try {
                    $photoUrl = Storage::disk('public')->url($senior->photo_path);
                } catch (\Exception $e) {
                    \Log::warning('Photo loading issue: ' . $e->getMessage());
                }
            }

            // Prepare single ID data
            $seniorsData = [[
                'senior' => $senior,
                'qrCodeUrl' => $qrCodeUrl,
                'photoUrl' => $photoUrl,
            ]];

            // Generate PDF
            $pdf = \PDF::loadView('pdfs.senior-ids-batch', [
                'seniorsData' => $seniorsData,
            ]);
            
            // Configure PDF settings
            $this->setupPdf($pdf);

            // Generate filename
            $filename = 'senior-id-' . $senior->senior_citizen_id . '.pdf';

            // Return response that forces download
            return response()->streamDownload(
                function () use ($pdf) {
                    echo $pdf->output();
                },
                $filename,
                [
                    'Content-Type' => 'application/pdf',
                    'Content-Disposition' => 'attachment; filename="' . $filename . '"',
                ]
            );

        } catch (\Exception $e) {
            \Log::error('PDF Generation failed: ' . $e->getMessage());
            return back()->with('error', 'Failed to generate PDF: ' . $e->getMessage());
        }
    }

    /**
     * Generate PDFs of multiple senior citizen IDs.
     */
    public function printBatch(Request $request)
    {
        try {
            $ids = explode(',', $request->query('ids', ''));
            if (empty($ids)) {
                return back()->with('error', 'No IDs selected for printing');
            }

            $seniors = SeniorCitizen::whereIn('id', $ids)->get();
            if ($seniors->isEmpty()) {
                return back()->with('error', 'No valid senior citizens found');
            }
            
            // Prepare data for the PDF view
            $seniorsData = [];
            foreach ($seniors as $senior) {
                // Generate QR code data
                $qrData = json_encode([
                    'id' => $senior->senior_citizen_id,
                    'name' => $senior->full_name,
                    'birth_date' => $senior->birth_date->format('Y-m-d'),
                ]);
                
                // Generate QR code image
                $qrCodeUrl = $this->generateQrCodeAsDataUri($qrData);
                
                // Get the photo URL if available
                $photoUrl = null;
                if ($senior->photo_path) {
                    try {
                        $photoUrl = Storage::disk('public')->url($senior->photo_path);
                    } catch (\Exception $e) {
                        \Log::warning('Photo loading issue for senior ' . $senior->id . ': ' . $e->getMessage());
                    }
                }
                
                $seniorsData[] = [
                    'senior' => $senior,
                    'qrCodeUrl' => $qrCodeUrl,
                    'photoUrl' => $photoUrl,
                ];
            }

            // Generate PDF
            $pdf = \PDF::loadView('pdfs.senior-ids-batch', [
                'seniorsData' => $seniorsData,
            ]);
            
            // Configure PDF settings
            $this->setupPdf($pdf);

            // Generate filename
            $filename = 'senior-ids-batch-' . now()->format('Y-m-d') . '.pdf';

            // Return response that forces download
            return response()->streamDownload(
                function () use ($pdf) {
                    echo $pdf->output();
                },
                $filename,
                [
                    'Content-Type' => 'application/pdf',
                    'Content-Disposition' => 'attachment; filename="' . $filename . '"',
                ]
            );

        } catch (\Exception $e) {
            \Log::error('Batch PDF Generation failed: ' . $e->getMessage());
            return back()->with('error', 'Failed to generate batch PDF: ' . $e->getMessage());
        }
    }

    /**
     * Generate QR code as a data URI.
     */
    private function generateQrCodeAsDataUri(string $data): string
    {
        try {
            // Since we're having issues with direct QR code generation,
            // let's create a text-based QR code with simple HTML
            return 'data:text/html;base64,' . base64_encode(
                '<div style="text-align: center; padding: 15px;">' .
                '<strong>OSCA ID: ' . htmlspecialchars($data) . '</strong>' .
                '<div style="margin: 10px 0; font-style: italic; font-size: small;">Use OSCA Mobile App to scan this ID</div>' .
                '</div>'
            );
        } catch (\Exception $e) {
            \Log::error('QR Code generation failed: ' . $e->getMessage());
            
            // Fallback to a simple text representation
            return 'data:text/html;base64,' . base64_encode(
                '<div style="border: 1px solid black; padding: 10px; text-align: center;">' .
                'ID: ' . htmlspecialchars($data) .
                '</div>'
            );
        }
    }    /**
     * Configure common PDF settings for consistent output
     */
    private function setupPdf($pdf)
    {
        // Use A4 landscape with custom size
        $width = 504; // 7 inches in points
        $height = 153; // 2.125 inches in points
        
        // Set basic PDF options
        $pdf->setPaper([0, 0, $width, $height], 'landscape');
        
        // Configure PDF output options
        $pdf->setOption('isPhpEnabled', true);
        $pdf->setOption('isHtml5ParserEnabled', true);
        $pdf->setOption('isRemoteEnabled', true);
        $pdf->setOption('dpi', 300);
        
        // Disable smart shrinking to maintain exact dimensions
        $pdf->setOption('enable-smart-shrinking', false);
        
        // Enable JavaScript for any dynamic content
        $pdf->setOption('enable-javascript', true);
        $pdf->setOption('javascript-delay', 1000);
        
        // Set margins to 0
        $pdf->setOption('margin-top', 0);
        $pdf->setOption('margin-right', 0);
        $pdf->setOption('margin-bottom', 0);
        $pdf->setOption('margin-left', 0);
        
        // Return the configured PDF instance
        return $pdf;
    }
}
