import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CapabilitiesSectionProps { className?: string; }

const CapabilitiesSection = ({ className = '' }: CapabilitiesSectionProps) => {
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
      scrollTl.fromTo(cardRef.current, { x: isAr ? '-50vw' : '50vw', opacity: 0, rotate: isAr ? -2 : 2 }, { x: 0, opacity: 1, rotate: 0, ease: 'none' }, 0.05);
      scrollTl.fromTo(microLabelRef.current, { y: '10vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.1);
      scrollTl.fromTo(bgRef.current, { scale: 1.08, y: '8vh' }, { scale: 1, y: 0, ease: 'none' }, 0);

      scrollTl.fromTo(headlineRef.current, { x: 0, opacity: 1 }, { x: isAr ? '18vw' : '-18vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(cardRef.current, { x: 0, opacity: 1 }, { x: isAr ? '-18vw' : '18vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(microLabelRef.current, { y: 0, opacity: 1 }, { y: '10vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(bgRef.current, { scale: 1, y: 0 }, { scale: 1.06, y: '-6vh', ease: 'power2.in' }, 0.7);
    }, section);

    return () => ctx.revert();
  }, [isAr]);

  const capabilities = isAr ? [
    'تصميم وتنفيذ الأعمال الكهروميكانيكية (MEP)',
    'المقاولات والإنشاءات العامة',
    'البنية التحتية والمرافق',
    'أنظمة مكافحة الحريق والسلامة',
    'إدارة المشاريع والتحكم في التكاليف',
  ] : [
    'MEP Design-Build', 'General Construction', 'Infrastructure & Utilities', 'Fire Protection & Safety', 'Project Controls & Reporting',
  ];

  return (
    // التعديل هنا: خلفية احتياطية فاتحة
    <section id="services" ref={sectionRef} className={`section-pinned bg-[#F8F9FA] ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* التعديل هنا: استخدام .webp للصورة */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full transform-gpu will-change-transform opacity-60" style={{ backgroundImage: 'url(/warehouse_interior.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      
      {/* التعديل هنا: فلتر أبيض شفاف (Light Overlay) بدل الغامق */}
      <div className="absolute inset-0 bg-white/70 z-0 pointer-events-none" />

      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 lg:px-[7vw]">
        
        <div ref={headlineRef} className={`max-w-[44vw] ${isAr ? 'text-right' : 'text-left'}`}>
          {/* التعديل هنا: العناوين بقت كحلي داكن */}
          <h2 className="font-heading text-section font-black text-[#0F172A] leading-[1.05] mb-6 drop-shadow-sm">
            {isAr ? 'مقاولات' : 'Full-scope'}<br /><span className="text-[#FF6A00]">{isAr ? 'متكاملة وموثوقة.' : 'construction.'}</span>
          </h2>
          {/* التعديل هنا: النص بقى رمادي داكن */}
          <p className={`text-body text-[#1F2937] font-medium max-w-[34vw] leading-relaxed ${isAr ? 'text-xl' : ''}`}>
            {isAr ? 'من البنية التحتية والمرافق إلى التشطيبات النهائية — فريق واحد، جدول زمني دقيق، ومعيار ثابت للتميز.' : 'From underground utilities to final finishes—one team, one schedule, one standard of excellence.'}
          </p>
        </div>

        {/* التعديل هنا: كارت الخدمات بقى أبيض ناصع مع شادو */}
        <div ref={cardRef} className={`absolute top-[16vh] w-full max-w-[400px] lg:w-[34vw] bg-white rounded-2xl shadow-xl border border-gray-200 p-6 lg:p-8 transform-gpu will-change-transform ${isAr ? 'left-6 lg:left-[6vw] text-right' : 'right-6 lg:right-[6vw]'}`}>
          <h3 className={`font-heading text-2xl text-[#0F172A] mb-6 border-b border-gray-100 pb-4 ${isAr ? 'font-black' : 'font-bold'}`}>
            {isAr ? 'خدماتنا وقدراتنا' : 'Our Capabilities'}
          </h3>
          <ul className="space-y-4">
            {capabilities.map((cap, index) => (
              <li key={index} className={`flex items-center gap-3 ${isAr ? 'justify-start' : ''}`}>
                <div className="w-6 h-6 rounded-full bg-[#FF6A00]/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-[#FF6A00]" strokeWidth={3} />
                </div>
                <span className="text-base font-medium text-[#1F2937]">{cap}</span>
              </li>
            ))}
          </ul>
          
          <button className={`mt-8 px-6 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg inline-flex items-center gap-2 text-[#0F172A] text-sm font-bold hover:bg-[#FF6A00] hover:text-white hover:border-[#FF6A00] transition-all duration-300 w-full justify-center ${isAr ? 'flex-row-reverse' : ''}`}>
            {isAr ? 'تحميل ملف سابقة الأعمال (البروفايل)' : 'Download capability statement'}
            <Download className="w-4 h-4" />
          </button>
        </div>

        <div ref={microLabelRef} className={`absolute bottom-[10vh] ${isAr ? 'right-6 lg:right-[7vw]' : 'left-6 lg:left-[7vw]'}`}>
          {/* التعديل هنا: الكلام الصغير اللي تحت بقى واضح */}
          <span className={`text-sm tracking-wide text-[#0F172A] bg-white/80 px-4 py-2 rounded-full shadow-sm font-medium ${isAr ? 'font-bold' : ''}`}>
            {isAr ? 'شركة مرخصة في الكويت • إجراءات متوافقة مع معايير الأيزو' : 'Licensed in Kuwait • ISO-Compliant Processes'}
          </span>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
