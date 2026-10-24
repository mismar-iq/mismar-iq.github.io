import React, { useState } from 'react';
import { X, MapPin, Calendar, Maximize2, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectItem } from '../../types';
import { useContent } from '../../context/ContentContext';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { content, language, t } = useContent();
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!project) return null;

  const rawImages = [project.coverImage, ...(project.galleryImages || [])].filter(Boolean);
  // Filter out any user mockups with baked text
  const allImages = rawImages.filter(img => !img.includes('image_b5d539ef.png') && !img.includes('image_78c1d6bf.png'));
  if (allImages.length === 0) {
    allImages.push('/src/assets/images/mismar_hero_clean_1792793901017.jpg');
  }

  const title = t(project.title);
  const description = t(project.description);
  const location = t(project.location);
  const statusName = t(project.statusName);
  const categoryName = t(project.categoryName);

  const handleInquire = () => {
    const waNumber = content.contact.whatsapp.replace(/\D/g, '');
    const msg = language === 'ar'
      ? `مرحباً شركة مسمار للمقاولات، أود الاستفسار عن تفاصيل تنفيذ مشروع مماثل لمشروع (${project.title.ar}).`
      : `Hello Mismar Contracting, I would like to inquire about building a project similar to (${project.title.en || project.title.ar}).`;
    
    window.location.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  };

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#1e2b34] border border-[#2d3e4b] max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-neutral-100">
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#2d3e4b] bg-[#18232b]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="text-[#b88a58]">{categoryName}</span>
              <span aria-hidden="true">·</span>
              <span>{statusName}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-1 tracking-tight">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-[#213039] transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Photo Gallery Slider */}
          {allImages.length > 0 && (
            <div className="relative aspect-16/10 sm:aspect-16/9 bg-[#141d24] overflow-hidden group">
              <img
                src={allImages[activeImageIdx]}
                alt={title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
              />

              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-[#18232b]/80 hover:bg-[#18232b] text-white border border-[#2d3e4b] transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-[#18232b]/80 hover:bg-[#18232b] text-white border border-[#2d3e4b] transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
                    {allImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIdx(idx)}
                        className={`h-[2px] transition-all cursor-pointer ${
                          idx === activeImageIdx ? 'w-8 bg-[#b88a58]' : 'w-3 bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Details Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Project Specs Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 border border-[#2d3e4b] bg-[#18232b] text-xs">
              <div>
                <span className="text-neutral-400 font-mono block mb-1">
                  {language === 'ar' ? 'الموقع' : 'Location'}
                </span>
                <span className="font-medium text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#b88a58] shrink-0" />
                  <span>{location}</span>
                </span>
              </div>

              <div>
                <span className="text-neutral-400 font-mono block mb-1">
                  {language === 'ar' ? 'المساحة المبنية' : 'Built-up Area'}
                </span>
                <span className="font-medium text-white flex items-center gap-1.5 font-mono">
                  <Maximize2 className="w-3.5 h-3.5 text-[#b88a58] shrink-0" />
                  <span>{project.areaM2 ? `${project.areaM2} م²` : '-'}</span>
                </span>
              </div>

              <div>
                <span className="text-neutral-400 font-mono block mb-1">
                  {language === 'ar' ? 'سنة التسليم' : 'Handover Year'}
                </span>
                <span className="font-medium text-white flex items-center gap-1.5 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-[#b88a58] shrink-0" />
                  <span>{project.year || '-'}</span>
                </span>
              </div>

              <div>
                <span className="text-neutral-400 font-mono block mb-1">
                  {language === 'ar' ? 'حالة الإنجاز' : 'Project Status'}
                </span>
                <span className="font-medium text-[#b88a58]">{statusName}</span>
              </div>
            </div>

            {/* Project Description */}
            <div>
              <h4 className="text-sm font-bold text-white mb-2 tracking-tight">
                {language === 'ar' ? 'المواصفات الهندسية والمعمارية' : 'Engineering & Architectural Details'}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                {description}
              </p>
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div>
                <span className="text-xs font-mono text-neutral-400 block mb-2">
                  {language === 'ar' ? 'معرض صور المشروع' : 'Project Gallery'}
                </span>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`aspect-4/3 overflow-hidden border transition-all cursor-pointer ${
                        idx === activeImageIdx
                          ? 'border-[#b88a58] ring-1 ring-[#b88a58]'
                          : 'border-[#2d3e4b] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 sm:p-5 border-t border-[#2d3e4b] bg-[#18232b] flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs text-neutral-300 hover:text-white border border-[#2d3e4b] hover:border-neutral-500 transition-colors cursor-pointer"
          >
            {language === 'ar' ? 'إغلاق' : 'Close'}
          </button>

          <button
            onClick={handleInquire}
            className="px-6 py-2.5 bg-[#b88a58] hover:bg-[#a67949] text-[#18232b] font-medium text-xs tracking-wider flex items-center gap-2.5 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{language === 'ar' ? 'طلب استشارة لمشروع مماثل' : 'Inquire for similar build'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
