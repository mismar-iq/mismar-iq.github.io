import React, { useState } from 'react';
import { ContentProvider, useContent } from './context/ContentContext';
import { Header } from './components/public/Header';
import { Hero } from './components/public/Hero';
import { MethodologySection } from './components/public/MethodologySection';
import { ServicesSection } from './components/public/ServicesSection';
import { PackagesSection } from './components/public/PackagesSection';
import { ProjectsSection } from './components/public/ProjectsSection';
import { AboutSection } from './components/public/AboutSection';
import { CustomSectionsView } from './components/public/CustomSectionsView';
import { QuoteSection } from './components/public/QuoteSection';
import { Footer } from './components/public/Footer';

import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminLayout } from './components/admin/AdminLayout';
import { Shield } from 'lucide-react';

function MainWebsite() {
  const { auth } = useContent();
  const [adminOpen, setAdminOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState('overview');

  const handleOpenAdmin = (tabId = 'overview') => {
    setAdminInitialTab(tabId);
    if (auth.isLoggedIn) {
      setAdminOpen(true);
    } else {
      setLoginModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#18232b] text-white flex flex-col selection:bg-[#b88a58] selection:text-[#18232b]">
      {/* Top Navigation Bar */}
      <Header onOpenAdmin={() => handleOpenAdmin('overview')} />

      {/* Main Sections matching user reference flow */}
      <main className="flex-1">
        {/* Hero Section matching Image 1 */}
        <Hero />

        {/* 01 - Methodology Section matching Image 2 */}
        <MethodologySection />

        {/* 02 - Services Section */}
        <ServicesSection />

        {/* 03 - Construction Packages Section */}
        <PackagesSection />

        {/* 04 - Executed Projects Portfolio */}
        <ProjectsSection />

        {/* 05 - About Us Section */}
        <AboutSection />

        {/* Extra Custom Sections added by admin */}
        <CustomSectionsView />

        {/* 05 - Split Contact & WhatsApp Section matching Image 2 */}
        <QuoteSection />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => handleOpenAdmin('overview')} />

      {/* Floating admin shortcut button with real-time status */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => handleOpenAdmin('overview')}
          className={`flex items-center gap-2.5 px-4 py-2.5 border shadow-2xl backdrop-blur-md transition-all text-xs cursor-pointer group ${
            auth.isLoggedIn
              ? 'bg-[#18232b]/95 hover:bg-[#213039] text-[#b88a58] border-[#b88a58]'
              : 'bg-[#18232b]/90 hover:bg-[#213039] text-neutral-300 hover:text-white border-[#2d3e4b]'
          }`}
          title="لوحة تحكم الموقع وإدارة المحتوى"
        >
          {auth.isLoggedIn ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Shield className="w-4 h-4 text-[#b88a58]" />
              <span className="font-semibold text-white">لوحة التحكم (متصل)</span>
            </>
          ) : (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-[#b88a58]" />
              <Shield className="w-4 h-4 text-[#b88a58]" />
              <span>لوحة التحكم (CMS)</span>
              <span className="hidden sm:inline text-[10px] text-[#b88a58] font-mono opacity-80 group-hover:opacity-100">
                [تجربة]
              </span>
            </>
          )}
        </button>
      </div>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={() => setAdminOpen(true)}
      />

      {/* Full Admin CMS Dashboard Layout */}
      {adminOpen && auth.isLoggedIn && (
        <AdminLayout
          initialTab={adminInitialTab}
          onClose={() => setAdminOpen(false)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <MainWebsite />
    </ContentProvider>
  );
}
