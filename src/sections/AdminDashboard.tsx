import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import AddProject from './AddProject'; // إنشاء عميل
import ManageProjects from './ManageProjects'; // تحديث المشاريع
import InboundInquiries from './InboundInquiries'; // السكشن الجديد

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('create');

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans" dir="rtl">
      
      {/* القائمة الجانبية */}
      <div className="w-72 bg-[#0a0f1c] text-white p-6 flex flex-col shadow-2xl">
        <div className="mb-10 text-center border-b border-white/10 pb-6">
          <h1 className="text-3xl font-extrabold text-[#e86024] tracking-tight">آفاق للتطوير</h1>
          <p className="text-xs text-slate-400 mt-2">لوحة تحكم الإدارة العليا</p>
        </div>

        <nav className="flex-1 space-y-3">
          <button onClick={() => setActiveTab('create')} className={`w-full text-right p-4 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'create' ? 'bg-[#e86024] text-white shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
            <span className="text-xl">➕</span><span className="font-bold">تأسيس عميل/مشروع</span>
          </button>
          
          <button onClick={() => setActiveTab('manage')} className={`w-full text-right p-4 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'manage' ? 'bg-[#e86024] text-white shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
            <span className="text-xl">🔄</span><span className="font-bold">تحديث المشاريع الجارية</span>
          </button>
          
          <button onClick={() => setActiveTab('support')} className={`w-full text-right p-4 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'support' ? 'bg-[#e86024] text-white shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
            <span className="text-xl">📩</span><span className="font-bold">طلبات التسعير</span>
          </button>
        </nav>

        <button onClick={handleLogout} className="w-full bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all mt-auto flex items-center justify-center gap-2">
          <span>🚪</span> تسجيل الخروج
        </button>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          {/* عرض المكون بناءً على التاب النشط */}
          {activeTab === 'create' && <AddProject />}
          
          {activeTab === 'manage' && <ManageProjects />}
          
          {/* التعديل هنا: عرض طلبات التسعير لما نضغط على تاب الرسائل */}
          {activeTab === 'support' && <InboundInquiries />}

        </div>
      </div>
    </div>
  );
}
