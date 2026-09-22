import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SiteTheme } from '@/components/layout/SiteTheme';
import FloatingActions from '@/components/layout/FloatingActions';

export const metadata: Metadata = {
  title: 'Tây Đô Auto Car Cần Thơ | Phụ Kiện & Đồ Chơi Ô Tô',
  description:
    'Chuyên cung cấp và lắp đặt phụ kiện, đồ chơi ô tô tại Cần Thơ: màn hình Android, đèn ô tô, âm thanh xe hơi, camera và phụ kiện nội ngoại thất.',
  keywords: [
    'phụ kiện ô tô Cần Thơ', 'đồ chơi ô tô Cần Thơ',
    'màn hình Android ô tô', 'đèn ô tô', 'âm thanh xe hơi',
    'camera hành trình', 'nâng cấp nội ngoại thất ô tô',
  ],
  authors: [{ name: 'Tây Đô Auto Car' }],
  openGraph: {
    title: 'Tây Đô Auto Car | Phụ Kiện & Đồ Chơi Ô Tô',
    description:
      'Màn hình, đèn, âm thanh, camera và phụ kiện nội ngoại thất. Tư vấn nâng cấp theo dòng xe và nhu cầu tại Cần Thơ.',
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
    '@type': 'AutomotiveBusiness',
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
        <SiteTheme>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
        </SiteTheme>
      </body>
    </html>
  );
}
