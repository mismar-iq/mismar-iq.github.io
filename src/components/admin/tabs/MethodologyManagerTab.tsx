import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { MethodologyData, MethodologyStep } from '../../../types';
import {
  Compass,
  Check,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Sparkles,
  Eye
} from 'lucide-react';

export const MethodologyManagerTab: React.FC = () => {
  const { content, saveMethodology, language } = useContent();

  const defaultMethodology: MethodologyData = {
    kicker: {
      ar: '01 — منهجنا',
      en: '01 — Our Philosophy'
    },
    heading: {
      ar: 'الأساس الجيد لا\nيطلب الانتباه.',
      en: 'Good foundation\ncommands quiet confidence.'
    },
    description: {
      ar: 'نهتم بالتفاصيل التي تصنع فرقاً حقيقياً، ونضع جودة التنفيذ في قلب كل مشروع.',
      en: 'We obsess over the invisible details that make a lasting difference, embedding structural integrity at the heart of every build.'
    },
    steps: [
      {
        id: 'step-1',
        num: '01',
        title: { ar: 'الوضوح قبل البناء', en: 'Clarity Before Construction' },
        description: {
          ar: 'دراسة هندسية مستفيضة للمخططات الإنشائية وجداول الكميات لتفادي أي تكاليف خفية أو مفاجآت أثناء التنفيذ.',
          en: 'Rigorous engineering audit of structural blueprints and BOQs to eliminate hidden costs.'
        }
      },
      {
        id: 'step-2',
        num: '02',
        title: { ar: 'التفاصيل تصنع الفرق', en: 'Details Define Excellence' },
        description: {
          ar: 'عناية فائقة بتسليح الخرسانة، العوازل المائية والحرارية، ونقاط التقاء المواد المعمارية بأعلى دقة.',
          en: 'Meticulous supervision over structural rebar cages, waterproofing, and architectural junctions.'
        }
      },
      {
        id: 'step-3',
        num: '03',
        title: { ar: 'الالتزام التام بالمعايير', en: 'Strict Code Adherence' },
        description: {
          ar: 'مطابقة تامة للمواصفات القياسية العراقية والكود الهندسي المعتمد مع إجراء اختبارات كسر أسطوانات الخرسانة وفحص الشد.',
          en: 'Full compliance with engineering codes and certified laboratory compression and tensile testing.'
        }
      },
      {
        id: 'step-4',
        num: '04',
        title: { ar: 'التسليم وضمان الاستدامة', en: 'Handover & 10-Year Warranty' },
        description: {
          ar: 'تسليم متكامل بعقد ضمان رسمي يمتد لـ 10 سنوات على الهيكل الإنشائي والعوازل لراحة بالك التامة.',
          en: 'Turnkey handover backed by a certified 10-year structural and waterproofing deed.'
        }
      }
    ]
  };

  const initialData: MethodologyData = content.methodology || defaultMethodology;
  const [form, setForm] = useState<MethodologyData>(JSON.parse(JSON.stringify(initialData)));
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activePreviewStep, setActivePreviewStep] = useState(0);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveMethodology(form);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const handleResetToDefaults = () => {
    if (window.confirm('هل تريد استعادة النصوص الافتراضية لقسم منهجنا؟')) {
      setForm(JSON.parse(JSON.stringify(defaultMethodology)));
    }
  };

  const addStep = () => {
    const nextNum = String(form.steps.length + 1).padStart(2, '0');
    const newStep: MethodologyStep = {
      id: 'step-' + Date.now(),
      num: nextNum,
      title: { ar: 'عنوان الخطوة الجديدة', en: 'New Step Title' },
      description: {
        ar: 'اكتب هنا تفاصيل ومواصفات هذا المحور الهندسي...',
        en: 'Enter details of this engineering step...'
      }
    };
    setForm({
      ...form,
      steps: [...form.steps, newStep]
    });
  };

  const updateStep = (index: number, updated: Partial<MethodologyStep>) => {
    const updatedSteps = [...form.steps];
    updatedSteps[index] = { ...updatedSteps[index], ...updated };
    setForm({ ...form, steps: updatedSteps });
  };

  const removeStep = (index: number) => {
    const updatedSteps = form.steps.filter((_, idx) => idx !== index);
    // re-number if desired
    const renumbered = updatedSteps.map((step, idx) => ({
      ...step,
      num: String(idx + 1).padStart(2, '0')
    }));
    setForm({ ...form, steps: renumbered });
    if (activePreviewStep >= renumbered.length) {
      setActivePreviewStep(Math.max(0, renumbered.length - 1));
    }
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= form.steps.length) return;

    const updatedSteps = [...form.steps];
    const temp = updatedSteps[index];
    updatedSteps[index] = updatedSteps[targetIdx];
    updatedSteps[targetIdx] = temp;

    // re-number sequentially
    const renumbered = updatedSteps.map((step, idx) => ({
      ...step,
      num: String(idx + 1).padStart(2, '0')
    }));

    setForm({ ...form, steps: renumbered });
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                <Compass className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-white">
                إدارة قسم «منهجنا — الأساس الجيد» (Methodology)
              </h2>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              التحكم الكامل بالعنوان الترويسي، الشعار الإنشائي («الأساس الجيد لا يطلب الانتباه»)، والخطوات الأربع التفصيلية المنعكسة مباشرة على واجهة الموقع.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleResetToDefaults}
              className="px-3 py-1.5 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="استعادة النصوص الأصلية الموصى بها"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>استعادة الافتراضي</span>
            </button>

            {saveSuccess && (
              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>تم الحفظ على الموقع!</span>
              </span>
            )}
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          {/* Main Headline & Intro Text */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-amber-500 tracking-wide uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>الترويسة والنصوص التقديمية العلوية</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Kicker Ar */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  الترويسة العلوية المصغرة (عربي)
                </label>
                <input
                  type="text"
                  value={form.kicker.ar}
                  onChange={(e) =>
                    setForm({ ...form, kicker: { ...form.kicker, ar: e.target.value } })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                  placeholder="مثال: 01 — منهجنا"
                  dir="rtl"
                />
              </div>

              {/* Kicker En */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  الترويسة العلوية المصغرة (English)
                </label>
                <input
                  type="text"
                  value={form.kicker.en}
                  onChange={(e) =>
                    setForm({ ...form, kicker: { ...form.kicker, en: e.target.value } })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                  placeholder="e.g. 01 — Our Philosophy"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Heading Ar */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  العنوان البصري الرئيسي (عربي) — <span className="text-neutral-500">يمكن استخدام أسطر متعددة</span>
                </label>
                <textarea
                  rows={2}
                  value={form.heading.ar}
                  onChange={(e) =>
                    setForm({ ...form, heading: { ...form.heading, ar: e.target.value } })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm font-bold focus:border-amber-500 focus:outline-none"
                  placeholder="الأساس الجيد لا يطلب الانتباه."
                  dir="rtl"
                />
              </div>

              {/* Heading En */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  العنوان البصري الرئيسي (English)
                </label>
                <textarea
                  rows={2}
                  value={form.heading.en}
                  onChange={(e) =>
                    setForm({ ...form, heading: { ...form.heading, en: e.target.value } })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm font-bold focus:border-amber-500 focus:outline-none"
                  placeholder="Good foundation commands quiet confidence."
                  dir="ltr"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Description Ar */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  النص التوضيحي الجانبي (عربي)
                </label>
                <textarea
                  rows={3}
                  value={form.description.ar}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: { ...form.description, ar: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs leading-relaxed focus:border-amber-500 focus:outline-none"
                  placeholder="نهتم بالتفاصيل التي تصنع فرقاً حقيقياً..."
                  dir="rtl"
                />
              </div>

              {/* Description En */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  النص التوضيحي الجانبي (English)
                </label>
                <textarea
                  rows={3}
                  value={form.description.en}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: { ...form.description, en: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs leading-relaxed focus:border-amber-500 focus:outline-none"
                  placeholder="We obsess over the invisible details..."
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          {/* Steps & Pillars List */}
          <div className="pt-6 border-t border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-amber-500 tracking-wide uppercase">
                  المحاور والخطوات الهندسية الأربعة ({form.steps.length})
                </div>
                <p className="text-[11px] text-neutral-400">
                  تظهر هذه الخطوات في الشريط السفلي الأفقي مع مؤشر التحديد وخط القياس.
                </p>
              </div>

              <button
                type="button"
                onClick={addStep}
                className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة محور جديد</span>
              </button>
            </div>

            <div className="space-y-4">
              {form.steps.map((step, idx) => (
                <div
                  key={step.id || idx}
                  className="p-4 sm:p-5 rounded-xl border border-neutral-800 bg-neutral-950/70 space-y-4 hover:border-neutral-700 transition-colors"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-mono font-bold text-xs">
                        {step.num}
                      </div>
                      <span className="text-xs font-semibold text-white">
                        {step.title.ar || `الخطوة ${step.num}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveStep(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="تحريك لأعلى"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveStep(idx, 'down')}
                        disabled={idx === form.steps.length - 1}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="تحريك لأسفل"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      {form.steps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeStep(idx)}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors ml-1"
                          title="حذف هذا المحور"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Number */}
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                        الرقم (الكود)
                      </label>
                      <input
                        type="text"
                        value={step.num}
                        onChange={(e) => updateStep(idx, { num: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400 font-mono text-center text-xs font-bold focus:border-amber-500 focus:outline-none"
                        placeholder="01"
                      />
                    </div>

                    {/* Title Ar */}
                    <div className="md:col-span-5">
                      <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                        عنوان المحور (عربي)
                      </label>
                      <input
                        type="text"
                        value={step.title.ar}
                        onChange={(e) =>
                          updateStep(idx, {
                            title: { ...step.title, ar: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs font-medium focus:border-amber-500 focus:outline-none"
                        placeholder="مثال: الوضوح قبل البناء"
                        dir="rtl"
                      />
                    </div>

                    {/* Title En */}
                    <div className="md:col-span-5">
                      <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                        عنوان المحور (English)
                      </label>
                      <input
                        type="text"
                        value={step.title.en}
                        onChange={(e) =>
                          updateStep(idx, {
                            title: { ...step.title, en: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs font-medium focus:border-amber-500 focus:outline-none"
                        placeholder="e.g. Clarity Before Construction"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                        الوصف الهندسي والمواصفات (عربي)
                      </label>
                      <textarea
                        rows={2}
                        value={step.description.ar}
                        onChange={(e) =>
                          updateStep(idx, {
                            description: { ...step.description, ar: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs leading-relaxed focus:border-amber-500 focus:outline-none"
                        placeholder="شرح تفصيلي للمحور..."
                        dir="rtl"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                        الوصف الهندسي والمواصفات (English)
                      </label>
                      <textarea
                        rows={2}
                        value={step.description.en}
                        onChange={(e) =>
                          updateStep(idx, {
                            description: { ...step.description, en: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs leading-relaxed focus:border-amber-500 focus:outline-none"
                        placeholder="Detailed English description..."
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Action Bar */}
          <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>عند الضغط على حفظ، يتم تحديث القسم فوراً على الموقع المباشر.</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-neutral-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>حفظ تعديلات قسم منهجنا الآن</span>
            </button>
          </div>
        </form>
      </div>

      {/* Live In-Admin Visual Preview Matching the Reference Look Exactly */}
      <div className="p-6 sm:p-8 rounded-2xl border border-neutral-800 bg-neutral-900/40 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              المعاينة الفورية المباشرة (Live Preview)
            </h3>
          </div>
          <span className="text-[11px] text-neutral-400">
            كما يراها الزائر على الموقع
          </span>
        </div>

        {/* Embedded simulation of Methodology Section with exact original sand/beige palette */}
        <div className="rounded-xl overflow-hidden border border-[#ded5c7] bg-[#f4efe8] text-[#1e2b34] p-6 sm:p-10 shadow-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-10">
            <div className="lg:col-span-7">
              <div className="text-[11px] font-mono text-[#b88a58] tracking-widest uppercase mb-2">
                {form.kicker.ar || '01 — منهجنا'}
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1e2b34] leading-[1.2] whitespace-pre-line">
                {form.heading.ar || 'الأساس الجيد لا يطلب الانتباه.'}
              </h4>
            </div>

            <div className="lg:col-span-5 lg:pt-4">
              <p className="text-xs sm:text-sm text-[#556570] leading-relaxed font-light whitespace-pre-line">
                {form.description.ar || 'نهتم بالتفاصيل التي تصنع فرقاً حقيقياً...'}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-[#ded5c7]">
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(form.steps.length, 4)} gap-4`}>
              {form.steps.map((step, idx) => {
                const isSelected = activePreviewStep === idx;
                return (
                  <div
                    key={step.id || idx}
                    onClick={() => setActivePreviewStep(idx)}
                    className="cursor-pointer group text-start"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className={`text-xl font-mono font-light transition-colors ${
                        isSelected ? 'text-[#b88a58] font-bold' : 'text-[#8898a3] group-hover:text-[#1e2b34]'
                      }`}>
                        {step.num}
                      </span>
                      <span className="text-xs font-semibold text-[#1e2b34]">
                        {step.title.ar}
                      </span>
                    </div>
                    <div className={`h-[1.5px] w-full transition-all duration-300 ${
                      isSelected ? 'bg-[#b88a58]' : 'bg-[#ded5c7] group-hover:bg-[#b88a58]/50'
                    }`} />
                    <p className="text-[11px] text-[#556570] leading-relaxed mt-2 font-light">
                      {step.description.ar}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
