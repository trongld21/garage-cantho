<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $query = Service::query();

        if ($request->has('featured')) {
            $query->where('is_featured', true);
        }

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        return response()->json([
            'success' => true,
            'data' => $query->latest()->get()
        ]);
    }

    public function show($slug)
    {
        $service = Service::where('slug', $slug)->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $service
        ]);
    }
}
