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
  Award,
  ShieldCheck,
  Clock,
  FileCheck,
  CheckCircle2,
  Scale,
  Sparkles,
  HeartHandshake,
  Building2,
  HardHat,
  Users,
  ArrowUp,
  ArrowDown,
  BarChart3
} from 'lucide-react';
import { MediaPickerModal } from '../../common/MediaPickerModal';

const AVAILABLE_ICONS = [
  { value: 'ShieldCheck', labelAr: 'درع الإتقان والمطابقة', icon: ShieldCheck },
  { value: 'Clock', labelAr: 'ساعة الالتزام بالوقت', icon: Clock },
  { value: 'FileCheck', labelAr: 'ملف الشفافية والكميات', icon: FileCheck },
  { value: 'Award', labelAr: 'وسام الضمان والجودة', icon: Award },
  { value: 'CheckCircle2', labelAr: 'علامة الإتقان والاعتماد', icon: CheckCircle2 },
  { value: 'Scale', labelAr: 'ميزان الشفافية والعدالة', icon: Scale },
  { value: 'Sparkles', labelAr: 'فخامة وتميز معماري', icon: Sparkles },
  { value: 'HeartHandshake', labelAr: 'شراكة وثقة مع المالك', icon: HeartHandshake },
  { value: 'Building2', labelAr: 'صرح ومتانة إنشائية', icon: Building2 },
  { value: 'HardHat', labelAr: 'خوذة إشراف هندسي ميداني', icon: HardHat },
  { value: 'Users', labelAr: 'كادر استشاري متخصص', icon: Users },
  { value: 'Compass', labelAr: 'بوصلة وتخطيط دقيق', icon: Compass },
];

