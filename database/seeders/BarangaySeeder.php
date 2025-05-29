<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Barangay;

class BarangaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $barangays = [
            [
                'name' => 'Poblacion',
                'code' => 'PBL-001',
                'description' => 'Main town center barangay'
            ],
            [
                'name' => 'San Miguel',
                'code' => 'SMG-001',
                'description' => 'Northern barangay area'
            ],
            [
                'name' => 'San Jose',
                'code' => 'SJE-001',
                'description' => 'Southern residential area'
            ],
            [
                'name' => 'Santa Cruz',
                'code' => 'SCZ-001',
                'description' => 'Eastern agricultural area'
            ],
            [
                'name' => 'Santo Niño',
                'code' => 'STN-001',
                'description' => 'Western coastal area'
            ],
        ];

        foreach ($barangays as $barangay) {
            Barangay::create($barangay);
        }
    }
}