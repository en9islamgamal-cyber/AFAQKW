import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const language = localStorage.getItem('lang') || 'EN';

  useEffect(() => {
    document.documentElement.dir = language === 'AR' ? 'rtl' : 'ltr';
    document.documentElement.lang = language === 'AR' ? 'ar' : 'en';

    if (language === 'AR') {
      document.body.classList.add('font-arabic');
    } else {
      document.body.classList.remove('font-arabic');
    }
  }, [language]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = language === 'EN' ? [
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Portal', href: '#login' },
    { label: 'Contact', href: '#contact' },
  ] : [
    { label: 'خدماتنا', href: '#services' },
    { label: 'مشاريعنا', href: '#projects' },
    { label: 'البوابة', href: '#login' },
    { label: 'اتصل بنا', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    if (href === '#login') {
      window.location.hash = '#login';
      setIsMobileMenuOpen(false);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    const newLang = language === 'EN' ? 'AR' : 'EN';
    localStorage.setItem('lang', newLang);
    window.location.reload(); 
  };

  return (
    <>
      {/* التعديل هنا: استخدام خلفية بيضاء و Shadow خفيف عند النزول */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'bg-afaq-bg/95 backdrop-blur-md border-b border-gray-light shadow-xs' : 'bg-transparent'}`}>
        <div className="w-full px-6 lg:px-[7vw]">
          <div className={`flex items-center justify-between h-16 lg:h-20 ${language === 'AR' ? 'flex-row-reverse' : ''}`}>
            
            <a href="#" className="flex items-center hover:opacity-90 transition-opacity" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <img src="/logo-main.jpg" alt="Afaq Al-Tatweer" className="h-10 lg:h-12 w-auto object-contain" />
            </a>

            <div className={`hidden lg:flex items-center gap-8 ${language === 'AR' ? 'flex-row-reverse' : ''}`}>
              {navLinks.map((link) => (
                // التعديل هنا: ألوان النصوص بقت غامقة ولون الـ hover برتقالي
                <button key={link.label} onClick={() => scrollToSection(link.href)} className={`text-sm text-afaq-textMain hover:text-afaq-orange transition-colors relative group ${language === 'AR' ? 'font-bold text-base' : 'font-medium'}`}>
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-afaq-orange transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
              
              {/* التعديل هنا: زرار اللغة بألوان فاتحة وواضحة */}
              <button onClick={toggleLanguage} className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-light text-sm text-afaq-textMain hover:border-afaq-orange hover:text-afaq-orange transition-all bg-afaq-section/50" dir="ltr">
                <Globe className="w-4 h-4" />
                <span className="font-mono text-xs font-bold">{language === 'EN' ? 'عربي' : 'EN'}</span>
              </button>
            </div>

            {/* أيقونة الموبايل منيو */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-afaq-textMain hover:text-afaq-orange transition-colors">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {/* التعديل هنا: القائمة بتاعت الموبايل بقت فاتحة عشان تليق مع الهوية */}
      <div className={`fixed inset-0 z-[99] bg-afaq-section/98 backdrop-blur-lg transition-all duration-500 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} dir={language === 'AR' ? 'rtl' : 'ltr'}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <img src="/logo-main.jpg" alt="Afaq Al-Tatweer" className="h-16 w-auto object-contain mb-4" />
          
          {navLinks.map((link, index) => (
            <button key={link.label} onClick={() => scrollToSection(link.href)} className={`text-2xl text-afaq-blue hover:text-afaq-orange transition-colors ${language === 'AR' ? 'font-bold' : 'font-heading'}`} style={{ animationDelay: `${index * 100}ms` }}>
              {link.label}
            </button>
          ))}
          
          <button onClick={toggleLanguage} className="flex items-center gap-2 px-6 py-3 rounded-full border border-afaq-blue/20 text-afaq-blue hover:border-afaq-orange hover:text-afaq-orange transition-all mt-4 bg-afaq-bg shadow-sm" dir="ltr">
            <Globe className="w-5 h-5" />
            <span className="font-mono font-bold">{language === 'EN' ? 'العربية' : 'English'}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
