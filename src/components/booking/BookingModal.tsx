import React, { useState } from 'react';
import { Salon, ServiceItem, BookingRequest } from '../../types';
import { TIME_SLOTS } from '../../data/mockData';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  CheckCircle, 
  AlertCircle, 
  ShieldCheck, 
  Scissors, 
  Home, 
  ArrowLeft, 
  Check,
  FileText
} from 'lucide-react';

interface BookingModalProps {
  salon: Salon;
  preselectedService?: ServiceItem;
  existingBookings: BookingRequest[];
  isOpen: boolean;
  onClose: () => void;
  onSaveBooking: (newBooking: BookingRequest) => void;
  onViewMyBookings: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  salon,
  preselectedService,
  existingBookings,
  isOpen,
  onClose,
  onSaveBooking,
  onViewMyBookings
}) => {
  // Steps: 1: Service, 2: Date & Time, 3: Contact & Location, 4: Review, 5: Confirmation
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form states
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedService?.id || salon.services[0]?.id || ''
  );
  const [serviceType, setServiceType] = useState<'in_salon' | 'at_home'>('in_salon');
  
  // Tomorrow's date default
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];
  const [bookingDate, setBookingDate] = useState<string>(defaultDateStr);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(TIME_SLOTS[0]);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [bookingNotes, setBookingNotes] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Result state
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRequest | null>(null);

  if (!isOpen) return null;

  const currentService = salon.services.find(s => s.id === selectedServiceId) || salon.services[0];

  // Validation
  const validateStep2 = () => {
    if (!bookingDate) {
      setErrorMessage('لطفاً تاریخ مراجعه را مشخص کنید.');
      return false;
    }
    const todayStr = new Date().toISOString().split('T')[0];
    if (bookingDate < todayStr) {
      setErrorMessage('امکان انتخاب تاریخ گذشته وجود ندارد.');
      return false;
    }

    // Check collision / duplicate slot for same salon, date, timeSlot
    const isSlotTaken = existingBookings.some(
      b => b.salonId === salon.id && b.date === bookingDate && b.timeSlot === selectedTimeSlot && b.status !== 'cancelled' && b.status !== 'rejected'
    );
    if (isSlotTaken) {
      setErrorMessage('این سانس زمانی برای این آرایشگاه قبلاً رزرو شده است. لطفاً سانس دیگری انتخاب کنید.');
      return false;
    }

    setErrorMessage(null);
    return true;
  };

  const validateStep3 = () => {
    if (!customerName.trim() || customerName.trim().length < 3) {
      setErrorMessage('لطفاً نام و نام خانوادگی را به طور کامل وارد کنید.');
      return false;
    }
    const phoneRegex = /^09[0-9]{9}$/;
    if (!phoneRegex.test(customerPhone.trim())) {
      setErrorMessage('شماره موبایل نامعتبر است. نمونه صحیح: 09123456789');
      return false;
    }
    if (serviceType === 'at_home' && (!customerAddress.trim() || customerAddress.trim().length < 8)) {
      setErrorMessage('برای خدمات در محل، درج آدرس دقیق ضروری است.');
      return false;
    }

    setErrorMessage(null);
    return true;
  };

  const handleNext = () => {
    setErrorMessage(null);
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    } else if (currentStep === 3) {
      if (validateStep3()) setCurrentStep(4);
    } else if (currentStep === 4) {
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = () => {
    const trackingCode = `ZB-${Math.floor(10000 + Math.random() * 90000)}`;
    const finalPrice = serviceType === 'at_home' 
      ? currentService.price + salon.homeServiceFee 
      : currentService.price;

    const newBooking: BookingRequest = {
      id: `book-${Date.now()}`,
      trackingCode,
      salonId: salon.id,
      salonName: salon.name,
      serviceId: currentService.id,
      serviceName: currentService.name,
      price: finalPrice,
      serviceType,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerAddress: serviceType === 'at_home' ? customerAddress.trim() : undefined,
      date: bookingDate,
      timeSlot: selectedTimeSlot,
      notes: bookingNotes.trim() || undefined,
      status: 'pending',
      createdAt: new Date().toLocaleDateString('fa-IR')
    };

    onSaveBooking(newBooking);
    setConfirmedBooking(newBooking);
    setCurrentStep(5);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-l from-[#2a0e44] to-[#3b185f] text-white p-5 sm:p-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>سناریوی آزمایشی رزرو آنلاین نوبت</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold">{salon.name}</h3>
            <span className="text-xs text-purple-200">{salon.city}، {salon.district}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {currentStep < 5 && (
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span className={currentStep >= 1 ? 'text-[#3b185f] font-bold' : ''}>۱. انتخاب خدمت</span>
            <span>←</span>
            <span className={currentStep >= 2 ? 'text-[#3b185f] font-bold' : ''}>۲. تاریخ و زمان</span>
            <span>←</span>
            <span className={currentStep >= 3 ? 'text-[#3b185f] font-bold' : ''}>۳. مشخصات</span>
            <span>←</span>
            <span className={currentStep >= 4 ? 'text-[#3b185f] font-bold' : ''}>۴. تایید نهایی</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="m-5 mb-0 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Step 1: Select Service & Location type */}
        {currentStep === 1 && (
          <div className="p-6 space-y-5 text-xs">
            <div className="space-y-2">
              <label className="block font-bold text-slate-800 text-sm">نوع مراجعه:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setServiceType('in_salon')}
                  className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                    serviceType === 'in_salon'
                      ? 'border-[#3b185f] bg-purple-50/70 text-[#2a0e44] font-bold shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-bold flex items-center gap-1.5">
                    <Scissors className="w-4 h-4 text-purple-700" />
                    مراجعه حضوری به آرایشگاه
                  </span>
                  <span className="text-[11px] text-slate-500 mt-1">در محل سالن ({salon.district})</span>
                </button>

                <button
                  type="button"
                  disabled={!salon.hasHomeService}
                  onClick={() => salon.hasHomeService && setServiceType('at_home')}
                  className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                    !salon.hasHomeService
                      ? 'opacity-40 cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400'
                      : serviceType === 'at_home'
                      ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-bold flex items-center gap-1.5">
                    <Home className="w-4 h-4 text-amber-700" />
                    خدمات در محل (منزل)
                  </span>
                  <span className="text-[11px] text-slate-500 mt-1">
                    {salon.hasHomeService ? `+${salon.homeServiceFee.toLocaleString('fa-IR')} ت ایاب‌وذهاب` : 'غیرفعال در این سالن'}
                  </span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-slate-800 text-sm">انتخاب خدمت مورد نظر:</label>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {salon.services.map((srv) => {
                  const isSelected = selectedServiceId === srv.id;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedServiceId(srv.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-[#3b185f] bg-purple-50 text-[#3b185f] font-bold'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">{srv.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                            {srv.durationMinutes} دقیقه
                          </span>
                        </div>
                        {srv.description && (
                          <p className="text-[11px] text-slate-500 line-clamp-1">{srv.description}</p>
                        )}
                      </div>
                      <span className="font-black text-slate-900 tabular-nums">
                        {srv.priceFormatted}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {currentStep === 2 && (
          <div className="p-6 space-y-5 text-xs">
            <div className="space-y-1.5">
              <label className="block font-bold text-slate-800 text-sm">
                تاریخ مراجعه:
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#3b185f]/20 focus:border-[#3b185f]"
              />
              <span className="text-[11px] text-slate-400 block">
                سامانه به طور خودکار از ثبت تاریخ‌های گذشته جلوگیری می‌کند.
              </span>
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-slate-800 text-sm">
                انتخاب سانس زمانی آزاد:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const isTaken = existingBookings.some(
                    b => b.salonId === salon.id && b.date === bookingDate && b.timeSlot === slot && b.status !== 'cancelled' && b.status !== 'rejected'
                  );
                  const isSelected = selectedTimeSlot === slot;

                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={isTaken}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        isTaken
                          ? 'opacity-40 bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed line-through'
                          : isSelected
                          ? 'bg-[#3b185f] text-white border-[#3b185f] font-bold shadow-xs'
                          : 'border-slate-200 hover:border-purple-300 text-slate-700'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 mx-auto mb-1 opacity-70" />
                      <span className="tabular-nums font-semibold">{slot}</span>
                      {isTaken && <span className="block text-[9px] text-red-500 font-bold">رزرو شده</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Contact & Address */}
        {currentStep === 3 && (
          <div className="p-6 space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="block font-bold text-slate-800 text-sm">
                نام و نام خانوادگی متقاضی:
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="مثال: سارا محمدی / امیر رضایی"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 pl-8 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#3b185f]/20 focus:border-[#3b185f]"
                />
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block font-bold text-slate-800 text-sm">
                شماره تماس همراه (جهت هماهنگی):
              </label>
              <div className="relative">
                <input
                  type="tel"
                  dir="ltr"
                  placeholder="09123456789"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 pl-8 text-xs font-medium text-left focus:outline-none focus:ring-2 focus:ring-[#3b185f]/20 focus:border-[#3b185f]"
                />
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
              </div>
              <span className="text-[11px] text-slate-400 block">
                شماره آزمایشی ۱۱ رقمی وارد نمایید.
              </span>
            </div>

            {serviceType === 'at_home' && (
              <div className="space-y-1.5">
                <label className="block font-bold text-amber-900 text-sm">
                  آدرس دقیق محل دریافت خدمت:
                </label>
                <textarea
                  rows={2}
                  placeholder="نام شهر، محله، خیابان، پلاک و زنگ..."
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full bg-amber-50/50 border border-amber-300 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block font-bold text-slate-700 text-xs">
                توضیحات یا یادداشت احتمالی (اختیاری):
              </label>
              <input
                type="text"
                placeholder="مثال: موی رنگ‌شده، سالمند با واکر، نیاز به حوله اختصاصی..."
                value={bookingNotes}
                onChange={(e) => setBookingNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </div>
        )}

        {/* Step 4: Summary & Final Review */}
        {currentStep === 4 && (
          <div className="p-6 space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-3">
              <div className="font-bold text-sm text-[#3b185f] border-b border-purple-200 pb-2">
                خلاصه مشخصات رزرو
              </div>
              <div className="space-y-1.5 text-slate-700">
                <div className="flex justify-between">
                  <span>سالن انتخابی:</span>
                  <strong className="text-slate-900">{salon.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span>خدمت:</span>
                  <strong className="text-slate-900">{currentService.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span>نحوه ارائه:</span>
                  <strong className="text-slate-900">
                    {serviceType === 'at_home' ? 'اعزام به محل مشتری' : 'مراجعه حضوری به سالن'}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>تاریخ و ساعت:</span>
                  <strong className="text-slate-900 tabular-nums">
                    {bookingDate} | سانس {selectedTimeSlot}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>متقاضی:</span>
                  <strong className="text-slate-900">{customerName} ({customerPhone})</strong>
                </div>
                {serviceType === 'at_home' && (
                  <div className="flex justify-between">
                    <span>آدرس:</span>
                    <strong className="text-slate-900 max-w-xs text-left truncate">{customerAddress}</strong>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-purple-200 text-sm font-black text-[#2a0e44]">
                  <span>مبلغ قابل پرداخت در محل:</span>
                  <span className="tabular-nums">
                    {(serviceType === 'at_home' ? currentService.price + salon.homeServiceFee : currentService.price).toLocaleString('fa-IR')} تومان
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
              <strong>یادداشت انطباق با الزامات فاز اول:</strong> هیچ درگاه پرداخت اینترنتی واقعی متصل نیست. پرداخت صرفاً در محل انجام خدمت و پس از رضایت مشتری صورت می‌پذیرد.
            </div>
          </div>
        )}

        {/* Step 5: Success & Tracking Code */}
        {currentStep === 5 && confirmedBooking && (
          <div className="p-8 text-center space-y-5 text-xs">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-extrabold text-slate-900">
                درخواست رزرو آزمایشی با موفقیت ثبت شد
              </h4>
              <p className="text-slate-500 max-w-sm mx-auto">
                اطلاعات در حافظه مرورگر شما (LocalStorage) ذخیره گردید و در پنل آرایشگر نیز در دسترس است.
              </p>
            </div>

            {/* Tracking Code Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-xs mx-auto space-y-1">
              <span className="text-[11px] text-slate-400 font-bold block">کد رهگیری اختصاصی:</span>
              <span className="text-2xl font-black text-[#3b185f] tracking-widest tabular-nums">
                {confirmedBooking.trackingCode}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onViewMyBookings();
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#3b185f] text-white font-bold rounded-xl hover:bg-[#2b1047] transition-colors"
              >
                مشاهده نوبت‌های من
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors"
              >
                بستن پنجره
              </button>
            </div>
          </div>
        )}

        {/* Footer controls for steps 1-4 */}
        {currentStep < 5 && (
          <div className="bg-slate-50 p-4 sm:p-5 border-t border-slate-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
              >
                مرحله قبل
              </button>
            ) : (
              <span />
            )}

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 bg-[#3b185f] hover:bg-[#2b1047] text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
            >
              <span>{currentStep === 4 ? 'تایید و ثبت نهایی رزرو' : 'مرحله بعدی'}</span>
              <ArrowLeft className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
