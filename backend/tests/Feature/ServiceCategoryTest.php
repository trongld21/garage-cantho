<?php
namespace Tests\Feature;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ServiceCategoryTest extends TestCase
{
    use RefreshDatabase;
    public function test_category_crud_updates_services_and_prevents_deleting_used_category(): void
    {
        $this->actingAs(User::factory()->create(['is_admin' => true]));
        $id = $this->postJson('/api/admin/service-categories', ['name' => '  Trần xe  '])->assertCreated()->assertJsonPath('data.name', 'Trần xe')->json('data.id');
        $this->postJson('/api/admin/service-categories', ['name' => 'Trần xe'])->assertUnprocessable();
        $serviceId = $this->postJson('/api/admin/services', ['name' => 'Trần sao', 'slug' => 'tran-sao-test', 'category' => 'Trần xe', 'price_range' => 'Liên hệ'])->assertCreated()->json('data.id');
        $this->deleteJson('/api/admin/service-categories/'.$id)->assertUnprocessable();
        $this->putJson('/api/admin/service-categories/'.$id, ['name' => 'Trang trí trần'])->assertOk();
        $this->getJson('/api/services/tran-sao-test')->assertJsonPath('data.category', 'Trang trí trần');
        $this->getJson('/api/service-categories')->assertJsonFragment(['name' => 'Trang trí trần', 'services_count' => 1]);
        $this->putJson('/api/admin/service-categories/'.$id, ['name' => 'Nội thất'])->assertUnprocessable();
        $this->postJson('/api/admin/service-categories', ['name' => '   '])->assertUnprocessable();
        $this->deleteJson('/api/admin/services/'.$serviceId)->assertNoContent();
        $this->deleteJson('/api/admin/service-categories/'.$id)->assertNoContent();
        $this->assertDatabaseMissing('service_categories', ['id' => $id]);
        $this->postJson('/api/admin/services', ['name' => 'Trần sao', 'slug' => 'tran-sao-test', 'category' => 'Trang trí trần', 'price_range' => 'Liên hệ'])->assertUnprocessable();
    }

    public function test_only_admin_can_modify_categories(): void
    {
        $this->getJson('/api/service-categories')->assertOk();
        $this->postJson('/api/admin/service-categories', ['name' => 'Test'])->assertUnauthorized();
        $this->actingAs(User::factory()->create(['is_admin' => false]));
        $this->postJson('/api/admin/service-categories', ['name' => 'Test'])->assertForbidden();
    }

    public function test_migration_preserves_existing_custom_categories(): void
    {
        \Illuminate\Support\Facades\Schema::drop('service_categories');
        \Illuminate\Support\Facades\DB::table('services')->insert(['name' => 'Dịch vụ cũ', 'slug' => 'dich-vu-cu', 'category' => 'Danh mục cũ', 'price_range' => 'Liên hệ']);
        $migration = require database_path('migrations/2026_10_11_000003_create_service_categories.php');
        $migration->up();
        $this->assertDatabaseHas('service_categories', ['name' => 'Danh mục cũ']);
        $this->assertDatabaseHas('services', ['slug' => 'dich-vu-cu', 'category' => 'Danh mục cũ']);
    }
}
