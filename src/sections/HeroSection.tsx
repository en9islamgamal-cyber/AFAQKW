import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronRight, ArrowLeft, ChevronLeft } from 'lucide-react';

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
      tl.fromTo(bgRef.current, { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.1 });
      tl.fromTo(microLabelRef.current, { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.6');
      if (headlineRef.current) {
        const logos = headlineRef.current.querySelectorAll('.logo-img');
        tl.fromTo(logos, { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, stagger: 0.2, duration: 1 }, '-=0.3');
      }
      tl.fromTo([subheadlineRef.current, ctaRef.current], { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.7 }, '-=0.5');
      tl.fromTo(cardRef.current, { x: isAr ? '-10vw' : '10vw', opacity: 0, rotate: isAr ? -1.5 : 1.5 }, { x: 0, opacity: 1, rotate: 0, duration: 0.9 }, '-=0.7');
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
          end: '+=130%',
          pin: true,
          scrub: 1,
        },
      });
      scrollTl.fromTo([headlineRef.current, subheadlineRef.current, ctaRef.current, microLabelRef.current], { x: 0, opacity: 1 }, { x: isAr ? '18vw' : '-18vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(cardRef.current, { x: 0, opacity: 1 }, { x: isAr ? '-18vw' : '18vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(bgRef.current, { scale: 1, y: 0 }, { scale: 1.06, y: '-6vh', ease: 'power2.in' }, 0.7);
    }, section);
    return () => ctx.revert();
  }, [isAr]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) { element.scrollIntoView({ behavior: 'smooth' }); }
  };

  return (
    <section ref={sectionRef} className={`section-pinned relative overflow-hidden ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div ref={bgRef} className="absolute inset-0 w-full h-full transform-gpu will-change-transform" style={{ backgroundImage: 'url(/hero_night_cranes.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="absolute inset-0 hero-gradient pointer-events-none" />

      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 lg:px-[7vw]">
        <div ref={microLabelRef} className={`absolute top-[14vh] transform-gpu will-change-transform ${isAr ? 'right-6 lg:right-[7vw]' : 'left-6 lg:left-[7vw]'}`}>
          <div className={`orange-rule mb-4 ${isAr ? 'mr-auto ml-0' : ''}`} />
          <span className="micro-label font-bold text-sm tracking-wide">
            {isAr ? 'للمقاولات الكهروميكانيكية والعامة' : 'Electromechanical & General Contracting'}
          </span>
        </div>

        <div className={`max-w-[46vw] mt-[4vh] ${isAr ? 'text-right' : 'text-left'}`}>
          <div ref={headlineRef} className={`flex flex-col gap-4 mb-8 transform-gpu will-change-transform ${isAr ? 'items-end' : 'items-start'}`}>
            <img src="/logo1.png" alt="Logo Circle" className="logo-img w-32 md:w-48 lg:w-56" />
            <img src="/logo2.png" alt="Logo Text" className="logo-img w-64 md:w-80 lg:w-[450px]" />
          </div>
          <p ref={subheadlineRef} className="text-body text-gray-cool max-w-[34vw] mb-8 leading-relaxed text-lg font-bold">
            {isAr ? 'تنفيذ متكامل للأعمال الكهروميكانيكية (MEP)، البنية التحتية، والمقاولات العامة — بدقة واحترافية.' : 'Full MEP, infrastructure, and general contracting services—delivered with precision.'}
          </p>
          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <button onClick={() => scrollToSection('#contact')} className="btn-primary flex items-center gap-2">
              {isAr ? <><ArrowLeft size={18} /> اطلب عرض سعر</> : <>Request a proposal <ArrowRight size={18} /></>}
            </button>
          </div>
        </div>

        <div ref={cardRef} className={`absolute top-[18vh] w-full max-w-[380px] lg:w-[28vw] rounded-xl p-6 border border-white/10 overflow-hidden transform-gpu will-change-transform ${isAr ? 'left-6 lg:left-[6vw] text-right' : 'right-6 lg:right-[6vw]'}`} style={{ backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.95)), url(/khiran_chalets.jpg)', backgroundSize: 'cover' }}>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="status-dot" />
              <span className="font-mono text-xs uppercase text-gray-cool">{isAr ? 'مشروع حالي' : 'Active'}</span>
            </div>
            <h3 className="text-xl font-black text-white mb-3">{isAr ? '١٢ شاليه بمنطقة الخيران' : '12 Chalets'}</h3>
            <p className="text-sm text-gray-cool mb-4">{isAr ? 'أعمال التكييف والتشطيبات لعدد ١٢ شاليه فاخر.' : 'HVAC and finishes for 12 luxury chalets.'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
