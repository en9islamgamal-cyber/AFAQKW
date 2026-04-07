import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { MapPin, ArrowRight, ArrowLeft } from 'lucide-react';

export default function ProjectSpotlightSection() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const isAr = (localStorage.getItem('lang') || 'EN') === 'AR';

  useEffect(() => {
    const fetchActiveProjects = async () => {
      setLoading(true);
      // جلب المشاريع من الجدول
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        // ممكن تفلتر هنا عشان تظهر "قيد التنفيذ" بس لو حابب
        // .eq('status', 'قيد التنفيذ') 
        .order('created_at', { ascending: false });

      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchActiveProjects();
  }, []);

  if (loading) return <div className="py-20 text-center">جاري تحميل المشاريع...</div>;

  return (
    <section className="py-24 bg-white" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl lg:text-6xl font-black text-[#0F172A] mb-4">
            {isAr ? 'مشاريعنا' : 'Our'} <span className="text-[#FF6A00]">{isAr ? 'الجارية' : 'Projects'}</span>
          </h2>
          <div className="h-1.5 w-24 bg-[#FF6A00] rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <div key={project.id} className="group bg-[#F8F9FA] rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              {/* صورة المشروع اللي الإدارة رفعتها */}
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={project.image_url || '/placeholder_project.jpg'} 
                  alt={project.project_name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                  <span className="text-[#FF6A00] font-black text-xs uppercase">{project.status}</span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-2 text-gray-400 mb-3 font-bold text-sm">
                  <MapPin size={16} className="text-[#FF6A00]" />
                  {project.location}
                </div>
                <h3 className="text-2xl font-black text-[#0F172A] mb-4">{project.project_name}</h3>
                
                {/* شريط نسبة الإنجاز */}
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-sm font-black">
                    <span className="text-gray-500">{isAr ? 'نسبة الإنجاز' : 'Completion'}</span>
                    <span className="text-[#FF6A00]">{project.completion_rate}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#FF6A00] transition-all duration-1000 ease-out"
                      style={{ width: `${project.completion_rate}%` }}
                    ></div>
                  </div>
                </div>

                <button className="w-full py-4 bg-white border-2 border-gray-100 rounded-2xl text-[#0F172A] font-black hover:bg-[#FF6A00] hover:text-white hover:border-[#FF6A00] transition-all flex items-center justify-center gap-2">
                  {isAr ? 'تفاصيل المشروع' : 'Project Details'}
                  {isAr ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
