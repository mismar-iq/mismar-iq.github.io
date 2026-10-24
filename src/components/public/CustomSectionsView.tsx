import React from 'react';
import { useContent } from '../../context/ContentContext';
import { Shield, CheckCircle, Camera, CreditCard, ArrowUpRight } from 'lucide-react';

export const CustomSectionsView: React.FC = () => {
  const { content, language, t } = useContent();
  const sections = (content.customSections || [])
    .filter((s) => s.isVisible)
    .sort((a, b) => a.order - b.order);

  if (sections.length === 0) return null;

  const cardIcons: Record<string, React.ReactNode> = {
    Shield: <Shield className="w-5 h-5 text-amber-500" />,
    CheckCircle: <CheckCircle className="w-5 h-5 text-amber-500" />,
    Camera: <Camera className="w-5 h-5 text-amber-500" />,
    CreditCard: <CreditCard className="w-5 h-5 text-amber-500" />
  };

  return (
    <>
      {sections.map((sec) => {
        const title = t(sec.title);
        const subtitle = t(sec.subtitle);

        if (sec.type === 'feature_cards') {
          return (
            <section key={sec.id} className="py-20 bg-neutral-950 border-b border-neutral-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-12">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight [text-wrap:balance]">
                    {title}
                  </h3>
                  {subtitle && (
                    <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed font-normal">
                      {subtitle}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {sec.cards?.map((card) => (
                    <div
                      key={card.id}
                      className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center mb-4">
                        {cardIcons[card.icon || 'Shield'] || <Shield className="w-5 h-5 text-amber-500" />}
                      </div>
                      <h4 className="text-base font-bold text-white mb-2">{t(card.title)}</h4>
                      <p className="text-xs text-neutral-400 leading-relaxed">{t(card.description)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (sec.type === 'text') {
          return (
            <section key={sec.id} className="py-20 bg-neutral-900/30 border-b border-neutral-800">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-start">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-base text-amber-400 font-medium mb-6">{subtitle}</p>
                )}
                {sec.content && (
                  <div className="text-sm text-neutral-300 leading-relaxed space-y-4 font-normal whitespace-pre-line">
                    {t(sec.content)}
                  </div>
                )}
              </div>
            </section>
          );
        }

        if (sec.type === 'cta_banner') {
          return (
            <section key={sec.id} className="py-16 bg-gradient-to-r from-amber-950/40 to-neutral-950 border-b border-neutral-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">{title}</h3>
                  <p className="text-sm text-neutral-400 mt-1">{subtitle}</p>
                </div>
                {sec.ctaText && (
                  <a
                    href={sec.ctaLink || '#quote'}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl flex items-center gap-2 whitespace-nowrap transition-colors"
                  >
                    <span>{t(sec.ctaText)}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </section>
          );
        }

        return null;
      })}
    </>
  );
};
