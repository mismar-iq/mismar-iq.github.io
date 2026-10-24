import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export const QuoteSection: React.FC = () => {
  const { content, language } = useContent();
  const [formData, setFormData] = useState({
    fullName: '',
    projectType: 'فيلا سكنية خاصة',
    estimatedArea: '650',
    notes: ''
  });

  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setFormError(language === 'ar' ? 'يرجى كتابة الاسم الكريم' : 'Please provide your full name');
      return;
    }
    setFormError('');

    const waNumber = content.contact.whatsapp.replace(/\D/g, '');
    let template = content.contact.quoteWhatsappTemplate ||
      'مرحباً شركة مسمار للمقاولات 🏗️\nأرغب في مناقشة فكرة مشروع بناء:\n- الاسم: {name}\n- نوع المشروع: {projectType}\n- المساحة التقديرية: {area} م²\n- تفاصيل الفكرة: {notes}';

    const message = template
      .replace('{name}', formData.fullName)
      .replace('{projectType}', formData.projectType)
      .replace('{area}', formData.estimatedArea || 'غير محدد')
      .replace('{package}', 'استشارة عامة')
      .replace('{phone}', 'محادثة واتساب')
      .replace('{city}', 'المملكة العربية السعودية')
      .replace('{notes}', formData.notes || 'أود مناقشة المخطط وجداول الكميات');

    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.location.href = waUrl;
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#18232b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Box Layout matching Image 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-2xl border border-[#2d3e4b]">
          {/* Right Column (Dark Architectural Slate) */}
          <div className="lg:col-span-5 bg-[#213039] p-8 sm:p-14 lg:p-16 flex flex-col justify-between text-white border-b lg:border-b-0 lg:border-l border-[#2d3e4b]">
            <div className="space-y-6">
              <div className="text-xs font-mono text-[#b88a58] tracking-widest uppercase">
                05 — {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                {language === 'ar' ? 'نبدأ من الفكرة.' : 'We begin with the concept.'}
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                {language === 'ar'
                  ? 'أخبرنا بما تفكر فيه، سنرتب الخطوة التالية.'
                  : 'Tell us about your architectural vision, we will orchestrate the next milestone.'}
              </p>
            </div>

            <div className="pt-12 mt-12 border-t border-[#2d3e4b] text-xs text-neutral-400 font-light space-y-1">
              <div>{language === 'ar' ? 'شركة مسمار للمقاولات العامة' : 'MISMAR CONTRACTING CO.'}</div>
              <div className="font-mono text-neutral-400">+{content.contact.whatsapp} · {content.contact.email}</div>
            </div>
          </div>

          {/* Left Column (Warm Stone / Linen with Form Fields) */}
          <div className="lg:col-span-7 bg-[#f4efe8] p-8 sm:p-14 lg:p-16 flex flex-col justify-between text-[#1e2b34]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-[#1e2b34] mb-2">
                    {language === 'ar' ? 'الاسم' : 'Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-white border border-[#ded5c7] focus:border-[#b88a58] px-4 py-3 text-sm text-[#1e2b34] focus:outline-none transition-colors"
                  />
                  {formError && (
                    <p className="text-xs text-red-600 mt-1 font-medium">{formError}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1e2b34] mb-2">
                    {language === 'ar' ? 'نوع المشروع' : 'Project Type'}
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-white border border-[#ded5c7] focus:border-[#b88a58] px-4 py-3 text-sm text-[#1e2b34] focus:outline-none transition-colors"
                  >
                    <option value="فيلا سكنية خاصة">فيلا سكنية خاصة</option>
                    <option value="قصر فاخر">قصر فاخر</option>
                    <option value="مبنى تجاري وإداري">مبنى تجاري وإداري</option>
                    <option value="مجمع سكني">مجمع سكني</option>
                    <option value="أعمال عظم إنشائية">أعمال عظم إنشائية</option>
                    <option value="تشطيبات معمارية وديكور">تشطيبات معمارية وديكور</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1e2b34] mb-2">
                  {language === 'ar' ? 'المساحة المبنية التقديرية (م²)' : 'Estimated Area (sqm)'}
                </label>
                <input
                  type="number"
                  value={formData.estimatedArea}
                  onChange={(e) => setFormData({ ...formData, estimatedArea: e.target.value })}
                  placeholder="650"
                  className="w-full bg-white border border-[#ded5c7] focus:border-[#b88a58] px-4 py-3 text-sm text-[#1e2b34] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1e2b34] mb-2">
                  {language === 'ar' ? 'أخبرنا عن الفكرة' : 'Tell us about the idea'}
                </label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-white border border-[#ded5c7] focus:border-[#b88a58] p-4 text-sm text-[#1e2b34] focus:outline-none transition-colors"
                />
              </div>

              {/* Action Button & Footnote (Matches Reference Image 2 exactly) */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#b88a58] hover:bg-[#a67949] text-white font-medium text-xs tracking-wider transition-all duration-200 cursor-pointer shadow-sm self-start"
                >
                  <span>{language === 'ar' ? 'إرسال عبر واتساب' : 'Send via WhatsApp'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>

                <span className="text-[11px] text-[#788894] font-light">
                  {language === 'ar'
                    ? 'لن يتم حفظ هذه المعلومات على الموقع.'
                    : 'This information will not be stored on the website.'}
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
