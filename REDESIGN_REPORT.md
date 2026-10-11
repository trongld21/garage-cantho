# Báo cáo redesign Tây Đô Auto Car

Ngày kiểm tra: 11/10/2026. Chỉnh trực tiếp frontend; không deploy, không thay đổi backend, database hoặc cấu hình production.

## Thiết kế và cấu trúc

Dự án dùng Next.js 16 App Router, React 19, Tailwind CSS 4 và API Laravel. Giữ nguyên các route, API quản trị, authentication, dữ liệu và luồng đặt lịch. Bộ tham khảo thực tế nằm tại thư mục gốc: `tay-do-auto-car-redesign.html`, `tay-do-desktop-preview.png`, `tay-do-mobile-preview.png`.

Trang chủ được tổ chức theo mẫu: hero với tiêu đề viền, dải racing red, giới thiệu, dịch vụ, khu phụ kiện nền trắng, thông điệp thương hiệu, thư viện, quy trình và form tư vấn. Header sticky, menu mobile, footer và liên hệ dùng cùng hệ màu graphite/đỏ/trắng. Font Barlow Condensed và Be Vietnam Pro được phục vụ local, có giấy phép OFL trong thư mục fonts. CSS có breakpoint desktop/tablet/mobile và hỗ trợ reduced motion.

Thư viện giữ bộ lọc và lightbox, bổ sung xem thêm để chỉ tải tám ảnh đầu. Sản phẩm giữ tìm kiếm, danh mục, sắp xếp và bộ lọc nổi bật/khuyến mãi; chi tiết bổ sung chọn ảnh từ gallery có sẵn. Form tư vấn bổ sung dòng xe/đời xe qua trường `car_model` mà backend đã hỗ trợ. Nút Zalo mở liên hệ thật, gọi điện dùng `tel:`, đặt lịch dùng modal và API hiện có.

## File đã chỉnh sửa

- `frontend/src/app/globals.css`: gỡ lớp giao diện storefront cũ; giữ theme nền và style editor/article.
- `frontend/src/app/layout.tsx`: tích hợp CSS mới và font local, bỏ ảnh stock khỏi structured data garage.
- `frontend/src/app/page.tsx`: bố cục trang chủ mới với dữ liệu API.
- `frontend/src/app/services/page.tsx`: danh sách dịch vụ theo mẫu.
- `frontend/src/app/services/[slug]/page.tsx`: theme chi tiết, fallback ảnh, nhãn minh họa, số bước lấy từ dữ liệu.
- `frontend/src/app/store/page.tsx`: khu danh sách sản phẩm nền trắng.
- `frontend/src/app/store/[slug]/page.tsx`: gallery sản phẩm, nhãn tồn kho/giá đúng dữ liệu, CTA dạng link.
- `frontend/src/components/Navbar.tsx`: header và menu.
- `frontend/src/components/Footer.tsx`: nhận diện thương hiệu chung.
- `frontend/src/components/sections/HeroSection.tsx`: hero lấy ảnh garage từ API; có fallback khi dịch vụ được xóa hoặc đổi dữ liệu.
- `frontend/src/components/home/ConsultationForm.tsx`: thêm thông tin xe trong payload có sẵn.
- `frontend/src/components/home/Gallery.tsx`: xem thêm và phân biệt ảnh stock.
- `frontend/src/components/layout/FloatingActions.tsx`: Zalo và liên hệ.
- `frontend/src/components/ui/ImageWithFallback.tsx`: ảnh thiếu hiện trạng thái cập nhật, không tự thay bằng ảnh stock khác.
- `frontend/src/lib/use-static-data.tsx`: trạng thái dữ liệu không tạo nested main hoặc h1 lặp trong trang chủ.

## File mới

