import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { ContactInfo, SocialLink } from '../../../types';
import {
  Check,
  Plus,
  Trash2,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Share2,
  Eye,
  EyeOff
} from 'lucide-react';

export const ContactManagerTab: React.FC = () => {
  const { content, saveContact } = useContent();
  const [contactForm, setContactForm] = useState<ContactInfo>(
    JSON.parse(JSON.stringify(content.contact))
  );
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [newSocialLabel, setNewSocialLabel] = useState('');
  const [newSocialUrl, setNewSocialUrl] = useState('');
  const [newSocialPlatform, setNewSocialPlatform] = useState<SocialLink['platform']>('instagram');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveContact(contactForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const addSocial = () => {
    if (!newSocialLabel.trim() || !newSocialUrl.trim()) return;
    const newLink: SocialLink = {
      id: 'soc-' + Date.now(),
      platform: newSocialPlatform,
      label: newSocialLabel.trim(),
      url: newSocialUrl.trim(),
      isVisible: true
    };
    setContactForm({
      ...contactForm,
      socialLinks: [...(contactForm.socialLinks || []), newLink]
    });
    setNewSocialLabel('');
    setNewSocialUrl('');
  };

  const removeSocial = (id: string) => {
    setContactForm({
      ...contactForm,
      socialLinks: contactForm.socialLinks.filter((s) => s.id !== id)
    });
  };

  const toggleSocialVisibility = (id: string) => {
    setContactForm({
      ...contactForm,
      socialLinks: contactForm.socialLinks.map((s) =>
        s.id === id ? { ...s, isVisible: !s.isVisible } : s
      )
    });
  };

  return (
    <div className="space-y-8">
      <div className="p-6 sm:p-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-500" />
              <span>إدارة معلومات التواصل والشبكات الاجتماعية</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              أي تعديل تقوم به هنا ينعكس فوراً وتلقائياً على رأس الموقع، تذييله، وصفحة الاتصال.
            </p>
          </div>
          {saveSuccess && (
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              تم حفظ التعديلات بنجاح!
            </span>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Direct channels: Phone, WhatsApp, Email, CR */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>رقم الهاتف المباشر</span>
              </label>
              <input
                type="text"
                required
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                placeholder="+964 770 123 4567"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>رقم الواتساب (بدون +)</span>
              </label>
              <input
                type="text"
                required
                value={contactForm.whatsapp}
                onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                placeholder="9647701234567"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>البريد الإلكتروني الرسمي</span>
              </label>
              <input
                type="email"
                required
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                placeholder="info@mismar-iq.com"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                رقم السجل التجاري / الإجازة
              </label>
              <input
                type="text"
                value={contactForm.crNumber}
                onChange={(e) => setContactForm({ ...contactForm, crNumber: e.target.value })}
                placeholder="IQ-BG-2026-981"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          {/* Address AR / EN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>عنوان المقر بالعربية</span>
              </label>
              <textarea
                rows={2}
                value={contactForm.address.ar}
                onChange={(e) =>
                  setContactForm({
                    ...contactForm,
                    address: { ...contactForm.address, ar: e.target.value }
                  })
                }
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                العنوان بالإنجليزية (Address EN)
              </label>
              <textarea
                rows={2}
                dir="ltr"
                value={contactForm.address.en}
                onChange={(e) =>
                  setContactForm({
                    ...contactForm,
                    address: { ...contactForm.address, en: e.target.value }
                  })
                }
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          {/* Google Maps link & Working Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                رابط خرائط Google (Google Maps URL)
              </label>
              <input
                type="url"
                value={contactForm.googleMapsUrl}
                onChange={(e) =>
                  setContactForm({ ...contactForm, googleMapsUrl: e.target.value })
                }
                placeholder="https://maps.google.com/?q=..."
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>ساعات وأيام العمل (عربي)</span>
              </label>
              <input
                type="text"
                value={contactForm.workingHours.ar}
                onChange={(e) =>
                  setContactForm({
                    ...contactForm,
                    workingHours: { ...contactForm.workingHours, ar: e.target.value }
                  })
                }
                placeholder="السبت - الخميس: 8:00 ص - 6:00 م"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          {/* Social Links Manager */}
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                <Share2 className="w-3.5 h-3.5 text-amber-500" />
                <span>حسابات التواصل الاجتماعي ({contactForm.socialLinks?.length || 0})</span>
              </span>
            </div>

            <div className="space-y-2">
              {contactForm.socialLinks?.map((link) => (
                <div
                  key={link.id}
                  className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-bold text-white truncate">{link.label}</span>
                    <span className="text-neutral-500 truncate max-w-xs" dir="ltr">{link.url}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleSocialVisibility(link.id)}
                      className={`p-1 rounded ${link.isVisible ? 'text-emerald-400' : 'text-neutral-500'}`}
                      title={link.isVisible ? 'ظاهر' : 'مخفي'}
                    >
                      {link.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSocial(link.id)}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="حذف الرابط"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Social Link Form */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <select
                value={newSocialPlatform}
                onChange={(e) => setNewSocialPlatform(e.target.value as any)}
                className="bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              >
                <option value="instagram">إنستغرام (Instagram)</option>
                <option value="linkedin">لينكد إن (LinkedIn)</option>
                <option value="x">إكس / تويتر (X)</option>
                <option value="snapchat">سناب شات (Snapchat)</option>
                <option value="whatsapp">واتساب (WhatsApp)</option>
                <option value="facebook">فيسبوك (Facebook)</option>
                <option value="tiktok">تيك توك (TikTok)</option>
                <option value="youtube">يوتيوب (YouTube)</option>
                <option value="other">أخرى</option>
              </select>

              <input
                type="text"
                value={newSocialLabel}
                onChange={(e) => setNewSocialLabel(e.target.value)}
                placeholder="اسم الحساب (مثال: سناب شات التغطيات)"
                className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white"
              />

              <input
                type="url"
                dir="ltr"
                value={newSocialUrl}
                onChange={(e) => setNewSocialUrl(e.target.value)}
                placeholder="https://..."
                className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white"
              />

              <button
                type="button"
                onClick={addSocial}
                className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold cursor-pointer shrink-0"
              >
                + إضافة حساب
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-neutral-800">
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>حفظ معلومات التواصل والحسابات</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
