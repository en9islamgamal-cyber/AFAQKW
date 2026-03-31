import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

// 1. استيراد مكونات الموقع الرئيسي
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import CapabilitiesSection from './sections/CapabilitiesSection';
import MEPSection from './sections/MEPSection';
import ConstructionSection from './sections/ConstructionSection';
import ProjectSpotlightSection from './sections/ProjectSpotlightSection';
import ProcessSection from './sections/ProcessSection';
import SafetySection from './sections/SafetySection';
import ContactSection from './sections/ContactSection';

// 2. استيراد مكونات البوابة
import Login from './sections/Login'; 
import AdminDashboard from './sections/AdminDashboard';
import ClientDashboard from './sections/ClientDashboard';

export default function App() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [showPortal, setShowPortal] = useState(false);
  
  // متغير ذكي لمعرفة لغة الموقع الحالية
  const [isArabic, setIsArabic] = useState(true);

  useEffect(() => {
    // دالة لتحديث اللغة بناءً على الـ HTML tag
    const updateLang = () => {
      const currentDir = document.documentElement.dir;
      const currentLang = document.documentElement.lang;
      setIsArabic(currentDir === 'rtl' || currentLang.includes('ar'));
    };

    // التحقق فور فتح الموقع
    updateLang();

    // مراقبة أي تغيير في اللغة (عشان لما العميل يدوس على زرار تغيير اللغة)
    const observer = new MutationObserver(updateLang);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['dir', 'lang'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        setUserRole(profile?.role || 'client');
      }
      setLoading(false);
    }
    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload(); 
  };

  // الحالة الأولى: عرض الموقع الرئيسي (شيلنا الـ dir الثابت من هنا)
  if (!showPortal) {
    return (
      <div className="font-sans antialiased text-slate-200 bg-[#0a0f1c]">
        <Navigation />
        
        <main>
          <HeroSection />
          <CapabilitiesSection />
          <MEPSection />
          <ConstructionSection />
          <ProjectSpotlightSection />
          <ProcessSection />
          <SafetySection />
          <ContactSection />
        </main>
        
        <Footer />

        {/* الزرار العائم الديناميكي (بيتغير لغته ومكانه) */}
        <button 
          onClick={() => setShowPortal(true)}
          className={`fixed bottom-8 ${isArabic ? 'left-8' : 'right-8'} z-50 bg-[#e86024] hover:bg-[#c04b19] text-white px-6 py-4 rounded-full font-bold shadow-2xl flex items-center gap-3 transition-transform hover:scale-105 border-2 border-white/10`}
          dir={isArabic ? 'rtl' : 'ltr'}
        >
          <span>🔐</span>
          <span>{isArabic ? 'بوابة العملاء' : 'Client Portal'}</span>
        </button>
      </div>
    );
  }

  // الحالة الثانية: البوابة الإلكترونية
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0a0f1c] text-[#e86024] font-bold text-xl" dir="rtl">
        جاري تحميل البوابة...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="relative h-screen bg-[#0a0f1c]">
        <button 
          onClick={() => setShowPortal(false)} 
          className="absolute top-6 right-6 z-50 text-slate-400 hover:text-white px-4 py-2 font-bold transition-all flex items-center gap-2"
        >
          <span>⬅️</span> العودة للموقع
        </button>
        <Login onLoginSuccess={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      <div className="bg-blue-950 px-4 py-2 text-left">
         <button onClick={() => setShowPortal(false)} className="text-blue-300 hover:text-white text-sm font-bold">
            العودة لواجهة الموقع 🏠
         </button>
      </div>

      {userRole === 'admin' ? (
        <AdminDashboard /> 
      ) : (
        <ClientDashboard onLogout={handleLogout} />
      )}
    </div>
  );
}
