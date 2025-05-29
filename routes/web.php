<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Barangay;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Senior citizen routes
    Route::get('/seniors', [App\Http\Controllers\SeniorCitizenController::class, 'index'])->name('seniors.index');
    
    // Senior Registration routes
    Route::get('/seniors/registration', [App\Http\Controllers\SeniorRegistrationController::class, 'create'])
        ->middleware('role:admin,encoder')
        ->name('seniors.registration');
    Route::post('/seniors/registration', [App\Http\Controllers\SeniorRegistrationController::class, 'store'])
        ->middleware('role:admin,encoder')
        ->name('seniors.registration.store');
    Route::post('/seniors', [App\Http\Controllers\SeniorCitizenController::class, 'store'])
        ->middleware('role:admin,encoder')
        ->name('seniors.store');
    Route::get('/seniors/{senior}', [App\Http\Controllers\SeniorCitizenController::class, 'show'])->name('seniors.show');
    Route::get('/seniors/{senior}/edit', [App\Http\Controllers\SeniorCitizenController::class, 'edit'])
        ->middleware('role:admin,encoder')
        ->name('seniors.edit');
    Route::patch('/seniors/{senior}', [App\Http\Controllers\SeniorCitizenController::class, 'update'])
        ->middleware('role:admin,encoder')
        ->name('seniors.update');
    Route::delete('/seniors/{senior}', [App\Http\Controllers\SeniorCitizenController::class, 'destroy'])
        ->middleware('role:admin')
        ->name('seniors.destroy');
    Route::post('/seniors/{senior}/deceased', [App\Http\Controllers\SeniorCitizenController::class, 'markAsDeceased'])
        ->middleware('role:admin,encoder')
        ->name('seniors.deceased');
    Route::get('/seniors/{senior}/pdf', [App\Http\Controllers\SeniorCitizenController::class, 'generatePdf'])
        ->name('seniors.pdf');

    // ID Generation routes
    Route::get('/id-generation', [App\Http\Controllers\IdGenerationController::class, 'index'])->name('id-generation.index');
    Route::get('/id-generation/{senior}/edit', [App\Http\Controllers\IdGenerationController::class, 'edit'])->name('id-generation.edit');
    Route::get('/id-generation/{senior}/qr-code', [App\Http\Controllers\IdGenerationController::class, 'generateQrCode'])->name('id-generation.qrcode');
    Route::get('/id-generation/{senior}/print', [App\Http\Controllers\IdGenerationController::class, 'printId'])->name('id-generation.print');
    Route::match(['get', 'post'], '/id-generation/batch-print', [App\Http\Controllers\IdGenerationController::class, 'printBatch'])->name('id-generation.batch-print');

    // Benefit routes
    Route::get('/benefits', [App\Http\Controllers\BenefitController::class, 'index'])->name('benefits.index');
    Route::get('/benefits/create', [App\Http\Controllers\BenefitController::class, 'create'])
        ->middleware('role:admin')
        ->name('benefits.create');
    Route::post('/benefits', [App\Http\Controllers\BenefitController::class, 'store'])
        ->middleware('role:admin')
        ->name('benefits.store');
    Route::get('/benefits/{benefit}', [App\Http\Controllers\BenefitController::class, 'show'])->name('benefits.show');
    Route::get('/benefits/{benefit}/edit', [App\Http\Controllers\BenefitController::class, 'edit'])
        ->middleware('role:admin')
        ->name('benefits.edit');
    Route::patch('/benefits/{benefit}', [App\Http\Controllers\BenefitController::class, 'update'])
        ->middleware('role:admin')
        ->name('benefits.update');
    Route::delete('/benefits/{benefit}', [App\Http\Controllers\BenefitController::class, 'destroy'])
        ->middleware('role:admin')
        ->name('benefits.destroy');
    
    // Benefits Tracker routes
    Route::get('/benefits-tracker', [App\Http\Controllers\BenefitController::class, 'tracker'])->name('benefits.tracker');
    Route::post('/benefits-tracker/seniors/{senior}/assign', [App\Http\Controllers\BenefitController::class, 'assignBenefit'])
        ->middleware('role:admin,encoder')
        ->name('benefits.assign');
    Route::delete('/benefits-tracker/seniors/{senior}/remove', [App\Http\Controllers\BenefitController::class, 'removeBenefit'])
        ->middleware('role:admin,encoder')
        ->name('benefits.remove');
    Route::get('/benefits-tracker/report', [App\Http\Controllers\BenefitController::class, 'generateReport'])->name('benefits.report');

    // Events routes
    Route::get('/events', [App\Http\Controllers\EventController::class, 'index'])->name('events.index');
    Route::get('/events/create', [App\Http\Controllers\EventController::class, 'create'])
        ->middleware('role:admin,encoder')
        ->name('events.create');
    Route::post('/events', [App\Http\Controllers\EventController::class, 'store'])
        ->middleware('role:admin,encoder')
        ->name('events.store');
    Route::get('/events/{event}', [App\Http\Controllers\EventController::class, 'show'])->name('events.show');
    Route::get('/events/{event}/edit', [App\Http\Controllers\EventController::class, 'edit'])
        ->middleware('role:admin,encoder')
        ->name('events.edit');
    Route::patch('/events/{event}', [App\Http\Controllers\EventController::class, 'update'])
        ->middleware('role:admin,encoder')
        ->name('events.update');
    Route::delete('/events/{event}', [App\Http\Controllers\EventController::class, 'destroy'])
        ->middleware('role:admin')
        ->name('events.destroy');
    Route::post('/events/{event}/register-seniors', [App\Http\Controllers\EventController::class, 'registerSenior'])
        ->middleware('role:admin,encoder')
        ->name('events.register-seniors');
    Route::patch('/events/{event}/mark-attendance', [App\Http\Controllers\EventController::class, 'markAttendance'])
        ->middleware('role:admin,encoder')
        ->name('events.mark-attendance');
    Route::delete('/events/{event}/remove-senior', [App\Http\Controllers\EventController::class, 'removeSenior'])
        ->middleware('role:admin,encoder')
        ->name('events.remove-senior');

    // Settings routes (admin only)
    Route::middleware('role:admin')->group(function () {
        Route::get('/settings', [App\Http\Controllers\SettingsController::class, 'index'])->name('settings.index');
        Route::patch('/settings/system', [App\Http\Controllers\SettingsController::class, 'updateSystem'])->name('settings.system.update');
        
        // User management
        Route::get('/settings/users', [App\Http\Controllers\SettingsController::class, 'users'])->name('settings.users');
        Route::get('/settings/users/create', [App\Http\Controllers\SettingsController::class, 'createUser'])->name('settings.users.create');
        Route::post('/settings/users', [App\Http\Controllers\SettingsController::class, 'storeUser'])->name('settings.users.store');
        Route::get('/settings/users/{user}/edit', [App\Http\Controllers\SettingsController::class, 'editUser'])->name('settings.users.edit');
        Route::patch('/settings/users/{user}', [App\Http\Controllers\SettingsController::class, 'updateUser'])->name('settings.users.update');
        Route::delete('/settings/users/{user}', [App\Http\Controllers\SettingsController::class, 'destroyUser'])->name('settings.users.destroy');
    });
});

require __DIR__.'/auth.php';
