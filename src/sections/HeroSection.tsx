import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

// 1. دي مصفوفة المشاريع (ممكن مستقبلاً تسحبها من API أو ملف JSON)
const ongoingProjects = [
  {
    id: 1,
    nameAr: "مبارك الكبير - منطقة العمليات",
    nameEn: "Mubarak Al-Kabeer Port Project",
    image: "/port_project.jpg" // لو الصورة مش موجودة هيستخدم صورة افتراضية
  },
  // تقدر تضيف مشاريع تانية هنا وهتسمع في صفحة الإدارة
];

interface HeroSectionProps { className?: string; }

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const [isAr, setIsAr] = useState(false);
  
  // 2. هنسحب أول مشروع من القائمة عشان يظهر في الهيرو
  const activeProject = ongoingProjects[0];

  useEffect(() => {
    setIsAr((localStorage.getItem('lang') || 'EN') === 'AR');
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) { element.scrollIntoView({ behavior: 'smooth' }); }
  };

  return (
    <section className={`relative min-h-screen flex items-center bg-[#F8F9FA] overflow-hidden ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
      <img 
        src="/hero_night_cranes.jpg" 
        alt="Afaq"
        className="absolute inset-0 w-full h-full object-cover" 
      />
      <div className={`absolute inset-0 pointer-events-none z-0 ${isAr ? 'bg-gradient-to-l from-white/95 via-white/70 to-black/30' : 'bg-gradient-to-r from-white/95 via-white/70 to-black/30'}`} />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className={`w-full lg:w-3/5 ${isAr ? 'text-right' : 'text-left'}`}>
          <div className="mb-6 inline-flex flex-col">
            <div className={`h-[2px] w-12 bg-[#FF6A00] mb-3 ${isAr ? 'ml-auto mr-0' : ''}`} />
            <span className="font-bold text-sm tracking-wide text-[#FF6A00] bg-white/90 px-4 py-2 rounded-md shadow-sm border border-gray-100 inline-block">
              {isAr ? 'للمقاولات الكهروميكانيكية والعامة' : 'Electromechanical & General Contracting'}
            </span>
          </div>
          <p className="text-[#0F172A] leading-[1.4] text-3xl md:text-4xl lg:text-[2.75rem] font-black mb-8 drop-shadow-sm">
            {isAr ? 'تنفيذ متكامل للأعمال الكهروميكانيكية (MEP)، البنية التحتية، والمقاولات العامة — بدقة واحترافية.' : 'Full MEP, infrastructure, and general contracting services—delivered with precision.'}
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <button onClick={() => scrollToSection('#contact')} className={`flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6A00] text-white font-bold rounded-full hover:bg-[#e65c00] transition-all shadow-xl transform hover:-translate-y-1 w-full sm:w-auto ${isAr ? 'flex-row-reverse' : ''}`}>
              {isAr ? 'اطلب عرض سعر' : 'Request a proposal'}
              {isAr ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
            </button>
          </div>
        </div>

        {/* كارت المشاريع الجارية الديناميكي */}
        <div className="w-full lg:w-2/5 flex justify-center lg:justify-end mt-12 lg:mt-0">
          <div className="w-full max-w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden group cursor-pointer" onClick={() => scrollToSection('#projects')}>
            {/* عرض الصورة إن وجدت، وإلا يعرض صورة ثابتة للمشاريع */}
            <img 
              src={activeProject?.image || "/ongoing_projects_placeholder.jpg"} 
              alt={isAr ? activeProject?.nameAr : activeProject?.nameEn} 
              className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className={`p-6 relative z-10 bg-white ${isAr ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="font-mono text-xs uppercase font-black text-green-700">{isAr ? 'مشروع جاري الآن' : 'In Progress'}</span>
              </div>
              
              {/* عرض اسم المشروع فقط بدون تفاصيل */}
              <h3 className="text-2xl font-black text-[#0F172A] leading-tight">
                {isAr ? activeProject?.nameAr : activeProject?.nameEn}
              </h3>
              
              <div className="mt-4 flex items-center gap-2 text-[#FF6A00] font-bold text-sm">
                <span>{isAr ? 'عرض كافة المشاريع' : 'View all projects'}</span>
                {isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
