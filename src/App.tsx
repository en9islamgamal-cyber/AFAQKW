import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import CapabilitiesSection from './sections/CapabilitiesSection';
import MEPSection from './sections/MEPSection';
import ConstructionSection from './sections/ConstructionSection';
import ProjectSpotlightSection from './sections/ProjectSpotlightSection';
import SafetySection from './sections/SafetySection';
import ProcessSection from './sections/ProcessSection';
import PortalSection from './sections/PortalSection';
import ContactSection from './sections/ContactSection';
import Footer from './components/Footer';
import ClientLogin from './sections/ClientLogin'; // ضفنا ملف اللوجين هنا

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  
  // المتغير ده هو اللي بيحدد هنعرض الموقع ولا صفحة الدخول
  const [showLogin, setShowLogin] = useState(false);

  // مراقب الروابط: أول ما يلمح #login بيعرض البوابة
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#login') {
        setShowLogin(true);
        // نطلع العميل لأول الصفحة عشان اللوجين يظهر مظبوط
        window.scrollTo(0, 0);
      } else {
        setShowLogin(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // عشان لو العميل داخل من لينك مباشر للبوابة

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // كود الأنيميشن الأصلي بتاعك (GSAP)
  useEffect(() => {
    // لو إحنا في صفحة الدخول، مش محتاجين نشغل أنيميشن الموقع
    if (showLogin) return;

    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;
            
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: "power2.out"
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [showLogin]); // ضفنا showLogin هنا عشان يترستر لما نرجع للموقع

  // لو العميل طلب الدخول، نعرضله صفحة البوابة بس
  if (showLogin) {
    return <ClientLogin onBack={() => { window.location.hash = ''; }} />;
  }

  // ده الموقع الرئيسي بتاعك
  return (
    <div ref={mainRef} className="relative bg-navy-900 min-h-screen">
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        <HeroSection className="z-10" />
        <CapabilitiesSection className="z-20" />
        <MEPSection className="z-30" />
        <ConstructionSection className="z-40" />
        <ProjectSpotlightSection className="z-50" />
        <SafetySection className="z-[60]" />
        <ProcessSection className="z-[70]" />
        <PortalSection className="z-[80]" />
        <ContactSection className="z-[90]" />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

