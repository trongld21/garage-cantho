<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RescueRequest;
use Illuminate\Http\Request;

class RescueController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'location' => 'required|string|max:500',
            'car_model' => 'nullable|string|max:255',
            'issue_description' => 'nullable|string',
        ]);

        $rescue = RescueRequest::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Yêu cầu cứu hộ khẩn cấp 24/7 đã được tiếp nhận! Đội xe cứu hộ Tây Nam Bộ đang chuyển thông tin tới tài xế gần nhất.',
            'data' => $rescue
        ], 201);
    }
}
