<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'category',
        'summary',
        'description',
        'price_range',
        'image',
        'gallery',
        'is_featured',
    ];

    protected $casts = [
        'gallery' => 'array',
        'is_featured' => 'boolean',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
