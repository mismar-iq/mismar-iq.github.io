import React from 'react';
import { Check, MessageCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export const PackagesSection: React.FC = () => {
  const { content, language, t } = useContent();
  const packages = (content.packages || [])
    .filter((p) => p.isVisible)
    .sort((a, b) => a.order - b.order);

  if (packages.length === 0) return null;

  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  const handlePackageInquiry = (pkg: (typeof packages)[0]) => {
    const waNumber = content.contact.whatsapp.replace(/\D/g, '');
    const defaultMsg = language === 'ar'
      ? `مرحباً شركة مسمار للمقاولات، أود الاستفسار عن تفاصيل والتعاقد على (${pkg.name.ar}).`
      : `Hello Mismar Contracting, I would like to inquire about details and pricing for the (${pkg.name.en || pkg.name.ar}) package.`;

    const text = encodeURIComponent(pkg.inquiryMessage || defaultMsg);
    window.location.href = `https://wa.me/${waNumber}?text=${text}`;
  };

  const kicker = t(
    content.packagesHeader?.kicker,
    language === 'ar' ? '03 — باقات البناء' : '03 — Construction Packages'
  );
  const heading = t(
    content.packagesHeader?.heading,
    language === 'ar' ? 'باقات بناء مصممة لتلائم تطلعاتك بدقة' : 'Engineered Tiers Tailored to Your Ambitions'
  );
  const description = t(
    content.packagesHeader?.description,
    language === 'ar'
      ? 'تتيح لك شركة مسمار اختيار الباقة المثالية لمنزلك أو مشروعك، مع إشراف هندسي وضمانات موثقة.'
      : 'Choose the ideal tier for your villa with certified engineering supervision and transparent BOQs.'
  );

  return (
    <section id="packages" className="py-24 sm:py-32 bg-[#f4efe8] text-[#1e2b34] border-b border-[#ded5c7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-18">
          {kicker && (
            <div className="text-xs font-mono text-[#b88a58] tracking-widest uppercase mb-3">
              {kicker}
            </div>
          )}
          {heading && (
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1e2b34] leading-tight">
              {heading}
            </h2>
          )}
          {description && (
            <p className="mt-4 text-sm sm:text-base text-[#556570] font-light leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg) => {
            const isPopular = pkg.isPopular;
            const name = t(pkg.name);
            const tagline = t(pkg.tagline);
            const description = t(pkg.description);
            const price = t(pkg.pricePerMeter);

            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between transition-all duration-300 p-8 sm:p-10 border ${
                  isPopular
                    ? 'bg-white border-[#b88a58] shadow-xl'
                    : 'bg-white/70 border-[#ded5c7] hover:border-[#b88a58]/50'
                }`}
              >
                {/* Popular Tag */}
                {isPopular && (
                  <div className="absolute top-0 right-8 -translate-y-1/2">
                    <span className="px-3 py-1 bg-[#b88a58] text-white font-medium text-[11px] tracking-wider uppercase">
                      {language === 'ar' ? 'الأكثر طلباً للفلل' : 'Most Popular'}
                    </span>
                  </div>
                )}

                <div>
                  <div className="pb-6 border-b border-[#ded5c7]">
                    <h3 className="text-2xl font-bold text-[#1e2b34] tracking-tight mb-2">
                      {name}
                    </h3>

                    <p className="text-xs text-[#b88a58] font-medium mb-3">
                      {tagline}
                    </p>

                    <p className="text-xs text-[#556570] font-light leading-relaxed min-h-[40px]">
                      {description}
                    </p>

                    <div className="mt-6 pt-6 border-t border-[#ded5c7]/60">
                      <span className="text-[11px] font-mono text-[#8898a3] block mb-1">
                        {language === 'ar' ? 'سعر التنفيذ التقديري' : 'Estimated Pricing'}
                      </span>
                      <span className="text-2xl font-bold text-[#1e2b34] font-mono">
                        {price}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="py-6 space-y-3">
                    <span className="text-xs font-mono text-[#8898a3] uppercase tracking-wider block mb-3">
                      {language === 'ar' ? 'المواصفات المشمولة:' : 'Scope of Work:'}
                    </span>
                    <ul className="space-y-3">
                      {pkg.features.map((feat) => (
                        <li key={feat.id} className="flex items-start gap-2.5 text-xs text-[#445560] leading-relaxed">
                          <Check className="w-4 h-4 text-[#b88a58] shrink-0 mt-0.5" />
                          <span>{language === 'ar' ? feat.ar : feat.en || feat.ar}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Inquiry Action */}
                <div className="pt-6 border-t border-[#ded5c7]">
                  <button
                    type="button"
                    onClick={() => handlePackageInquiry(pkg)}
                    className={`w-full py-3.5 px-5 font-medium text-xs tracking-wider flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer ${
                      isPopular
                        ? 'bg-[#b88a58] hover:bg-[#a67949] text-white shadow-sm'
                        : 'bg-[#1e2b34] hover:bg-[#162128] text-white'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{language === 'ar' ? 'طلب تفاصيل الباقة عبر واتساب' : 'Inquire via WhatsApp'}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
