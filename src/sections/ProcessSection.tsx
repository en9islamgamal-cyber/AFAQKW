import { useState, useEffect } from 'react';
import { Search, ClipboardList, Hammer, FileText, ArrowRight, ArrowLeft } from 'lucide-react';

interface ProcessSectionProps { className?: string; }

const ProcessSection = ({ className = '' }: ProcessSectionProps) => {
  const [isAr, setIsAr] = useState(false);

  useEffect(() => {
    setIsAr((localStorage.getItem('lang') || 'EN') === 'AR');
  }, []);

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
    // الخلفية رمادي فاتح جداً ومتناسقة
    <section className={`relative bg-[#F8F9FA] py-20 lg:py-32 overflow-hidden ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 pointer-events-none opacity-40" style={{ background: 'radial-gradient(ellipse at center, rgba(255,106,0,0.05) 0%, transparent 70%)' }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row gap-16">
        
        {/* قسم العناوين والزرار */}
        <div className={`w-full lg:w-1/3 flex flex-col justify-center ${isAr ? 'text-right' : 'text-left'}`}>
          <div className="mb-8">
            <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-black text-[#0F172A] leading-tight mb-6">
              {isAr ? 'كيف' : 'How we'} <br className="hidden lg:block"/> <span className="text-[#FF6A00]">{isAr ? 'ننفذ أعمالنا.' : 'deliver.'}</span>
            </h2>
            <p className={`text-[#1F2937] leading-relaxed font-bold max-w-md ${isAr ? 'text-xl' : 'text-lg'}`}>
              {isAr ? 'عملية واضحة وممنهجة — نطاق عمل محدد، ضوابط صارمة، وتسليم نظيف.' : 'A simple, repeatable process—clear scope, tight controls, clean handover.'}
            </p>
          </div>

          <button 
            onClick={scrollToContact} 
            className={`w-fit px-8 py-4 bg-[#FF6A00] hover:bg-[#e65c00] text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 transform hover:-translate-y-1 ${isAr ? 'flex-row-reverse' : ''}`}
          >
            {isAr ? 'ابدأ مشروعك الآن' : 'Start a project now'}
            {isAr ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
          </button>
        </div>

        {/* قسم المراحل (الخطوات الثابتة) */}
        <div className={`relative w-full lg:w-2/3 max-w-2xl ${isAr ? 'mr-auto ml-0' : 'ml-auto mr-0'}`}>
          {/* الخط الطولي البرتقالي الثابت */}
          <div className={`absolute top-0 w-[3px] h-full bg-[#FF6A00] opacity-30 ${isAr ? 'right-[22px] md:right-[26px]' : 'left-[22px] md:left-[26px]'}`} />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className={`relative flex gap-6 md:gap-8 ${isAr ? 'text-right' : 'text-left'}`}>
                {/* الدوائر البرتقالية */}
                <div className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#FF6A00] flex items-center justify-center flex-shrink-0 shadow-md border-4 border-[#F8F9FA]">
                  <step.icon className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={2.5} />
                </div>
                
                {/* النصوص */}
                <div className="flex-1 pt-1 md:pt-2">
                  <div className={`flex items-center gap-3 mb-2 ${isAr ? 'justify-start' : ''}`}>
                    <span className="font-black text-sm md:text-base text-[#FF6A00] font-mono tracking-tighter bg-[#FF6A00]/10 px-2 py-1 rounded">
                      {step.number}
                    </span>
                    <h3 className={`font-heading text-2xl md:text-3xl text-[#0F172A] ${isAr ? 'font-black' : 'font-bold'}`}>
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-base md:text-lg text-[#1F2937] font-medium leading-relaxed bg-white p-4 rounded-xl border border-gray-100 shadow-sm mt-3">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;
