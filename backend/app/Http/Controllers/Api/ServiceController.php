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

        if ($request->filled('featured')) {
            $query->where('is_featured', $request->boolean('featured'));
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

    private function validatedData(Request $request, $id = null): array
    {
        return $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|in:Màn hình,Đèn ô tô,Âm thanh,Camera & an toàn,Nội thất,Ngoại thất',
            'summary' => 'nullable|string',
            'description' => 'nullable|string',
            'image' => 'nullable|url|max:255',
            'price_range' => 'required|string|max:255',
            'is_featured' => 'boolean',
            'slug' => ['required', 'string', 'max:255', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', \Illuminate\Validation\Rule::unique('services', 'slug')->ignore($id)],
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validatedData($request);
        return response()->json(['data' => Service::create($data)], 201);
    }

    public function update(Request $request, $id)
    {
        $item = Service::findOrFail($id);
        $item->update($this->validatedData($request, $item->id));
        return response()->json(['data' => $item->fresh()]);
    }

    public function destroy($id)
    {
        Service::findOrFail($id)->delete();
        return response()->noContent();
    }
}
