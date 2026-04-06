import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps { className?: string; }

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const microLabelRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const isAr = (localStorage.getItem('lang') || 'EN') === 'AR';

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.fromTo(bgRef.current, { scale: 1.05, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 });
      tl.fromTo(microLabelRef.current, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.5');
      if (headlineRef.current) {
        const logos = headlineRef.current.querySelectorAll('.logo-img');
        if (logos.length > 0) {
          tl.fromTo(logos, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.8 }, '-=0.3');
        }
      }
      tl.fromTo([subheadlineRef.current, ctaRef.current], { y: 15, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 }, '-=0.4');
      tl.fromTo(cardRef.current, { x: isAr ? '-5vw' : '5vw', opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, '-=0.5');
    }, sectionRef);
    return () => ctx.revert();
  }, [isAr]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100%', 
          pin: true,
          scrub: 0.5, 
        },
      });
      scrollTl.to([headlineRef.current, subheadlineRef.current, ctaRef.current, microLabelRef.current], { x: isAr ? '10vw' : '-10vw', opacity: 0, ease: 'power1.inOut' }, 0);
      scrollTl.to(cardRef.current, { x: isAr ? '-10vw' : '10vw', opacity: 0, ease: 'power1.inOut' }, 0);
      scrollTl.to(bgRef.current, { scale: 1.03, y: '-3vh', ease: 'power1.inOut' }, 0);
    }, section);
    return () => ctx.revert();
  }, [isAr]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) { element.scrollIntoView({ behavior: 'smooth' }); }
  };

  return (
    <section ref={sectionRef} className={`section-pinned relative overflow-hidden bg-afaq-bg ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* التعديل: الصورة بقت واضحة 100% بدون تغبيش، وتم استخدام صيغة WebP */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full transform-gpu will-change-transform opacity-100" style={{ backgroundImage: 'url(/hero_night_cranes.jpg.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      
      {/* التعديل: تدرج لوني خفيف جداً من الجنب بس عشان الكلام يتقرئ، وسايبين الصورة تنطق */}
      <div className={`absolute inset-0 pointer-events-none z-0 ${isAr ? 'bg-gradient-to-l from-white/80 via-white/30 to-transparent' : 'bg-gradient-to-r from-white/80 via-white/30 to-transparent'}`} />

      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 lg:px-[7vw]">
        
        <div ref={microLabelRef} className={`absolute top-[16vh] transform-gpu will-change-transform ${isAr ? 'right-6 lg:right-[7vw]' : 'left-6 lg:left-[7vw]'}`}>
          <div className={`h-[2px] w-12 bg-afaq-orange mb-3 ${isAr ? 'mr-auto ml-0' : ''}`} />
          <span className="font-bold text-sm tracking-wide text-afaq-orange bg-white/70 px-2 py-1 rounded">
            {isAr ? 'للمقاولات الكهروميكانيكية والعامة' : 'Electromechanical & General Contracting'}
          </span>
        </div>

        {/* التعديل: نزلنا الكلام لتحت شوية (mt-[25vh]) عشان اللوجو اللي جوه الصورة يبان براحته، ومسحنا اللوجوهات المتكررة */}
        <div className={`max-w-[46vw] mt-[25vh] ${isAr ? 'text-right' : 'text-left'}`}>
          <div ref={headlineRef} className="hidden">
            {/* سايبين الديف ده مخفي عشان الـ GSAP Animation ميتلخبطش */}
          </div>
          
          <p ref={subheadlineRef} className="text-afaq-blue max-w-[34vw] mb-8 leading-relaxed text-lg md:text-2xl font-black drop-shadow-md bg-white/60 p-4 rounded-xl backdrop-blur-sm inline-block">
            {isAr ? 'تنفيذ متكامل للأعمال الكهروميكانيكية (MEP)، البنية التحتية، والمقاولات العامة — بدقة واحترافية.' : 'Full MEP, infrastructure, and general contracting services—delivered with precision.'}
          </p>
          
          <div ref={ctaRef} className="flex flex-wrap gap-4 mt-2">
            <button onClick={() => scrollToSection('#contact')} className="flex items-center gap-2 px-8 py-4 bg-afaq-orange text-white font-bold rounded-full hover:bg-orange-600 transition-all shadow-lg transform hover:scale-105">
              {isAr ? <><ArrowLeft size={20} /> اطلب عرض سعر</> : <>Request a proposal <ArrowRight size={20} /></>}
            </button>
          </div>
        </div>

        {/* كارت المشروع زي ما هو بألوانه الفاتحة النظيفة */}
        <div ref={cardRef} className={`absolute top-[20vh] w-full max-w-[380px] lg:w-[26vw] bg-white rounded-2xl shadow-2xl border border-gray-light overflow-hidden transform-gpu will-change-transform ${isAr ? 'left-6 lg:left-[6vw] text-right' : 'right-6 lg:right-[6vw]'}`}>
          <div className="h-40 w-full bg-cover bg-center" style={{ backgroundImage: 'url(/khiran_chalets.jpg)' }} />
          
          <div className="p-6 relative z-10 bg-white">
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="font-mono text-xs uppercase font-bold text-afaq-textMain">{isAr ? 'مشروع حالي' : 'Active'}</span>
            </div>
            <h3 className="text-2xl font-black text-afaq-blue mb-2">{isAr ? '١٢ شاليه بمنطقة الخيران' : '12 Chalets'}</h3>
            <p className="text-sm text-afaq-textMain/80 leading-relaxed">{isAr ? 'أعمال التكييف والتشطيبات لعدد ١٢ شاليه فاخر.' : 'HVAC and finishes for 12 luxury chalets.'}</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
