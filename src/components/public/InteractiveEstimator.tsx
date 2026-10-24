import React, { useState, useMemo } from 'react';
import { Calculator, CheckCircle2, Clock, Zap, ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export const InteractiveEstimator: React.FC = () => {
  const { content, language } = useContent();

  const [area, setArea] = useState<number>(650);
  const [selectedPkgId, setSelectedPkgId] = useState<string>('pkg-excellent');

  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  // Rates per sqm based on packages
  const packagesRate = useMemo(() => {
    return [
      {
        id: 'pkg-good',
        nameAr: 'الباقة الجيدة',
        nameEn: 'Good Package',
        ratePerM2: 1350,
        timelineMonths: 10,
        energySavings: '30%',
        warrantyYears: 10,
        badge: 'اقتصادية معتمدة'
      },
      {
        id: 'pkg-excellent',
        nameAr: 'الباقة الممتازة',
        nameEn: 'Premium Package',
        ratePerM2: 1850,
        timelineMonths: 13,
        energySavings: '45%',
        warrantyYears: 10,
        badge: 'الأكثر طلباً للفلل'
      },
      {
        id: 'pkg-luxury',
        nameAr: 'الباقة الفاخرة',
        nameEn: 'Luxury Package',
        ratePerM2: 2600,
        timelineMonths: 16,
        energySavings: '55%',
        warrantyYears: 10,
        badge: 'قصور وفلل استثنائية'
      }
    ];
  }, []);

  const currentPkg = packagesRate.find((p) => p.id === selectedPkgId) || packagesRate[1];

  const estimatedTotal = useMemo(() => {
    return area * currentPkg.ratePerM2;
  }, [area, currentPkg]);

  const formattedTotal = new Intl.NumberFormat('ar-SA').format(estimatedTotal);
  const formattedRate = new Intl.NumberFormat('ar-SA').format(currentPkg.ratePerM2);

  const handleWhatsAppDispatch = () => {
    const waNumber = content.contact.whatsapp.replace(/\D/g, '');
    const pkgName = language === 'ar' ? currentPkg.nameAr : currentPkg.nameEn;
    const msg = language === 'ar'
      ? `مرحباً شركة مسمار للمقاولات 🏗️\nقمت بحساب تقديري عبر حاسبة الموقع التفاعلية:\n- المساحة الإنشائية: ${area} م²\n- الباقة المختارة: ${pkgName}\n- التكلفة التقديرية: ~${formattedTotal} ريال\nأود مناقشة المخطط وجداول الكميات مع المهندس المختص.`
      : `Hello Mismar Contracting,\nI used the interactive build estimator:\n- Area: ${area} sqm\n- Selected Package: ${pkgName}\n- Estimated Cost: ~${formattedTotal} SAR\nI would like to schedule a BOQ and blueprint consultation.`;

    window.location.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="estimator" className="py-24 lg:py-32 bg-[#18232b] text-white border-b border-[#2d3e4b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#b88a58] tracking-widest uppercase">
              <Calculator className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'حاسبة التكلفة التقديرية الذكية' : 'Interactive Cost Estimator'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              {language === 'ar'
                ? 'خطط لميزانية بناء مشروعك بدقة وشفافية هندسية'
                : 'Simulate your build investment with precision and total clarity'}
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              {language === 'ar'
                ? 'حدد المساحة التقديرية لفلتك أو مشروعك بالامتار المربعة، واطلع فوراً على التكلفة التقريبية وجدول الإنجاز الزمني المتوقع وفق مواصفات الكود السعودي.'
                : 'Drag the area slider to preview realistic investment projections, engineering timelines, and energy compliance.'}
            </p>

            <div className="space-y-3 pt-2 text-xs text-neutral-300 font-light">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#b88a58] shrink-0" />
                <span>{language === 'ar' ? 'تسعير دقيق وفق بنود الكود السعودي ومواد نخب أول' : 'Computed from certified SBC materials and labor indices'}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#b88a58] shrink-0" />
                <span>{language === 'ar' ? 'دفعات مالية مرحلية مرتبطة بنسب الإنجاز الفعلي' : 'Milestone-based stage payments tied to certified audits'}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#b88a58] shrink-0" />
                <span>{language === 'ar' ? 'دراسة مجانية للمخطط الإنشائي وجداول الكميات' : 'Complimentary structural engineer review upon WhatsApp dispatch'}</span>
              </div>
            </div>
          </div>

          {/* Interactive Calculator Terminal */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 bg-[#213039] border border-[#2d3e4b] shadow-2xl space-y-8">
              {/* Package Selector */}
              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3">
                  {language === 'ar' ? '1. اختر باقة البناء المستهدفة:' : '1. Select Target Specification:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {packagesRate.map((pkg) => {
                    const isSelected = pkg.id === selectedPkgId;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPkgId(pkg.id)}
                        className={`p-4 border text-start transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'border-[#b88a58] bg-[#b88a58]/10 ring-1 ring-[#b88a58]'
                            : 'border-[#2d3e4b] bg-[#18232b] hover:border-neutral-500'
                        }`}
                      >
                        <span className="text-[10px] text-[#b88a58] font-mono block mb-1">
                          {pkg.badge}
                        </span>
                        <div className="text-sm font-bold text-white mb-1">
                          {language === 'ar' ? pkg.nameAr : pkg.nameEn}
                        </div>
                        <div className="text-xs font-mono text-neutral-400">
                          {pkg.ratePerM2} ريال / م²
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slider for Area */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    {language === 'ar' ? '2. حدد المساحة المبنية التقديرية (م²):' : '2. Estimated Built-up Area (sqm):'}
                  </label>
                  <span className="text-2xl font-bold text-white font-mono tabular-nums">
                    {area} <span className="text-xs font-normal text-[#b88a58]">م²</span>
                  </span>
                </div>

                <div className="relative py-2">
                  <input
                    type="range"
                    min="300"
                    max="1800"
                    step="25"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#18232b] appearance-none cursor-pointer accent-[#b88a58]"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-neutral-400 mt-2">
                    <span>300 م² (فيلا صغيرة)</span>
                    <span>750 م² (فيلا عائلية)</span>
                    <span>1,800 م² (قصر / مجمع)</span>
                  </div>
                </div>
              </div>

              {/* Calculation Result Display */}
              <div className="p-6 bg-[#18232b] border border-[#2d3e4b] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs text-neutral-400 font-light block mb-1">
                    {language === 'ar' ? 'التكلفة الإجمالية التقديرية' : 'Estimated Investment Projection'}
                  </span>
                  <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight tabular-nums font-mono">
                    {formattedTotal}{' '}
                    <span className="text-sm font-medium text-[#b88a58]">ريال سعودي</span>
                  </div>
                  <span className="text-[11px] text-neutral-400 mt-0.5 block font-light">
                    {language === 'ar' ? `بمعدل ~${formattedRate} ريال/م² شامل الإشراف والتنفيذ` : `~${formattedRate} SAR/sqm turnkey execution`}
                  </span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 shrink-0 text-xs font-mono">
                  <div className="p-3 bg-[#213039] border border-[#2d3e4b] text-center min-w-[90px]">
                    <Clock className="w-4 h-4 text-[#b88a58] mx-auto mb-1" />
                    <span className="text-neutral-400 text-[10px] block">مدة التشييد</span>
                    <span className="text-white font-bold">{currentPkg.timelineMonths} شهر</span>
                  </div>
                  <div className="p-3 bg-[#213039] border border-[#2d3e4b] text-center min-w-[90px]">
                    <Zap className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                    <span className="text-neutral-400 text-[10px] block">كفاءة الطاقة</span>
                    <span className="text-white font-bold">{currentPkg.energySavings}</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Call to Action */}
              <button
                type="button"
                onClick={handleWhatsAppDispatch}
                className="w-full py-4 px-6 bg-[#b88a58] hover:bg-[#a67949] text-[#18232b] font-medium text-xs tracking-wider flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer shadow-lg shadow-black/20"
              >
                <MessageCircle className="w-4 h-4 text-[#18232b]" />
                <span>
                  {language === 'ar'
                    ? 'إرسال هذه الحسبة لمهندس التسعير عبر واتساب'
                    : 'Dispatch This Estimate to Structural Director via WhatsApp'}
                </span>
                <ArrowIcon className="w-4 h-4 text-[#18232b]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
