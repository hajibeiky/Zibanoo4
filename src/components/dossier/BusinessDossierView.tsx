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
  Check,
  ChevronDown,
  ChevronUp,
  Camera,
  Car
} from 'lucide-react';

export const BusinessDossierView: React.FC<{ onGoToMVP: () => void }> = ({ onGoToMVP }) => {
  const [activeSection, setActiveSection] = useState<string>('landing');

  // Accordion state for Eight Questions (Default all expanded or first few)
  const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false
  });

  const toggleQuestion = (qNum: number) => {
    setExpandedQuestions(prev => ({ ...prev, [qNum]: !prev[qNum] }));
  };

  // Interactive Customer Journey state
  const [activeJourneyStep, setActiveJourneyStep] = useState<number>(1);

  const sections = [
    { id: 'landing', title: '۱. صفحه فرود و معرفی کسب‌وکار', icon: Target },
    { id: 'frictions', title: '۲. تبیین اصطکاک‌ها و مسئله', icon: AlertTriangle },
    { id: 'questions', title: '۳. ارزیابی با هشت پرسش (ایده بالغ)', icon: HelpCircle },
    { id: 'classification', title: '۴. طبقه‌بندی ایده و مرزبندی فرایندها', icon: GitMerge },
    { id: 'time-cost', title: '۵. مدل بصری اتلاف زمان و هزینه', icon: Clock },
    { id: 'validation', title: '۶. گزارش مصاحبه‌ها و اعتبارسنجی', icon: Users },
    { id: 'journey', title: '۷. نقشه سفر مشتری (مسیر تعاملی)', icon: Compass },
    { id: 'roadmap', title: '۸. نقشه راه و چشم‌انداز توسعه', icon: Layers }
  ];

  const journeyStepsData = [
    {
      num: 1,
      title: 'مرحله اول: احساس نیاز و جستجو',
      sub: 'The Search & Awareness',
      emotion: 'سردرگمی و اتلاف وقت',
      emotionType: 'negative',
      traditional: 'مشتری نیاز به دریافت خدمات آرایشی را احساس می‌کند. در اینستاگرام و کانال‌های متفرقه جستجو می‌کند؛ با عکس‌های فیلترشده و بدون آدرس دقیق مواجه می‌شود و وقت زیادی برای یافتن آرایشگاه مناسب هدر می‌دهد.',
      friction: 'پراکندگی اطلاعات، نبود فیلتر منطقه‌ای و محله‌ای، اتلاف حداقل ۳۰ تا ۶۰ دقیقه در شبکه‌های اجتماعی.',
      solution: 'زیبانو با دسته‌بندی تفکیک‌شده زنانه و مردانه، فیلتر شهر و نقشه زنده، نزدیک‌ترین گزینه‌ها را در کمتر از ۱ دقیقه نمایش می‌دهد.'
    },
    {
      num: 2,
      title: 'مرحله دوم: بررسی و سنجش مدل متناسب با چهره',
      sub: 'The Evaluation & Model Choice',
      emotion: 'تردید و ریسک پشیمانی',
      emotionType: 'warning',
      traditional: 'مشتری نمونه‌کارها را در صفحات مختلف می‌بیند، اما نمی‌داند مدل مورد نظر روی فرم صورت، رنگ پوست و چهره او چگونه خواهد شد. همیشه این نگرانی وجود دارد که نتیجه نهایی با تصویر ذهنی فرق کند.',
      friction: 'عدم تطابق ژورنال با چهره واقعی، نبود ابزار پیش‌نمایش و ترس شدید از خراب شدن استایل.',
      solution: 'ماژول «شبیه‌ساز زیبایی زیبانو» به کاربر اجازه می‌دهد با بارگذاری تصویر چهره، پیش‌نمایش تطبیقی مدل‌ها را قبل از هر اقدامی مشاهده کند.'
    },
    {
      num: 3,
      title: 'مرحله سوم: استعلام قیمت و هماهنگی نوبت',
      sub: 'The Inquiry & Pricing',
      emotion: 'عدم شفافیت و استرس هزینه',
      emotionType: 'negative',
      traditional: 'مشتری ناچار است تماس تلفنی بگیرد یا در دایرکت منتظر پاسخ بماند. معمولاً قیمت دقیق اعلام نمی‌شود یا با عبارات «بستگی به حجم کار دارد» مشتری را در بلاتکلیفی مالی قرار می‌دهند.',
      friction: 'پاسخ ندادن سالن در ساعات غیرکاری، تعرفه‌های نامشخص و عدم شفافیت هزینه ایاب‌وذهاب.',
      solution: 'تعرفه شفاف و مصوب تک‌تک خدمات به همراه هزینه رفت‌وآمد خدمات در محل، بدون نیاز به تماس تلفنی و به صورت ۲۴ ساعته.'
    },
    {
      num: 4,
      title: 'مرحله چهارم: تصمیم‌گیری و انتخاب نوع دریافت خدمت',
      sub: 'The Decision & Channel Choice',
      emotion: 'محدودیت تردد و برنامه‌ریزی',
      emotionType: 'warning',
      traditional: 'مشتری باید تصمیم بگیرد مرخصی بگیرد، در ترافیک شهری تردد کند یا نوبت را به تأخیر بیندازد. سالمندان، بیماران، مادران دارای کودک خردسال و افراد پرمشغله در این مرحله به بن‌بست می‌رسند.',
      friction: 'نبود گزینه خدمات در منزل، اتلاف وقت در رفت‌وآمد شهری و دشواری هماهنگی زمان خالی.',
      solution: 'امکان رزرو آنلاین در سالن یا ثبت درخواست خدمات در محل با ثبت آدرس و جزئیات دقیق، با محاسبه مسافت و زمان تقریبی سفر.'
    },
    {
      num: 5,
      title: 'مرحله پنجم: حضور، دریافت خدمت و پرداخت',
      sub: 'The Service Delivery',
      emotion: 'در انتظار کیفیت مطلوب',
      emotionType: 'neutral',
      traditional: 'مشتری به سالن مراجعه می‌کند (یا آرایشگر بدون قرارداد مشخص به منزل می‌آید). در سالن‌های سنتی معمولاً با وجود نوبت قبلی، معطلی ۳۰ تا ۴۵ دقیقه‌ای در اتاق انتظار رخ می‌دهد.',
      friction: 'تداخل سانس‌ها در دفاتر نوبت‌دهی کاغذی و عدم پایبندی به ساعت مقرر.',
      solution: 'سانس‌های رزروشده سیستمی با تقویم هوشمند آرایشگر و بلوکه‌شدن زمان، به همراه سیستم یادآوری درون‌برنامه‌ای نوبت.'
    },
    {
      num: 6,
      title: 'مرحله ششم: ارزیابی، بازخورد و تکرار چرخه نوبت',
      sub: 'Evaluation & Retention',
      emotion: 'رضایت پایدار یا فراموشی نوبت',
      emotionType: 'positive',
      traditional: 'پس از اتمام خدمت، هیچ سیستمی برای یادآوری دوره اصلاح بعدی (مثلاً ۱۵ روز برای پیرایش موی آقایان یا ۴۵ روز برای رنگ ریشه بانوان) وجود ندارد و کاربر بعداً دوباره دچار سردرگمی می‌شود.',
      friction: 'فراموشی زمان تمدید خدمت، گم شدن شماره آرایشگر و ثبت نشدن سوابق خدمات دریافتی.',
      solution: 'ثبت تاریخچه کامل در «نوبت‌های من»، امکان رهگیری وضعیت، ثبت بازخورد و پیشنهاد هوشمند رزرو مجدد متناسب با دوره مصرف خدمت.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Professional Dossier Header */}
      <div className="bg-gradient-to-l from-[#2a0e44] via-[#3b185f] to-[#1a082c] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-amber-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            <BookOpen className="w-3.5 h-3.5" />
            <span>پرونده تحلیلی کسب‌وکار زیبانو</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            مستندات اعتبارسنجی، مدل کسب‌وکار و نقشه راه «زیبانو»
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 max-w-2xl leading-relaxed">
            بررسی جامع اصطکاک‌های بازار زیبایی، ارزیابی ایده با پرسش‌های هشت‌گانه بلوغ کسب‌وکار، گزارش مصاحبه‌های میدانی، نقشه تعاملی سفر مشتری و تفکیک فرایندهای برخط از فیزیکی.
          </p>
        </div>

        <button
          onClick={onGoToMVP}
          className="self-start md:self-auto px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all shadow-sm flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span>ورود به سامانه عملیاتی (MVP)</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Main Grid: Sticky Sidebar TOC + Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-2 sticky top-24">
          <div className="px-3 py-2 text-xs font-bold text-slate-500 border-b border-slate-100">
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
                  className={`w-full text-right p-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
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

          <div className="pt-3 border-t border-slate-100 px-3 text-[11px] text-slate-500 leading-relaxed">
            پرونده تحلیلی زیبانو و ماژول‌های سامانه عملیاتی MVP به صورت یکپارچه و منطبق بر نیازهای واقعی طراحی شده‌اند.
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
                    «زیبانو» پلتفرمی یکپارچه برای جستجو، مقایسه و رزرو آنلاین آرایشگاه‌های زنانه و مردانه است. ما به شما کمک می‌کنیم بدون سردرگمی در شبکه‌های اجتماعی، آرایشگاه مناسب خود را بر اساس موقعیت مکانی، قیمت شفاف و نمونه‌کارهای واقعی پیدا کنید. همچنین با قابلیت «شبیه‌ساز زیبایی» می‌توانید پیش از مراجعه، مدل مو را روی چهره خود ارزیابی کرده و با امکان ویژه «رزرو خدمات در محل»، زیبایی را به خانه خود بیاورید.
                  </blockquote>
                </div>

                <div className="space-y-3 pt-2">
                  <h3 className="font-bold text-slate-900 text-sm">۳. تبیین مخاطبان هدف:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                      <span className="font-bold text-[#3b185f] block">مشتریان (خدمات‌گیرندگان):</span>
                      <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600">
                        <li>افرادی که به دنبال پیدا کردن سریع آرایشگاه مناسب، مقایسه شفاف قیمت‌ها و دیدن نمونه‌کارهای واقعی هستند.</li>
                        <li>افرادی که در انتخاب مدل مو یا استایل مناسب با چهره خود دچار تردید هستند و ابزار پیش‌نمایش می‌خواهند.</li>
                        <li>افرادی که به دلیل محدودیت‌های جسمانی (مانند بیماران، مصدومان یا سالمندان) یا مشغله کاری، نیاز به دریافت خدمات آرایشگری در محل دارند.</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                      <span className="font-bold text-amber-800 block">آرایشگران و صاحبان آرایشگاه:</span>
                      <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600">
                        <li>صاحبان سالن که می‌خواهند خدمات، قیمت‌ها و نمونه‌کارهای خود را به مخاطبان بیشتری معرفی کنند.</li>
                        <li>آرایشگرانی که می‌خواهند زمان‌های خالی خود را مدیریت کرده و نوبت‌ها را به جای دفتر کاغذی، به سادگی و برخط پیگیری نمایند.</li>
                        <li>آرایشگران حرفه‌ای که تمایل دارند با ارائه خدمات در محل، سهم درآمدی بیشتری از بازار کسب کنند.</li>
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
                    <span className="px-3 py-1.5 rounded-lg bg-purple-100 text-purple-900 font-bold text-xs">
                      امکان جدید: شبیه‌ساز زیبایی چهره
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
                  تبیین اصطکاک‌ها و صورت‌بندی مسئله (Problem Formulation)
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  در حال حاضر، فرآیند پیدا کردن آرایشگاه مناسب و دریافت خدمات زیبایی، برای بسیاری از کاربران با چالش‌ها و ناکارآمدی‌های متعددی همراه است. الگوهای جاری (مانند اینستاگرام، پرس‌وجوی دهان‌به‌دهان یا تماس تلفنی) پاسخگوی کامل نیازها نیستند. مهم‌ترین اصطکاک‌ها عبارتند از:
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 text-xs flex items-center justify-center font-bold">۱</span>
                      پراکندگی اطلاعات و دشواری در مقایسه:
                    </h4>
                    <p className="text-slate-600 text-xs">
                      اطلاعات خدمات، قیمت‌ها، نمونه‌کارها و موقعیت مکانی در بسترهای مختلف پراکنده است و بررسی همزمان چند سالن بسیار زمان‌بر است.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 text-xs flex items-center justify-center font-bold">۲</span>
                      عدم شفافیت در قیمت‌ها:
                    </h4>
                    <p className="text-slate-600 text-xs">
                      قیمت‌ها به صورت شفاف اعلام نمی‌شوند و مشتری تنها پس از تماس یا در زمان تسویه‌حساب با هزینه‌های غیرمنتظره روبه‌رو می‌شود.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 text-xs flex items-center justify-center font-bold">۳</span>
                      نارسایی در نمایش نمونه‌کارها و انتخاب آگاهانه:
                    </h4>
                    <p className="text-slate-600 text-xs">
                      تصاویر بدون تفکیک موضوعی بارگذاری می‌شوند و مشتری نمی‌تواند نمونه کارهای مرتبط با نیاز خود را به سرعت فیلتر کند.
                    </p>
                  </div>

                  {/* Added Friction: Beauty Simulator Need */}
                  <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 space-y-1">
                    <h4 className="font-bold text-[#3b185f] text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-purple-200 text-[#3b185f] text-xs flex items-center justify-center font-bold">۴</span>
                      دشواری انتخاب مدل زیبایی متناسب با چهره:
                    </h4>
                    <p className="text-slate-700 text-xs leading-relaxed">
                      مشتریان ممکن است در تصاویر شبکه‌های اجتماعی یا نمونه‌کارهای آرایشگاه‌ها، مدل مو یا آرایش زیبایی را مشاهده کنند؛ اما نمی‌توانند تصور کنند که همان مدل روی چهره خودشان چه ظاهری خواهد داشت. این موضوع باعث تردید در انتخاب مدل، ترس از خراب شدن ظاهر و پشیمانی بعد از دریافت خدمات می‌شود. زیبانو با قابلیت «شبیه‌ساز زیبایی» این چالش را برطرف می‌کند تا کاربر پیش از تصمیم‌گیری نهایی، تطابق مدل را با چهره خود بسنجد.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 text-xs flex items-center justify-center font-bold">۵</span>
                      دشواری در هماهنگی و رزرو نوبت:
                    </h4>
                    <p className="text-slate-600 text-xs">
                      رزرو تلفنی یا پیامکی منجر به تداخل زمانی، فراموشی نوبت و اتلاف وقت دوطرفه مشتری و سالن‌دار می‌شود.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-amber-50/50 space-y-1">
                    <h4 className="font-bold text-amber-900 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-xs flex items-center justify-center font-bold">۶</span>
                      محدودیت در دسترسی برای افراد دارای شرایط خاص:
                    </h4>
                    <p className="text-slate-700 text-xs">
                      افراد آسیب‌دیده، بیماران، سالمندان یا مادران دارای نوزاد و افراد پرمشغله بستری برای دسترسی آسان به خدمات زیبایی در محل سکونت خود ندارند.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-1">
                  <h4 className="font-bold text-[#3b185f] text-sm">نتیجه‌گیری و صورت‌بندی نهایی مسئله:</h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    «کاربران برای پیدا کردن آرایشگاه مناسب، ارزیابی مدل متناسب با چهره، مقایسه خدمات و قیمت‌ها، و رزرو نوبت با فرآیندی زمان‌بر، پراکنده و بدون شفافیت مواجه هستند. همچنین بستری یکپارچه برای دسترسی مطمئن به خدمات در محل برای افراد دارای محدودیت تردد وجود ندارد.»
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Eight Questions (Interactive Accordion) */}
          {activeSection === 'questions' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">بخش سوم</span>
                  <h2 className="text-2xl font-black text-slate-900 mt-2">
                    ارزیابی ایده با پرسش‌های هشت‌گانه بلوغ کسب‌وکار
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setExpandedQuestions({ 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true })}
                    className="text-[11px] font-bold text-[#3b185f] hover:underline"
                  >
                    گسترش همه
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    onClick={() => setExpandedQuestions({})}
                    className="text-[11px] font-bold text-slate-500 hover:underline"
                  >
                    بستن همه
                  </button>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {/* Q1 */}
                <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-xs">
                  <button
                    onClick={() => toggleQuestion(1)}
                    className="w-full p-4 text-right font-black text-sm text-[#3b185f] bg-slate-50/70 hover:bg-slate-100/80 flex items-center justify-between gap-3 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#3b185f] text-white flex items-center justify-center text-xs">۱</span>
                      آیا اصلاً هم‌اکنون کسی منتظر مطرح شدن چنین ایده‌ای در بازار است؟
                    </span>
                    {expandedQuestions[1] ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </button>
                  {expandedQuestions[1] && (
                    <div className="p-5 space-y-3 border-t border-slate-100 text-slate-600 text-xs leading-relaxed">
                      <p>
                        <strong>پاسخ تحلیلی:</strong> بله. در حوزه خدمات شخصی و مراقبت فردی، نیاز به آرایشگری یک نیاز تکرارشونده و همیشگی است و صورت مسئله از قبل در ذهن مشتریان تثبیت شده است:
                      </p>
                      <ul className="list-disc list-inside space-y-1.5 pr-2">
                        <li><strong>نارسایی روش‌های سنتی:</strong> جستجوی دستی در اینستاگرام یا تکیه بر پرس‌وجوی آشنایان زمان‌بر، نامطمئن و خسته‌کننده است.</li>
                        <li><strong>پذیرش بازار دیجیتال:</strong> استقبال از سامانه‌های سفارش آنلاین غذا و نوبت‌دهی پزشکی نشان می‌دهد جامعه مخاطب کاملاً آماده پذیرش رزرو آنلاین آرایشگاهی است.</li>
                        <li><strong>نیاز کشف‌شده خدمات در محل:</strong> افراد بیمار، سالمندان، مادران و شاغلان همواره در پی راهی امن برای دریافت خدمات زیبایی در منزل بوده‌اند.</li>
                      </ul>
                      <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200/60 font-bold text-[#3b185f] text-[11px]">
                        نتیجه: زیبانو نیازی را از صفر جعل نمی‌کند، بلکه راه‌حل ساده‌تر، شفاف‌تر و مطمئن‌تری برای تقاضای بالفعل موجود ارائه می‌دهد.
                      </div>
                    </div>
                  )}
                </div>

                {/* Q2 */}
                <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-xs">
                  <button
                    onClick={() => toggleQuestion(2)}
                    className="w-full p-4 text-right font-black text-sm text-[#3b185f] bg-slate-50/70 hover:bg-slate-100/80 flex items-center justify-between gap-3 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#3b185f] text-white flex items-center justify-center text-xs">۲</span>
                      آیا این ایده صرفاً حاصل دلبستگی شخصی است یا ارزش اقتصادی و واقعی خلق می‌کند؟
                    </span>
                    {expandedQuestions[2] ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </button>
                  {expandedQuestions[2] && (
                    <div className="p-5 space-y-3 border-t border-slate-100 text-slate-600 text-xs leading-relaxed">
                      <p>
                        خیر، صرفاً علاقه شخصی نیست؛ بلکه پاسخی مبتنی بر مشاهدات میدانی و منافع متقابل دو سوی بازار است:
                      </p>
                      <ul className="list-disc list-inside space-y-1.5 pr-2">
                        <li><strong>برای مشتریان:</strong> صرفه‌جویی ملموس بیش از ۹۰ دقیقه‌ای در هر رزرو، حذف ریسک پشیمانی با شبیه‌ساز چهره و آگاهی از تعرفه قبل از هر تصمیم.</li>
                        <li><strong>برای آرایشگران:</strong> پر کردن ساعات خالی در طول هفته، ارتقای برند و نظم‌بخشی به حساب‌ها به جای تکیه بر یادداشت‌های کاغذی.</li>
                        <li><strong>مسئولیت اجتماعی:</strong> امکان بهره‌مندی اقشار دارای محدودیت حرکتی و سالمندان از خدمات آراستگی در محیط امن خانه.</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Q3 */}
                <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-xs">
                  <button
                    onClick={() => toggleQuestion(3)}
                    className="w-full p-4 text-right font-black text-sm text-[#3b185f] bg-slate-50/70 hover:bg-slate-100/80 flex items-center justify-between gap-3 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#3b185f] text-white flex items-center justify-center text-xs">۳</span>
                      ایده در کدام طبقه‌بندی نوآوری قرار می‌گیرد؟ (نوظهور، ترکیبی یا تطبیقی)
                    </span>
                    {expandedQuestions[3] ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </button>
                  {expandedQuestions[3] && (
                    <div className="p-5 space-y-2 border-t border-slate-100 text-slate-600 text-xs leading-relaxed">
                      <p>
                        ایده زیبانو در زمره <strong>ایده ترکیبی (Combined Idea)</strong> تعریف می‌شود. زیبانو چندین مولفه اثبات‌شده را در یک بستر واحد گردآوری کرده است:
                      </p>
                      <ul className="list-disc list-inside space-y-1 pr-2">
                        <li>موتور جستجو و نقشه جغرافیایی سالن‌ها با محاسبه زمان سفر</li>
                        <li>جدول مقایسه تطبیقی چند سالن در یک قاب</li>
                        <li>شبیه‌ساز زیبایی چهره برای سنجش قبل از انتخاب</li>
                        <li>سیستم نوبت‌دهی خدمات در محل به صورت اختصاصی</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Q4 */}
                <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-xs">
                  <button
                    onClick={() => toggleQuestion(4)}
                    className="w-full p-4 text-right font-black text-sm text-[#3b185f] bg-slate-50/70 hover:bg-slate-100/80 flex items-center justify-between gap-3 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#3b185f] text-white flex items-center justify-center text-xs">۴</span>
                      ظرفیت رشد و مقیاس‌پذیری پلتفرم در چه ابعادی پیش‌بینی شده است؟
                    </span>
                    {expandedQuestions[4] ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </button>
                  {expandedQuestions[4] && (
                    <div className="p-5 space-y-3 border-t border-slate-100 text-slate-600 text-xs leading-relaxed">
                      <p>
                        زیبانو به عنوان یک مارکت‌پلیس دوسویه (Two-Sided Marketplace)، ظرفیت رشد مقیاس‌پذیر در دو فاز را داراست:
                      </p>
                      <ul className="list-disc list-inside space-y-1.5 pr-2">
                        <li><strong>فاز متمرکز شهری:</strong> تثبیت شبکه اولیه با ۵۰ تا ۱۰۰ آرایشگاه ممتاز در شهرهای آزمایشی و بهینه‌سازی زنجیره رزرو.</li>
                        <li><strong>گسترش ملی:</strong> معماری نرم‌افزاری بر پایه شهرها و مناطق مستقل طراحی شده و هزینه توسعه فنی برای ورود به کلان‌شهرها ناچیز است.</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Q5 */}
                <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-xs">
                  <button
                    onClick={() => toggleQuestion(5)}
                    className="w-full p-4 text-right font-black text-sm text-[#3b185f] bg-slate-50/70 hover:bg-slate-100/80 flex items-center justify-between gap-3 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#3b185f] text-white flex items-center justify-center text-xs">۵</span>
                      جریان‌های درآمدی و تمایل به پرداخت طرفین چگونه ساختاربندی شده است؟
                    </span>
                    {expandedQuestions[5] ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </button>
                  {expandedQuestions[5] && (
                    <div className="p-5 space-y-3 border-t border-slate-100 text-slate-600 text-xs leading-relaxed">
                      <p>
                        <strong>سمت مشتری:</strong> جستجو، مقایسه، استفاده از نقشه و رزرو در سالن کاملاً رایگان است. در رزرو خدمات در محل، مبلغ مشخصی تحت عنوان هزینه تضمین اعزام و ایاب‌وذهاب شفاف‌سازی می‌شود.
                      </p>
                      <p>
                        <strong>سمت آرایشگر:</strong> درآمد پایدار پلتفرم از طریق کارمزد درصدی منصفانه از هر رزرو قطعی، حق عضویت اشتراکی فصلی برای ارتقای جایگاه در نتایج جستجو و کارمزد معرفی سفارش‌های در محل تامین می‌گردد.
                      </p>
                    </div>
                  )}
                </div>

                {/* Q6 */}
                <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-xs">
                  <button
                    onClick={() => toggleQuestion(6)}
                    className="w-full p-4 text-right font-black text-sm text-[#3b185f] bg-slate-50/70 hover:bg-slate-100/80 flex items-center justify-between gap-3 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#3b185f] text-white flex items-center justify-center text-xs">۶</span>
                      آیا امکان ارزیابی میدانی و دریافت بازخورد سریع در نسخه فعلی فراهم است؟
                    </span>
                    {expandedQuestions[6] ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </button>
                  {expandedQuestions[6] && (
                    <div className="p-5 space-y-2 border-t border-slate-100 text-slate-600 text-xs leading-relaxed">
                      <p>
                        بله. محصول در قالب این سامانه به صورت عمومی مستقر شده و تمام فرایندها از ثبت‌نام کاربران، ایجاد آرایشگاه جدید، بارگذاری نمونه‌کارها، تقویم و مسدودسازی سانس‌ها تا رزرو نوبت با ماندگاری در LocalStorage به شکل عملیاتی قابل تست و اعتبارسنجی است.
                      </p>
                    </div>
                  )}
                </div>

                {/* Q7 */}
                <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-xs">
                  <button
                    onClick={() => toggleQuestion(7)}
                    className="w-full p-4 text-right font-black text-sm text-[#3b185f] bg-slate-50/70 hover:bg-slate-100/80 flex items-center justify-between gap-3 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#3b185f] text-white flex items-center justify-center text-xs">۷</span>
                      چه راهکارهایی برای مواجهه با موانع عملیاتی پیش‌بینی شده است؟
                    </span>
                    {expandedQuestions[7] ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </button>
                  {expandedQuestions[7] && (
                    <div className="p-5 space-y-2 border-t border-slate-100 text-slate-600 text-xs leading-relaxed">
                      <ul className="list-disc list-inside space-y-1.5 pr-2">
                        <li><strong>چالش جذب اولیه آرایشگران (مسئله مرغ و تخم‌مرغ):</strong> شروع با آرایشگاه‌های معتبر محلی با ارائه پنل رایگان و هدایت مشتریان مستقیم.</li>
                        <li><strong>اطمینان از ایمنی خدمات در منزل:</strong> ایجاد فرآیند احراز هویت دوطرفه، ثبت جزئیات آدرس و کد رهگیری اختصاصی.</li>
                        <li><strong>قابلیت شبیه‌ساز:</strong> پیاده‌سازی ماژول سبک بر پایه مقایسه تصویری و اسلایدر Before/After برای اطمینان از عملکرد سریع حتی با اینترنت کم‌سرعت.</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Q8 */}
                <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-xs">
                  <button
                    onClick={() => toggleQuestion(8)}
                    className="w-full p-4 text-right font-black text-sm text-[#3b185f] bg-slate-50/70 hover:bg-slate-100/80 flex items-center justify-between gap-3 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#3b185f] text-white flex items-center justify-center text-xs">۸</span>
                      کاربران در حال حاضر چگونه این نیاز را برطرف می‌کنند و سهم زیبانو کجاست؟
                    </span>
                    {expandedQuestions[8] ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </button>
                  {expandedQuestions[8] && (
                    <div className="p-5 space-y-3 border-t border-slate-100 text-slate-600 text-xs leading-relaxed">
                      <p>
                        کاربران هم‌اکنون این هزینه را مستقیماً و به شکل نقدی یا کارتخوان در سالن‌ها می‌پردازند، اما هزینه بالایی از لحاظ وقت تلف‌شده، بنزین، تماس‌های مکرر و استرس ناشی از عدم تطابق مدل پرداخت می‌کنند. زیبانو نه تنها این هزینه‌های پنهان را حذف می‌کند، بلکه بازاری تازه برای خدمات در محل و مشتریان وفادار خلق می‌نماید.
                      </p>
                    </div>
                  )}
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
                    ترکیب رزرو آنلاین، مقایسه شفاف قیمت، نقشه و محاسبه مسافت، شبیه‌ساز چهره و اعزام آرایشگر به محل.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Online */}
                  <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/30 space-y-3">
                    <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>فرایندهای برخط (آنلاین - داخل سامانه زیبانو):</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-700 list-disc list-inside">
                      <li>جستجو و فیلتر پیشرفته بر اساس شهر، نام، جنسیت، قیمت و خدمات در محل</li>
                      <li>صفحات اختصاصی تفکیک‌شده برای آرایشگاه‌های زنانه و پیرایش‌های مردانه</li>
                      <li>مشاهده نقشه تعاملی، محاسبه مسافت (کیلومتر) و برآورد زمان سفر با خودرو یا پیاده</li>
                      <li>مقایسه همزمان ۲ یا ۳ آرایشگاه در یک جدول تطبیقی با گالری بزرگ‌نمایی</li>
                      <li>آزمایش مدل‌ها در شبیه‌ساز چهره پیش از رزرو نوبت</li>
                      <li>ثبت و پیگیری رزرو آنلاین با آدرس و جزئیات خدمت در محل</li>
                      <li>پنل آرایشگر برای مدیریت سانس‌ها، مسدودسازی زمان‌های استراحت و تایید درخواست‌ها</li>
                      <li>سامانه پیام‌ها و یادآوری درون‌برنامه‌ای نوبت و پیشنهاد رزرو دوره‌ای مجدد</li>
                    </ul>
                  </div>

                  {/* Offline */}
                  <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <MapPin className="w-4 h-4 text-[#3b185f]" />
                      <span>فرایندهای برون‌خط (فیزیکی - خارج از سامانه):</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-700 list-disc list-inside">
                      <li>انجام فیزیکی خدمات تخصصی (کوتاهی، رنگ، اصلاح، گریم، براشینگ و...)</li>
                      <li>مراجعه حضوری مشتری به آدرس سالن یا حضور آرایشگر در منزل مشتری</li>
                      <li>تسویه‌حساب نهایی خدمت در محل با کارتخوان یا به صورت توافقی</li>
                      <li>بررسی و رضایت کیفی حضوری در هنگام انجام کار</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-100 text-slate-700 text-xs">
                  <strong>شفافیت مرزها:</strong> زیبانو بستر دیجیتال انتخاب آگاهانه، شبیه‌سازی و هماهنگی نوبت است؛ انجام فیزیکی خدمات در محیط واقعی و با بالاترین استانداردهای بهداشتی صورت می‌پذیرد.
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
                  بر اساس تحلیل‌های میدانی و مقایسه فرایندها، صرفه‌جویی زمان حاصل از استفاده از زیبانو در مقایسه با روش سنتی به شرح زیر است:
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
                        <span>ذخیره تصاویر و مقایسه ذهنی:</span>
                        <strong className="text-red-700 tabular-nums">۲۰ دقیقه</strong>
                      </div>
                      <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-red-100">
                        <span>استعلام قیمت تلفنی و دایرکت:</span>
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
                        <span>جستجو با فیلتر شهر، جنسیت و نقشه:</span>
                        <strong className="text-emerald-700 tabular-nums">۲ دقیقه</strong>
                      </div>
                      <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-emerald-100">
                        <span>مقایسه تطبیقی و شبیه‌ساز چهره:</span>
                        <strong className="text-emerald-700 tabular-nums">۵ دقیقه</strong>
                      </div>
                      <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-emerald-100">
                        <span>انتخاب سانس آزاد و ثبت رزرو:</span>
                        <strong className="text-emerald-700 tabular-nums">۲ دقیقه</strong>
                      </div>
                      <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-emerald-100">
                        <span>گزینه خدمات در محل:</span>
                        <strong className="text-emerald-700">حذف کامل تردد</strong>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-100/70 rounded-xl text-emerald-950 font-bold text-xs text-center">
                      نتیجه: صرفه‌جویی بیش از ۱.۵ ساعت زمان + اطمینان خاطر از قیمت و مدل
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
                  <h4 className="font-bold text-slate-900 mb-1">روش تحقیق میدانی:</h4>
                  <p className="text-xs text-slate-600">
                    مصاحبه‌های نیمه‌ساختاریافته با مشتریان و سالن‌داران جهت استخراج نیازهای پنهان و الگوهای مصرف.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm">یافته‌های میدانی و نقل‌قول‌های مستند کاربران:</h3>

                  {/* Customer 1 */}
                  <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#3b185f]">مشتری ۱ (خانم، ۲۵ ساله)</span>
                      <span className="text-[11px] bg-white px-2 py-0.5 rounded text-purple-700 border">مشتری سالن‌های بانوان</span>
                    </div>
                    <blockquote className="text-xs italic text-slate-700 leading-relaxed border-r-2 border-purple-400 pr-3">
                      "من همیشه برای پیدا کردن مدل مو عکس‌های اینستاگرام رو ذخیره می‌کنم. ولی نمی‌دونم اون مدل روی موهای من هم قشنگ میشه یا نه. اگه بتونم قبل از رفتن، نتیجه رو روی عکس خودم ببینم، حتماً از این سایت استفاده می‌کنم."
                    </blockquote>
                  </div>

                  {/* Customer 2 */}
                  <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#3b185f]">مشتری ۲ (آقا، ۳۰ ساله)</span>
                      <span className="text-[11px] bg-white px-2 py-0.5 rounded text-purple-700 border">مشتری پیرایش‌های آقایان</span>
                    </div>
                    <blockquote className="text-xs italic text-slate-700 leading-relaxed border-r-2 border-purple-400 pr-3">
                      "برای من قیمت و نزدیکی خیلی مهمه. الان باید زنگ بزنم به چند تا آرایشگاه و قیمت بپرسم. اگه یک جا همه رو نشون بده و بتونم مقایسه کنم، خیلی بهتره."
                    </blockquote>
                  </div>

                  {/* Customer 3 (Added) */}
                  <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#3b185f]">مشتری ۳ (شاغل و ساکن آپارتمان)</span>
                      <span className="text-[11px] bg-white px-2 py-0.5 rounded text-purple-700 border">متقاضی خدمات منظم</span>
                    </div>
                    <blockquote className="text-xs italic text-slate-700 leading-relaxed border-r-2 border-purple-400 pr-3">
                      "به دلیل مشغله زیاد شغلی، هماهنگی تلفنی برای من واقعاً دردسر دارد. بارها پیش آمده نوبتم را فراموش کنم یا وقتی به سالن برسم معطل شوم. نیاز دارم در هر ساعت از شبانه‌روز بتوانم سانس‌های خالی را ببینم، به صورت آنلاین رزرو کنم و سیستم یادآوری خودکار نوبت داشته باشم."
                    </blockquote>
                  </div>

                  {/* Barber 1 */}
                  <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-900">آرایشگر ۱ (آقا، ۴۵ ساله)</span>
                      <span className="text-[11px] bg-white px-2 py-0.5 rounded text-amber-800 border">مدیر پیرایشگاه مردانه</span>
                    </div>
                    <blockquote className="text-xs italic text-slate-700 leading-relaxed border-r-2 border-amber-400 pr-3">
                      "من یک مشتری داشتم که تصادف کرده بود و نمی‌تونست بیاد. من رفتم خونه‌شون و کارش رو انجام دادم. خیلی‌ها هستن که این مشکل رو دارن ولی نمی‌دونن به کی زنگ بزنن. اگه سایتی باشه که این خدمات رو معرفی کنه، عالیه."
                    </blockquote>
                  </div>

                  {/* Barber 2 */}
                  <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-900">آرایشگر ۲ (خانم، ۳۵ ساله)</span>
                      <span className="text-[11px] bg-white px-2 py-0.5 rounded text-amber-800 border">مدیر سالن زیبایی بانوان</span>
                    </div>
                    <blockquote className="text-xs italic text-slate-700 leading-relaxed border-r-2 border-amber-400 pr-3">
                      "من بیشتر مشتری‌هام از طریق معرفی میان. برای پر کردن ساعت‌های خالی، یک سامانه آنلاین می‌تونه خوب باشه. ولی نگرانم که نتونم نمونه‌کارهام رو درست نشون بدم."
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 7: Interactive Customer Journey Map */}
          {activeSection === 'journey' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">بخش هفتم</span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  نقشه سفر مشتری (Interactive Customer Journey Map)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  بررسی گام‌به‌گام و تعاملی مسیر مشتری از احساس نیاز تا وفاداری، همراه با راهکار تحول‌آفرین زیبانو
                </p>
              </div>

              {/* Step Selector Badges */}
              <div className="flex flex-wrap items-center gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-200">
                {journeyStepsData.map((step) => (
                  <button
                    key={step.num}
                    onClick={() => setActiveJourneyStep(step.num)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeJourneyStep === step.num
                        ? 'bg-[#3b185f] text-white shadow-xs'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-900 text-[10px] flex items-center justify-center font-bold">
                      {step.num}
                    </span>
                    <span>گام {step.num}</span>
                  </button>
                ))}
              </div>

              {/* Active Step Showcase Card */}
              {(() => {
                const step = journeyStepsData.find(s => s.num === activeJourneyStep) || journeyStepsData[0];
                return (
                  <div className="border-2 border-[#3b185f]/30 rounded-3xl p-6 bg-gradient-to-b from-purple-50/30 to-white shadow-xs space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                      <div>
                        <span className="text-xs font-black text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-md">
                          مرحله {step.num} از ۶
                        </span>
                        <h3 className="text-lg font-black text-slate-900 mt-1">
                          {step.title}
                        </h3>
                        <span className="text-xs text-slate-400 font-mono">{step.sub}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-100 text-red-800 flex items-center gap-1">
                          <Frown className="w-3.5 h-3.5" />
                          وضعیت احساسی سنتی: {step.emotion}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Traditional Problem */}
                      <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200 space-y-2">
                        <h4 className="font-bold text-xs text-red-900 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          تجربه سنتی و اصطکاک وضع موجود:
                        </h4>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {step.traditional}
                        </p>
                        <div className="pt-1 text-[11px] text-red-700 font-medium">
                          <strong>ریشه اصطکاک:</strong> {step.friction}
                        </div>
                      </div>

                      {/* Zibano Solution */}
                      <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                        <h4 className="font-bold text-xs text-emerald-950 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          راهکار تحول‌آفرین زیبانو:
                        </h4>
                        <p className="text-xs text-slate-800 leading-relaxed font-medium">
                          {step.solution}
                        </p>
                      </div>
                    </div>

                    {/* Navigation Buttons for Steps */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <button
                        onClick={() => setActiveJourneyStep(prev => Math.max(1, prev - 1))}
                        disabled={activeJourneyStep === 1}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                      >
                        گام قبلی
                      </button>

                      <div className="flex items-center gap-1">
                        {journeyStepsData.map(s => (
                          <div
                            key={s.num}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${
                              s.num === activeJourneyStep ? 'bg-[#3b185f] scale-125' : 'bg-slate-300'
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={() => setActiveJourneyStep(prev => Math.min(6, prev + 1))}
                        disabled={activeJourneyStep === 6}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#3b185f] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#2b1047] transition-colors"
                      >
                        گام بعدی
                      </button>
                    </div>
                  </div>
                );
              })()}

              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                <h4 className="font-bold text-[#3b185f] text-xs">نقش تحول‌آفرین زیبانو در سفر کاربر:</h4>
                <p className="text-xs text-slate-700 leading-relaxed mt-1">
                  زیبانو با یکپارچه‌سازی جستجو، محاسبه فاصله، شبیه‌ساز قبل از عمل، شفافیت کامل قیمت‌ها و پوشش خدمات در محل، این مسیر پرفراز و نشیب سنتی را به یک تجربه کوتاه، مدرن و تضمین‌شده تبدیل کرده است.
                </p>
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
                  در مسیر رشد و مقیاس‌پذیری زیبانو، قابلیت‌های آینده‌نگرانه زیر در نقشه راه جانمایی شده‌اند:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <span className="font-bold text-[#3b185f] text-xs block">۱. بوم مدل کسب‌وکار (BMC) و تنوع درآمدی:</span>
                    <p className="text-[11px] text-slate-500">توسعه مدل‌های اعتباری سالن‌داران، اشتراک‌های VIP و پکیج‌های تبلیغاتی محلی.</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <span className="font-bold text-[#3b185f] text-xs block">۲. تحلیل داده‌محور ترندهای بازار:</span>
                    <p className="text-[11px] text-slate-500">پایش پرطرفدارترین خدمات زیبایی در هر فصل و ارائه بینش‌های تجاری به سالن‌داران.</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <span className="font-bold text-[#3b185f] text-xs block">۳. پرسونای تخصصی مشتریان:</span>
                    <p className="text-[11px] text-slate-500">تفکیک الگوهای رفتاری خدمات روزمره در برابر رویدادهای خاص (عروسی، مهمانی و گریم).</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <span className="font-bold text-[#3b185f] text-xs block">۴. نقشه حضور دیجیتال و سئو محلی:</span>
                    <p className="text-[11px] text-slate-500">معرفی سالن‌ها در صفحات اختصاصی با ایندکس محلی برای جذب ورودی از موتورهای جستجو.</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <span className="font-bold text-[#3b185f] text-xs block">۵. هوش مصنوعی شبیه‌ساز زنده:</span>
                    <p className="text-[11px] text-slate-500">ارتقای ماژول شبیه‌ساز زیبایی به پردازش بلادرنگ رنگ مو و لایت سه‌بعدی روی ویدیو.</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <span className="font-bold text-[#3b185f] text-xs block">۶. سند اعتماد و بیمه خدمات در منزل:</span>
                    <p className="text-[11px] text-slate-500">پوشش تضمین کیفیت و بیمه حوادث برای خدمات ارائه‌شده در محل سکونت مشتریان.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-medium">
                  <strong>چشم‌انداز زیبانو:</strong> هدف نهایی پلتفرم، تبدیل شدن به معتبرترین مرجع ارزیابی کیفیت، قیمت‌گذاری شفاف و نوبت‌دهی خدمات مراقبت و زیبایی در سراسر کشور است.
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
