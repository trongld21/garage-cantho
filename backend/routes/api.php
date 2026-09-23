<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\CarListingController;
use App\Http\Controllers\Api\PostController;

Route::get('/up', fn () => response()->json(['status' => 'ok']));

// Public Endpoints
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{slug}', [ServiceController::class, 'show']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);

Route::post('/bookings', [BookingController::class, 'store'])->middleware('throttle:6,1');

Route::get('/cars', [CarListingController::class, 'index']);
Route::get('/cars/{id}', [CarListingController::class, 'show']);

Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{slug}', [PostController::class, 'show']);


// Admin Management Endpoints
Route::prefix('admin')->middleware(['web', \App\Http\Middleware\RequireAdmin::class, 'auth.session', \App\Http\Middleware\RequirePasswordChange::class])->group(function () {
    Route::get('/editor-config', fn () => response()->json(['data' => ['license_key' => config('services.ckeditor.license_key')]]));
    // Bookings Admin
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::patch('/bookings/{id}/status', [BookingController::class, 'updateStatus']);
    Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);


    // Services CRUD
    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);

    // Products CRUD
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    // Cars CRUD
    Route::post('/cars', [CarListingController::class, 'store']);
    Route::put('/cars/{id}', [CarListingController::class, 'update']);
    Route::delete('/cars/{id}', [CarListingController::class, 'destroy']);

    Route::get('/posts', [PostController::class, 'adminIndex']);
    // Posts CRUD
    Route::post('/posts', [PostController::class, 'store']);
    Route::put('/posts/{id}', [PostController::class, 'update']);
    Route::delete('/posts/{id}', [PostController::class, 'destroy']);
});

Route::prefix('auth')->middleware('web')->group(function () {
    Route::get('/csrf', [\App\Http\Controllers\Api\AuthController::class, 'csrf']);
    Route::post('/login', [\App\Http\Controllers\Api\AuthController::class, 'login'])->middleware('throttle:admin-login');
    Route::middleware([\App\Http\Middleware\RequireAdmin::class, 'auth.session'])->group(function () {
        Route::get('/me', [\App\Http\Controllers\Api\AuthController::class, 'me']);
        Route::post('/logout', [\App\Http\Controllers\Api\AuthController::class, 'logout']);
        Route::put('/password', [\App\Http\Controllers\Api\AuthController::class, 'password'])->middleware('throttle:6,1');
    });
});
