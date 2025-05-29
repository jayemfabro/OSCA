<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SettingsController extends Controller
{
    /**
     * Display the settings page.
     */
    public function index()
    {
        $settings = Setting::all()->mapWithKeys(function ($setting) {
            return [$setting->key => $setting->value];
        });
        
        return Inertia::render('Settings/Index', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update the system settings.
     */
    public function updateSystem(Request $request)
    {
        $validated = $request->validate([
            'system_name' => 'required|string|max:255',
            'system_tagline' => 'nullable|string|max:255',
            'contact_email' => 'nullable|email|max:255',
            'contact_phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'logo' => 'nullable|image|max:2048',
            'favicon' => 'nullable|image|max:2048',
        ]);

        foreach ($validated as $key => $value) {
            if ($key === 'logo' || $key === 'favicon') {
                if ($request->hasFile($key)) {
                    $oldPath = Setting::where('key', $key)->value('value');
                    if ($oldPath) {
                        Storage::disk('public')->delete($oldPath);
                    }
                    
                    $path = $request->file($key)->store('settings', 'public');
                    Setting::updateOrCreate(
                        ['key' => $key],
                        ['value' => $path]
                    );
                }
            } else {
                Setting::updateOrCreate(
                    ['key' => $key],
                    ['value' => $value]
                );
            }
        }

        return redirect()->route('settings.index')
            ->with('success', 'System settings updated successfully.');
    }

    /**
     * Display the user management page.
     */
    public function users()
    {
        $users = User::orderBy('name')
            ->paginate(10);
            
        return Inertia::render('Settings/Users', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new user.
     */
    public function createUser()
    {
        return Inertia::render('Settings/UserCreate');
    }

    /**
     * Store a newly created user in storage.
     */
    public function storeUser(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => ['required', Rule::in(['admin', 'barangay_admin', 'encoder', 'viewer'])],
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        return redirect()->route('settings.users')
            ->with('success', 'User created successfully.');
    }

    /**
     * Show the form for editing a user.
     */
    public function editUser(User $user)
    {
        return Inertia::render('Settings/UserEdit', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified user in storage.
     */
    public function updateUser(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role' => ['required', Rule::in(['admin', 'barangay_admin', 'encoder', 'viewer'])],
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $data = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
        ];

        if (!empty($validated['password'])) {
            $data['password'] = Hash::make($validated['password']);
        }

        $user->update($data);

        return redirect()->route('settings.users')
            ->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroyUser(User $user)
    {
        if ($user->id === auth()->id()) {
            return redirect()->route('settings.users')
                ->with('error', 'You cannot delete your own account.');
        }

        $user->delete();

        return redirect()->route('settings.users')
            ->with('success', 'User deleted successfully.');
    }
}
