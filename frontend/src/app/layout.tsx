import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/layout/FloatingActions';

export const metadata: Metadata = {
  title: 'Tây Đô Auto Car Cần Thơ | Dịch Vụ - Phụ Tùng - Cứu Hộ 24/7',
  description:
    'Trung tâm sửa chữa ô tô cao cấp phong cách Châu Âu tại Cần Thơ. Chuyên sửa chữa tổng hợp, rửa khoang máy hơi nước nóng, đồng sơn 3M, bọc da nội thất, mua bán cho thuê xe và cứu hộ khẩn cấp 24/7.',
  keywords: [
    'garage ô tô Cần Thơ',
    'sửa chữa ô tô Cần Thơ',
    'bảo dưỡng xe ô tô',
    'cứu hộ ô tô 24/7 Cần Thơ',
    'phụ tùng ô tô chính hãng',
    'đồng sơn xe ô tô',
    'cho thuê xe tự lái Cần Thơ',
  ],
  authors: [{ name: 'Tây Đô Auto Car' }],
  openGraph: {
    title: 'Tây Đô Auto Car Cần Thơ | Standard European Automotive Care',
    description:
      'Chăm sóc chiếc xe như cách bạn trân trọng hành trình. Dịch vụ garage ô tô cao cấp, chuyên nghiệp và uy tín hàng đầu Cần Thơ.',
    siteName: 'Tây Đô Auto Car',
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: 'Tây Đô Auto Car Cần Thơ',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738',
    telephone: ['0979707033', '0923112399'],
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1–2 Nguyễn Văn Lưu, Khu TĐC Văn Hóa Tây Đô, Cái Răng',
      addressLocality: 'Cần Thơ',
      postalCode: '940000',
      addressCountry: 'VN',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '08:00',
      closes: '20:00',
    },
  };

  return (
    <html lang="vi" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="bg-[#0A0A0A] text-[#F5F5F5] min-h-screen flex flex-col antialiased selection:bg-[#C7A35A] selection:text-[#0A0A0A] pb-16 md:pb-0">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
