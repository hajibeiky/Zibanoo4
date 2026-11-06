import React, { useState } from 'react';
import { BookingRequest, Salon } from '../../types';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  Ban, 
  ChevronRight, 
  ChevronLeft, 
  Home, 
  Check, 
  X,
  AlertCircle
} from 'lucide-react';
import { TIME_SLOTS } from '../../data/mockData';

interface BarberCalendarViewProps {
  salon: Salon;
  bookings: BookingRequest[];
  onUpdateBookingStatus: (bookingId: string, status: BookingRequest['status']) => void;
  onToggleBlockSlot: (date: string, timeSlot: string) => void;
}

export const BarberCalendarView: React.FC<BarberCalendarViewProps> = ({
  salon,
  bookings,
  onUpdateBookingStatus,
  onToggleBlockSlot
}) => {
  // Current calendar month view (Jalali-friendly representation / Gregorian date mapping)
  const today = new Date();
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth()); // 0-11

  // Selected date string YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState<string>(today.toISOString().split('T')[0]);

  // Days in current month calculation
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayWeekIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday, 6 is Saturday

  // Persian month names for title display
  const monthNames = [
    'ژانویه / دی', 'فوریه / بهمن', 'مارس / اسفند',
    'آوریل / فروردین', 'مه / اردیبهشت', 'ژوئن / خرداد',
    'ژوئیه / تیر', 'اوت / مرداد', 'سپتامبر / شهریور',
    'اکتبر / مهر', 'نوامبر / آبان', 'دسامبر / آذر'
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Generate date string YYYY-MM-DD for a day in current month
  const formatDateString = (day: number) => {
    const m = String(currentMonth + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${currentYear}-${m}-${d}`;
  };

  // Bookings for selected date sorted by time slot
  const selectedDayBookings = bookings
    .filter(b => b.salonId === salon.id && b.date === selectedDate)
    .sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));

  // Count bookings for a specific date
  const getBookingsCountForDate = (dateStr: string) => {
    return bookings.filter(b => b.salonId === salon.id && b.date === dateStr && b.status !== 'cancelled' && b.status !== 'rejected').length;
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Calendar Header Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-purple-50 p-4 rounded-2xl border border-purple-200">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#3b185f]" />
          <div>
            <h3 className="font-extrabold text-sm text-[#2a0e44]">تقویم جامع مدیریت نوبت‌های سالن</h3>
            <p className="text-[11px] text-slate-600 mt-0.5">
              مشاهده نوبت‌های روزانه، سانس‌های آزاد، هماهنگی اعزام به محل و تعیین سانس‌های غیرقابل رزرو
            </p>
          </div>
        </div>

        <div className="text-[11px] font-bold text-[#3b185f] bg-white px-3 py-1.5 rounded-xl border border-purple-200 shadow-xs self-start sm:self-auto">
          نوبت‌های ثبت‌شده سالن: {bookings.filter(b => b.salonId === salon.id).length} مورد
        </div>
      </div>

      {/* Main Grid: Calendar Month on right, Selected Day Bookings on left */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Month Calendar Component */}
        <div className="lg:col-span-6 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          {/* Month Changer Bar */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
              title="ماه قبل"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <span className="font-extrabold text-sm text-slate-900 tabular-nums">
              {monthNames[currentMonth]} {currentYear}
            </span>

            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
              title="ماه بعد"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 text-center font-bold text-slate-400 text-[11px]">
            <span>ش</span>
            <span>ی</span>
            <span>د</span>
            <span>س</span>
            <span>چ</span>
            <span>پ</span>
            <span>ج</span>
          </div>

          {/* Month Days Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const dateStr = formatDateString(day);
              const count = getBookingsCountForDate(dateStr);
              const isSelected = selectedDate === dateStr;
              const isToday = today.toISOString().split('T')[0] === dateStr;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`p-2 rounded-2xl flex flex-col items-center justify-between min-h-[58px] transition-all border relative ${
                    isSelected
                      ? 'bg-[#3b185f] text-white border-[#3b185f] shadow-md scale-102 z-10'
                      : isToday
                      ? 'border-amber-400 bg-amber-50/50 text-amber-950 font-bold'
                      : 'border-slate-100 hover:border-purple-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="font-bold tabular-nums text-xs">{day}</span>
                  {count > 0 ? (
                    <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full tabular-nums ${
                      isSelected ? 'bg-amber-400 text-slate-950' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {count} نوبت
                    </span>
                  ) : (
                    <span className="text-[9px] text-slate-300">آزاد</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>تاریخ انتخاب‌شده: <strong className="text-slate-900 tabular-nums">{selectedDate}</strong></span>
            <span className="text-amber-700 font-medium">برای دیدن یا مسدودسازی نوبت‌ها روی روز کلیک کنید</span>
          </div>
        </div>

        {/* Selected Day's Appointments List & Slots */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">
                  نوبت‌های ثبت‌شده در تاریخ {selectedDate}
                </h4>
                <p className="text-[11px] text-slate-500">
                  مرتب‌شده بر اساس ساعت مراجعه از صبح تا شب
                </p>
              </div>

              <span className="font-bold text-xs bg-purple-50 text-[#3b185f] px-2.5 py-1 rounded-lg tabular-nums">
                {selectedDayBookings.length} رزرو
              </span>
            </div>

            {/* List of appointments */}
            {selectedDayBookings.length > 0 ? (
              <div className="space-y-3">
                {selectedDayBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 space-y-3 hover:border-purple-300 transition-colors"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-200/70 pb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#3b185f]" />
                        <span className="font-black text-slate-900 text-xs tabular-nums">
                          ساعت {booking.timeSlot}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          ({booking.durationMinutes || 45} دقیقه)
                        </span>
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        booking.status === 'approved'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : booking.status === 'rejected'
                          ? 'bg-red-50 text-red-800 border border-red-200'
                          : booking.status === 'completed'
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : booking.status === 'cancelled'
                          ? 'bg-slate-100 text-slate-500'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {booking.status === 'approved' && 'تأییدشده'}
                        {booking.status === 'rejected' && 'ردشده'}
                        {booking.status === 'completed' && 'انجام‌شده'}
                        {booking.status === 'cancelled' && 'لغوشده'}
                        {booking.status === 'pending' && 'در انتظار بررسی'}
                      </span>
                    </div>

                    {/* Customer and Service details */}
                    <div className="grid grid-cols-2 gap-2 text-slate-700">
                      <div>
                        <span className="text-slate-400 block text-[10px]">مشتری:</span>
                        <span className="font-bold text-slate-900">{booking.customerName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">شماره تماس:</span>
                        <span className="font-bold tabular-nums dir-ltr text-right block">{booking.customerPhone}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">خدمت:</span>
                        <span className="font-bold text-slate-900">{booking.serviceName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">مبلغ:</span>
                        <span className="font-bold text-[#3b185f] tabular-nums">{booking.price.toLocaleString('fa-IR')} تومان</span>
                      </div>
                    </div>

                    {/* Reception mode & Address if at-home */}
                    <div className="pt-1">
                      {booking.serviceType === 'at_home' ? (
                        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1">
                          <div className="font-bold flex items-center gap-1.5 text-xs text-amber-900">
                            <Home className="w-3.5 h-3.5 text-amber-700" />
                            <span>خدمات در محل مشتری (اعزام آرایشگر)</span>
                          </div>
                          <p className="text-[11px] leading-relaxed">
                            نشانی: {booking.customerAddress || 'آدرس ثبت شده در سفارش'}
                          </p>
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-500 flex items-center gap-1">
                          <span>محل دریافت:</span>
                          <strong className="text-slate-800">مراجعه حضوری مشتری به سالن</strong>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-200/70">
                      {booking.status === 'pending' && (
                        <>
                          <button
                            onClick={() => onUpdateBookingStatus(booking.id, 'approved')}
                            className="py-1 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] transition-colors flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            تأیید نوبت
                          </button>
                          <button
                            onClick={() => onUpdateBookingStatus(booking.id, 'rejected')}
                            className="py-1 px-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-[11px] transition-colors flex items-center gap-1"
                          >
                            <X className="w-3 h-3" />
                            رد درخواست
                          </button>
                        </>
                      )}

                      {booking.status === 'approved' && (
                        <button
                          onClick={() => onUpdateBookingStatus(booking.id, 'completed')}
                          className="py-1 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-[11px] transition-colors flex items-center gap-1"
                        >
                          <CheckCircle className="w-3 h-3" />
                          ثبت به عنوان انجام‌شده
                        </button>
                      )}

                      {booking.status !== 'cancelled' && booking.status !== 'rejected' && (
                        <button
                          onClick={() => onUpdateBookingStatus(booking.id, 'cancelled')}
                          className="text-red-500 hover:text-red-700 text-[11px] hover:underline mr-auto"
                        >
                          لغو نوبت
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500">
                هیچ نوبتی برای این روز رزرو نشده است. تمام سانس‌های سالن آزاد هستند.
              </div>
            )}
          </div>

          {/* Manage Time Slots Block / Free */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs text-slate-800">
                مدیریت سانس‌های آزاد / غیرقابل رزرو در {selectedDate}:
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              با کلیک روی هر سانس، می‌توانید آن را به عنوان «زمان استراحت یا غیرقابل رزرو» علامت‌گذاری کنید تا مشتریان نتوانند آن را انتخاب کنند.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {TIME_SLOTS.map((slot) => {
                const isBlocked = salon.blockedSlots?.some(b => b.date === selectedDate && b.timeSlot === slot);
                const hasBooking = selectedDayBookings.some(b => b.timeSlot === slot && b.status !== 'cancelled' && b.status !== 'rejected');

                return (
                  <button
                    key={slot}
                    disabled={hasBooking}
                    onClick={() => onToggleBlockSlot(selectedDate, slot)}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      hasBooking
                        ? 'bg-purple-100 text-purple-900 border-purple-300 font-bold cursor-not-allowed'
                        : isBlocked
                        ? 'bg-red-50 text-red-700 border-red-300 font-bold'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span className="tabular-nums font-semibold block">{slot}</span>
                    <span className="text-[9px] block">
                      {hasBooking ? 'رزرو مشتری' : isBlocked ? 'غیرقابل رزرو' : 'آزاد برای رزرو'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
