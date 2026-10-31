import React from 'react';
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
  FileText
} from 'lucide-react';

interface MyBookingsViewProps {
  bookings: BookingRequest[];
  onCancelBooking: (bookingId: string) => void;
  onBookNew: () => void;
}

export const MyBookingsView: React.FC<MyBookingsViewProps> = ({
  bookings,
  onCancelBooking,
  onBookNew
}) => {
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
            پیگیری وضعیت رزروهای آزمایشی شما در سامانه زیبانو (ذخیره‌شده در حافظه مرورگر)
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
                  <span className="text-slate-400 block">خدمت انتخاب‌شده:</span>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Scissors className="w-3.5 h-3.5 text-purple-700" />
                    <span>{booking.serviceName}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 block">زمان و ساعت:</span>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span className="tabular-nums">{booking.date} ({booking.timeSlot})</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 block">نوع خدمت و مبلغ:</span>
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
                <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/60 text-xs text-amber-900 flex items-center gap-2">
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
              می‌توانید با جستجوی آرایشگاه‌ها و انتخاب خدمت مورد نظرتان، فرآیند رزرو آزمایشی را انجام دهید.
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
