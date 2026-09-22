<?php
namespace Tests\Feature;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
class CatalogManagementTest extends TestCase {
    use RefreshDatabase;
    protected function setUp(): void {
        parent::setUp();
        $user = \App\Models\User::factory()->create(['is_admin' => true]);
        $this->actingAs($user);
    }
    public function test_service_crud_is_reflected_in_public_catalog(): void {
        $data = ['name'=>'Camera mới', 'slug'=>'camera-moi', 'category'=>'Camera & an toàn', 'summary'=>'Tư vấn camera', 'description'=>'Lắp đặt camera', 'price_range'=>'Liên hệ', 'is_featured'=>true];
        $id = $this->postJson('/api/admin/services', $data)->assertCreated()->json('data.id');
        $this->getJson('/api/services/camera-moi')->assertOk()->assertJsonPath('data.name', 'Camera mới');
        $this->putJson("/api/admin/services/$id", array_merge($data, ['name'=>'Camera cập nhật', 'is_featured'=>false]))->assertOk();
        $this->getJson('/api/services/camera-moi')->assertJsonPath('data.name','Camera cập nhật')->assertJsonPath('data.is_featured',false);
        $this->postJson('/api/admin/services', $data)->assertUnprocessable()->assertJsonValidationErrors('slug');
        $this->postJson('/api/admin/services', array_merge($data,['slug'=>'bao-duong','category'=>'bảo dưỡng']))->assertUnprocessable();
        $this->deleteJson("/api/admin/services/$id")->assertNoContent();
        $this->getJson('/api/services/camera-moi')->assertNotFound();
    }
    public function test_product_prices_stock_and_deletion(): void {
        $data = ['name'=>'Màn hình', 'slug'=>'man-hinh-test', 'category'=>'Màn hình', 'brand'=>'Test', 'price'=>1000000, 'sale_price'=>null, 'stock'=>0, 'is_featured'=>false];
        $id=$this->postJson('/api/admin/products',$data)->assertCreated()->json('data.id');
        $this->putJson("/api/admin/products/$id",array_merge($data,['sale_price'=>2000000]))->assertUnprocessable();
        $this->putJson("/api/admin/products/$id",array_merge($data,['sale_price'=>0,'is_featured'=>true]))->assertOk();
        $this->getJson('/api/products/man-hinh-test')->assertJsonPath('data.stock',0)->assertJsonPath('data.sale_price',0);
        $this->deleteJson("/api/admin/products/$id")->assertNoContent();
        $this->getJson('/api/products/man-hinh-test')->assertNotFound();
    }
    public function test_post_drafts_author_and_publication(): void {
        $data=['title'=>'Chọn camera','slug'=>'chon-camera','category'=>'Phụ kiện','author'=>'Tây Đô','content'=>'Nội dung','is_published'=>false];
        $id=$this->postJson('/api/admin/posts',$data)->assertCreated()->json('data.id');
        $this->getJson('/api/posts/chon-camera')->assertNotFound();
        $this->getJson('/api/admin/posts')->assertJsonFragment(['author'=>'Tây Đô']);
        $this->putJson("/api/admin/posts/$id",array_merge($data,['is_published'=>true]))->assertOk();
        $this->getJson('/api/posts/chon-camera')->assertOk()->assertJsonPath('data.author','Tây Đô');
        $this->deleteJson("/api/admin/posts/$id")->assertNoContent();
        $this->getJson('/api/posts/chon-camera')->assertNotFound();
    }
    public function test_bookings_and_retired_rescue_endpoint(): void {
        $id=$this->postJson('/api/bookings',['customer_name'=>'Khách thử','phone'=>'0901234567','service_name'=>'Camera','booking_date'=>'2027-01-01','booking_time'=>'09:00'])->assertCreated()->json('data.id');
        $this->getJson('/api/admin/bookings')->assertJsonFragment(['booking_id'=>'TNB-'.$id]);
        $this->patchJson("/api/admin/bookings/$id/status",['status'=>'confirmed'])->assertOk();
        $this->assertDatabaseHas('bookings',['id'=>$id,'status'=>'confirmed']);
        $this->patchJson("/api/admin/bookings/$id/status",['status'=>'invalid'])->assertUnprocessable();
        $this->deleteJson("/api/admin/bookings/$id")->assertNoContent();
        $this->postJson('/api/rescue',[])->assertNotFound();
    }
    public function test_fresh_seed_has_accessories_and_no_retired_offerings(): void {
        $this->seed();
        $this->assertDatabaseHas('services',['slug'=>'man-hinh-android']);
        $this->assertDatabaseMissing('services',['slug'=>'sua-chua-bao-duong-tong-hop']);
        $this->assertDatabaseMissing('posts',['slug'=>'xe-cuu-ho-can-tho-247']);
        $this->assertDatabaseMissing('products',['slug'=>'loc-gio-dong-co-kn-toyota-fortuner']);
    }
}
