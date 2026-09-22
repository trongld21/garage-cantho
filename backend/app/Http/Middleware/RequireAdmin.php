<?php
namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;
class RequireAdmin {
    public function handle(Request $request, Closure $next) {
        abort_unless($request->user(), 401, 'Vui lòng đăng nhập quản trị.');
        abort_unless($request->user()->is_admin, 403, 'Tài khoản không có quyền quản trị.');
        return $next($request);
    }
}
