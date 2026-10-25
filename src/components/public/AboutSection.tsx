import React from 'react';
import {
  ShieldCheck,
  Clock,
  FileCheck,
  Award,
  Eye,
  Compass,
  CheckCircle2,
  Scale,
  Sparkles,
  HeartHandshake,
  Building2,
  HardHat,
  Users
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export const AboutSection: React.FC = () => {
  const { content, language, t } = useContent();
  const { about } = content;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#b88a58]" />;
      case 'Clock': return <Clock className="w-5 h-5 text-[#b88a58]" />;
      case 'FileCheck': return <FileCheck className="w-5 h-5 text-[#b88a58]" />;
      case 'Award': return <Award className="w-5 h-5 text-[#b88a58]" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-[#b88a58]" />;
      case 'Scale': return <Scale className="w-5 h-5 text-[#b88a58]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#b88a58]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-[#b88a58]" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-[#b88a58]" />;
      case 'HardHat': return <HardHat className="w-5 h-5 text-[#b88a58]" />;
      case 'Users': return <Users className="w-5 h-5 text-[#b88a58]" />;
      case 'Compass': return <Compass className="w-5 h-5 text-[#b88a58]" />;
      default: return <ShieldCheck className="w-5 h-5 text-[#b88a58]" />;
    }
  };

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#f4efe8] text-[#1e2b34] border-b border-[#ded5c7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-18">
          <div className="text-xs font-mono text-[#b88a58] tracking-widest uppercase mb-3">
            05 — {language === 'ar' ? 'من نحن' : 'About Us'}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1e2b34] leading-tight">
            {t(about.title, 'شركة مسمار للمقاولات')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#556570] font-light leading-relaxed">
            {t(about.leadParagraph)}
          </p>
        </div>

        {/* 2-Column Split: Image + Paragraphs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-20">
          <div className="lg:col-span-6 relative border border-[#ded5c7] bg-white overflow-hidden min-h-[380px] shadow-sm">
            <img
              src={about.mainImage || '/src/assets/images/about_mismar_craft_1792791377536.jpg'}
              alt={t(about.title)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18232b]/85 via-transparent to-transparent" />
            <div className="absolute bottom-6 inset-x-6 text-white">
              <span className="text-xs font-mono text-[#b88a58] block mb-1">
                {language === 'ar' ? 'الإشراف الهندسي الميداني' : 'SITE SUPERVISION'}
              </span>
              <p className="text-xs text-neutral-200 font-light">
                {language === 'ar'
                  ? 'مهندسون مقيمون لمتابعة مطابقة المواصفات الإنشائية في كافة مراحل البناء.'
                  : 'Licensed resident directors auditing every structural milestone.'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            {about.paragraphs?.map((p) => (
              <div key={p.id} className="p-7 bg-white border border-[#ded5c7]">
                <h3 className="text-lg font-bold text-[#1e2b34] mb-2">
                  {t(p.title)}
                </h3>
                <p className="text-xs sm:text-sm text-[#556570] font-light leading-relaxed">
                  {t(p.content)}
                </p>
              </div>
            ))}

            {/* Vision & Mission cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-6 bg-[#213039] text-white border border-[#2d3e4b]">
                <div className="flex items-center gap-2 text-[#b88a58] font-mono text-xs uppercase tracking-wider mb-2">
                  <Eye className="w-4 h-4" />
                  <span>{language === 'ar' ? 'رؤيتنا' : 'Our Vision'}</span>
                </div>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {t(about.vision)}
                </p>
              </div>

              <div className="p-6 bg-white border border-[#ded5c7]">
                <div className="flex items-center gap-2 text-[#1e2b34] font-mono text-xs uppercase tracking-wider mb-2">
                  <Compass className="w-4 h-4 text-[#b88a58]" />
                  <span>{language === 'ar' ? 'رسالتنا' : 'Our Mission'}</span>
                </div>
                <p className="text-xs text-[#556570] font-light leading-relaxed">
                  {t(about.mission)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        {about.values && about.values.length > 0 && (
          <div>
            <div className="text-xs font-mono text-[#8898a3] uppercase tracking-widest mb-6">
              {about.valuesTitle ? t(about.valuesTitle) : (language === 'ar' ? 'قيمنا الجوهرية' : 'Core Principles')}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {about.values.map((val) => (
                <div
                  key={val.id}
                  className="p-6 bg-white border border-[#ded5c7] hover:border-[#b88a58]/60 transition-colors"
                >
                  <div className="w-10 h-10 border border-[#ded5c7] flex items-center justify-center mb-4">
                    {renderIcon(val.icon)}
                  </div>
                  <h4 className="text-sm font-bold text-[#1e2b34] mb-2">{t(val.title)}</h4>
                  <p className="text-xs text-[#556570] font-light leading-relaxed">{t(val.description)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
