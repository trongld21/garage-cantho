<?php
namespace App\Console\Commands;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
class CreateAdmin extends Command {
    protected $signature = 'admin:create {email} {--name=Quản trị Tây Đô} {--credentials-file= : File mới để nhận mật khẩu ban đầu (quyền 0600)}';
    protected $description = 'Tạo quản trị viên với mật khẩu ngẫu nhiên, bắt buộc đổi khi đăng nhập';
    public function handle(): int {
        $email = strtolower(trim($this->argument('email')));
        $validator = Validator::make(['email' => $email], ['email' => 'required|email|max:255|unique:users,email']);
        if ($validator->fails()) { $this->error($validator->errors()->first()); return self::FAILURE; }
        $file = $this->option('credentials-file');
        if ($file && file_exists($file)) { $this->error('File đã tồn tại; không ghi đè.'); return self::FAILURE; }
        $password = bin2hex(random_bytes(16)).'Aa!9';
        $handle = null;
        if ($file) {
            $old = umask(0077);
            $handle = @fopen($file, 'x');
            umask($old);
            if (!$handle) { $this->error('Không tạo được file nhận mật khẩu.'); return self::FAILURE; }
        }
        $user = new User(['name' => $this->option('name'), 'email' => $email, 'password' => Hash::make($password)]);
        $user->is_admin = true;
        $user->must_change_password = true;
        $user->save();
        $credentials = "Email: {$email}\nMật khẩu ban đầu: {$password}\nĐăng nhập /admin/login và đổi mật khẩu.\n";
        if ($handle) { fwrite($handle, $credentials); fclose($handle); $this->info('Đã tạo admin. Thông tin đăng nhập trong file được chỉ định.'); }
        else { $this->line($credentials); }
        return self::SUCCESS;
    }
}
