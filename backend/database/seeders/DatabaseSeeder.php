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
        $services = [
            [
                'name' => 'Sửa chữa & Bảo dưỡng tổng hợp',
                'slug' => 'sua-chua-bao-duong-tong-hop',
                'category' => 'sửa chữa',
                'summary' => 'Kiểm tra gầm, máy, hệ thống điện, thay dầu nhớt định kỳ và khắc phục mọi sự cố ô tô.',
                'description' => 'Garage Ô Tô Tây Nam Bộ cung cấp dịch vụ bảo dưỡng tổng hợp chuẩn 30 hạng mục: đọc lỗi hộp đen ECU, kiểm tra phanh, thay nhớt động cơ, lọc dầu, lọc gió, kiểm tra thước lái & hệ thống treo.',
                'price_range' => 'Từ 500.000đ',
                'image' => 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
                'is_featured' => true,
            ],
            [
                'name' => 'Vệ sinh khoang động cơ bằng hơi nước nóng',
                'slug' => 've-sinh-khoang-dong-co',
                'category' => 'bảo dưỡng',
                'summary' => 'Rửa động cơ ô tô chuyên sâu, loại bỏ dầu mỡ, tản nhiệt tốt hơn và ngăn ngừa gặt sự cố chuột cắn.',
                'description' => 'Sử dụng máy phun hơi nước nóng cao áp kết hợp hóa chất bảo vệ khoang máy chuyên dụng nhập khẩu, giúp động cơ sạch như mới, giảm nguy cơ chập cháy điện.',
                'price_range' => '600.000đ - 1.200.000đ',
                'image' => 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
                'is_featured' => true,
            ],
            [
                'name' => 'Đồng sơn & Phục hồi thân xe bị móp mập',
                'slug' => 'dong-son-phuc-hoi-than-xe',
                'category' => 'đồng sơn',
                'summary' => 'Sơn sấy trong phòng sơn hấp hiện đại, pha màu vi tính chính xác 100%, bảo hành 3 năm.',
                'description' => 'Chuyên phục hồi xe tai nạn, móp méo, trầy xước. Hệ thống phòng sơn hấp quy chuẩn Châu Âu, sơn lót & sơn phủ gốc nước cao cấp chống bong tróc.',
                'price_range' => 'Báo giá theo vết xước',
                'image' => 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
                'is_featured' => true,
            ],
            [
                'name' => 'Độ nội thất & Nâng cấp phụ kiện cao cấp',
                'slug' => 'do-noi-that-nang-cap-phu-kien',
                'category' => 'độ xe',
                'summary' => 'Bọc ghế da Nappa, đổi màu nội thất, lắp màn hình Android Android Auto / Apple CarPlay, âm thanh Subwoofer.',
                'description' => 'Tăng trải nghiệm sang trọng và hiện đại cho xế cưng: độ đèn LED Matrix/Bi-Laser, bọc trần 5D/6D, vô lăng carbon, dán phim cách nhiệt 3M chính hãng.',
                'price_range' => 'Từ 2.500.000đ',
                'image' => 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
                'is_featured' => true,
            ],
            [
                'name' => 'Cứu hộ ô tô khẩn cấp 24/7 Cần Thơ & Miền Tây',
                'slug' => 'cuu-ho-o-to-khan-cap-247',
                'category' => 'cứu hộ',
                'summary' => 'Đội xe cứu hộ sẵn sàng 24/7 phục vụ kéo xe tai nạn, hết bình ắc quy, thủng lốp trên mọi nẻo đường.',
                'description' => 'Đội ngũ kỹ thuật viên cứu hộ di động có mặt trong 15-30 phút tại Cần Thơ, Bình Thủy, Ninh Kiều, Cai Lậy, Vĩnh Long, Hậu Giang.',
                'price_range' => 'Phụ thuộc khoảng cách',
                'image' => 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
                'is_featured' => true,
            ],
            [
                'name' => 'Tư vấn & Làm bảo hiểm thân xe ô tô',
                'slug' => 'tu-van-bao-hiem-than-xe',
                'category' => 'bảo hiểm',
                'summary' => 'Hỗ trợ giám định hồ sơ bảo hiểm Bảo Việt, PVI, PTI, PJICO tại chỗ nhanh chóng không mất thời gian.',
                'description' => 'Garage Ô Tô Tây Nam Bộ liên kết trực tiếp với các đơn vị bảo hiểm hàng đầu Việt Nam. Khách hàng chỉ cần mang xe tới, garage lo thủ tục đền bù 100%.',
                'price_range' => 'Miễn phí tư vấn',
                'image' => 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
                'is_featured' => false,
            ],
        ];

        foreach ($services as $s) {
            Service::create($s);
        }

        // 2. Seed Products (Phụ tùng & Đồ chơi ô tô)
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
                'name' => 'Dầu Nhớt Động Cơ Mobil 1 Gold 5W-30 (4 Lít)',
                'slug' => 'dau-nhot-mobil-1-gold-5w30',
                'category' => 'Phụ tùng',
                'brand' => 'Mobil 1',
                'price' => 1350000,
                'sale_price' => 1200000,
                'stock' => 50,
                'summary' => 'Dầu nhớt tổng hợp toàn phần giúp bảo vệ động cơ chạy mượt mà lên tới 15.000 KM.',
                'description' => 'Nhập khẩu từ Mỹ, tiêu chuẩn API SP/ILSAC GF-6A, tiết kiệm nhiên liệu tối ưu.',
                'image' => 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
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
                'name' => 'Lọc Gió Động Cơ K&N Chính Hãng Cho Toyota Fortuner / Hilux',
                'slug' => 'loc-gio-dong-co-kn-toyota-fortuner',
                'category' => 'Phụ tùng',
                'brand' => 'K&N USA',
                'price' => 1950000,
                'sale_price' => null,
                'stock' => 12,
                'summary' => 'Lọc gió hiệu năng cao tái sử dụng bằng cách rửa sạch, tăng lượng gió nạp giúp xe vọt hơn.',
                'description' => 'Bảo hành 1 triệu miles từ hãng K&N Mỹ.',
                'image' => 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80',
                'is_featured' => false,
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
                'location' => 'Garage Tây Nam Bộ - Cần Thơ',
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
                'title' => 'Xe Cứu Hộ Ô Tô Cần Thơ 24/7 - Có Mặt Trong 15 Phút',
                'slug' => 'xe-cuu-ho-can-tho-247',
                'category' => 'Dịch vụ',
                'summary' => 'Dịch vụ xe cứu hộ giao thông chuyên nghiệp Cần Thơ kéo xe hỏng, cẩu xe tai nạn an toàn 24/24.',
                'content' => 'Khi di chuyển trên các quốc lộ Miền Tây hoặc khu vực Cần Thơ, sự cố bất ngờ như hỏng máy, thủng lốp hay va chạm là điều không ai mong muốn. Garage Ô Tô Tây Nam Bộ cung cấp đội xe cứu hộ chuyên dụng sàn trượt & xe cẩu kéo hiện đại.',
                'image' => 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
                'is_published' => true,
                'published_at' => now(),
            ],
            [
                'title' => 'Rửa Động Cơ Ô Tô Bằng Hơi Nước Nóng Có Cần Thiết Không?',
                'slug' => 'rua-dong-co-o-to-co-can-thiet-khong',
                'category' => 'Kinh nghiệm xe',
                'summary' => 'Giải đáp thắc mắc của chủ xe về việc vệ sinh khoang máy định kỳ và nguy cơ hỏng hóc nếu rửa sai cách.',
                'content' => 'Khoang động cơ sau một thời gian vận hành bị bám nhiều bụi bẩn, dầu nhớt thừa. Vệ sinh bằng hơi nước nóng giúp loại bỏ mảng bám mà không gây ngấm nước vào các giắc cắm điện nhạy cảm.',
                'image' => 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
                'is_published' => true,
                'published_at' => now(),
            ],
            [
                'title' => 'Độ Đổi Màu Nội Thất Độc Đáo Cho Các Dòng Xe Sang',
                'slug' => 'do-doi-mau-noi-that-doc-dao',
                'category' => 'Độ xe',
                'summary' => 'Xu hướng nâng cấp không gian cabin ô tô cá tính, sang trọng với chất liệu da Nappa cao cấp.',
                'content' => 'Biến không gian xe nguyên bản thành phong cách Maybach hay Hermes xa xỉ với quy trình bọc da thủ công tinh xảo tại Garage Tây Nam Bộ.',
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
