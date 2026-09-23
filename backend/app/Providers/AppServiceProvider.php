<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
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
        // DirectAdmin/MariaDB installations may cap indexed keys at 1000 bytes.
        // 191 UTF-8 MB4 characters use at most 764 bytes and remain portable.
        Schema::defaultStringLength(191);

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
