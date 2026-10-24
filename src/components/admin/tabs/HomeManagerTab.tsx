import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { HeroSlide, SectionConfig } from '../../../types';
import {
  Check,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
  Layers,
  Sparkles
} from 'lucide-react';
import { MediaPickerModal } from '../../common/MediaPickerModal';

export const HomeManagerTab: React.FC = () => {
  const { content, saveSettings } = useContent();
  const settings = content.settings;
  const slide = settings.heroSlides?.[0] || {
    id: 'hero-1',
    title: { ar: '', en: '' },
    subtitle: { ar: '', en: '' },
    kicker: { ar: '', en: '' },
    primaryCtaText: { ar: '', en: '' },
    primaryCtaLink: '#quote',
    secondaryCtaText: { ar: '', en: '' },
    secondaryCtaLink: '#packages',
    backgroundImage: '',
    isVisible: true
  };

  const [heroForm, setHeroForm] = useState<HeroSlide>(JSON.parse(JSON.stringify(slide)));
  const [brandForm, setBrandForm] = useState({
    logoText: settings.logoText || 'MISMAR CONTRACTING',
    logoImage: settings.logoImage || '/assets/aistudio/image_4bd9251f.png',
    siteNameAr: settings.siteName.ar || 'شركة مسمار للمقاولات',
    siteNameEn: settings.siteName.en || 'MISMAR CONTRACTING',
  });
  const [sections, setSections] = useState<SectionConfig[]>(
    [...(settings.sectionsConfig || [])].sort((a, b) => a.order - b.order)
  );
  const [pickerOpen, setPickerOpen] = useState(false);
  const [logoPickerOpen, setLogoPickerOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [brandSaveSuccess, setBrandSaveSuccess] = useState(false);

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSettings = {
      ...settings,
      heroSlides: [heroForm]
    };
    await saveSettings(updatedSettings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSaveBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSettings = {
      ...settings,
      logoText: brandForm.logoText,
      logoImage: brandForm.logoImage,
      siteName: {
        ar: brandForm.siteNameAr,
        en: brandForm.siteNameEn,
      }
    };
    await saveSettings(updatedSettings);
    setBrandSaveSuccess(true);
    setTimeout(() => setBrandSaveSuccess(false), 3000);
  };

  const toggleSection = async (secId: string) => {
    const updated = sections.map((s) => (s.id === secId ? { ...s, isVisible: !s.isVisible } : s));
    setSections(updated);
    await saveSettings({ ...settings, sectionsConfig: updated });
  };

  const moveSection = async (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= sections.length) return;

    const updated = [...sections];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;

    for (let i = 0; i < updated.length; i++) {
      updated[i].order = i + 1;
    }
    setSections(updated);
    await saveSettings({ ...settings, sectionsConfig: updated });
  };

  return (
    <div className="space-y-8">
      {/* Brand Identity & Official Logo Management */}
      <div className="p-6 sm:p-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>الهوية البصرية وشعار المكتب الرسمي (MISMAR)</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              إدارة شعار الشركة الرسمي، الاسم باللغتين العربية والإنجليزية، والظهور في الهيدر والفوتر واللوحة.
            </p>
          </div>

          {brandSaveSuccess && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
              <Check className="w-3.5 h-3.5" />
              <span>تم حفظ الشعار والهوية!</span>
            </span>
          )}
        </div>

        <form onSubmit={handleSaveBrand} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Logo Preview Card */}
            <div className="lg:col-span-4 bg-neutral-950/80 p-5 rounded-xl border border-neutral-800 flex flex-col items-center justify-center text-center">
              <span className="text-[11px] text-neutral-400 font-medium mb-3">معاينة الشعار المعتمد</span>
              <div className="w-24 h-24 rounded-2xl bg-white p-2 flex items-center justify-center shadow-xl border border-neutral-200 overflow-hidden">
                <img
                  src={brandForm.logoImage || '/assets/aistudio/image_4bd9251f.png'}
                  alt="Official Logo Preview"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-bold text-white mt-3">{brandForm.logoText}</span>
              <span className="text-[10px] text-neutral-400">{brandForm.siteNameAr}</span>
            </div>

            {/* Inputs */}
            <div className="lg:col-span-8 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  رابط مسار صورة الشعار
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={brandForm.logoImage}
                    onChange={(e) => setBrandForm({ ...brandForm, logoImage: e.target.value })}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-500/50"
                    placeholder="/assets/aistudio/image_4bd9251f.png"
                  />
                  <button
                    type="button"
                    onClick={() => setLogoPickerOpen(true)}
                    className="px-3.5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-xs text-white rounded-xl flex items-center gap-2 border border-neutral-700 shrink-0 cursor-pointer"
                  >
                    <ImageIcon className="w-4 h-4 text-amber-500" />
                    <span>اختيار من الوسائط</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    الاسم بالإنجليزية (Typography)
                  </label>
                  <input
                    type="text"
                    value={brandForm.logoText}
                    onChange={(e) => setBrandForm({ ...brandForm, logoText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    الاسم بالعربية (الرسمي)
                  </label>
                  <input
                    type="text"
                    value={brandForm.siteNameAr}
                    onChange={(e) => setBrandForm({ ...brandForm, siteNameAr: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-lg transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>تحديث وحفظ شعار المكتب</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Hero Banner Section Form */}
      <div className="p-6 sm:p-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>إدارة واجهة الموقع الرئيسية (الهيرو)</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              تعديل النصوص الكبرى، الكيكر، الصور الخلفية، والأزرار المباشرة.
            </p>
          </div>
          {saveSuccess && (
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              تم حفظ التعديلات بنجاح!
            </span>
          )}
        </div>

        <form onSubmit={handleSaveHero} className="space-y-6">
          {/* Kicker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                النص العلوي الصغير (Kicker AR)
              </label>
              <input
                type="text"
                value={heroForm.kicker.ar}
                onChange={(e) =>
                  setHeroForm({
                    ...heroForm,
                    kicker: { ...heroForm.kicker, ar: e.target.value }
                  })
                }
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                النص العلوي بالإنجليزية (Kicker EN)
              </label>
              <input
                type="text"
                dir="ltr"
                value={heroForm.kicker.en}
                onChange={(e) =>
                  setHeroForm({
                    ...heroForm,
                    kicker: { ...heroForm.kicker, en: e.target.value }
                  })
                }
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Main Title AR / EN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                العنوان الرئيسي الكبير (AR) *
              </label>
              <textarea
                rows={2}
                value={heroForm.title.ar}
                onChange={(e) =>
                  setHeroForm({
                    ...heroForm,
                    title: { ...heroForm.title, ar: e.target.value }
                  })
                }
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                العنوان الرئيسي بالإنجليزية (Title EN)
              </label>
              <textarea
                rows={2}
                dir="ltr"
                value={heroForm.title.en}
                onChange={(e) =>
                  setHeroForm({
                    ...heroForm,
                    title: { ...heroForm.title, en: e.target.value }
                  })
                }
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Subtitle AR / EN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                الوصف التعريفي للواجهة (AR)
              </label>
              <textarea
                rows={3}
                value={heroForm.subtitle.ar}
                onChange={(e) =>
                  setHeroForm({
                    ...heroForm,
                    subtitle: { ...heroForm.subtitle, ar: e.target.value }
                  })
                }
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                الوصف بالإنجليزية (Subtitle EN)
              </label>
              <textarea
                rows={3}
                dir="ltr"
                value={heroForm.subtitle.en}
                onChange={(e) =>
                  setHeroForm({
                    ...heroForm,
                    subtitle: { ...heroForm.subtitle, en: e.target.value }
                  })
                }
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Background Image */}
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-24 h-16 rounded-lg overflow-hidden border border-neutral-700 bg-neutral-900 shrink-0">
                <img
                  src={heroForm.backgroundImage}
                  alt="Hero preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">صورة الواجهة الرئيسية</span>
                <span className="text-[11px] text-neutral-400">
                  صورة معمارية عريضة بدقة عالية تظهر في أعلى الموقع
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <ImageIcon className="w-4 h-4 text-amber-500" />
              <span>تغيير الصورة من مكتبة الوسائط</span>
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950 space-y-3">
              <span className="text-xs font-semibold text-amber-400 block">الزر الأساسي (Primary CTA)</span>
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">نص الزر (عربي)</label>
                <input
                  type="text"
                  value={heroForm.primaryCtaText.ar}
                  onChange={(e) =>
                    setHeroForm({
                      ...heroForm,
                      primaryCtaText: { ...heroForm.primaryCtaText, ar: e.target.value }
                    })
                  }
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">الرابط أو القسم</label>
                <input
                  type="text"
                  value={heroForm.primaryCtaLink}
                  onChange={(e) => setHeroForm({ ...heroForm, primaryCtaLink: e.target.value })}
                  placeholder="#quote"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950 space-y-3">
              <span className="text-xs font-semibold text-neutral-300 block">الزر الثانوي (Secondary CTA)</span>
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">نص الزر (عربي)</label>
                <input
                  type="text"
                  value={heroForm.secondaryCtaText.ar}
                  onChange={(e) =>
                    setHeroForm({
                      ...heroForm,
                      secondaryCtaText: { ...heroForm.secondaryCtaText, ar: e.target.value }
                    })
                  }
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">الرابط أو القسم</label>
                <input
                  type="text"
                  value={heroForm.secondaryCtaLink}
                  onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaLink: e.target.value })}
                  placeholder="#packages"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-neutral-800">
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>حفظ نصوص وصور الواجهة الرئيسية</span>
            </button>
          </div>
        </form>
      </div>

      {/* Sections Ordering & Visibility Manager */}
      <div className="p-6 sm:p-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-xl space-y-4">
        <div className="pb-3 border-b border-neutral-800">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-500" />
            <span>ترتيب أقسام الصفحة الرئيسية وإظهارها / إخفاؤها</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            يمكنك إعادة ترتيب تسلسل الأقسام أو إخفاء أي قسم مؤقتاً بنقرة واحدة.
          </p>
        </div>

        <div className="space-y-2">
          {sections.map((sec, idx) => (
            <div
              key={sec.id}
              className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/70 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-neutral-900 text-neutral-400 flex items-center justify-center text-xs font-mono">
                  {idx + 1}
                </span>
                <div>
                  <span className="text-sm font-bold text-white block">{sec.nameAr}</span>
                  <span className="text-[11px] text-neutral-500">{sec.nameEn}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => moveSection(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 text-neutral-400 hover:text-white disabled:opacity-30 rounded hover:bg-neutral-800"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveSection(idx, 'down')}
                  disabled={idx === sections.length - 1}
                  className="p-1.5 text-neutral-400 hover:text-white disabled:opacity-30 rounded hover:bg-neutral-800"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => toggleSection(sec.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    sec.isVisible
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-neutral-800 text-neutral-500'
                  }`}
                >
                  {sec.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{sec.isVisible ? 'ظاهر' : 'مخفي'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MediaPickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(url) => setHeroForm({ ...heroForm, backgroundImage: url })}
        selectedUrl={heroForm.backgroundImage}
      />

      <MediaPickerModal
        isOpen={logoPickerOpen}
        onClose={() => setLogoPickerOpen(false)}
        onSelect={(url) => setBrandForm({ ...brandForm, logoImage: url })}
        selectedUrl={brandForm.logoImage}
      />
    </div>
  );
};
