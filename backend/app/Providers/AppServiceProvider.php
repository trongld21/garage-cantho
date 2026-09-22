<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        \Illuminate\Support\Facades\RateLimiter::for('admin-login', function (\Illuminate\Http\Request $request) {
            $email = $request->input('email');
            $identity = is_string($email) ? strtolower(trim($email)) : 'invalid';
            return [
                \Illuminate\Cache\RateLimiting\Limit::perMinute(5)->by(hash('sha256', $identity).'|'.$request->ip()),
                \Illuminate\Cache\RateLimiting\Limit::perMinute(20)->by($request->ip()),
            ];
        });
    }
}
