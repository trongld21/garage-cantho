import React from 'react';
import Link from 'next/link';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { WhyChooseUsSection } from '@/components/sections/WhyChooseUsSection';
import { WorkshopExperience } from '@/components/sections/WorkshopExperience';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { apiService } from '@/services/api';
import { ArrowRight, ChevronRight, Phone, ShieldAlert, MapPin, Calendar, Clock, Sparkles } from 'lucide-react';

export const revalidate = 60;

export default async function HomePage() {
  const services = await apiService.getServices(undefined, true);
  const cars = await apiService.getCars();
  const products = await apiService.getProducts();
  const posts = await apiService.getPosts();

  return (
    <div className="space-y-0 bg-[#0A0A0A]">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Indicators */}
      <TrustSection />

      {/* 3. Editorial Service Showcase (Alternating Layout) */}
      <section className="py-24 md:py-32 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32">
          <SectionHeading
            eyebrow="DỊCH VỤ GARAGE CAO CẤP"
            title="TIÊU CHUẨN KỸ THUẬT & QUY TRÌNH CHÂU ÂU"
            subtitle="Mỗi chiếc xe khi đưa vào xưởng đều được thực hiện theo quy trình kiểm tra nghiêm ngặt, đảm bảo độ chính xác tuyệt đối."
            action={
              <Link href="/services">
                <Button variant="outline" rightIcon={<ChevronRight className="w-4 h-4" />}>
                  Tất Cả Dịch Vụ
                </Button>
              </Link>
            }
          />

          {/* Service Editorial Items (Alternating) */}
          {services.slice(0, 4).map((service, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image Side */}
                <div
                  className={`lg:col-span-7 img-zoom-wrapper rounded-xs border border-white/10 relative overflow-hidden h-80 sm:h-[420px] ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="gold">{service.category}</Badge>
                  </div>
                </div>

                {/* Content Side */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-[#C7A35A] uppercase tracking-widest">
                      0{idx + 1} / DỊCH VỤ CHUYÊN SÂU
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] uppercase tracking-tight leading-tight">
                      {service.name}
                    </h3>
                  </div>

                  <p className="text-sm text-[#A8A8A8] leading-relaxed">
                    {service.summary}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-white/10">
                    <span className="text-xs font-semibold text-[#D6D6D6]">
                      Chi phí: <strong className="text-[#C7A35A]">{service.price_range}</strong>
                    </span>

                    <Link href={`/services/${service.slug}`}>
                      <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                        Chi Tiết
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <WhyChooseUsSection />

      {/* 5. Featured Cars Marketplace */}
      <section className="py-20 md:py-28 bg-[#161616] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="XE MUA BÁN & CHO THUÊ"
            title="DANH MỤC XE ĐÃ KIỂM ĐỊNH CHẤT LƯỢNG"
            subtitle="Tất cả các dòng xe bán và cho thuê tại Tây Nam Bộ Garage đều trải qua 176 hạng mục kiểm tra kỹ thuật nghiêm ngặt."
            action={
              <Link href="/cars">
                <Button variant="outline" rightIcon={<ChevronRight className="w-4 h-4" />}>
                  Xem Showroom Xe
                </Button>
              </Link>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cars.slice(0, 3).map((car) => (
              <div
                key={car.id}
                className="bg-[#202020] border border-white/5 rounded-xs overflow-hidden hover:border-[#C7A35A]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="img-zoom-wrapper relative h-56 overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex items-center space-x-2">
                      <Badge variant={car.listing_type === 'sale' ? 'gold' : 'titanium'}>
                        {car.listing_type === 'sale' ? 'Cần Bán' : 'Cho Thuê'}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-bold text-[#F5F5F5] uppercase tracking-tight group-hover:text-[#C7A35A] transition-colors line-clamp-2">
                      {car.title}
                    </h3>

                    <div className="grid grid-cols-2 gap-2 text-xs text-[#A8A8A8] border-y border-white/5 py-3">
                      <div>
                        Năm SX: <strong className="text-white">{car.year}</strong>
                      </div>
                      <div>
                        Nhiên liệu: <strong className="text-white">{car.fuel_type}</strong>
                      </div>
                      <div>
                        Hộp số: <strong className="text-white">{car.transmission}</strong>
                      </div>
                      <div>
                        Số KM: <strong className="text-white">{car.mileage}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-[#C7A35A]">
                    {car.price.toLocaleString('vi-VN')} đ
                    {car.listing_type === 'rent' && <span className="text-xs text-[#A8A8A8] font-normal">/ngày</span>}
                  </span>

                  <Link href={`/cars/${car.slug}`}>
                    <Button variant="secondary" size="sm">
                      Chi Tiết
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Featured Products Store */}
      <section className="py-20 md:py-28 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="PHỤ TÙNG & ĐỒ CHƠI XE"
            title="PHỤ KIỆN TĂNG TÍNH NĂNG & AN TOÀN"
            subtitle="Cung cấp phụ tùng thay thế chính hãng và nâng cấp phụ kiện ô tô cao cấp."
            action={
              <Link href="/store">
                <Button variant="outline" rightIcon={<ChevronRight className="w-4 h-4" />}>
                  Cửa Hàng Phụ Tùng
                </Button>
              </Link>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.slice(0, 3).map((prod) => (
              <div
                key={prod.id}
                className="bg-[#161616] border border-white/5 rounded-xs p-5 flex flex-col justify-between hover:border-[#C7A35A]/40 transition-colors group"
              >
                <div className="space-y-4">
                  <div className="img-zoom-wrapper relative h-48 rounded-xs overflow-hidden bg-[#202020]">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="titanium">{prod.brand}</Badge>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#C7A35A] uppercase font-bold tracking-widest block mb-1">
                      {prod.category}
                    </span>
                    <h3 className="text-base font-bold text-[#F5F5F5] group-hover:text-[#C7A35A] transition-colors line-clamp-2">
                      {prod.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#A8A8A8] line-clamp-2 leading-relaxed">
                    {prod.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-[#F5F5F5]">
                      {prod.sale_price ? prod.sale_price.toLocaleString('vi-VN') : prod.price.toLocaleString('vi-VN')} đ
                    </span>
                    {prod.sale_price && (
                      <span className="text-xs text-[#666666] line-through block">
                        {prod.price.toLocaleString('vi-VN')} đ
                      </span>
                    )}
                  </div>

                  <Link href={`/store/${prod.slug}`}>
                    <Button variant="secondary" size="sm">
                      Xem Hàng
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Workshop Experience */}
      <WorkshopExperience />

      {/* 8. Online Booking Callout */}
      <section className="py-20 bg-gradient-to-r from-[#161616] via-[#202020] to-[#161616] border-y border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="gold" size="md">
            ĐẶT LỊCH TRỰC TUYẾN 24/7
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5F5F5] uppercase tracking-tight">
            TIẾT KIỆM THỜI GIAN • CHỦ ĐỘNG KHUNG GIỜ BẢO DƯỠNG
          </h2>
          <p className="text-base text-[#A8A8A8] max-w-2xl mx-auto">
            Đặt hẹn trực tuyến chỉ với 6 bước đơn giản. Đội ngũ tư vấn Garage sẽ xác nhận lịch và chuẩn bị sẵn phụ tùng trước khi bạn tới.
          </p>
          <div className="pt-4 flex justify-center">
            <Link href="/services">
              <Button variant="primary" size="lg" leftIcon={<Calendar className="w-5 h-5" />}>
                Đặt Lịch Ngay Bây Giờ
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Rescue 24/7 Callout */}
      <section className="py-16 bg-[#E53935]/10 border-y border-[#E53935]/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs font-bold text-[#E53935] uppercase tracking-widest flex items-center justify-center lg:justify-start space-x-2">
              <ShieldAlert className="w-4 h-4 animate-pulse" />
              <span>DỊCH VỤ ỨNG CỨU THIẾT YẾU</span>
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#F5F5F5] uppercase tracking-tight">
              CỨU HỘ Ô TÔ KHẨN CẤP 24/7 TẠI CẦN THƠ
            </h3>
            <p className="text-sm text-[#A8A8A8]">
              Chết máy, hết bình, thủng lốp hay sự cố giao thông? Xe cứu hộ sàn trượt có mặt trong 15-30 phút.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 flex-shrink-0">
            <a href="tel:0936007840">
              <Button variant="danger" size="lg" leftIcon={<Phone className="w-5 h-5" />}>
                GỌI 0936 007 840
              </Button>
            </a>
            <Link href="/rescue">
              <Button variant="outline" size="lg">
                Yêu Cầu Cứu Hộ
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Customer Testimonials */}
      <TestimonialsSection />

      {/* 11. Latest News */}
      <section className="py-20 bg-[#161616] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="TIN TỨC & BẢO DƯỠNG"
            title="KIẾN THỨC VẬN HÀNH & KINH NGHIỆM Ô TÔ"
            subtitle="Cập nhật thông tin hữu ích giúp giữ gìn chiếc xe của bạn luôn ở trạng thái hoàn hảo nhất."
            action={
              <Link href="/news">
                <Button variant="outline" rightIcon={<ChevronRight className="w-4 h-4" />}>
                  Xem Bài Viết
                </Button>
              </Link>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.slice(0, 2).map((post) => (
              <div
                key={post.id}
                className="bg-[#202020] border border-white/5 rounded-xs overflow-hidden p-6 space-y-4 hover:border-[#C7A35A]/40 transition-colors group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="img-zoom-wrapper h-56 rounded-xs overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Badge variant="gold">{post.category}</Badge>
                  <h3 className="text-xl font-bold text-[#F5F5F5] group-hover:text-[#C7A35A] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#A8A8A8] line-clamp-2 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#666666]">
                  <span>{new Date(post.published_at).toLocaleDateString('vi-VN')}</span>
                  <Link href={`/news/${post.slug}`} className="text-[#C7A35A] font-bold flex items-center space-x-1 hover:underline">
                    <span>Đọc Tiếp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Contact / Location Section */}
      <section className="py-20 bg-[#0A0A0A] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <SectionHeading
              eyebrow="LIÊN HỆ GARAGE"
              title="GHÉ THĂM XƯỞNG DỊCH VỤ TẠI CẦN THƠ"
              subtitle="Tọa lạc tại vị trí trung tâm Bình Thủy, thuận tiện di chuyển cho quý khách hàng toàn thành phố."
            />

            <div className="space-y-4 text-sm text-[#A8A8A8]">
              <div className="flex items-start space-x-3 p-4 bg-[#161616] rounded-xs border border-white/5">
                <MapPin className="w-5 h-5 text-[#C7A35A] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Địa Chỉ Garage:</strong>
                  41-46 Nguyễn Đệ, P. An Thới, Q. Bình Thủy, TP. Cần Thơ
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-[#161616] rounded-xs border border-white/5">
                <Clock className="w-5 h-5 text-[#C7A35A] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Giờ Làm Việc:</strong>
                  08:00 - 20:00 (Mở cửa tất cả các ngày trong tuần, kể cả CN)
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/contact">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Chỉ Đường & Gửi Tin Nhắn
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 h-96 rounded-xs overflow-hidden border border-white/10 bg-[#161616]">
            <iframe
              title="Garage Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.847528392191!2d105.7538!3d10.0452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDAyJzQyLjciTiAxMDXCsDQ1JzEzLjciRQ!5e0!3m2!1svi!2s!4v1650000000000!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.2)' }}
              allowFullScreen={false}
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
