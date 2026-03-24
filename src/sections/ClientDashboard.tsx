import React from 'react';
// مسحنا استدعاء مكتبة الدائرة من هنا
import { Users, Wallet, Camera, LogOut, FileText, CheckCircle } from 'lucide-react';

// بيانات وهمية للتجربة (في المستقبل هتيجي من الـ Backend)
const projectData = {
  clientName: "م. إسلام",
  projectName: "فيلا السالمية",
  progress: 65,
  workersToday: 12,
  payments: {
    total: "50,000 د.ك",
    paid: "30,000 د.ك",
    remaining: "20,000 د.ك"
  },
  photos: [
    "https://images.unsplash.com/photo-1541888081643-eb0429a32c45?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=400&auto=format&fit=crop"
  ]
};

const ClientDashboard = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-[#0f1115] text-white p-4 md:p-8" dir="rtl">
      
      {/* رأس الصفحة (Header) */}
      <header className="flex justify-between items-center mb-10 bg-[#161a23] p-6 rounded-2xl border border-gray-800 shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">أهلاً بك، {projectData.clientName}</h1>
          <p className="text-gray-400 text-sm flex items-center gap-2">
            <FileText size={16} /> مشروع: {projectData.projectName}
          </p>
        </div>
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 bg-red-400/10 rounded-lg hover:bg-red-400/20 transition-all"
        >
          <LogOut size={18} />
          تسجيل الخروج
        </button>
      </header>

      {/* الكروت الإحصائية (Stats Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* كارت نسبة الإنجاز */}
        <div className="bg-[#161a23] p-6 rounded-2xl border border-gray-800 shadow-lg flex flex-col items-center justify-center">
          <h3 className="text-gray-400 text-sm font-medium mb-4 flex items-center gap-2 w-full">
            <CheckCircle size={18} className="text-[#f97316]" /> نسبة الإنجاز
          </h3>
          <div className="w-full">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white font-bold">{projectData.progress}%</span>
              <span className="text-gray-500">100%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3">
              <div 
                className="bg-[#f97316] h-3 rounded-full transition-all duration-1000" 
                style={{ width: `${projectData.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* كارت الدفعات المالية */}
        <div className="bg-[#161a23] p-6 rounded-2xl border border-gray-800 shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium mb-4 flex items-center gap-2">
            <Wallet size={18} className="text-[#f97316]" /> الموقف المالي
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-sm text-gray-400">إجمالي العقد:</span>
              <span className="font-bold text-white">{projectData.payments.total}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-sm text-gray-400">المدفوع:</span>
              <span className="font-bold text-green-400">{projectData.payments.paid}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">المتبقي:</span>
              <span className="font-bold text-red-400">{projectData.payments.remaining}</span>
            </div>
          </div>
        </div>

        {/* كارت العمالة اليومية */}
        <div className="bg-[#161a23] p-6 rounded-2xl border border-gray-800 shadow-lg flex flex-col justify-center items-center text-center">
          <h3 className="text-gray-400 text-sm font-medium mb-4 flex items-center gap-2 w-full justify-start">
            <Users size={18} className="text-[#f97316]" /> العمالة في الموقع (اليوم)
          </h3>
          <div className="text-5xl font-extrabold text-white mb-2">
            {projectData.workersToday}
          </div>
          <span className="text-sm text-gray-500">فني وعامل متواجدين حالياً</span>
        </div>

      </div>

      {/* معرض الصور (Site Photos) */}
      <div className="bg-[#161a23] p-6 rounded-2xl border border-gray-800 shadow-lg">
        <h3 className="text-white font-bold mb-6 flex items-center gap-2 text-lg">
          <Camera size={22} className="text-[#f97316]" /> تحديثات الموقع المصورة
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {projectData.photos.map((photo, index) => (
            <div key={index} className="relative group overflow-hidden rounded-xl">
              <img 
                src={photo} 
                alt={`صورة الموقع ${index + 1}`} 
                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium px-4 py-2 bg-[#f97316] rounded-full">تكبير الصورة</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ClientDashboard;
