import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';

export const MethodologySection: React.FC = () => {
  const { content, language } = useContent();
  const [activeStep, setActiveStep] = useState(0);

  const isVisible = content.settings?.sectionsConfig?.find((s) => s.id === 'sec-method')?.isVisible ?? true;
  if (!isVisible) return null;

  const methodology = content.methodology || {
    kicker: { ar: '01 — منهجنا', en: '01 — Our Philosophy' },
    heading: { ar: 'الأساس الجيد لا\nيطلب الانتباه.', en: 'Good foundation\ncommands quiet confidence.' },
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

  const steps = methodology.steps || [];

  return (
    <section id="methodology" className="bg-[#f4efe8] text-[#1e2b34] py-24 sm:py-32 border-b border-[#ded5c7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Right Column (RTL): Headline & Kicker */}
          <div className="lg:col-span-7">
            <div className="text-xs font-mono text-[#b88a58] tracking-widest uppercase mb-4">
              {language === 'ar' ? methodology.kicker.ar : methodology.kicker.en}
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1e2b34] leading-[1.18] whitespace-pre-line">
              {language === 'ar' ? methodology.heading.ar : methodology.heading.en}
            </h2>
          </div>

          {/* Left Column: Subtext */}
          <div className="lg:col-span-5 lg:pt-8">
            <p className="text-base sm:text-lg text-[#556570] leading-relaxed font-light whitespace-pre-line">
              {language === 'ar' ? methodology.description.ar : methodology.description.en}
            </p>
          </div>
        </div>

        {/* Minimalist Steps Divider & Switcher */}
        {steps.length > 0 && (
          <div className="pt-8 border-t border-[#ded5c7]">
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(steps.length, 4)} gap-6`}>
              {steps.map((step, idx) => {
                const isSelected = activeStep === idx;
                return (
                  <button
                    key={step.id || step.num}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className="text-start group cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-2xl font-light font-mono transition-colors ${
                        isSelected ? 'text-[#b88a58] font-bold' : 'text-[#8898a3] group-hover:text-[#1e2b34]'
                      }`}>
                        {step.num}
                      </span>
                      <span className="text-xs font-medium text-[#1e2b34]">
                        {language === 'ar' ? step.title.ar : step.title.en}
                      </span>
                    </div>
                    <div className={`h-[1.5px] w-full transition-all duration-300 ${
                      isSelected ? 'bg-[#b88a58]' : 'bg-[#ded5c7] group-hover:bg-[#b88a58]/50'
                    }`} />
                    <p className="text-xs text-[#556570] leading-relaxed mt-3 font-light">
                      {language === 'ar' ? step.description.ar : step.description.en}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
