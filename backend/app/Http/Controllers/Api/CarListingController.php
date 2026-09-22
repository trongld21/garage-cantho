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
        $car = CarListing::where('slug', $id)->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $car
        ]);
    }

    private function validatedData(Request $request, $id = null): array
    {
        return $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'nullable|string',
            'description' => 'nullable|string',
            'image' => 'nullable|url|max:255',
            'listing_type' => 'required|in:sale,rent',
            'price' => 'required|numeric|min:0',
            'year' => 'nullable|integer|min:1900|max:2100',
            'transmission' => 'required|string|max:255',
            'fuel_type' => 'required|string|max:255',
            'mileage' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:255',
            'location' => 'required|string|max:255',
            'status' => 'required|in:available,sold,rented',
            'slug' => ['required', 'string', 'max:255', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', \Illuminate\Validation\Rule::unique('car_listings', 'slug')->ignore($id)],
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validatedData($request);
        return response()->json(['data' => CarListing::create($data)], 201);
    }

    public function update(Request $request, $id)
    {
        $item = CarListing::findOrFail($id);
        $item->update($this->validatedData($request, $item->id));
        return response()->json(['data' => $item->fresh()]);
    }

    public function destroy($id)
    {
        CarListing::findOrFail($id)->delete();
        return response()->noContent();
    }
}
