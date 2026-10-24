import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { ShieldCheck, KeyRound, Lock, Mail, AlertCircle, Check } from 'lucide-react';

export const SecurityTab: React.FC = () => {
  const { auth, changePassword } = useContent();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newEmail, setNewEmail] = useState(auth.user?.email || 'admin@mismar.sa');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (auth.user?.email) {
      setNewEmail(auth.user.email);
    }
  }, [auth.user?.email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!currentPassword) {
      setMessage({ text: 'يرجى كتابة كلمة المرور الحالية لتأكيد التغيير', type: 'error' });
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setMessage({ text: 'كلمة المرور الجديدة وتأكيدها غير متطابقين', type: 'error' });
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setMessage({ text: 'كلمة المرور يجب أن تكون 6 خانات على الأقل', type: 'error' });
      return;
    }

    setIsLoading(true);
    try {
      const res = await changePassword(currentPassword, newPassword, newEmail);
      if (res.success) {
        setMessage({
          text: `تم حفظ البيانات الجديدة بنجاح! تم اعتماد البريد (${newEmail.trim()})${newPassword ? ' وكلمة المرور الجديدة' : ''}.`,
          type: 'success'
        });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage({ text: res.error || 'فشل التحديث، تأكد من كلمة المرور الحالية', type: 'error' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 sm:p-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-500" />
              <span>إعدادات الأمان وحساب المدير</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              تغيير كلمة المرور والبريد الإداري لحماية لوحة تحكم موقع مسمار للمقاولات.
            </p>
          </div>
        </div>

        {/* Current Active Account Indicator */}
        <div className="p-3.5 bg-neutral-950 border border-neutral-800/80 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-neutral-400 flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-500" />
            <span>البريد المعتمد حالياً للدخول:</span>
          </span>
          <span className="text-amber-400 font-mono font-bold bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
            {auth.user?.email || 'admin@mismar.sa'}
          </span>
        </div>

        {message && (
          <div
            className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
              message.type === 'success'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-red-500/10 text-red-400 border border-red-500/30'
            }`}
          >
            {message.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-neutral-400" />
              <span>البريد الإلكتروني الإداري (اسم الدخول)</span>
            </label>
            <input
              type="email"
              required
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-neutral-400" />
              <span>كلمة المرور الحالية *</span>
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-amber-500" />
              <span>كلمة المرور الجديدة</span>
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="اتركها فارغة إذا كنت تريد تغيير البريد فقط"
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>

          {newPassword && (
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                تأكيد كلمة المرور الجديدة *
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{isLoading ? 'جاري الحفظ...' : 'تحديث بيانات الحساب'}</span>
            </button>
          </div>
        </form>

        {/* Security Info & Recovery Notice */}
        <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950 space-y-2 text-xs text-neutral-400">
          <div className="font-bold text-white">رمز استعادة الحساب (Recovery Code):</div>
          <div className="font-mono bg-neutral-900 p-2.5 rounded border border-neutral-800 text-amber-400 select-all">
            MISMAR-RECOVER-2026
          </div>
          <p className="text-[11px] text-neutral-500">
            احفظ هذا الرمز في مكان آمن لاستعادة صلاحيات الإدارة في حال فقدان كلمة المرور.
          </p>
        </div>
      </div>
    </div>
  );
};
