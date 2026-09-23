# garage-cantho

> DirectAdmin production không có SSH được triển khai qua signed HTTPS package hook. Xem [DEPLOY_DIRECTADMIN.md](DEPLOY_DIRECTADMIN.md). Phần hướng dẫn SSH cũ bên dưới chỉ giữ lại để tham khảo cho hosting khác có shell access.

## Production trên DirectAdmin

Production dùng kiến trúc phù hợp shared hosting: Next.js được GitHub Actions xuất thành
HTML/CSS/JS tĩnh trong `public_html`, còn Laravel chạy bằng PHP/MySQL tại `/api`.
Không cần Docker, Node.js hay PM2 trên server. Dữ liệu trang được tải từ API ở trình duyệt,
vì vậy nội dung tạo trong trang quản trị hiển thị ngay mà không cần build lại frontend.
Chế độ này được bật bằng `NEXT_OUTPUT=export`; build Docker/Render hiện có vẫn dùng
`standalone` mặc định.

### 1. Yêu cầu hosting

- PHP 8.2 trở lên (khuyến nghị 8.3), các extension `mbstring`, `pdo_mysql`, `dom`, `xml`, `curl`.
- MySQL/MariaDB và SSH. Tài khoản SSH cần quyền ghi vào thư mục domain.
- Apache bật `mod_rewrite`, `mod_headers` và cho phép `.htaccess`.
- Document root mặc định dạng `/home/USER/domains/DOMAIN/public_html`.

### 2. Tạo môi trường production một lần

Tạo database/user trong DirectAdmin. Lần chạy workflow đầu tiên sẽ tạo
`app/shared/.env` từ mẫu rồi chủ động dừng. Điền file này qua SSH hoặc File Manager:

```bash
nano /home/USER/domains/DOMAIN/app/shared/.env
```

Điền `.env` trên server; không commit hoặc upload file này vào GitHub. Tạo `APP_KEY` bằng
`php artisan key:generate --show`, rồi chép kết quả vào `APP_KEY`. URL bên ngoài luôn dùng
prefix `/api`; Laravel tự nhận biết DirectAdmin đang mount `public` bằng symlink `/api` để
không lặp prefix, còn local/Docker vẫn đăng ký prefix `api` bình thường.

### 3. GitHub Actions secrets

Trong repository, mở **Settings → Environments → New environment**, tạo `production`, rồi
thêm các environment secrets:

| Secret | Giá trị |
| --- | --- |
| `DA_HOST` | Hostname/IP SSH của hosting |
| `DA_PORT` | Cổng SSH, thường là `22` |
| `DA_USER` | Tài khoản DirectAdmin/SSH |
| `DA_SSH_PRIVATE_KEY` | Private key dành riêng cho deploy |
| `DA_KNOWN_HOSTS` | Dòng host key lấy bằng `ssh-keyscan -p PORT HOST` |
| `DA_APP_PATH` | `/home/USER/domains/DOMAIN/app` |
| `DA_PUBLIC_PATH` | `/home/USER/domains/DOMAIN/public_html` |
| `HEALTHCHECK_URL` | URL gốc, ví dụ `https://taydoautocar.vn` |

Không lưu database password, `APP_KEY` hoặc mật khẩu admin trong GitHub: các giá trị runtime
này chỉ nằm trong `app/shared/.env` trên server. Workflow
`.github/workflows/deploy-directadmin.yml` tự chạy khi push lên `main`, hoặc có thể chạy tay
bằng **Actions → Deploy to DirectAdmin → Run workflow**.

Mỗi deploy tạo release riêng, migrate database trước khi đổi symlink, và giữ ba release gần
nhất. Lần đầu, workflow tạo symlink `public_html/api` và `public_html/storage`; nếu hai đường
dẫn này đã là thư mục thật, deploy sẽ dừng để tránh ghi đè dữ liệu.

Sau khi đăng nhập admin lần đầu và đổi mật khẩu, xóa `ADMIN_INITIAL_PASSWORD` khỏi `.env`,
rồi chạy `php artisan config:cache` trong release hiện tại.

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
- `ADMIN_INITIAL_PASSWORD`: mật khẩu ban đầu không để trống. Nên dùng mật khẩu mạnh và riêng cho production; nhập dưới dạng giá trị biến môi trường, không thêm dấu nháy bao ngoài.
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
