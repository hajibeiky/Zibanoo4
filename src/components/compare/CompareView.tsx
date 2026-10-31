import React from 'react';
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
  Layers
} from 'lucide-react';

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
  if (comparedSalons.length < 2) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
          <ArrowLeftRight className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900">
            برای مقایسه، حداقل ۲ آرایشگاه انتخاب کنید
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            شما هم‌اکنون {comparedSalons.length} آرایشگاه در لیست مقایسه دارید. می‌توانید تا ۳ آرایشگاه را انتخاب کرده و قیمت، خدمات و نمونه‌کارها را در یک نما مقایسه کنید.
          </p>
        </div>

        {comparedSalons.length === 1 && (
          <div className="p-4 max-w-sm mx-auto bg-white rounded-xl border border-slate-200 text-xs flex items-center justify-between">
            <span className="font-bold text-slate-800">{comparedSalons[0].name}</span>
            <button
              onClick={() => onRemoveSalon(comparedSalons[0].id)}
              className="text-red-600 hover:underline"
            >
              حذف
            </button>
          </div>
        )}

        <button
          onClick={onGoToSearch}
          className="px-6 py-3 bg-[#3b185f] hover:bg-[#2b1047] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-sm inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>انتخاب آرایشگاه از فهرست</span>
        </button>
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
            <span>مقایسه تطبیقی زیبانو ({comparedSalons.length} آرایشگاه)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            مقایسه رو در روی آرایشگاه‌ها
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            بررسی همزمان خدمات، محدوده قیمت، شرایط خدمات در منزل و نمونه‌کارها بدون نیاز به مراجعه به پیج‌های جداگانه
          </p>
        </div>

        <div className="flex items-center gap-2">
          {comparedSalons.length < 3 && (
            <button
              onClick={onGoToSearch}
              className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-[#3b185f] flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-amber-600" />
              <span>افزودن آرایشگاه سوم</span>
            </button>
          )}
          <button
            onClick={onClearAll}
            className="px-3 py-2 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-xs font-medium transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>پاک کردن لیست</span>
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto bg-white rounded-3xl border border-slate-200 shadow-xs">
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70">
              <th className="p-4 sm:p-5 font-bold text-slate-500 w-44">معیار مقایسه</th>
              {comparedSalons.map((salon) => (
                <th key={salon.id} className="p-4 sm:p-5 min-w-[240px]">
                  <div className="space-y-3">
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-200">
                      <img
                        src={salon.imageUrl}
                        alt={salon.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => onRemoveSalon(salon.id)}
                        className="absolute top-2 left-2 p-1.5 rounded-lg bg-black/60 hover:bg-black text-white transition-colors"
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
                      <span className="text-[11px] text-slate-500">
                        {salon.city}، {salon.district}
                      </span>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {/* Gender Type */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 bg-slate-50/50">نوع آرایشگاه</td>
              {comparedSalons.map((s) => (
                <td key={s.id} className="p-4 sm:p-5">
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-50 text-[#3b185f]">
                    {s.gender === 'women' ? 'بانوان' : s.gender === 'men' ? 'آقایان' : 'بانوان و آقایان'}
                  </span>
                </td>
              ))}
            </tr>

            {/* Price Level & Range */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 bg-slate-50/50">رده قیمتی و هزینه</td>
              {comparedSalons.map((s) => (
                <td key={s.id} className="p-4 sm:p-5 space-y-1">
                  <div className="font-bold text-sm text-slate-900">{s.priceLevel}</div>
                  <div className="text-slate-500 tabular-nums">{s.priceRangeText}</div>
                </td>
              ))}
            </tr>

            {/* Rating */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 bg-slate-50/50">امتیاز آزمایشی</td>
              {comparedSalons.map((s) => (
                <td key={s.id} className="p-4 sm:p-5">
                  <div className="flex items-center gap-1 font-bold text-slate-800">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                    <span className="tabular-nums">{s.rating} از ۵</span>
                    <span className="text-slate-400 font-normal">({s.reviewsCount} نظر)</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Home Service Support */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 bg-slate-50/50">خدمات در منزل (محل)</td>
              {comparedSalons.map((s) => (
                <td key={s.id} className="p-4 sm:p-5">
                  {s.hasHomeService ? (
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                        <Check className="w-3.5 h-3.5" />
                        پشتیبانی می‌شود
                      </span>
                      <div className="text-[11px] text-slate-500">
                        ایاب‌وذهاب: {s.homeServiceFee.toLocaleString('fa-IR')} تومان
                      </div>
                    </div>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-slate-400 font-medium">
                      <X className="w-3.5 h-3.5" />
                      فقط مراجعه حضوری
                    </span>
                  )}
                </td>
              ))}
            </tr>

            {/* Featured Services */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 bg-slate-50/50">خدمات شاخص</td>
              {comparedSalons.map((s) => (
                <td key={s.id} className="p-4 sm:p-5">
                  <ul className="space-y-1.5">
                    {s.featuredServices.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Portfolio sample */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 bg-slate-50/50">نمونه‌کار نمونه</td>
              {comparedSalons.map((s) => (
                <td key={s.id} className="p-4 sm:p-5">
                  {s.portfolio[0] ? (
                    <div className="space-y-1">
                      <div className="w-24 aspect-[4/3] rounded-lg overflow-hidden bg-slate-100">
                        <img
                          src={s.portfolio[0].imageUrl}
                          alt=""
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-medium text-slate-600 block line-clamp-1">
                        {s.portfolio[0].title}
                      </span>
                    </div>
                  ) : (
                    <span className="text-slate-400">-</span>
                  )}
                </td>
              ))}
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
                    <span>رزرو آنلاین</span>
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
    </div>
  );
};
