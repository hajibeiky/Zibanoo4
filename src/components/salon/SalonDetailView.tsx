import React, { useState } from 'react';
import { Salon, ServiceItem } from '../../types';
import { 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  Home, 
  ArrowLeftRight, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  Sparkles,
  Info
} from 'lucide-react';

interface SalonDetailViewProps {
  salon: Salon;
  onBack: () => void;
  onBook: (salon: Salon, preselectedService?: ServiceItem) => void;
  onToggleCompare: (salon: Salon) => void;
  isCompared: boolean;
}

export const SalonDetailView: React.FC<SalonDetailViewProps> = ({
  salon,
  onBack,
  onBook,
  onToggleCompare,
  isCompared
}) => {
  const [activeTab, setActiveTab] = useState<'services' | 'portfolio' | 'home-service' | 'reviews'>('services');
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);

  const gallery = salon.galleryImages.length > 0 ? salon.galleryImages : [salon.imageUrl];
  const genderLabel = salon.gender === 'women' ? 'سالن زیبایی بانوان' : salon.gender === 'men' ? 'پیرایش و گرومینگ آقایان' : 'خدمات بانوان و آقایان';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#3b185f] hover:text-[#240c3d] bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-xl transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به فهرست آرایشگاه‌ها</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleCompare(salon)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
              isCompared
                ? 'bg-amber-500 border-amber-600 text-slate-950 font-bold'
                : 'border-slate-200 hover:border-[#3b185f] text-slate-700 bg-white'
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>{isCompared ? 'در لیست مقایسه' : 'افزودن به مقایسه'}</span>
          </button>
        </div>
      </div>

      {/* Main Header / Hero */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Gallery side */}
          <div className="lg:col-span-6 space-y-3">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
              <img
                src={gallery[selectedGalleryIdx] || salon.imageUrl}
                alt={salon.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-xs font-bold px-2.5 py-1 rounded-md text-[#2a0e44]">
                {genderLabel}
              </div>
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex gap-2">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedGalleryIdx(idx)}
                    className={`relative w-20 aspect-[16/10] rounded-lg overflow-hidden border-2 transition-all ${
                      selectedGalleryIdx === idx ? 'border-[#3b185f] scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Salon Info Summary */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6 text-right">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  رده قیمتی: {salon.priceLevel} ({salon.priceRangeText})
                </span>
                <div className="flex items-center gap-1 bg-purple-50 text-[#3b185f] px-2.5 py-1 rounded-md text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span className="tabular-nums">{salon.rating}</span>
                  <span className="text-slate-400 font-normal">({salon.reviewsCount} نظر نمونه)</span>
                </div>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {salon.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {salon.description}
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{salon.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#3b185f] shrink-0" />
                  <span>{salon.workingHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="tabular-nums dir-ltr text-right">{salon.phone}</span>
                </div>
              </div>

              {salon.hasHomeService && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                  <span className="font-bold flex items-center gap-1.5">
                    <Home className="w-4 h-4 text-amber-700" />
                    ارائه خدمات در منزل مشتری فعال است
                  </span>
                  <span className="text-[11px] bg-white px-2 py-0.5 rounded-md font-semibold text-amber-800">
                    هزینه ایاب‌وذهاب: {salon.homeServiceFee.toLocaleString('fa-IR')} تومان
                  </span>
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <button
                onClick={() => onBook(salon)}
                className="flex-1 py-3 px-4 bg-[#3b185f] hover:bg-[#2b1047] text-white rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>درخواست رزرو آنلاین نوبت</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-t border-slate-200 px-6 bg-slate-50 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('services')}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'services'
                ? 'border-[#3b185f] text-[#3b185f]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            لیست خدمات و شفافیت قیمت ({salon.services.length})
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'portfolio'
                ? 'border-[#3b185f] text-[#3b185f]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            نمونه‌کارهای دسته‌بندی‌شده ({salon.portfolio.length})
          </button>

          <button
            onClick={() => setActiveTab('home-service')}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'home-service'
                ? 'border-[#3b185f] text-[#3b185f]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            خدمات در محل (منزل)
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'border-[#3b185f] text-[#3b185f]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            نظرات و ارزیابی آزمایشی ({salon.reviews.length})
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="space-y-6">
        {/* Tab 1: Services & Transparent Pricing */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900">تعرفه شفاف خدمات سالن</h3>
                <p className="text-xs text-slate-500">قیمت‌های ثبت‌شده در زیبانو قطعی بوده و نیاز به استعلام تلفنی ندارند.</p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {salon.services.map((srv) => (
                <div key={srv.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{srv.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-50 text-[#3b185f] font-medium">
                        {srv.category}
                      </span>
                      {srv.homeServiceAvailable && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-medium flex items-center gap-1">
                          <Home className="w-2.5 h-2.5" />
                          امکان ارائه در منزل
                        </span>
                      )}
                    </div>
                    {srv.description && (
                      <p className="text-xs text-slate-500">{srv.description}</p>
                    )}
                    <span className="text-[11px] text-slate-400 block">
                      مدت تقریبی: {srv.durationMinutes} دقیقه
                    </span>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className="text-left">
                      <span className="text-sm font-black text-slate-900 tabular-nums">
                        {srv.priceFormatted}
                      </span>
                    </div>
                    <button
                      onClick={() => onBook(salon, srv)}
                      className="py-1.5 px-3 bg-[#3b185f] hover:bg-[#2b1047] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Calendar className="w-3 h-3 text-amber-300" />
                      رزرو این خدمت
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Categorized Portfolio */}
        {activeTab === 'portfolio' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
            <div>
              <h3 className="font-bold text-base text-slate-900">نمونه‌کارهای دسته‌بندی‌شده</h3>
              <p className="text-xs text-slate-500">مشاهده نمونه‌کارهای واقعی به تفکیک خدمت جهت کاهش ریسک انتخاب</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {salon.portfolio.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden bg-slate-200">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="text-[11px] font-semibold text-[#3b185f]">
                      {item.category}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: At-Home Services */}
        {activeTab === 'home-service' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
            <div className="space-y-1">
              <h3 className="font-bold text-base text-slate-900">قوانین و شرایط دریافت خدمت در محل</h3>
              <p className="text-xs text-slate-500">ویژه سالمندان، مادران باردار، مصدومان و مشتریان پرمشغله</p>
            </div>

            {salon.hasHomeService ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 space-y-2">
                  <div className="font-bold text-sm flex items-center gap-1.5 text-amber-900">
                    <Home className="w-4 h-4 text-amber-700" />
                    <span>آرایشگاه «{salon.name}» امکان اعزام آرایشگر به محل شما را دارد.</span>
                  </div>
                  <p className="leading-relaxed">
                    تمامی ابزارها پیش از اعزام استریل شده و پک بهداشتی یکبارمصرف استفاده می‌شود. هزینه ایاب‌وذهاب در محدوده شهر مبلغ ثابت {salon.homeServiceFee.toLocaleString('fa-IR')} تومان است که به مبلغ خدمت افزوده می‌شود.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <span className="font-bold text-slate-800">خدمات قابل ارائه در منزل:</span>
                    <ul className="list-disc list-inside text-slate-600 space-y-1 pt-1">
                      {salon.services.filter(s => s.homeServiceAvailable).map(s => (
                        <li key={s.id}>{s.name} ({s.priceFormatted})</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <span className="font-bold text-slate-800">نکات بهداشتی و ایمنی:</span>
                    <p className="text-slate-600 leading-relaxed">
                      لطفاً فضای مناسب با نور کافی و پریز برق در نظر بگیرید. آرایشگر همراه با زیرانداز یکبارمصرف و روپوش بهداشتی مراجعه خواهد کرد.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onBook(salon)}
                  className="py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5"
                >
                  <Home className="w-4 h-4" />
                  درخواست رزرو اینترنتی خدمت در منزل
                </button>
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl">
                این آرایشگاه در حال حاضر خدمات اعزام به منزل ارائه نمی‌دهد و کلیه خدمات به صورت مراجعه حضوری به سالن انجام می‌شود.
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Sample Reviews */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900">نظرات و تجربیات آزمایشی کاربران</h3>
                <p className="text-xs text-slate-500">نظرات نمونه جهت اعتبارسنجی فرآیند بازخورد در فاز دانشگاهی</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-[#3b185f]">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span className="tabular-nums">{salon.rating} از ۵</span>
              </div>
            </div>

            <div className="space-y-4">
              {salon.reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{rev.userName}</span>
                      <span className="text-[11px] text-slate-400">· {rev.serviceName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span className="font-bold tabular-nums text-slate-700">{rev.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                  <span className="text-[10px] text-slate-400 block tabular-nums">{rev.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
