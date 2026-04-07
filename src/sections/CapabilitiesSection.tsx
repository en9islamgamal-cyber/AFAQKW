import { useState, useEffect } from 'react';
import { Download, Check } from 'lucide-react';

interface CapabilitiesSectionProps { className?: string; }

const CapabilitiesSection = ({ className = '' }: CapabilitiesSectionProps) => {
  const [isAr, setIsAr] = useState(false);

  useEffect(() => {
    setIsAr((localStorage.getItem('lang') || 'EN') === 'AR');
  }, []);

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
    // استخدام Flexbox مرن للسكرول الطبيعي بدون تثبيت
    <section id="services" className={`relative min-h-screen flex items-center bg-[#F8F9FA] py-20 overflow-hidden ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* استخدام وسم img لضمان ظهور الصورة وسرعة التحميل */}
      <img 
        src="/warehouse_interior.jpg" 
        alt="Capabilities Background"
        className="absolute inset-0 w-full h-full object-cover opacity-60" 
      />
      
      {/* طبقة بيضاء شفافة لتوضيح النصوص */}
      <div className="absolute inset-0 bg-white/70 z-0 pointer-events-none" />

      {/* الحاوية الرئيسية للعناصر */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* قسم النصوص (العنوان والوصف) */}
        <div className={`w-full lg:w-1/2 ${isAr ? 'text-right' : 'text-left'}`}>
          <h2 className="font-heading text-4xl lg:text-6xl font-black text-[#0F172A] leading-[1.1] mb-6 drop-shadow-sm">
            {isAr ? 'مقاولات' : 'Full-scope'}<br />
            <span className="text-[#FF6A00]">{isAr ? 'متكاملة وموثوقة.' : 'construction.'}</span>
          </h2>
          <p className={`text-[#1F2937] font-medium leading-relaxed max-w-lg ${isAr ? 'text-xl' : 'text-lg'}`}>
            {isAr ? 'من البنية التحتية والمرافق إلى التشطيبات النهائية — فريق واحد، جدول زمني دقيق، ومعيار ثابت للتميز.' : 'From underground utilities to final finishes—one team, one schedule, one standard of excellence.'}
          </p>

          <div className="mt-8">
            <span className={`inline-block text-sm tracking-wide text-[#0F172A] bg-white px-5 py-2.5 rounded-full shadow-sm font-medium border border-gray-100 ${isAr ? 'font-bold' : ''}`}>
              {isAr ? 'شركة مرخصة في الكويت • إجراءات متوافقة مع معايير الأيزو' : 'Licensed in Kuwait • ISO-Compliant Processes'}
            </span>
          </div>
        </div>

        {/* قسم كارت الخدمات */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="w-full max-w-[450px] bg-white rounded-2xl shadow-xl border border-gray-200 p-6 lg:p-8">
            <h3 className={`font-heading text-2xl text-[#0F172A] mb-6 border-b border-gray-100 pb-4 ${isAr ? 'font-black' : 'font-bold'}`}>
              {isAr ? 'خدماتنا وقدراتنا' : 'Our Capabilities'}
            </h3>
            <ul className="space-y-4">
              {capabilities.map((cap, index) => (
                <li key={index} className={`flex items-start gap-3 ${isAr ? 'justify-start' : ''}`}>
                  <div className="w-6 h-6 rounded-full bg-[#FF6A00]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-[#FF6A00]" strokeWidth={3} />
                  </div>
                  <span className="text-base font-medium text-[#1F2937] leading-relaxed">{cap}</span>
                </li>
              ))}
            </ul>
            
            <button className={`mt-8 px-6 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg flex items-center justify-center gap-2 text-[#0F172A] text-sm font-bold hover:bg-[#FF6A00] hover:text-white hover:border-[#FF6A00] transition-all duration-300 w-full ${isAr ? 'flex-row-reverse' : ''}`}>
              {isAr ? 'تحميل ملف سابقة الأعمال (البروفايل)' : 'Download capability statement'}
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CapabilitiesSection;
