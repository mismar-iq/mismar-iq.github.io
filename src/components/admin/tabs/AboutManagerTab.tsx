import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { AboutData, AboutParagraph, StatItem, CoreValue } from '../../../types';
import {
  Check,
  Plus,
  Trash2,
  Image as ImageIcon,
  Building,
  Eye,
  Compass,
  Award
} from 'lucide-react';
import { MediaPickerModal } from '../../common/MediaPickerModal';

export const AboutManagerTab: React.FC = () => {
  const { content, saveAbout } = useContent();
  const [aboutForm, setAboutForm] = useState<AboutData>(JSON.parse(JSON.stringify(content.about)));
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<'main' | 'gallery'>('main');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveAbout(aboutForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const addParagraph = () => {
    const newP: AboutParagraph = {
      id: 'ab-p-' + Date.now(),
      title: { ar: 'عنوان الفقرة الجديدة', en: 'New Section Title' },
      content: { ar: 'محتوى وتفاصيل الفقرة...', en: 'Section content in English...' }
    };
    setAboutForm({
      ...aboutForm,
      paragraphs: [...(aboutForm.paragraphs || []), newP]
    });
  };

  const removeParagraph = (id: string) => {
    setAboutForm({
      ...aboutForm,
      paragraphs: aboutForm.paragraphs.filter((p) => p.id !== id)
    });
  };

  const handleImagePicked = (url: string) => {
    if (pickerTarget === 'main') {
      setAboutForm({ ...aboutForm, mainImage: url });
    } else {
      const gallery = aboutForm.galleryImages || [];
      if (!gallery.includes(url)) {
        setAboutForm({ ...aboutForm, galleryImages: [...gallery, url] });
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="p-6 sm:p-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-amber-500" />
              <span>إدارة قسم من نحن ورؤية ورسالة الشركة</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              تعديل قصة الشركة، النصوص التمهيدية، الرؤية، الرسالة، والقيم الجوهرية.
            </p>
          </div>
          {saveSuccess && (
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              تم حفظ التعديلات بنجاح!
            </span>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Title AR / EN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                عنوان القسم بالعربية *
              </label>
              <input
                type="text"
                required
                value={aboutForm.title.ar}
                onChange={(e) =>
                  setAboutForm({
                    ...aboutForm,
                    title: { ...aboutForm.title, ar: e.target.value }
                  })
                }
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                عنوان القسم بالإنجليزية (Title EN)
              </label>
              <input
                type="text"
                dir="ltr"
                value={aboutForm.title.en}
                onChange={(e) =>
                  setAboutForm({
                    ...aboutForm,
                    title: { ...aboutForm.title, en: e.target.value }
                  })
                }
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Lead Paragraph AR / EN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                الفقرة التمهيدية الكبرى (عربي)
              </label>
              <textarea
                rows={3}
                value={aboutForm.leadParagraph.ar}
                onChange={(e) =>
                  setAboutForm({
                    ...aboutForm,
                    leadParagraph: { ...aboutForm.leadParagraph, ar: e.target.value }
                  })
                }
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                الفقرة التمهيدية بالإنجليزية (Lead Paragraph EN)
              </label>
              <textarea
                rows={3}
                dir="ltr"
                value={aboutForm.leadParagraph.en}
                onChange={(e) =>
                  setAboutForm({
                    ...aboutForm,
                    leadParagraph: { ...aboutForm.leadParagraph, en: e.target.value }
                  })
                }
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Main Photo Picker */}
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-24 h-16 rounded-lg overflow-hidden border border-neutral-700 bg-neutral-900 shrink-0">
                <img
                  src={aboutForm.mainImage}
                  alt="About preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">صورة قسم من نحن الرئيسية</span>
                <span className="text-[11px] text-neutral-400">
                  صورة موقع البناء أو المهندسين والإشراف
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setPickerTarget('main');
                setPickerOpen(true);
              }}
              className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <ImageIcon className="w-4 h-4 text-amber-500" />
              <span>تغيير الصورة من المكتبة</span>
            </button>
          </div>

          {/* Dynamic Paragraphs */}
          <div className="space-y-4 pt-2 border-t border-neutral-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                فقرات تفصيلية إضافية ({aboutForm.paragraphs?.length || 0})
              </span>
              <button
                type="button"
                onClick={addParagraph}
                className="px-3 py-1 bg-amber-600/20 text-amber-300 hover:bg-amber-600/30 rounded-lg text-xs font-medium flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة فقرة جديدة</span>
              </button>
            </div>

            <div className="space-y-3">
              {aboutForm.paragraphs?.map((p, idx) => (
                <div key={p.id} className="p-4 rounded-xl border border-neutral-800 bg-neutral-950 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-300">فقرة رقم {idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeParagraph(p.id)}
                      className="text-red-400 hover:text-red-300 p-1 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>حذف</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={p.title.ar}
                      onChange={(e) => {
                        const updated = [...aboutForm.paragraphs];
                        updated[idx].title.ar = e.target.value;
                        setAboutForm({ ...aboutForm, paragraphs: updated });
                      }}
                      placeholder="عنوان الفقرة (عربي)"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      dir="ltr"
                      value={p.title.en}
                      onChange={(e) => {
                        const updated = [...aboutForm.paragraphs];
                        updated[idx].title.en = e.target.value;
                        setAboutForm({ ...aboutForm, paragraphs: updated });
                      }}
                      placeholder="Paragraph title in English"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <textarea
                      rows={2}
                      value={p.content.ar}
                      onChange={(e) => {
                        const updated = [...aboutForm.paragraphs];
                        updated[idx].content.ar = e.target.value;
                        setAboutForm({ ...aboutForm, paragraphs: updated });
                      }}
                      placeholder="نص الفقرة بالعربية..."
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                    <textarea
                      rows={2}
                      dir="ltr"
                      value={p.content.en}
                      onChange={(e) => {
                        const updated = [...aboutForm.paragraphs];
                        updated[idx].content.en = e.target.value;
                        setAboutForm({ ...aboutForm, paragraphs: updated });
                      }}
                      placeholder="Paragraph content in English..."
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-800">
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950 space-y-2">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>رؤية الشركة (Vision)</span>
              </span>
              <textarea
                rows={3}
                value={aboutForm.vision.ar}
                onChange={(e) =>
                  setAboutForm({
                    ...aboutForm,
                    vision: { ...aboutForm.vision, ar: e.target.value }
                  })
                }
                placeholder="الرؤية بالعربية..."
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white"
              />
              <textarea
                rows={2}
                dir="ltr"
                value={aboutForm.vision.en}
                onChange={(e) =>
                  setAboutForm({
                    ...aboutForm,
                    vision: { ...aboutForm.vision, en: e.target.value }
                  })
                }
                placeholder="Vision in English..."
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white"
              />
            </div>

            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950 space-y-2">
              <span className="text-xs font-bold text-neutral-200 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-500" />
                <span>رسالة الشركة (Mission)</span>
              </span>
              <textarea
                rows={3}
                value={aboutForm.mission.ar}
                onChange={(e) =>
                  setAboutForm({
                    ...aboutForm,
                    mission: { ...aboutForm.mission, ar: e.target.value }
                  })
                }
                placeholder="الرسالة بالعربية..."
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white"
              />
              <textarea
                rows={2}
                dir="ltr"
                value={aboutForm.mission.en}
                onChange={(e) =>
                  setAboutForm({
                    ...aboutForm,
                    mission: { ...aboutForm.mission, en: e.target.value }
                  })
                }
                placeholder="Mission in English..."
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-neutral-800">
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>حفظ بيانات قسم من نحن والرؤية</span>
            </button>
          </div>
        </form>
      </div>

      <MediaPickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={handleImagePicked}
        selectedUrl={aboutForm.mainImage}
      />
    </div>
  );
};
