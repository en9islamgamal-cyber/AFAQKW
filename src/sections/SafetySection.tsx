import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowLeft, HardHat, ClipboardCheck, Flame, FileCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SafetySectionProps { className?: string; }

const SafetySection = ({ className = '' }: SafetySectionProps) => {
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
      const scrollTl = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top top', end: '+=130%', pin: true, scrub: 0.6 } });

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

  const safetyItems = isAr ? [
    { icon: HardHat, text: 'اجتماعات السلامة اليومية وتقييم المخاطر' },
    { icon: ClipboardCheck, text: 'نظام تصاريح العمل (Permit-to-work)' },
    { icon: Flame, text: 'أنظمة منع انتشار الحريق وفحص الحماية السلبية' },
    { icon: FileCheck, text: 'الاعتمادات الحكومية والتفتيش الميداني' },
  ] : [
    { icon: HardHat, text: 'Daily toolbox talks & hazard assessments' },
    { icon: ClipboardCheck, text: 'Permit-to-work system' },
    { icon: Flame, text: 'Fire stopping & passive protection audits' },
    { icon: FileCheck, text: 'Regulatory submissions & inspections' },
  ];

  return (
    <section ref={sectionRef} className={`section-pinned ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ backgroundImage: 'url(/workers_safety.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="absolute inset-0 hero-gradient" />

      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 lg:px-[7vw]">
        <div ref={headlineRef} className={`max-w-[44vw] ${isAr ? 'text-right' : 'text-left'}`}>
          <h2 className="font-heading text-section font-bold text-white leading-[1.05] mb-6">
            {isAr ? 'السلامة أولاً.' : 'Safety first.'}<br />
            <span className="text-primary">{isAr ? 'دائماً.' : 'Always.'}</span>
          </h2>
          <p className={`text-body text-gray-cool max-w-[34vw] leading-relaxed ${isAr ? 'text-lg' : ''}`}>
            {isAr ? 'لا تساهل في معدات الوقاية، تصاريح العمل، والتفتيش — لضمان سير مشروعك وعودة فرق العمل بسلام.' : 'Zero shortcuts on PPE, permits, and inspections—so your project stays on track and your teams go home safe.'}
          </p>
        </div>

        <div ref={cardRef} className={`absolute top-[16vh] w-full max-w-[400px] lg:w-[34vw] glass-card rounded-xl p-6 lg:p-8 ${isAr ? 'left-6 lg:left-[6vw] text-right' : 'right-6 lg:right-[6vw]'}`}>
          <h3 className={`font-heading text-lg text-white mb-6 ${isAr ? 'font-bold' : 'font-semibold'}`}>
            {isAr ? 'السلامة والامتثال' : 'Safety & Compliance'}
          </h3>
          <ul className="space-y-4">
            {safetyItems.map((item, index) => (
              <li key={index} className={`flex items-start gap-3 ${isAr ? 'justify-start' : ''}`}>
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5"><item.icon className="w-4 h-4 text-primary" /></div>
                <span className="text-sm text-gray-cool leading-relaxed">{item.text}</span>
              </li>
            ))}
          </ul>
          <button className={`mt-6 inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all ${isAr ? 'flex-row-reverse' : ''}`}>
            {isAr ? 'اطلب سجل السلامة والاعتمادات' : 'Request safety credentials'}
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

        <div ref={microLabelRef} className={`absolute bottom-[10vh] ${isAr ? 'right-6 lg:right-[7vw]' : 'left-6 lg:left-[7vw]'}`}>
          <span className={`micro-label ${isAr ? 'font-bold' : ''}`}>
            {isAr ? 'متوافق مع أيزو 45001 • التزام كامل بالقوانين المحلية' : 'ISO 45001 Alignment • Local Regulatory Compliance'}
          </span>
        </div>
      </div>
    </section>
  );
};

export default SafetySection;