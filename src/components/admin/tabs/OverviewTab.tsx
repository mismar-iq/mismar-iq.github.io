import React from 'react';
import { useContent } from '../../../context/ContentContext';
import {
  FolderKanban,
  Boxes,
  Briefcase,
  Image as ImageIcon,
  CheckCircle,
  Eye,
  Clock,
  Sparkles,
  PhoneCall,
  Compass
} from 'lucide-react';

interface OverviewTabProps {
  onSelectTab: (tabId: string) => void;
  onPreviewSite: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onSelectTab, onPreviewSite }) => {
  const { content, lastSavedAt } = useContent();

  const totalProjects = content.projects?.length || 0;
  const visibleProjects = content.projects?.filter((p) => p.isVisible).length || 0;
  const totalPackages = content.packages?.length || 0;
  const totalServices = content.services?.length || 0;
  const totalMedia = content.mediaLibrary?.length || 0;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-950/40 via-neutral-900 to-neutral-900 border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>نظام إدارة المحتوى المباشر · شركة مسمار للمقاولات</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            مرحباً بك في لوحة التحكم الإدارية
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
            يمكنك من هنا إضافة وتعديل وحذف المشاريع، الباقات، الخدمات، الصور، وتخصيص كافة نصوص وأقسام الموقع دون الحاجة لأي كود برمجي.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onPreviewSite}
            className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 border border-neutral-700 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-amber-400" />
            <span>معاينة الموقع كزائر</span>
          </button>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onSelectTab('projects')}
          className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:border-amber-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-medium">المشاريع الإنشائية</span>
            <FolderKanban className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tabular-nums">
            {totalProjects}
          </div>
          <div className="text-[11px] text-neutral-500 mt-1">
            {visibleProjects} مشاريع منشورة ومعروضة
          </div>
        </div>

        <div
          onClick={() => onSelectTab('packages')}
          className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:border-amber-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-medium">باقات البناء</span>
            <Boxes className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tabular-nums">
            {totalPackages}
          </div>
          <div className="text-[11px] text-neutral-500 mt-1">
            الجيدة، الممتازة، الفاخرة والباقات المخصصة
          </div>
        </div>

        <div
          onClick={() => onSelectTab('services')}
          className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:border-amber-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-medium">الخدمات الهندسية</span>
            <Briefcase className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tabular-nums">
            {totalServices}
          </div>
          <div className="text-[11px] text-neutral-500 mt-1">
            تشمل العظم، المفتاح، التشطيب والإشراف
          </div>
        </div>

        <div
          onClick={() => onSelectTab('media')}
          className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:border-amber-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-medium">الصور والوسائط</span>
            <ImageIcon className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tabular-nums">
            {totalMedia}
          </div>
          <div className="text-[11px] text-neutral-500 mt-1">
            جاهزة ومضغوطة تلقائياً للويب
          </div>
        </div>
      </div>

      {/* Quick Launch Cards */}
      <div>
        <h3 className="text-sm font-bold text-white mb-4">روابط سريعة لأكثر المهام تكراراً:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => onSelectTab('projects')}
            className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-800/80 text-start transition-all cursor-pointer"
          >
            <div className="font-bold text-sm text-white mb-1 flex items-center justify-between">
              <span>إضافة مشروع جديد</span>
              <span className="text-amber-500 text-xs">+</span>
            </div>
            <p className="text-xs text-neutral-400">
              رفع صور مشروع تم إنجازه أو قيد التنفيذ مع المواصفات والمساحة.
            </p>
          </button>

          <button
            onClick={() => onSelectTab('packages')}
            className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-800/80 text-start transition-all cursor-pointer"
          >
            <div className="font-bold text-sm text-white mb-1 flex items-center justify-between">
              <span>تعديل باقات البناء والأسعار</span>
              <span className="text-amber-500 text-xs">←</span>
            </div>
            <p className="text-xs text-neutral-400">
              تحديث سعر المتر المربع أو إضافة ميزة جديدة لباقة معينة.
            </p>
          </button>

          <button
            onClick={() => onSelectTab('methodology')}
            className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-800/80 text-start transition-all cursor-pointer group"
          >
            <div className="font-bold text-sm text-white mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-500" />
                <span>قسم «منهجنا» (الأساس الجيد)</span>
              </span>
              <span className="text-amber-500 text-xs">←</span>
            </div>
            <p className="text-xs text-neutral-400">
              تعديل الشعار الترويسي والخطوات الأربع الهندسية (الوضوح، التفاصيل، المعايير، والضمان).
            </p>
          </button>

          <button
            onClick={() => onSelectTab('contact')}
            className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-800/80 text-start transition-all cursor-pointer"
          >
            <div className="font-bold text-sm text-white mb-1 flex items-center justify-between">
              <span>تعديل رقم واتساب والتواصل</span>
              <PhoneCall className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-xs text-neutral-400">
              تحديث أرقام الهواتف أو حسابات التواصل الاجتماعي فورا.
            </p>
          </button>
        </div>
      </div>

      {/* System Status info */}
      <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span className="text-neutral-200">
            قاعدة البيانات نشطة ومزامنة على السيرفر المحلي والذاكرة السريعة
          </span>
        </div>
        {lastSavedAt && (
          <div className="flex items-center gap-1.5 text-neutral-500">
            <Clock className="w-3.5 h-3.5" />
            <span>آخر حفظ للتعديلات: {lastSavedAt}</span>
          </div>
        )}
      </div>
    </div>
  );
};
