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

  const mepServices = isAr ? [
    { icon: Settings, text: 'حسابات الأحمال ونمذجة استهلاك الطاقة' },
    { icon: Droplets, text: 'أنظمة التكييف (Chilled Water, DX, VRF)' },
    { icon: Flame, text: 'شبكات مكافحة الحريق الرطبة والجافة' },
    { icon: Zap, text: 'توزيع الطاقة وأنظمة التيار الخفيف (ELV)' },
  ] : [
    { icon: Settings, text: 'Load calculations & energy modeling' },
    { icon: Droplets, text: 'Chilled water, DX, and VRF systems' },
    { icon: Flame, text: 'Wet & dry fire suppression networks' },
    { icon: Zap, text: 'Low-voltage, ELV, and power distribution' },
  ];

  return (
    <section ref={sectionRef} className={`section-pinned ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ backgroundImage: 'url(/hvac_mechanical_room.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="absolute inset-0 hero-gradient" />

      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 lg:px-[7vw]">
        <div ref={headlineRef} className={`max-w-[44vw] ${isAr ? 'text-right' : 'text-left'}`}>
          <h2 className="font-heading text-section font-bold text-white leading-[1.05] mb-6">
            {isAr ? 'أنظمة كهروميكانيكية' : 'MEP that performs'}<br />
            <span className="text-primary">{isAr ? 'تعمل بأقصى كفاءة.' : 'under load.'}</span>
          </h2>
          <p className={`text-body text-gray-cool max-w-[34vw] leading-relaxed ${isAr ? 'text-lg' : ''}`}>
            {isAr ? 'تكييف، سباكة، مكافحة حريق، وكهرباء — مصممة لسهولة الصيانة ومختبرة بالكامل قبل التسليم.' : 'HVAC, plumbing, firefighting, and electrical—designed for maintainability and tested before handover.'}
          </p>
        </div>

        <div ref={cardRef} className={`absolute top-[16vh] w-full max-w-[400px] lg:w-[34vw] glass-card rounded-xl p-6 lg:p-8 ${isAr ? 'left-6 lg:left-[6vw] text-right' : 'right-6 lg:right-[6vw]'}`}>
          <h3 className={`font-heading text-lg text-white mb-6 ${isAr ? 'font-bold' : 'font-semibold'}`}>
            {isAr ? 'الأنظمة الكهروميكانيكية (MEP)' : 'MEP Systems'}
          </h3>
          <ul className="space-y-4">
            {mepServices.map((service, index) => (
              <li key={index} className={`flex items-start gap-3 ${isAr ? 'justify-start' : ''}`}>
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5"><service.icon className="w-4 h-4 text-primary" /></div>
                <span className="text-sm text-gray-cool leading-relaxed">{service.text}</span>
              </li>
            ))}
          </ul>
          <button className={`mt-6 inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all ${isAr ? 'flex-row-reverse' : ''}`}>
            {isAr ? 'اطلع على معاييرنا الهندسية' : 'See MEP standards'}
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

        <div ref={microLabelRef} className={`absolute bottom-[10vh] ${isAr ? 'right-6 lg:right-[7vw]' : 'left-6 lg:left-[7vw]'}`}>
          <span className={`micro-label ${isAr ? 'font-bold' : ''}`}>
            {isAr ? 'اختبارات التشغيل (Commissioning) • مخططات ما بعد التنفيذ (As-Built)' : 'Tested Commissioning • As-Built Documentation'}
          </span>
        </div>
      </div>
    </section>
  );
};

export default MEPSection;