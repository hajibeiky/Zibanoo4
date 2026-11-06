import React, { useState } from 'react';
import { Salon } from '../../types';
import { 
  ArrowLeftRight, 
  Trash2, 
  Plus, 
  Check, 
  X, 
  Star, 
  MapPin, 
  Home, 
  Calendar,
  Layers,
  Car,
  Footprints,
  Clock,
  User,
  ZoomIn,
  Eye,
  Scissors
} from 'lucide-react';
import { calculateDistanceKm, estimateTravelTimes, DEFAULT_USER_LOCATION } from '../../data/mockData';

interface CompareViewProps {
  comparedSalons: Salon[];
  onRemoveSalon: (salonId: string) => void;
  onClearAll: () => void;
  onBook: (salon: Salon) => void;
  onGoToSearch: () => void;
  onViewSalon: (salon: Salon) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  comparedSalons,
  onRemoveSalon,
  onClearAll,
  onBook,
  onGoToSearch,
  onViewSalon
}) => {
  // Lightbox modal for enlarged portfolio image
  const [enlargedImage, setEnlargedImage] = useState<{ url: string; title: string; salonName: string } | null>(null);

  if (comparedSalons.length < 2) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-purple-50 border border-purple-200/80 text-[#3b185f] flex items-center justify-center shadow-xs">
          <ArrowLeftRight className="w-10 h-10 text-amber-600" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            چند آرایشگاه، یک انتخاب هوشمندانه
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            آرایشگاه‌های موردنظرت را کنار هم قرار بده و قیمت خدمات، نمونه‌کارها، امکانات و فاصله آن‌ها را بررسی کن تا انتخاب مناسب‌تری داشته باشی.
          </p>
        </div>

        {comparedSalons.length === 1 ? (
          <div className="p-4 max-w-sm mx-auto bg-white rounded-2xl border border-slate-200 text-xs flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="font-bold text-slate-800">{comparedSalons[0].name}</span>
            </div>
            <button
              onClick={() => onRemoveSalon(comparedSalons[0].id)}
              className="text-red-600 hover:underline font-semibold"
            >
              حذف
            </button>
          </div>
        ) : (
          <div className="p-4 max-w-md mx-auto bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 text-right leading-relaxed">
            <strong>راهنمای مقایسه:</strong> برای شروع مقایسه، وارد صفحه جستجو یا آرایشگاه‌ها شوید و روی آیکون <strong>مقایسه (⇆)</strong> روی کارت حداقل ۲ سالن کلیک نمایید.
          </div>
        )}

        <div>
          <button
            onClick={onGoToSearch}
            className="px-6 py-3 bg-[#3b185f] hover:bg-[#2b1047] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>شروع مقایسه آرایشگاه‌ها</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 mb-1">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>چند آرایشگاه، یک انتخاب هوشمندانه ({comparedSalons.length} سالن)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            جدول مقایسه تطبیقی آرایشگاه‌ها
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            آرایشگاه‌های موردنظرت را کنار هم قرار بده و قیمت خدمات، نمونه‌کارها، امکانات و فاصله آن‌ها را بررسی کن تا انتخاب مناسب‌تری داشته باشی.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {comparedSalons.length < 3 && (
            <button
              onClick={onGoToSearch}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-[#3b185f] flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4 text-amber-600" />
              <span>جایگزینی یا افزودن آرایشگاه سوم</span>
            </button>
          )}
          <button
            onClick={onClearAll}
            className="px-3.5 py-2 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-xs font-medium transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>پاک کردن لیست</span>
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto bg-white rounded-3xl border border-slate-200 shadow-sm">
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="p-4 sm:p-5 font-extrabold text-slate-500 w-48 text-right">معیار مقایسه</th>
              {comparedSalons.map((salon) => (
                <th key={salon.id} className="p-4 sm:p-5 min-w-[260px] text-right font-normal">
                  <div className="space-y-3">
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-200 border">
                      <img
                        src={salon.imageUrl}
                        alt={salon.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => onRemoveSalon(salon.id)}
                        className="absolute top-2 left-2 p-1.5 rounded-xl bg-black/70 hover:bg-black text-white transition-colors"
                        title="حذف از مقایسه"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div>
                      <h3 
                        onClick={() => onViewSalon(salon)}
                        className="font-black text-base text-slate-900 hover:text-[#3b185f] cursor-pointer"
                      >
                        {salon.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                        <MapPin className="w-3 h-3 text-amber-600" />
                        <span>{salon.city}، {salon.district}</span>
                      </div>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {/* Salon Owner / Stylist */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 bg-slate-50/40">نام آرایشگر / مسئول</td>
              {comparedSalons.map((s) => (
                <td key={s.id} className="p-4 sm:p-5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-200 border">
                      <img src={s.ownerAvatar || s.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-bold text-slate-900">{s.ownerName}</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Price Level & Service Range */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 bg-slate-50/40">قیمت خدمت و رده تعرفه</td>
              {comparedSalons.map((s) => (
                <td key={s.id} className="p-4 sm:p-5 space-y-1">
                  <div className="font-bold text-sm text-[#3b185f]">{s.priceLevel}</div>
                  <div className="text-slate-600 font-semibold tabular-nums">{s.priceRangeText}</div>
                </td>
              ))}
            </tr>

            {/* Service Duration */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 bg-slate-50/40">مدت زمان انجام خدمت</td>
              {comparedSalons.map((s) => (
                <td key={s.id} className="p-4 sm:p-5">
                  <span className="tabular-nums font-semibold text-slate-700">
                    میانگین {s.services[0]?.durationMinutes || 45} دقیقه
                  </span>
                </td>
              ))}
            </tr>

            {/* Ratings & Sample Reviews */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 bg-slate-50/40">امتیاز و نظرات</td>
              {comparedSalons.map((s) => (
                <td key={s.id} className="p-4 sm:p-5">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                    <span className="tabular-nums">{s.rating} از ۵</span>
                    <span className="text-slate-400 font-normal">({s.reviewsCount} نظر نمونه)</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Categorized Portfolio with Lightbox */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 bg-slate-50/40">
                نمونه‌کارها (کلیک جهت بزرگنمایی)
              </td>
              {comparedSalons.map((s) => (
                <td key={s.id} className="p-4 sm:p-5">
                  <div className="flex gap-2">
                    {s.portfolio.slice(0, 2).map((port) => (
                      <div
                        key={port.id}
                        onClick={() => setEnlargedImage({ url: port.imageUrl, title: port.title, salonName: s.name })}
                        className="group relative w-20 aspect-square rounded-xl overflow-hidden bg-slate-100 border cursor-pointer hover:border-amber-500 transition-all shadow-xs"
                      >
                        <img src={port.imageUrl} alt={port.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                          <ZoomIn className="w-4 h-4 text-amber-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* At-Salon vs At-Home Services */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 bg-slate-50/40">خدمات حضوری یا در محل</td>
              {comparedSalons.map((s) => (
                <td key={s.id} className="p-4 sm:p-5">
                  {s.hasHomeService ? (
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                        <Check className="w-3.5 h-3.5" />
                        پشتیبانی از اعزام به محل
                      </span>
                      <div className="text-[11px] text-slate-500 tabular-nums">
                        هزینه ایاب‌وذهاب: {s.homeServiceFee.toLocaleString('fa-IR')} تومان
                      </div>
                    </div>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-slate-400 font-medium">
                      <X className="w-3.5 h-3.5" />
                      فقط مراجعه حضوری به سالن
                    </span>
                  )}
                </td>
              ))}
            </tr>

            {/* Working Hours & Next Open Slots */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 bg-slate-50/40">ساعت کاری و نوبت‌های خالی</td>
              {comparedSalons.map((s) => (
                <td key={s.id} className="p-4 sm:p-5 space-y-1">
                  <div className="flex items-center gap-1 text-slate-700 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#3b185f]" />
                    <span>{s.workingHours}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded inline-block">
                    دارای سانس‌های آزاد فردا
                  </span>
                </td>
              ))}
            </tr>

            {/* Distance & Travel Times to Customer Location */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 bg-slate-50/40">فاصله و زمان رسیدن تقریبی</td>
              {comparedSalons.map((s) => {
                const dist = calculateDistanceKm(DEFAULT_USER_LOCATION.lat, DEFAULT_USER_LOCATION.lng, s.latitude, s.longitude);
                const times = estimateTravelTimes(dist);

                return (
                  <td key={s.id} className="p-4 sm:p-5 space-y-1.5">
                    <div className="flex items-center gap-1 font-bold text-slate-900">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span className="tabular-nums">{dist} کیلومتر فاصله</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Car className="w-3 h-3 text-amber-700" />
                        <span className="tabular-nums">{times.carMinutes} دقیقه خودرو</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Footprints className="w-3 h-3 text-emerald-600" />
                        <span className="tabular-nums">{times.walkMinutes} دقیقه پیاده</span>
                      </span>
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* Action CTAs */}
            <tr className="bg-slate-50/50">
              <td className="p-4 sm:p-5 font-bold text-slate-700">اقدام نهایی</td>
              {comparedSalons.map((s) => (
                <td key={s.id} className="p-4 sm:p-5 space-y-2">
                  <button
                    onClick={() => onBook(s)}
                    className="w-full py-2.5 px-3 bg-[#3b185f] hover:bg-[#2b1047] text-white font-bold rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-amber-300" />
                    <span>رزرو آنلاین نوبت</span>
                  </button>
                  <button
                    onClick={() => onViewSalon(s)}
                    className="w-full py-2 px-3 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-medium rounded-xl text-xs transition-colors"
                  >
                    مشاهده صفحه کامل
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Lightbox Modal for enlarged image view */}
      {enlargedImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-3xl overflow-hidden max-w-2xl w-full border border-white/20 p-4 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-white">{enlargedImage.title}</h4>
                <span className="text-xs text-amber-300">{enlargedImage.salonName}</span>
              </div>
              <button
                onClick={() => setEnlargedImage(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img src={enlargedImage.url} alt={enlargedImage.title} className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
