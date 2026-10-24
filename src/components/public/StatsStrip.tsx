import React from 'react';
import { useContent } from '../../context/ContentContext';

export const StatsStrip: React.FC = () => {
  const { content, t } = useContent();
  const stats = content.about.stats || [];

  if (stats.length === 0) return null;

  return (
    <section className="border-y border-white/[0.08] bg-black py-12 relative overflow-hidden">
      {/* Background blueprint grid watermark */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-white/[0.08]">
          {stats.map((stat, idx) => (
            <div
              key={stat.id || idx}
              className={`flex flex-col items-center md:items-start text-center md:text-start ${
                idx > 0 ? 'pt-6 md:pt-0 md:pr-8' : ''
              }`}
            >
              <span className="text-4xl sm:text-5xl font-black bg-gradient-to-b from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent tracking-tight tabular-nums font-mono">
                {stat.value}
              </span>
              <span className="text-sm font-bold text-white mt-2">
                {t(stat.label)}
              </span>
              {stat.sublabel && (
                <span className="text-xs text-neutral-400 mt-1 font-normal">
                  {t(stat.sublabel)}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
