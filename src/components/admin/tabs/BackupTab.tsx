import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { Download, Upload, RotateCcw, Check, AlertTriangle, FileText } from 'lucide-react';
import { ConfirmModal } from '../../common/ConfirmModal';

export const BackupTab: React.FC = () => {
  const { content, saveContent, resetToDefaults } = useContent();
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const downloadBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `mismar_contracting_backup_${new Date().toISOString().split('T')[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setStatusMessage('تم تحميل ملف النسخة الاحتياطية بنجاح!');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleRestoreFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && json.settings && json.projects) {
          await saveContent(json);
          setStatusMessage('تمت استعادة النسخة الاحتياطية بنجاح وتحديث الموقع!');
        } else {
          alert('الملف غير صالح أو لا يحتوي على بنية بيانات متوافقة');
        }
      } catch (err) {
        alert('حدث خطأ أثناء قراءة ملف النسخة الاحتياطية');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = async () => {
    await resetToDefaults();
    setResetConfirmOpen(false);
    setStatusMessage('تمت استعادة المحتوى الأصلي للشركة!');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 sm:p-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-xl space-y-6">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Download className="w-5 h-5 text-amber-500" />
            <span>النسخ الاحتياطي واستعادة المحتوى</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            تصدير كامل محتوى الموقع (المشاريع، الباقات، الخدمات، الإعدادات) كملف JSON مستقل أو استعادته بنقرة واحدة.
          </p>
        </div>

        {statusMessage && (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{statusMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Download Backup */}
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-950 flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                تصدير نسخة احتياطية كاملة
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                تحميل ملف JSON كامل يحتوي على جميع النصوص، المشاريع، الباقات، وروابط الصور للرجوع إليها في أي وقت.
              </p>
            </div>

            <button
              type="button"
              onClick={downloadBackup}
              className="w-full py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>تحميل ملف النسخة الاحتياطية (.json)</span>
            </button>
          </div>

          {/* Restore Backup */}
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-950 flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-3">
                <Upload className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                استعادة نسخة احتياطية من ملف
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                رفع ملف JSON لنسخة سابقة لاستبدال وتحديث كافة بيانات الموقع دفعة واحدة.
              </p>
            </div>

            <label className="w-full py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer">
              <Upload className="w-4 h-4 text-blue-400" />
              <span>اختر ملف النسخة الاحتياطية</span>
              <input
                type="file"
                accept=".json"
                onChange={handleRestoreFile}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Factory Reset */}
        <div className="p-5 rounded-xl border border-red-500/20 bg-red-500/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-red-400 flex items-center gap-1.5 mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span>إعادة ضبط المصنع واستعادة المحتوى الافتراضي</span>
            </h4>
            <p className="text-[11px] text-neutral-400">
              إعادة تهيئة الموقع إلى المحتوى الأصلي لشركة مسمار (مع الباقات والمشاريع الافتراضية).
            </p>
          </div>

          <button
            type="button"
            onClick={() => setResetConfirmOpen(true)}
            className="px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>استعادة المحتوى الافتراضي</span>
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={resetConfirmOpen}
        title="تأكيد استعادة المحتوى الافتراضي"
        message="هل أنت متأكد من رغبتك في إعادة ضبط محتوى الموقع؟ سيتم استبدال أي تعديلات غير محفوظة ببيانات الشركة الافتراضية."
        confirmText="نعم، استعادة المحتوى الأصلي"
        cancelText="إلغاء"
        isDestructive={true}
        onConfirm={handleReset}
        onCancel={() => setResetConfirmOpen(false)}
      />
    </div>
  );
};
