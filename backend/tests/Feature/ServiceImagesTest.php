<?php
namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ServiceImagesTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_uploads_multiple_images_and_saves_public_gallery(): void
    {
        Storage::fake('public');
        $this->actingAs(User::factory()->create(['is_admin' => true]));
        $urls = $this->post('/api/admin/services/images', ['images' => [UploadedFile::fake()->image('first.jpg'), UploadedFile::fake()->image('second.png')]], ['Accept' => 'application/json'])->assertCreated()->json('data');
        $this->assertCount(2, $urls);
        $this->assertCount(2, Storage::disk('public')->allFiles('services'));
        $id = $this->postJson('/api/admin/services', ['name' => 'Bộ ảnh', 'slug' => 'bo-anh', 'category' => 'Nội thất', 'price_range' => 'Liên hệ', 'image' => $urls[1], 'gallery' => $urls])->assertCreated()->json('data.id');
        $this->getJson('/api/services/bo-anh')->assertJsonPath('data.gallery', $urls)->assertJsonPath('data.image', $urls[1]);
        $this->putJson('/api/admin/services/'.$id, ['name' => 'Bộ ảnh', 'slug' => 'bo-anh', 'category' => 'Nội thất', 'price_range' => 'Liên hệ', 'image' => $urls[1], 'gallery' => [$urls[1]]])->assertOk()->assertJsonPath('data.gallery', [$urls[1]]);
    }

    public function test_upload_requires_admin_and_rejects_non_images(): void
    {
        Storage::fake('public');
        $this->postJson('/api/admin/services/images')->assertUnauthorized();
        $this->actingAs(User::factory()->create(['is_admin' => false]));
        $this->postJson('/api/admin/services/images')->assertForbidden();
        $this->actingAs(User::factory()->create(['is_admin' => true]));
        $this->post('/api/admin/services/images', ['images' => [UploadedFile::fake()->create('script.php', 1, 'text/plain')]], ['Accept' => 'application/json'])->assertUnprocessable();
        $this->assertCount(0, Storage::disk('public')->allFiles());
    }
}
