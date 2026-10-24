import React, { useState, useEffect } from 'react';
import { Globe, Shield, Menu, X } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

interface HeaderProps {
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdmin }) => {
  const { content, language, setLanguage, auth } = useContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#methodology', labelAr: 'منهجنا', labelEn: 'Philosophy' },
    { href: '#services', labelAr: 'خدماتنا', labelEn: 'Services' },
    { href: '#packages', labelAr: 'باقات البناء', labelEn: 'Packages' },
    { href: '#projects', labelAr: 'مشاريعنا', labelEn: 'Projects' },
    { href: '#about', labelAr: 'من نحن', labelEn: 'About' },
    { href: '#contact', labelAr: 'تواصل', labelEn: 'Contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#18232b]/90 backdrop-blur-md border-b border-[#2d3e4b]'
          : 'bg-transparent border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-22 flex items-center justify-between gap-6">
        {/* Official Brand Lockup with Office Logo */}
        <a href="#" className="flex items-center gap-3 whitespace-nowrap shrink-0 group">
          <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-white p-1 flex items-center justify-center shadow-lg border border-white/20 overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-200">
            <img
              src={content.settings.logoImage || "/assets/aistudio/image_4bd9251f.png"}
              alt="شعار شركة مسمار للمقاولات"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold tracking-[0.16em] text-white uppercase font-sans leading-tight">
              {content.settings.logoText || 'MISMAR CONTRACTING'}
            </span>
            <span className="text-[10px] text-[#b88a58] font-medium tracking-wide">
              {language === 'ar' ? 'شركة مسمار للمقاولات' : 'Architectural & General Contracting'}
            </span>
          </div>
        </a>

        {/* Center Nav Links: Clean, quiet, widely-spaced typography */}
        <nav className="hidden lg:flex items-center gap-10 text-xs tracking-wider text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors duration-200 py-1"
            >
              {language === 'ar' ? link.labelAr : link.labelEn}
            </a>
          ))}
        </nav>

        {/* Left Side: Language Switcher, Admin, Outlined Quote Button */}
        <div className="flex items-center gap-4 shrink-0">
          {content.settings.enableEnglish && (
            <button
              onClick={toggleLanguage}
              className="text-xs tracking-wider text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="font-mono">{language === 'ar' ? 'EN' : 'عربي'}</span>
              <Globe className="w-3.5 h-3.5 opacity-70" />
            </button>
          )}

          {/* Discreet Admin Entry */}
          <button
            onClick={onOpenAdmin}
            className={`p-2 rounded text-xs transition-colors cursor-pointer ${
              auth.isLoggedIn
                ? 'text-[#b88a58] bg-[#b88a58]/10'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="لوحة تحكم الموقع"
          >
            <Shield className="w-3.5 h-3.5" />
          </button>

          {/* Outlined Action Button matching reference (hairline border) */}
          <a
            href="#contact"
            className="hidden sm:inline-flex px-5 py-2.5 text-xs tracking-wider font-normal text-neutral-200 hover:text-white border border-[#b88a58]/60 hover:border-[#b88a58] transition-all duration-200 whitespace-nowrap"
          >
            {language === 'ar' ? 'اطلب عرض سعر' : 'Request Quote'}
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-300 hover:text-white"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#2d3e4b] bg-[#1a2630]/95 backdrop-blur-xl p-5 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-2 text-sm text-neutral-200 hover:text-white transition-colors"
              >
                {language === 'ar' ? link.labelAr : link.labelEn}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#2d3e4b]">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-2.5 text-center text-xs text-neutral-200 border border-[#b88a58]"
            >
              {language === 'ar' ? 'اطلب عرض سعر' : 'Request Quote'}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
