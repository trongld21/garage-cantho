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

## Đăng nhập quản trị

- Mở `/admin/login`. API `/api/admin/*` yêu cầu phiên đăng nhập và quyền admin; chỉ bảo vệ giao diện là không đủ.
- Chạy `php artisan migrate` trong `backend`, sau đó tạo tài khoản bằng:

```bash
php artisan admin:create admin@taydoautocar.com --name="Quản trị Tây Đô" --credentials-file=/duong-dan-rieng/admin-credentials.txt
```

Lệnh tạo mật khẩu ngẫu nhiên và file mới quyền `0600`, không ghi đè tài khoản có sẵn. File phải nằm ngoài thư mục public/source được commit. Đổi mật khẩu ngay ở `/admin/account` khi đăng nhập lần đầu. Không có tài khoản hay mật khẩu mặc định trong source; mỗi môi trường phải tạo admin riêng.

Phiên lưu bằng cookie HttpOnly, SameSite=Lax; thao tác quản trị kiểm tra CSRF, đăng nhập có giới hạn tần suất. Đổi mật khẩu vô hiệu các phiên cũ; đăng xuất hủy phiên hiện tại. Mật khẩu dùng hash của Laravel. Chạy HTTPS ở production, `APP_DEBUG=false`, `SESSION_SECURE_COOKIE=true` và APP_KEY ổn định. Không dùng session cookie driver cho quản trị: dùng database hoặc file (mặc định demo).

Browser luôn gọi auth/admin qua `/api` cùng origin. Cấu hình `API_INTERNAL_URL` phải trỏ tới backend đúng trước khi chạy/build Next.js. Không đặt API quản trị trên origin riêng bằng `NEXT_PUBLIC_API_URL`.

## CKEditor và nội dung bài viết

CKEditor 5 được tải riêng trong màn soạn bài; hỗ trợ tiêu đề, đậm/nghiêng, danh sách, liên kết, trích dẫn, bảng và chèn ảnh qua URL. Chưa có chức năng upload ảnh lên server.

Đặt `CKEDITOR_LICENSE_KEY` trong `backend/.env` (hoặc biến môi trường server), rồi chạy `php artisan config:clear`/`config:cache` theo môi trường. Chỉ dùng giá trị `GPL` nếu dự án đáp ứng giấy phép đó; không tự bật GPL cho website thương mại. Khi chưa có khóa, admin dùng ô nhập văn bản/HTML và giữ nguyên nội dung đã lưu. Xem [hướng dẫn license CKEditor](https://ckeditor.com/docs/ckeditor5/latest/getting-started/licensing/license-and-legal.html).

Backend lọc HTML theo danh sách cho phép khi ghi và đọc cả bài cũ: bỏ script, iframe, SVG, event handler, URL javascript/data và các thuộc tính ngoài cấu hình. Client hiển thị HTML đã lọc, giữ tiêu đề, danh sách, bảng và ảnh.

## Chia sẻ bài viết

Trang chi tiết có Facebook, X/Twitter, Instagram (sao chép link), sao chép liên kết và bảng chia sẻ của thiết bị nếu trình duyệt hỗ trợ. Người dùng tự xác nhận chia sẻ; website không tự đăng lên tài khoản mạng xã hội. Instagram dùng liên kết sao chép để dán vào tin nhắn hoặc nhãn Link của Story.

Đặt `SITE_URL=https://ten-mien-thuc-te` cho Next.js để canonical, Open Graph và Twitter Card dùng đúng URL. Render tự dùng `RENDER_EXTERNAL_URL` nếu chưa đặt SITE_URL; local lấy origin của request. Ảnh bìa cần URL công khai để nền tảng lấy ảnh xem trước.

## Kiểm thử bảo mật

Trong `backend`: `php artisan test` kiểm tra truy cập trái phép, phân quyền, CSRF, giới hạn đăng nhập, đổi mật khẩu, hủy phiên và lọc HTML. Trong `frontend`: `npm run build -- --webpack` và `node --test tests/storefront.test.cjs`. Việc dùng CKEditor đầy đủ cần license key hợp lệ; cấu hình thiếu khóa có fallback để tiếp tục biên tập.
