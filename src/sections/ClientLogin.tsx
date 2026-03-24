import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';

interface ClientLoginProps {
  onBack?: () => void;
  onLogin?: () => void;
}

const ClientLogin = ({ onBack, onLogin }: ClientLoginProps) => {
  const isAr = (localStorage.getItem('lang') || 'EN') === 'AR';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // ضفنا دي عشان الخطأ

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // تصفير الخطأ في كل محاولة

    // التحقق من الحقول هنا بدل المتصفح
    if (!email.trim() || !password.trim()) {
      setErrorMessage(isAr ? 'برجاء إدخال البريد الإلكتروني وكلمة المرور' : 'Please enter your email and password');
      return;
    }

    setIsLoading(true);
    
    // محاكاة الاتصال بقاعدة البيانات
    setTimeout(() => {
      setIsLoading(false);
      if (onLogin) {
          onLogin(); 
      }
    }, 1500);
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0a0f1c] ${isAr ? 'rtl' : 'ltr'}`}>
      
      <div 
        className="absolute inset-0 w-full h-full opacity-20"
        style={{ 
          backgroundImage: 'url(/hero_night_cranes.jpg)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/80 to-transparent" />

      <button 
        onClick={onBack}
        className={`absolute top-8 ${isAr ? 'right-8' : 'left-8'} text-gray-400 hover:text-white flex items-center gap-2 transition-colors z-20`}
      >
        {isAr ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
        <span>{isAr ? 'العودة للموقع' : 'Back to Website'}</span>
      </button>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="glass-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          
          <div className="flex flex-col items-center justify-center mb-8">
            <img 
              src="/logo1.png" 
              alt="Afaq Logo" 
              className="w-20 mb-4" 
              style={{ filter: "drop-shadow(0px 0px 15px rgba(249, 115, 22, 0.5))" }} 
            />
            <h2 className="text-2xl font-bold text-white mb-2">
              {isAr ? 'بوابة العملاء' : 'Client Portal'}
            </h2>
            <p className="text-sm text-gray-400 text-center">
              {isAr ? 'قم بتسجيل الدخول لمتابعة تطورات مشروعك' : 'Log in to track your project progress'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* رسالة الخطأ هتظهر هنا لو موجودة */}
            {errorMessage && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                <AlertCircle className="w-5 h-5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className={`block text-sm font-medium text-gray-300 mb-2 ${isAr ? 'text-right' : 'text-left'}`}>
                {isAr ? 'اسم المستخدم أو البريد الإلكتروني' : 'Username or Email'}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isAr ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  // شيلنا كلمة required من هنا
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full bg-black/20 border ${errorMessage && !email ? 'border-red-500/50' : 'border-white/10'} rounded-lg py-3 ${isAr ? 'pr-10 pl-3 text-right' : 'pl-10 pr-3 text-left'} text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all`}
                  placeholder={isAr ? 'أدخل البريد الإلكتروني' : 'Enter your email'}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium text-gray-300 mb-2 ${isAr ? 'text-right' : 'text-left'}`}>
                {isAr ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isAr ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  // وشيلنا كلمة required من هنا كمان
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full bg-black/20 border ${errorMessage && !password ? 'border-red-500/50' : 'border-white/10'} rounded-lg py-3 ${isAr ? 'pr-10 pl-3 text-right' : 'pl-10 pr-3 text-left'} text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all`}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className={`flex items-center justify-between mt-2 ${isAr ? 'flex-row-reverse' : ''}`}>
              <a href="#" className="text-sm text-primary hover:text-orange-400 transition-colors">
                {isAr ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-primary hover:bg-orange-600 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <span className="animate-pulse">{isAr ? 'جاري الدخول...' : 'Logging in...'}</span>
              ) : (
                <>
                  {isAr ? 'دخول آمن' : 'Secure Login'}
                  <ShieldCheck className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-gray-400">
              {isAr ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
              <a href="#contact" className="text-primary hover:text-orange-400 font-medium transition-colors">
                {isAr ? 'اطلب صلاحية الدخول' : 'Request Access'}
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ClientLogin;
