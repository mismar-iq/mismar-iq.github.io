import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import {
  LayoutDashboard,
  Home,
  FolderKanban,
  Boxes,
  Building,
  Briefcase,
  Image as ImageIcon,
  Phone,
  MessageCircle,
  LayoutTemplate,
  ShieldCheck,
  Download,
  LogOut,
  Eye,
  Menu,
  X,
  CheckCircle,
  Clock,
  Sparkles,
  Compass
} from 'lucide-react';

import { OverviewTab } from './tabs/OverviewTab';
import { HomeManagerTab } from './tabs/HomeManagerTab';
import { MethodologyManagerTab } from './tabs/MethodologyManagerTab';
import { ProjectsManagerTab } from './tabs/ProjectsManagerTab';
import { PackagesManagerTab } from './tabs/PackagesManagerTab';
import { AboutManagerTab } from './tabs/AboutManagerTab';
import { ServicesManagerTab } from './tabs/ServicesManagerTab';
import { MediaLibraryTab } from './tabs/MediaLibraryTab';
import { ContactManagerTab } from './tabs/ContactManagerTab';
import { QuoteSettingsTab } from './tabs/QuoteSettingsTab';
import { CustomSectionsTab } from './tabs/CustomSectionsTab';
import { SecurityTab } from './tabs/SecurityTab';
import { BackupTab } from './tabs/BackupTab';

interface AdminLayoutProps {
  onClose: () => void;
  initialTab?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onClose, initialTab }) => {
  const { content, auth, logout, saveMessage, lastSavedAt, isSaving } = useContent();
  const [activeTab, setActiveTab] = useState<string>(initialTab || 'overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'لوحة المؤشرات', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'home', label: 'الصفحة الرئيسية', icon: <Home className="w-4 h-4" /> },
    { id: 'methodology', label: 'منهجنا (الأساس الجيد)', icon: <Compass className="w-4 h-4" /> },
    { id: 'projects', label: 'إدارة المشاريع', icon: <FolderKanban className="w-4 h-4" /> },
    { id: 'packages', label: 'باقات البناء', icon: <Boxes className="w-4 h-4" /> },
    { id: 'about', label: 'من نحن ورؤيتنا', icon: <Building className="w-4 h-4" /> },
    { id: 'services', label: 'الخدمات الهندسية', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'media', label: 'مكتبة الوسائط', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'contact', label: 'التواصل والشبكات', icon: <Phone className="w-4 h-4" /> },
    { id: 'quote', label: 'نموذج الواتساب', icon: <MessageCircle className="w-4 h-4" /> },
    { id: 'custom', label: 'الأقسام المخصصة', icon: <LayoutTemplate className="w-4 h-4" /> },
    { id: 'security', label: 'الأمان والحساب', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'backup', label: 'النسخ الاحتياطي', icon: <Download className="w-4 h-4" /> },
  ];

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex bg-neutral-950 text-neutral-100 overflow-hidden font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-l border-neutral-800 bg-neutral-950 p-4 shrink-0 justify-between">
        <div className="space-y-6">
          {/* Brand badge */}
          <div className="flex items-center gap-3 px-2 py-1.5 border-b border-neutral-800/80 pb-3">
            <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center shadow shrink-0 overflow-hidden">
              <img
                src={content.settings.logoImage || "/assets/aistudio/image_4bd9251f.png"}
                alt="MISMAR CONTRACTING"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-extrabold text-xs text-white tracking-tight">
                شركة مسمار للمقاولات
              </div>
              <div className="text-[10px] text-amber-500 font-medium">
                لوحة التحكم الإدارية المستقلة
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-start ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <span className={isActive ? 'text-amber-500' : 'text-neutral-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-neutral-800 space-y-2">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-neutral-200 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>عرض الموقع كزائر</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-neutral-900/40">
        {/* Top bar */}
        <header className="h-16 border-b border-neutral-800 bg-neutral-950/80 px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-400 font-medium">القسم النشط:</span>
              <span className="text-amber-400 font-bold">
                {menuItems.find((m) => m.id === activeTab)?.label}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Save indicator toast */}
            {saveMessage && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 animate-in fade-in">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{saveMessage}</span>
              </span>
            )}

            {isSaving && (
              <span className="text-xs text-amber-400 animate-pulse">
                جاري الحفظ...
              </span>
            )}

            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>معاينة الموقع</span>
            </button>
          </div>
        </header>

        {/* Scrollable Main Views */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Live Database Connection Banner */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-neutral-900 to-neutral-900 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-300 font-semibold">
                  لوحة التحكم متصلة مباشرة بقاعدة بيانات الموقع الحي (/api/content)
                </span>
                <span className="text-neutral-400 hidden md:inline">
                  — أي تعديل تحفظه هنا ينعكس فوراً وتلقائياً على الموقع
                </span>
              </div>
              <button
                onClick={onClose}
                className="self-start sm:self-auto px-3 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>العودة ومشاهدة التغيير على الموقع الحي</span>
              </button>
            </div>

            {activeTab === 'overview' && (
              <OverviewTab
                onSelectTab={(id) => setActiveTab(id)}
                onPreviewSite={onClose}
              />
            )}
            {activeTab === 'home' && <HomeManagerTab />}
            {activeTab === 'methodology' && <MethodologyManagerTab />}
            {activeTab === 'projects' && <ProjectsManagerTab />}
            {activeTab === 'packages' && <PackagesManagerTab />}
            {activeTab === 'about' && <AboutManagerTab />}
            {activeTab === 'services' && <ServicesManagerTab />}
            {activeTab === 'media' && <MediaLibraryTab />}
            {activeTab === 'contact' && <ContactManagerTab />}
            {activeTab === 'quote' && <QuoteSettingsTab />}
            {activeTab === 'custom' && <CustomSectionsTab />}
            {activeTab === 'security' && <SecurityTab />}
            {activeTab === 'backup' && <BackupTab />}
          </div>
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 bg-neutral-950 border-l border-neutral-800 p-4 flex flex-col justify-between h-full z-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={content.settings.logoImage || "/assets/aistudio/image_4bd9251f.png"}
                      alt="MISMAR"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="font-bold text-xs text-white">لوحة تحكم مسمار</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-neutral-400 hover:text-white rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-start ${
                        isActive
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-neutral-800 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onClose();
                }}
                className="w-full py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold"
              >
                معاينة الموقع
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-2 text-red-400 text-xs font-medium"
              >
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
