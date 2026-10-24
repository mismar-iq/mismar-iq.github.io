import React, { useState } from 'react';
import { X, Lock, Mail, ShieldAlert, KeyRound, Check } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { login } = useContent();
  const [username, setUsername] = useState('admin@mismar.sa');
  const [password, setPassword] = useState('mismar2026');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await login(username, password);
      if (result.success) {
        onSuccess();
        onClose();
      } else {
        setError(result.error || 'بيانات الدخول غير صحيحة');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await login('admin@mismar.sa', 'mismar2026');
      if (result.success) {
        onSuccess();
        onClose();
      } else {
        setError(result.error || 'فشل تسجيل الدخول التلقائي');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fillQuickDemo = () => {
    setUsername('admin@mismar.sa');
    setPassword('mismar2026');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-neutral-100">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">تسجيل الدخول للوحة التحكم</h3>
              <p className="text-[11px] text-neutral-400">إدارة محتوى شركة مسمار للمقاولات</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              اسم المستخدم أو البريد الإداري
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute right-3 top-3" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@mismar.sa"
                className="w-full bg-neutral-950 border border-neutral-700 focus:border-amber-500 rounded-xl pr-9 pl-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute right-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-neutral-950 border border-neutral-700 focus:border-amber-500 rounded-xl pr-9 pl-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            <span>{isLoading ? 'جاري التحقق...' : 'دخول لوحة التحكم'}</span>
          </button>
        </form>

        {/* Demo Quick Fill helper */}
        <div className="mt-6 pt-4 border-t border-neutral-800 space-y-2.5 text-center">
          <p className="text-[11px] text-neutral-400">
            للتجربة السريعة والتحقق من ربط لوحة التحكم بالموقع:
          </p>
          <button
            type="button"
            onClick={quickLogin}
            disabled={isLoading}
            className="w-full py-2.5 bg-[#213039] hover:bg-[#2d3e4b] text-[#b88a58] border border-[#b88a58]/40 hover:border-[#b88a58] text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
          >
            <Check className="w-4 h-4 text-[#b88a58]" />
            <span>⚡ دخول تجريبي فوري بضغطة زر واحدة</span>
          </button>
          <p className="text-[10px] text-neutral-500 font-mono">
            الحساب: admin@mismar.sa | كلمة المرور: mismar2026
          </p>
        </div>
      </div>
    </div>
  );
};