export const AboutManagerTab: React.FC = () => {
  const { content, saveAbout } = useContent();
  const [aboutForm, setAboutForm] = useState<AboutData>(() => {
    const initial = JSON.parse(JSON.stringify(content.about));
    if (!initial.values) initial.values = [];
    if (!initial.valuesTitle) initial.valuesTitle = { ar: 'قيمنا الجوهرية', en: 'Core Principles' };
    if (!initial.stats) initial.stats = [];
    return initial;
  });
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<'main' | 'gallery'>('main');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveAbout(aboutForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Paragraphs
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
      paragraphs: (aboutForm.paragraphs || []).filter((p) => p.id !== id)
    });
  };

  // Core Values
  const addCoreValue = () => {
    const newVal: CoreValue = {
      id: 'val-' + Date.now(),
      title: { ar: 'قيمة جوهرية جديدة', en: 'New Core Principle' },
      description: { ar: 'شرح وتفاصيل معيار الجودة أو الالتزام...', en: 'Description of the principle...' },
      icon: 'ShieldCheck'
    };
    setAboutForm({
      ...aboutForm,
      values: [...(aboutForm.values || []), newVal]
    });
  };

  const removeCoreValue = (id: string) => {
    setAboutForm({
      ...aboutForm,
      values: (aboutForm.values || []).filter((v) => v.id !== id)
    });
  };

  const moveCoreValue = (index: number, direction: 'up' | 'down') => {
    const currentValues = [...(aboutForm.values || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentValues.length) return;
    const temp = currentValues[index];
    currentValues[index] = currentValues[targetIndex];
    currentValues[targetIndex] = temp;
    setAboutForm({ ...aboutForm, values: currentValues });
  };

  // Stats
  const addStat = () => {
    const newStat: StatItem = {
      id: 'st-' + Date.now(),
      value: '100+',
      label: { ar: 'إنجاز جديد', en: 'New Metric' },
      sublabel: { ar: 'تفاصيل إضافية', en: 'Additional details' }
    };
    setAboutForm({
      ...aboutForm,
      stats: [...(aboutForm.stats || []), newStat]
    });
  };

  const removeStat = (id: string) => {
    setAboutForm({
      ...aboutForm,
      stats: (aboutForm.stats || []).filter((s) => s.id !== id)
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

  const renderIconComponent = (iconName: string) => {
    const found = AVAILABLE_ICONS.find((i) => i.value === iconName);
    if (found) {
      const IconComp = found.icon;
      return <IconComp className="w-5 h-5 text-amber-500" />;
    }
    return <ShieldCheck className="w-5 h-5 text-amber-500" />;
  };

  return (
    <div className="space-y-8">
      <div className="p-6 sm:p-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-amber-500" />
              <span>إدارة قسم من نحن ورؤية ورسالة وقيم الشركة</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              تعديل قصة الشركة، النصوص التمهيدية، الرؤية، الرسالة، بطاقات القيم الجوهرية الأربعة، والإحصائيات.
            </p>
          </div>
          {saveSuccess && (
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              تم حفظ التعديلات بنجاح!
            </span>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          {/* 1. Header & Lead */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-2">
              <Building className="w-3.5 h-3.5 text-amber-500" />
              <span>1. العناوين والنص التمهيدي للقسم</span>
            </h3>

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
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 leading-relaxed"
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
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 leading-relaxed"
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
                    صورة موقع البناء أو المهندسين والإشراف الميداني
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
          </div>

          {/* 2. Dynamic Paragraphs */}
          <div className="space-y-4 pt-4 border-t border-neutral-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>2. فقرات تفصيلية إضافية ({aboutForm.paragraphs?.length || 0})</span>
                </h3>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  فقرات المنهجية الهندسية الصارمة والشفافية وتفاصيل الأعمال.
                </p>
              </div>
              <button
                type="button"
                onClick={addParagraph}
                className="px-3 py-1 bg-amber-600/20 text-amber-300 hover:bg-amber-600/30 rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer"
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
                      className="text-red-400 hover:text-red-300 p-1 text-xs flex items-center gap-1 cursor-pointer"
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
                        const updated = [...(aboutForm.paragraphs || [])];
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
                        const updated = [...(aboutForm.paragraphs || [])];
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
                        const updated = [...(aboutForm.paragraphs || [])];
                        updated[idx].content.ar = e.target.value;
                        setAboutForm({ ...aboutForm, paragraphs: updated });
                      }}
                      placeholder="نص الفقرة بالعربية..."
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white leading-relaxed"
                    />
                    <textarea
                      rows={2}
                      dir="ltr"
                      value={p.content.en}
                      onChange={(e) => {
                        const updated = [...(aboutForm.paragraphs || [])];
                        updated[idx].content.en = e.target.value;
                        setAboutForm({ ...aboutForm, paragraphs: updated });
                      }}
                      placeholder="Paragraph content in English..."
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Vision & Mission */}
          <div className="space-y-4 pt-4 border-t border-neutral-800">
            <h3 className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-amber-500" />
              <span>3. الرؤية والرسالة (Vision & Mission)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white leading-relaxed"
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
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white leading-relaxed"
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
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white leading-relaxed"
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
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* 4. Core Values (قيمنا الجوهرية ومبادئ العمل) */}
          <div className="space-y-4 pt-4 border-t border-neutral-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>4. بطاقات القيم الجوهرية ومبادئ العمل ({aboutForm.values?.length || 0})</span>
                </h3>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  البطاقات المعروضة في قسم من نحن (الإتقان، الالتزام بالوقت، الشفافية بالكميات، الضمان، إلخ). يمكنك تعديل العنوان والأيقونة والوصف لكل بطاقة بحرية.
                </p>
              </div>
              <button
                type="button"
                onClick={addCoreValue}
                className="px-3.5 py-1.5 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة بطاقة قيمة جوهرية جديدة</span>
              </button>
            </div>

            {/* Values Section Header Title */}
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/80 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                  عنوان قسم القيم الجوهرية (عربي)
                </label>
                <input
                  type="text"
                  value={aboutForm.valuesTitle?.ar ?? 'قيمنا الجوهرية'}
                  onChange={(e) =>
                    setAboutForm({
                      ...aboutForm,
                      valuesTitle: {
                        ar: e.target.value,
                        en: aboutForm.valuesTitle?.en || 'Core Principles'
                      }
                    })
                  }
                  placeholder="قيمنا الجوهرية"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                  عنوان قسم القيم الجوهرية (English)
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={aboutForm.valuesTitle?.en ?? 'Core Principles'}
                  onChange={(e) =>
                    setAboutForm({
                      ...aboutForm,
                      valuesTitle: {
                        ar: aboutForm.valuesTitle?.ar || 'قيمنا الجوهرية',
                        en: e.target.value
                      }
                    })
                  }
                  placeholder="Core Principles"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* List of Value Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {aboutForm.values?.map((val, idx) => (
                <div
                  key={val.id || idx}
                  className="p-4 rounded-xl border border-neutral-800 bg-neutral-950 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-800/80">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        {renderIconComponent(val.icon)}
                      </div>
                      <span className="text-xs font-bold text-white">بطاقة قيمة رقم {idx + 1}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveCoreValue(idx, 'up')}
                        disabled={idx === 0}
                        title="تحريك لأعلى"
                        className="p-1 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveCoreValue(idx, 'down')}
                        disabled={idx === (aboutForm.values?.length || 0) - 1}
                        title="تحريك لأسفل"
                        className="p-1 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeCoreValue(val.id)}
                        className="p-1 text-red-400 hover:text-red-300 text-xs flex items-center gap-1 cursor-pointer mr-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Icon Selector */}
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                      أيقونة البطاقة
                    </label>
                    <select
                      value={val.icon}
                      onChange={(e) => {
                        const updated = [...(aboutForm.values || [])];
                        updated[idx].icon = e.target.value;
                        setAboutForm({ ...aboutForm, values: updated });
                      }}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      {AVAILABLE_ICONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.labelAr} ({opt.value})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Title AR / EN */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                        عنوان البطاقة (عربي)
                      </label>
                      <input
                        type="text"
                        value={val.title.ar}
                        onChange={(e) => {
                          const updated = [...(aboutForm.values || [])];
                          updated[idx].title.ar = e.target.value;
                          setAboutForm({ ...aboutForm, values: updated });
                        }}
                        placeholder="مثل: الإتقان والمطابقة القياسية"
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                        عنوان البطاقة (English)
                      </label>
                      <input
                        type="text"
                        dir="ltr"
                        value={val.title.en}
                        onChange={(e) => {
                          const updated = [...(aboutForm.values || [])];
                          updated[idx].title.en = e.target.value;
                          setAboutForm({ ...aboutForm, values: updated });
                        }}
                        placeholder="e.g. Quality & Mastery"
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Description AR / EN */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                        شرح القيمة (عربي)
                      </label>
                      <textarea
                        rows={2}
                        value={val.description.ar}
                        onChange={(e) => {
                          const updated = [...(aboutForm.values || [])];
                          updated[idx].description.ar = e.target.value;
                          setAboutForm({ ...aboutForm, values: updated });
                        }}
                        placeholder="تفاصيل المعيار والالتزام..."
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 leading-relaxed"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                        شرح القيمة (English)
                      </label>
                      <textarea
                        rows={2}
                        dir="ltr"
                        value={val.description.en}
                        onChange={(e) => {
                          const updated = [...(aboutForm.values || [])];
                          updated[idx].description.en = e.target.value;
                          setAboutForm({ ...aboutForm, values: updated });
                        }}
                        placeholder="Principle description in English..."
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Stats & Metrics (أرقام وإحصائيات الإنجاز) */}
          <div className="space-y-4 pt-4 border-t border-neutral-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-2">
                  <BarChart3 className="w-3.5 h-3.5 text-amber-500" />
                  <span>5. أرقام وإحصائيات الإنجاز في الموقع ({aboutForm.stats?.length || 0})</span>
                </h3>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  الأرقام الشريطية المعروضة في الموقع (سنوات الخبرة، المشاريع المنجزة، المساحات المشيدة، إلخ).
                </p>
              </div>
              <button
                type="button"
                onClick={addStat}
                className="px-3 py-1 bg-amber-600/20 text-amber-300 hover:bg-amber-600/30 rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة رقم إحصائي جديد</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {aboutForm.stats?.map((st, idx) => (
                <div key={st.id || idx} className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-neutral-300">إحصائية {idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeStat(st.id)}
                      className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] text-neutral-400 mb-0.5">الرقم / النسبة</label>
                    <input
                      type="text"
                      value={st.value}
                      onChange={(e) => {
                        const updated = [...(aboutForm.stats || [])];
                        updated[idx].value = e.target.value;
                        setAboutForm({ ...aboutForm, stats: updated });
                      }}
                      placeholder="مثال: 15+ أو 100%"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-md px-2.5 py-1 text-xs text-amber-400 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-neutral-400 mb-0.5">التسمية (عربي)</label>
                    <input
                      type="text"
                      value={st.label.ar}
                      onChange={(e) => {
                        const updated = [...(aboutForm.stats || [])];
                        updated[idx].label.ar = e.target.value;
                        setAboutForm({ ...aboutForm, stats: updated });
                      }}
                      placeholder="عاماً من الخبرة"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-md px-2.5 py-1 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-neutral-400 mb-0.5">التسمية (English)</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={st.label.en}
                      onChange={(e) => {
                        const updated = [...(aboutForm.stats || [])];
                        updated[idx].label.en = e.target.value;
                        setAboutForm({ ...aboutForm, stats: updated });
                      }}
                      placeholder="Years of Experience"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-md px-2.5 py-1 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-neutral-400 mb-0.5">تفصيل فرعي (عربي)</label>
                    <input
                      type="text"
                      value={st.sublabel?.ar || ''}
                      onChange={(e) => {
                        const updated = [...(aboutForm.stats || [])];
                        updated[idx].sublabel = {
                          ar: e.target.value,
                          en: updated[idx].sublabel?.en || ''
                        };
                        setAboutForm({ ...aboutForm, stats: updated });
                      }}
                      placeholder="في قطاع البناء في العراق"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-md px-2.5 py-1 text-[11px] text-neutral-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t border-neutral-800">
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>حفظ جميع بيانات قسم من نحن والقيم والإحصائيات</span>
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
