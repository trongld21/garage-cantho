<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'license_plate' => 'nullable|string|max:50',
            'car_model' => 'nullable|string|max:255',
            'service_id' => 'nullable|exists:services,id',
            'service_name' => 'nullable|string|max:255',
            'booking_date' => 'required|date',
            'booking_time' => 'required|string',
            'note' => 'nullable|string',
        ]);

        $booking = Booking::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Đặt lịch bảo dưỡng/sửa chữa thành công! Chúng tôi sẽ liên hệ lại xác nhận sớm nhất.',
            'data' => $booking
        ], 201);
    }
}
