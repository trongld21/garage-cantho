<?php
namespace Tests\Feature;
use App\Models\User;
use App\Models\Post;
use App\Support\ArticleHtml;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
class AdminSecurityTest extends TestCase {
    use RefreshDatabase;
    private function admin(array $attributes = []): User {
        return User::factory()->create(array_merge(['email' => 'admin@example.com', 'password' => Hash::make('Initial-Password123!'), 'is_admin' => true], $attributes));
    }
    public function test_every_management_endpoint_requires_authentication(): void {
        foreach (['services','products','posts','cars'] as $resource) {
            $this->postJson('/api/admin/'.$resource, [])->assertUnauthorized();
            $this->putJson('/api/admin/'.$resource.'/1', [])->assertUnauthorized();
            $this->deleteJson('/api/admin/'.$resource.'/1')->assertUnauthorized();
        }
        foreach (['bookings','posts','editor-config'] as $resource) $this->getJson('/api/admin/'.$resource)->assertUnauthorized();
        $this->patchJson('/api/admin/bookings/1/status', ['status'=>'confirmed'])->assertUnauthorized();
        $this->deleteJson('/api/admin/bookings/1')->assertUnauthorized();
        $this->getJson('/api/services')->assertOk();
        $this->getJson('/api/posts')->assertOk();
    }
    public function test_non_admin_cannot_login_or_access_admin(): void {
        $user = User::factory()->create(['email'=>'reader@example.com','password'=>Hash::make('Initial-Password123!')]);
        $this->postJson('/api/auth/login',['email'=>$user->email,'password'=>'Initial-Password123!'])->assertUnprocessable();
        $this->actingAs($user)->getJson('/api/admin/posts')->assertForbidden();
    }
    public function test_login_logout_and_private_headers(): void {
        $user=$this->admin();
        $this->postJson('/api/auth/login',['email'=>$user->email,'password'=>'wrong'])->assertUnprocessable();
        $this->postJson('/api/auth/login',['email'=>$user->email,'password'=>'Initial-Password123!'])->assertOk()->assertJsonMissingPath('data.password');
        $this->getJson('/api/auth/me')->assertOk()->assertJsonPath('data.email',$user->email);
        $response=$this->getJson('/api/admin/posts')->assertOk();
        $this->assertStringContainsString('no-store',$response->headers->get('Cache-Control'));
        $this->postJson('/api/auth/logout')->assertNoContent();
        $this->getJson('/api/auth/me')->assertUnauthorized();
    }
    public function test_malformed_login_payload_is_rejected_without_server_error(): void {
        $this->postJson('/api/auth/login', ['email' => ['invalid'], 'password' => ['invalid']])->assertUnprocessable();
    }
    public function test_login_is_rate_limited(): void {
        for ($i=0;$i<5;$i++) $this->postJson('/api/auth/login',['email'=>'unknown@example.com','password'=>'wrong'])->assertUnprocessable();
        $this->postJson('/api/auth/login',['email'=>'unknown@example.com','password'=>'wrong'])->assertStatus(429);
    }
    public function test_temporary_password_must_be_changed_and_rules_are_enforced(): void {
        $user=$this->admin(['must_change_password'=>true]);
        $this->actingAs($user)->getJson('/api/admin/posts')->assertForbidden()->assertJsonPath('code','password_change_required');
        $this->putJson('/api/auth/password',['current_password'=>'wrong','password'=>'New-Password123!','password_confirmation'=>'New-Password123!'])->assertUnprocessable();
        $this->putJson('/api/auth/password',['current_password'=>'Initial-Password123!','password'=>'Initial-Password123!','password_confirmation'=>'Initial-Password123!'])->assertUnprocessable();
        $this->putJson('/api/auth/password',['current_password'=>'Initial-Password123!','password'=>'new123','password_confirmation'=>'new123'])->assertOk();
        $user->refresh();
        $this->assertFalse($user->must_change_password);
        $this->assertTrue(Hash::check('new123',$user->password));
        $this->getJson('/api/admin/posts')->assertOk();
    }
    public function test_html_is_sanitized_on_write_and_legacy_reads(): void {
        $html='<h2>Tiêu đề</h2><p><strong>Chữ đậm</strong></p><script>alert(1)</script><img src="https://example.com/photo.jpg" onerror="alert(1)"><a href="javascript:alert(1)">bad</a><iframe src="https://evil.example"></iframe><svg onload="alert(1)"></svg><img src="data:image/svg+xml,evil">';
        $safe=ArticleHtml::clean($html);
        foreach (['<script','onerror','javascript:','<iframe','<svg','data:image'] as $bad) $this->assertStringNotContainsString($bad,$safe);
        $this->assertStringContainsString('<h2>Tiêu đề</h2>',$safe);
        $this->assertStringContainsString('<strong>Chữ đậm</strong>',$safe);
        $this->assertStringContainsString('https://example.com/photo.jpg',$safe);
        $this->actingAs($this->admin());
        $data=['title'=>'Bài viết','slug'=>'bai-viet-html','category'=>'Phụ kiện','content'=>$html,'is_published'=>true];
        $id=$this->postJson('/api/admin/posts',$data)->assertCreated()->json('data.id');
        $this->assertStringNotContainsString('<script',Post::find($id)->getRawOriginal('content'));
        \Illuminate\Support\Facades\DB::table('posts')->where('id',$id)->update(['content'=>$html]);
        $this->getJson('/api/posts/bai-viet-html')->assertOk()->assertJsonPath('data.content',$safe);
    }
    public function test_csrf_is_required_for_login_and_authenticated_writes(): void {
        $this->app->bind(\Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class, function ($app) {
            return new class($app, $app['encrypter']) extends \Illuminate\Foundation\Http\Middleware\ValidateCsrfToken {
                protected function runningUnitTests() { return false; }
            };
        });
        $this->postJson('/api/auth/login',['email'=>'admin@example.com','password'=>'password'])->assertStatus(419);
        $this->actingAs($this->admin())->postJson('/api/admin/posts',[])->assertStatus(419);
        $this->withSession(['_token'=>'csrf-test-token'])->withHeader('X-CSRF-TOKEN','csrf-test-token')->postJson('/api/admin/posts',[])->assertUnprocessable();
    }
    public function test_password_hash_change_invalidates_old_session(): void {
        $user=$this->admin();
        $oldHash=$user->password;
        $user->password=Hash::make('Different-Password123!'); $user->save();
        $this->actingAs($user)->withSession(['password_hash_web'=>$oldHash])->getJson('/api/admin/posts')->assertUnauthorized();
    }
}
