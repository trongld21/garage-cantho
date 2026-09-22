<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarListing extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'listing_type',
        'price',
        'year',
        'transmission',
        'fuel_type',
        'mileage',
        'color',
        'location',
        'image',
        'summary',
        'description',
        'status',
    ];

    protected $casts = [
        'price' => 'integer',
    ];
}
