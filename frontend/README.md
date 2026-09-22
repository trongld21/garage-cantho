# Tây Đô Auto Car — Frontend

Website Next.js chuyên phụ kiện, đồ chơi ô tô và đặt lịch tư vấn/lắp đặt của Tây Đô Auto Car.

## Chạy dự án

```bash
npm install
npm run dev
```

Mở http://localhost:3000. Trình duyệt gọi `/api`, Next.js chuyển tiếp tới Laravel tại `http://127.0.0.1:8000`. Server rendering dùng `API_INTERNAL_URL` (mặc định `http://127.0.0.1:8000/api`); `NEXT_PUBLIC_API_URL` dùng cho trình duyệt khi cần đổi địa chỉ API.

## Giao diện cửa hàng

Tham khảo cấu trúc và tông trắng/đỏ của https://broauto.vn/, sử dụng nội dung và thông tin liên hệ của Tây Đô:

- Header có tìm kiếm phụ kiện, hotline, giờ mở cửa, menu và liên kết đăng ký báo giá.
- Banner chuyển tay hoặc tự động bằng nút phát/dừng; dừng khi focus vào nội dung.
- Thư viện ảnh lọc theo nhóm dịch vụ, xem ảnh lớn, chuyển ảnh bằng nút hoặc phím trái/phải, Escape để đóng.
- Dịch vụ có ảnh: màn hình Android, đèn, âm thanh, camera, nội thất và ngoại thất. Danh mục công khai, menu, thư viện và form tư vấn đọc từ API, dùng chung database với admin.
- Form tư vấn gửi đặt lịch qua API, kiểm tra số điện thoại và lịch hẹn; chỉ báo thành công khi server xác nhận.
- Sản phẩm có tab tất cả/nổi bật/khuyến mãi, lọc danh mục, sắp xếp giá và các section theo danh mục hiện có.
- Giới thiệu, tin tức, địa chỉ, chỉ đường và các nút liên hệ trên thiết bị di động.

Thông tin doanh nghiệp được giữ tại `src/lib/business.ts`. URL `/rescue` chuyển sang `/services`; `/admin/rescues` chuyển sang quản lý lịch hẹn. API cứu hộ đã ngừng cung cấp. Dữ liệu lịch sử cứu hộ không bị xóa.

## Quản trị và database

Trong thư mục `backend`, chạy `php artisan migrate` trước khi sử dụng phiên bản này. Migration bỏ các bản ghi mẫu bảo dưỡng/cứu hộ và phụ tùng động cơ theo slug cũ, bổ sung sáu nhóm dịch vụ phụ kiện, thêm trường tác giả bài viết. Không chạy `migrate:fresh` trên database đang sử dụng.

- `/admin/services`: thêm/sửa/xóa dịch vụ, danh mục, ảnh, mô tả, giá tham khảo, trạng thái nổi bật.
- `/admin/store`: thêm/sửa/xóa sản phẩm, thương hiệu, danh mục, ảnh, giá, khuyến mãi, tồn kho và trạng thái nổi bật.
- `/admin/posts`: thêm/sửa/xóa bài viết, tác giả, ảnh bìa, nội dung và xuất bản/ẩn bài.
- `/admin/bookings`: nhận lịch tư vấn/lắp đặt từ client và cập nhật trạng thái.
- Các trang danh mục/chi tiết lấy dữ liệu mới mỗi lần tải. Không dùng dữ liệu giả khi API lỗi; admin hiển thị lỗi và giữ form để thử lại.

Ảnh hiện tại là ảnh minh họa, cần thay bằng ảnh thực tế của garage trước khi xuất bản. Không sử dụng thông tin doanh nghiệp, danh mục hàng hóa hay kênh mạng xã hội của trang mẫu làm dữ liệu của Tây Đô.

Cần backend đang chạy để hiển thị danh mục và lưu thay đổi.

## Kiểm tra

```bash
npm run build
node --test tests/storefront.test.cjs
npm run lint
```

Bộ kiểm tra storefront bao gồm lọc, sắp xếp, xác định khuyến mãi và xác nhận lưu đặt lịch. Lint phần admin không còn lỗi; lint toàn dự án vẫn báo quy tắc import CommonJS trong bộ test `.cjs` hiện có.
