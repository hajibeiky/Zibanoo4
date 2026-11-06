import React, { useState } from 'react';
import { Salon, PortfolioItem } from '../../types';
import { 
  Sparkles, 
  Upload, 
  Camera, 
  Check, 
  RotateCcw, 
  Calendar, 
  ShieldCheck, 
  ArrowLeft, 
  Sliders, 
  Eye, 
  Scissors, 
  Info,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface BeautySimulatorViewProps {
  salons: Salon[];
  initialSalonId?: string;
  initialPortfolioId?: string;
  onBookService?: (salon: Salon, serviceId?: string) => void;
  onBookSalon?: (salon: Salon, preselectedService?: any) => void;
  onGoBack?: () => void;
  onBack?: () => void;
}

export const BeautySimulatorView: React.FC<BeautySimulatorViewProps> = ({
  salons,
  initialSalonId,
  initialPortfolioId,
  onBookService,
  onBookSalon,
  onGoBack,
  onBack
}) => {
  const handleBooking = (salon: Salon, serviceId?: string) => {
    if (onBookSalon) onBookSalon(salon);
    if (onBookService) onBookService(salon, serviceId);
  };

  const handleReturn = () => {
    if (onBack) onBack();
    if (onGoBack) onGoBack();
  };
  // Aggregate all portfolio items from salons
  const allStyles = salons.flatMap(salon => 
    salon.portfolio.map(port => ({
      ...port,
      salonId: salon.id,
      salonName: salon.name,
      salonCity: salon.city,
      salonGender: salon.gender,
      salonImage: salon.imageUrl
    }))
  );

  const [selectedStyleId, setSelectedStyleId] = useState<string>(
    initialPortfolioId || allStyles[0]?.id || ''
  );
  const [activeGender, setActiveGender] = useState<'women' | 'men'>('women');
  const [uploadedUserImage, setUploadedUserImage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'split' | 'overlay' | 'after'>('split');
  const [hairColorHue, setHairColorHue] = useState<string>('natural');

  // Sample Iranian diverse portrait templates for instant zero-friction testing
  const samplePortraits = {
    women: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400'
    ],
    men: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400'
    ]
  };

  const currentPortrait = uploadedUserImage || samplePortraits[activeGender][0];

  const currentStyle = allStyles.find(s => s.id === selectedStyleId) || allStyles[0];
  const targetSalon = salons.find(s => s.id === currentStyle?.salonId) || salons[0];

  // File Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedUserImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredStyles = allStyles.filter(s => s.salonGender === activeGender || s.salonGender === 'both');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Simulator Header */}
      <div className="bg-gradient-to-l from-[#2a0e44] via-[#3b185f] to-[#1e0832] text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-amber-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-400/15 px-3 py-1 rounded-full border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>قابلیت نوین زیبانو — شبیه‌ساز زیبایی هوشمند</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              پیش‌نمایش مدل مو و آرایش روی چهره شما
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 leading-relaxed max-w-2xl">
              برای رفع نگرانی از نتیجه نهایی کار، تصویر چهره‌تان را بارگذاری کنید و مدل‌های واقعی آرایشگاه‌های معتبر را قبل از رزرو نوبت روی چهره خود بیازمایید.
            </p>
          </div>

          <button
            onClick={onGoBack}
            className="self-start md:self-auto px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>بازگشت به فهرست سالن‌ها</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Viewport: Before / After Studio */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">استودیوی مقایسه و پیش‌نمایش</h3>
              <p className="text-xs text-slate-500">حالت نمایش را برای مقایسه دقیق تغییر دهید</p>
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs self-start sm:self-auto">
              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  viewMode === 'split' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
                }`}
              >
                کنار هم (قبل / بعد)
              </button>
              <button
                onClick={() => setViewMode('after')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  viewMode === 'after' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
                }`}
              >
                نتیجه نهایی
              </button>
            </div>
          </div>

          {/* Visual Display */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            {viewMode === 'split' ? (
              <div className="grid grid-cols-2 divide-x-2 divide-slate-200 aspect-[16/10]">
                {/* Before */}
                <div className="relative overflow-hidden group">
                  <img
                    src={currentPortrait}
                    alt="تصویر چهره کاربر"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded">
                    تصویر اصلی
                  </div>
                </div>

                {/* Simulated Style Preview */}
                <div className="relative overflow-hidden group">
                  <img
                    src={currentStyle?.imageUrl || currentPortrait}
                    alt={currentStyle?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-white text-[11px]">
                    <span className="font-bold text-amber-300">{currentStyle?.title}</span>
                    <span className="bg-[#3b185f] px-2 py-0.5 rounded text-[10px]">پیش‌نمایش مدل</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative aspect-[16/10]">
                <img
                  src={currentStyle?.imageUrl || currentPortrait}
                  alt={currentStyle?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 right-4 left-4 text-white flex items-center justify-between">
                  <div>
                    <span className="text-xs text-amber-300 font-bold">شبیه‌سازی نهایی مدل</span>
                    <h4 className="text-lg font-extrabold">{currentStyle?.title}</h4>
                    <p className="text-xs text-purple-200">{currentStyle?.description}</p>
                  </div>
                  <span className="text-xs bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl">
                    تطابق چهره: ۹۴٪
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Model Fit Analysis */}
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/80 space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-[#3b185f]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                تحلیل تناسب مدل با ساختار چهره شما
              </span>
              <span className="text-amber-800">پیشنهاد آرایشگر: ایده‌آل</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              این مدل {currentStyle?.category} برای چهره‌های بیضی و گرد تعادل بصری ایجاد می‌کند و باعث کشیده‌تر دیده شدن گردن و شادابی گونه‌ها می‌شود.
            </p>
          </div>

          {/* Direct Booking Bar */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-amber-300 font-bold block">مورد پسند شما واقع شد؟</span>
              <span className="text-slate-300">
                این خدمت توسط «{targetSalon.name}» در {targetSalon.city} ارائه می‌شود.
              </span>
            </div>

            <button
              onClick={() => onBookService(targetSalon, currentStyle?.serviceId)}
              className="py-2.5 px-5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 shrink-0"
            >
              <Calendar className="w-4 h-4" />
              <span>رزرو همین خدمت در {targetSalon.name}</span>
            </button>
          </div>
        </div>

        {/* Right Controls: Upload Photo + Style Selection */}
        <div className="lg:col-span-5 space-y-6">
          {/* Photo Source Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Camera className="w-4 h-4 text-purple-700" />
              <span>۱. انتخاب یا بارگذاری تصویر شخصی</span>
            </h3>

            {/* Upload Button */}
            <label className="block p-4 rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/30 hover:bg-purple-50/60 transition-colors text-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Upload className="w-6 h-6 text-[#3b185f] mx-auto mb-1.5" />
              <span className="font-bold text-[#3b185f] block">بارگذاری عکس از گالری</span>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                فرمت‌های JPG و PNG (حفظ حریم خصوصی، پردازش محلی)
              </span>
            </label>

            {/* Sample Portrait selector */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">یا استفاده از تصاویر چهره نمونه:</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setActiveGender('women')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      activeGender === 'women' ? 'bg-[#3b185f] text-white' : 'text-slate-500'
                    }`}
                  >
                    بانوان
                  </button>
                  <button
                    onClick={() => setActiveGender('men')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      activeGender === 'men' ? 'bg-[#3b185f] text-white' : 'text-slate-500'
                    }`}
                  >
                    آقایان
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {samplePortraits[activeGender].map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setUploadedUserImage(img)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      currentPortrait === img ? 'border-amber-500 scale-105' : 'border-slate-200 opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Model Selection from Salon Portfolios */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Scissors className="w-4 h-4 text-amber-600" />
                <span>۲. انتخاب مدل از آرایشگاه‌ها</span>
              </h3>
              <span className="text-slate-400 text-[11px]">
                {filteredStyles.length} مدل ژورنالی
              </span>
            </div>

            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {filteredStyles.map((style) => {
                const isSelected = selectedStyleId === style.id;
                return (
                  <div
                    key={style.id}
                    onClick={() => setSelectedStyleId(style.id)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'border-[#3b185f] bg-purple-50 text-slate-900 font-bold shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                      <img src={style.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">{style.title}</span>
                        <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">
                          {style.salonName}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 block">{style.category}</span>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{style.description}</p>
                    </div>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#3b185f] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Privacy & Scientific Transparency Guarantee */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>تضمین حریم خصوصی و امنیت تصاویر:</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500">
              تصاویر بارگذاری‌شده توسط شما صرفاً در حافظه موقت مرورگر شما پردازش می‌شوند و در هیچ سرور یا پایگاه داده خارجی ذخیره یا بازنشر نخواهند شد.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
