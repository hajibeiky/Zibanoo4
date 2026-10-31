import React, { useState, useMemo } from 'react';
import { Salon, GenderType } from '../../types';
import { SalonCard } from '../common/SalonCard';
import { IRAN_CITIES, SERVICE_CATEGORIES } from '../../data/mockData';
import { 
  Search, 
  Filter, 
  MapPin, 
  Scissors, 
  Users, 
  Home, 
  X, 
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';

interface SearchViewProps {
  salons: Salon[];
  initialFilters?: {
    city?: string;
    gender?: 'all' | 'women' | 'men';
    category?: string;
    homeServiceOnly?: boolean;
  };
  onSelectSalon: (salon: Salon) => void;
  onBookSalon: (salon: Salon) => void;
  onToggleCompare: (salon: Salon) => void;
  comparedSalonIds: string[];
}

export const SearchView: React.FC<SearchViewProps> = ({
  salons,
  initialFilters,
  onSelectSalon,
  onBookSalon,
  onToggleCompare,
  comparedSalonIds
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [city, setCity] = useState(initialFilters?.city || 'همه شهرها');
  const [gender, setGender] = useState<'all' | 'women' | 'men'>(initialFilters?.gender || 'all');
  const [category, setCategory] = useState(initialFilters?.category || 'همه خدمات');
  const [priceLevel, setPriceLevel] = useState<string>('all');
  const [homeServiceOnly, setHomeServiceOnly] = useState<boolean>(initialFilters?.homeServiceOnly || false);
  const [sortBy, setSortBy] = useState<'rating' | 'priceAsc' | 'priceDesc' | 'reviews'>('rating');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setCity('همه شهرها');
    setGender('all');
    setCategory('همه خدمات');
    setPriceLevel('all');
    setHomeServiceOnly(false);
    setSortBy('rating');
  };

  // Filtered and sorted salons
  const filteredSalons = useMemo(() => {
    return salons.filter((salon) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = salon.name.toLowerCase().includes(q);
        const matchDistrict = salon.district.toLowerCase().includes(q);
        const matchService = salon.services.some(s => s.name.toLowerCase().includes(q));
        if (!matchName && !matchDistrict && !matchService) return false;
      }

      // City
      if (city !== 'همه شهرها' && salon.city !== city) {
        return false;
      }

      // Gender
      if (gender !== 'all' && salon.gender !== gender && salon.gender !== 'both') {
        return false;
      }

      // Category
      if (category !== 'همه خدمات') {
        const hasCategory = salon.services.some(s => s.category === category);
        const hasFeatured = salon.featuredServices.some(f => f.includes(category));
        if (!hasCategory && !hasFeatured) return false;
      }

      // Price level
      if (priceLevel !== 'all' && salon.priceLevel !== priceLevel) {
        return false;
      }

      // Home service
      if (homeServiceOnly && !salon.hasHomeService) {
        return false;
      }

      return true;
    }).sort((a, b) => {
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
  }, [salons, searchQuery, city, gender, category, priceLevel, homeServiceOnly, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Quick summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            جستجو و فیلتر آرایشگاه‌ها
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            پیدا کردن بهترین مراکز زیبایی و پیرایش در شهرهای مختلف ایران با امکان مقایسه و رزرو
          </p>
        </div>

        {/* Mobile filter button & Sort selector */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-xs"
          >
            <Filter className="w-4 h-4 text-amber-600" />
            <span>فیلترها</span>
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 hidden sm:inline">مرتب‌سازی:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 shadow-xs focus:outline-none"
            >
              <option value="rating">بالاترین امتیاز</option>
              <option value="reviews">بیشترین نظر</option>
              <option value="priceAsc">کمترین قیمت</option>
              <option value="priceDesc">بیشترین قیمت</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Salons List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-6 sticky top-24">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
              <SlidersHorizontal className="w-4 h-4 text-amber-600" />
              <span>فیلترهای پیشرفته</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-[11px] font-medium text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              پاکسازی
            </button>
          </div>

          {/* Search by name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">نام آرایشگاه یا خدمت</label>
            <div className="relative">
              <input
                type="text"
                placeholder="مثلاً: ماهور، بالیاژ، فید..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 pl-8 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#3b185f]/20 focus:border-[#3b185f]"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* City filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">شهر</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#3b185f]/20 focus:border-[#3b185f]"
            >
              {IRAN_CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Gender Filter Buttons */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">جنسیت خدمات</label>
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setGender('all')}
                className={`py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  gender === 'all' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                همه
              </button>
              <button
                type="button"
                onClick={() => setGender('women')}
                className={`py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  gender === 'women' ? 'bg-white text-purple-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                بانوان
              </button>
              <button
                type="button"
                onClick={() => setGender('men')}
                className={`py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  gender === 'men' ? 'bg-white text-amber-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                آقایان
              </button>
            </div>
          </div>

          {/* Service Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">نوع خدمت تخصصی</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#3b185f]/20 focus:border-[#3b185f]"
            >
              {SERVICE_CATEGORIES.map((cat) => (
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
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#3b185f]/20 focus:border-[#3b185f]"
            >
              <option value="all">همه رده‌های قیمتی</option>
              <option value="اقتصادی">اقتصادی (مناسب و به‌صرفه)</option>
              <option value="متوسط">متوسط (تعرفه استاندارد)</option>
              <option value="لوکس">لوکس (VIP و برند)</option>
            </select>
          </div>

          {/* At-home service checkbox */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={homeServiceOnly}
                onChange={(e) => setHomeServiceOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#3b185f] focus:ring-[#3b185f] border-slate-300"
              />
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <Home className="w-3.5 h-3.5 text-amber-600" />
                فقط دارای خدمات در محل
              </span>
            </label>
          </div>
        </aside>

        {/* Salons Results Column */}
        <main className="lg:col-span-9 space-y-4">
          {/* Active Filters Summary Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-200/70">
            <div>
              <span>نمایش </span>
              <strong className="text-slate-900 tabular-nums">{filteredSalons.length}</strong>
              <span> آرایشگاه یافت‌شده</span>
              {city !== 'همه شهرها' && <span className="text-[#3b185f] font-semibold"> در شهر {city}</span>}
              {gender !== 'all' && <span className="text-[#3b185f] font-semibold"> ({gender === 'women' ? 'بانوان' : 'آقایان'})</span>}
              {homeServiceOnly && <span className="text-amber-700 font-semibold"> (با خدمات در محل)</span>}
            </div>

            {(city !== 'همه شهرها' || gender !== 'all' || category !== 'همه خدمات' || priceLevel !== 'all' || homeServiceOnly || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-amber-700 font-semibold hover:underline"
              >
                حذف همه فیلترها
              </button>
            )}
          </div>

          {/* Salons Grid */}
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
            /* Empty State */
            <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-purple-50 text-[#3b185f] flex items-center justify-center">
                <Scissors className="w-7 h-7 text-amber-600" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-800">
                  هیچ آرایشگاهی با این مشخصات یافت نشد
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  پیشنهاد می‌کنیم فیلترهای اعمال‌شده (شهر، نوع خدمت یا قیمت) را تغییر دهید یا واژه جستجو را ساده‌تر کنید.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-[#3b185f] text-white rounded-xl text-xs font-semibold hover:bg-[#2b1047] transition-colors"
              >
                بازنشانی تمام فیلترها
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">فیلترهای جستجو</h3>
              <button 
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">نام آرایشگاه یا خدمت</label>
                <input
                  type="text"
                  placeholder="جستجو..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">شهر</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                >
                  {IRAN_CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">جنسیت</label>
                <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl">
                  <button
                    onClick={() => setGender('all')}
                    className={`py-1.5 rounded-lg ${gender === 'all' ? 'bg-white font-bold' : ''}`}
                  >
                    همه
                  </button>
                  <button
                    onClick={() => setGender('women')}
                    className={`py-1.5 rounded-lg ${gender === 'women' ? 'bg-white font-bold text-purple-900' : ''}`}
                  >
                    بانوان
                  </button>
                  <button
                    onClick={() => setGender('men')}
                    className={`py-1.5 rounded-lg ${gender === 'men' ? 'bg-white font-bold text-amber-900' : ''}`}
                  >
                    آقایان
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">دسته خدمت</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                >
                  {SERVICE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={homeServiceOnly}
                    onChange={(e) => setHomeServiceOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-[#3b185f]"
                  />
                  <span className="font-bold text-slate-800">فقط دارای خدمات در محل</span>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-[#3b185f] text-white rounded-xl text-xs font-bold"
              >
                مشاهده نتایج ({filteredSalons.length})
              </button>
              <button
                onClick={handleResetFilters}
                className="py-2.5 px-3 bg-slate-100 text-slate-700 rounded-xl text-xs font-medium"
              >
                پاکسازی
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
