<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_name',
        'phone',
        'email',
        'license_plate',
        'car_model',
        'service_id',
        'service_name',
        'booking_date',
        'booking_time',
        'note',
        'status',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
