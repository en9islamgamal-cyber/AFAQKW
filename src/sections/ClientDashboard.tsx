import React, { useEffect, useState } from 'react';
// السطر ده بيستدعي ملف الربط اللي لسه عاملينه
import { supabase } from '../lib/supabase'; 

export default function ClientDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        // بنسحب كل البيانات من جدول المشاريع وبنرتبها من الأحدث للأقدم
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans" dir="rtl">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">إدارة مشاريع آفاق للتطوير</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-xl text-gray-600 font-bold animate-pulse">جاري تحميل المشاريع من قاعدة البيانات...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center border border-gray-200">
          <p className="text-gray-500 text-lg">لا توجد مشاريع حالياً. يمكنك إضافة مشروع جديد من لوحة تحكم Supabase.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-bold mb-2 text-gray-800">{project.project_name}</h2>
              <p className="text-gray-600 mb-1">📍 الموقع: {project.location || 'غير محدد'}</p>
              <p className="text-gray-600 mb-4">🛠️ الحالة: <span className="font-semibold text-blue-600">{project.status}</span></p>
              
              {/* شريط نسبة الإنجاز */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-1000" 
                  style={{ width: `${project.completion_rate || 0}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-bold">نسبة الإنجاز</span>
                <span className="text-blue-700 font-bold">{project.completion_rate || 0}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
