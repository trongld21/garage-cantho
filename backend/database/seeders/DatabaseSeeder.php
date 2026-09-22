<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\Product;
use App\Models\CarListing;
use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Services
        $services = json_decode(file_get_contents(database_path('seeders/accessory-services.json')), true);

        foreach ($services as $s) {
            Service::firstOrCreate(['slug' => $s['slug']], $s);
        }

        // 2. Seed Products (Phụ kiện & Đồ chơi ô tô)
        $products = [
            [
                'name' => 'Màn Hình Android OLEDPro A5 HD 9-10 Inch',
                'slug' => 'man-hinh-android-oledpro-a5',
                'category' => 'Đồ chơi xe',
                'brand' => 'OLEDPro',
                'price' => 4800000,
                'sale_price' => 4200000,
                'stock' => 15,
                'summary' => 'Màn hình ô tô thông minh tích hợp Vietmap S1, SIM 4G, điều khiển giọng nói Kiki.',
                'description' => 'RAM 2GB, ROM 32GB, chip 8 nhân mượt mà, màn hình chống chói IPS Full HD, độ phân giải 1280x720.',
                'image' => 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
                'is_featured' => true,
            ],
            [
                'name' => 'Cảm Biến Áp Suất Lốp Steelmate TP-MT11',
                'slug' => 'cam-bien-ap-suat-lop-steelmate-tp-mt11',
                'category' => 'Đồ chơi xe',
                'brand' => 'Steelmate',
                'price' => 2800000,
                'sale_price' => 2450000,
                'stock' => 20,
                'summary' => 'Cảm biến van trong chính xác cao, cảnh báo lỗ thủng lốp ngay lập tức trên màn hình.',
                'description' => 'Pin dùng 5 năm, cảnh báo âm thanh & hình ảnh khi áp suất lốp quá cao hoặc quá thấp.',
                'image' => 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=800&q=80',
                'is_featured' => true,
            ],
            [
                'name' => 'Camera Hành Trình Vietmap KC01 4K Cảnh Báo Giao Thông',
                'slug' => 'camera-hanh-trinh-vietmap-kc01',
                'category' => 'Đồ chơi xe',
                'brand' => 'Vietmap',
                'price' => 4300000,
                'sale_price' => 3990000,
                'stock' => 8,
                'summary' => 'Ghi hình đôi Trước & Sau Full HD/4K, đọc biển báo tốc độ & cảnh báo camera phạt nguội.',
                'description' => 'Kết nối Wifi 5Gz truyền dữ liệu về điện thoại cực nhanh, sử dụng siêu tụ điện bền bỉ.',
                'image' => 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80',
                'is_featured' => true,
            ],
        ];

        foreach ($products as $p) {
            Product::create($p);
        }

        // 3. Seed Car Listings (Mua bán & Cho thuê xe)
        $cars = [
            [
                'title' => 'Toyota Fortuner Legender 2.8L 4x4 AT 2022',
                'slug' => 'toyota-fortuner-legender-2022',
                'listing_type' => 'sale',
                'price' => 1180000000,
                'year' => 2022,
                'transmission' => 'Tự động 6 cấp',
                'fuel_type' => 'Dầu (Diesel)',
                'mileage' => '32.000 km',
                'color' => 'Trắng ngọc trai',
                'location' => 'Tây Đô Auto Car - Cần Thơ',
                'image' => 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
                'summary' => 'Xe gầm cao 7 chỗ siêu đẹp, đầy đủ lịch sử bảo dưỡng tại hãng, bảo hành garage 1 năm.',
                'description' => 'Trang bị gói an toàn Toyota Safety Sense, camera 360, 11 loa JBL, ghế chỉnh điện 8 hướng.',
                'status' => 'available',
            ],
            [
                'title' => 'Ford Everest Titanium+ 2.0L 4WD 2023',
                'slug' => 'ford-everest-titanium-2023',
                'listing_type' => 'sale',
                'price' => 1350000000,
                'year' => 2023,
                'transmission' => 'Tự động 10 cấp',
                'fuel_type' => 'Dầu Bi-Turbo',
                'mileage' => '18.000 km',
                'color' => 'Đen Titanium',
                'location' => 'Cần Thơ',
                'image' => 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
                'summary' => 'SUV Mỹ đẳng cấp, cửa sổ trời toàn cảnh Panorama, lùi xe tự động.',
                'description' => 'Xe chưa đâm đụng, thủy kích. Cam kết chất lượng văn bản 100%.',
                'status' => 'available',
            ],
            [
                'title' => 'Cho Thuê Xe Du Lịch Toyota Innova Cross 7 Chỗ Tự Lái / Có Tài',
                'slug' => 'cho-thue-xe-toyota-innova-cross',
                'listing_type' => 'rent',
                'price' => 1200000,
                'year' => 2024,
                'transmission' => 'Tự động CVT',
                'fuel_type' => 'Xăng Hybrid',
                'mileage' => 'Xe mới 100%',
                'color' => 'Đồng Ánh Kim',
                'location' => 'Cần Thơ & Miền Tây',
                'image' => 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
                'summary' => 'Dịch vụ cho thuê xe đi công tác, tham quan du lịch Cần Thơ - Rạch Giá - Phú Quốc.',
                'description' => 'Giá thuê 1.200.000đ/ngày tự lái. Có xuất hóa đơn VAT đầy đủ.',
                'status' => 'available',
            ],
        ];

        foreach ($cars as $c) {
            CarListing::create($c);
        }

        // 4. Seed Posts (Tin tức - Bài viết)
        $posts = [
            [
                'title' => 'Độ Đổi Màu Nội Thất Độc Đáo Cho Các Dòng Xe Sang',
                'slug' => 'do-doi-mau-noi-that-doc-dao',
                'category' => 'Độ xe',
                'summary' => 'Xu hướng nâng cấp không gian cabin ô tô cá tính, sang trọng với chất liệu da Nappa cao cấp.',
                'content' => 'Biến không gian xe nguyên bản thành phong cách Maybach hay Hermes xa xỉ với quy trình bọc da thủ công tinh xảo tại Tây Đô Auto Car.',
                'image' => 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
                'is_published' => true,
                'published_at' => now(),
            ]
        ];

        foreach ($posts as $p) {
            Post::create($p);
        }
    }
}
