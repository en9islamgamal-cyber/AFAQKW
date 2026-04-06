import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, ClipboardList, Hammer, FileText, ArrowRight, ArrowLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProcessSectionProps { className?: string; }

const ProcessSection = ({ className = '' }: ProcessSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const isAr = (localStorage.getItem('lang') || 'EN') === 'AR';

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headlineRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: headlineRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } });
      gsap.fromTo(lineRef.current, { scaleY: 0 }, { scaleY: 1, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: stepsRef.current, start: 'top 70%', end: 'bottom 30%', scrub: 0.4 } });

      const steps = stepsRef.current?.querySelectorAll('.process-step');
      if (steps) {
        steps.forEach((step, index) => {
          gsap.fromTo(step, { x: isAr ? '10vw' : '-10vw', opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, delay: index * 0.1, scrollTrigger: { trigger: step, start: 'top 75%', toggleActions: 'play none none reverse' } });
        });
      }
    }, section);
    return () => ctx.revert();
  }, [isAr]);

  const steps = isAr ? [
    { icon: Search, title: 'الاستكشاف', description: 'مراجعة النطاق، مسح الموقع، وإعداد سجل شامل للمخاطر.', number: '01' },
    { icon: ClipboardList, title: 'التخطيط', description: 'جدولة دقيقة، استراتيجية التوريد، وتخصيص الموارد.', number: '02' },
    { icon: Hammer, title: 'التنفيذ', description: 'تقارير يومية، فحوصات الجودة، ومراجعة مستمرة للسلامة.', number: '03' },
    { icon: FileText, title: 'التسليم', description: 'اختبارات التشغيل، مخططات ما بعد التنفيذ، وإغلاق المشروع.', number: '04' },
  ] : [
    { icon: Search, title: 'Discover', description: 'Scope review, site survey, and comprehensive risk register development.', number: '01' },
    { icon: ClipboardList, title: 'Plan', description: 'Detailed scheduling, procurement strategy, and resource allocation.', number: '02' },
    { icon: Hammer, title: 'Execute', description: 'Daily logs, quality checks, and continuous safety audits.', number: '03' },
    { icon: FileText, title: 'Handover', description: 'Commissioning, as-built documentation, and project close-out.', number: '04' },
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) { element.scrollIntoView({ behavior: 'smooth' }); }
  };

  return (
    // التعديل: الخلفية بقت رمادي فاتح جداً بدل الكحلي الغامق
    <section ref={sectionRef} className={`relative bg-[#F8F9FA] py-20 lg:py-32 ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 pointer-events-none opacity-40" style={{ background: 'radial-gradient(ellipse at center, rgba(255,106,0,0.05) 0%, transparent 70%)' }} />
      
      <div className="relative z-10 px-6 lg:px-[7vw]">
        <div ref={headlineRef} className={`mb-16 lg:mb-24 ${isAr ? 'text-right' : 'text-left'}`}>
          {/* التعديل: العناوين كحلي داكن */}
          <h2 className="font-heading text-4xl lg:text-6xl font-black text-[#0F172A] leading-[1.05] mb-6">
            {isAr ? 'كيف' : 'How we'} <span className="text-[#FF6A00]">{isAr ? 'ننفذ أعمالنا.' : 'deliver.'}</span>
          </h2>
          <p className={`text-[#1F2937] max-w-xl leading-relaxed font-medium ${isAr ? 'text-xl' : 'text-lg'}`}>
            {isAr ? 'عملية واضحة وممنهجة — نطاق عمل محدد، ضوابط صارمة، وتسليم نظيف.' : 'A simple, repeatable process—clear scope, tight controls, clean handover.'}
          </p>
        </div>

        <div ref={stepsRef} className={`relative max-w-3xl ${isAr ? 'mr-auto ml-0' : 'ml-auto mr-0'}`}>
          {/* التعديل: الخط الطولي بقى برتقالي */}
          <div ref={lineRef} className={`absolute top-0 w-[3px] h-full bg-[#FF6A00] origin-top opacity-30 ${isAr ? 'right-[19px] lg:right-[23px]' : 'left-[19px] lg:left-[23px]'}`} />

          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, index) => (
              <div key={index} className={`process-step relative flex gap-6 lg:gap-10 ${isAr ? 'text-right' : 'text-left'}`}>
                {/* التعديل: الدوائر بقت برتقالية وبوردر أبيض */}
                <div className="relative z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#FF6A00] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#FF6A00]/20 border-4 border-white">
                  <step.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1 pt-1 lg:pt-2">
                  <div className={`flex items-center gap-3 mb-2 ${isAr ? 'justify-start' : ''}`}>
                    <span className="font-black text-sm text-[#FF6A00] font-mono tracking-tighter">{step.number}</span>
                    <h3 className={`font-heading text-2xl lg:text-3xl text-[#0F172A] ${isAr ? 'font-black' : 'font-bold'}`}>{step.title}</h3>
                  </div>
                  <p className="text-base lg:text-lg text-[#1F2937] font-medium leading-relaxed opacity-80">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`mt-16 lg:mt-24 flex ${isAr ? 'justify-start' : 'justify-start'}`}>
          {/* التعديل: زرار برتقالي صريح */}
          <button onClick={scrollToContact} className={`px-10 py-5 bg-[#FF6A00] hover:bg-orange-600 text-white font-black rounded-2xl transition-all shadow-xl shadow-orange-200 flex items-center gap-3 transform hover:-translate-y-1 ${isAr ? 'flex-row-reverse' : ''}`}>
            {isAr ? 'ابدأ مشروعك الآن' : 'Start a project now'}
            {isAr ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
