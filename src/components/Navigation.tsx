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
    { label: 'Portal', href: '#portal' },
    { label: 'Contact', href: '#contact' },
  ] : [
    { label: 'خدماتنا', href: '#services' },
    { label: 'مشاريعنا', href: '#projects' },
    { label: 'البوابة', href: '#portal' },
    { label: 'اتصل بنا', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    const newLang = language === 'EN' ? 'AR' : 'EN';
    localStorage.setItem('lang', newLang);
    window.location.reload(); // التحديث السريع اللي بيحمي الأنيميشن
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'bg-navy-900/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
        <div className="w-full px-6 lg:px-[7vw]">
          <div className={`flex items-center justify-between h-16 lg:h-20 ${language === 'AR' ? 'flex-row-reverse' : ''}`}>
            <a href="#" className="flex items-center hover:opacity-90 transition-opacity" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <img src="/logo-main.jpg" alt="Afaq Al-Tatweer" className="h-10 lg:h-12 w-auto object-contain" />
            </a>

            <div className={`hidden lg:flex items-center gap-8 ${language === 'AR' ? 'flex-row-reverse' : ''}`}>
              {navLinks.map((link) => (
                <button key={link.label} onClick={() => scrollToSection(link.href)} className={`text-sm text-gray-cool hover:text-white transition-colors relative group ${language === 'AR' ? 'font-bold text-base' : ''}`}>
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
              
              <button onClick={toggleLanguage} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 text-sm text-gray-cool hover:border-primary/50 hover:text-white transition-all" dir="ltr">
                <Globe className="w-4 h-4" />
                <span className="font-mono text-xs font-bold">{language === 'EN' ? 'عربي' : 'EN'}</span>
              </button>
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-white">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[99] bg-navy-900/98 backdrop-blur-lg transition-all duration-500 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} dir={language === 'AR' ? 'rtl' : 'ltr'}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <img src="/logo-main.jpg" alt="Afaq Al-Tatweer" className="h-16 w-auto object-contain mb-4" />
          {navLinks.map((link, index) => (
            <button key={link.label} onClick={() => scrollToSection(link.href)} className={`text-2xl text-white hover:text-primary transition-colors ${language === 'AR' ? 'font-bold' : 'font-heading'}`} style={{ animationDelay: `${index * 100}ms` }}>
              {link.label}
            </button>
          ))}
          <button onClick={toggleLanguage} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-gray-cool hover:border-primary/50 hover:text-white transition-all mt-4" dir="ltr">
            <Globe className="w-5 h-5" />
            <span className="font-mono font-bold">{language === 'EN' ? 'العربية' : 'English'}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;