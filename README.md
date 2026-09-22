# garage-cantho

## Demo toàn bộ trên Render Free

Một Docker Web Service chạy Next.js và Laravel cùng nhau. Next.js nhận cổng
`PORT` của Render và chuyển `/api/*` tới Laravel trên cổng nội bộ 8000.
Không cần tạo service backend hoặc database riêng.

### Deploy

1. Commit và push các file cấu hình này lên GitHub.
2. Trong Render chọn **New → Blueprint**, kết nối repository
   `trongld21/garage-cantho`, chọn branch `main`.
3. Render đọc `render.yaml`. Kiểm tra service `garage-cantho-demo` có plan
   **Free**, rồi chọn **Deploy Blueprint**.
4. Chờ build và health check thành công; mở URL `https://<service>.onrender.com`
   mà Render cung cấp.

Nếu tạo thủ công bằng **New → Web Service**, chọn:

| Mục | Giá trị |
| --- | --- |
| Language / Runtime | Docker |
| Branch | main |
| Root Directory | Để trống (gốc repository) |
| Dockerfile Path | ./Dockerfile |
| Docker Build Context | . |
| Instance Type | Free |
| Health Check Path | /healthz |
| Docker Command | Để trống |

Không đặt Root Directory là `frontend` hoặc `backend`: Docker cần cả hai.
Giao diện công khai chạy được không cần thêm biến môi trường. Để đăng nhập admin, cấu hình theo mục bên dưới. API URL `/api` được đặt lúc build;
APP_KEY được tạo lúc khởi động. Không upload `.env` local.

### Tạo tài khoản admin trên Render

Tài khoản MySQL local không được đưa lên database SQLite của Render. Nếu đăng nhập trả `422` với thông báo “Email hoặc mật khẩu không đúng”, kiểm tra tài khoản trên đúng môi trường.

Sau khi deploy phiên bản có `admin:bootstrap`, mở **Render → garage-cantho-demo → Environment**, thêm:

- `ADMIN_EMAIL`: `admin@taydoautocar.com`
- `ADMIN_INITIAL_PASSWORD`: mật khẩu ban đầu riêng, tối thiểu 12 ký tự gồm chữ hoa, chữ thường, số và ký tự đặc biệt. Nhập dưới dạng giá trị biến môi trường, không thêm dấu nháy bao ngoài.
- `ADMIN_NAME`: `Quản trị Tây Đô` (tùy chọn).

Lưu và redeploy. Startup tạo admin nếu email chưa tồn tại; log chỉ báo kết quả, không in mật khẩu. Mở `/admin/login`, dùng email và mật khẩu vừa cấu hình, rồi đổi mật khẩu theo yêu cầu.

Khởi động lại với database còn nguyên **không ghi đè** mật khẩu đã đổi và không nâng quyền tài khoản thường trùng email. Render demo dùng SQLite tạm thời: nếu database bị tạo lại, admin được khởi tạo lại từ biến môi trường và phải đổi mật khẩu lại. Cần database lưu bền vững khi sử dụng thực tế. Không đặt mật khẩu trong `render.yaml`, Dockerfile hoặc source code.

### Kiểm tra sau deploy

- `/`: giao diện website.
- `/admin`: giao diện quản trị demo.
- `/healthz`: kiểm tra cả Next.js và Laravel.
- `/api/services`: dữ liệu mẫu lấy từ SQLite.
- Thử đặt lịch tư vấn/lắp đặt bằng dữ liệu giả để kiểm tra API.

### Phạm vi demo

- SQLite được tạo và seed khi container chưa có database. Các lần restart
  còn giữ file thì không seed lặp. Render Free có filesystem tạm thời: dữ liệu
  nhập thêm có thể mất khi restart, redeploy hoặc service ngủ. Khi đó dữ liệu
  mẫu được tạo lại. Không dùng để lưu lịch khách hàng thật.
- Render Free ngủ sau 15 phút không có truy cập; lần mở tiếp theo có thể cần
  khoảng một phút. Xem https://render.com/docs/free.
- CRUD dịch vụ, sản phẩm, bài viết và quản lý lịch hẹn lưu trực tiếp vào database.
  API quản trị yêu cầu đăng nhập admin, CSRF và đổi mật khẩu ban đầu. Tạo tài khoản riêng bằng `php artisan admin:create <email>`; xem hướng dẫn trong `frontend/README.md`.
- PHP chạy bằng server tích hợp cho demo ít truy cập; khi triển khai thực tế
  cần chuyển sang PHP-FPM/FrankenPHP và database lưu bền vững.

### Chạy thử Docker tại máy

```bash
docker build -t garage-cantho-demo .
docker run --rm --name garage-cantho-demo -p 10000:10000 garage-cantho-demo
```

Mở http://localhost:10000. Dừng bằng Ctrl+C. Không mount database local vào
container demo để tránh tác động dữ liệu đang phát triển.
