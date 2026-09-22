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
            'message' => 'Đặt lịch tư vấn/lắp đặt thành công! Chúng tôi sẽ liên hệ lại xác nhận sớm nhất.',
            'data' => $booking
        ], 201);
    }

    public function index()
    {
        return response()->json(['data' => Booking::latest()->get()->map(function ($booking) {
            return array_merge($booking->toArray(), ['booking_id' => 'TNB-'.$booking->id]);
        })]);
    }
    public function updateStatus(Request $request, $id)
    {
        $data = $request->validate(['status' => 'required|in:pending,confirmed,in_progress,completed,cancelled']);
        $booking = Booking::findOrFail($id);
        $booking->update($data);
        return response()->json(['data' => $booking]);
    }
    public function destroy($id)
    {
        Booking::findOrFail($id)->delete();
        return response()->noContent();
    }
}
