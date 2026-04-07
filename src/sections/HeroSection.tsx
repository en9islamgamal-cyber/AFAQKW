import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface HeroSectionProps { className?: string; }

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const [isAr, setIsAr] = useState(false);

  useEffect(() => {
    setIsAr((localStorage.getItem('lang') || 'EN') === 'AR');
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) { element.scrollIntoView({ behavior: 'smooth' }); }
  };

  return (
    // استخدام min-h-screen و flex للسكرول الطبيعي
    <section className={`relative min-h-screen flex items-center bg-[#F8F9FA] overflow-hidden ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* التعديل: استخدام وسم img لضمان سرعة التحميل وظهور الصورة */}
      <img 
        src="/hero_night_cranes.jpg" 
        alt="Afaq Construction Projects"
        className="absolute inset-0 w-full h-full object-cover" 
      />
      
      {/* تدرج لوني عشان الكلام يكون مقروء على الخلفية */}
      <div className={`absolute inset-0 pointer-events-none z-0 ${isAr ? 'bg-gradient-to-l from-white/95 via-white/70 to-black/30' : 'bg-gradient-to-r from-white/95 via-white/70 to-black/30'}`} />

      {/* الحاوية الرئيسية */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* قسم النصوص والزرار */}
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
            <button 
              onClick={() => scrollToSection('#contact')} 
              className={`flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6A00] text-white font-bold rounded-full hover:bg-[#e65c00] transition-all shadow-xl transform hover:-translate-y-1 w-full sm:w-auto ${isAr ? 'flex-row-reverse' : ''}`}
            >
              {isAr ? 'اطلب عرض سعر' : 'Request a proposal'}
              {isAr ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
            </button>
          </div>
        </div>

        {/* كارت المشروع (12 شاليه) */}
        <div className="w-full lg:w-2/5 flex justify-center lg:justify-end mt-12 lg:mt-0">
          <div className="w-full max-w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-transform hover:scale-[1.02] duration-300">
            {/* التعديل: صورة الكارت بقت img بدل background */}
            <img 
              src="/khiran_chalets.jpg" 
              alt="Khiran Chalets Project" 
              className="h-48 w-full object-cover" 
            />
            
            <div className={`p-6 relative z-10 bg-white ${isAr ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="font-mono text-xs uppercase font-bold text-[#1F2937]">
                  {isAr ? 'مشروع حالي' : 'Active Project'}
                </span>
              </div>
              <h3 className="text-2xl font-black text-[#0F172A] mb-2">
                {isAr ? '١٢ شاليه بمنطقة الخيران' : '12 Chalets at Khiran'}
              </h3>
              <p className="text-sm text-[#1F2937]/80 leading-relaxed font-medium">
                {isAr ? 'أعمال التكييف والتشطيبات لعدد ١٢ شاليه فاخر.' : 'HVAC and finishes for 12 luxury chalets.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
