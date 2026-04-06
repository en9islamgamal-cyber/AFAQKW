import React, { useState } from 'react';
import { supabase } from '../lib/supabase'; 
import { Building2, Lock, Mail, AlertCircle, Rocket } from 'lucide-react'; 

export default function Login({ onLoginSuccess }: { onLoginSuccess: (role: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });

      if (authError) {
        setErrorMsg('بيانات الدخول غير صحيحة، تأكد من البريد وكلمة المرور');
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .maybeSingle();

      onLoginSuccess(profile?.role || 'client');
      
    } catch (err) {
      setErrorMsg('حدث خطأ في الاتصال بالنظام، يرجى المحاولة لاحقاً');
    } finally {
      setLoading(false);
    }
  };

  return (
    // التعديل: خلفية فاتحة وناعمة تليق بالتصميم الجديد
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] px-4 font-arabic" dir="rtl">
      <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 w-full max-w-md border border-gray-100 relative overflow-hidden">
        
        {/* لمسة ديكور علوية */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF6A00] to-[#0F172A]"></div>

        <div className="text-center mb-10">
          <div className="bg-[#FF6A00]/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-[#FF6A00]/10">
            <Building2 className="text-[#FF6A00]" size={40} />
          </div>
          <h2 className="text-3xl font-black text-[#0F172A] tracking-tight">بوابة <span className="text-[#FF6A00]">آفاق</span></h2>
          <p className="text-gray-500 mt-2 font-bold text-sm">نظام إدارة المشاريع والمقاولات</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border-r-4 border-red-500 text-red-700 flex items-center gap-3 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertCircle size={20} className="flex-shrink-0" />
            <span className="text-xs font-black leading-relaxed">{errorMsg}</span>
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-black text-[#0F172A] uppercase tracking-widest mb-1 mr-1">
              <Mail size={14} className="text-[#FF6A00]" />
              البريد الإلكتروني
            </label>
            <input 
              type="email" 
              placeholder="example@afaq.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              className="w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-[#FF6A00] focus:ring-4 focus:ring-[#FF6A00]/5 bg-gray-50 text-[#0F172A] font-bold transition-all placeholder:text-gray-300 shadow-sm" 
              required 
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-black text-[#0F172A] uppercase tracking-widest mb-1 mr-1">
              <Lock size={14} className="text-[#FF6A00]" />
              كلمة المرور
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              className="w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-[#FF6A00] focus:ring-4 focus:ring-[#FF6A00]/5 bg-gray-50 text-[#0F172A] font-bold transition-all placeholder:text-gray-300 shadow-sm" 
              required 
            />
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-[#0F172A] text-white py-5 rounded-2xl font-black text-xl hover:bg-[#FF6A00] transition-all shadow-xl shadow-gray-200 hover:shadow-[#FF6A00]/20 active:scale-95 disabled:bg-gray-300 flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  دخول النظام
                  <Rocket size={22} className="group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-10 text-center">
          <p className="text-gray-400 text-xs font-bold">
            &copy; {new Date().getFullYear()} شركة آفاق التطوير للمقاولات العامة
          </p>
        </div>
      </div>
    </div>
  );
}
