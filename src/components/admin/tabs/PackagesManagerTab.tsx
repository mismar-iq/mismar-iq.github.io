import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { ConstructionPackage } from '../../../types';
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
  Boxes,
  Image as ImageIcon,
  Star
} from 'lucide-react';
import { MediaPickerModal } from '../../common/MediaPickerModal';
import { ConfirmModal } from '../../common/ConfirmModal';

export const PackagesManagerTab: React.FC = () => {
  const { content, savePackage, deletePackage } = useContent();
  const packages = [...(content.packages || [])].sort((a, b) => a.order - b.order);

  const [isEditing, setIsEditing] = useState(false);
  const [editingPackage, setEditingPackage] = useState<ConstructionPackage | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  // New feature input temp state
  const [newFeatureAr, setNewFeatureAr] = useState('');
  const [newFeatureEn, setNewFeatureEn] = useState('');

  const [formError, setFormError] = useState<string | null>(null);

  const emptyPackage: ConstructionPackage = {
    id: 'pkg-' + Date.now(),
    name: { ar: '', en: '' },
    tagline: { ar: '', en: '' },
    description: { ar: '', en: '' },
    pricePerMeter: { ar: 'ابتداءً من 450,000 د.ع / م²', en: 'Starting from 450,000 IQD / m²' },
    image: '/src/assets/images/hero_mismar_architecture_1792791375406.jpg',
    features: [],
    accentColor: 'amber',
    isPopular: false,
    isVisible: true,
    order: packages.length + 1,
    inquiryMessage: 'مرحباً شركة مسمار، أود الاستفسار عن تفاصيل هذه الباقة في بغداد.'
  };

  const startCreate = () => {
    setFormError(null);
    setEditingPackage({ ...emptyPackage, id: 'pkg-' + Date.now() });
    setIsEditing(true);
  };

  const startEdit = (pkg: ConstructionPackage) => {
    setFormError(null);
    setEditingPackage(JSON.parse(JSON.stringify(pkg)));
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage) return;

    if (!editingPackage.name.ar.trim()) {
      setFormError('يرجى إدخال اسم الباقة بالعربية');
      return;
    }

    await savePackage(editingPackage);
    setIsEditing(false);
    setEditingPackage(null);
    setFormError(null);
  };

  const addFeature = () => {
    if (!editingPackage || !newFeatureAr.trim()) return;
    const newFeat = {
      id: 'f-' + Date.now(),
      ar: newFeatureAr.trim(),
      en: newFeatureEn.trim() || newFeatureAr.trim()
    };
    setEditingPackage({
      ...editingPackage,
      features: [...editingPackage.features, newFeat]
    });
    setNewFeatureAr('');
    setNewFeatureEn('');
  };

  const removeFeature = (featId: string) => {
    if (!editingPackage) return;
    setEditingPackage({
      ...editingPackage,
      features: editingPackage.features.filter((f) => f.id !== featId)
    });
  };

  const toggleVisibility = async (pkg: ConstructionPackage) => {
    await savePackage({ ...pkg, isVisible: !pkg.isVisible });
  };

  const moveOrder = async (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= packages.length) return;

    const updated = [...packages];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;

    for (let i = 0; i < updated.length; i++) {
      updated[i].order = i + 1;
      await savePackage(updated[i]);
    }
  };

  const confirmDelete = async () => {
    if (deletingId) {
      await deletePackage(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-neutral-800 bg-neutral-900/60">
        <div>
          <h2 className="text-lg font-bold text-white">إدارة باقات البناء والتشييد</h2>
          <p className="text-xs text-neutral-400">
            تعديل الباقة الجيدة، الممتازة، والفاخرة، وتحديد أسعار المتر المربع والمواصفات المشمولة.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={startCreate}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة باقة جديدة</span>
          </button>
        )}
      </div>

      {/* Editing Form */}
      {isEditing && editingPackage && (
        <div className="p-6 sm:p-8 rounded-2xl border border-amber-500/30 bg-neutral-900/90 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <h3 className="text-base font-bold text-white">
              {editingPackage.name.ar ? `تعديل: ${editingPackage.name.ar}` : 'إنشاء باقة بناء جديدة'}
            </h3>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditingPackage(null);
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
                  اسم الباقة بالعربية *
                </label>
                <input
                  type="text"
                  required
                  value={editingPackage.name.ar}
                  onChange={(e) =>
                    setEditingPackage({
                      ...editingPackage,
                      name: { ...editingPackage.name, ar: e.target.value }
                    })
                  }
                  placeholder="مثال: الباقة الممتازة"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  اسم الباقة بالإنجليزية (English Name)
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={editingPackage.name.en}
                  onChange={(e) =>
                    setEditingPackage({
                      ...editingPackage,
                      name: { ...editingPackage.name, en: e.target.value }
                    })
                  }
                  placeholder="e.g. Premium Package"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  شعار الباقة المختصر (عربي)
                </label>
                <input
                  type="text"
                  value={editingPackage.tagline.ar}
                  onChange={(e) =>
                    setEditingPackage({
                      ...editingPackage,
                      tagline: { ...editingPackage.tagline, ar: e.target.value }
                    })
                  }
                  placeholder="الباقة الأكثر طلباً للفلل السكنية العصرية"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  شعار الباقة بالإنجليزية (Tagline EN)
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={editingPackage.tagline.en}
                  onChange={(e) =>
                    setEditingPackage({
                      ...editingPackage,
                      tagline: { ...editingPackage.tagline, en: e.target.value }
                    })
                  }
                  placeholder="Most popular package for modern family villas"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  نص السعر التقديري (عربي - بالدينار العراقي)
                </label>
                <input
                  type="text"
                  value={editingPackage.pricePerMeter.ar}
                  onChange={(e) =>
                    setEditingPackage({
                      ...editingPackage,
                      pricePerMeter: { ...editingPackage.pricePerMeter, ar: e.target.value }
                    })
                  }
                  placeholder="ابتداءً من 450,000 د.ع / م²"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  نص السعر بالإنجليزية (Price IQD)
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={editingPackage.pricePerMeter.en}
                  onChange={(e) =>
                    setEditingPackage({
                      ...editingPackage,
                      pricePerMeter: { ...editingPackage.pricePerMeter, en: e.target.value }
                    })
                  }
                  placeholder="Starting from 450,000 IQD / m²"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                الوصف الشامل للباقة
              </label>
              <textarea
                rows={2}
                value={editingPackage.description.ar}
                onChange={(e) =>
                  setEditingPackage({
                    ...editingPackage,
                    description: { ...editingPackage.description, ar: e.target.value }
                  })
                }
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Features List Manager */}
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950 space-y-3">
              <span className="text-xs font-semibold text-neutral-200 block">
                قائمة المميزات والخدمات المشمولة في الباقة ({editingPackage.features.length})
              </span>

              <div className="space-y-2">
                {editingPackage.features.map((feat) => (
                  <div key={feat.id} className="flex items-center justify-between gap-3 p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs">
                    <div className="flex items-center gap-2 text-neutral-200">
                      <Check className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{feat.ar}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFeature(feat.id)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Feature input */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newFeatureAr}
                  onChange={(e) => setNewFeatureAr(e.target.value)}
                  placeholder="أدخل ميزة جديدة بالعربية..."
                  className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <input
                  type="text"
                  dir="ltr"
                  value={newFeatureEn}
                  onChange={(e) => setNewFeatureEn(e.target.value)}
                  placeholder="Feature in English (optional)"
                  className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium cursor-pointer shrink-0"
                >
                  + إضافة ميزة
                </button>
              </div>
            </div>

            {/* Inquiry WhatsApp message customization */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                نص رسالة واتساب التلقائية عند طلب الاستفسار عن هذه الباقة
              </label>
              <input
                type="text"
                value={editingPackage.inquiryMessage || ''}
                onChange={(e) =>
                  setEditingPackage({ ...editingPackage, inquiryMessage: e.target.value })
                }
                placeholder="مرحباً شركة مسمار، أود الاستفسار عن تفاصيل والتعاقد على الباقة..."
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Popular & Visibility flags */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-800">
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPackage.isPopular}
                    onChange={(e) =>
                      setEditingPackage({ ...editingPackage, isPopular: e.target.checked })
                    }
                    className="rounded border-neutral-700 text-amber-500 focus:ring-amber-500"
                  />
                  <span>تمييز كباقة مفضلة (الأكثر طلباً)</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPackage.isVisible}
                    onChange={(e) =>
                      setEditingPackage({ ...editingPackage, isVisible: e.target.checked })
                    }
                    className="rounded border-neutral-700 text-amber-500 focus:ring-amber-500"
                  />
                  <span>نشر وعرض الباقة بالموقع</span>
                </label>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingPackage(null);
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
                  <span>حفظ الباقة في قاعدة البيانات</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Packages List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, idx) => (
          <div
            key={pkg.id}
            className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
              pkg.isPopular
                ? 'border-amber-500/80 bg-neutral-900/90'
                : 'border-neutral-800 bg-neutral-900/50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-white">{pkg.name.ar}</h4>
                  {pkg.isPopular && (
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                  )}
                </div>
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
                    disabled={idx === packages.length - 1}
                    className="p-1 text-neutral-400 hover:text-white disabled:opacity-30 rounded hover:bg-neutral-800"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <span className="text-xs text-amber-400 block mb-2">{pkg.tagline.ar}</span>
              <span className="text-sm font-extrabold text-white block mb-4">
                {pkg.pricePerMeter.ar}
              </span>

              <div className="text-xs text-neutral-400 space-y-1 mb-4">
                <div>عدد المميزات المشمولة: {pkg.features.length}</div>
                <div>الحالة: {pkg.isVisible ? 'ظاهرة بالموقع' : 'مخفية'}</div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-2">
              <button
                onClick={() => toggleVisibility(pkg)}
                className={`p-1.5 rounded transition-colors ${
                  pkg.isVisible ? 'text-emerald-400' : 'text-neutral-500'
                }`}
                title="إظهار / إخفاء"
              >
                {pkg.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEdit(pkg)}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>تعديل</span>
                </button>
                <button
                  onClick={() => setDeletingId(pkg.id)}
                  className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="حذف الباقة"
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
        title="تأكيد حذف باقة البناء"
        message="هل أنت متأكد من حذف هذه الباقة؟ سيتم إزالتها فوراً من الموقع."
        confirmText="نعم، حذف"
        onConfirm={confirmDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
