'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Calendar, Menu, X, ChevronDown, ShieldAlert, Wrench } from 'lucide-react';
import BookingModal from './BookingModal';
import { Button } from './ui/Button';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang chủ', href: '/' },
    {
      name: 'Dịch vụ',
      href: '/services',
      hasDropdown: true,
      id: 'services',
      dropdownItems: [
        { title: 'Tất cả dịch vụ', href: '/services' },
        { title: 'Bảo dưỡng định kỳ', href: '/services/sua-chua-bao-duong-tong-hop' },
        { title: 'Vệ sinh khoang máy', href: '/services/ve-sinh-khoang-dong-co' },
        { title: 'Đồng sơn & Phục hồi', href: '/services/dong-son-phuc-hoi-than-xe' },
        { title: 'Cứu hộ khẩn cấp 24/7', href: '/rescue' },
      ],
    },
    { name: 'Phụ tùng', href: '/store' },
    {
      name: 'Xe',
      href: '/cars',
      hasDropdown: true,
      id: 'cars',
      dropdownItems: [
        { title: 'Tất cả xe', href: '/cars' },
        { title: 'Xe mua bán', href: '/cars?type=sale' },
        { title: 'Xe cho thuê', href: '/cars?type=rent' },
      ],
    },
    { name: 'Cứu hộ 24/7', href: '/rescue', isEmergency: true },
    { name: 'Tin tức', href: '/news' },
    { name: 'Liên hệ', href: '/contact' },
  ];

  return (
    <>
      {/* Top emergency announcement bar */}
      <div className="bg-[#161616] border-b border-white/5 text-[#A8A8A8] text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="hidden sm:inline-block text-[#C7A35A]">
              GARAGE Ô TÔ TÂY NAM BỘ • TP. CẦN THƠ
            </span>
            <span className="text-white/40 hidden md:inline">|</span>
            <span className="text-xs">
              Mở cửa: <strong className="text-white">08:00 - 20:00</strong> (Thứ 2 - Chủ Nhật)
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="tel:0936007840"
              className="flex items-center space-x-1.5 text-[#E53935] font-bold hover:text-red-400 transition"
            >
              <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
              <span>HOTLINE CỨU HỘ 24/7: 0936 007 840</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10 h-20 shadow-2xl'
            : 'bg-gradient-to-b from-[#0A0A0A]/90 to-transparent h-24'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-[#C7A35A] text-[#0A0A0A] flex items-center justify-center font-extrabold rounded-xs group-hover:bg-[#D4B26A] transition-colors">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#F5F5F5] block leading-tight group-hover:text-[#C7A35A] transition-colors uppercase">
                TÂY NAM BỘ <span className="text-[#C7A35A]">GARAGE</span>
              </span>
              <span className="text-[9px] text-[#A8A8A8] uppercase tracking-[0.2em] block font-medium">
                Precision • Performance • Trust
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-7 text-xs font-bold uppercase tracking-wider">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative py-6"
                    onMouseEnter={() => setActiveDropdown(link.id!)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center space-x-1 hover:text-[#C7A35A] transition-colors ${
                        isActive ? 'text-[#C7A35A]' : 'text-[#F5F5F5]'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                    </Link>

                    {/* Mega Dropdown */}
                    <AnimatePresence>
                      {activeDropdown === link.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-56 bg-[#161616] border border-white/10 shadow-2xl p-2 rounded-xs"
                        >
                          {link.dropdownItems?.map((item) => (
                            <Link
                              key={item.title}
                              href={item.href}
                              className="block px-4 py-2.5 text-xs text-[#A8A8A8] hover:text-[#F5F5F5] hover:bg-[#202020] rounded-xs transition-colors"
                            >
                              {item.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-colors hover:text-[#C7A35A] ${
                    link.isEmergency
                      ? 'text-[#E53935] hover:text-red-400 font-extrabold'
                      : isActive
                      ? 'text-[#C7A35A]'
                      : 'text-[#F5F5F5]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden xl:flex items-center space-x-4">
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsBookingOpen(true)}
              leftIcon={<Calendar className="w-4 h-4" />}
            >
              Đặt Lịch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center space-x-3">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-3 py-2 bg-[#C7A35A] text-[#0A0A0A] font-bold text-xs uppercase rounded-xs"
            >
              Đặt Lịch
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-[#F5F5F5] hover:bg-[#202020] rounded-xs transition-colors"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Animated Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col justify-between p-6 sm:p-8"
          >
            {/* Top Bar inside mobile menu */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold text-[#F5F5F5] tracking-tight uppercase"
              >
                TÂY NAM BỘ <span className="text-[#C7A35A]">GARAGE</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#A8A8A8] hover:text-white rounded-xs"
                aria-label="Close menu"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="py-8 space-y-6 overflow-y-auto">
              {navLinks.map((link) => (
                <div key={link.name} className="space-y-2">
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-2xl font-bold uppercase tracking-tight ${
                      link.isEmergency
                        ? 'text-[#E53935]'
                        : pathname === link.href
                        ? 'text-[#C7A35A]'
                        : 'text-[#F5F5F5]'
                    }`}
                  >
                    {link.name}
                  </Link>

                  {link.dropdownItems && (
                    <div className="pl-4 border-l border-white/10 space-y-2 pt-1">
                      {link.dropdownItems.map((sub) => (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-sm text-[#A8A8A8] hover:text-white"
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Bottom Emergency & Action */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <a
                href="tel:0936007840"
                className="flex items-center justify-center space-x-2 py-3.5 bg-[#E53935] text-white font-bold text-sm uppercase rounded-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Gọi Cứu Hộ: 0936 007 840</span>
              </a>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsBookingOpen(true);
                }}
                leftIcon={<Calendar className="w-5 h-5" />}
              >
                Đặt Lịch Bảo Dưỡng
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
