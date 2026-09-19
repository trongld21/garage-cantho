<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'category',
        'brand',
        'price',
        'sale_price',
        'stock',
        'summary',
        'description',
        'image',
        'is_featured',
    ];

    protected $casts = [
        'price' => 'decimal:0',
        'sale_price' => 'decimal:0',
        'is_featured' => 'boolean',
    ];
}
