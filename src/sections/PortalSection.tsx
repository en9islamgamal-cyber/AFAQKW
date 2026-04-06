import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowLeft, TrendingUp, MessageSquare, CreditCard, FileText, Bell } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PortalSectionProps { className?: string; }

const PortalSection = ({ className = '' }: PortalSectionProps) => {
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

  const dashboardMetrics = isAr ? [
    { icon: TrendingUp, label: 'نسبة الإنجاز', value: '72%', color: 'text-green-600' },
    { icon: MessageSquare, label: 'طلبات استعلام (RFIs)', value: '4', color: 'text-orange-600' },
    { icon: CreditCard, label: 'فواتير معلقة', value: '—', color: 'text-gray-400' },
  ] : [
    { icon: TrendingUp, label: 'Progress', value: '72%', color: 'text-green-600' },
    { icon: MessageSquare, label: 'Open RFIs', value: '4', color: 'text-orange-600' },
    { icon: CreditCard, label: 'Pending invoice', value: '—', color: 'text-gray-400' },
  ];

  const portalFeatures = isAr ? [
    { icon: FileText, label: 'إدارة المستندات والوثائق' },
    { icon: Bell, label: 'إشعارات فورية' },
    { icon: TrendingUp, label: 'تتبع سير العمل' },
  ] : [
    { icon: FileText, label: 'Document Control' },
    { icon: Bell, label: 'Real-time Notifications' },
    { icon: TrendingUp, label: 'Progress Tracking' },
  ];

  return (
    <section id="portal" ref={sectionRef} className={`section-pinned relative overflow-hidden bg-[#F8F9FA] ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* التعديل: الصورة بصيغة WebP وشفافية نهارية ناعمة */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full transform-gpu will-change-transform opacity-50" style={{ backgroundImage: 'url(/office_meeting.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      
      {/* التعديل: فلتر أبيض شفاف (Light Overlay) */}
      <div className="absolute inset-0 bg-white/80 pointer-events-none z-0" />

      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 lg:px-[7vw]">
        
        <div ref={headlineRef} className={`max-w-[44vw] transform-gpu will-change-transform ${isAr ? 'text-right' : 'text-left'}`}>
          {/* التعديل: العناوين كحلي داكن */}
          <h2 className="font-heading text-4xl lg:text-6xl font-black text-[#0F172A] leading-[1.05] mb-6 drop-shadow-sm">
            {isAr ? 'تابع كل تفصيلة.' : 'Track everything.'}<br />
            <span className="text-[#FF6A00]">{isAr ? 'ولا تفوت شيئاً.' : 'Miss nothing.'}</span>
          </h2>
          <p className={`text-[#1F2937] max-w-[34vw] leading-relaxed font-bold ${isAr ? 'text-xl' : 'text-lg'}`}>
            {isAr ? 'لوحة تحكم حية لمتابعة الإنجاز، المستندات، طلبات الاستعلام (RFIs)، والماليات — تُحدث أسبوعياً.' : 'A live dashboard for progress, documents, RFIs, and financials—updated weekly.'}
          </p>
        </div>

        {/* التعديل: كارت لوحة التحكم بقى أبيض ناصع مع Shadow وشلت الـ glass-card */}
        <div ref={cardRef} className={`absolute top-[14vh] w-full max-w-[420px] lg:w-[36vw] bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-8 lg:p-10 transform-gpu will-change-transform ${isAr ? 'left-6 lg:left-[6vw] text-right' : 'right-6 lg:right-[6vw]'}`}>
          <div className="flex items-center justify-between mb-8">
            <h3 className={`font-heading text-2xl text-[#0F172A] ${isAr ? 'font-black' : 'font-bold'}`}>
              {isAr ? 'لوحة تحكم المشروع' : 'Project Dashboard'}
            </h3>
            <div className={`flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-black text-green-700 uppercase tracking-tighter">{isAr ? 'مباشر' : 'Live'}</span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {dashboardMetrics.map((metric, index) => (
              <div key={index} className={`flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 group hover:border-[#FF6A00]/20 transition-colors`}>
                <div className={`flex items-center gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-[#FF6A00]/10 flex items-center justify-center">
                    <metric.icon className="w-5 h-5 text-[#FF6A00]" />
                  </div>
                  <span className="text-sm font-bold text-[#1F2937]">{metric.label}</span>
                </div>
                <span className={`text-xl font-black ${metric.color}`} dir="ltr">{metric.value}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {portalFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200">
                <feature.icon className="w-3 h-3 text-[#0F172A]" />
                <span className="text-[10px] font-black text-[#0F172A] uppercase tracking-wide">{feature.label}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={() => window.location.hash = '#login'}
            className={`w-full inline-flex items-center justify-center gap-3 py-5 bg-[#FF6A00] text-white text-lg font-black rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 ${isAr ? 'flex-row-reverse' : ''}`}
          >
            {isAr ? 'اطلب صلاحية الدخول للبوابة' : 'Request portal access'}
            {isAr ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
          </button>
        </div>

        <div ref={microLabelRef} className={`absolute bottom-[10vh] transform-gpu will-change-transform ${isAr ? 'right-6 lg:right-[7vw]' : 'left-6 lg:left-[7vw]'}`}>
          <span className={`text-sm tracking-wide text-[#0F172A] bg-white/80 px-4 py-2 rounded-full shadow-sm font-medium ${isAr ? 'font-bold' : ''}`}>
            {isAr ? 'تقارير أسبوعية • إدارة المستندات (Document Control) • تتبع الدفعات' : 'Weekly Reports • Document Control • Payment Tracking'}
          </span>
        </div>
      </div>
    </section>
  );
};

export default PortalSection;
