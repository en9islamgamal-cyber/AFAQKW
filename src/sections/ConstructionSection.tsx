import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowLeft, Building2, Shield, Paintbrush, Truck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ConstructionSectionProps { className?: string; }

const ConstructionSection = ({ className = '' }: ConstructionSectionProps) => {
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

      scrollTl.fromTo(headlineRef.current, { x: 0, opacity: 1 }, { x: isAr ? '18vw' : '-18vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(cardRef.current, { x: 0, opacity: 1 }, { x: isAr ? '-18vw' : '18vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(microLabelRef.current, { y: 0, opacity: 1 }, { y: '10vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(bgRef.current, { scale: 1, y: 0 }, { scale: 1.06, y: '-6vh', ease: 'power2.in' }, 0.7);
    }, section);
    return () => ctx.revert();
  }, [isAr]);

  const constructionServices = isAr ? [
    { icon: Building2, text: 'أعمال الخرسانة والهياكل المعدنية' },
    { icon: Shield, text: 'الواجهات الزجاجية (Curtain Wall)، التجليد، والعزل' },
    { icon: Paintbrush, text: 'التشطيبات الداخلية وأنظمة الأسقف المعلقة' },
    { icon: Truck, text: 'إدارة الخدمات اللوجستية للموقع والمخلفات' },
  ] : [
    { icon: Building2, text: 'Concrete & structural steel coordination' },
    { icon: Shield, text: 'Curtain wall, cladding, & waterproofing' },
    { icon: Paintbrush, text: 'Interior fit-outs & ceiling systems' },
    { icon: Truck, text: 'Site logistics & waste management' },
  ];

  return (
    // التعديل: خلفية احتياطية فاتحة
    <section ref={sectionRef} className={`section-pinned bg-[#F8F9FA] ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* التعديل: تغيير الصورة لـ .webp وتقليل شفافيتها */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full transform-gpu will-change-transform opacity-60" style={{ backgroundImage: 'url(/facade_construction.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      
      {/* التعديل: فلتر أبيض شفاف بدل الـ Dark Gradient */}
      <div className="absolute inset-0 bg-white/70 pointer-events-none z-0" />

      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 lg:px-[7vw]">
        
        <div ref={headlineRef} className={`max-w-[44vw] transform-gpu will-change-transform ${isAr ? 'text-right' : 'text-left'}`}>
          {/* التعديل: العناوين كحلي داكن */}
          <h2 className="font-heading text-section font-black text-[#0F172A] leading-[1.05] mb-6 drop-shadow-sm">
            {isAr ? 'من الهيكل الخرساني' : 'Structure to'}<br />
            <span className="text-[#FF6A00]">{isAr ? 'إلى التشطيبات.' : 'finishes.'}</span>
          </h2>
          <p className={`text-body text-[#1F2937] font-medium max-w-[34vw] leading-relaxed ${isAr ? 'text-xl' : ''}`}>
            {isAr ? 'أعمال الخرسانة، المباني، الواجهات، والتشطيبات الداخلية — تدار بضوابط صارمة وتقارير يومية.' : 'Concrete, masonry, cladding, and interior build-outs—managed with tight controls and daily reporting.'}
          </p>
        </div>

        {/* التعديل: الكارت بقى أبيض ناصع مع Shadow وشلت الـ glass-card الغامق */}
        <div ref={cardRef} className={`absolute top-[16vh] w-full max-w-[400px] lg:w-[34vw] bg-white rounded-2xl shadow-xl border border-gray-200 p-6 lg:p-8 transform-gpu will-change-transform ${isAr ? 'left-6 lg:left-[6vw] text-right' : 'right-6 lg:right-[6vw]'}`}>
          <h3 className={`font-heading text-2xl text-[#0F172A] mb-6 border-b border-gray-100 pb-4 ${isAr ? 'font-black' : 'font-bold'}`}>
            {isAr ? 'المقاولات العامة' : 'General Construction'}
          </h3>
          <ul className="space-y-4">
            {constructionServices.map((service, index) => (
              <li key={index} className={`flex items-start gap-3 ${isAr ? 'justify-start' : ''}`}>
                <div className="w-8 h-8 rounded-lg bg-[#FF6A00]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <service.icon className="w-4 h-4 text-[#FF6A00]" strokeWidth={2.5} />
                </div>
                <span className="text-base font-medium text-[#1F2937] leading-relaxed">{service.text}</span>
              </li>
            ))}
          </ul>
          
          <button className={`mt-8 px-6 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg inline-flex items-center gap-2 text-[#0F172A] text-sm font-bold hover:bg-[#FF6A00] hover:text-white hover:border-[#FF6A00] transition-all duration-300 w-full justify-center ${isAr ? 'flex-row-reverse' : ''}`}>
            {isAr ? 'عرض خدمات المقاولات' : 'View construction services'}
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

        <div ref={microLabelRef} className={`absolute bottom-[10vh] transform-gpu will-change-transform ${isAr ? 'right-6 lg:right-[7vw]' : 'left-6 lg:left-[7vw]'}`}>
          <span className={`text-sm tracking-wide text-[#0F172A] bg-white/80 px-4 py-2 rounded-full shadow-sm font-medium ${isAr ? 'font-bold' : ''}`}>
            {isAr ? 'تقارير يومية • قوائم فحص الجودة (Quality Checklists)' : 'Daily Reporting • Quality Checklists'}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ConstructionSection;
