import React, { useState, useMemo } from 'react';
import { Salon, GenderType } from '../../types';
import { SalonCard } from '../common/SalonCard';
import { SalonMapView } from '../common/SalonMapView';
import { 
  IRAN_CITIES, 
  WOMEN_SERVICE_CATEGORIES, 
  MEN_SERVICE_CATEGORIES, 
  TIME_SLOTS,
  calculateDistanceKm,
  DEFAULT_USER_LOCATION
} from '../../data/mockData';
import { 
  Search, 
  Filter, 
  MapPin, 
  Scissors, 
  Home, 
  SlidersHorizontal, 
  RotateCcw, 
  Map as MapIcon, 
  Grid, 
  Clock, 
  Calendar,
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface GenderScopedSalonsViewProps {
  gender: 'women' | 'men';
  salons: Salon[];
  onSelectSalon: (salon: Salon) => void;
  onBookSalon: (salon: Salon) => void;
  onToggleCompare: (salon: Salon) => void;
  comparedSalonIds: string[];
  onOpenSimulator?: (salon: Salon) => void;
}

export const GenderScopedSalonsView: React.FC<GenderScopedSalonsViewProps> = ({
  gender,
  salons,
  onSelectSalon,
  onBookSalon,
  onToggleCompare,
  comparedSalonIds,
  onOpenSimulator
}) => {
  const isWomen = gender === 'women';

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [city, setCity] = useState('همه شهرها');
  const [district, setDistrict] = useState('');
  const [category, setCategory] = useState('همه خدمات');
  const [priceLevel, setPriceLevel] = useState('all');
  const [serviceReception, setServiceReception] = useState<'all' | 'in_salon' | 'at_home'>('all');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('all');
  const [sortBy, setSortBy] = useState<'rating' | 'priceAsc' | 'priceDesc' | 'reviews' | 'distance'>('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = isWomen ? WOMEN_SERVICE_CATEGORIES : MEN_SERVICE_CATEGORIES;

  // Filter and sort salons
  const filteredSalons = useMemo(() => {
    return salons.filter((s) => {
      // Must match gender
      if (s.gender !== gender && s.gender !== 'both') return false;

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = s.name.toLowerCase().includes(q);
        const matchOwner = s.ownerName.toLowerCase().includes(q);
        const matchDistrict = s.district.toLowerCase().includes(q);
        const matchService = s.services.some(srv => srv.name.toLowerCase().includes(q));
        if (!matchName && !matchOwner && !matchDistrict && !matchService) return false;
      }

      // City
      if (city !== 'همه شهرها' && s.city !== city) return false;

      // District
      if (district.trim() && !s.district.toLowerCase().includes(district.toLowerCase().trim())) {
        return false;
      }

      // Category
      if (category !== 'همه خدمات') {
        const hasCategory = s.services.some(srv => srv.category === category);
        const hasFeatured = s.featuredServices.some(f => f.includes(category));
        if (!hasCategory && !hasFeatured) return false;
      }

      // Price level
      if (priceLevel !== 'all' && s.priceLevel !== priceLevel) return false;

      // Service reception mode: in salon vs at home
      if (serviceReception === 'at_home' && !s.hasHomeService) {
        return false;
      }

      // Time slot check: if preferred time slot selected, verify working hours or blocked slots
      if (preferredTimeSlot !== 'all' && s.blockedSlots) {
        const isBlocked = s.blockedSlots.some(
          b => (preferredDate ? b.date === preferredDate : true) && b.timeSlot === preferredTimeSlot
        );
        if (isBlocked) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'distance') {
        const distA = calculateDistanceKm(DEFAULT_USER_LOCATION.lat, DEFAULT_USER_LOCATION.lng, a.latitude, a.longitude);
        const distB = calculateDistanceKm(DEFAULT_USER_LOCATION.lat, DEFAULT_USER_LOCATION.lng, b.latitude, b.longitude);
        return distA - distB;
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
  }, [salons, gender, searchQuery, city, district, category, priceLevel, serviceReception, preferredDate, preferredTimeSlot, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setCity('همه شهرها');
    setDistrict('');
    setCategory('همه خدمات');
    setPriceLevel('all');
    setServiceReception('all');
    setPreferredDate('');
    setPreferredTimeSlot('all');
    setSortBy('rating');
  };

  return (
    <div className={`min-h-screen py-8 ${
      isWomen 
        ? 'bg-gradient-to-b from-[#faf5ff] via-[#FAF8F5] to-[#fdfbf7]' 
        : 'bg-gradient-to-b from-[#1e1b2e]/5 via-[#FAF8F5] to-[#f8fafc]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main Distinct Header Banner */}
        <div className={`rounded-3xl p-6 sm:p-10 shadow-sm border ${
          isWomen 
            ? 'bg-gradient-to-l from-[#3b185f] via-[#4c1d95] to-[#2e1065] text-white border-purple-300/30' 
            : 'bg-gradient-to-l from-[#18181b] via-[#27272a] to-[#240c3d] text-white border-slate-700/50'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40">
                <Scissors className="w-3.5 h-3.5" />
                <span>{isWomen ? 'بخش اختصاصی بانوان' : 'بخش تخصصی گرومینگ آقایان'}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
                {isWomen ? 'جست‌وجوی آرایشگاه زنانه' : 'جست‌وجوی آرایشگاه مردانه'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
                {isWomen
                  ? 'آرایشگاه مناسب خود را پیدا کنید، نمونه‌کارها را ببینید، قیمت‌ها را مقایسه کنید و به‌راحتی نوبت بگیرید.'
                  : 'بهترین آرایشگاه متناسب با نیاز خود را پیدا کنید و خدمات، قیمت‌ها و نمونه‌کارها را مقایسه کنید.'}
              </p>
            </div>

            {/* View Mode Toggle: Grid vs Map */}
            <div className="flex items-center gap-1.5 self-start md:self-auto bg-black/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'grid'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
                <span>نمای کارتی</span>
              </button>

              <button
                onClick={() => setViewMode('map')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'map'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <MapIcon className="w-4 h-4" />
                <span>نمای نقشه و فاصله</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Category Chips Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 border ${
                  isSelected
                    ? isWomen
                      ? 'bg-[#3b185f] text-white border-[#3b185f] shadow-xs'
                      : 'bg-slate-900 text-amber-300 border-slate-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Layout: Sidebar Filters + Main Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-5 sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                <SlidersHorizontal className="w-4 h-4 text-amber-600" />
                <span>فیلترهای پیشرفته</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-[11px] font-medium text-slate-400 hover:text-red-600 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                پاکسازی
              </button>
            </div>

            {/* Search Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">نام سالن یا خدمت:</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="مثال: ماهور، بالیاژ، فید..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 pl-8 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#3b185f]/20 focus:border-[#3b185f]"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* City */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">شهر:</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
              >
                {IRAN_CITIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* District / Area */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">محدوده یا محله:</label>
              <input
                type="text"
                placeholder="مثال: صفائیه / سعادت‌آباد"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>

            {/* Service Reception Mode: At Salon vs At Home */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-800 block">نحوه دریافت خدمت:</label>
              <div className="space-y-1.5 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="reception"
                    checked={serviceReception === 'all'}
                    onChange={() => setServiceReception('all')}
                    className="text-[#3b185f]"
                  />
                  <span>همه (حضوری و در محل)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="reception"
                    checked={serviceReception === 'in_salon'}
                    onChange={() => setServiceReception('in_salon')}
                    className="text-[#3b185f]"
                  />
                  <span>فقط مراجعه حضوری به آرایشگاه</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="reception"
                    checked={serviceReception === 'at_home'}
                    onChange={() => setServiceReception('at_home')}
                    className="text-amber-600"
                  />
                  <span className="font-bold text-amber-900 flex items-center gap-1">
                    <Home className="w-3.5 h-3.5 text-amber-700" />
                    فقط خدمات در محل مشتری (منزل)
                  </span>
                </label>
              </div>
            </div>

            {/* Preferred Date & Time Slot */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-800 block">روز و ساعت مورد نظر:</label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
              />
              <select
                value={preferredTimeSlot}
                onChange={(e) => setPreferredTimeSlot(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
              >
                <option value="all">همه سانس‌های روز</option>
                {TIME_SLOTS.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Price Level */}
            <div className="space-y-1 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700">محدوده قیمت:</label>
              <select
                value={priceLevel}
                onChange={(e) => setPriceLevel(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
              >
                <option value="all">همه رده‌های قیمتی</option>
                <option value="اقتصادی">اقتصادی (مناسب و به‌صرفه)</option>
                <option value="متوسط">متوسط (استاندارد)</option>
                <option value="لوکس">لوکس (VIP و برند)</option>
              </select>
            </div>
          </aside>

          {/* Results Main Area */}
          <main className="lg:col-span-9 space-y-5">
            {/* Sort & Count Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 tabular-nums">{filteredSalons.length}</span>
                <span className="text-slate-500">
                  {isWomen ? 'سالن زیبایی بانوان یافت شد' : 'آرایشگاه مردانه یافت شد'}
                </span>
                {serviceReception === 'at_home' && (
                  <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-md">
                    (با خدمات در محل)
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-500">مرتب‌سازی بر اساس:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-[#3b185f] focus:outline-none"
                >
                  <option value="rating">بالاترین امتیاز رضایت</option>
                  <option value="distance">نزدیک‌ترین آرایشگاه</option>
                  <option value="priceAsc">کمترین قیمت خدمات</option>
                  <option value="priceDesc">بیشترین قیمت خدمات</option>
                  <option value="reviews">بیشترین تعداد نظرات</option>
                </select>
              </div>
            </div>

            {/* Display: Map vs Grid */}
            {viewMode === 'map' ? (
              <SalonMapView
                salons={filteredSalons}
                onSelectSalon={onSelectSalon}
                onBookSalon={onBookSalon}
              />
            ) : filteredSalons.length > 0 ? (
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
              /* Empty state */
              <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 space-y-4 shadow-xs">
                <div className="w-14 h-14 mx-auto rounded-full bg-purple-50 text-[#3b185f] flex items-center justify-center">
                  <Scissors className="w-7 h-7 text-amber-600" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-800">
                    هیچ آرایشگاهی با این مشخصات یافت نشد
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    می‌توانید فیلترهای اعمال‌شده را تغییر دهید یا شهر دیگری را بررسی کنید.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-[#3b185f] text-white rounded-xl text-xs font-bold hover:bg-[#2b1047] transition-colors"
                >
                  پاکسازی فیلترها
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
