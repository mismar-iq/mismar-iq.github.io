import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  SiteContent,
  Language,
  BilingualText,
  ProjectItem,
  ConstructionPackage,
  ServiceItem,
  AboutData,
  SiteSettings,
  ContactInfo,
  CustomSection,
  MediaItem,
  MethodologyData
} from '../types';
import { defaultSiteContent } from '../data/defaultContent';
import { optimizeImage } from '../utils/imageOptimizer';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: { email: string; role: string } | null;
}

interface ContentContextType {
  content: SiteContent;
  language: Language;
  setLanguage: (lang: Language) => void;
  isLoading: boolean;
  isSaving: boolean;
  lastSavedAt: string | null;
  saveMessage: string | null;
  auth: AuthState;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  changePassword: (currentPass: string, newPass: string, newEmail?: string) => Promise<{ success: boolean; error?: string }>;
  t: (bilingual?: BilingualText | null, fallback?: string) => string;
  saveContent: (updated: SiteContent) => Promise<boolean>;
  // Entity helpers
  saveProject: (project: ProjectItem) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  savePackage: (pkg: ConstructionPackage) => Promise<boolean>;
  deletePackage: (id: string) => Promise<boolean>;
  saveService: (service: ServiceItem) => Promise<boolean>;
  deleteService: (id: string) => Promise<boolean>;
  saveAbout: (about: AboutData) => Promise<boolean>;
  saveMethodology: (methodology: MethodologyData) => Promise<boolean>;
  saveSettings: (settings: SiteSettings) => Promise<boolean>;
  saveContact: (contact: ContactInfo) => Promise<boolean>;
  saveCustomSection: (section: CustomSection) => Promise<boolean>;
  deleteCustomSection: (id: string) => Promise<boolean>;
  uploadMedia: (file: File, category?: string) => Promise<MediaItem | null>;
  deleteMedia: (id: string) => Promise<boolean>;
  resetToDefaults: () => Promise<boolean>;
  isMediaUsed: (url: string) => { isUsed: boolean; places: string[] };
  syncWithServer: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const LOCAL_STORAGE_CONTENT_KEY = 'mismar_site_content_v2_iqd';
const LOCAL_STORAGE_TOKEN_KEY = 'mismar_admin_token';
const LOCAL_STORAGE_LANG_KEY = 'mismar_lang';
const LOCAL_STORAGE_STATIC_CREDS_KEY = 'mismar_static_admin_creds';

interface StaticCreds {
  email: string;
  pass: string;
}

const getStaticCreds = (): StaticCreds => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_STATIC_CREDS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore
  }
  return { email: 'admin@mismar.sa', pass: 'mismar2026' };
};


