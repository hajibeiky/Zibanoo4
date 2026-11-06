import React, { useState, useMemo } from 'react';
import { Salon } from '../../types';
import { SalonCard } from '../common/SalonCard';
import { InteractiveSalonMap } from '../common/InteractiveSalonMap';
import { IRAN_CITIES, WOMEN_CATEGORIES } from '../../data/mockData';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  Home, 
  Map, 
  SlidersHorizontal, 
  RotateCcw, 
  Scissors,
  CheckCircle2,
  Navigation
} from 'lucide-react';

interface WomenSalonsViewProps {
  salons: Salon[];
  onSelectSalon: (salon: Salon) => void;
  onBookSalon: (salon: Salon) => void;
  onToggleCompare: (salon: Salon) => void;
  comparedSalonIds: string[];
  onNavigate?: (view: any, extra?: any) => void;
}

export const WomenSalonsView: React.FC<WomenSalonsViewProps> = ({
  salons,
  onSelectSalon,
  onBookSalon,
  onToggleCompare,
  comparedSalonIds
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [city, setCity] = useState('همه شهرها');
  const [district, setDistrict] = useState('همه منطقه‌ها');
  const [category, setCategory] = useState('همه خدمات بانوان');
  const [priceLevel, setPriceLevel] = useState('all');
  const [serviceDelivery, setServiceDelivery] = useState<'all' | 'in_salon' | 'at_home'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'distance' | 'priceAsc' | 'priceDesc' | 'reviews'>('rating');
  const [showMap, setShowMap] = useState(false);

  // Filter salons for women
  const womenSalons = useMemo(() => {
    return salons.filter(s => s.gender === 'women' || s.gender === 'both');
  }, [salons]);

  // Extract unique districts from city salons
  const availableDistricts = useMemo(() => {
    const list = womenSalons
      .filter(s => city === 'همه شهرها' || s.city === city)
      .map(s => s.district);
    return ['همه منطقه‌ها', ...Array.from(new Set(list))];
  }, [womenSalons, city]);

  const filteredSalons = useMemo(() => {
    return womenSalons.filter((salon) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = salon.name.toLowerCase().includes(q);
        const matchBarber = salon.barberName.toLowerCase().includes(q);
        const matchDistrict = salon.district.toLowerCase().includes(q);
        const matchServices = salon.services.some(s => s.name.toLowerCase().includes(q));
        if (!matchName && !matchBarber && !matchDistrict && !matchServices) return false;
      }

      // City
      if (city !== 'همه شهرها' && salon.city !== city) return false;

      // District
      if (district !== 'همه منطقه‌ها' && salon.district !== district) return false;

      // Category
      if (category !== 'همه خدمات بانوان') {
        const hasServiceCat = salon.services.some(s => s.category.includes(category) || category.includes(s.category));
        const hasFeatured = salon.featuredServices.some(f => f.includes(category) || category.includes(f));
        if (!hasServiceCat && !hasFeatured) return false;
      }

      // Price
      if (priceLevel !== 'all' && salon.priceLevel !== priceLevel) return false;

      // Delivery mode
      if (serviceDelivery === 'at_home' && !salon.hasHomeService) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'distance') {
        return (a.distanceKm || 99) - (b.distanceKm || 99);
      }
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
      if (sortBy === 'priceAsc') {
        const minA = Math.min(...a.services.map(s => s.price));
        const minB = Math.min(...b.services.map(s => s.price));
        return minA - minB;
      }
      if (sortBy === 'priceDesc') {
        const maxA = Math.max(...a.services.map(s => s.price));
        const maxB = Math.max(...b.services.map(s => s.price));
        return maxB - maxA;
      }
      return 0;
    });
  }, [womenSalons, searchQuery, city, district, category, priceLevel, serviceDelivery, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setCity('همه شهرها');
    setDistrict('همه منطقه‌ها');
    setCategory('همه خدمات بانوان');
    setPriceLevel('all');
    setServiceDelivery('all');
    setSortBy('rating');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner - Feminine Luxury Palette */}
      <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-l from-purple-900 via-[#3b185f] to-[#4c1d95] text-white border border-purple-300/30 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-amber-300/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>تالار تخصصی سالن‌های زیبایی بانوان</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            جست‌وجوی آرایشگاه زنانه
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 leading-relaxed max-w-2xl">
            آرایشگاه مناسب خود را پیدا کنید، نمونه‌کارها را ببینید، قیمت‌ها را مقایسه کنید و به‌راحتی نوبت بگیرید.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={() => setShowMap(!showMap)}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Map className="w-4 h-4" />
              <span>{showMap ? 'بستن نمای نقشه' : 'نمایش موقعیت روی نقشه'}</span>
            </button>
            <span className="text-xs text-purple-200">
              {filteredSalons.length} سالن فعال در دسترس
            </span>
          </div>
        </div>
      </div>

      {/* Optional Interactive Map */}
      {showMap && (
        <InteractiveSalonMap
          salons={filteredSalons}
          onSelectSalon={onSelectSalon}
          onBookSalon={onBookSalon}
          userCity={city !== 'همه شهرها' ? city : 'یزد'}
        />
      )}

      {/* Main Grid: Sidebar Filters + Salons List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Women Filters Sidebar */}
        <aside className="lg:col-span-3 bg-white p-5 rounded-2xl border border-purple-100 shadow-xs space-y-6 sticky top-24">
          <div className="flex items-center justify-between border-b border-purple-50 pb-3">
            <div className="flex items-center gap-1.5 font-bold text-[#3b185f] text-sm">
              <SlidersHorizontal className="w-4 h-4 text-amber-600" />
              <span>فیلترهای اختصاصی بانوان</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-[11px] font-medium text-slate-400 hover:text-red-600 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              پاکسازی
            </button>
          </div>

          {/* Search input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">نام سالن، آرایشگر یا خدمت</label>
            <div className="relative">
              <input
                type="text"
                placeholder="مثلاً: ماهور، بالیاژ، کوپ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-purple-50/40 border border-purple-100 rounded-xl px-3 py-2 pl-8 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#3b185f]/20 focus:border-[#3b185f]"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* City select */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">انتخاب شهر</label>
            <select
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setDistrict('همه منطقه‌ها');
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none"
            >
              {IRAN_CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* District select */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">محدوده / منطقه</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none"
            >
              {availableDistricts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Service Delivery Type (Crucial Section 7 Requirement) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">نحوه دریافت خدمت</label>
            <div className="space-y-1.5">
              <label
                onClick={() => setServiceDelivery('all')}
                className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                  serviceDelivery === 'all'
                    ? 'border-[#3b185f] bg-purple-50 text-[#3b185f] font-bold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>همه سالن‌ها</span>
                <input type="radio" checked={serviceDelivery === 'all'} readOnly className="hidden" />
              </label>

              <label
                onClick={() => setServiceDelivery('in_salon')}
                className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                  serviceDelivery === 'in_salon'
                    ? 'border-[#3b185f] bg-purple-50 text-[#3b185f] font-bold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>۱. مراجعه حضوری به سالن</span>
                <input type="radio" checked={serviceDelivery === 'in_salon'} readOnly className="hidden" />
              </label>

              <label
                onClick={() => setServiceDelivery('at_home')}
                className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                  serviceDelivery === 'at_home'
                    ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-amber-600" />
                  ۲. دریافت خدمات در محل مشتری
                </span>
                <input type="radio" checked={serviceDelivery === 'at_home'} readOnly className="hidden" />
              </label>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">دسته‌بندی خدمات زیبایی</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none"
            >
              {WOMEN_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Price Level */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">رده قیمتی</label>
            <select
              value={priceLevel}
              onChange={(e) => setPriceLevel(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none"
            >
              <option value="all">همه رده‌های قیمتی</option>
              <option value="اقتصادی">اقتصادی (مناسب و به‌صرفه)</option>
              <option value="متوسط">متوسط (تعرفه استاندارد)</option>
              <option value="لوکس">لوکس (VIP و برند)</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">مرتب‌سازی نتایج</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none"
            >
              <option value="rating">بالاترین امتیاز رضایت</option>
              <option value="distance">نزدیک‌ترین آرایشگاه</option>
              <option value="priceAsc">کمترین قیمت خدمات</option>
              <option value="priceDesc">بیشترین قیمت خدمات</option>
              <option value="reviews">بیشترین تعداد نظرات</option>
            </select>
          </div>
        </aside>

        {/* Results Container */}
        <main className="lg:col-span-9 space-y-4">
          {/* Status summary */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 bg-white p-3.5 rounded-2xl border border-slate-200/80">
            <div>
              <span>نمایش </span>
              <strong className="text-slate-900 tabular-nums">{filteredSalons.length}</strong>
              <span> سالن زیبایی بانوان</span>
              {city !== 'همه شهرها' && <span className="text-[#3b185f] font-semibold"> در شهر {city}</span>}
              {district !== 'همه منطقه‌ها' && <span className="text-[#3b185f] font-semibold"> (منطقه {district})</span>}
              {serviceDelivery === 'at_home' && <span className="text-amber-700 font-semibold"> (دارای خدمات در منزل)</span>}
            </div>

            {(city !== 'همه شهرها' || district !== 'همه منطقه‌ها' || category !== 'همه خدمات بانوان' || priceLevel !== 'all' || serviceDelivery !== 'all' || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-amber-700 font-semibold hover:underline"
              >
                حذف همه فیلترها
              </button>
            )}
          </div>

          {/* Cards Grid */}
          {filteredSalons.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredSalons.map((salon) => (
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
          ) : (
            <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-purple-50 text-[#3b185f] flex items-center justify-center">
                <Scissors className="w-7 h-7 text-amber-600" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-800">
                  سالنی با این فیلترها یافت نشد
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  پیشنهاد می‌کنیم فیلتر نوع خدمت یا منطقه را تغییر دهید یا واژه جستجو را کوتاه‌تر کنید.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-[#3b185f] text-white rounded-xl text-xs font-semibold hover:bg-[#2b1047] transition-colors"
              >
                بازنشانی فیلترها
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
