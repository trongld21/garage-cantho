# Deploy Tây Đô Auto Car lên DirectAdmin không có SSH

Production dùng Next.js export tĩnh trong `public_html` và Laravel/PHP tại `/api`. Server không cần Node.js, Composer, Docker, SSH hay PM2.

## 1. Chuẩn bị DirectAdmin một lần

1. Chọn PHP **8.3** (tối thiểu 8.2) cho `taydoautocar.vn`.
2. Tạo một database MySQL và một database user, gán toàn quyền user vào database. Ghi lại tên đầy đủ có prefix DirectAdmin.
3. Chạy tại máy phát triển:

   ```bash
   php deploy/directadmin/generate-secrets.php
   ```

   Lưu riêng hai giá trị `APP_KEY` và `DEPLOY_HOOK_KEY`; không commit chúng.
4. Trong File Manager tạo `domains/taydoautocar.vn/app/shared/`.
5. Sao chép `backend/.env.directadmin.example` thành `.env`, điền cấu hình production rồi upload vào `app/shared/.env`:

   ```dotenv
   APP_NAME="Tây Đô Auto Car"
   APP_ENV=production
   APP_KEY=<APP_KEY vừa tạo>
   APP_DEBUG=false
   APP_URL=https://taydoautocar.vn
   DEPLOY_HOOK_KEY=<DEPLOY_HOOK_KEY vừa tạo>

   DB_CONNECTION=mysql
   DB_HOST=localhost
   DB_PORT=3306
   DB_DATABASE=<tên database đầy đủ>
   DB_USERNAME=<tên user database đầy đủ>
   DB_PASSWORD=<mật khẩu database>

   SESSION_DRIVER=file
   CACHE_STORE=file
   QUEUE_CONNECTION=sync
   FILESYSTEM_DISK=public
   SESSION_SECURE_COOKIE=true
   ```

6. Upload `deploy/directadmin/deploy-hook.php` thành `domains/taydoautocar.vn/public_html/deploy-hook.php`.
7. Mở `https://taydoautocar.vn/deploy-hook.php?check=1`. Kết quả đúng:

   ```json
   {"hook":"https-package-v1","envConfigured":true,"keyConfigured":true,"pharAvailable":true,"zlibAvailable":true,"pdoMysqlAvailable":true,"symlinkAvailable":true,"apiPath":"missing","storagePath":"missing","currentPath":"missing"}
   ```

Nếu `pharAvailable`, `zlibAvailable`, `pdoMysqlAvailable` hoặc `symlinkAvailable` là `false`, dừng lại và liên hệ hosting bật PHP Phar, zlib, PDO MySQL hoặc symlink; hook sẽ không thể giải nén hoặc kích hoạt Laravel an toàn.
Ba trường đường dẫn phải là `missing` ở lần deploy đầu hoặc `symlink` ở các lần sau. Nếu là `directory`/`file`, đổi tên đường dẫn tương ứng trong File Manager trước khi chạy workflow.

## 2. Tạo GitHub environment secrets

Trong repository vào **Settings → Environments → production → Environment secrets**:

| Secret | Giá trị |
| --- | --- |
| `DEPLOY_HOOK_URL` | `https://taydoautocar.vn/deploy-hook.php` |
| `DEPLOY_HOOK_KEY` | giống `DEPLOY_HOOK_KEY` trong `app/shared/.env` |
| `HEALTHCHECK_URL` | `https://taydoautocar.vn` |

Không đưa `APP_KEY`, database password hoặc mật khẩu admin lên GitHub.

## 3. Deploy

Push branch `main`, hoặc mở **Actions → Deploy to DirectAdmin over HTTPS → Run workflow**. Workflow sẽ:

1. Test Laravel và frontend.
2. Export Next.js thành HTML/CSS/JS tĩnh.
3. Cài `vendor` production cho Laravel.
4. Nén release, chia thành các chunk 1 MiB để tương thích giới hạn upload của shared hosting, ký HMAC từng chunk.
5. Hook xác minh chữ ký + SHA-256, giải nén ngoài public web root, chạy migration và cache Laravel.
6. Đồng bộ frontend vào `public_html`, giữ nguyên `.env`, storage và file tải lên.
7. Chỉ giữ một release để phù hợp giới hạn 30.000 inode.

## 4. Tạo admin lần đầu

Trước lần deploy đầu, có thể điền tạm trong `app/shared/.env`:

```dotenv
ADMIN_EMAIL=admin@taydoautocar.vn
ADMIN_INITIAL_PASSWORD=<mật khẩu ban đầu không để trống>
ADMIN_NAME="Quản trị Tây Đô"
```

Sau khi đăng nhập `/admin/login` và đổi mật khẩu, xóa `ADMIN_INITIAL_PASSWORD` khỏi `.env`. Không lưu mật khẩu này trong GitHub hoặc source.

## 5. Kiểm tra sau deploy

- `https://taydoautocar.vn/`
- `https://taydoautocar.vn/api/up`
- `https://taydoautocar.vn/api/services`
- `https://taydoautocar.vn/admin/login`
- Thử tạo một lịch hẹn và kiểm tra trong admin.

## Xử lý lỗi

- HTTP 413 hoặc `uploadError: 1`: PHP đang chặn kích thước upload. Workflow chỉ gửi chunk 1 MiB; đặt `upload_max_filesize` tối thiểu 2 MiB và `post_max_size` tối thiểu 8 MiB trong PHP Settings.
- `envConfigured: false`: `.env` chưa đúng tại `domains/taydoautocar.vn/app/shared/.env`.
- `Invalid signature`: hai giá trị `DEPLOY_HOOK_KEY` không giống nhau.
- Workflow báo sai phiên bản hook: upload lại bản mới nhất của `deploy/directadmin/deploy-hook.php` vào `public_html/deploy-hook.php`.
- `Cannot create symlink`: hosting chặn symlink; cần nhà cung cấp bật symlink cho cùng user.
- `Laravel activation failed`: xem `domains/taydoautocar.vn/app/shared/storage/logs/laravel.log` và kiểm tra DB/PHP extensions.
  Response có trường `detail` cho biết chính xác lệnh Laravel hoặc kết nối database bị lỗi. Nếu báo timeout/kết nối MySQL, dùng `DB_HOST=localhost` theo thông tin DirectAdmin và kiểm tra lại tên database/user có đầy đủ prefix tài khoản.
- `Deployment failed` kèm `Refusing to overwrite .../api` hoặc `.../storage`: đường dẫn đó đang là thư mục thật. Đổi tên thư mục cũ trong File Manager rồi chạy lại; hook chỉ tạo symlink và không tự xóa dữ liệu.
- Không xóa `public_html/deploy-hook.php`; endpoint sai chữ ký chỉ trả 404 và không cho phép đọc secret.
