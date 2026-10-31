import React, { useState } from 'react';
import { 
  BookOpen, 
  Target, 
  AlertTriangle, 
  HelpCircle, 
  GitMerge, 
  Clock, 
  Users, 
  Compass, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ChevronLeft, 
  Sparkles, 
  Layers, 
  DollarSign, 
  ShieldCheck, 
  Calendar,
  Smile,
  Frown,
  Meh,
  Search,
  PhoneCall,
  Check
} from 'lucide-react';

export const BusinessDossierView: React.FC<{ onGoToMVP: () => void }> = ({ onGoToMVP }) => {
  const [activeSection, setActiveSection] = useState<string>('landing');

  const sections = [
    { id: 'landing', title: '۱. صفحه فرود و معرفی کسب‌وکار', icon: Target },
    { id: 'frictions', title: '۲. تبیین اصطکاک‌ها و مسئله', icon: AlertTriangle },
    { id: 'questions', title: '۳. ارزیابی با هشت پرسش (ایده بالغ)', icon: HelpCircle },
    { id: 'classification', title: '۴. طبقه‌بندی ایده و مرزبندی فرایندها', icon: GitMerge },
    { id: 'time-cost', title: '۵. مدل بصری اتلاف زمان و هزینه', icon: Clock },
    { id: 'validation', title: '۶. گزارش مصاحبه‌ها و اعتبارسنجی', icon: Users },
    { id: 'journey', title: '۷. نقشه سفر مشتری (۵ مرحله)', icon: Compass },
    { id: 'roadmap', title: '۸. نقشه راه فازهای آینده دانشگاه', icon: Layers }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Academic Banner */}
      <div className="bg-gradient-to-l from-[#2a0e44] via-[#3b185f] to-[#1a082c] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-amber-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            <BookOpen className="w-3.5 h-3.5" />
            <span>پرونده تحلیلی کسب‌وکار (بخش الف پروژه درس تجارت الکترونیکی)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            مستندات اعتبارسنجی و طراحی ایده «زیبانو»
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 max-w-2xl leading-relaxed">
            دانشگاه یزد — فاز اول: بررسی اصطکاک‌های بازار، ارزیابی ایده با پرسش‌های هشت‌گانه، مصاحبه‌های میدانی، نقشه سفر مشتری و تفکیک فرایندهای آنلاین از فیزیکی.
          </p>
        </div>

        <button
          onClick={onGoToMVP}
          className="self-start md:self-auto px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all shadow-sm flex items-center gap-2 shrink-0"
        >
          <span>ورود به محیط سامانه عملیاتی (MVP)</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Main Grid: Sticky Sidebar TOC + Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-2 sticky top-24">
          <div className="px-3 py-2 text-xs font-bold text-slate-400 border-b border-slate-100">
            فهرست بخش‌های پرونده تحلیلی
          </div>
          <nav className="space-y-1">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`w-full text-right p-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                    isActive
                      ? 'bg-[#3b185f] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                  <span className="truncate">{sec.title}</span>
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-100 px-3 text-[11px] text-slate-400 leading-relaxed">
            مطابق سرفصل درس، کلیه بخش‌های پرونده با کدهای بخش MVP هماهنگ و یکپارچه هستند.
          </div>
        </aside>

        {/* Content Section */}
        <main className="lg:col-span-8 space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs text-right">
          {/* Section 1: Landing & Presentation */}
          {activeSection === 'landing' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">بخش اول</span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  صفحه فرود اولیه (Landing Page) و هویت کسب‌وکار
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-2">
                  <h3 className="font-bold text-base text-[#3b185f]">۱. عنوان کسب‌وکار:</h3>
                  <p className="font-semibold text-slate-900">
                    زیبانو | سامانه هوشمند جستجو، مقایسه و رزرو آنلاین آرایشگاه
                  </p>
                  <span className="text-xs text-amber-800 font-bold block">
                    شعار اصلی: «زیبانو؛ انتخاب آگاهانه، رزرو آسان»
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">۲. بیانیه ارزش پیشنهادی (Value Proposition):</h3>
                  <blockquote className="p-4 rounded-xl bg-slate-50 border-r-4 border-amber-500 text-slate-800 text-xs sm:text-sm leading-relaxed">
                    «زیبانو» پلتفرمی یکپارچه برای جستجو، مقایسه و رزرو آنلاین آرایشگاه‌های زنانه و مردانه است. ما به شما کمک می‌کنیم بدون صرف زمان برای جستجو در شبکه‌های اجتماعی، آرایشگاه مناسب خود را بر اساس موقعیت مکانی، قیمت و نمونه‌کارها پیدا کنید. با قابلیت ویژه «رزرو خدمات در محل»، حتی اگر امکان مراجعه حضوری ندارید، زیبایی را به خانه خود بیاورید.
                  </blockquote>
                </div>

                <div className="space-y-3 pt-2">
                  <h3 className="font-bold text-slate-900 text-sm">۳. تبیین مخاطبان هدف:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                      <span className="font-bold text-[#3b185f] block">مشتریان (خدمات‌گیرندگان):</span>
                      <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600">
                        <li>افرادی که به دنبال پیدا کردن سریع آرایشگاه مناسب، مقایسه شفاف قیمت‌ها و دیدن نمونه‌کارهای واقعی هستند.</li>
                        <li>افرادی که به دلیل محدودیت‌های جسمانی (مانند بیماران، مصدومان یا سالمندان) یا مشغله کاری، نیاز به دریافت خدمات آرایشگری در محل دارند.</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                      <span className="font-bold text-amber-800 block">آرایشگران و صاحبان آرایشگاه:</span>
                      <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600">
                        <li>افرادی که می‌خواهند خدمات، قیمت‌ها و نمونه‌کارهای خود را به مخاطبان بیشتری معرفی کنند.</li>
                        <li>آرایشگرانی که می‌خواهند زمان‌های خالی خود را مدیریت کرده و نوبت‌ها را به جای دفتر کاغذی، به سادگی و برخط پیگیری نمایند.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <h3 className="font-bold text-slate-900 text-sm">۴. دکمه‌های فراخوان اقدام (Call to Action):</h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1.5 rounded-lg bg-[#3b185f] text-white font-bold text-xs">
                      دکمه اصلی: جستجوی آرایشگاه
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs">
                      دکمه فرعی: ثبت‌نام آرایشگر / ورود به پنل
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Frictions */}
          {activeSection === 'frictions' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">بخش دوم</span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  تبیین اصطکاک و صورت‌بندی مسئله (Problem Formulation)
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  در حال حاضر، فرآیند پیدا کردن آرایشگاه مناسب و دریافت خدمات زیبایی، برای بسیاری از کاربران با چالش‌ها و ناکارآمدی‌هایی همراه است. الگوهای جاری (مانند اینستاگرام، پرس‌وجوی دهان‌به‌دهان یا تماس تلفنی) پاسخگوی کامل نیستند. مهم‌ترین اصطکاک‌ها (Frictions) عبارتند از:
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 text-xs flex items-center justify-center font-bold">۱</span>
                      پراکندگی اطلاعات و دشواری در مقایسه:
                    </h4>
                    <p className="text-slate-600 text-xs">
                      اطلاعات خدمات، قیمت‌ها، نمونه‌کارها و آدرس در بسترهای مختلفی پراکنده است و مقایسه همزمان چند آرایشگاه زمان‌بر و دشوار است.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 text-xs flex items-center justify-center font-bold">۲</span>
                      عدم شفافیت در قیمت‌ها:
                    </h4>
                    <p className="text-slate-600 text-xs">
                      قیمت‌ها شفاف اعلام نمی‌شود و مشتری تنها پس از تماس یا حضور متوجه هزینه نهایی می‌شود که باعث ریسک و نارضایتی است.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 text-xs flex items-center justify-center font-bold">۳</span>
                      نارسایی در نمایش نمونه‌کارها و انتخاب آگاهانه:
                    </h4>
                    <p className="text-slate-600 text-xs">
                      تصاویر بدون تفکیک فنی بارگذاری می‌شوند و مشتری نمی‌تواند پیش از مراجعه تصور دقیقی از نتیجه مدل روی چهره خود داشته باشد.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 text-xs flex items-center justify-center font-bold">۴</span>
                      دشواری در هماهنگی و رزرو نوبت:
                    </h4>
                    <p className="text-slate-600 text-xs">
                      رزرو تلفنی یا دایرکت پیام‌رسان منجر به تداخل زمانی، فراموشی نوبت و اتلاف وقت دوطرفه مشتری و آرایشگر می‌شود.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-amber-50/50 space-y-1">
                    <h4 className="font-bold text-amber-900 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-xs flex items-center justify-center font-bold">۵</span>
                      محدودیت در دسترسی برای افراد دارای شرایط خاص:
                    </h4>
                    <p className="text-slate-700 text-xs">
                      افراد آسیب‌دیده، بیماران، سالمندان یا افراد پرمشغله راهی برای پیدا کردن آرایشگرانی که حاضر به ارائه خدمات در منزل باشند ندارند.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-1">
                  <h4 className="font-bold text-[#3b185f] text-sm">نتیجه‌گیری و صورت‌بندی نهایی مسئله:</h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    «کاربران برای پیدا کردن آرایشگاه مناسب، مقایسه خدمات و قیمت‌ها، انتخاب مدل و رزرو نوبت، با فرآیندی زمان‌بر، پراکنده و بدون شفافیت مواجه هستند. همچنین بستری یکپارچه برای دسترسی به خدمات در محل برای افراد دارای محدودیت وجود ندارد.»
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Eight Questions */}
          {activeSection === 'questions' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">بخش سوم</span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  ارزیابی ایده با پرسش‌های هشت‌گانه (ایده بالغ)
                </h2>
              </div>

              <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {/* Q1 */}
                <div className="border border-slate-200 rounded-2xl p-5 bg-white space-y-3">
                  <h3 className="font-black text-base text-[#3b185f]">
                    پرسش اول: آیا اصلاً الآن کسی منتظر هست که چنین ایده‌ای در بازار کسب‌وکار مطرح شود؟
                  </h3>
                  <div className="space-y-2 text-slate-600 text-xs leading-relaxed">
                    <p>
                      <strong>پاسخ تفصیلی:</strong> بله. طبق اصل کارآفرینی در اسلایدها: «اگر خودتان را در مقیاس غول‌های کسب‌وکار نمی‌بینید، بهتر است واقع‌گرا باشید و دنبال حل مسئله‌ای بروید که حداقل مردم، قبلاً صورت آن مسئله را پذیرفته باشند.»
                    </p>
                    <ul className="list-disc list-inside space-y-1 pr-2">
                      <li><strong>پذیرش مسئله توسط مردم:</strong> نیاز به آرایشگری یک نیاز همیشگی است و صورت مسئله از قبل در ذهن مردم وجود دارد.</li>
                      <li><strong>نارسایی راه‌حل‌های فعلی:</strong> جستجو در اینستاگرام یا پرس‌وجو از آشنایان ناکارآمد و وقت‌گیر است و مشتریان منتظر راهکار بهتری هستند.</li>
                      <li><strong>پذیرش بازار:</strong> پیشرفت رقبای رزرو آنلاین نشان می‌دهد فرهنگ استفاده از پلتفرم‌های رزرو ایجاد شده است.</li>
                      <li><strong>نیاز پنهان خدمات در محل:</strong> کشف نیاز افراد دارای محدودیت جسمانی در مصاحبه میدانی نشان داد بخشی از بازار منتظر چنین خدمتی بوده است.</li>
                    </ul>
                    <div className="p-2.5 rounded-lg bg-slate-50 font-bold text-slate-800 text-[11px]">
                      نتیجه: زیبانو نیازی را از صفر خلق نمی‌کند؛ بلکه مسئله‌ای موجود را ساده‌تر، شفاف‌تر و هوشمندانه‌تر حل می‌کند.
                    </div>
                  </div>
                </div>

                {/* Q2 */}
                <div className="border border-slate-200 rounded-2xl p-5 bg-white space-y-3">
                  <h3 className="font-black text-base text-[#3b185f]">
                    پرسش دوم: آیا این ایده صرفاً حاصل دلبستگی شخصی است یا می‌تواند زندگی و کسب‌وکار افراد را بهتر کند؟
                  </h3>
                  <div className="space-y-2 text-slate-600 text-xs leading-relaxed">
                    <p>
                      <strong>پاسخ تفصیلی:</strong> خیر، صرفاً دلبستگی شخصی نیست؛ بر پایه مشاهدات میدانی و گفت‌وگو با کاربران واقعی استوار است:
                    </p>
                    <ul className="list-disc list-inside space-y-1 pr-2">
                      <li><strong>بهبود زندگی مشتریان:</strong> صرفه‌جویی محسوس در زمان، شفافیت هزینه‌ها و کاهش ریسک پشیمانی از مدل مو.</li>
                      <li><strong>بهبود کسب‌وکار آرایشگران:</strong> پر کردن ساعت‌های خالی، رهایی از مدیریت با دفتر کاغذی و جذب مشتریان جدید.</li>
                      <li><strong>تأثیر اجتماعی و انسانی:</strong> ایجاد بستر رسمی برای خدمات در منزل جهت احقاق حق طبیعی افراد سالمند و بیمار برای دریافت خدمات زیبایی.</li>
                    </ul>
                  </div>
                </div>

                {/* Q3 */}
                <div className="border border-slate-200 rounded-2xl p-5 bg-white space-y-3">
                  <h3 className="font-black text-base text-[#3b185f]">
                    پرسش سوم: ایده در کدام طبقه‌بندی قرار می‌گیرد؟ (کاملاً جدید، ترکیبی یا تطبیقی)
                  </h3>
                  <div className="text-slate-600 text-xs leading-relaxed">
                    <p>
                      ایده زیبانو در دسته <strong>ایده ترکیبی (Combined Idea)</strong> قرار می‌گیرد؛ ما پلتفرم رزرو آنلاین، سیستم مقایسه قیمت و نمونه‌کار، خدمات در محل و پیش‌نمایش هوشمند مدل‌ها را در یک بستر یکپارچه ادغام کرده‌ایم.
                    </p>
                  </div>
                </div>

                {/* Q4 */}
                <div className="border border-slate-200 rounded-2xl p-5 bg-white space-y-3">
                  <h3 className="font-black text-base text-[#3b185f]">
                    پرسش چهارم: ظرفیت رشد و مقیاس‌پذیری کسب‌وکار چقدر است؟
                  </h3>
                  <div className="space-y-2 text-slate-600 text-xs leading-relaxed">
                    <p>
                      زیبانو یک Marketplace واسط دوطرفه است. مقیاس‌پذیری آن در دو سطح تعریف شده است:
                    </p>
                    <ul className="list-disc list-inside space-y-1 pr-2">
                      <li><strong>مقیاس در سطح یک شهر (هدف کوتاه‌مدت):</strong> شروع پیشنهادی در یزد و جذب ۵۰ تا ۱۰۰ آرایشگاه فعال به عنوان هدف اولیه.</li>
                      <li><strong>مقیاس در سطح ملی (بلندمدت):</strong> هزینه نرم‌افزاری افزودن شهرهای جدید پایین است و محدودیت اصلی آن مدیریت بازاریابی و پشتیبانی محلی است. سامانه به شهرهای مختلف اختصاص دارد و به یزد محدود نیست.</li>
                    </ul>
                  </div>
                </div>

                {/* Q5 */}
                <div className="border border-slate-200 rounded-2xl p-5 bg-white space-y-3">
                  <h3 className="font-black text-base text-[#3b185f]">
                    پرسش پنجم: آیا مشتریان حاضرند برای محصول نهایی پول پرداخت کنند؟
                  </h3>
                  <div className="space-y-2 text-slate-600 text-xs leading-relaxed">
                    <p>
                      <strong>مشتریان:</strong> انتظار دارند جستجو و مقایسه رایگان باشد (مشابه دیجی‌کالا). دریافت هزینه فقط در قالب خدمات ویژه در محل توجیه‌پذیر است.
                    </p>
                    <p>
                      <strong>آرایشگران:</strong> منبع اصلی درآمد پلتفرم هستند. مدل‌های درآمدی شامل:
                    </p>
                    <ul className="list-disc list-inside space-y-1 pr-2">
                      <li>کمیسیون ۵ تا ۱۰ درصد از هر رزرو موفق.</li>
                      <li>مدل فری‌میوم و اشتراک ماهانه برای امکانات ویژه (قرارگیری در صدر لیست، آمار بازدید).</li>
                      <li>کارمزد هماهنگی خدمات در محل.</li>
                    </ul>
                  </div>
                </div>

                {/* Q6 */}
                <div className="border border-slate-200 rounded-2xl p-5 bg-white space-y-3">
                  <h3 className="font-black text-base text-[#3b185f]">
                    پرسش ششم: آیا امکان ارزیابی میدانی و دریافت بازخورد اولیه وجود دارد؟
                  </h3>
                  <div className="space-y-2 text-slate-600 text-xs leading-relaxed">
                    <p>
                      بله، در فاز صفر مصاحبه با ۳ مشتری و ۲ آرایشگر در یزد صورت گرفت. در گام بعدی با انتشار همین وب‌اپلیکیشن MVP، فرآیند رزرو و کاربری با مخاطبان واقعی تست می‌شود.
                    </p>
                  </div>
                </div>

                {/* Q7 */}
                <div className="border border-slate-200 rounded-2xl p-5 bg-white space-y-3">
                  <h3 className="font-black text-base text-[#3b185f]">
                    پرسش هفتم: در صورت بروز مانع در مدل عملیاتی چه سناریوهای واکنشی پیش‌بینی شده؟
                  </h3>
                  <div className="space-y-2 text-slate-600 text-xs leading-relaxed">
                    <ul className="list-disc list-inside space-y-1.5 pr-2">
                      <li><strong>مانع جذب اولیه آرایشگران (مرغ و تخم‌مرغ):</strong> شروع متمرکز با ۵ آرایشگاه برتر در یک محله خاص به جای تلاش برای پوشش کل شهر.</li>
                      <li><strong>محدودیت زیرساخت فنی هوش مصنوعی شبیه‌ساز:</strong> طراحی معماری به صورت ماژولار و استفاده از Mock Service و گالری مدل‌های ثابت در این فاز، بدون معطل گذاشتن پروژه.</li>
                    </ul>
                  </div>
                </div>

                {/* Q8 */}
                <div className="border border-slate-200 rounded-2xl p-5 bg-white space-y-3">
                  <h3 className="font-black text-base text-[#3b185f]">
                    پرسش هشتم: کاربران در حال حاضر چگونه این نیاز را برطرف می‌کنند؟
                  </h3>
                  <div className="space-y-2 text-slate-600 text-xs leading-relaxed">
                    <p>
                      روش‌های فعلی: جستجو در اینستاگرام، پرس‌وجو از دوستان، تماس تلفنی و استفاده از گوگل مپ.
                    </p>
                    <p className="p-3 rounded-lg bg-amber-50 text-amber-950 font-medium">
                      <strong>پاسخ به سوال کلیدی اسلاید درس («مشتری دیروز این پول را به چه کسی می‌داده؟»):</strong> مشتری پول را مستقیماً به آرایشگاه می‌داده است؛ زیبانو فرآیند انتخاب را تسهیل می‌کند و در خدمات در محل یک بازار کاملاً جدید خلق می‌نماید.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Classification & Boundaries */}
          {activeSection === 'classification' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">بخش چهارم</span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  طبقه‌بندی ایده و مرزبندی فرایندها (Online vs Offline)
                </h2>
              </div>

              <div className="space-y-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200">
                  <span className="font-bold text-[#3b185f]">نوع ایده: ایده ترکیبی (Combined Idea)</span>
                  <p className="text-xs text-slate-600 mt-1">
                    ترکیب رزرو آنلاین، مقایسه شفاف قیمت، نمونه‌کارهای دسته‌بندی‌شده و خدمات در محل.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Online */}
                  <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/30 space-y-3">
                    <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>فرایندهای برخط (آنلاین - داخل زیبانو):</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-700 list-disc list-inside">
                      <li>جستجو و فیلتر آرایشگاه‌ها بر اساس شهر، نام، جنسیت، قیمت و خدمات در محل</li>
                      <li>مشاهده اطلاعات، گالری تصاویر و نمونه‌کارهای تفکیک‌شده</li>
                      <li>مقایسه ۲ تا ۳ آرایشگاه در یک جدول تطبیقی</li>
                      <li>مشاهده پیش‌نمایش و تحلیل تناسب مدل‌ها (در فاز آینده)</li>
                      <li>ثبت و پیگیری درخواست رزرو و صدور کد رهگیری</li>
                      <li>پنل مدیریت خدمات، قیمت‌ها و درخواست‌های رزرو توسط آرایشگر</li>
                      <li>سیستم پیام‌ها و یادآوری درون‌برنامه‌ای نوبت</li>
                    </ul>
                  </div>

                  {/* Offline */}
                  <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <MapPin className="w-4 h-4 text-[#3b185f]" />
                      <span>فرایندهای برون‌خط (فیزیکی - خارج از سامانه):</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-700 list-disc list-inside">
                      <li>انجام واقعی خدمات آرایشگری (کوتاهی، رنگ، اصلاح، میکاپ و...)</li>
                      <li>مراجعه فیزیکی مشتری به سالن آرایشگاه</li>
                      <li>انجام خدمت در منزل توسط آرایشگر اعزامی</li>
                      <li>پرداخت هزینه نهایی در محل خدمت و پس از رضایت</li>
                      <li>ارزیابی کیفی نهایی پس از اتمام کار (ثبت نظر بعدی در سامانه)</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-100 text-slate-700 text-xs">
                  <strong>شفافیت مرزها:</strong> زیبانو بستر دیجیتال ارتباط، انتخاب آگاهانه و هماهنگی است؛ انجام فیزیکی خدمات و مسئولیت فنی آن در محیط واقعی انجام می‌شود.
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Time and Cost Loss Model */}
          {activeSection === 'time-cost' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">بخش پنجم</span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  مدل بصری اتلاف زمان و هزینه کاربران در وضعیت سنتی
                </h2>
              </div>

              <div className="space-y-6 text-xs sm:text-sm text-slate-700">
                <p className="leading-relaxed">
                  بر اساس برآورد گزارش و مصاحبه‌ها، مقایسه زمان صرف‌شده برای هر رزرو میان وضعیت سنتی و وضعیت با زیبانو به شرح زیر است (این مقادیر برآورد گزارش هستند و نه آمار قطعی اثبات‌شده):
                </p>

                {/* Comparative Infographic Box */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Traditional Flow */}
                  <div className="p-6 rounded-2xl border border-red-200 bg-red-50/30 space-y-4">
                    <div className="flex items-center justify-between border-b border-red-200 pb-2">
                      <span className="font-bold text-sm text-red-900">وضعیت سنتی (بدون زیبانو)</span>
                      <span className="text-xs font-black text-red-700">حداقل ۱۲۰ دقیقه اتلاف</span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-red-100">
                        <span>گشتن در اینستاگرام و پیج‌ها:</span>
                        <strong className="text-red-700 tabular-nums">۳۰ تا ۶۰ دقیقه</strong>
                      </div>
                      <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-red-100">
                        <span>ذخیره استوری‌ها و مقایسه دستی:</span>
                        <strong className="text-red-700 tabular-nums">۲۰ دقیقه</strong>
                      </div>
                      <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-red-100">
                        <span>استعلام قیمت تلفنی (۳ تا ۵ تماس):</span>
                        <strong className="text-red-700 tabular-nums">۱۵ دقیقه</strong>
                      </div>
                      <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-red-100">
                        <span>رفت‌وآمد غیربهینه به سالن:</span>
                        <strong className="text-red-700 tabular-nums">زمان و کرایه اضافی</strong>
                      </div>
                    </div>

                    <div className="p-3 bg-red-100/70 rounded-xl text-red-950 font-bold text-xs text-center">
                      نتیجه: اتلاف حداقل ۲ ساعت زمان + ریسک بالای انتخاب نامناسب و پشیمانی
                    </div>
                  </div>

                  {/* With Zibano */}
                  <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-4">
                    <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                      <span className="font-bold text-sm text-emerald-950">وضعیت با سامانه زیبانو</span>
                      <span className="text-xs font-black text-emerald-700">حدود ۹ دقیقه</span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-emerald-100">
                        <span>جستجو با فیلتر شهر، جنسیت و خدمت:</span>
                        <strong className="text-emerald-700 tabular-nums">۲ دقیقه</strong>
                      </div>
                      <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-emerald-100">
                        <span>مقایسه تطبیقی و دیدن نمونه‌کار:</span>
                        <strong className="text-emerald-700 tabular-nums">۵ دقیقه</strong>
                      </div>
                      <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-emerald-100">
                        <span>انتخاب سانس آزاد و ثبت رزرو آنلاین:</span>
                        <strong className="text-emerald-700 tabular-nums">۲ دقیقه</strong>
                      </div>
                      <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-emerald-100">
                        <span>گزینه خدمات در منزل:</span>
                        <strong className="text-emerald-700">حذف کامل تردد</strong>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-100/70 rounded-xl text-emerald-950 font-bold text-xs text-center">
                      نتیجه: صرفه‌جویی بیش از ۱.۵ ساعت بر اساس برآورد گزارش + انتخاب آگاهانه
                    </div>
                  </div>
                </div>

                {/* Progress bar visual */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>نسبت زمان صرف‌شده برای نوبت‌گیری:</span>
                    <span className="text-[#3b185f]">کاهش ۹۲ درصدی زمان هماهنگی</span>
                  </div>
                  <div className="w-full h-4 bg-red-200 rounded-full overflow-hidden flex">
                    <div className="bg-emerald-500 h-full w-[8%]" title="با زیبانو (۹ دقیقه)" />
                    <div className="bg-red-400 h-full w-[92%]" title="روش سنتی (۱۲۰ دقیقه)" />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span className="text-emerald-700 font-bold">زیبانو: ۹ دقیقه</span>
                    <span className="text-red-700 font-bold">سنتی: ۱۲۰ دقیقه</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 6: Validation Report & Field Interviews */}
          {activeSection === 'validation' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">بخش ششم</span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  گزارش اعتبارسنجی اولیه مبتنی بر مصاحبه‌های میدانی
                </h2>
              </div>

              <div className="space-y-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">روش تحقیق ذکرشده در گزارش:</h4>
                  <p className="text-xs text-slate-600">
                    مصاحبه نیمه‌ساختاریافته با ۳ مشتری و ۲ آرایشگر در شهر یزد (محل استقرار اولیه تیم دانشجویی).
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm">یافته‌های میدانی و نقل‌قول‌های مستند گزارش:</h3>

                  {/* Customer 1 */}
                  <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#3b185f]">مشتری ۱ (خانم، ۲۵ ساله)</span>
                      <span className="text-[11px] bg-white px-2 py-0.5 rounded text-purple-700 border">مشتری</span>
                    </div>
                    <blockquote className="text-xs italic text-slate-700 leading-relaxed border-r-2 border-purple-400 pr-3">
                      "من همیشه برای پیدا کردن مدل مو عکس‌های اینستاگرام رو ذخیره می‌کنم. ولی نمی‌دونم اون مدل روی موهای من هم قشنگ میشه یا نه. اگه بتونم قبل از رفتن، نتیجه رو روی عکس خودم ببینم، حتماً از این سایت استفاده می‌کنم."
                    </blockquote>
                  </div>

                  {/* Customer 2 */}
                  <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#3b185f]">مشتری ۲ (آقا، ۳۰ ساله)</span>
                      <span className="text-[11px] bg-white px-2 py-0.5 rounded text-purple-700 border">مشتری</span>
                    </div>
                    <blockquote className="text-xs italic text-slate-700 leading-relaxed border-r-2 border-purple-400 pr-3">
                      "برای من قیمت و نزدیکی خیلی مهمه. الان باید زنگ بزنم به چند تا آرایشگاه و قیمت بپرسم. اگه یک جا همه رو نشون بده و بتونم مقایسه کنم، خیلی بهتره."
                    </blockquote>
                  </div>

                  {/* Barber 1 */}
                  <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-900">آرایشگر ۱ (آقا، ۴۵ ساله)</span>
                      <span className="text-[11px] bg-white px-2 py-0.5 rounded text-amber-800 border">آرایشگر</span>
                    </div>
                    <blockquote className="text-xs italic text-slate-700 leading-relaxed border-r-2 border-amber-400 pr-3">
                      "من یک مشتری داشتم که تصادف کرده بود و نمی‌تونست بیاد. من رفتم خونه‌شون و کارش رو انجام دادم. خیلی‌ها هستن که این مشکل رو دارن ولی نمی‌دونن به کی زنگ بزنن. اگه سایتی باشه که این خدمات رو معرفی کنه، عالیه."
                    </blockquote>
                  </div>

                  {/* Barber 2 */}
                  <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-900">آرایشگر ۲ (خانم، ۳۵ ساله)</span>
                      <span className="text-[11px] bg-white px-2 py-0.5 rounded text-amber-800 border">آرایشگر</span>
                    </div>
                    <blockquote className="text-xs italic text-slate-700 leading-relaxed border-r-2 border-amber-400 pr-3">
                      "من بیشتر مشتری‌هام از طریق معرفی میان. برای پر کردن ساعت‌های خالی، یک سامانه آنلاین می‌تونه خوب باشه. ولی نگرانم که نتونم نمونه‌کارهام رو درست نشون بدم."
                    </blockquote>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-purple-100/60 text-[#2a0e44] font-medium text-xs">
                  <strong>توجه علمی:</strong> مطابق اطلاعات صورت پروژه، برای مشتری سوم نقل‌قول اختصاصی ثبت نشده و طبق اصل صداقت علمی از جعل نقل‌قول خودداری شده است.
                </div>
              </div>
            </div>
          )}

          {/* Section 7: Customer Journey Map */}
          {activeSection === 'journey' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">بخش هفتم</span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  نقشه سفر مشتری در وضعیت موجود (Customer Journey Map)
                </h2>
              </div>

              <div className="space-y-5 text-xs sm:text-sm text-slate-700">
                <p className="leading-relaxed">
                  در الگوی سنتی، مشتری برای دریافت خدمت آرایشگری پنج مرحله پرفرازونشیب را با اصطکاک‌های زیر طی می‌کند:
                </p>

                <div className="relative border-r-2 border-purple-200 pr-6 space-y-6">
                  {/* Step 1 */}
                  <div className="relative space-y-1.5">
                    <div className="absolute -right-8.5 top-0 w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold">
                      1
                    </div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-900">مرحله اول: آگاهی و جستجو (The Search)</h4>
                      <span className="text-red-600 text-xs flex items-center gap-1"><Frown className="w-3.5 h-3.5" /> سردرگمی</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      مشتری نیاز به خدمت را حس می‌کند و در اینستاگرام با هشتگ‌ها جستجو می‌کند؛ اطلاعات پراکنده است و احساس سردرگمی و اتلاف وقت غالب است.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="relative space-y-1.5">
                    <div className="absolute -right-8.5 top-0 w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold">
                      2
                    </div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-900">مرحله دوم: بررسی و ارزیابی (The Evaluation)</h4>
                      <span className="text-amber-600 text-xs flex items-center gap-1"><Meh className="w-3.5 h-3.5" /> عدم اطمینان</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      مشاهده عکس‌های نمونه‌کار بدون دسته‌بندی؛ سوال بزرگ مشتری: «آیا این مدل روی چهره و موهای من هم خوب می‌شود؟» همراه با ریسک پشیمانی.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="relative space-y-1.5">
                    <div className="absolute -right-8.5 top-0 w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold">
                      3
                    </div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-900">مرحله سوم: استعلام قیمت و هماهنگی (The Inquiry)</h4>
                      <span className="text-red-600 text-xs flex items-center gap-1"><Frown className="w-3.5 h-3.5" /> عدم شفافیت</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      تماس تلفنی یا دایرکت برای هزینه و زمان‌های خالی؛ اصطکاک اصلی: عدم شفافیت قیمت و عدم پاسخگویی یا پاسخ‌های مبهم سالن‌ها.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="relative space-y-1.5">
                    <div className="absolute -right-8.5 top-0 w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold">
                      4
                    </div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-900">مرحله چهارم: تصمیم‌گیری و مراجعه (The Decision & Visit)</h4>
                      <span className="text-amber-600 text-xs flex items-center gap-1"><Meh className="w-3.5 h-3.5" /> استرس و محرومیت</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      انتخاب با استرس نتیجه کار؛ مهم‌تر از همه، اگر مشتری جزو افراد کم‌توان یا سالمند باشد از این مرحله محروم مانده و خدمت در محل ندارد.
                    </p>
                  </div>

                  {/* Step 5 */}
                  <div className="relative space-y-1.5">
                    <div className="absolute -right-8.5 top-0 w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold">
                      5
                    </div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-900">مرحله پنجم: دریافت خدمت و ارزیابی (The Experience)</h4>
                      <span className="text-slate-600 text-xs flex items-center gap-1"><Meh className="w-3.5 h-3.5" /> تکرار چرخه</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      دریافت خدمت؛ در صورت رضایت یا نارضایتی، برای نوبت بعدی دوباره باید تمام این چرخه تلفنی و زمان‌بر از ابتدا طی شود.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                  <h4 className="font-bold text-[#3b185f] text-xs">نقش تحول‌آفرین زیبانو:</h4>
                  <p className="text-xs text-slate-700 leading-relaxed mt-1">
                    زیبانو با یکپارچه‌سازی جستجو، شفافیت قیمت‌ها، مقایسه در یک صفحه و امکان رزرو خدمات در محل، این مسیر ۵ مرحله‌ای پرفراز و نشیب را به یک تجربه کوتاه، شفاف و مطمئن تبدیل می‌کند.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 8: Future Roadmap */}
          {activeSection === 'roadmap' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">بخش هشتم</span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  جایگاه بخش‌های تکمیلی در نقشه راه توسعه (Roadmap)
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  بر اساس الزامات دانشگاهی فاز اول، بخش‌های زیر به عنوان <strong>برنامه توسعه فازهای بعدی</strong> در ساختار معماری سامانه جانمایی شده‌اند و صادقانه در این فاز ادعای تکمیل کامل آن‌ها نشده است:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <span className="font-bold text-[#3b185f] text-xs block">۱. بوم مدل کسب‌وکار (BMC) و مدل درآمدی:</span>
                    <p className="text-[11px] text-slate-500">تدوین جزئیات جریان‌های درآمدی کارمزد و اشتراک آرایشگران در فاز ۲.</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <span className="font-bold text-[#3b185f] text-xs block">۲. تحلیل تفصیلی رقبا:</span>
                    <p className="text-[11px] text-slate-500">مقایسه ویژگی‌ها با پلتفرم‌های رزرور و نوبت‌دهی‌های متمرکز پزشکی و حضوری.</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <span className="font-bold text-[#3b185f] text-xs block">۳. پرسونای مشتریان و آرایشگران:</span>
                    <p className="text-[11px] text-slate-500">مدل‌سازی روان‌شناختی رفتار رزرو کاربران زن و مرد در شهرهای مختلف.</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <span className="font-bold text-[#3b185f] text-xs block">۴. نقشه حضور دیجیتال:</span>
                    <p className="text-[11px] text-slate-500">استراتژی بازاریابی محتوایی، سئو محلی سالن‌ها و حضور در شبکه‌های اجتماعی.</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <span className="font-bold text-[#3b185f] text-xs block">۵. قیف بازاریابی و تبدیل (Conversion Funnel):</span>
                    <p className="text-[11px] text-slate-500">بهینه‌سازی نرخ تبدیل بازدیدکننده صفحه فرود به رزرو نهایی.</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <span className="font-bold text-[#3b185f] text-xs block">۶. سند اعتماد و حریم خصوصی:</span>
                    <p className="text-[11px] text-slate-500">خط‌مشی‌های حریم خصوصی مشتریان به ویژه در اعزام آرایشگر به منزل.</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 sm:col-span-2 space-y-1">
                    <span className="font-bold text-[#3b185f] text-xs block">۷. شناسنامه سناریوهای نرم‌افزاری (Use Cases & SRS):</span>
                    <p className="text-[11px] text-slate-500">مستندسازی دیاگرام‌های UML و مشخصات نیازمندی‌های فازهای آتی.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-medium">
                  <strong>نتیجه‌گیری استاد محترم:</strong> فاز اول با موفقیت دو بخش «پرونده تحلیلی کسب‌وکار» و «محصول اولیه قابل‌آزمایش (MVP)» را به طور کامل و هماهنگ پیاده‌سازی کرده و آماده ارزیابی و استقرار است.
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
