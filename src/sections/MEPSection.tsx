import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowLeft, Settings, Droplets, Flame, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface MEPSectionProps { className?: string; }

const MEPSection = ({ className = '' }: MEPSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const microLabelRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const isAr = (localStorage.getItem('lang') || 'EN') === 'AR';

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // تعديل scrub لـ 1 عشان الحركة تبقى سلسة ومفيهاش تقطيع
      const scrollTl = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top top', end: '+=130%', pin: true, scrub: 1 } });

      scrollTl.fromTo(headlineRef.current, { x: isAr ? '50vw' : '-50vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(cardRef.current, { x: isAr ? '-50vw' : '50vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.05);
      scrollTl.fromTo(microLabelRef.current, { y: '10vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.1);
      scrollTl.fromTo(bgRef.current, { scale: 1.08, y: '8vh' }, { scale: 1, y: 0, ease: 'none' }, 0);

      scrollTl.fromTo(headlineRef.current, { x: 0, opacity: 1 }, { x: isAr ? '18vw' : '-18vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(cardRef.current, { x: 0, opacity: 1 }, { x: isAr ? '-18vw' : '18vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(microLabelRef.current, { y: 0, opacity: 1 }, { y: '10vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(bgRef.current, { scale: 1, y: 0 }, { scale: 1.06, y: '-6vh', ease: 'power2.in' }, 0.7);
    }, section);
    return () => ctx.revert();
  }, [isAr]);

  const mepServices = isAr ? [
    { icon: Settings, text: 'حسابات الأحمال ونمذجة استهلاك الطاقة' },
    { icon: Droplets, text: 'أنظمة التكييف (Chilled Water, DX, VRF)' },
    { icon: Flame, text: 'شبكات مكافحة الحريق الرطبة والجافة' },
    { icon: Zap, text: 'توزيع الطاقة وأنظمة التيار الخفيف (ELV)' },
  ] : [
    { icon: Settings, text: 'Load calculations & energy modeling' },
    { icon: Droplets, text: 'Chilled water, DX, and VRF systems' },
    { icon: Flame, text: 'Wet & dry fire suppression networks' },
    { icon: Zap, text: 'Low
