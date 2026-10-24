import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { ProjectItem } from '../../../types';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Check,
  X,
  ArrowUp,
  ArrowDown,
  Layers,
  MapPin,
  Calendar,
  Maximize2
} from 'lucide-react';
import { MediaPickerModal } from '../../common/MediaPickerModal';
import { ConfirmModal } from '../../common/ConfirmModal';

export const ProjectsManagerTab: React.FC = () => {
  const { content, saveProject, deleteProject } = useContent();
  const projects = [...(content.projects || [])].sort((a, b) => a.order - b.order);

  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Media picker controls
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<'cover' | 'gallery'>('cover');

  const [formError, setFormError] = useState<string | null>(null);

  const emptyProject: ProjectItem = {
    id: 'proj-' + Date.now(),
    title: { ar: '', en: '' },
    description: { ar: '', en: '' },
    category: 'residential',
    categoryName: { ar: 'فلل سكنية فاخرة', en: 'Luxury Residential Villas' },
    location: { ar: 'بغداد - الجادرية', en: 'Baghdad - Al-Jadriya' },
    status: 'completed',
    statusName: { ar: 'تم التسليم بنجاح', en: 'Completed' },
    year: '2026',
    areaM2: 500,
    coverImage: '/src/assets/images/hero_mismar_architecture_1792791375406.jpg',
    galleryImages: [],
    isVisible: true,
    order: projects.length + 1,
    featured: false
  };

  const startCreate = () => {
    setFormError(null);
    setEditingProject({ ...emptyProject, id: 'proj-' + Date.now() });
    setIsEditing(true);
  };

  const startEdit = (proj: ProjectItem) => {
    setFormError(null);
    setEditingProject(JSON.parse(JSON.stringify(proj)));
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (!editingProject.title.ar.trim()) {
      setFormError('يرجى إدخال اسم المشروع بالعربية');
      return;
    }

    // Update category label
    if (editingProject.category === 'residential') {
      editingProject.categoryName = { ar: 'فلل وقصور سكنية', en: 'Residential Villas' };
    } else if (editingProject.category === 'commercial') {
      editingProject.categoryName = { ar: 'مباني وأبراج تجارية', en: 'Commercial Towers' };
    }

    // Update status label
    if (editingProject.status === 'completed') {
      editingProject.statusName = { ar: 'تم التسليم بنجاح', en: 'Completed' };
    } else if (editingProject.status === 'in_progress') {
      editingProject.statusName = { ar: 'قيد التنفيذ', en: 'In Progress' };
    } else {
      editingProject.statusName = { ar: 'مرحلة التصميم والتخطيط', en: 'Design Phase' };
    }

    await saveProject(editingProject);
    setIsEditing(false);
    setEditingProject(null);
  };

  const toggleVisibility = async (proj: ProjectItem) => {
    await saveProject({ ...proj, isVisible: !proj.isVisible });
  };

  const moveOrder = async (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= projects.length) return;

    const updated = [...projects];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;

    // Reassign orders
    for (let i = 0; i < updated.length; i++) {
      updated[i].order = i + 1;
      await saveProject(updated[i]);
    }
  };

  const confirmDelete = async () => {
    if (deletingId) {
      await deleteProject(deletingId);
      setDeletingId(null);
    }
  };

  const handleImagePicked = (url: string) => {
    if (!editingProject) return;
    if (pickerTarget === 'cover') {
      setEditingProject({ ...editingProject, coverImage: url });
    } else {
      const currentGallery = editingProject.galleryImages || [];
      if (!currentGallery.includes(url)) {
        setEditingProject({
          ...editingProject,
          galleryImages: [...currentGallery, url]
        });
      }
    }
  };

  const removeGalleryImage = (imgUrl: string) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      galleryImages: (editingProject.galleryImages || []).filter((u) => u !== imgUrl)
    });
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-neutral-800 bg-neutral-900/60">
        <div>
          <h2 className="text-lg font-bold text-white">إدارة المشاريع الإنشائية والمعمارية</h2>
          <p className="text-xs text-neutral-400">
            إضافة وتعديل وحذف مشاريع الشركة، رفع الصور والمواصفات، والتحكم بالظهور الفوري بالموقع.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={startCreate}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة مشروع جديد</span>
          </button>
        )}
      </div>

      {/* Edit / Create Form Modal-View */}
      {isEditing && editingProject && (
        <div className="p-6 sm:p-8 rounded-2xl border border-amber-500/30 bg-neutral-900/90 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <h3 className="text-base font-bold text-white">
              {editingProject.title.ar ? `تعديل: ${editingProject.title.ar}` : 'إنشاء مشروع جديد'}
            </h3>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditingProject(null);
              }}
              className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Title AR / EN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  اسم المشروع بالعربية *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.title.ar}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      title: { ...editingProject.title, ar: e.target.value }
                    })
                  }
                  placeholder="مثال: فيلا الجادرية المعمارية الفاخرة"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  اسم المشروع بالإنجليزية (English Title)
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={editingProject.title.en}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      title: { ...editingProject.title, en: e.target.value }
                    })
                  }
                  placeholder="e.g. Al-Jadriya Luxury Architectural Villa"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Description AR / EN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  وصف وتفاصيل المشروع بالعربية
                </label>
                <textarea
                  rows={3}
                  value={editingProject.description.ar}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      description: { ...editingProject.description, ar: e.target.value }
                    })
                  }
                  placeholder="اكتب نبذة عن المشروع ومواصفات التشطيب والإنشاء..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  الوصف بالإنجليزية (English Description)
                </label>
                <textarea
                  rows={3}
                  dir="ltr"
                  value={editingProject.description.en}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      description: { ...editingProject.description, en: e.target.value }
                    })
                  }
                  placeholder="Detailed architectural description in English..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Category, Status, Location, Area, Year */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  تصنيف المشروع
                </label>
                <select
                  value={editingProject.category}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, category: e.target.value })
                  }
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="residential">فلل وقصور سكنية</option>
                  <option value="commercial">مباني وأبراج تجارية</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  حالة المشروع
                </label>
                <select
                  value={editingProject.status}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      status: e.target.value as any
                    })
                  }
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="completed">منجز (تم التسليم بنجاح)</option>
                  <option value="in_progress">قيد التنفيذ</option>
                  <option value="design">مرحلة التصميم والتخطيط</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  الموقع (عربي)
                </label>
                <input
                  type="text"
                  value={editingProject.location.ar}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      location: { ...editingProject.location, ar: e.target.value }
                    })
                  }
                  placeholder="بغداد - حي الجادرية"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  المساحة المبنية (م²)
                </label>
                <input
                  type="number"
                  value={editingProject.areaM2 || ''}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, areaM2: e.target.value })
                  }
                  placeholder="850"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Images Manager */}
            <div className="space-y-4 pt-2 border-t border-neutral-800">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    إدارة صور المشروع
                  </h4>
                  <span className="text-[11px] text-neutral-400">
                    صورة الغلاف الأساسية والصور الإضافية لمعرض المشروع
                  </span>
                </div>
              </div>

              {/* Cover Image Picker */}
              <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950">
                <span className="text-xs font-semibold text-neutral-300 block mb-2">
                  صورة الغلاف الرئيسية للمشروع *
                </span>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-32 h-24 rounded-lg overflow-hidden border border-neutral-700 bg-neutral-900 shrink-0">
                    <img
                      src={editingProject.coverImage}
                      alt="الغلاف"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPickerTarget('cover');
                        setPickerOpen(true);
                      }}
                      className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
                      <span>تغيير صورة الغلاف من المكتبة أو رفع جديدة</span>
                    </button>
                    <p className="text-[11px] text-neutral-500">
                      هذه الصورة تظهر في بطاقة المشروع الرئيسية بالصفحة الأولى.
                    </p>
                  </div>
                </div>
              </div>

              {/* Gallery Images */}
              <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-neutral-300">
                    معرض الصور الإضافية للمشروع ({editingProject.galleryImages?.length || 0})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setPickerTarget('gallery');
                      setPickerOpen(true);
                    }}
                    className="px-3 py-1 bg-amber-600/20 text-amber-300 hover:bg-amber-600/30 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>إضافة صور للمعرض</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {editingProject.galleryImages?.map((url, idx) => (
                    <div key={idx} className="relative group rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900 aspect-4/3">
                      <img
                        src={url}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(url)}
                        className="absolute top-1 left-1 bg-red-600/80 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        title="حذف الصورة"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {(!editingProject.galleryImages || editingProject.galleryImages.length === 0) && (
                    <div className="col-span-full py-4 text-center text-neutral-500 text-xs">
                      لا توجد صور إضافية بعد. اضغط "إضافة صور للمعرض" لإضافة صور الزوايا والتفاصيل.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Visibility & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-800">
              <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingProject.isVisible}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, isVisible: e.target.checked })
                  }
                  className="rounded border-neutral-700 text-amber-500 focus:ring-amber-500"
                />
                <span>إظهار ونشر المشروع في الموقع العام</span>
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingProject(null);
                  }}
                  className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>حفظ المشروع في قاعدة البيانات</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Projects Table / Cards List */}
      <div className="space-y-3">
        {projects.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-neutral-800 rounded-2xl text-neutral-500">
            <Layers className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">لا توجد مشاريع مضافة حتى الآن.</p>
            <button
              onClick={startCreate}
              className="mt-4 px-4 py-2 bg-amber-500 text-neutral-950 font-bold text-xs rounded-xl inline-flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>أضف مشروعك الأول</span>
            </button>
          </div>
        ) : (
          projects.map((proj, idx) => (
            <div
              key={proj.id}
              className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                {/* Thumbnail */}
                <div className="w-16 h-14 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950 shrink-0">
                  <img
                    src={proj.coverImage}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                    <span>{proj.categoryName?.ar || proj.category}</span>
                    <span>·</span>
                    <span className="text-amber-500">{proj.statusName?.ar || proj.status}</span>
                    {proj.areaM2 && (
                      <>
                        <span>·</span>
                        <span>{proj.areaM2} م²</span>
                      </>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white truncate">{proj.title.ar}</h4>
                  <div className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-neutral-400" />
                    <span>{proj.location.ar}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                {/* Order Up/Down */}
                <button
                  onClick={() => moveOrder(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 text-neutral-400 hover:text-white disabled:opacity-30 rounded hover:bg-neutral-800"
                  title="تحريك للأعلى"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => moveOrder(idx, 'down')}
                  disabled={idx === projects.length - 1}
                  className="p-1.5 text-neutral-400 hover:text-white disabled:opacity-30 rounded hover:bg-neutral-800"
                  title="تحريك للأسفل"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                {/* Visibility Toggle */}
                <button
                  onClick={() => toggleVisibility(proj)}
                  className={`p-1.5 rounded transition-colors ${
                    proj.isVisible
                      ? 'text-emerald-400 hover:bg-emerald-500/10'
                      : 'text-neutral-500 hover:bg-neutral-800'
                  }`}
                  title={proj.isVisible ? 'المشروع ظاهر (اضغط للإخفاء)' : 'المشروع مخفي (اضغط للإظهار)'}
                >
                  {proj.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                {/* Edit */}
                <button
                  onClick={() => startEdit(proj)}
                  className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>تعديل</span>
                </button>

                {/* Delete */}
                <button
                  onClick={() => setDeletingId(proj.id)}
                  className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="حذف المشروع نهائياً"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Confirmation modal for delete */}
      <ConfirmModal
        isOpen={Boolean(deletingId)}
        title="تأكيد حذف المشروع نهائياً"
        message="هل أنت متأكد من رغبتك في حذف هذا المشروع؟ سيتم إزالته من الموقع فوراً ولا يمكن التراجع عن هذه الخطوة."
        confirmText="نعم، حذف نهائي"
        cancelText="إلغاء"
        onConfirm={confirmDelete}
        onCancel={() => setDeletingId(null)}
      />

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={handleImagePicked}
      />
    </div>
  );
};
