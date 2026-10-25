import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, MapPin, Eye } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { ProjectItem } from '../../types';
import { ProjectModal } from './ProjectModal';

export const ProjectsSection: React.FC = () => {
  const { content, language, t } = useContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const projects = (content.projects || [])
    .filter((p) => p.isVisible)
    .sort((a, b) => a.order - b.order);

  if (projects.length === 0) return null;

  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  const categories = [
    { key: 'all', labelAr: 'جميع المشاريع', labelEn: 'All Projects' },
    { key: 'residential', labelAr: 'فلل وقصور سكنية', labelEn: 'Residential' },
    { key: 'commercial', labelAr: 'مباني وأبراج تجارية', labelEn: 'Commercial' },
  ];

  const filtered = selectedCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const kicker = t(
    content.projectsHeader?.kicker,
    language === 'ar' ? '04 — مشاريعنا' : '04 — Our Portfolio'
  );
  const heading = t(
    content.projectsHeader?.heading,
    language === 'ar' ? 'مشاريع منفذة تشهد على دقة الإنجاز' : 'Architectural Landmarks Built to Endure'
  );

  return (
    <section id="projects" className="py-24 sm:py-32 bg-[#18232b] text-white border-b border-[#2d3e4b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
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
          </div>

          {/* Minimalist Filter Tabs */}
          <div className="flex items-center gap-6 border-b border-[#2d3e4b] pb-2 shrink-0 self-start md:self-auto text-xs tracking-wider">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`py-2 transition-all duration-200 cursor-pointer relative ${
                  selectedCategory === cat.key
                    ? 'text-white font-medium after:content-[""] after:absolute after:bottom-[-9px] after:inset-x-0 after:h-[2px] after:bg-[#b88a58]'
                    : 'text-[#8898a3] hover:text-white'
                }`}
              >
                {language === 'ar' ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((proj) => {
            const title = t(proj.title);
            const location = t(proj.location);
            const categoryName = t(proj.categoryName);
            const statusName = t(proj.statusName);

            return (
              <div
                key={proj.id}
                onClick={() => setActiveProject(proj)}
                className="group bg-[#213039]/60 border border-[#2d3e4b] hover:border-[#b88a58]/60 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Visual Image */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#162128]">
                  <img
                    src={proj.coverImage || '/src/assets/images/mismar_hero_clean_1792793901017.jpg'}
                    alt={title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18232b] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Corner tag */}
                  <div className="absolute top-3 right-3 text-[10px] font-mono text-[#b88a58] bg-[#18232b]/80 backdrop-blur-xs px-2.5 py-1 border border-[#2d3e4b]">
                    {statusName}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#8898a3] mb-2">
                      <span>{categoryName}</span>
                      {proj.areaM2 && (
                        <>
                          <span>·</span>
                          <span className="tabular-nums">{proj.areaM2} م²</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-[#b88a58] transition-colors line-clamp-1">
                      {title}
                    </h3>

                    <p className="text-xs text-neutral-300 font-light line-clamp-2 leading-relaxed mt-2">
                      {t(proj.description)}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#2d3e4b] flex items-center justify-between text-xs text-neutral-400">
                    <div className="flex items-center gap-1.5 text-neutral-300">
                      <MapPin className="w-3.5 h-3.5 text-[#b88a58] shrink-0" />
                      <span className="truncate max-w-[180px]">{location}</span>
                    </div>

                    <span className="text-[#b88a58] font-normal flex items-center gap-1 group-hover:translate-x-[-2px] transition-transform">
                      <span>{language === 'ar' ? 'عرض التفاصيل' : 'Details'}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
