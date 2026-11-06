import React, { useState } from 'react';
import { Salon, BookingRequest, ServiceItem, PortfolioItem } from '../../types';
import { BarberCalendarView } from './BarberCalendarView';
import { 
  Briefcase, 
  Check, 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Clock, 
  Calendar, 
  Phone, 
  MapPin, 
  Home, 
  CheckCircle2, 
  XCircle, 
  Save, 
  Scissors, 
  Image as ImageIcon,
  User,
  Upload,
  Layers,
  Sparkles
} from 'lucide-react';
import { IRAN_CITIES } from '../../data/mockData';

interface BarberPanelViewProps {
  salons: Salon[];
  bookings: BookingRequest[];
  onUpdateSalon: (updatedSalon: Salon) => void;
  onUpdateBookingStatus: (bookingId: string, status: BookingRequest['status']) => void;
}

export const BarberPanelView: React.FC<BarberPanelViewProps> = ({
  salons,
  bookings,
  onUpdateSalon,
  onUpdateBookingStatus
}) => {
  const [selectedSalonId, setSelectedSalonId] = useState<string>(salons[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'calendar' | 'profile' | 'services' | 'portfolio'>('calendar');

  const currentSalon = salons.find(s => s.id === selectedSalonId) || salons[0];

  // Editable Profile state
  const [name, setName] = useState(currentSalon.name);
  const [ownerName, setOwnerName] = useState(currentSalon.ownerName || '');
  const [ownerAvatar, setOwnerAvatar] = useState(currentSalon.ownerAvatar || currentSalon.imageUrl);
  const [salonImage, setSalonImage] = useState(currentSalon.imageUrl);
  const [phone, setPhone] = useState(currentSalon.phone);
  const [city, setCity] = useState(currentSalon.city);
  const [district, setDistrict] = useState(currentSalon.district);
  const [address, setAddress] = useState(currentSalon.address);
  const [slogan, setSlogan] = useState(currentSalon.slogan || '');
  const [description, setDescription] = useState(currentSalon.description);
  const [openingHour, setOpeningHour] = useState(currentSalon.openingHour || '09:00');
  const [closingHour, setClosingHour] = useState(currentSalon.closingHour || '21:00');
  const [workingDays, setWorkingDays] = useState<string[]>(currentSalon.workingDays || ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه']);
  const [hasHomeService, setHasHomeService] = useState(currentSalon.hasHomeService);
  const [homeServiceFee, setHomeServiceFee] = useState(currentSalon.homeServiceFee);
  const [lat, setLat] = useState(currentSalon.latitude);
  const [lng, setLng] = useState(currentSalon.longitude);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // Sync state if switching salon
  const handleSalonSwitch = (id: string) => {
    setSelectedSalonId(id);
    const target = salons.find(s => s.id === id);
    if (target) {
      setName(target.name);
      setOwnerName(target.ownerName || '');
      setOwnerAvatar(target.ownerAvatar || target.imageUrl);
      setSalonImage(target.imageUrl);
      setPhone(target.phone);
      setCity(target.city);
      setDistrict(target.district);
      setAddress(target.address);
      setSlogan(target.slogan || '');
      setDescription(target.description);
      setOpeningHour(target.openingHour || '09:00');
      setClosingHour(target.closingHour || '21:00');
      setWorkingDays(target.workingDays || ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه']);
      setHasHomeService(target.hasHomeService);
      setHomeServiceFee(target.homeServiceFee);
      setLat(target.latitude);
      setLng(target.longitude);
    }
  };

  // Save Profile Form
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Salon = {
      ...currentSalon,
      name: name.trim(),
      ownerName: ownerName.trim(),
      ownerAvatar,
      imageUrl: salonImage,
      phone: phone.trim(),
      city,
      district: district.trim(),
      address: address.trim(),
      slogan: slogan.trim(),
      description: description.trim(),
      openingHour,
      closingHour,
      workingHours: `${openingHour} الی ${closingHour}`,
      workingDays,
      hasHomeService,
      homeServiceFee: Number(homeServiceFee),
      latitude: Number(lat),
      longitude: Number(lng)
    };

    onUpdateSalon(updated);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  // Toggle blocking slot
  const handleToggleBlockSlot = (date: string, timeSlot: string) => {
    const blocked = currentSalon.blockedSlots || [];
    const exists = blocked.some(b => b.date === date && b.timeSlot === timeSlot);
    const updatedSlots = exists
      ? blocked.filter(b => !(b.date === date && b.timeSlot === timeSlot))
      : [...blocked, { date, timeSlot }];

    const updated: Salon = {
      ...currentSalon,
      blockedSlots: updatedSlots
    };
    onUpdateSalon(updated);
  };

  // Add new service state
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newServiceDuration, setNewServiceDuration] = useState('45');
  const [newServiceCategory, setNewServiceCategory] = useState('کوتاهی و اصلاح مو');
  const [newServiceDesc, setNewServiceDesc] = useState('');

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim() || !newServicePrice) return;

    const priceNum = Number(newServicePrice);
    const newSrv: ServiceItem = {
      id: `srv-${Date.now()}`,
      name: newServiceName.trim(),
      category: newServiceCategory,
      price: priceNum,
      priceFormatted: `${priceNum.toLocaleString('fa-IR')} تومان`,
      durationMinutes: Number(newServiceDuration) || 45,
      homeServiceAvailable: hasHomeService,
      description: newServiceDesc.trim() || undefined
    };

    const updated: Salon = {
      ...currentSalon,
      services: [...currentSalon.services, newSrv]
    };
    onUpdateSalon(updated);
    setNewServiceName('');
    setNewServicePrice('');
    setNewServiceDesc('');
  };

  const handleDeleteService = (serviceId: string) => {
    const updated: Salon = {
      ...currentSalon,
      services: currentSalon.services.filter(s => s.id !== serviceId),
      portfolio: currentSalon.portfolio.filter(p => p.serviceId !== serviceId)
    };
    onUpdateSalon(updated);
  };

  // Add new portfolio item state
  const [newPortTitle, setNewPortTitle] = useState('');
  const [newPortCategory, setNewPortCategory] = useState(currentSalon.services[0]?.category || 'کوتاهی مو');
  const [newPortServiceId, setNewPortServiceId] = useState(currentSalon.services[0]?.id || '');
  const [newPortDesc, setNewPortDesc] = useState('');

  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortTitle.trim()) return;

    const newPort: PortfolioItem = {
      id: `port-${Date.now()}`,
      title: newPortTitle.trim(),
      category: newPortCategory,
      serviceId: newPortServiceId,
      imageUrl: currentSalon.imageUrl,
      description: newPortDesc.trim() || 'نمونه‌کار ثبت‌شده در پنل آرایشگر'
    };

    const updated: Salon = {
      ...currentSalon,
      portfolio: [...currentSalon.portfolio, newPort]
    };
    onUpdateSalon(updated);
    setNewPortTitle('');
    setNewPortDesc('');
  };

  const handleDeletePortfolio = (portId: string) => {
    const updated: Salon = {
      ...currentSalon,
      portfolio: currentSalon.portfolio.filter(p => p.id !== portId)
    };
    onUpdateSalon(updated);
  };

  const daysList = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-l from-[#2a0e44] via-[#3b185f] to-[#1f0932] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md border border-amber-500/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-sm">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black">پنل اختصاصی مدیریت آرایشگر</h1>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full font-bold">
                فعال
              </span>
            </div>
            <p className="text-xs text-purple-200 mt-0.5">
              مدیریت اطلاعات سالن، ویرایش تعرفه‌ها، تقویم نوبت‌ها و نمونه‌کارها با ذخیره‌سازی پایدار
            </p>
          </div>
        </div>

        {/* Salon Profile Switcher */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-purple-950/70 p-2 rounded-2xl border border-purple-800">
          <span className="text-xs text-purple-200">آرایشگاه فعال:</span>
          <select
            value={selectedSalonId}
            onChange={(e) => handleSalonSwitch(e.target.value)}
            className="bg-transparent text-amber-300 font-bold text-xs focus:outline-none cursor-pointer"
          >
            {salons.map((s) => (
              <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                {s.name} ({s.city})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex items-center gap-1.5 shadow-xs overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('calendar')}
          className={`py-2 px-4 rounded-xl font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'calendar'
              ? 'bg-[#3b185f] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4 text-amber-300" />
          <span>تقویم و مدیریت نوبت‌ها</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`py-2 px-4 rounded-xl font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'profile'
              ? 'bg-[#3b185f] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Edit3 className="w-4 h-4 text-amber-300" />
          <span>اطلاعات سالن و پروفایل</span>
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`py-2 px-4 rounded-xl font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'services'
              ? 'bg-[#3b185f] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Scissors className="w-4 h-4 text-amber-300" />
          <span>مدیریت خدمات و لیست قیمت ({currentSalon.services.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('portfolio')}
          className={`py-2 px-4 rounded-xl font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'portfolio'
              ? 'bg-[#3b185f] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ImageIcon className="w-4 h-4 text-amber-300" />
          <span>مدیریت نمونه‌کارها ({currentSalon.portfolio.length})</span>
        </button>
      </div>

      {/* Tab 1: Calendar & Bookings */}
      {activeTab === 'calendar' && (
        <BarberCalendarView
          salon={currentSalon}
          bookings={bookings}
          onUpdateBookingStatus={onUpdateBookingStatus}
          onToggleBlockSlot={handleToggleBlockSlot}
        />
      )}

      {/* Tab 2: Profile & Salon Info */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="font-extrabold text-base text-slate-900">
                اطلاعات سالن و پروفایل آرایشگر
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                تکمیل اطلاعات سالن جهت نمایش در صفحه اختصاصی و نقشه زیبانو
              </p>
            </div>

            {saveSuccessMsg && (
              <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                تغییرات با موفقیت ذخیره شد
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Salon Name */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700">نام سالن یا مغازه:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold"
                required
              />
            </div>

            {/* Owner Name */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700">نام و نام خانوادگی آرایشگر / مسئول:</label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold"
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700">شماره تماس سالن یا همراه:</label>
              <input
                type="text"
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-left"
                required
              />
            </div>

            {/* Slogan */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700">شعار یا متن معرفی کوتاه:</label>
              <input
                type="text"
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                placeholder="مثال: آراستگی مدرن، استایل ماندگار"
              />
            </div>

            {/* City */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700">استان / شهر:</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold"
              >
                {IRAN_CITIES.filter(c => c !== 'همه شهرها').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* District */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700">محله یا منطقه:</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                required
              />
            </div>

            {/* Full Address */}
            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-slate-700">نشانی کامل پستی:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                required
              />
            </div>

            {/* Working Hours */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700">ساعت شروع کار:</label>
              <input
                type="time"
                value={openingHour}
                onChange={(e) => setOpeningHour(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">ساعت پایان کار:</label>
              <input
                type="time"
                value={closingHour}
                onChange={(e) => setClosingHour(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold"
              />
            </div>

            {/* Working Days */}
            <div className="space-y-2 sm:col-span-2">
              <label className="font-bold text-slate-700">روزهای کاری سالن:</label>
              <div className="flex flex-wrap gap-2">
                {daysList.map(d => {
                  const isChecked = workingDays.includes(d);
                  return (
                    <button
                      type="button"
                      key={d}
                      onClick={() => {
                        if (isChecked) {
                          setWorkingDays(workingDays.filter(item => item !== d));
                        } else {
                          setWorkingDays([...workingDays, d]);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                        isChecked
                          ? 'bg-[#3b185f] text-white border-[#3b185f]'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-slate-700">توضیحات و معرفی سالن:</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs leading-relaxed"
              />
            </div>
          </div>

          {/* Home Service Settings */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-amber-950 text-xs">
              <input
                type="checkbox"
                checked={hasHomeService}
                onChange={(e) => setHasHomeService(e.target.checked)}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
              />
              <span>ارائه خدمات آرایشگری در محل (منزل مشتری) فعال باشد</span>
            </label>

            {hasHomeService && (
              <div className="max-w-xs space-y-1">
                <label className="font-bold text-slate-700">تعرفه ایاب‌وذهاب اضافه در محدوده شهر (تومان):</label>
                <input
                  type="number"
                  value={homeServiceFee}
                  onChange={(e) => setHomeServiceFee(Number(e.target.value))}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs font-bold"
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="py-3 px-8 bg-[#3b185f] hover:bg-[#2b1047] text-white font-bold rounded-xl text-xs transition-colors shadow-sm flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-amber-300" />
              <span>ذخیره تغییرات پروفایل</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: Services & Prices */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          {/* Add Service */}
          <form onSubmit={handleAddService} className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs text-xs">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-3">
              افزودن خدمت جدید به لیست قیمت سالن
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-700">عنوان خدمت:</label>
                <input
                  type="text"
                  placeholder="مثال: براشینگ هالیوودی، فید تکسچر"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">قیمت به تومان:</label>
                <input
                  type="number"
                  placeholder="مثال: 350000"
                  value={newServicePrice}
                  onChange={(e) => setNewServicePrice(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-bold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">مدت زمان (دقیقه):</label>
                <input
                  type="number"
                  placeholder="45"
                  value={newServiceDuration}
                  onChange={(e) => setNewServiceDuration(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-700">دسته‌بندی خدمت:</label>
                <select
                  value={newServiceCategory}
                  onChange={(e) => setNewServiceCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-semibold"
                >
                  <option value="کوتاهی و اصلاح مو">کوتاهی و اصلاح مو</option>
                  <option value="کوتاهی مو">کوتاهی مو</option>
                  <option value="رنگ، مش و لایت">رنگ، مش و لایت</option>
                  <option value="شینیون و براشینگ">شینیون و براشینگ</option>
                  <option value="میکاپ">میکاپ</option>
                  <option value="اصلاح و مرتب‌سازی ریش">اصلاح و مرتب‌سازی ریش</option>
                  <option value="خدمات ناخن">خدمات ناخن</option>
                  <option value="ابرو و مژه">ابرو و مژه</option>
                  <option value="پاکسازی و مراقبت پوست">پاکسازی و مراقبت پوست</option>
                  <option value="خدمات تخصصی مو">خدمات تخصصی مو</option>
                  <option value="خدمات داماد">خدمات داماد</option>
                </select>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-700">توضیحات تکمیلی خدمت:</label>
                <input
                  type="text"
                  placeholder="توضیح کوتاه درباره مواد یا تکنیک"
                  value={newServiceDesc}
                  onChange={(e) => setNewServiceDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="py-2.5 px-6 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>ثبت خدمت جدید</span>
            </button>
          </form>

          {/* Current Services List */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-3">
              لیست خدمات فعال «{currentSalon.name}»
            </h3>
            <div className="divide-y divide-slate-100">
              {currentSalon.services.map((s) => (
                <div key={s.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{s.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-50 text-[#3b185f] font-semibold">
                        {s.category}
                      </span>
                      {s.homeServiceAvailable && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-semibold flex items-center gap-1">
                          <Home className="w-3 h-3" />
                          امکان ارائه در محل
                        </span>
                      )}
                    </div>
                    {s.description && (
                      <p className="text-slate-500 text-[11px]">{s.description}</p>
                    )}
                    <span className="text-[10px] text-slate-400">
                      مدت تقریبی: {s.durationMinutes} دقیقه
                    </span>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <span className="font-black text-sm text-[#3b185f] tabular-nums">
                      {s.priceFormatted}
                    </span>
                    <button
                      onClick={() => handleDeleteService(s.id)}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="حذف خدمت"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Portfolio Management */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          {/* Add Portfolio */}
          <form onSubmit={handleAddPortfolio} className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs text-xs">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-3">
              افزودن نمونه‌کار جدید به آلبوم ژورنالی
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">عنوان نمونه‌کار:</label>
                <input
                  type="text"
                  placeholder="مثال: بالیاژ شنی کاراملی"
                  value={newPortTitle}
                  onChange={(e) => setNewPortTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">اتصال به خدمت مشخص:</label>
                <select
                  value={newPortServiceId}
                  onChange={(e) => {
                    setNewPortServiceId(e.target.value);
                    const srv = currentSalon.services.find(s => s.id === e.target.value);
                    if (srv) setNewPortCategory(srv.category);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-semibold"
                >
                  {currentSalon.services.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.category})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">دسته‌بندی:</label>
                <input
                  type="text"
                  value={newPortCategory}
                  onChange={(e) => setNewPortCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
                />
              </div>

              <div className="space-y-1 sm:col-span-3">
                <label className="font-bold text-slate-700">توضیح کوتاه درباره متریال یا نتیجه:</label>
                <input
                  type="text"
                  placeholder="مثال: بدون آسیب و خشکی، پایه ۹ با مواد ارگانیک"
                  value={newPortDesc}
                  onChange={(e) => setNewPortDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="py-2.5 px-6 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>بارگذاری و افزودن نمونه‌کار</span>
            </button>
          </form>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {currentSalon.portfolio.map((port) => (
              <div key={port.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-2 text-xs p-3">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border">
                  <img src={port.imageUrl} alt={port.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900">{port.title}</h4>
                  <button
                    onClick={() => handleDeletePortfolio(port.id)}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                    title="حذف نمونه‌کار"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-purple-700 font-semibold block">{port.category}</span>
                <p className="text-[11px] text-slate-500 line-clamp-2">{port.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
