import React, { useState } from 'react';
import { Salon, ActiveView } from '../../types';
import { SalonCard } from '../common/SalonCard';
import { SmartPreviewConcept } from './SmartPreviewConcept';
import { IRAN_CITIES, SERVICE_CATEGORIES } from '../../data/mockData';
import { 
  Search, 
  MapPin, 
  Scissors, 
  ArrowLeftRight, 
  DollarSign, 
  Layers, 
  Home as HomeIcon, 
  CalendarCheck, 
  Sparkles, 
  Users, 
  Bell, 
  CheckCircle2, 
  ArrowLeft,
  ChevronLeft,
  ShieldCheck,
  Star,
  BookOpen
} from 'lucide-react';

interface HomeViewProps {
  salons: Salon[];
  onSelectSalon: (salon: Salon) => void;
  onBookSalon: (salon: Salon) => void;
  onToggleCompare: (salon: Salon) => void;
  comparedSalonIds: string[];
  onNavigate: (view: ActiveView, extra?: any) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  salons,
  onSelectSalon,
  onBookSalon,
  onToggleCompare,
  comparedSalonIds,
  onNavigate
}) => {
  // Quick hero search state
  const [selectedCity, setSelectedCity] = useState('همه شهرها');
  const [selectedGender, setSelectedGender] = useState<'all' | 'women' | 'men'>('all');
  const [selectedCategory, setSelectedCategory] = useState('همه خدمات');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('search', {
      city: selectedCity,
      gender: selectedGender,
      category: selectedCategory
    });
  };

  const featuredSalons = salons.slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-16 bg-gradient-to-b from-[#2a0e44]/5 via-purple-50/40 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-right">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-amber-500/30 shadow-xs text-xs font-semibold text-[#3b185f]">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>سامانه هوشمند جستجو، مقایسه و رزرو خدمات آرایشگاهی</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.25]">
                آرایشگاه مناسب خودت را <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#3b185f] to-amber-700">
                  هوشمندانه انتخاب کن
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                خدمات آرایشگاهی را در شهرهای مختلف پیدا کن، قیمت‌ها و نمونه‌کارها را بدون سردرگمی در یک صفحه مقایسه کن و با اطمینان درخواست رزرو بده؛ حتی با خدمات در محل برای کسانی که امکان مراجعه حضوری ندارند.
              </p>

              {/* Quick Search Box */}
              <form 
                onSubmit={handleHeroSearch}
                className="bg-white p-3 sm:p-4 rounded-2xl shadow-md border border-slate-200/90 space-y-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* City Select */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      انتخاب شهر
                    </label>
                    <div className="relative">
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3b185f]/20 focus:border-[#3b185f] appearance-none"
                      >
                        {IRAN_CITIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* Gender Select */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      نوع خدمات
                    </label>
                    <div className="relative">
                      <select
                        value={selectedGender}
                        onChange={(e) => setSelectedGender(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3b185f]/20 focus:border-[#3b185f] appearance-none"
                      >
                        <option value="all">بانوان و آقایان</option>
                        <option value="women">بانوان</option>
                        <option value="men">آقایان</option>
                      </select>
                      <Users className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* Category Select */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      دسته خدمت
                    </label>
                    <div className="relative">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3b185f]/20 focus:border-[#3b185f] appearance-none"
                      >
                        {SERVICE_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <Scissors className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 bg-[#3b185f] hover:bg-[#2b1047] text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4 text-amber-300" />
                    جستجوی هوشمند آرایشگاه
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('search', { homeServiceOnly: true })}
                    className="py-2.5 px-4 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/70 rounded-xl text-xs sm:text-sm font-bold transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <HomeIcon className="w-4 h-4 text-amber-700" />
                    <span>خدمات در محل</span>
                  </button>
                </div>
              </form>

              {/* Quick links */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                <span className="font-bold text-[#3b185f]">دسترسی سریع:</span>
                <button 
                  onClick={() => onNavigate('women-salons')}
                  className="px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:border-[#3b185f] text-slate-700 transition-colors cursor-pointer"
                >
                  سالن‌های زنانه
                </button>
                <button 
                  onClick={() => onNavigate('men-salons')}
                  className="px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:border-[#3b185f] text-slate-700 transition-colors cursor-pointer"
                >
                  پیرایش‌های مردانه
                </button>
                <button 
                  onClick={() => onNavigate('simulator')}
                  className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-300 text-amber-900 hover:bg-amber-100 transition-colors font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  شبیه‌ساز زیبایی چهره
                </button>
                <button 
                  onClick={() => onNavigate('dossier')}
                  className="px-2.5 py-1 rounded-md bg-purple-100 text-[#3b185f] hover:bg-purple-200 transition-colors font-medium flex items-center gap-1 cursor-pointer"
                >
                  <BookOpen className="w-3 h-3" />
                  پرونده تحلیلی کسب‌وکار
                </button>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] lg:aspect-[1/1] bg-slate-100">
                <img
                  src="/src/assets/images/hero_salon_luxury_1793464702288.jpg"
                  alt="محیط آرایشگاه لوکس زیبانو"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2a0e44]/80 via-transparent to-transparent" />
                
                {/* Overlay Card on bottom */}
                <div className="absolute bottom-4 right-4 left-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#3b185f] flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      تضمین شفافیت قیمت و کیفیت
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      سامانه برخط
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    زیبانو با گردآوری اطلاعات موثق و امکان مقایسه دقیق، ریسک نارضایتی و اتلاف وقت را به حداقل می‌رساند.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Introducing Two Pillars: Women & Men */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            خدمات تخصصی متناسب با نیاز شما
          </h2>
          <p className="text-sm text-slate-500">
            زیبانو سامانه یکپارچه‌ای برای هر دو جامعه مخاطب است؛ بدون جداسازی پلتفرم، با کیفیت و هویت حرفه‌ای یکسان.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Women Card */}
          <div className="group relative rounded-3xl overflow-hidden shadow-sm border border-slate-200 bg-white flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src="/src/assets/images/women_beauty_services_1793464702979.jpg"
                alt="خدمات زیبایی بانوان"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 right-4 text-white">
                <span className="text-xs font-bold text-amber-300">دسته‌بندی تخصصی</span>
                <h3 className="text-2xl font-black">خدمات زیبایی بانوان</h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                تخصصی‌ترین مراکز رنگ، مش، بالیاژ، کوپ ژورنالی، کراتین و احیا، میکاپ عروس، پاکسازی پوست و همچنین لاین ویژه آرایشگران اعزامی به منزل در سراسر شهر.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-medium text-[#3b185f]">
                <span className="px-2.5 py-1 rounded-lg bg-purple-50">رنگ و لایت تخصصی</span>
                <span className="px-2.5 py-1 rounded-lg bg-purple-50">میکاپ و شینیون</span>
                <span className="px-2.5 py-1 rounded-lg bg-purple-50">کراتین و پروتئین‌تراپی</span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800">خدمات در محل</span>
              </div>
              <button
                onClick={() => onNavigate('women-salons')}
                className="w-full py-3 px-4 bg-[#3b185f] hover:bg-[#2b1047] text-white rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>مشاهده سالن‌های زیبایی بانوان</span>
                <ArrowLeft className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </div>

          {/* Men Card */}
          <div className="group relative rounded-3xl overflow-hidden shadow-sm border border-slate-200 bg-white flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src="/src/assets/images/men_grooming_services_1793464703155.jpg"
                alt="خدمات پیرایش آقایان"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 right-4 text-white">
                <span className="text-xs font-bold text-amber-300">دسته‌بندی تخصصی</span>
                <h3 className="text-2xl font-black">خدمات آرایش و پیرایش آقایان</h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                برترین باربرشاپ‌ها و استودیوهای گرومینگ آقایان؛ هیرکات کلاسیک و مدرن، فید مو، طراحی خط ریش، پاکسازی پوست (هیدروفیشیال)، پکیج‌های داماد و خدمات در محل.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-800">
                <span className="px-2.5 py-1 rounded-lg bg-slate-100">فید و هیرکات مدرن</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100">آنکادر ریش حرفه‌ای</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100">فیشیال پوست آقایان</span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800">پیرایش در منزل</span>
              </div>
              <button
                onClick={() => onNavigate('men-salons')}
                className="w-full py-3 px-4 bg-[#240c3d] hover:bg-slate-900 text-white rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>مشاهده آرایشگاه‌های مردانه</span>
                <ArrowLeft className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 8 Competitive Advantages of ZIBANO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-100/60 px-3 py-1 rounded-full">
            تمایزهای بنیادین پلتفرم
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            چرا کاربران زیبانو را انتخاب می‌کنند؟
          </h2>
          <p className="text-sm text-slate-500">
            مقایسه راهکار زیبانو با الگوهای سنتی (اینستاگرام، تلفن و پرس‌وجوی حضوری)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Adv 1 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#3b185f]/40 transition-colors space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#3b185f] flex items-center justify-center">
                <ArrowLeftRight className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-bold text-base text-slate-900">چند آرایشگاه، یک انتخاب هوشمندانه</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                آرایشگاه‌های موردنظرت را کنار هم قرار بده و قیمت خدمات، نمونه‌کارها، امکانات و فاصله آن‌ها را بررسی کن تا انتخاب مناسب‌تری داشته باشی.
              </p>
            </div>
            <button
              onClick={() => onNavigate('compare')}
              className="mt-2 w-full py-2 px-3 rounded-lg bg-purple-50 hover:bg-purple-100 text-[#3b185f] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>شروع مقایسه آرایشگاه‌ها</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Adv 2 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#3b185f]/40 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#3b185f] flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-bold text-base text-slate-900">۲. شفافیت کامل قیمت‌ها</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              مشاهده لیست مصوب و دقیق خدمات و اطلاع از تمام هزینه‌ها پیش از رزرو نوبت، بدون نیاز به تماس تلفنی یا غافلگیری در سالن.
            </p>
          </div>

          {/* Adv 3 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#3b185f]/40 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#3b185f] flex items-center justify-center">
              <Layers className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-bold text-base text-slate-900">۳. نمونه‌کارهای دسته‌بندی‌شده</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              تفکیک آلبوم کارهای واقعی بر اساس نوع خدمت (رنگ، کوتاهی، میکاپ، فید) برای تصمیم‌گیری آگاهانه و سریع.
            </p>
          </div>

          {/* Adv 4 */}
          <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs bg-gradient-to-b from-amber-50/30 to-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <HomeIcon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">۴. خدمات آرایشگری در محل</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              پاسخ به یک نیاز پنهان کشف‌شده در مصاحبه میدانی: اعزام آرایشگر به منزل برای سالمندان، بیماران، مصدومان و افراد پرمشغله.
            </p>
          </div>

          {/* Adv 5 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#3b185f]/40 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#3b185f] flex items-center justify-center">
              <CalendarCheck className="w-5 h-5 text-purple-700" />
            </div>
            <h3 className="font-bold text-base text-slate-900">۵. رزرو آنلاین بدون تداخل</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              انتخاب آزادترین سانس و خدمت مورد نظر، ثبت مشخصات آزمایشی و دریافت کد رهگیری آنی بدون اتلاف وقت تلفنی.
            </p>
          </div>

          {/* Adv 6 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#3b185f]/40 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#3b185f] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-700" />
            </div>
            <h3 className="font-bold text-base text-slate-900">۶. پیش‌نمایش هوشمند آینده</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              طراحی ماژولار زیرساخت اتصال به هوش مصنوعی جهت آزمایش مجازی مدل مو روی چهره کاربر پیش از مراجعه در فاز بعدی.
            </p>
          </div>

          {/* Adv 7 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#3b185f]/40 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#3b185f] flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-700" />
            </div>
            <h3 className="font-bold text-base text-slate-900">۷. پوشش فراگیر زنانه و مردانه</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              پلتفرمی مستقل برای تمام اعضای خانواده، پوشش آرایشگاه‌های معتبر شهرهای ایران با رعایت کامل استانداردهای هر بخش.
            </p>
          </div>

          {/* Adv 8 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#3b185f]/40 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#3b185f] flex items-center justify-center">
              <Bell className="w-5 h-5 text-purple-700" />
            </div>
            <h3 className="font-bold text-base text-slate-900">۸. مدیریت نوبت و پیگیری</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ثبت تاریخچه کامل درخواست‌ها، امکان لغو یا پیگیری وضعیت تأیید آرایشگر و جلوگیری از فراموشی نوبت.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Featured Salons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3b185f] mb-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              مجموعه‌های منتخب زیبانو
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              آرایشگاه‌های برگزیده و دارای تاییدیه
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              دارای بالاترین امتیاز رضایت، قیمت‌های شفاف و نمونه‌کارهای تاییدشده
            </p>
          </div>

          <button
            onClick={() => onNavigate('search')}
            className="text-xs font-bold text-[#3b185f] hover:text-[#240c3d] flex items-center gap-1 self-start sm:self-auto"
          >
            <span>مشاهده همه آرایشگاه‌ها ({salons.length} مجموعه)</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredSalons.map((salon) => (
            <SalonCard
              key={salon.id}
              salon={salon}
              onSelect={onSelectSalon}
              onBook={onBookSalon}
              onToggleCompare={onToggleCompare}
              isCompared={comparedSalonIds.includes(salon.id)}
            />
          ))}
        </div>
      </section>

      {/* 5. Dedicated At-Home Services Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-50 via-white to-purple-50/50 rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md border-2 border-white">
                <img
                  src="/src/assets/images/home_service_beauty_1793464703481.jpg"
                  alt="خدمات آرایشگری در محل مشتری"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-md shadow-xs flex items-center gap-1">
                  <HomeIcon className="w-3.5 h-3.5" />
                  خدمت نوآورانه زیبانو
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5 text-right">
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-700 bg-amber-200/50 px-3 py-1 rounded-full">
                  ارزش اجتماعی و انسانی
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  زیبایی، بدون نیاز به خروج از خانه
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  یافته‌های مصاحبه میدانی نشان داد بسیاری از سالمندان، مادران دارای نوزاد، بیماران، افراد دارای آسیب‌دیدگی جسمانی یا افراد پرمشغله امکان مراجعه حضوری به آرایشگاه را ندارند. زیبانو این امکان را فراهم کرده تا آرایشگران متعهد با تجهیزات بهداشتی پرتابل به منزل شما بیایند.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/70">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>تجهیزات بهداشتی و ضدعفونی‌شده پرتابل</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/70">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>تعرفه مشخص ایاب‌وذهاب و خدمات شفاف</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/70">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>پوشش خدمات زنانه و مردانه در سراسر شهر</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/70">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>هماهنگی دقیق زمان بدون معطلی و انتظار</span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => onNavigate('search', { homeServiceOnly: true })}
                  className="px-6 py-3 bg-[#3b185f] hover:bg-[#2b1047] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-sm flex items-center gap-2"
                >
                  <HomeIcon className="w-4 h-4 text-amber-300" />
                  <span>مشاهده آرایشگران ارائه‌دهنده خدمات در محل</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Four-Step Journey Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3b185f] bg-purple-50 px-3 py-1 rounded-full">
            تجربه کاربری آسان
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            مراحل استفاده از سامانه زیبانو
          </h2>
          <p className="text-sm text-slate-500">
            چهار گام سریع برای دستیابی به بهترین خدمت زیبایی
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs relative space-y-3">
            <span className="text-3xl font-black text-amber-600 tabular-nums">01</span>
            <h3 className="text-base font-bold text-slate-900">جستجوی آرایشگاه</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              فیلتر بر اساس شهر، محله، جنسیت (بانوان یا آقایان)، نوع خدمت و رده قیمتی دلخواه.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs relative space-y-3">
            <span className="text-3xl font-black text-amber-600 tabular-nums">02</span>
            <h3 className="text-base font-bold text-slate-900">بررسی و مقایسه</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              مقایسه رو در روی ۲ یا ۳ آرایشگاه، دیدن آلبوم نمونه‌کارها و اطلاع از قیمت شفاف هر خدمت.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs relative space-y-3">
            <span className="text-3xl font-black text-amber-600 tabular-nums">03</span>
            <h3 className="text-base font-bold text-slate-900">انتخاب خدمت و زمان</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              مشاهده سانس‌های آزاد آرایشگر و انتخاب خدمت حضوری در سالن یا خدمت در محل مشتری.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-6 rounded-2xl border border-purple-200 bg-purple-50/20 shadow-xs relative space-y-3">
            <span className="text-3xl font-black text-[#3b185f] tabular-nums">04</span>
            <h3 className="text-base font-bold text-slate-900">ثبت نهایی و رهگیری</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              دریافت کد رهگیری اختصاصی، ذخیره در لیست نوبت‌ها و امکان مدیریت وضعیت در پنل کاربری.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Future Smart Preview Concept Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SmartPreviewConcept onExploreSalons={() => onNavigate('search')} />
      </section>

      {/* 8. Professional Footer */}
      <footer className="border-t border-slate-200 pt-12 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-1">
              <span className="text-xl font-black text-[#2a0e44]">زیبانو | ZIBANO</span>
              <p className="text-slate-500 leading-relaxed text-xs">
                سامانه هوشمند جستجو، مقایسه و رزرو آنلاین آرایشگاه‌های زنانه و مردانه و خدمات در محل.
              </p>
              <div className="pt-2 text-slate-400 text-[11px]">
                پلتفرم تخصصی معرفی و رزرو آنلاین خدمات زیبایی و مراقبت شخصی
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-slate-800 text-sm block">دسترسی سریع</span>
              <ul className="space-y-1.5 text-slate-600">
                <li><button onClick={() => onNavigate('home')} className="hover:text-[#3b185f]">صفحه اصلی</button></li>
                <li><button onClick={() => onNavigate('women-salons')} className="hover:text-[#3b185f]">آرایشگاه‌های زنانه</button></li>
                <li><button onClick={() => onNavigate('men-salons')} className="hover:text-[#3b185f]">آرایشگاه‌های مردانه</button></li>
                <li><button onClick={() => onNavigate('search', { homeServiceOnly: true })} className="hover:text-[#3b185f]">خدمات زیبایی در محل</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-slate-800 text-sm block">امکانات پلتفرم</span>
              <ul className="space-y-1.5 text-slate-600">
                <li><button onClick={() => onNavigate('simulator')} className="hover:text-[#3b185f]">شبیه‌ساز زیبایی چهره</button></li>
                <li><button onClick={() => onNavigate('compare')} className="hover:text-[#3b185f]">مقایسه آرایشگاه‌ها</button></li>
                <li><button onClick={() => onNavigate('my-bookings')} className="hover:text-[#3b185f]">پیگیری نوبت‌ها</button></li>
                <li><button onClick={() => onNavigate('barber-panel')} className="hover:text-[#3b185f]">پنل اختصاصی آرایشگر</button></li>
                <li><button onClick={() => onNavigate('dossier')} className="hover:text-[#3b185f] font-semibold text-[#3b185f]">پرونده تحلیلی کسب‌وکار</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-slate-800 text-sm block">شفافیت و امنیت خدمات</span>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                کلیه آرایشگاه‌ها و تعرفه‌ها با تایید رسمی سالن‌داران در زیبانو ثبت شده‌اند. تسویه‌حساب نهایی خدمات در محل سالن یا منزل با رضایت کامل مشتری انجام می‌شود.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-200/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
            <div>
              © ۱۴۰۳ زیبانو (ZIBANO) — تمامی حقوق برای سامانه هوشمند رزرو آرایشگاه محفوظ است.
            </div>
            <div className="flex items-center gap-4">
              <span>انتخاب آگاهانه، رزرو آسان</span>
              <button onClick={() => onNavigate('dossier')} className="text-[#3b185f] font-bold underline cursor-pointer">
                مشاهده پرونده تحلیلی کسب‌وکار
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
