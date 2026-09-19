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

    public function show($slug)
    {
        $post = Post::where('slug', $slug)->where('is_published', true)->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $post
        ]);
    }
}
