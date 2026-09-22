<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;
class AuthController extends Controller {
    public function csrf(Request $request) {
        return response()->json(['csrf_token' => $request->session()->token()]);
    }
    public function login(Request $request) {
        $data = $request->validate(['email' => 'required|email|max:255', 'password' => 'required|string|max:255']);
        $data['email'] = strtolower(trim($data['email']));
        if (!Auth::attempt([...$data, 'is_admin' => true], false)) {
            throw ValidationException::withMessages(['email' => 'Email hoặc mật khẩu không đúng.']);
        }
        $request->session()->regenerate();
        $request->session()->put('password_hash_web', $request->user()->password);
        return response()->json(['data' => $request->user()]);
    }
    public function me(Request $request) { return response()->json(['data' => $request->user()]); }
    public function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->noContent();
    }
    public function password(Request $request) {
        $data = $request->validate([
            'current_password' => 'required|current_password:web',
            'password' => ['required', 'string', 'confirmed', 'different:current_password', 'max:255', Password::min(12)->mixedCase()->numbers()->symbols()],
        ]);
        $user = $request->user();
        $user->password = Hash::make($data['password']);
        $user->must_change_password = false;
        $user->save();
        if (config('session.driver') === 'database') {
            DB::table(config('session.table', 'sessions'))->where('user_id', $user->id)->delete();
        }
        $request->session()->regenerate(true);
        $request->session()->put('password_hash_web', $user->password);
        return response()->json(['data' => $user]);
    }
}