- `frontend/src/app/premium.css`: hệ thống giao diện public, responsive và animation.
- `frontend/src/components/layout/Brand.tsx`: logo dùng chung.
- `frontend/src/components/sections/ServiceGrid.tsx`: card dịch vụ lấy dữ liệu thật.
- `frontend/src/components/ui/EditorialHeading.tsx`: tiêu đề section dùng chung.
- `frontend/src/components/store/ProductMedia.tsx`: chọn ảnh sản phẩm.
- `frontend/src/lib/media.ts`: nhận diện ảnh stock để gắn nhãn minh họa.
- `frontend/src/app/fonts/`: ba file font và hai giấy phép OFL.
- `frontend/scripts/dev-read-api.mjs`: proxy QA tùy chọn. Chỉ GET các API công khai được cho phép mới đi production; mọi request khác đi Laravel local.
- `REDESIGN_REPORT.md`: báo cáo này.

## Dữ liệu và kiểm tra đã thực hiện

- `npx tsc --noEmit`: đạt.
- `npm run build` ở chế độ standalone: đạt.
- `NEXT_OUTPUT=export npm run build`: đạt; giữ cơ chế export và route placeholder hiện có.
- `git diff --check`: đạt sau khi chuẩn hóa line ending.
- Development HTTP 200: trang chủ, services, store, contact, cars, news, admin/login và template chi tiết services/store. Route rescue giữ redirect 307 về services, đích trả HTTP 200.
- Đọc API production theo lựa chọn của người dùng: services = 5, service-categories = 5; products, cars, posts = 0. Không thêm dữ liệu demo để lấp danh mục trống.
- Cả năm route dịch vụ thật và API chi tiết tương ứng trả HTTP 200: `tran-sao-bang`, `film-cach-nhiet`, `man-hinh-android`, `den-o-to`, `phu-kien-ngoai-that`.
- Cả năm URL ảnh đại diện dịch vụ trả HTTP 200. Đã xem ảnh garage hiện có và chọn ảnh dịch vụ đèn làm hero, không dùng ảnh stock mẫu.
- API slug dịch vụ không tồn tại trả HTTP 404.
- HTML development có hero, form tư vấn, liên hệ Zalo và preload font local.
- Rà soát mã của bộ lọc, menu, lightbox, liên hệ và form; giữ validation và request tới API hiện có.
- Request booking rỗng thử qua proxy đi backend local và trả HTTP 500 vì database local chưa có; không gửi đặt lịch tới production, không tạo booking production.

## Phần còn cần kiểm tra/hoàn thiện

1. **Kiểm tra trực quan desktop/mobile và so ảnh preview chưa thực hiện được.** Browser connector không có browser/tab; Computer Use native pipe cũng không khả dụng. Đã đọc cả hai ảnh mẫu và triển khai responsive theo mẫu, nhưng chưa có screenshot kết quả hoặc đo Lighthouse/Core Web Vitals.
2. **Gửi form thành công cần database local.** `backend/database/database.sqlite` chưa tồn tại. Không tự tạo/seed database hoặc đổi `.env`; luồng submit thành công và receipt chưa được xác nhận end-to-end.
3. **Chi tiết sản phẩm/xe và bộ lọc trên tập dữ liệu thật** cần kiểm tra tiếp sau khi garage có dữ liệu, vì API hiện trả danh sách rỗng. Trang đã giữ trạng thái trống và API thật.
4. Thư viện lấy ảnh từ dịch vụ hiện có. Chưa có API công trình riêng; không gán ảnh stock thành công trình thực tế. Các nguồn stock đã nhận diện có nhãn minh họa.

## Chạy lại local với dữ liệu production chỉ đọc

Trong `frontend`, chạy ở hai terminal PowerShell:

```powershell
node scripts/dev-read-api.mjs
```

```powershell
$env:API_INTERNAL_URL='http://127.0.0.1:8001/api'
npm run dev -- --hostname 127.0.0.1
```

Các server QA do agent khởi chạy đã được dừng sau kiểm tra. Chạy lại các lệnh trên rồi mở `http://127.0.0.1:3000`. Để thử submit booking, Laravel local ở cổng 8000 phải có database hoạt động. Biến môi trường trên chỉ áp dụng cho terminal hiện tại; không thay cấu hình production. Khi dùng database local thông thường, chạy `npm run dev` không đặt biến proxy.
