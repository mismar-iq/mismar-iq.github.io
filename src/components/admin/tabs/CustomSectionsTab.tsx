import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { CustomSection } from '../../../types';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Eye,
  EyeOff,
  Layers,
  LayoutTemplate
} from 'lucide-react';
import { ConfirmModal } from '../../common/ConfirmModal';

export const CustomSectionsTab: React.FC = () => {
  const { content, saveCustomSection, deleteCustomSection } = useContent();
  const sections = [...(content.customSections || [])].sort((a, b) => a.order - b.order);

  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState<CustomSection | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const emptySection: CustomSection = {
    id: 'cust-' + Date.now(),
    type: 'feature_cards',
    title: { ar: 'عنوان القسم الجديد', en: 'New Section Title' },
    subtitle: { ar: 'وصف فرعي توضيحي لهذا القسم', en: 'Subtitle description' },
    cards: [
      {
        id: 'c-1',
        title: { ar: 'ميزة إضافية أولى', en: 'First Feature' },
        description: { ar: 'شرح وتفاصيل هذه الميزة...', en: 'Details for feature...' }
      },
      {
        id: 'c-2',
        title: { ar: 'ميزة إضافية ثانية', en: 'Second Feature' },
        description: { ar: 'شرح وتفاصيل هذه الميزة...', en: 'Details for feature...' }
      }
    ],
    isVisible: true,
    order: sections.length + 1
  };

  const startCreate = () => {
    setEditingSection({ ...emptySection, id: 'cust-' + Date.now() });
    setIsEditing(true);
  };

  const startEdit = (sec: CustomSection) => {
    setEditingSection(JSON.parse(JSON.stringify(sec)));
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection) return;
    await saveCustomSection(editingSection);
    setIsEditing(false);
    setEditingSection(null);
  };

  const toggleVisibility = async (sec: CustomSection) => {
    await saveCustomSection({ ...sec, isVisible: !sec.isVisible });
  };

  const confirmDelete = async () => {
    if (deletingId) {
      await deleteCustomSection(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-neutral-800 bg-neutral-900/60">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-amber-500" />
            <span>إضافة وتخصيص أقسام جديدة بالموقع</span>
          </h2>
          <p className="text-xs text-neutral-400">
            يمكنك إنشاء أقسام مخصصة باستخدام قوالب مرئية جاهزة مثل بطاقات المميزات، بنرات الـ CTA، أو النصوص المعمارية.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={startCreate}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة قسم جديد</span>
          </button>
        )}
      </div>

      {/* Editing Form */}
      {isEditing && editingSection && (
        <div className="p-6 sm:p-8 rounded-2xl border border-amber-500/30 bg-neutral-900/90 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <h3 className="text-base font-bold text-white">
              {editingSection.title.ar ? `تعديل: ${editingSection.title.ar}` : 'إنشاء قسم جديد'}
            </h3>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditingSection(null);
              }}
              className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  نوع قالب القسم
                </label>
                <select
                  value={editingSection.type}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, type: e.target.value as any })
                  }
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
                >
                  <option value="feature_cards">بطاقات مميزات أو خدمات (Feature Cards)</option>
                  <option value="text">قسم نصي مقالي (Text Block)</option>
                  <option value="cta_banner">بنر دعوة لاتخاذ إجراء (CTA Banner)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  عنوان القسم بالعربية *
                </label>
                <input
                  type="text"
                  required
                  value={editingSection.title.ar}
                  onChange={(e) =>
                    setEditingSection({
                      ...editingSection,
                      title: { ...editingSection.title, ar: e.target.value }
                    })
                  }
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  العنوان بالإنجليزية (EN Title)
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={editingSection.title.en}
                  onChange={(e) =>
                    setEditingSection({
                      ...editingSection,
                      title: { ...editingSection.title, en: e.target.value }
                    })
                  }
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  الوصف التوضيحي للقسم (عربي)
                </label>
                <input
                  type="text"
                  value={editingSection.subtitle.ar}
                  onChange={(e) =>
                    setEditingSection({
                      ...editingSection,
                      subtitle: { ...editingSection.subtitle, ar: e.target.value }
                    })
                  }
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  الوصف بالإنجليزية (EN Subtitle)
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={editingSection.subtitle.en}
                  onChange={(e) =>
                    setEditingSection({
                      ...editingSection,
                      subtitle: { ...editingSection.subtitle, en: e.target.value }
                    })
                  }
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            {/* If Type is Text */}
            {editingSection.type === 'text' && (
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  محتوى النص (عربي)
                </label>
                <textarea
                  rows={4}
                  value={editingSection.content?.ar || ''}
                  onChange={(e) =>
                    setEditingSection({
                      ...editingSection,
                      content: {
                        ar: e.target.value,
                        en: editingSection.content?.en || ''
                      }
                    })
                  }
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-xs text-white"
                />
              </div>
            )}

            {/* If Type is CTA Banner */}
            {editingSection.type === 'cta_banner' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    نص الزر (عربي)
                  </label>
                  <input
                    type="text"
                    value={editingSection.ctaText?.ar || 'طلب استشارة'}
                    onChange={(e) =>
                      setEditingSection({
                        ...editingSection,
                        ctaText: {
                          ar: e.target.value,
                          en: editingSection.ctaText?.en || ''
                        }
                      })
                    }
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    رابط الزر
                  </label>
                  <input
                    type="text"
                    value={editingSection.ctaLink || '#quote'}
                    onChange={(e) =>
                      setEditingSection({ ...editingSection, ctaLink: e.target.value })
                    }
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-800">
              <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingSection.isVisible}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, isVisible: e.target.checked })
                  }
                  className="rounded border-neutral-700 text-amber-500 focus:ring-amber-500"
                />
                <span>إظهار القسم في الموقع</span>
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingSection(null);
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
                  <span>حفظ القسم في الموقع</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Sections List */}
      <div className="space-y-3">
        {sections.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-neutral-800 rounded-2xl text-neutral-500">
            <LayoutTemplate className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="text-xs">لا توجد أقسام مخصصة إضافية حالياً.</p>
          </div>
        ) : (
          sections.map((sec) => (
            <div
              key={sec.id}
              className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900/70 transition-colors flex items-center justify-between gap-4"
            >
              <div>
                <span className="text-[11px] text-amber-400 font-mono block">
                  نوع القالب: {sec.type}
                </span>
                <h4 className="text-sm font-bold text-white">{sec.title.ar}</h4>
                <p className="text-xs text-neutral-400">{sec.subtitle.ar}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleVisibility(sec)}
                  className={`p-1.5 rounded transition-colors ${
                    sec.isVisible ? 'text-emerald-400' : 'text-neutral-500'
                  }`}
                  title="إظهار / إخفاء"
                >
                  {sec.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => startEdit(sec)}
                  className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3 text-amber-400" />
                  <span>تعديل</span>
                </button>
                <button
                  onClick={() => setDeletingId(sec.id)}
                  className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <ConfirmModal
        isOpen={Boolean(deletingId)}
        title="تأكيد حذف القسم"
        message="هل أنت متأكد من حذف هذا القسم من الموقع نهائياً؟"
        confirmText="نعم، حذف"
        onConfirm={confirmDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
