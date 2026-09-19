# GARAGE Ô TÔ TÂY NAM BỘ - FRONTEND & ADMIN PORTAL REDESIGN WALKTHROUGH

Hệ thống Frontend & Portal Quản Trị Admin website **Garage Ô Tô Tây Nam Bộ Cần Thơ** đã được xây dựng và redesign toàn bộ theo chuẩn **Modern European Premium Automotive** ("Precision. Performance. Trust.") truyền cảm hứng từ Porsche, Mercedes-Benz, BMW và Audi.

---

## 1. NHỮNG PHẦN ĐÃ THAY ĐỔI & XÂY DỰNG MỚI

### 🎨 Visual & Design System Admin Portal
- **Giao diện Admin Độc Lập**: Tách biệt hoàn toàn với trang User, sở hữu Sidebar Navigation cố định và Header hiển thị trạng thái API & Database thời gian thực.
- **Hệ màu Châu Âu thống nhất**: `Primary Black (#0A0A0A)`, `Graphite (#161616)`, `Surface (#202020)`, `Champagne Gold (#C7A35A)`, `Emergency Red (#E53935)`.

---

## 2. DANH SÁCH BẢNG ĐIỀU KHIỂN ADMIN (`/admin/*`)

| Route Admin | Chức Năng Quản Lý |
| :--- | :--- |
| **`/admin`** | **Dashboard Tổng Quan**: Chỉ số KPI (Doanh thu, Đặt lịch, Cứu hộ 24/7 khẩn cấp, Xe còn bán, Phụ tùng) & Feed ứng cứu khẩn cấp |
| **`/admin/bookings`** | **Quản Lý Đặt Lịch**: Bảng lịch hẹn bảo dưỡng, bộ lọc trạng thái (*Chờ duyệt, Xác nhận, Đang sửa, Hoàn thành, Hủy*), xem chi tiết modal & cập nhật tức thì |
| **`/admin/rescues`** | **Quản Lý Cứu Hộ 24/7**: Trung tâm điều động xe sàn trượt, xem vị trí sự cố & tọa độ GPS tự động, chuyển trạng thái (*Điều xe -> Hoàn thành*) |
| **`/admin/services`** | **Quản Lý Dịch Vụ Garage (CRUD)**: Thêm/Sửa/Xóa dịch vụ, báo giá tham khảo, bài viết quy trình & nổi bật trang chủ |
| **`/admin/store`** | **Quản Lý Cửa Hàng Phụ Tùng (CRUD)**: Thêm/Sửa/Xóa linh kiện, điều chỉnh giá niêm yết, giá khuyến mãi & số lượng tồn kho |
| **`/admin/cars`** | **Quản Lý Showroom Xe (CRUD)**: Thêm/Sửa/Xóa xe mua bán & xe cho thuê, cập nhật năm, km, hộp số, nhiên liệu & trạng thái |
| **`/admin/posts`** | **Quản Lý Tin Tức & Bài Viết (CRUD)**: Đăng bài viết chia sẻ kinh nghiệm xe, tác giả & danh mục biên tập |

---

## 3. MỞ RỘNG CÁC ROUTE TRÊN TRANG USER (`/`)

| Route | Loại Route | Mô Tả Chức Năng |
| :--- | :--- | :--- |
| `/` | Static | Trang chủ 14 sections Automotive Châu Âu |
| `/services` | Static | Trang danh mục dịch vụ sửa chữa, đồng sơn, bảo dưỡng |
| `/services/[slug]` | Dynamic | Trang chi tiết dịch vụ: Lợi ích, Quy trình 5 bước, Bảng giá, FAQ |
| `/store` | Static | Cửa hàng phụ tùng & đồ chơi xe kèm bộ lọc tìm kiếm |
| `/store/[slug]` | Dynamic | Trang chi tiết sản phẩm: Gallery, Thông số kỹ thuật, Dòng xe tương thích |
| `/cars` | Static | Showroom Mua Bán & Cho Thuê Xe ô tô 4-7 chỗ |
| `/cars/[slug]` | Dynamic | Trang chi tiết xe: Gallery, Thông số, Tính năng, Cam kết kiểm định 176 hạng mục |
| `/rescue` | Static | Trang Cứu Hộ Ô Tô 24/7 khẩn cấp ưu tiên mobile, tích hợp **Geolocation API** lấy tọa độ GPS tự động |
| `/news` & `/news/[slug]` | Static/Dynamic | Tin tức & kinh nghiệm vận hành ô tô |
| `/contact` | Static | Trang liên hệ, hotline, form tư vấn & Google Maps tương tác |

---

## 4. API DỮ LIỆU ĐỘNG & INTEGRATION (`src/services/api.ts` & Laravel Backend)

- **Kết nối API**: Đã đấu nối đầy đủ các hàm fetch & CRUD dữ liệu động giữa Laravel REST API & Next.js Frontend (`getBookings`, `updateBookingStatus`, `getRescueRequests`, `updateRescueStatus`, `saveService`, `deleteService`, `saveProduct`, `deleteProduct`, `saveCar`, `deleteCar`, `savePost`, `deletePost`, `getDashboardStats`).
- **Trang bị In-Memory Dynamic State Fallback**: Đảm bảo tất cả tính năng Admin CRUD, cập nhật trạng thái lịch hẹn & điều xe cứu hộ hoạt động mượt mà ngay cả khi backend offline.

---

## 5. HƯỚNG DẪN TRUY CẬP ADMIN PORTAL

### Môi trường Dev:
1. Chạy lệnh:
   ```bash
   cd frontend
   npm run dev
   ```
2. Truy cập Portal Admin:
   👉 **`http://localhost:3000/admin`**
