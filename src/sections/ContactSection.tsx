import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, ArrowRight, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps { className?: string; }

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  
  const isAr = (localStorage.getItem('lang') || 'EN') === 'AR';

  const [formData, setFormData] = useState({ name: '', email: '', company: '', projectType: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(leftColRef.current, { x: isAr ? '6vw' : '-6vw', opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none reverse' } });
      gsap.fromTo(formCardRef.current, { x: isAr ? '-6vw' : '6vw', y: '3vh', opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.8, delay: 0.2, scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none reverse' } });
    }, section);
    return () => ctx.revert();
  }, [isAr]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', company: '', projectType: '', message: '' });
  };

  const contactInfo = isAr ? [
    { icon: Mail, label: 'البريد الإلكتروني', value: 'info@afaqaltatweer.com' },
    { icon: Phone, label: 'الهاتف', value: '+965 — --- ----' },
    { icon: MapPin, label: 'الموقع', value: 'الكويت' },
  ] : [
    { icon: Mail, label: 'Email', value: 'info@afaqaltatweer.com' },
    { icon: Phone, label: 'Phone', value: '+965 — --- ----' },
    { icon: MapPin, label: 'Location', value: 'Kuwait' },
  ];

  return (
    <section id="contact" ref={sectionRef} className={`relative bg-navy-800 py-20 lg:py-32 ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="px-6 lg:px-[7vw]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div ref={leftColRef} className={`lg:w-[45%] lg:pt-8 ${isAr ? 'text-right' : 'text-left'}`}>
            <h2 className="font-heading text-section font-bold text-white leading-[1.05] mb-6">
              {isAr ? 'دعنا نبني' : "Let's build your"}<br />
              <span className="text-primary">{isAr ? 'مشروعك القادم.' : 'next project.'}</span>
            </h2>
            <p className={`text-body text-gray-cool mb-10 leading-relaxed max-w-md ${isAr ? 'text-lg' : ''}`}>
              {isAr ? 'أخبرنا بمخططاتك. سنقوم بالرد خلال يومي عمل بنطاق عمل واضح والخطوات التالية للبدء.' : "Tell us what you're planning. We'll respond within two business days with a clear scope and next steps."}
            </p>

            <div className="space-y-5 mb-10">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className={isAr ? 'text-right' : 'text-left'}>
                    <span className="block text-xs text-gray-cool uppercase tracking-wider font-bold">{item.label}</span>
                    <span className="text-sm text-white" dir="ltr">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-cool">
              {isAr ? 'تفضل البريد الإلكتروني؟ أرفق نطاق العمل وسنقوم بمراجعته فوراً.' : "Prefer email? Attach your scope and we'll review it immediately."}
            </p>
          </div>

          <div ref={formCardRef} className={`lg:w-[55%] ${isAr ? 'lg:pr-8 text-right' : 'lg:pl-8 text-left'}`}>
            <div className="bg-navy-900 border border-white/10 rounded-xl p-6 lg:p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <Send className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white mb-3">
                    {isAr ? 'تم إرسال رسالتك!' : 'Message Sent!'}
                  </h3>
                  <p className="text-sm text-gray-cool">
                    {isAr ? 'شكراً لتواصلك معنا. سنقوم بالرد عليك خلال يومي عمل.' : "Thank you for reaching out. We'll get back to you within two business days."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-gray-cool mb-2 tracking-wider font-bold">{isAr ? 'الاسم' : 'Name'}</label>
                      <Input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder={isAr ? 'اسمك' : 'Your name'} required className={`bg-white/5 border-white/10 text-white placeholder:text-gray-cool/50 focus:border-primary ${isAr ? 'text-right' : 'text-left'}`} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-cool mb-2 tracking-wider font-bold">{isAr ? 'البريد الإلكتروني' : 'Email'}</label>
                      <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder={isAr ? 'بريدك الإلكتروني' : 'your@email.com'} required className={`bg-white/5 border-white/10 text-white placeholder:text-gray-cool/50 focus:border-primary ${isAr ? 'text-right' : 'text-left'}`} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-gray-cool mb-2 tracking-wider font-bold">{isAr ? 'الشركة' : 'Company'}</label>
                      <Input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder={isAr ? 'اسم شركتك' : 'Your company'} className={`bg-white/5 border-white/10 text-white placeholder:text-gray-cool/50 focus:border-primary ${isAr ? 'text-right' : 'text-left'}`} />
                    </div>
                    <div dir={isAr ? 'rtl' : 'ltr'}>
                      <label className="block text-xs text-gray-cool mb-2 tracking-wider font-bold">{isAr ? 'نوع المشروع' : 'Project Type'}</label>
                      <Select value={formData.projectType} onValueChange={(value) => setFormData({ ...formData, projectType: value })}>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-primary">
                          <SelectValue placeholder={isAr ? 'اختر النوع' : 'Select type'} />
                        </SelectTrigger>
                        <SelectContent className="bg-navy-800 border-white/10" dir={isAr ? 'rtl' : 'ltr'}>
                          <SelectItem value="mep">{isAr ? 'أنظمة كهروميكانيكية (MEP)' : 'MEP Systems'}</SelectItem>
                          <SelectItem value="construction">{isAr ? 'مقاولات عامة' : 'General Construction'}</SelectItem>
                          <SelectItem value="infrastructure">{isAr ? 'بنية تحتية' : 'Infrastructure'}</SelectItem>
                          <SelectItem value="fitout">{isAr ? 'تشطيبات داخلية' : 'Interior Fit-out'}</SelectItem>
                          <SelectItem value="other">{isAr ? 'أخرى' : 'Other'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-cool mb-2 tracking-wider font-bold">{isAr ? 'الرسالة' : 'Message'}</label>
                    <Textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder={isAr ? 'حدثنا عن مشروعك...' : 'Tell us about your project...'} rows={4} required className={`bg-white/5 border-white/10 text-white placeholder:text-gray-cool/50 focus:border-primary resize-none ${isAr ? 'text-right' : 'text-left'}`} />
                  </div>

                  <button type="submit" disabled={isSubmitting} className={`w-full btn-primary gap-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${isAr ? 'flex-row-reverse' : ''}`}>
                    {isSubmitting ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {isAr ? 'جاري الإرسال...' : 'Sending...'}</>
                    ) : (
                      <>{isAr ? 'إرسال الاستفسار' : 'Send inquiry'} {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;