import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, HardHat, ClipboardCheck, Flame, FileCheck } from 'lucide-react';

interface SafetySectionProps { className?: string; }

const SafetySection = ({ className = '' }: SafetySectionProps) => {
  const [isAr, setIsAr] = useState(false);

  useEffect(() => {
    setIsAr((localStorage.getItem('lang') || 'EN') === 'AR');
  }, []);

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
    // التعديل: إزالة التثبيت (pin) واستخدام flex مرن
    <section className={`relative min-h-screen flex items-center overflow-hidden bg-[#F8F9FA] py-20 ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* التعديل: صورة حقيقية بامتداد .jpg لسرعة التحميل */}
      <img 
        src="/workers_safety.jpg" 
        alt="Workers Safety" 
        className="absolute inset-0 w-full h-full object-cover opacity-60" 
      />
      
      {/* فلتر أبيض شفاف للتوضيح */}
      <div className="absolute inset-0 bg-white/70 pointer-events-none z-0" />

      {/* الحاوية الرئيسية للعناصر */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* قسم العناوين */}
        <div className={`w-full lg:w-1/2 ${isAr ? 'text-right' : 'text-left'}`}>
          <h2 className="font-heading text-5xl lg:text-7xl font-black text-[#0F172A] leading-[1.05] mb-6 drop-shadow-sm">
            {isAr ? 'السلامة أولاً.' : 'Safety first.'}<br />
            <span className="text-[#FF6A00]">{isAr ? 'دائماً.' : 'Always.'}</span>
          </h2>
          <p className={`text-[#1F2937] max-w-md leading-relaxed font-bold mb-10 ${isAr ? 'text-xl' : 'text-lg'}`}>
            {isAr ? 'لا تساهل في معدات الوقاية، تصاريح العمل، والتفتيش — لضمان سير مشروعك وعودة فرق العمل بسلام.' : 'Zero shortcuts on PPE, permits, and inspections—so your project stays on track and your teams go home safe.'}
          </p>

          <div>
            <span className={`inline-block text-sm tracking-wide text-[#0F172A] bg-white px-5 py-3 rounded-full shadow-sm font-bold border border-gray-100`}>
              {isAr ? 'متوافق مع أيزو 45001 • التزام كامل بالقوانين المحلية' : 'ISO 45001 Alignment • Local Regulatory Compliance'}
            </span>
          </div>
        </div>

        {/* قسم كارت تفاصيل السلامة */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="w-full max-w-[450px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 lg:p-10 transition-transform hover:-translate-y-1 duration-300">
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
            
            <button className={`mt-10 px-6 py-4 bg-[#F8F9FA] border border-gray-200 rounded-2xl flex items-center gap-3 text-[#0F172A] text-sm font-black hover:bg-[#FF6A00] hover:text-white hover:border-[#FF6A00] transition-all duration-300 w-full justify-center shadow-sm ${isAr ? 'flex-row-reverse' : ''}`}>
              {isAr ? 'اطلب سجل السلامة والاعتمادات' : 'Request safety credentials'}
              {isAr ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SafetySection;
