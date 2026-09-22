<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class BootstrapAdmin extends Command
{
    protected $signature = 'admin:bootstrap';
    protected $description = 'Tạo admin từ biến môi trường khi chưa tồn tại; không đổi mật khẩu tài khoản cũ';

    public function handle(): int
    {
        $email = strtolower(trim((string) config('admin.email')));
        $password = config('admin.initial_password');
        if ($email === '' && !$password) {
            $this->info('Chưa cấu hình admin tự khởi tạo. Dùng admin:create hoặc cấu hình ADMIN_EMAIL và ADMIN_INITIAL_PASSWORD.');
            return self::SUCCESS;
        }

        $identity = Validator::make(['email' => $email], ['email' => 'required|email|max:255']);
        if ($identity->fails()) {
            $this->error('ADMIN_EMAIL phải là email hợp lệ.');
            return self::FAILURE;
        }

        $existing = User::where('email', $email)->first();
        if ($existing) {
            if (!$existing->is_admin) {
                $this->error('Email đã thuộc tài khoản không phải admin; không tự nâng quyền.');
                return self::FAILURE;
            }
            $this->info('Admin đã tồn tại; giữ nguyên mật khẩu và trạng thái tài khoản.');
            return self::SUCCESS;
        }

        $validation = Validator::make(['password' => $password], [
            'password' => ['required', 'string', 'max:255', Password::min(12)->mixedCase()->numbers()->symbols()],
        ]);
        if ($validation->fails()) {
            $this->error('ADMIN_INITIAL_PASSWORD cần ít nhất 12 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.');
            return self::FAILURE;
        }

        $user = new User([
            'name' => config('admin.name') ?: 'Quản trị Tây Đô',
            'email' => $email,
            'password' => $password, // User model hashes passwords before persistence.
        ]);
        $user->is_admin = true;
        $user->must_change_password = true;
        $user->save();
        $this->info('Đã khởi tạo admin; bắt buộc đổi mật khẩu sau khi đăng nhập.');
        return self::SUCCESS;
    }
}
