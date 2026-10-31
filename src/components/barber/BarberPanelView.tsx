import React, { useState } from 'react';
import { Salon, BookingRequest, ServiceItem, PortfolioItem } from '../../types';
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
  ShieldAlert,
  Scissors
} from 'lucide-react';

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
  // Active salon profile being managed
  const [selectedSalonId, setSelectedSalonId] = useState<string>(salons[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'bookings' | 'info' | 'services' | 'portfolio'>('bookings');

  // Currently managed salon
  const currentSalon = salons.find(s => s.id === selectedSalonId) || salons[0];

  // Editable salon state
  const [name, setName] = useState(currentSalon.name);
  const [phone, setPhone] = useState(currentSalon.phone);
  const [workingHours, setWorkingHours] = useState(currentSalon.workingHours);
  const [hasHomeService, setHasHomeService] = useState(currentSalon.hasHomeService);
  const [homeServiceFee, setHomeServiceFee] = useState(currentSalon.homeServiceFee);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // Sync state if switching salon
  const handleSalonSwitch = (id: string) => {
    setSelectedSalonId(id);
    const target = salons.find(s => s.id === id);
    if (target) {
      setName(target.name);
      setPhone(target.phone);
      setWorkingHours(target.workingHours);
      setHasHomeService(target.hasHomeService);
      setHomeServiceFee(target.homeServiceFee);
    }
  };

  // Save info changes
  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Salon = {
      ...currentSalon,
      name,
      phone,
      workingHours,
      hasHomeService,
      homeServiceFee: Number(homeServiceFee)
    };
    onUpdateSalon(updated);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  // Add new service state
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('کوتاهی و استایل');

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
      durationMinutes: 45,
      homeServiceAvailable: hasHomeService
    };

    const updated: Salon = {
      ...currentSalon,
      services: [...currentSalon.services, newSrv]
    };
    onUpdateSalon(updated);
    setNewServiceName('');
    setNewServicePrice('');
  };

  const handleDeleteService = (serviceId: string) => {
    const updated: Salon = {
      ...currentSalon,
      services: currentSalon.services.filter(s => s.id !== serviceId)
    };
    onUpdateSalon(updated);
  };

  // Add new portfolio item state
  const [newPortTitle, setNewPortTitle] = useState('');
  const [newPortCategory, setNewPortCategory] = useState('کوتاهی و استایل');
  const [newPortDesc, setNewPortDesc] = useState('');

  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortTitle.trim()) return;

    const newPort: PortfolioItem = {
      id: `port-${Date.now()}`,
      title: newPortTitle.trim(),
      category: newPortCategory,
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

  // Filter bookings for this salon
  const salonBookings = bookings.filter(b => b.salonId === currentSalon.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Test Panel Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900 to-[#2a0e44] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black">پنل آزمایشی مدیریت آرایشگر</h1>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded">
                شبیه‌ساز فاز ۱
              </span>
            </div>
            <p className="text-xs text-purple-200 mt-0.5">
              در این بخش آرایشگران می‌توانند اطلاعات، قیمت خدمات و نوبت‌های دریافتی خود را مدیریت کنند.
            </p>
          </div>
        </div>

        {/* Salon profile selector */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-purple-200 hidden sm:inline">آرایشگاه فعال:</span>
          <select
            value={selectedSalonId}
            onChange={(e) => handleSalonSwitch(e.target.value)}
            className="bg-purple-950/80 border border-purple-700 rounded-xl px-3 py-1.5 text-xs font-bold text-amber-300 focus:outline-none"
          >
            {salons.map((s) => (
              <option key={s.id} value={s.id}>{s.name} ({s.city})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex items-center gap-1.5 shadow-xs overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`py-2 px-4 rounded-xl font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'bookings'
              ? 'bg-[#3b185f] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4 text-amber-300" />
          <span>درخواست‌های نوبت ({salonBookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('info')}
          className={`py-2 px-4 rounded-xl font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'info'
              ? 'bg-[#3b185f] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Edit3 className="w-4 h-4 text-amber-300" />
          <span>ویرایش اطلاعات و ساعات کاری</span>
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
          <span>نمونه‌کارها ({currentSalon.portfolio.length})</span>
        </button>
      </div>

      {/* Tab 1: Bookings Management */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-slate-900 text-base">
              درخواست‌های رزرو نوبت برای «{currentSalon.name}»
            </h2>
            <span className="text-xs text-slate-500">
              با زدن دکمه تایید یا رد، وضعیت در لحظه تغییر کرده و در سامانه کاربر منعکس می‌شود.
            </span>
          </div>

          {salonBookings.length > 0 ? (
            <div className="space-y-3">
              {salonBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{b.customerName}</span>
                      <span className="text-xs text-slate-500 font-mono dir-ltr">({b.customerPhone})</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-purple-50 text-[#3b185f] font-semibold">
                        کد: {b.trackingCode}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2.5 py-1 rounded-md font-bold ${
                        b.status === 'approved' 
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                          : b.status === 'rejected'
                          ? 'bg-red-50 text-red-800 border border-red-200'
                          : b.status === 'cancelled'
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {b.status === 'approved' && 'تأییدشده'}
                        {b.status === 'rejected' && 'ردشده'}
                        {b.status === 'cancelled' && 'لغوشده توسط مشتری'}
                        {b.status === 'pending' && 'در انتظار بررسی'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-700">
                    <div>
                      <span className="text-slate-400">خدمت: </span>
                      <strong>{b.serviceName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">تاریخ و سانس: </span>
                      <strong className="tabular-nums">{b.date} ({b.timeSlot})</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">نوع و مبلغ: </span>
                      <strong className="tabular-nums">
                        {b.serviceType === 'at_home' ? 'در محل مشتری' : 'حضوری'} · {b.price.toLocaleString('fa-IR')} ت
                      </strong>
                    </div>
                  </div>

                  {b.customerAddress && (
                    <div className="text-xs text-amber-900 bg-amber-50 p-2 rounded-lg">
                      آدرس متقاضی: {b.customerAddress}
                    </div>
                  )}

                  {b.notes && (
                    <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded-lg">
                      یادداشت مشتری: {b.notes}
                    </div>
                  )}

                  {/* Action buttons */}
                  {b.status === 'pending' && (
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => onUpdateBookingStatus(b.id, 'approved')}
                        className="py-1.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        تأیید نوبت
                      </button>
                      <button
                        onClick={() => onUpdateBookingStatus(b.id, 'rejected')}
                        className="py-1.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        رد درخواست
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
              هیچ درخواست نوبتی برای این آرایشگاه ثبت نشده است. برای آزمایش می‌توانید از صفحه اصلی یا جستجو برای این سالن نوبت ثبت کنید.
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Edit Info */}
      {activeTab === 'info' && (
        <form onSubmit={handleSaveInfo} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs text-xs">
          <h2 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
            ویرایش مشخصات آرایشگاه
          </h2>

          {saveSuccessMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              تغییرات با موفقیت در حافظه مرورگر ذخیره شد.
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">نام آرایشگاه</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">تلفن تماس</label>
              <input
                type="text"
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium text-left"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-slate-700">ساعات کاری</label>
              <input
                type="text"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-3">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
              <input
                type="checkbox"
                checked={hasHomeService}
                onChange={(e) => setHasHomeService(e.target.checked)}
                className="w-4 h-4 rounded text-[#3b185f]"
              />
              <span>ارائه خدمات آرایشگری در محل (منزل مشتری) فعال باشد</span>
            </label>

            {hasHomeService && (
              <div className="space-y-1 max-w-xs">
                <label className="font-bold text-slate-700">هزینه ایاب‌وذهاب (تومان):</label>
                <input
                  type="number"
                  value={homeServiceFee}
                  onChange={(e) => setHomeServiceFee(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-bold"
                />
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              type="submit"
              className="py-2.5 px-6 bg-[#3b185f] hover:bg-[#2b1047] text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Save className="w-4 h-4 text-amber-300" />
              ذخیره تغییرات مشخصات
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: Services & Prices */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          {/* Add Service Form */}
          <form onSubmit={handleAddService} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs text-xs">
            <h3 className="font-bold text-sm text-slate-900">افزودن خدمت جدید به لیست قیمت</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="عنوان خدمت (مثال: کراتین تخصصی)"
                value={newServiceName}
                onChange={(e) => setNewServiceName(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
              />
              <input
                type="number"
                placeholder="قیمت به تومان (مثال: 450000)"
                value={newServicePrice}
                onChange={(e) => setNewServicePrice(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
              />
              <select
                value={newServiceCategory}
                onChange={(e) => setNewServiceCategory(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
              >
                <option value="کوتاهی و استایل">کوتاهی و استایل</option>
                <option value="رنگ و لایت">رنگ و لایت</option>
                <option value="میکاپ و شینیون">میکاپ و شینیون</option>
                <option value="اصلاح ریش">اصلاح ریش</option>
                <option value="پاکسازی پوست">پاکسازی پوست</option>
              </select>
            </div>
            <button
              type="submit"
              className="py-2 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              افزودن خدمت
            </button>
          </form>

          {/* Current Services List */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-sm text-slate-900">خدمات ثبت‌شده</h3>
            <div className="divide-y divide-slate-100">
              {currentSalon.services.map((s) => (
                <div key={s.id} className="py-2.5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900">{s.name}</span>
                    <div className="text-[11px] text-slate-500">
                      {s.category} · {s.durationMinutes} دقیقه
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold tabular-nums text-[#3b185f]">{s.priceFormatted}</span>
                    <button
                      onClick={() => handleDeleteService(s.id)}
                      className="p-1 text-red-500 hover:text-red-700"
                      title="حذف خدمت"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
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
          <form onSubmit={handleAddPortfolio} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs text-xs">
            <h3 className="font-bold text-sm text-slate-900">افزودن نمونه‌کار جدید به آلبوم</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="عنوان نمونه‌کار (مثال: آمبره کاراملی)"
                value={newPortTitle}
                onChange={(e) => setNewPortTitle(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
              />
              <select
                value={newPortCategory}
                onChange={(e) => setNewPortCategory(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
              >
                <option value="کوتاهی و استایل">کوتاهی و استایل</option>
                <option value="رنگ و لایت">رنگ و لایت</option>
                <option value="میکاپ و شینیون">میکاپ و شینیون</option>
                <option value="اصلاح ریش">اصلاح ریش</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="توضیح کوتاه درباره تکنیک یا مواد استفاده‌شده"
              value={newPortDesc}
              onChange={(e) => setNewPortDesc(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
            />
            <button
              type="submit"
              className="py-2 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              افزودن نمونه‌کار
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {currentSalon.portfolio.map((p) => (
              <div key={p.id} className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs space-y-2 text-xs relative">
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-100">
                  <img src={p.imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900">{p.title}</h4>
                  <button
                    onClick={() => handleDeletePortfolio(p.id)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
