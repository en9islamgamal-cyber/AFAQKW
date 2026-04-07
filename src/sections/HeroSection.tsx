import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase'; // الربط مع الداتابيز بتاعتك

interface HeroSectionProps { className?: string; }

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const [isAr, setIsAr] = useState(false);
  const [latestProject, setLatestProject] = useState<any>(null); // لتخزين المشروع اللي هنسحبه

  useEffect(() => {
    setIsAr((localStorage.getItem('lang') || 'EN') === 'AR');
    
    // سحب آخر مشروع "قيد التنفيذ" من Supabase
    const fetchLatestProject = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'قيد التنفيذ') // هنجيب اللي شغالين بس
        .order('created_at', { ascending: false }) // أحدث واحد فوق
        .limit(1) // واحد بس
        .single();

      if (data) setLatestProject(data);
    };

    fetchLatestProject();
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

        {/* الكارت اللي أنت عاوزه: مربوط بالداتابيز - صورة واسم فقط */}
        {latestProject && (
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-end mt-12 lg:mt-0">
            <div className="w-full max-w-[380px] bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden group cursor-pointer" onClick={() => scrollToSection('#projects')}>
              
              {/* صورة المشروع الحقيقية من الداتابيز */}
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={latestProject.image_url || "/khiran_chalets.webp"} 
                  alt={latestProject.project_name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 border border-gray-100">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-black text-gray-800 uppercase tracking-tighter">
                    {isAr ? 'مشروع جاري' : 'Ongoing'}
                  </span>
                </div>
              </div>

              <div className={`p-8 bg-white ${isAr ? 'text-right' : 'text-left'}`}>
                {/* اسم المشروع فقط من الداتابيز (client_name أو project_name) */}
                <h3 className="text-2xl font-black text-[#0F172A] leading-tight">
                  {latestProject.client_name || latestProject.project_name}
                </h3>
                
                <div className="mt-6 flex items-center gap-2 text-[#FF6A00] font-bold text-sm">
                  <span>{isAr ? 'التفاصيل في بوابة العملاء' : 'View in Portal'}</span>
                  {isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
