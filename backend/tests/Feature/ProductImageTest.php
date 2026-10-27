<?php
namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProductImageTest extends TestCase
{
    use RefreshDatabase;

    public function test_stock_can_be_omitted_or_cleared_without_accepting_negative_values(): void
    {
        $this->actingAs(User::factory()->create(['is_admin' => true]));
        $data = ['name' => 'Camera', 'slug' => 'camera', 'category' => 'Camera', 'brand' => 'Chính hãng', 'price' => 1000000];
        $id = $this->postJson('/api/admin/products', $data)->assertCreated()->assertJsonPath('data.stock', 0)->json('data.id');
        $this->putJson("/api/admin/products/{$id}", [...$data, 'stock' => 5])->assertOk()->assertJsonPath('data.stock', 5);
        $this->putJson("/api/admin/products/{$id}", [...$data, 'stock' => ''])->assertOk()->assertJsonPath('data.stock', 0);
        $this->putJson("/api/admin/products/{$id}", [...$data, 'stock' => -1])->assertUnprocessable()->assertJsonValidationErrors('stock');
    }

    public function test_admin_uploads_image_and_saves_product_with_public_url(): void
    {
        Storage::fake('public');
        $this->actingAs(User::factory()->create(['is_admin' => true]));
        $url = $this->post('/api/admin/products/image', ['image' => UploadedFile::fake()->image('product.png')], ['Accept' => 'application/json'])->assertCreated()->json('data');
        $this->assertCount(1, Storage::disk('public')->allFiles('products'));
        $this->postJson('/api/admin/products', ['name' => 'Màn hình', 'slug' => 'man-hinh', 'category' => 'Phụ kiện', 'brand' => 'Chính hãng', 'price' => 1000000, 'stock' => 10, 'image' => $url])->assertCreated();
        $this->getJson('/api/products/man-hinh')->assertOk()->assertJsonPath('data.image', $url);
    }

    public function test_upload_requires_admin_and_validates_file_type_and_size(): void
    {
        Storage::fake('public');
        $this->postJson('/api/admin/products/image')->assertUnauthorized();
        $this->actingAs(User::factory()->create(['is_admin' => false]));
        $this->postJson('/api/admin/products/image')->assertForbidden();
        $this->actingAs(User::factory()->create(['is_admin' => true]));
        $this->post('/api/admin/products/image', ['image' => UploadedFile::fake()->create('script.php', 1, 'text/plain')], ['Accept' => 'application/json'])->assertUnprocessable();
        $this->post('/api/admin/products/image', ['image' => UploadedFile::fake()->image('large.jpg')->size(2049)], ['Accept' => 'application/json'])->assertUnprocessable();
        $this->assertCount(0, Storage::disk('public')->allFiles());
    }
}
