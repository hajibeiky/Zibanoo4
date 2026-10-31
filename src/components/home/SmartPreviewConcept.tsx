import React, { useState } from 'react';
import { Sparkles, Info, Eye, Check, SlidersHorizontal, ArrowLeft } from 'lucide-react';

export const SmartPreviewConcept: React.FC<{ onExploreSalons: () => void }> = ({ onExploreSalons }) => {
  const [activeModelGender, setActiveModelGender] = useState<'women' | 'men'>('women');
  const [selectedStyle, setSelectedStyle] = useState('style-1');

  const womenStyles = [
    { id: 'style-1', title: 'بالیاژ گرم نسکافه‌ای', tag: 'رنگ و لایت', duration: '۳ ساعت', suitability: 'مناسب فرم صورت بیضی و گندمی' },
    { id: 'style-2', title: 'کوپ باب زاویه‌دار', tag: 'کوتاهی و استایل', duration: '۴۵ دقیقه', suitability: 'ایده‌آل صورت‌های گرد و پر' },
    { id: 'style-3', title: 'شینیون بافت باز اروپایی', tag: 'میکاپ و شینیون', duration: '۷۵ دقیقه', suitability: 'مناسب مراسم و مهمانی‌های رسمی' }
  ];

  const menStyles = [
    { id: 'style-4', title: 'مید اسکین فید مدرن', tag: 'پیرایش سر', duration: '۳۵ دقیقه', suitability: 'مناسب چهره‌های مربعی و کشیده' },
    { id: 'style-5', title: 'آنکادر ریش ایتالیایی + هیرکات تکسچر', tag: 'اصلاح ریش و سر', duration: '۴۵ دقیقه', suitability: 'ایجاد تقارن و زاویه فک جذاب' },
    { id: 'style-6', title: 'استایل کلاسیک اداری سزار', tag: 'کلاسیک', duration: '۳۰ دقیقه', suitability: 'مناسب استایل‌های روزمره کاری' }
  ];

  const currentStyles = activeModelGender === 'women' ? womenStyles : menStyles;

  return (
    <section className="bg-gradient-to-br from-[#2a0e44] via-[#3b185f] to-[#1f0932] text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-amber-500/20 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              قابلیت توسعه آینده (Roadmap Phase 2)
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              پیش‌نمایش هوشمند مدل مو و آرایش (Smart Beauty Preview)
            </h2>
            <p className="text-purple-200 text-sm max-w-2xl leading-relaxed">
              راهکار زیبانو برای رفع مهم‌ترین نگرانی مشتریان در مصاحبه‌های میدانی: «نداشتن اطمینان از نتیجه مدل روی چهره خود». این قابلیت در آینده به مدل‌های بینایی ماشین متصل خواهد شد.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto bg-black/30 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => {
                setActiveModelGender('women');
                setSelectedStyle('style-1');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeModelGender === 'women'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                  : 'text-purple-200 hover:text-white'
              }`}
            >
              مدل‌های بانوان
            </button>
            <button
              onClick={() => {
                setActiveModelGender('men');
                setSelectedStyle('style-4');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeModelGender === 'men'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                  : 'text-purple-200 hover:text-white'
              }`}
            >
              مدل‌های آقایان
            </button>
          </div>
        </div>

        {/* Interactive Concept Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Active preview card */}
          <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-purple-950/50 flex items-center justify-center border border-white/10">
              <img
                src={
                  activeModelGender === 'women'
                    ? '/src/assets/images/women_beauty_services_1793464702979.jpg'
                    : '/src/assets/images/men_grooming_services_1793464703155.jpg'
                }
                alt="شبیه‌ساز مدل"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-xs">
                <span className="font-bold text-amber-300">
                  {currentStyles.find(s => s.id === selectedStyle)?.title}
                </span>
                <span className="text-[11px] bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-md">
                  پیش‌نمایش شبیه‌سازی‌شده
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-purple-200">
              <div className="flex items-center justify-between py-1 border-b border-white/10">
                <span>دسته‌بندی خدمت:</span>
                <span className="text-white font-medium">
                  {currentStyles.find(s => s.id === selectedStyle)?.tag}
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/10">
                <span>مدت تقریبی اجرای کار:</span>
                <span className="text-white font-medium">
                  {currentStyles.find(s => s.id === selectedStyle)?.duration}
                </span>
              </div>
              <div className="pt-1 text-amber-200/90 leading-relaxed">
                تحلیل تناسب چهره: {currentStyles.find(s => s.id === selectedStyle)?.suitability}
              </div>
            </div>
          </div>

          {/* Right / Style selector & Academic note */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4" />
                انتخاب استایل جهت مشاهده تحلیل تناسب
              </h3>
              <div className="space-y-2">
                {currentStyles.map((style) => {
                  const isSelected = selectedStyle === style.id;
                  return (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`w-full text-right p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-400/20 border-amber-400 text-white shadow-xs'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 text-purple-100'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-sm flex items-center gap-2">
                          <span>{style.title}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-purple-200 font-normal">
                            {style.tag}
                          </span>
                        </div>
                        <p className="text-xs text-purple-300/80 mt-1">
                          {style.suitability}
                        </p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-amber-400 bg-amber-400 text-slate-950' : 'border-white/30'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Academic transparency disclaimer */}
            <div className="p-4 rounded-xl bg-purple-950/60 border border-purple-400/20 text-xs text-purple-200 space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                <Info className="w-4 h-4 shrink-0" />
                <span>یادداشت علمی و انطباق با گزارش فاز اول:</span>
              </div>
              <p className="leading-relaxed text-purple-200/90">
                مطابق بخش هفتم و پرسش هفتم پرونده تحلیلی، قابلیت اتصال آنلاین به APIهای پردازش تصویر در نسخه فعلی (MVP فاز ۱ دانشگاهی) فعال نشده است تا از وابستگی به اینترنت بین‌الملل جلوگیری شود. در عوض ساختار ماژولار آن آماده و در فاز ۲ متصل خواهد شد.
              </p>
            </div>

            <div>
              <button
                onClick={onExploreSalons}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center gap-2"
              >
                <span>مشاهده آرایشگاه‌های ارائه‌دهنده این مدل‌ها</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
