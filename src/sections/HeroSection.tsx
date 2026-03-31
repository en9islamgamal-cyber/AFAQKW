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
          scrub: 1, // تم تعديلها لـ 1 عشان الحركة تبقى أنعم ومافيهاش تقطيع
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
  }, [isAr]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) { element.scrollIntoView({ behavior: 'smooth' }); }
  };

  return (
    <section ref={sectionRef} className={`section-pinned ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
      {/* 1. إضافة transform-gpu و will-change-transform لتسريع معالجة الخلفية */}
      <div 
        ref={bgRef} 
        className="absolute inset-0 w-full h-full transform-gpu will-change-transform" 
        style={{ backgroundImage: 'url(/hero_night_cranes.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} 
      />
      <div className="absolute inset-0 hero-gradient pointer-events-none" />
