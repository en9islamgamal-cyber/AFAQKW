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
      const scrollTl = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top top', end: '+=130%', pin: true, scrub: 1 } });

      scrollTl.fromTo(headlineRef.current, { x: isAr ? '50vw' : '-50vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(cardRef.current, { x: isAr ? '-50vw' : '50vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.05);
      scrollTl.fromTo(microLabelRef.current, { y: '10vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.1);
      scrollTl.fromTo(bgRef.current, { scale: 1.08, y: '8vh' }, { scale: 1, y: 0, ease: 'none' }, 0);

      scrollTl.fromTo([headlineRef.current, cardRef.current], { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(bgRef.current, { scale: 1 }, { scale: 1.1, ease: 'power2.in' }, 0.7);
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
    <section ref={sectionRef} className={`section-pinned relative overflow-hidden bg-[#F8F9FA] ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* التعديل: الصورة بصيغة WebP وشفافية أقل */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full transform-gpu will-change-transform opacity-60" style={{ backgroundImage: 'url(/hvac_mechanical_room.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      
      {/* التعديل: فلتر أبيض شفاف (Light Overlay) بدل الغامق */}
      <div className="absolute inset-0 bg-white/70 pointer-events-none z-0" />

      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 lg:px-[7vw]">
        
        <div ref={headlineRef} className={`max-w-[44vw] transform-gpu will-change-transform ${isAr ? 'text-right' : 'text-left'}`}>
          {/* التعديل: العناوين كحلي داكن */}
          <h2 className="font-heading text-4xl lg:text-6xl font-black text-[#0F172A] leading-tight mb-6">
            {isAr ? 'أنظمة كهروميكانيكية' : 'MEP that performs'}<br />
            <span className="text-[#FF6A00]">{isAr ? 'تعمل بأقصى كفاءة.' : 'under load.'}</span>
          </h2>
          <p className="text-lg text-[#1F2937] max-w-[34vw] leading-relaxed font-bold">
            {isAr ? 'تكييف، سباكة، مكافحة حريق، وكهرباء — مصممة لسهولة الصيانة.' : 'HVAC, plumbing, firefighting, and electrical—designed for maintainability.'}
          </p>
        </div>

        {/* التعديل: الكارت بقى أبيض ناصع مع Shadow وبوردر خفيف */}
        <div ref={cardRef} className={`absolute top-[16vh] w-full max-w-[400px] lg:w-[34vw] bg-white shadow-2xl border border-gray-100 rounded-[2.5rem] p-8 transform-gpu will-change-transform ${isAr ? 'left-6 lg:left-[6vw] text-right' : 'right-6 lg:right-[6vw]'}`}>
          <h3 className="text-2xl font-black text-[#0F172A] mb-8 border-b border-gray-100 pb-4">
            {isAr ? 'الأنظمة الكهروميكانيكية (MEP)' : 'MEP Systems'}
          </h3>
          <ul className="space-y-6">
            {mepServices.map((service, index) => (
              <li key={index} className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-[#FF6A00]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#FF6A00] transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-[#FF6A00] group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-base text-[#1F2937] font-black leading-relaxed pt-2">{service.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MEPSection;
