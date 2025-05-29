<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Benefit extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * Get the senior citizens who received this benefit.
     */
    public function seniors(): BelongsToMany
    {
        return $this->belongsToMany(SeniorCitizen::class, 'benefit_senior')
            ->withPivot('date_received', 'remarks')
            ->withTimestamps();
    }
}
