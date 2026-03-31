import { useState } from 'react';
import { supabase } from '../lib/supabase';
import AddProject from './AddProject'; // استدعاء فورم إضافة المشاريع

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans" dir="rtl">
      {/* القائمة الجانبية - Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6 flex flex-col shadow-2xl">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold text-yellow-400">آفاق للتطوير</h1>
          <p className="text-xs text-blue-200 mt-1">لوحة تحكم الإدارة</p>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full text-right p-3 rounded-lg transition ${activeTab === 'projects' ? 'bg-blue-700 shadow-inner' : 'hover:bg-blue-800'}`}
          >
            📁 إدارة المشاريع
          </button>
          
          <button 
            onClick={() => setActiveTab('support')}
            className={`w-full text-right p-3 rounded-lg transition ${activeTab === 'support' ? 'bg-blue-700 shadow-inner' : 'hover:bg-blue-800'}`}
          >
            💬 خدمة العملاء
          </button>

          {/* رابط إيميل زوهو */}
          <a 
            href="https://mail.zoho.com" 
            target="_blank" 
            rel="noreferrer" 
            className="block w-full text-right p-3 rounded-lg hover:bg-blue-800 text-yellow-400 font-bold border-t border-blue-800 mt-4"
          >
            📧 بريد info@afaqkw.online
          </a>
        </nav>

        <button 
          onClick={handleLogout}
          className="w-full bg-red-600 p-3 rounded-lg font-bold hover:bg-red-700 transition mt-auto shadow-lg"
        >
          تسجيل الخروج
        </button>
      </div>

      {/* المحتوى الرئيسي - Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        {activeTab === 'projects' && (
          <div className="animate-in fade-in duration-500">
            <header className="mb-8 border-b pb-4">
              <h2 className="text-3xl font-bold text-gray-800">إدارة المشاريع الحالية</h2>
              <p className="text-gray-500">من هنا يمكنك إضافة مشاريع جديدة وتحديث نسب الإنجاز</p>
            </header>
            
            {/* استدعاء مكون إضافة المشاريع */}
            <div className="bg-white rounded-2xl shadow-sm border p-2">
              <AddProject />
            </div>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="animate-in fade-in duration-500">
            <header className="mb-8 border-b pb-4">
              <h2 className="text-3xl font-bold text-gray-800">مركز خدمة العملاء</h2>
              <p className="text-gray-500">طلبات الاستفسار والدعم الفني الواردة من الموقع</p>
            </header>
            <div className="bg-white p-20 rounded-2xl shadow-inner border border-dashed border-gray-300 text-center">
              <p className="text-gray-400 text-lg">لا توجد رسائل جديدة من العملاء حالياً.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
