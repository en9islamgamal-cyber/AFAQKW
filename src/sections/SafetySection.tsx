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
    // التعديل: خلفية احتياطية فاتحة
    <section ref={sectionRef} className={`section-pinned relative overflow-hidden bg-[#F8F9FA] ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* التعديل: الصورة بصيغة WebP وشفافية أقل */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full transform-gpu will-change-transform opacity-60" style={{ backgroundImage: 'url(/workers_safety.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      
      {/* التعديل: فلتر أبيض شفاف بدل الـ Dark Gradient */}
      <div className="absolute inset-0 bg-white/70 pointer-events-none z-0" />

      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 lg:px-[7vw]">
        
        <div ref={headlineRef} className={`max-w-[44vw] transform-gpu will-change-transform ${isAr ? 'text-right' : 'text-left'}`}>
          {/* التعديل: العناوين كحلي داكن */}
          <h2 className="font-heading text-4xl lg:text-6xl font-black text-[#0F172A] leading-[1.05] mb-6 drop-shadow-sm">
            {isAr ? 'السلامة أولاً.' : 'Safety first.'}<br />
            <span className="text-[#FF6A00]">{isAr ? 'دائماً.' : 'Always.'}</span>
          </h2>
          <p className={`text-[#1F2937] max-w-[34vw] leading-relaxed font-bold ${isAr ? 'text-xl' : 'text-lg'}`}>
            {isAr ? 'لا تساهل في معدات الوقاية، تصاريح العمل، والتفتيش — لضمان سير مشروعك وعودة فرق العمل بسلام.' : 'Zero shortcuts on PPE, permits, and inspections—so your project stays on track and your teams go home safe.'}
          </p>
        </div>

        {/* التعديل: الكارت بقى أبيض ناصع مع Shadow وشلت الـ glass-card الغامق */}
        <div ref={cardRef} className={`absolute top-[16vh] w-full max-w-[400px] lg:w-[34vw] bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-8 lg:p-10 transform-gpu will-change-transform ${isAr ? 'left-6 lg:left-[6vw] text-right' : 'right-6 lg:right-[6vw]'}`}>
          <h3 className={`font-heading text-2xl text-[#0F172A] mb-8 border-b border-gray-100 pb-4 ${isAr ? 'font-black' : 'font-bold'}`}>
            {isAr ? 'السلامة والامتثال' : 'Safety & Compliance'}
          </h3>
          <ul className="space-y-6">
            {safetyItems.map((item, index) => (
              <li key={index} className={`flex items-start gap-4 ${isAr ? 'justify-start' : ''}`}>
                <div className="w-10 h-10 rounded-xl bg-[#FF6A00]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon className="w-5 h-5 text-[#FF6A00]" strokeWidth={2.5} />
                </div>
                <span className="text-base font-black text-[#1F2937] leading-relaxed pt-1">{item.text}</span>
              </li>
            ))}
          </ul>
          
          <button className={`mt-10 px-6 py-4 bg-[#F8F9FA] border border-gray-200 rounded-2xl inline-flex items-center gap-3 text-[#0F172A] text-sm font-black hover:bg-[#FF6A00] hover:text-white hover:border-[#FF6A00] transition-all duration-300 w-full justify-center shadow-sm ${isAr ? 'flex-row-reverse' : ''}`}>
            {isAr ? 'اطلب سجل السلامة والاعتمادات' : 'Request safety credentials'}
            {isAr ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
          </button>
        </div>

        <div ref={microLabelRef} className={`absolute bottom-[10vh] transform-gpu will-change-transform ${isAr ? 'right-6 lg:right-[7vw]' : 'left-6 lg:left-[7vw]'}`}>
          <span className={`text-sm tracking-wide text-[#0F172A] bg-white/80 px-5 py-2 rounded-full shadow-sm font-bold border border-gray-100`}>
            {isAr ? 'متوافق مع أيزو 45001 • التزام كامل بالقوانين المحلية' : 'ISO 45001 Alignment • Local Regulatory Compliance'}
          </span>
        </div>
      </div>
    </section>
  );
};

export default SafetySection;
