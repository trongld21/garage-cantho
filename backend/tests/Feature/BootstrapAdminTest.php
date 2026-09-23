<?php
namespace Tests\Feature;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
class BootstrapAdminTest extends TestCase
{
    use RefreshDatabase;
    protected function setUp(): void {
        parent::setUp();
        config(['admin.email' => 'admin@taydoautocar.com', 'admin.initial_password' => 'admin123', 'admin.name' => 'Tây Đô']);
    }
    public function test_bootstrap_creates_a_hashed_admin_that_can_login(): void {
        $this->artisan('admin:bootstrap')->assertSuccessful();
        $user = User::where('email','admin@taydoautocar.com')->firstOrFail();
        $this->assertTrue($user->is_admin);
        $this->assertTrue($user->must_change_password);
        $this->assertTrue(Hash::check('admin123', $user->password));
        $this->postJson('/api/auth/login', ['email'=>$user->email,'password'=>'admin123'])->assertOk();
    }
    public function test_restart_does_not_reset_existing_password(): void {
        $this->artisan('admin:bootstrap')->assertSuccessful();
        $user = User::firstOrFail();
        $user->password = 'User-Changed456!';
        $user->must_change_password = false;
        $user->save();
        config(['admin.initial_password' => 'Another-Bootstrap789!']);
        $this->artisan('admin:bootstrap')->assertSuccessful();
        $this->assertTrue(Hash::check('User-Changed456!', $user->fresh()->password));
        $this->assertFalse($user->fresh()->must_change_password);
        $this->assertDatabaseCount('users',1);
    }
    public function test_existing_regular_user_is_not_promoted(): void {
        $user=User::factory()->create(['email'=>'admin@taydoautocar.com']);
        $this->artisan('admin:bootstrap')->assertFailed();
        $this->assertFalse($user->fresh()->is_admin);
    }
    public function test_missing_or_weak_password_cannot_create_admin(): void {
        foreach ([null, '', 'short', 'onlylowercase123456'] as $password) {
            config(['admin.initial_password' => $password]);
            $this->artisan('admin:bootstrap')->assertFailed();
        }
        $this->assertDatabaseCount('users',0);
    }
    public function test_unconfigured_bootstrap_is_optional(): void {
        config(['admin.email'=>null, 'admin.initial_password'=>null]);
        $this->artisan('admin:bootstrap')->assertSuccessful();
        $this->assertDatabaseCount('users',0);
    }
}
