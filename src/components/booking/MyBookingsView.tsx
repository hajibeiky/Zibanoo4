import React, { useMemo } from 'react';
import { BookingRequest } from '../../types';
import { 
  CalendarCheck, 
  Clock, 
  MapPin, 
  Home, 
  XCircle, 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  Scissors,
  Bell,
  Sparkles,
  ArrowLeft,
  Calendar
} from 'lucide-react';

interface MyBookingsViewProps {
  bookings: BookingRequest[];
  onCancelBooking: (bookingId: string) => void;
  onBookNew: () => void;
  onExploreSalonsForService?: (serviceCategory: string) => void;
}

export const MyBookingsView: React.FC<MyBookingsViewProps> = ({
  bookings,
  onCancelBooking,
  onBookNew,
  onExploreSalonsForService
}) => {
  // Check for upcoming approved bookings for in-app reminder
  const upcomingApproved = useMemo(() => {
    return bookings.filter(b => b.status === 'approved' && b.reminderEnabled !== false);
  }, [bookings]);

  // Analyze customer visit history to compute revisit frequency
  const revisitSuggestion = useMemo(() => {
    // Look at bookings with similar services (e.g. کوتاهی / هیرکات)
    const hairBookings = bookings.filter(b => 
      b.serviceName.includes('کوتاهی') || 
      b.serviceName.includes('اصلاح') || 
      b.serviceName.includes('هیرکات')
    );

    if (hairBookings.length >= 2) {
      // Approximate 15-20 days pattern
      return {
        hasPattern: true,
        daysInterval: 15,
        serviceName: hairBookings[0].serviceName,
        salonName: hairBookings[0].salonName,
        message: 'به نظر می‌رسد معمولاً هر ۱۵ روز برای اصلاح و کوتاهی مو مراجعه می‌کنید. مایل هستید نوبت‌های خالی روزهای آینده را بررسی کنید؟'
      };
    } else if (hairBookings.length === 1) {
      return {
        hasPattern: true,
        daysInterval: 15,
        serviceName: hairBookings[0].serviceName,
        salonName: hairBookings[0].salonName,
        message: 'از آخرین نوبت اصلاح موی شما مدتی گذشته است. مایل هستید نوبت‌های خالی روزهای آینده را بررسی کنید؟'
      };
    }
    return null;
  }, [bookings]);

  const getStatusBadge = (status: BookingRequest['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            تأییدشده توسط آرایشگر
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-800 bg-red-50 border border-red-200 px-2.5 py-1 rounded-md">
            <XCircle className="w-3.5 h-3.5 text-red-600" />
            ردشده
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-md">
            انجام‌شده
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md">
            لغوشده توسط مشتری
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            در انتظار بررسی آرایشگر
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            نوبت‌های رزروشده من
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            پیگیری وضعیت رزروها، یادآوری نوبت و پیشنهاد هوشمند زمان مراجعه بعدی
          </p>
        </div>

        <button
          onClick={onBookNew}
          className="px-4 py-2 bg-[#3b185f] hover:bg-[#2b1047] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>رزرو نوبت جدید</span>
        </button>
      </div>

      {/* In-App Reminder Banner for upcoming approved appointments */}
      {upcomingApproved.length > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-l from-emerald-50 via-teal-50 to-white border border-emerald-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-emerald-950 text-xs">
            <Bell className="w-4 h-4 text-emerald-600 animate-bounce" />
            <span>یادآوری نوبت پیش‌رو:</span>
          </div>
          <div className="space-y-1 text-xs text-slate-700">
            {upcomingApproved.map((b) => (
              <div key={b.id} className="flex flex-wrap items-center justify-between gap-2 bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{b.salonName}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-emerald-800 font-semibold">{b.serviceName}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 tabular-nums font-semibold">
                  <span>تاریخ: {b.date}</span>
                  <span>|</span>
                  <span>سانس {b.timeSlot}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Smart Revisit Suggestion Card based on past customer history */}
      {revisitSuggestion && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-l from-purple-50 via-amber-50/40 to-white border border-purple-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-black text-[#3b185f] text-xs sm:text-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>پیشنهاد هوشمند زمان مراجعه بر اساس سابقه شما</span>
            </div>
            <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-md">
              الگوی زمانی {revisitSuggestion.daysInterval} روزه
            </span>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {revisitSuggestion.message}
          </p>

          <div>
            <button
              onClick={() => {
                if (onExploreSalonsForService) {
                  onExploreSalonsForService('کوتاهی');
                } else {
                  onBookNew();
                }
              }}
              className="py-2 px-4 bg-[#3b185f] hover:bg-[#2b1047] text-white text-xs font-bold rounded-xl transition-colors shadow-xs inline-flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>بررسی نوبت‌های خالی روزهای آینده و رزرو</span>
            </button>
          </div>
        </div>
      )}

      {/* Bookings List */}
      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 hover:border-purple-200 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#3b185f] flex items-center justify-center font-black">
                    <CalendarCheck className="w-5 h-5 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      {booking.salonName}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span>کد رهگیری: </span>
                      <strong className="text-[#3b185f] tabular-nums font-bold">
                        {booking.trackingCode}
                      </strong>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">ثبت: {booking.createdAt}</span>
                    </div>
                  </div>
                </div>

                <div>{getStatusBadge(booking.status)}</div>
              </div>

              {/* Booking Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
                <div className="space-y-1">
                  <span className="text-slate-400 block text-[10px]">خدمت انتخاب‌شده:</span>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Scissors className="w-3.5 h-3.5 text-purple-700" />
                    <span>{booking.serviceName}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 block text-[10px]">زمان مراجعه یا اعزام:</span>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span className="tabular-nums">{booking.date} (سانس {booking.timeSlot})</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 block text-[10px]">نوع خدمت و مبلغ تسویه:</span>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    {booking.serviceType === 'at_home' ? (
                      <span className="text-amber-800 flex items-center gap-1">
                        <Home className="w-3.5 h-3.5 text-amber-600" />
                        در محل مشتری
                      </span>
                    ) : (
                      <span>مراجعه حضوری به سالن</span>
                    )}
                    <span>·</span>
                    <span className="tabular-nums text-[#3b185f]">
                      {booking.price.toLocaleString('fa-IR')} تومان
                    </span>
                  </div>
                </div>
              </div>

              {booking.customerAddress && (
                <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/70 text-xs text-amber-950 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>آدرس اعزام: {booking.customerAddress}</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-400 text-[11px]">
                  متقاضی: {booking.customerName} ({booking.customerPhone})
                </span>

                {booking.status === 'pending' && (
                  <button
                    onClick={() => onCancelBooking(booking.id)}
                    className="text-red-600 hover:text-red-700 font-semibold hover:underline"
                  >
                    لغو این درخواست
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-purple-50 text-[#3b185f] flex items-center justify-center">
            <CalendarCheck className="w-8 h-8 text-amber-600" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800">
              هنوز هیچ نوبتی ثبت نکرده‌اید
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              می‌توانید با جستجوی آرایشگاه‌ها و انتخاب خدمت مورد نظرتان، فرآیند رزرو آنلاین را انجام دهید.
            </p>
          </div>
          <button
            onClick={onBookNew}
            className="px-5 py-2.5 bg-[#3b185f] hover:bg-[#2b1047] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
          >
            مشاهده آرایشگاه‌ها و رزرو
          </button>
        </div>
      )}
    </div>
  );
};
