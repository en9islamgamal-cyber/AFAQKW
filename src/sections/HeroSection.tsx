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
        <div className="w-full lg:w-2/5 flex justify-center lg:justify-end mt-12 lg:mt-0">
          <div className="w-full max-w-[380px] bg
