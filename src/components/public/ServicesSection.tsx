import React from 'react';
import { Building2, KeyRound, Paintbrush, HardHat, Hammer, Palmtree, ArrowLeft, ArrowRight } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export const ServicesSection: React.FC = () => {
  const { content, language, t } = useContent();
  const services = (content.services || [])
    .filter((s) => s.isVisible)
    .sort((a, b) => a.order - b.order);

  if (services.length === 0) return null;

  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  const iconMap: Record<string, React.ReactNode> = {
    Building2: <Building2 className="w-5 h-5 text-[#b88a58]" />,
    KeyRound: <KeyRound className="w-5 h-5 text-[#b88a58]" />,
    Paintbrush: <Paintbrush className="w-5 h-5 text-[#b88a58]" />,
    HardHat: <HardHat className="w-5 h-5 text-[#b88a58]" />,
    Hammer: <Hammer className="w-5 h-5 text-[#b88a58]" />,
    Palmtree: <Palmtree className="w-5 h-5 text-[#b88a58]" />
  };

  const kicker = t(
    content.servicesHeader?.kicker,
    language === 'ar' ? '02 — خدماتنا' : '02 — Our Services'
  );
  const heading = t(
    content.servicesHeader?.heading,
    language === 'ar' ? 'حلول متكاملة تغطي كافة مراحل البناء' : 'End-to-End Contracting Across Every Milestone'
  );
  const description = t(
    content.servicesHeader?.description,
    language === 'ar'
      ? 'من الصبة الأولى حتى أرقى التشطيبات، نحرص على معايير دقيقة تجعل المبنى استثماراً يمتد لعقود.'
      : 'From foundation to luxury architectural handover, engineered to endure for generations.'
  );

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#18232b] text-white border-b border-[#2d3e4b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-18">
          {kicker && (
            <div className="text-xs font-mono text-[#b88a58] tracking-widest uppercase mb-3">
              {kicker}
            </div>
          )}
          {heading && (
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              {heading}
            </h2>
          )}
          {description && (
            <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Services Grid matching Mismar editorial architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => {
            const indexNumber = (idx + 1).toString().padStart(2, '0');
            const title = t(srv.title);
            const description = t(srv.description);

            return (
              <div
                key={srv.id}
                className="group p-8 bg-[#213039]/50 border border-[#2d3e4b] hover:border-[#b88a58]/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#2d3e4b]">
                    <div className="w-10 h-10 border border-[#b88a58]/40 flex items-center justify-center">
                      {iconMap[srv.iconName] || <Building2 className="w-5 h-5 text-[#b88a58]" />}
                    </div>
                    <span className="text-xs font-mono text-[#8898a3] group-hover:text-[#b88a58] transition-colors">
                      {indexNumber}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#b88a58] transition-colors">
                    {title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                    {description}
                  </p>
                </div>

                <div className="pt-6 mt-8 border-t border-[#2d3e4b]/60 flex items-center justify-between text-xs">
                  <a
                    href="#contact"
                    className="flex items-center gap-2 text-neutral-300 hover:text-[#b88a58] font-normal transition-colors"
                  >
                    <span>{language === 'ar' ? 'طلب تسعير واستشارة' : 'Inquire'}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
