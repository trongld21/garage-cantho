<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CarListing;
use Illuminate\Http\Request;

class CarListingController extends Controller
{
    public function index(Request $request)
    {
        $query = CarListing::query();

        if ($request->has('type')) {
            $query->where('listing_type', $request->type);
        }

        return response()->json([
            'success' => true,
            'data' => $query->latest()->get()
        ]);
    }

    public function show($id)
    {
        $car = CarListing::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $car
        ]);
    }
}
