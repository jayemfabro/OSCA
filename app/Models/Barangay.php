<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barangay extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'description',
    ];

    /**
     * Get senior citizens belonging to this barangay.
     */
    public function seniorCitizens()
    {
        return $this->hasMany(SeniorCitizen::class);
    }
}
