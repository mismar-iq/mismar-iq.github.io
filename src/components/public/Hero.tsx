import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

const CLEAN_DEFAULT_HERO = '/src/assets/images/mismar_hero_clean_1792793901017.jpg';

export const Hero: React.FC = () => {
  const { content, language, t } = useContent();
  const slide = content.settings.heroSlides?.[0];

  const rawTitle = t(slide?.title, 'نبني بثقة. ونصنع\nما يدوم.');
  const subtitle = t(slide?.subtitle, 'حلول متكاملة في البناء والمقاولات، من الفكرة الأولى حتى أدق التفاصيل.');
  const kicker = t(slide?.kicker, 'مسمار للمقاولات');
  const ctaText = t(slide?.primaryCtaText, 'اكتشف خدماتنا');
  const ctaLink = slide?.primaryCtaLink || '#services';

  // Safeguard: Never use the user screenshot mockup (which had baked-in text) as the background
  const slideBg = slide?.backgroundImage;
  const isMockupWithBakedText = slideBg && (
    slideBg.includes('image_b5d539ef.png') ||
    slideBg.includes('image_78c1d6bf.png') ||
    slideBg.includes('image_72ce80a1.png')
  );

  const bgImage = (!slideBg || isMockupWithBakedText)
    ? CLEAN_DEFAULT_HERO
    : slideBg;

  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  // Split title by explicit line break if present, or split after period for Arabic/English cadence
  const titleLines = rawTitle.includes('\n')
    ? rawTitle.split('\n')
    : rawTitle.includes('. ')
      ? [rawTitle.substring(0, rawTitle.indexOf('. ') + 1), rawTitle.substring(rawTitle.indexOf('. ') + 2)]
      : [rawTitle];

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center bg-[#18232b] overflow-hidden">
      {/* Pristine Architectural Background Image (Zero text, pure high-end photography) */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Mismar Contracting Architectural Site"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[75%_center] lg:object-[80%_center]"
        />

        {/* Soft petrol-slate gradient overlays to ensure razor-sharp typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#18232b]/90 via-[#18232b]/55 to-transparent w-full lg:w-[65%]" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#18232b] via-[#18232b]/50 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#18232b]/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40 relative z-10 w-full">
        <div className="max-w-2xl flex flex-col items-start space-y-6">
          {/* Architectural Kicker with desert bronze hairline (matches reference) */}
          <div className="flex items-center gap-3.5 text-xs font-normal tracking-widest text-[#b88a58]">
            <span className="font-sans">{kicker}</span>
            <span className="w-12 h-[1px] bg-[#b88a58] opacity-80" />
          </div>

          {/* Main Display Headline (Apple-grade editorial typography) */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.12]">
            {titleLines.map((line, idx) => (
              <span key={idx} className="block">
                {line.trim()}
              </span>
            ))}
          </h1>

          {/* Editorial Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-neutral-200 leading-relaxed max-w-xl font-light pt-1">
            {subtitle}
          </p>

          {/* Desert Bronze Rectangular Action Button (matches reference) */}
          <div className="pt-4">
            <a
              href={ctaLink}
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#b88a58] hover:bg-[#a67949] text-[#18232b] font-medium text-xs tracking-wider transition-all duration-200 cursor-pointer shadow-lg shadow-black/30 group"
            >
              <span>{ctaText}</span>
              <ArrowIcon className="w-4 h-4 stroke-[2.2] group-hover:-translate-x-1 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Architectural Slide Indicator (matches reference: 04 / 01 ──────) */}
      <div className="absolute bottom-10 right-8 sm:right-16 z-20 flex items-center gap-4 text-xs font-mono text-neutral-400 select-none">
        <span className="tracking-widest">01 / 04</span>
        <span className="w-16 sm:w-24 h-[1px] bg-neutral-500/70" />
      </div>
    </section>
  );
};
