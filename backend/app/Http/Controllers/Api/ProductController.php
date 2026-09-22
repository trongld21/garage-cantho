<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        if ($request->filled('featured')) {
            $query->where('is_featured', $request->boolean('featured'));
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%");
        }

        return response()->json([
            'success' => true,
            'data' => $query->latest()->get()
        ]);
    }

    public function show($slug)
    {
        $product = Product::where('slug', $slug)->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $product
        ]);
    }

    private function validatedData(Request $request, $id = null): array
    {
        return $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'summary' => 'nullable|string',
            'description' => 'nullable|string',
            'image' => 'nullable|url|max:255',
            'brand' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0|lte:price',
            'stock' => 'required|integer|min:0',
            'is_featured' => 'boolean',
            'slug' => ['required', 'string', 'max:255', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', \Illuminate\Validation\Rule::unique('products', 'slug')->ignore($id)],
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validatedData($request);
        return response()->json(['data' => Product::create($data)], 201);
    }

    public function update(Request $request, $id)
    {
        $item = Product::findOrFail($id);
        $item->update($this->validatedData($request, $item->id));
        return response()->json(['data' => $item->fresh()]);
    }

    public function destroy($id)
    {
        Product::findOrFail($id)->delete();
        return response()->noContent();
    }
}
