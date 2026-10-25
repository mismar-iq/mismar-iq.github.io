import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { ServiceItem } from '../../../types';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Check,
  X,
  ArrowUp,
  ArrowDown,
  Briefcase,
  Building2,
  KeyRound,
  Paintbrush,
  HardHat,
  Hammer,
  Palmtree,
  FileText,
  ChevronDown,
  ChevronUp,
  CheckCircle2
} from 'lucide-react';
import { ConfirmModal } from '../../common/ConfirmModal';

export const ServicesManagerTab: React.FC = () => {
  const { content, saveContent, saveService, deleteService } = useContent();
  const services = [...(content.services || [])].sort((a, b) => a.order - b.order);

  const [isEditing, setIsEditing] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Section Header State
  const defaultServicesHeader = {
    kicker: { ar: '02 — خدماتنا', en: '02 — Our Services' },
    heading: { ar: 'حلول متكاملة تغطي كافة مراحل البناء', en: 'End-to-End Contracting Across Every Milestone' },
    description: {
      ar: 'من الصبة الأولى حتى أرقى التشطيبات، نحرص على معايير دقيقة تجعل المبنى استثماراً يمتد لعقود.',
      en: 'From foundation to luxury architectural handover, engineered to endure for generations.'
    }
  };

  const [headerState, setHeaderState] = useState(() => ({
    kicker: {
      ar: content.servicesHeader?.kicker?.ar || defaultServicesHeader.kicker.ar,
      en: content.servicesHeader?.kicker?.en || defaultServicesHeader.kicker.en
    },
    heading: {
      ar: content.servicesHeader?.heading?.ar || defaultServicesHeader.heading.ar,
      en: content.servicesHeader?.heading?.en || defaultServicesHeader.heading.en
    },
    description: {
      ar: content.servicesHeader?.description?.ar || defaultServicesHeader.description.ar,
      en: content.servicesHeader?.description?.en || defaultServicesHeader.description.en
    }
  }));

  const [isHeaderSaving, setIsHeaderSaving] = useState(false);
  const [headerSaveSuccess, setHeaderSaveSuccess] = useState(false);
  const [isHeaderOpen, setIsHeaderOpen] = useState(true);

  // Sync when content updates
  React.useEffect(() => {
    if (content.servicesHeader) {
      setHeaderState({
        kicker: {
          ar: content.servicesHeader.kicker?.ar || defaultServicesHeader.kicker.ar,
          en: content.servicesHeader.kicker?.en || defaultServicesHeader.kicker.en
        },
        heading: {
          ar: content.servicesHeader.heading?.ar || defaultServicesHeader.heading.ar,
          en: content.servicesHeader.heading?.en || defaultServicesHeader.heading.en
        },
        description: {
          ar: content.servicesHeader.description?.ar || defaultServicesHeader.description.ar,
          en: content.servicesHeader.description?.en || defaultServicesHeader.description.en
        }
      });
    }
  }, [content.servicesHeader]);

  const handleSaveHeader = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsHeaderSaving(true);
    await saveContent({
      ...content,
      servicesHeader: headerState
    });
    setIsHeaderSaving(false);
    setHeaderSaveSuccess(true);
    setTimeout(() => setHeaderSaveSuccess(false), 3000);
  };

  const availableIcons = [
    { name: 'Building2', label: 'مبنى / مقاولات عامة' },
    { name: 'KeyRound', label: 'مفتاح / تسليم مفتاح' },
    { name: 'Paintbrush', label: 'فرشاة / تشطيبات وديكور' },
    { name: 'HardHat', label: 'خوذة / إشراف وإدارة هندسية' },
    { name: 'Hammer', label: 'مطرقة / ترميم وتطوير' },
    { name: 'Palmtree', label: 'نخلة / لاندسكيب ومسابح' }
  ];

  const emptyService: ServiceItem = {
    id: 'srv-' + Date.now(),
    title: { ar: '', en: '' },
    description: { ar: '', en: '' },
    iconName: 'Building2',
    isVisible: true,
    order: services.length + 1
  };

  const startCreate = () => {
    setEditingService({ ...emptyService, id: 'srv-' + Date.now() });
    setIsEditing(true);
  };

  const startEdit = (srv: ServiceItem) => {
    setEditingService(JSON.parse(JSON.stringify(srv)));
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    if (!editingService.title.ar.trim()) {
      alert('يرجى إدخال اسم الخدمة بالعربية');
      return;
    }

    await saveService(editingService);
    setIsEditing(false);
    setEditingService(null);
  };

  const toggleVisibility = async (srv: ServiceItem) => {
    await saveService({ ...srv, isVisible: !srv.isVisible });
  };

  const moveOrder = async (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= services.length) return;

    const updated = [...services];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;

    for (let i = 0; i < updated.length; i++) {
      updated[i].order = i + 1;
      await saveService(updated[i]);
    }
  };

  const confirmDelete = async () => {
    if (deletingId) {
      await deleteService(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-neutral-800 bg-neutral-900/60">
        <div>
          <h2 className="text-lg font-bold text-white">إدارة الخدمات الهندسية والإنشائية</h2>
          <p className="text-xs text-neutral-400">
            تعديل عنوان ومقدمة قسم الخدمات وإدارة كروت الخدمات وحالة النشر.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={startCreate}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة خدمة جديدة</span>
          </button>
        )}
      </div>

      {/* Section Header Editor (Title, Subtitle & Kicker) */}
      <div className="p-5 sm:p-6 rounded-2xl border border-neutral-800 bg-neutral-900/80 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>عنوان ومقدمة قسم الخدمات (المعروضة أعلى القسم)</span>
                {headerSaveSuccess && (
                  <span className="text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>تم الحفظ</span>
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-neutral-400">
                يمكنك هنا تغيير العنوان الرئيسي والوصف الظاهرين في واجهة الموقع.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsHeaderOpen(!isHeaderOpen)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            {isHeaderOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {isHeaderOpen && (
          <form onSubmit={handleSaveHeader} className="space-y-4 pt-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  شارة القسم (Kicker) بالعربية
                </label>
                <input
                  type="text"
                  value={headerState.kicker.ar}
                  onChange={(e) =>
                    setHeaderState({
                      ...headerState,
                      kicker: { ...headerState.kicker, ar: e.target.value }
                    })
                  }
                  placeholder="02 — خدماتنا"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  العنوان الرئيسي للقسم (Heading) *
                </label>
                <input
                  type="text"
                  required
                  value={headerState.heading.ar}
                  onChange={(e) =>
                    setHeaderState({
                      ...headerState,
                      heading: { ...headerState.heading, ar: e.target.value }
                    })
                  }
                  placeholder="حلول متكاملة تغطي كافة مراحل البناء"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                الوصف والمقدمة التوضيحية أسفل العنوان
              </label>
              <textarea
                rows={2}
                value={headerState.description.ar}
                onChange={(e) =>
                  setHeaderState({
                    ...headerState,
                    description: { ...headerState.description, ar: e.target.value }
                  })
                }
                placeholder="من الصبة الأولى حتى أرقى التشطيبات، نحرص على معايير دقيقة تجعل المبنى استثماراً يمتد لعقود."
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center justify-end pt-1">
              <button
                type="submit"
                disabled={isHeaderSaving}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{isHeaderSaving ? 'جاري الحفظ...' : 'حفظ عنوان ومقدمة القسم'}</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Editing Form */}
      {isEditing && editingService && (
        <div className="p-6 sm:p-8 rounded-2xl border border-amber-500/30 bg-neutral-900/90 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <h3 className="text-base font-bold text-white">
              {editingService.title.ar ? `تعديل: ${editingService.title.ar}` : 'إنشاء خدمة جديدة'}
            </h3>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditingService(null);
              }}
              className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  اسم الخدمة بالعربية *
                </label>
                <input
                  type="text"
                  required
                  value={editingService.title.ar}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      title: { ...editingService.title, ar: e.target.value }
                    })
                  }
                  placeholder="مثال: أعمال العظم والمباني الهيكلية"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  اسم الخدمة بالإنجليزية (Service Name EN)
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={editingService.title.en}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      title: { ...editingService.title, en: e.target.value }
                    })
                  }
                  placeholder="e.g. Structural Concrete Works"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  الوصف التفصيلي للخدمة (عربي)
                </label>
                <textarea
                  rows={3}
                  value={editingService.description.ar}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      description: { ...editingService.description, ar: e.target.value }
                    })
                  }
                  placeholder="اشرح نطاق العمل والمواصفات المشمولة..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  الوصف بالإنجليزية (Description EN)
                </label>
                <textarea
                  rows={3}
                  dir="ltr"
                  value={editingService.description.en}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      description: { ...editingService.description, en: e.target.value }
                    })
                  }
                  placeholder="Service description in English..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Icon Picker */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2">
                أيقونة الخدمة المعمارية
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableIcons.map((ic) => (
                  <button
                    key={ic.name}
                    type="button"
                    onClick={() =>
                      setEditingService({ ...editingService, iconName: ic.name })
                    }
                    className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-2.5 transition-all text-start ${
                      editingService.iconName === ic.name
                        ? 'border-amber-500 bg-amber-500/10 text-white ring-1 ring-amber-500'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className="text-amber-500">
                      {ic.name === 'Building2' && <Building2 className="w-4 h-4" />}
                      {ic.name === 'KeyRound' && <KeyRound className="w-4 h-4" />}
                      {ic.name === 'Paintbrush' && <Paintbrush className="w-4 h-4" />}
                      {ic.name === 'HardHat' && <HardHat className="w-4 h-4" />}
                      {ic.name === 'Hammer' && <Hammer className="w-4 h-4" />}
                      {ic.name === 'Palmtree' && <Palmtree className="w-4 h-4" />}
                    </span>
                    <span>{ic.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-800">
              <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingService.isVisible}
                  onChange={(e) =>
                    setEditingService({ ...editingService, isVisible: e.target.checked })
                  }
                  className="rounded border-neutral-700 text-amber-500 focus:ring-amber-500"
                />
                <span>نشر الخدمة وعرضها في الموقع</span>
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingService(null);
                  }}
                  className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>حفظ الخدمة في قاعدة البيانات</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Services List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((srv, idx) => (
          <div
            key={srv.id}
            className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900/70 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-amber-500">
                  <Building2 className="w-4 h-4" />
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveOrder(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1 text-neutral-400 hover:text-white disabled:opacity-30 rounded hover:bg-neutral-800"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveOrder(idx, 'down')}
                    disabled={idx === services.length - 1}
                    className="p-1 text-neutral-400 hover:text-white disabled:opacity-30 rounded hover:bg-neutral-800"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h4 className="text-sm font-bold text-white mb-1.5">{srv.title.ar}</h4>
              <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                {srv.description.ar}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between gap-2">
              <button
                onClick={() => toggleVisibility(srv)}
                className={`p-1.5 rounded transition-colors ${
                  srv.isVisible ? 'text-emerald-400' : 'text-neutral-500'
                }`}
                title="إظهار / إخفاء"
              >
                {srv.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEdit(srv)}
                  className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <Edit2 className="w-3 h-3 text-amber-400" />
                  <span>تعديل</span>
                </button>
                <button
                  onClick={() => setDeletingId(srv.id)}
                  className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="حذف الخدمة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={Boolean(deletingId)}
        title="تأكيد حذف الخدمة"
        message="هل أنت متأكد من حذف هذه الخدمة الهندسية؟"
        confirmText="نعم، حذف"
        onConfirm={confirmDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
