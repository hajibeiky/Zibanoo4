import React, { useState } from 'react';
import { UserAccount, Salon } from '../../types';
import { 
  X, 
  User, 
  Briefcase, 
  Phone, 
  MapPin, 
  Lock, 
  CheckCircle2, 
  Scissors, 
  ArrowLeft,
  Store
} from 'lucide-react';
import { IRAN_CITIES } from '../../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (account: UserAccount, newSalon?: Salon) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin
}) => {
  const [role, setRole] = useState<'customer' | 'barber'>('customer');
  const [isRegister, setIsRegister] = useState(true);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [salonName, setSalonName] = useState('');
  const [city, setCity] = useState('یزد');
  const [district, setDistrict] = useState('');
  const [salonGender, setSalonGender] = useState<'women' | 'men'>('women');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim() || fullName.trim().length < 3) {
      setErrorMsg('لطفاً نام و نام خانوادگی خود را کامل وارد کنید.');
      return;
    }

    const phoneRegex = /^09[0-9]{9}$/;
    if (!phoneRegex.test(phone.trim())) {
      setErrorMsg('شماره موبایل نامعتبر است. نمونه صحیح: 09123456789');
      return;
    }

    if (role === 'barber' && isRegister) {
      if (!salonName.trim() || salonName.trim().length < 3) {
        setErrorMsg('لطفاً نام سالن یا آرایشگاه را وارد کنید.');
        return;
      }

      // Create new Salon entity for this barber
      const newSalonId = `salon-user-${Date.now()}`;
      const newSalon: Salon = {
        id: newSalonId,
        name: salonName.trim(),
        ownerName: fullName.trim(),
        ownerAvatar: salonGender === 'women' 
          ? '/src/assets/images/women_beauty_services_1793464702979.jpg' 
          : '/src/assets/images/men_grooming_services_1793464703155.jpg',
        slogan: 'ارائه باکیفیت‌ترین خدمات زیبایی و آراستگی',
        gender: salonGender,
        city,
        district: district.trim() || 'مرکز شهر',
        address: `${city}، ${district.trim() || 'مرکز شهر'}، خیابان اصلی`,
        phone: phone.trim(),
        latitude: city === 'یزد' ? 31.86 : city === 'تهران' ? 35.75 : 32.65,
        longitude: city === 'یزد' ? 54.36 : city === 'تهران' ? 51.40 : 51.66,
        rating: 5.0,
        reviewsCount: 1,
        priceLevel: 'متوسط',
        priceRangeText: '۲۰۰,۰۰۰ الی ۱,۵۰۰,۰۰۰ تومان',
        hasHomeService: true,
        homeServiceFee: 120000,
        imageUrl: salonGender === 'women' 
          ? '/src/assets/images/women_beauty_services_1793464702979.jpg' 
          : '/src/assets/images/men_grooming_services_1793464703155.jpg',
        galleryImages: [
          salonGender === 'women' 
            ? '/src/assets/images/women_beauty_services_1793464702979.jpg' 
            : '/src/assets/images/men_grooming_services_1793464703155.jpg'
        ],
        description: `مرکز تخصصی ارائه خدمات زیبایی و پیرایش در ${city} با مدیریت ${fullName.trim()}.`,
        workingHours: 'همه روزه ۹:۰۰ الی ۲۱:۰۰',
        openingHour: '09:00',
        closingHour: '21:00',
        workingDays: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه'],
        featuredServices: salonGender === 'women' 
          ? ['کوتاهی و استایل', 'رنگ و لایت', 'میکاپ'] 
          : ['کوتاهی مو', 'اصلاح ریش', 'پاکسازی پوست'],
        services: [
          {
            id: `srv-${Date.now()}-1`,
            name: salonGender === 'women' ? 'کوتاهی و براشینگ مجلسی' : 'کوتاهی و هیرکات مدرن',
            category: salonGender === 'women' ? 'کوتاهی و اصلاح مو' : 'کوتاهی مو',
            price: 250000,
            priceFormatted: '۲۵۰,۰۰۰ تومان',
            durationMinutes: 45,
            homeServiceAvailable: true,
            homeServiceFeeExtra: 100000,
            description: 'کوتاهی تخصصی با ژورنال روز'
          }
        ],
        portfolio: [
          {
            id: `port-${Date.now()}-1`,
            title: salonGender === 'women' ? 'مدل کوتاهی ژورنالی' : 'مدل فید مردانه',
            category: salonGender === 'women' ? 'کوتاهی و اصلاح مو' : 'کوتاهی مو',
            imageUrl: salonGender === 'women' 
              ? '/src/assets/images/women_beauty_services_1793464702979.jpg' 
              : '/src/assets/images/men_grooming_services_1793464703155.jpg',
            description: 'نمونه‌کار ثبت‌شده در بدو ثبت‌نام'
          }
        ],
        reviews: []
      };

      const account: UserAccount = {
        id: `user-${Date.now()}`,
        name: fullName.trim(),
        phone: phone.trim(),
        role: 'barber',
        salonId: newSalonId
      };

      onSuccessLogin(account, newSalon);
    } else {
      const account: UserAccount = {
        id: `user-${Date.now()}`,
        name: fullName.trim(),
        phone: phone.trim(),
        role
      };
      onSuccessLogin(account);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-l from-[#2a0e44] to-[#3b185f] text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-amber-300">پلتفرم هوشمند زیبانو</span>
            <h3 className="text-lg font-extrabold mt-0.5">
              {isRegister ? 'ایجاد حساب کاربری جدید' : 'ورود به حساب کاربری'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Account Role Selector */}
        <div className="p-5 pb-2">
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => setRole('customer')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                role === 'customer'
                  ? 'bg-white text-[#2a0e44] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4 text-purple-700" />
              <span>حساب مشتری</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('barber')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                role === 'barber'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-4 h-4 text-slate-900" />
              <span>آرایشگر / صاحب سالن</span>
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mx-5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-700">نام و نام خانوادگی:</label>
            <div className="relative">
              <input
                type="text"
                placeholder="مثلاً: سارا حسینی"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 pl-8 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#3b185f]/20 focus:border-[#3b185f]"
              />
              <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">شماره موبایل:</label>
            <div className="relative">
              <input
                type="tel"
                dir="ltr"
                placeholder="09123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 pl-8 text-xs font-medium text-left focus:outline-none focus:ring-2 focus:ring-[#3b185f]/20 focus:border-[#3b185f]"
              />
              <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
            </div>
          </div>

          {/* Additional fields for Barber Registration */}
          {role === 'barber' && isRegister && (
            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
              <div className="font-bold text-amber-950 text-xs flex items-center gap-1.5">
                <Store className="w-4 h-4 text-amber-700" />
                <span>اطلاعات سالن آرایشگاه:</span>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">نام سالن یا کسب‌وکار:</label>
                <input
                  type="text"
                  placeholder="مثلاً: سالن زیبایی آناهیتا"
                  value={salonName}
                  onChange={(e) => setSalonName(e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">نوع سالن:</label>
                  <select
                    value={salonGender}
                    onChange={(e) => setSalonGender(e.target.value as any)}
                    className="w-full bg-white border border-amber-300 rounded-xl px-2 py-2 text-xs font-semibold"
                  >
                    <option value="women">بانوان</option>
                    <option value="men">آقایان</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">شهر فعالیت:</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl px-2 py-2 text-xs font-semibold"
                  >
                    {IRAN_CITIES.filter(c => c !== 'همه شهرها').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">محله یا منطقه:</label>
                <input
                  type="text"
                  placeholder="مثلاً: صفائیه / سعادت‌آباد"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-[#3b185f] hover:bg-[#2b1047] text-white font-bold rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>{isRegister ? (role === 'barber' ? 'ثبت سالن و ورود به پنل مدیریت' : 'تکمیل ثبت‌نام') : 'ورود'}</span>
              <ArrowLeft className="w-4 h-4 text-amber-300" />
            </button>
          </div>

          <div className="text-center pt-2 text-[11px] text-slate-500">
            {isRegister ? 'قبلاً ثبت‌نام کرده‌اید؟ ' : 'حساب کاربری ندارید؟ '}
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-[#3b185f] font-bold underline hover:text-purple-900"
            >
              {isRegister ? 'ورود به حساب' : 'ایجاد حساب جدید'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
