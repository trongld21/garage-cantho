# Tây Đô Auto Car — Frontend

Website Next.js chuyên phụ kiện, đồ chơi ô tô và đặt lịch tư vấn/lắp đặt của Tây Đô Auto Car.

## Chạy dự án

```bash
npm install
npm run dev
```

Mở http://localhost:3000. API mặc định: `http://127.0.0.1:8000/api`. Đặt `NEXT_PUBLIC_API_URL` trong `.env.local` nếu backend chạy tại địa chỉ khác.

## Giao diện cửa hàng

Tham khảo cấu trúc và tông trắng/đỏ của https://broauto.vn/, sử dụng nội dung và thông tin liên hệ của Tây Đô:

- Header có tìm kiếm phụ kiện, hotline, giờ mở cửa, menu và liên kết đăng ký báo giá.
- Banner chuyển tay hoặc tự động bằng nút phát/dừng; dừng khi focus vào nội dung.
- Thư viện ảnh lọc theo nhóm dịch vụ, xem ảnh lớn, chuyển ảnh bằng nút hoặc phím trái/phải, Escape để đóng.
- Dịch vụ có ảnh: màn hình Android, đèn, âm thanh, camera, nội thất và ngoại thất. Danh mục nội dung công khai dùng chung tại `src/lib/offerings.ts`, độc lập với dữ liệu dịch vụ cũ trong API.
- Form tư vấn gửi đặt lịch qua API, kiểm tra số điện thoại và lịch hẹn; chỉ báo thành công khi server xác nhận.
- Sản phẩm có tab tất cả/nổi bật/khuyến mãi, lọc danh mục, sắp xếp giá và các section theo danh mục hiện có.
- Giới thiệu, tin tức, địa chỉ, chỉ đường và các nút liên hệ trên thiết bị di động.

Thông tin doanh nghiệp được giữ tại `src/lib/business.ts`. Các trang mua bán xe và cứu hộ cũ vẫn giữ URL nhưng không được quảng bá ở trang chủ/menu. Kho sản phẩm API vẫn được giữ nguyên; trang chủ không hiển thị nhóm phụ tùng bảo dưỡng. Chưa bổ sung mã hàng, giá hoặc tồn kho cho các nhóm mới khi chưa có dữ liệu thực tế.

Ảnh hiện tại là ảnh minh họa, cần thay bằng ảnh thực tế của garage trước khi xuất bản. Không sử dụng thông tin doanh nghiệp, danh mục hàng hóa hay kênh mạng xã hội của trang mẫu làm dữ liệu của Tây Đô.

Khi API danh mục không khả dụng, lớp API hiện có trả dữ liệu mẫu. Form tư vấn/đặt lịch cần backend đang chạy để lưu yêu cầu thực.

## Kiểm tra

```bash
npm run build
node --test tests/storefront.test.cjs
npm run lint
```

Bộ kiểm tra storefront bao gồm lọc, sắp xếp, xác định khuyến mãi và xác nhận lưu đặt lịch. Lint toàn dự án còn lỗi có sẵn ở admin và quy tắc import CommonJS trong bộ test; các file giao diện cập nhật được lint riêng.
