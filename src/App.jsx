import React, { useState } from 'react';
import profileImg from './assets/vai-logo.png';
import { 
  Linkedin, 
  FileText, 
  Phone,
  Mail,
  MessageCircle,
  UserPlus 
} from 'lucide-react';

const App = () => {
  const [lang, setLang] = useState('en');
  const isRtl = lang === 'ar';

  const userData = {
    firstName: "Mosad",
    lastName: "Ali",
    fullNameEn: "Mosad Ali",
    fullNameAr: "مسعد علي",
    phone: "+201119222530",
    whatsapp: "https://wa.me/201119222530",
    email: "mosad.ali@vaidevelopments.com", 
    linkedin: "https://www.linkedin.com/in/mosad-ali-aa528b208/",
  };

  const downloadVCard = () => {
    // اختيار الاسم بناءً على اللغة الحالية لضمان الحفظ الصحيح
    const displayName = isRtl ? userData.fullNameAr : userData.fullNameEn;
    const lastName = isRtl ? "" : userData.lastName;
    const firstName = isRtl ? userData.fullNameAr : userData.firstName;

    const vcardContent = `BEGIN:VCARD
VERSION:3.0
FN:${displayName}
N:${lastName};${firstName};;;
TEL;TYPE=CELL:${userData.phone}
EMAIL;TYPE=INTERNET:${userData.email}
ORG:VAI Development
TITLE:Head of Sales
END:VCARD`;

    const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${displayName}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const content = {
    en: {
      name: "Mosad Ali",
      role: "Head Of Sales @ VAI Development",
      skills: ["Sales Strategy", "Business Development", "CRM", "Client Relations"],
      resume: "Download CV",
      saveBtn: "Save Contact",
      callBtn: "Direct Call",
      expertise: "Expertise",
      status: "AVAILABLE"
    },
    ar: {
      name: "مسعد علي",
      role: "مدير قطاع المبيعات @ VAI Development",
      skills: ["إدارة المبيعات", "تطوير الأعمال", "إدارة علاقات العملاء", "التفاوض العقاري"],
      resume: "السيرة الذاتية",
      saveBtn: "حفظ جهة الاتصال",
      callBtn: "اتصال مباشر",
      expertise: "المهارات والخبرات",
      status: "متاح للتواصل"
    }
  };

  const t = content[lang];

  return (
    <div
      className={`min-h-screen bg-[#050505] text-white p-6 md:p-12 transition-all duration-500 ${
        isRtl ? 'font-arabic' : 'font-sans'
      }`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-600/10 blur-[100px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <nav className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold tracking-[0.2em]">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            {t.status}
          </div>
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="bg-white text-black px-6 py-2 rounded-full font-black text-[10px] uppercase hover:invert transition-all"
          >
            {lang === 'ar' ? 'English' : 'العربية'}
          </button>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] p-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl overflow-hidden ring-4 ring-white/5 bg-gradient-to-br from-gray-800 to-black">
                <img
                  src={profileImg} 
                  alt={t.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Mosad"; }}
                />
              </div>
            </div>
            <div className={`text-center ${isRtl ? 'md:text-right' : 'md:text-left'}`}>
              <h1 className="text-4xl font-bold mb-3 tracking-tight">{t.name}</h1>
              <p className="text-blue-500 font-semibold">{t.role}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={downloadVCard}
              className="flex items-center justify-between p-5 bg-blue-600 rounded-[1.8rem] hover:bg-blue-500 transition-all group active:scale-95 shadow-lg shadow-blue-600/20"
            >
              <div className="flex items-center gap-4">
                <UserPlus size={24} />
                <span className="font-bold">{t.saveBtn}</span>
              </div>
            </button>

            <a
              href={`tel:${userData.phone}`}
              className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-[1.8rem] hover:bg-white hover:text-black transition-all"
            >
              <Phone size={20} />
              <span className="font-medium text-sm">{t.callBtn}</span>
            </a>

            <div className="grid grid-cols-2 gap-4">
              <a href={`mailto:${userData.email}`} className="flex items-center justify-center p-5 bg-white/5 border border-white/10 rounded-[1.8rem] hover:bg-red-500 transition-all group">
                <Mail size={20} />
              </a>
              <a href={userData.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-center p-5 bg-white/5 border border-white/10 rounded-[1.8rem] hover:bg-[#0077b5] transition-all group">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] p-8">
            <h3 className="text-[10px] font-black text-gray-600 uppercase mb-6 tracking-[0.3em]">
              {t.expertise}
            </h3>
            <div className="flex flex-wrap gap-2">
              {t.skills.map((skill) => (
                <span key={skill} className="px-4 py-2 bg-white/[0.03] border border-white/5 rounded-2xl text-[11px] font-medium hover:border-blue-500/30 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 flex gap-4">
            <a
              href="#" 
              className="flex-1 bg-white text-black py-6 rounded-[2rem] flex items-center justify-center gap-3 font-black text-sm uppercase tracking-tighter hover:bg-gray-200 transition-all"
            >
              <FileText size={20} /> {t.resume}
            </a>

            <a
              href={userData.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] px-10 rounded-[2rem] flex items-center justify-center hover:scale-[1.05] transition-all shadow-[0_20px_40px_-15px_rgba(37,211,102,0.3)]"
            >
              <MessageCircle size={24} fill="white" />
            </a>
          </div>
        </div>

        <footer className="mt-24 pb-12 text-center opacity-20 text-[8px] font-bold tracking-[0.8em] uppercase">
          Built by CraftHub © 2026
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&family=Inter:wght@400;700;900&display=swap');
        .font-arabic { font-family: 'Cairo', sans-serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        body { background-color: #050505; margin: 0; }
      `}} />
    </div>
  );
};

export default App;
