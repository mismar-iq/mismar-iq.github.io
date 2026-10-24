import React from 'react';
import { useContent } from '../../context/ContentContext';
import { ArrowUp, Shield } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { content, language, t } = useContent();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#162128] border-t border-[#2d3e4b] py-14 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2d3e4b]">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center shadow-md border border-white/20 overflow-hidden shrink-0">
                <img
                  src={content.settings.logoImage || "/assets/aistudio/image_4bd9251f.png"}
                  alt="شعار شركة مسمار للمقاولات"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-[0.16em] text-white uppercase font-sans leading-tight">
                  {content.settings.logoText || 'MISMAR CONTRACTING'}
                </span>
                <span className="text-[10px] text-[#b88a58] font-medium tracking-wide">
                  {language === 'ar' ? 'شركة مسمار للمقاولات العامة' : 'General Contracting & Engineering'}
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              {t(content.settings.siteTagline)}
            </p>

            <div className="text-[11px] text-neutral-500 pt-1 font-mono">
              {language === 'ar'
                ? `سجل تجاري رقم: ${content.contact.crNumber} · تصنيف معتمد للمقاولات`
                : `CR: ${content.contact.crNumber} · Certified Contractor`}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono text-[#b88a58] block mb-3 uppercase tracking-wider">
              {language === 'ar' ? 'أقسام الموقع' : 'Navigation'}
            </span>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-light">
              <li><a href="#methodology" className="hover:text-white transition-colors">{language === 'ar' ? 'منهجنا في البناء' : 'Our Philosophy'}</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">{language === 'ar' ? 'الخدمات الإنشائية' : 'Services'}</a></li>
              <li><a href="#packages" className="hover:text-white transition-colors">{language === 'ar' ? 'باقات البناء المعتمدة' : 'Packages'}</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">{language === 'ar' ? 'المشاريع المنفذة' : 'Portfolio'}</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">{language === 'ar' ? 'من نحن' : 'About Us'}</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">{language === 'ar' ? 'تواصل معنا' : 'Contact Us'}</a></li>
            </ul>
          </div>

          {/* Social Links & Official Channels */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono text-[#b88a58] block mb-3 uppercase tracking-wider">
              {language === 'ar' ? 'قنوات التواصل' : 'Channels'}
            </span>
            <div className="flex flex-wrap gap-2">
              {content.contact.socialLinks?.filter((s) => s.isVisible).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 border border-[#2d3e4b] hover:border-[#b88a58] text-neutral-300 hover:text-white transition-colors text-xs"
                >
                  <span>{link.label}</span>
                </a>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenAdmin}
                className="text-neutral-500 hover:text-[#b88a58] transition-colors text-[11px] flex items-center gap-1 cursor-pointer"
              >
                <Shield className="w-3 h-3" />
                <span>{language === 'ar' ? 'لوحة تحكم إدارة المحتوى' : 'Admin CMS Portal'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-light">
          <div>
            © {currentYear} {t(content.settings.siteName)}. {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>{language === 'ar' ? 'العودة للأعلى' : 'Back to top'}</span>
            <ArrowUp className="w-3 h-3 text-[#b88a58]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
