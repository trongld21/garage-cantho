<?php
namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;
class RequirePasswordChange {
    public function handle(Request $request, Closure $next) {
        if ($request->user()->must_change_password) {
            return response()->json(['message' => 'Vui lòng đổi mật khẩu ban đầu.', 'code' => 'password_change_required'], 403);
        }
        return $next($request);
    }
}
