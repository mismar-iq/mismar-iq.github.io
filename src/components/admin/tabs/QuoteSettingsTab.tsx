import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { Check, MessageCircle, Info } from 'lucide-react';

export const QuoteSettingsTab: React.FC = () => {
  const { content, saveContact } = useContent();
  const [template, setTemplate] = useState(content.contact.quoteWhatsappTemplate || '');
  const [whatsapp, setWhatsapp] = useState(content.contact.whatsapp || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveContact({
      ...content.contact,
      whatsapp,
      quoteWhatsappTemplate: template
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const resetDefaultTemplate = () => {
    const defaultTemplate =
      'مرحباً شركة مسمار للمقاولات 🏗️\nأرغب في الحصول على عرض سعر لمشروع بناء وفق البيانات التالية:\n- الاسم: {name}\n- رقم الجوال: {phone}\n- نوع المشروع: {projectType}\n- المساحة التقديرية: {area} م²\n- الباقة المهتم بها: {package}\n- المدينة / الحي: {city}\n- ملاحظات إضافية: {notes}\nيرجى التواصل معي والتنسيق لمناقشة التفاصيل.';
    setTemplate(defaultTemplate);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 sm:p-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>إعدادات نموذج طلب عرض السعر ورسالة الواتساب</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              تخصيص الرقم الذي يستقبل الرسائل وصياغة القالب التلقائي الذي يصله عند إرسال العميل للنموذج.
            </p>
          </div>
          {saveSuccess && (
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              تم الحفظ بنجاح!
            </span>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              رقم الواتساب المستلم لطلبات التسعير (مفتاح الدولة بدون علامة +) *
            </label>
            <input
              type="text"
              required
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="966501234567"
              className="w-full sm:w-80 bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
            />
            <p className="text-[11px] text-neutral-500 mt-1">
              مثال للسعودية: 966501234567
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-neutral-300">
                قالب رسالة الواتساب التلقائية *
              </label>
              <button
                type="button"
                onClick={resetDefaultTemplate}
                className="text-amber-400 hover:text-amber-300 text-xs underline cursor-pointer"
              >
                استعادة القالب الافتراضي
              </button>
            </div>
            <textarea
              rows={8}
              required
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-3 text-xs text-white leading-relaxed font-mono focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Variables Reference Box */}
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/70 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
              <Info className="w-4 h-4" />
              <span>المتغيرات التي تستبدل تلقائياً بقيم العميل:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-neutral-300 font-mono">
              <div className="bg-neutral-900 p-2 rounded border border-neutral-800">
                <span className="text-amber-400">{'{name}'}</span>: اسم العميل
              </div>
              <div className="bg-neutral-900 p-2 rounded border border-neutral-800">
                <span className="text-amber-400">{'{phone}'}</span>: رقم الجوال
              </div>
              <div className="bg-neutral-900 p-2 rounded border border-neutral-800">
                <span className="text-amber-400">{'{projectType}'}</span>: نوع المشروع
              </div>
              <div className="bg-neutral-900 p-2 rounded border border-neutral-800">
                <span className="text-amber-400">{'{area}'}</span>: المساحة
              </div>
              <div className="bg-neutral-900 p-2 rounded border border-neutral-800">
                <span className="text-amber-400">{'{package}'}</span>: الباقة
              </div>
              <div className="bg-neutral-900 p-2 rounded border border-neutral-800">
                <span className="text-amber-400">{'{city}'}</span>: المدينة والحي
              </div>
              <div className="bg-neutral-900 p-2 rounded border border-neutral-800">
                <span className="text-amber-400">{'{notes}'}</span>: ملاحظات العميل
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-neutral-800">
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>حفظ إعدادات الواتساب والقالب</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
