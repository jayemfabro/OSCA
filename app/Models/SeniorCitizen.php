<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class SeniorCitizen extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'suffix',
        'birth_date',
        'place_of_birth',
        'gender',
        'nationality',
        'civil_status',
        'address',
        'barangay_id',
        'contact_number',
        'emergency_contact_name',
        'emergency_contact_number',
        'photo_path',
        'birth_certificate_path',
        'senior_citizen_id',
        'is_deceased',
        'deceased_date',
    ];
    
    /**
     * Get the barangay that the senior citizen belongs to.
     */
    public function barangay()
    {
        return $this->belongsTo(Barangay::class);
    }

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'birth_date' => 'date',
        'deceased_date' => 'date',
        'is_deceased' => 'boolean',
    ];

    /**
     * Get the full name of the senior citizen.
     */
    public function getFullNameAttribute(): string
    {
        $name = "{$this->first_name} ";
        
        if ($this->middle_name) {
            $name .= "{$this->middle_name} ";
        }
        
        $name .= $this->last_name;
        
        if ($this->suffix) {
            $name .= ", {$this->suffix}";
        }
        
        return $name;
    }

    /**
     * Get the benefits of the senior citizen.
     */
    public function benefits(): BelongsToMany
    {
        return $this->belongsToMany(Benefit::class, 'benefit_senior')
            ->withPivot('date_received', 'remarks')
            ->withTimestamps();
    }

    /**
     * Get the events attended by the senior citizen.
     */
    public function events(): BelongsToMany
    {
        return $this->belongsToMany(Event::class, 'event_senior')
            ->withPivot('attended', 'remarks')
            ->withTimestamps();
    }
}
