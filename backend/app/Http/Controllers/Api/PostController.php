<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::where('is_published', true);

        return response()->json([
            'success' => true,
            'data' => $query->latest()->get()
        ]);
    }

    public function adminIndex() { return response()->json(['data' => Post::latest()->get()]); }

    public function show($slug)
    {
        $post = Post::where('slug', $slug)->where('is_published', true)->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $post
        ]);
    }

    private function validatedData(Request $request, $id = null): array
    {
        return $request->validate([
            'author' => 'nullable|string|max:255',
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'summary' => 'nullable|string',
            'image' => 'nullable|url|max:255',
            'content' => 'nullable|string|max:200000',
            'is_published' => 'boolean',
            'published_at' => 'nullable|date',
            'slug' => ['required', 'string', 'max:255', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', \Illuminate\Validation\Rule::unique('posts', 'slug')->ignore($id)],
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validatedData($request);
        $data['is_published'] = $data['is_published'] ?? true;
        $data['published_at'] = $data['published_at'] ?? now();
        return response()->json(['data' => Post::create($data)], 201);
    }

    public function update(Request $request, $id)
    {
        $item = Post::findOrFail($id);
        $item->update($this->validatedData($request, $item->id));
        return response()->json(['data' => $item->fresh()]);
    }

    public function destroy($id)
    {
        Post::findOrFail($id)->delete();
        return response()->noContent();
    }
}
