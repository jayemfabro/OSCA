<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\BarangaySeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed barangays first
        $this->call(BarangaySeeder::class);

        // Create users with different roles
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Barangay Admin',
            'email' => 'barangay@example.com',
            'password' => bcrypt('password'),
            'role' => 'barangay_admin',
        ]);

        User::create([
            'name' => 'Encoder User',
            'email' => 'encoder@example.com',
            'password' => bcrypt('password'),
            'role' => 'encoder',
        ]);

        User::create([
            'name' => 'Viewer User',
            'email' => 'viewer@example.com',
            'password' => bcrypt('password'),
            'role' => 'viewer',
        ]);

        // Create some benefits
        $benefits = [
            ['name' => 'Monthly Allowance', 'description' => 'Monthly financial assistance for senior citizens'],
            ['name' => 'Medical Checkup', 'description' => 'Free regular medical checkups'],
            ['name' => 'Medicine Subsidy', 'description' => 'Subsidized medicines for maintenance medication'],
            ['name' => 'Grocery Subsidy', 'description' => 'Monthly grocery assistance'],
            ['name' => 'Transportation Discount', 'description' => '20% discount on public transportation'],
        ];

        foreach ($benefits as $benefit) {
            \App\Models\Benefit::create($benefit);
        }

        // Create some events
        $events = [
            [
                'title' => 'Annual Medical Mission',
                'description' => 'Free medical checkup, consultation, and medicines',
                'start_date' => now()->addDays(15),
                'end_date' => now()->addDays(15),
                'location' => 'Municipal Health Center',
                'status' => 'upcoming',
            ],
            [
                'title' => 'Senior Citizen Day Celebration',
                'description' => 'Celebration of the National Respect for Senior Citizens Day',
                'start_date' => now()->addMonth(),
                'end_date' => now()->addMonth(),
                'location' => 'Municipal Auditorium',
                'status' => 'upcoming',
            ],
            [
                'title' => 'Weekly Exercise Program',
                'description' => 'Regular exercise program for senior citizens',
                'start_date' => now()->addDays(7),
                'end_date' => now()->addDays(7),
                'location' => 'Municipal Plaza',
                'status' => 'upcoming',
            ],
        ];

        foreach ($events as $event) {
            \App\Models\Event::create($event);
        }

        // Create default settings
        $settings = [
            ['key' => 'system_name', 'value' => 'OSCA Management System'],
            ['key' => 'system_tagline', 'value' => 'Office of Senior Citizens Affairs'],
            ['key' => 'contact_email', 'value' => 'osca@example.com'],
            ['key' => 'contact_phone', 'value' => '(123) 456-7890'],
            ['key' => 'address', 'value' => '123 Main Street, City'],
        ];

        foreach ($settings as $setting) {
            \App\Models\Setting::create($setting);
        }
    }
}
