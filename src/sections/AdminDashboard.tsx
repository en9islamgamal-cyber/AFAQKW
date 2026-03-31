import { useState } from 'react';
import { supabase } from '../lib/supabase';
import AddProject from './AddProject'; // الخانات المختفية موجودة جوه الملف ده

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');

  const handleLogout = async () => {
    const confirmLogout = window.confirm("هل أنت متأكد من تسجيل الخروج؟");
    if (confirmLogout) {
      await supabase.auth.signOut();
      window.location.reload();
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-right" dir="rtl">
      
      {/* القائمة الجانبية - Sidebar */}
      <div className="w-72 bg-blue-950 text-white p-6 flex flex-col shadow-2xl">
        <div className="mb-10 text-center border-b border-blue-900 pb-6">
          <h1 className="text-3xl font-extrabold text-yellow-400 tracking-tight">آفاق للتطوير</h1>
          <div className="bg-yellow-400 h-1 w-12 mx-auto mt-2 rounded-full"></div>
          <p className="text-xs text-blue-300 mt-3 font-medium uppercase tracking-widest">لوحة تحكم الإدارة</p>
        </div>

        <nav className="flex-1 space-y-3">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full text-right p-4 rounded-xl flex items-center gap-3 transition-all duration-300 ${
              activeTab === 'projects' 
              ? 'bg-blue-800 text-white shadow-lg translate-x-2' 
              : 'text-blue-200 hover:bg-blue-900 hover:text-white'
            }`}
          >
            <span className="text-xl">📊</span>
            <span className="font-bold">إدارة المشاريع</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('support')}
            className={`w-full text-right p-4 rounded-xl flex items-center gap-3 transition-all duration-300 ${
              activeTab === 'support' 
              ? 'bg-blue-800 text-white shadow-lg translate-x-2' 
              : 'text-blue-200 hover:bg-blue-900 hover:text-white'
            }`}
          >
            <span className="text-xl">💬</span>
            <span className="font-bold">خدمة العملاء</span>
          </button>

          <div className="pt-6 mt-6 border-t border-blue-900">
            <p className="text-xs text-blue-400 mb-3 px-2">روابط سريعة</p>
            <a 
              href="https://mail.zoho.com" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-3 p-4 rounded-xl text-yellow-400 hover:bg-blue-900 transition-all border border-yellow-400/20"
            >
              <span className="text-xl">📧</span>
              <span className="text-sm font-semibold truncate">بريد info@afaqkw.online</span>
            </a>
          </div>
        </nav>

        <button 
          onClick={handleLogout}
          className="w-full bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all duration-300 mt-auto flex items-center justify-center gap-2"
        >
          <span>🚪</span>
          تسجيل الخروج
        </button>
      </div>

      {/* المحتوى الرئيسي - Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          
          {activeTab === 'projects' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <header className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-black text-slate-800">إدارة المشاريع الحالية</h2>
                  <p className="text-slate-500 mt-1 italic">أضف مشاريعك الجديدة وحدث حالة الإنجاز لعملائك</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full text-blue-600 text-2xl">🏗️</div>
              </header>
              
              {/* هنا يتم استدعاء فورم إضافة المشاريع - المحتوى اللي محتاج تعديل ألوان */}
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="p-8">
                  <AddProject />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'support' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 text-center py-20">
              <div className="bg-white p-12 rounded-3xl shadow-sm border border-dashed border-slate-300 inline-block max-w-lg">
                <div className="text-6xl mb-6">📩</div>
                <h2 className="text-2xl font-bold text-slate-700 mb-2">مركز خدمة العملاء</h2>
                <p className="text-slate-400">لا توجد رسائل جديدة من العملاء حالياً. سيتم إخطارك هنا فور وصول أي استفسار.</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