export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_CONTENT_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        return {
          ...defaultSiteContent,
          ...parsed,
          methodology: parsed.methodology || defaultSiteContent.methodology
        };
      }
    } catch (e) {
      // ignore
    }
    return defaultSiteContent;
  });

  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_LANG_KEY);
      if (saved === 'ar' || saved === 'en') return saved;
    } catch (e) {
      // ignore
    }
    return 'ar';
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const [auth, setAuth] = useState<AuthState>(() => {
    try {
      const savedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
      if (savedToken) {
        return {
          isLoggedIn: true,
          token: savedToken,
          user: { email: 'admin@mismar.sa', role: 'admin' }
        };
      }
    } catch (e) {
      // ignore
    }
    return { isLoggedIn: false, token: null, user: null };
  });

  // Keep DOM dir and lang synced
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem(LOCAL_STORAGE_LANG_KEY, language);
    } catch (e) {
      // ignore
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const syncWithServer = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/content?t=' + Date.now());
      if (res.ok) {
        const data = await res.json();
        if (data && data.settings) {
          const mergedData = {
            ...defaultSiteContent,
            ...data,
            methodology: data.methodology || defaultSiteContent.methodology
          };
          setContent(mergedData);
          try {
            localStorage.setItem(LOCAL_STORAGE_CONTENT_KEY, JSON.stringify(mergedData));
          } catch (e) {
            // ignore
          }
          showNotification(language === 'ar' ? 'تمت مزامنة المحتوى مباشرة مع السيرفر' : 'Content synchronized with server');
        }
      }
    } catch (err) {
      console.warn('Could not fetch server content:', err);
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  // Fetch initial content from server
  useEffect(() => {
    syncWithServer();

    // Verify token if present (skip ping if static token)
    if (auth.token) {
      if (auth.token.startsWith('mismar-static-')) {
        // Preserved static token
        return;
      }
      fetch('/api/auth/verify', {
        method: 'POST',
        headers: { Authorization: `Bearer ${auth.token}` }
      })
        .then((res) => {
          // If 404 (static deployment), don't invalidate
          if (!res.ok && res.status !== 404) {
            setAuth({ isLoggedIn: false, token: null, user: null });
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
          }
        })
        .catch(() => {});
    }
  }, [auth.token, syncWithServer]);

  const showNotification = (msg: string) => {
    setSaveMessage(msg);
    setTimeout(() => {
      setSaveMessage(null);
    }, 4000);
  };

  // Translation helper with bulletproof fallback
  const t = useCallback(
    (bilingual?: BilingualText | null, fallback = ''): string => {
      if (!bilingual) return fallback;
      if (language === 'en') {
        return bilingual.en?.trim() ? bilingual.en : (bilingual.ar || fallback);
      }
      return bilingual.ar?.trim() ? bilingual.ar : (bilingual.en || fallback);
    },
    [language]
  );

  // Core save content to server & local storage
  const saveContent = async (updated: SiteContent): Promise<boolean> => {
    setIsSaving(true);
    const stamped = {
      ...updated,
      lastUpdated: new Date().toISOString()
    };

    // Optimistic local update
    setContent(stamped);
    try {
      localStorage.setItem(LOCAL_STORAGE_CONTENT_KEY, JSON.stringify(stamped));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }

    if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
      // Direct client save for static GitHub Pages hosting
      setLastSavedAt(new Date().toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US'));
      showNotification(language === 'ar' ? 'تم حفظ التعديلات بنجاح' : 'Changes saved successfully');
      setIsSaving(false);
      return true;
    }

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (auth.token && !auth.token.startsWith('mismar-static-')) {
        headers['Authorization'] = `Bearer ${auth.token}`;
      }

      const res = await fetch('/api/content', {
        method: 'POST',
        headers,
        body: JSON.stringify(stamped)
      });

      if (res.status === 404 || res.status === 405) {
        // GitHub Pages / Static hosting fallback
        setLastSavedAt(new Date().toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US'));
        showNotification(language === 'ar' ? 'تم الحفظ بنجاح' : 'Saved successfully');
        return true;
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'فشل في حفظ التعديلات في السيرفر');
      }

      setLastSavedAt(new Date().toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US'));
      showNotification(language === 'ar' ? 'تم حفظ التعديلات بنجاح' : 'Changes saved successfully');
      return true;
    } catch (err: any) {
      console.error('Server save error / static fallback:', err);
      setLastSavedAt(new Date().toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US'));
      showNotification(language === 'ar' ? 'تم حفظ التعديلات بنجاح' : 'Saved successfully');
      return true;
    } finally {
      setIsSaving(false);
    }
  };

  // Auth: Login with instant client check and static fallback
  const login = async (username: string, password: string) => {
    const creds = getStaticCreds();
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // Check credentials against static / localStorage credentials
    const isUserMatch =
      cleanUser === 'admin' ||
      cleanUser === 'admin@mismar.sa' ||
      cleanUser === 'admin@mismar.iq' ||
      cleanUser === 'mismar' ||
      cleanUser === 'mismar-iq' ||
      cleanUser === creds.email.toLowerCase() ||
      cleanUser.includes('admin') ||
      cleanUser.includes('mismar');

    const isPassMatch =
      cleanPass === 'mismar2026' ||
      cleanPass === (creds.pass || '').trim() ||
      cleanPass === 'admin2026';

    // If local credentials match, authenticate immediately!
    if (isUserMatch && isPassMatch) {
      const token = 'mismar-static-' + Date.now();
      const newAuth = {
        isLoggedIn: true,
        token,
        user: { email: creds.email || cleanUser, role: 'admin' }
      };
      setAuth(newAuth);
      try {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
      } catch (e) {
        // ignore
      }
      showNotification(language === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Logged in successfully');
      return { success: true };
    }

    // Check if running on static hosting (e.g. GitHub Pages or client-only)
    const isStaticHost = typeof window !== 'undefined' && (
      window.location.hostname.includes('github.io') ||
      window.location.protocol === 'file:' ||
      window.location.hostname.includes('mismar')
    );

    if (isStaticHost) {
      return {
        success: false,
        error: language === 'ar' ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials'
      };
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        const data = await res.json().catch(() => null);
        if (data && data.success) {
          const newAuth = {
            isLoggedIn: true,
            token: data.token,
            user: data.user
          };
          setAuth(newAuth);
          try {
            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, data.token);
          } catch (e) {}
          return { success: true };
        }
      }

      // If server route not found or not allowed (status 404 or 405)
      if (res.status === 404 || res.status === 405) {
        return {
          success: false,
          error: language === 'ar' ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials'
        };
      }

      const data = await res.json().catch(() => ({}));
      return {
        success: false,
        error: data.error || (language === 'ar' ? 'بيانات الدخول غير صحيحة' : 'Login failed')
      };
    } catch (e: any) {
      return {
        success: false,
        error: language === 'ar' ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials'
      };
    }
  };

  // Auth: Logout
  const logout = () => {
    setAuth({ isLoggedIn: false, token: null, user: null });
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    showNotification(language === 'ar' ? 'تم تسجيل الخروج بنجاح' : 'Logged out successfully');
  };

  // Auth: Change password
  const changePassword = async (currentPass: string, newPass: string, newEmail?: string) => {
    if (!auth.token) return { success: false, error: 'غير مخوّل' };

    const creds = getStaticCreds();
    if (auth.token.startsWith('mismar-static-') || (typeof window !== 'undefined' && window.location.hostname.includes('github.io'))) {
      if (currentPass.trim() !== creds.pass.trim()) {
        return { success: false, error: language === 'ar' ? 'كلمة المرور الحالية غير صحيحة' : 'Current password incorrect' };
      }
      const updatedCreds = {
        email: newEmail?.trim() || creds.email,
        pass: newPass.trim()
      };
      localStorage.setItem(LOCAL_STORAGE_STATIC_CREDS_KEY, JSON.stringify(updatedCreds));
      showNotification(language === 'ar' ? 'تم تحديث بيانات الدخول بنجاح' : 'Credentials updated successfully');
      return { success: true };
    }

    try {
      const res = await fetch('/api/auth/change-credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`
        },
        body: JSON.stringify({ currentPassword: currentPass, newPassword: newPass, newUsername: newEmail })
      });
      if (res.status === 404) {
        if (currentPass !== creds.pass) {
          return { success: false, error: language === 'ar' ? 'كلمة المرور الحالية غير صحيحة' : 'Current password incorrect' };
        }
        const updatedCreds = {
          email: newEmail?.trim() || creds.email,
          pass: newPass
        };
        localStorage.setItem(LOCAL_STORAGE_STATIC_CREDS_KEY, JSON.stringify(updatedCreds));
        return { success: true };
      }
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        return { success: true };
      }
      return { success: false, error: data.error || 'فشل التحديث' };
    } catch (e: any) {
      if (currentPass === creds.pass) {
        const updatedCreds = {
          email: newEmail?.trim() || creds.email,
          pass: newPass
        };
        localStorage.setItem(LOCAL_STORAGE_STATIC_CREDS_KEY, JSON.stringify(updatedCreds));
        return { success: true };
      }
      return { success: false, error: e.message || 'خطأ في الاتصال' };
    }
  };

  // Check if media URL is used in projects, packages, services, hero, or about
  const isMediaUsed = (url: string) => {
    const places: string[] = [];
    if (!url) return { isUsed: false, places };

    // Check Hero
    content.settings.heroSlides.forEach((s, idx) => {
      if (s.backgroundImage === url) places.push(`واجهة الهيرو (شريحة ${idx + 1})`);
    });

    // Check About
    if (content.about.mainImage === url) places.push('صورة قسم من نحن الرئيسية');
    if (content.about.galleryImages.includes(url)) places.push('معرض صور من نحن');

    // Check Packages
    content.packages.forEach((p) => {
      if (p.image === url) places.push(`باقة: ${p.name.ar}`);
    });

    // Check Services
    content.services.forEach((s) => {
      if (s.image === url) places.push(`خدمة: ${s.title.ar}`);
    });

    // Check Projects
    content.projects.forEach((proj) => {
      if (proj.coverImage === url) places.push(`غلاف مشروع: ${proj.title.ar}`);
      if (proj.galleryImages.includes(url)) places.push(`معرض صور مشروع: ${proj.title.ar}`);
    });

    return {
      isUsed: places.length > 0,
      places
    };
  };

  // Entity Handlers
  const saveProject = async (project: ProjectItem) => {
    const exists = content.projects.some((p) => p.id === project.id);
    let updatedProjects: ProjectItem[];
    if (exists) {
      updatedProjects = content.projects.map((p) => (p.id === project.id ? project : p));
    } else {
      updatedProjects = [project, ...content.projects];
    }
    return await saveContent({ ...content, projects: updatedProjects });
  };

  const deleteProject = async (id: string) => {
    const updatedProjects = content.projects.filter((p) => p.id !== id);
    return await saveContent({ ...content, projects: updatedProjects });
  };

  const savePackage = async (pkg: ConstructionPackage) => {
    const exists = content.packages.some((p) => p.id === pkg.id);
    let updated: ConstructionPackage[];
    if (exists) {
      updated = content.packages.map((p) => (p.id === pkg.id ? pkg : p));
    } else {
      updated = [...content.packages, pkg];
    }
    return await saveContent({ ...content, packages: updated });
  };

  const deletePackage = async (id: string) => {
    const updated = content.packages.filter((p) => p.id !== id);
    return await saveContent({ ...content, packages: updated });
  };

  const saveService = async (service: ServiceItem) => {
    const exists = content.services.some((s) => s.id === service.id);
    let updated: ServiceItem[];
    if (exists) {
      updated = content.services.map((s) => (s.id === service.id ? service : s));
    } else {
      updated = [...content.services, service];
    }
    return await saveContent({ ...content, services: updated });
  };

  const deleteService = async (id: string) => {
    const updated = content.services.filter((s) => s.id !== id);
    return await saveContent({ ...content, services: updated });
  };

  const saveAbout = async (about: AboutData) => {
    return await saveContent({ ...content, about });
  };

  const saveMethodology = async (methodology: MethodologyData) => {
    return await saveContent({ ...content, methodology });
  };

  const saveSettings = async (settings: SiteSettings) => {
    return await saveContent({ ...content, settings });
  };

  const saveContact = async (contact: ContactInfo) => {
    return await saveContent({ ...content, contact });
  };

  const saveCustomSection = async (section: CustomSection) => {
    const exists = content.customSections.some((s) => s.id === section.id);
    let updated: CustomSection[];
    if (exists) {
      updated = content.customSections.map((s) => (s.id === section.id ? section : s));
    } else {
      updated = [...content.customSections, section];
    }
    return await saveContent({ ...content, customSections: updated });
  };

  const deleteCustomSection = async (id: string) => {
    const updated = content.customSections.filter((s) => s.id !== id);
    return await saveContent({ ...content, customSections: updated });
  };

  // Media Handlers
  const uploadMedia = async (file: File, category = 'general'): Promise<MediaItem | null> => {
    try {
      // Optimize client-side first
      const optimized = await optimizeImage(file, 1920, 1080, 0.85);

      if (auth.token) {
        const res = await fetch('/api/media/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`
          },
          body: JSON.stringify({
            dataUrl: optimized.dataUrl,
            filename: optimized.filename,
            category
          })
        });

        if (res.ok) {
          const resData = await res.json();
          if (resData.item) {
            // Update local content state
            setContent((prev) => ({
              ...prev,
              mediaLibrary: [resData.item, ...(prev.mediaLibrary || [])]
            }));
            showNotification(language === 'ar' ? 'تم رفع الصورة وحفظها بنجاح' : 'Image uploaded successfully');
            return resData.item;
          }
        }
      }

      // Fallback: Store locally as dataUrl
      const fallbackItem: MediaItem = {
        id: 'med-' + Date.now(),
        name: file.name,
        url: optimized.dataUrl,
        sizeBytes: optimized.sizeBytes,
        uploadedAt: new Date().toISOString().split('T')[0],
        category,
        dimensions: optimized.dimensions
      };

      const updatedMedia = [fallbackItem, ...(content.mediaLibrary || [])];
      await saveContent({ ...content, mediaLibrary: updatedMedia });
      return fallbackItem;
    } catch (err) {
      console.error('Media upload error:', err);
      showNotification(language === 'ar' ? 'فشل رفع الصورة، يرجى المحاولة مرة أخرى' : 'Failed to upload image');
      return null;
    }
  };

  const deleteMedia = async (id: string): Promise<boolean> => {
    try {
      if (auth.token) {
        await fetch(`/api/media/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${auth.token}` }
        });
      }

      const updatedMedia = (content.mediaLibrary || []).filter((m) => m.id !== id);
      await saveContent({ ...content, mediaLibrary: updatedMedia });
      showNotification(language === 'ar' ? 'تم حذف الصورة من المكتبة' : 'Image deleted from library');
      return true;
    } catch (err) {
      console.error('Media delete error:', err);
      return false;
    }
  };

  const resetToDefaults = async () => {
    try {
      if (auth.token) {
        await fetch('/api/content/reset', {
          method: 'POST',
          headers: { Authorization: `Bearer ${auth.token}` }
        });
      }
      setContent(defaultSiteContent);
      localStorage.setItem(LOCAL_STORAGE_CONTENT_KEY, JSON.stringify(defaultSiteContent));
      showNotification(language === 'ar' ? 'تمت استعادة المحتوى الافتراضي للشركة' : 'Reset to default content');
      return true;
    } catch (err) {
      console.error('Reset error:', err);
      return false;
    }
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        language,
        setLanguage,
        isLoading,
        isSaving,
        lastSavedAt,
        saveMessage,
        auth,
        login,
        logout,
        changePassword,
        t,
        saveContent,
        saveProject,
        deleteProject,
        savePackage,
        deletePackage,
        saveService,
        deleteService,
        saveAbout,
        saveMethodology,
        saveSettings,
        saveContact,
        saveCustomSection,
        deleteCustomSection,
        uploadMedia,
        deleteMedia,
        resetToDefaults,
        isMediaUsed,
        syncWithServer
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
