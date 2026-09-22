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
Không cần nhập biến môi trường để chạy demo. API URL `/api` được đặt lúc build;
APP_KEY được tạo lúc khởi động. Không upload `.env` local.

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
