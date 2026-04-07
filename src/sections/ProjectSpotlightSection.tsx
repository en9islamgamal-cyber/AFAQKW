import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, MapPin, Layers, Calendar, ShieldCheck } from 'lucide-react';

interface ProjectSpotlightSectionProps { className?: string; }

const ProjectSpotlightSection = ({ className = '' }: ProjectSpotlightSectionProps) => {
  const [isAr, setIsAr] = useState(false);

  useEffect(() => {
    setIsAr((localStorage.getItem('lang') || 'EN') === 'AR');
  }, []);

  const metrics = isAr ? [
    { icon: MapPin, label: 'الموقع', value: 'حولي، الكويت' },
    { icon: Layers, label: 'الأنظمة', value: 'تهوية الحريق / مراوح سحب الدخان' },
    { icon: ShieldCheck, label: 'الاعتماد', value: 'قوة الاطفاء العام (KFF)' },
    { icon: Calendar, label: 'حالة المشروع', value: 'تم التسليم' },
  ] : [
    { icon: MapPin, label: 'Location', value: 'Hawally, Kuwait' },
    { icon: Layers, label: 'Systems', value: 'Fire Ventilation / Smoke Exhaust Fans' },
    { icon: ShieldCheck, label: 'Compliance', value: 'Kuwait Fire Force (KFF)' },
    { icon: Calendar, label: 'Status', value: 'Delivered' },
  ];

  return (
    // استخدام flex و min-h-screen بدلاً من التثبيت
    <section id="projects" className={`relative min-h-screen flex items-center bg-[#F8F9FA] py-20 overflow-hidden ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* التعديل: استخدام صورة jpg صريحة في الخلفية */}
      <img 
        src="/othman_complex.jpg" 
        alt="Al-Othman Complex Project"
        className="absolute inset-0 w-full h-full object-cover opacity-60" 
      />
      
      {/* فلتر أبيض شفاف فوق الصورة */}
      <div className="absolute inset-0 bg-white/70 pointer-events-none z-0" />

      {/* الحاوية الرئيسية */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* قسم النصوص */}
        <div className={`w-full lg:w-1/2 flex flex-col justify-center ${isAr ? 'text-right' : 'text-left'}`}>
          <h2 className="font-heading text-4xl lg:text-6xl font-black text-[#0F172A] leading-[1.05] mb-6 drop-shadow-sm">
            {isAr ? 'مجمع' : 'Al-Othman'}<br />
            <span className="text-[#FF6A00]">{isAr ? 'العثمان.' : 'Complex.'}</span>
          </h2>
          <p className={`text-[#1F2937] font-medium max-w-lg leading-relaxed ${isAr ? 'text-xl' : 'text-lg'}`}>
            {isAr ? 'توريد وتركيب أنظمة تهوية الحريق ومراوح سحب الدخان (Smoke Exhaust Fans)، وتأسيس دكتات الصاج المجلفن وفقاً لأعلى معايير السلامة.' : "Supply and installation of advanced fire ventilation and rooftop smoke exhaust fan systems, featuring heavy-duty galvanized steel ductwork."}
          </p>
          
          <div className="mt-8">
            <span className={`inline-block text-sm tracking-wide text-[#0F172A] bg-white px-5 py-2.5 rounded-full shadow-sm font-medium border border-gray-100 ${isAr ? 'font-bold' : ''}`}>
              {isAr ? 'مشاريع تجارية • أنظمة مكافحة الحريق • إلكتروميكانيك' : 'Commercial • Fire Fighting Systems • MEP'}
            </span>
          </div>
        </div>

        {/* كارت تفاصيل المشروع */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="w-full max-w-[450px] bg-white rounded-2xl shadow-xl border border-gray-200 p-6 lg:p-8 transition-transform hover:-translate-y-1 duration-300">
            <h3 className={`font-heading text-2xl text-[#0F172A] mb-6 border-b border-gray-100 pb-4 ${isAr ? 'font-black' : 'font-bold'}`}>
              {isAr ? 'إحصائيات وتفاصيل المشروع' : 'Project Metrics'}
            </h3>
            
            <div className="space-y-4">
              {metrics.map((metric, index) => (
                <div key={index} className="flex flex-col border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <div className={`flex items-center gap-2 mb-1 ${isAr ? 'flex-row-reverse w-full justify-end' : ''}`}>
                    <metric.icon className="w-4 h-4 text-[#FF6A00]" strokeWidth={2.5} />
                    <span className="text-sm font-bold text-[#1F2937]/70 uppercase tracking-wide">{metric.label}</span>
                  </div>
                  <span className={`text-base font-black text-[#0F172A] ${isAr ? 'text-right w-full block' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>

            <button className={`mt-8 px-6 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg flex items-center justify-center gap-2 text-[#0F172A] text-sm font-bold hover:bg-[#FF6A00] hover:text-white hover:border-[#FF6A00] transition-all duration-300 w-full ${isAr ? 'flex-row-reverse' : ''}`}>
              {isAr ? 'عرض تفاصيل الأعمال (Gallery)' : 'View Project Gallery'}
              {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProjectSpotlightSection;
