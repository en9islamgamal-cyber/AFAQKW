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
  }, []);

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
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current, cardRef.current, microLabelRef.current], { opacity: 1, x: 0, y: 0 });
            gsap.set(bgRef.current, { scale: 1, y: 0 });
          }
        },
      });

      scrollTl.fromTo([headlineRef.current, subheadlineRef.current, ctaRef.current, microLabelRef.current], { x: 0, opacity: 1 }, { x: isAr ? '18vw' : '-18vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(cardRef.current, { x: 0, opacity: 1 }, { x: isAr ? '-18vw' : '18vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(bgRef.current, { scale: 1, y: 0 }, { scale: 1.06, y: '-6vh', ease: 'power2.in' }, 0.7);
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) { element.scrollIntoView({ behavior: 'smooth' }); }
  };

  return (
    <section ref={sectionRef} className={`section-pinned ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ backgroundImage: 'url(/hero_night_cranes.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="absolute inset-0 hero-gradient" />

      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 lg:px-[7vw]">
        <div ref={microLabelRef} className={`absolute top-[14vh] ${isAr ? 'right-6 lg:right-[7vw]' : 'left-6 lg:left-[7vw]'}`}>
          <div className={`orange-rule mb-4 ${isAr ? 'mr-auto ml-0' : ''}`} />
          <span className={`micro-label ${isAr ? 'font-bold text-sm tracking-wide' : ''}`}>
            {isAr ? 'للمقاولات الكهروميكانيكية والعامة' : 'Electromechanical & General Contracting'}
          </span>
        </div>

        <div className={`max-w-[46vw] mt-[4vh] ${isAr ? 'text-right' : 'text-left'}`}>
          <div ref={headlineRef} className={`flex flex-col gap-4 mb-8 ${isAr ? 'items-end' : 'items-start'}`}>
            <img src="/logo1.png" alt="Afaq Logo Circle" className="logo-img w-32 md:w-48 lg:w-56" style={{ filter: "drop-shadow(0px 8px 12px rgba(255, 255, 255, 0.1))" }} />
            <img src="/logo2.png" alt="Afaq Logo Text" className="logo-img w-64 md:w-80 lg:w-[450px]" style={{ filter: "drop-shadow(0px 8px 12px rgba(255, 255, 255, 0.1))" }} />
          </div>

          <p ref={subheadlineRef} className={`text-body text-gray-cool max-w-[34vw] mb-8 leading-relaxed ${isAr ? 'text-lg' : ''}`}>
            {isAr ? 'تنفيذ متكامل للأعمال الكهروميكانيكية (MEP)، البنية التحتية، والمقاولات العامة — بدقة واحترافية، مع الالتزام التام بالأكواد والمعايير الهندسية.' : 'MEP execution, infrastructure, and full-scale construction—delivered with precision documentation and strict compliance.'}
          </p>

          <div ref={ctaRef} className={`flex flex-wrap gap-4 ${isAr ? 'justify-start' : ''}`}>
            <button onClick={() => scrollToSection('#contact')} className="btn-primary gap-2 flex items-center">
              {isAr ? <><ArrowLeft className="w-4 h-4" /> اطلب عرض سعر</> : <>Request a proposal <ArrowRight className="w-4 h-4" /></>}
            </button>
            <button onClick={() => scrollToSection('#services')} className="btn-secondary gap-2 flex items-center">
              {isAr ? <><ChevronLeft className="w-4 h-4" /> استكشف خدماتنا</> : <>Explore services <ChevronRight className="w-4 h-4" /></>}
            </button>
          </div>
        </div>

        <div ref={cardRef} className={`absolute top-[18vh] w-full max-w-[380px] lg:w-[28vw] glass-card rounded-xl p-6 ${isAr ? 'left-6 lg:left-[6vw] text-right' : 'right-6 lg:right-[6vw]'}`}>
          <div className={`flex items-center gap-3 mb-4 ${isAr ? 'justify-start' : ''}`}>
            <div className="status-dot" />
            <span className="font-mono text-xs uppercase tracking-wider text-gray-cool">{isAr ? 'مشروع حالي' : 'Active Project'}</span>
          </div>
          <h3 className={`font-heading text-xl font-bold text-white mb-3 ${isAr ? '' : 'font-semibold'}`}>{isAr ? 'قطر مول' : 'Mall of Qatar'}</h3>
          <p className="text-sm text-gray-cool mb-4 leading-relaxed">{isAr ? 'تسليم حزمة الأعمال الكهروميكانيكية في الموعد المحدد، مع متابعة دقيقة لسير العمل وتوثيق هندسي شامل.' : 'MEP package delivery on schedule with live progress tracking and comprehensive documentation.'}</p>
          <button onClick={() => scrollToSection('#projects')} className={`inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all ${isAr ? 'flex-row-reverse' : ''}`}>
            {isAr ? 'عرض تفاصيل المشروع' : 'View project details'}
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;