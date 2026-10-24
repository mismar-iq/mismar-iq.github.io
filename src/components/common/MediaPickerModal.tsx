import React, { useState } from 'react';
import { X, Upload, Search, Check, Image as ImageIcon } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  selectedUrl?: string;
  title?: string;
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedUrl,
  title = 'اختر صورة من مكتبة الوسائط'
}) => {
  const { content, uploadMedia, isMediaUsed } = useContent();
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const mediaList = content.mediaLibrary || [];
  const filtered = mediaList.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const item = await uploadMedia(file);
      if (item) {
        onSelect(item.url);
        onClose();
      }
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl text-neutral-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-white text-base">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-neutral-800 bg-neutral-950/50 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-neutral-400 absolute right-3 top-3" />
            <input
              type="text"
              placeholder="البحث في الصور بالاسم..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg pr-9 pl-4 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <label className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-sm font-medium cursor-pointer transition-colors shrink-0">
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

        {/* Image Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-neutral-500">
              <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">لا توجد صور مطابقة. يمكنك رفع صورة جديدة مباشرة.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filtered.map((item) => {
                const isSelected = selectedUrl === item.url;
                const { isUsed } = isMediaUsed(item.url);

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelect(item.url);
                      onClose();
                    }}
                    className={`group relative rounded-lg border overflow-hidden cursor-pointer bg-neutral-950 transition-all ${
                      isSelected
                        ? 'border-amber-500 ring-2 ring-amber-500/50'
                        : 'border-neutral-800 hover:border-neutral-600'
                    }`}
                  >
                    <div className="aspect-4/3 overflow-hidden bg-neutral-900 relative">
                      <img
                        src={item.url}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {isSelected && (
                        <div className="absolute top-2 left-2 bg-amber-600 text-white p-1 rounded-full shadow">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                      {isUsed && (
                        <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-xs text-[10px] text-amber-300 px-1.5 py-0.5 rounded">
                          مستخدمة بالموقع
                        </div>
                      )}
                    </div>
                    <div className="p-2 text-xs truncate text-neutral-300 group-hover:text-white">
                      {item.name}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-neutral-800 bg-neutral-950/80 flex items-center justify-between text-xs text-neutral-400">
          <span>إجمالي الصور بالمكتبة: {mediaList.length}</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-md hover:bg-neutral-800 text-neutral-300"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
