import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import {
  Upload,
  Search,
  Trash2,
  Copy,
  Check,
  AlertTriangle,
  Image as ImageIcon,
  ExternalLink,
  Layers
} from 'lucide-react';
import { ConfirmModal } from '../../common/ConfirmModal';

export const MediaLibraryTab: React.FC = () => {
  const { content, uploadMedia, deleteMedia, isMediaUsed } = useContent();
  const mediaList = content.mediaLibrary || [];

  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [deletingItem, setDeletingItem] = useState<{ id: string; name: string; isUsed: boolean; places: string[] } | null>(null);

  const filtered = mediaList.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      await uploadMedia(file);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const promptDelete = (item: (typeof mediaList)[0]) => {
    const { isUsed, places } = isMediaUsed(item.url);
    setDeletingItem({
      id: item.id,
      name: item.name,
      isUsed,
      places
    });
  };

  const confirmDelete = async () => {
    if (deletingItem) {
      await deleteMedia(deletingItem.id);
      setDeletingItem(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-neutral-800 bg-neutral-900/60">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-amber-500" />
            <span>مكتبة الصور والوسائط المعمارية</span>
          </h2>
          <p className="text-xs text-neutral-400">
            رفع الصور من الهاتف أو الكمبيوتر مع ضغط تلقائي ذكي للويب وتحذير عند حذف الصور المستخدمة.
          </p>
        </div>

        <label className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto shrink-0">
          <Upload className="w-4 h-4" />
          <span>{isUploading ? 'جاري الرفع والضغط...' : 'رفع صورة جديدة'}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex items-center gap-3 p-3 rounded-xl border border-neutral-800 bg-neutral-900/40">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-500 absolute right-3 top-2.5" />
          <input
            type="text"
            placeholder="البحث في مكتبة الصور بالاسم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pr-9 pl-4 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
          />
        </div>
        <span className="text-xs text-neutral-400 shrink-0 tabular-nums">
          {filtered.length} من {mediaList.length} صورة
        </span>
      </div>

      {/* Media Grid */}
      {filtered.length === 0 ? (
        <div className="p-16 text-center border border-dashed border-neutral-800 rounded-2xl text-neutral-500">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">لا توجد صور مطابقة لبحثك.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((item) => {
            const { isUsed, places } = isMediaUsed(item.url);

            return (
              <div
                key={item.id}
                className="group rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden hover:border-neutral-700 transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-neutral-950">
                  <img
                    src={item.url}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Used Tag */}
                  {isUsed ? (
                    <div
                      className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-amber-500/90 text-neutral-950 text-[10px] font-bold shadow"
                      title={`مستخدمة في: ${places.join(', ')}`}
                    >
                      مستخدمة ({places.length})
                    </div>
                  ) : (
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-neutral-400 text-[10px]">
                      غير مستخدمة
                    </div>
                  )}

                  {/* Actions overlay */}
                  <div className="absolute inset-0 bg-neutral-950/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => copyUrl(item.url, item.id)}
                      className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                      title="نسخ مسار الصورة"
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => promptDelete(item)}
                      className="p-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition-colors"
                      title="حذف الصورة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-3">
                  <span className="text-xs font-medium text-white truncate block" title={item.name}>
                    {item.name}
                  </span>
                  <div className="flex items-center justify-between text-[10px] text-neutral-500 mt-1">
                    <span>{item.uploadedAt}</span>
                    {item.dimensions && <span>{item.dimensions}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal with Usage Warning */}
      {deletingItem && (
        <ConfirmModal
          isOpen={Boolean(deletingItem)}
          title={
            deletingItem.isUsed
              ? 'تحذير: هذه الصورة مستخدمة حالياً في الموقع!'
              : 'تأكيد حذف الصورة'
          }
          message={
            deletingItem.isUsed
              ? `الصورة (${deletingItem.name}) مستخدمة في الأقسام التالية:\n[ ${deletingItem.places.join(' - ')} ]\nإذا قمت بحذفها، فقد يظهر إطار الصورة فارغاً في تلك الأقسام. هل أنت متأكد من الحذف؟`
              : `هل أنت متأكد من حذف الصورة (${deletingItem.name}) من المكتبة نهائياً؟`
          }
          confirmText={deletingItem.isUsed ? 'نعم، حذف على أي حال' : 'نعم، حذف'}
          cancelText="تراجع"
          isDestructive={true}
          onConfirm={confirmDelete}
          onCancel={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
};
