import React, { useState, useRef } from 'react';
import { Salon, PortfolioItem, ServiceItem } from '../../types';
import { 
  X, 
  Upload, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  Sliders, 
  ChevronRight, 
  ChevronLeft, 
  Eye, 
  Image as ImageIcon,
  Check,
  RefreshCw,
  Scissors
} from 'lucide-react';

interface BeautySimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  salon?: Salon | null;
  salons: Salon[];
  initialPortfolioItem?: PortfolioItem;
  onBookService: (salon: Salon, service?: ServiceItem) => void;
}

export const BeautySimulatorModal: React.FC<BeautySimulatorModalProps> = ({
  isOpen,
  onClose,
  salon,
  salons,
  initialPortfolioItem,
  onBookService
}) => {
  // Current active salon
  const [activeSalonId, setActiveSalonId] = useState<string>(salon?.id || salons[0]?.id || '');
  const currentSalon = salons.find(s => s.id === activeSalonId) || salons[0];

  // User uploaded photo state (data URL)
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Selected style / portfolio item
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string>(
    initialPortfolioItem?.id || currentSalon?.portfolio[0]?.id || ''
  );

  // Slider comparison value (0 to 100%)
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentPortfolio = currentSalon?.portfolio.find(p => p.id === selectedPortfolioId) || currentSalon?.portfolio[0];
  const matchedService = currentSalon?.services.find(s => s.id === currentPortfolio?.serviceId) || currentSalon?.services[0];

  // Handle user photo upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserPhoto(event.target?.result as string);
        setTimeout(() => setIsProcessing(false), 500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = () => {
    setUserPhoto(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-l from-[#2a0e44] via-[#3b185f] to-[#1a082c] text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black">شبیه‌ساز هوشمند زیبایی زیبانو</h2>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full font-bold">
                  پیش‌نمایش تعاملی مدل
                </span>
              </div>
              <p className="text-xs text-purple-200 mt-0.5">
                تست و مقایسه مدل مو یا آرایش سالن «{currentSalon.name}» روی چهره پیش از رزرو نوبت
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Salon Switcher (if needed) */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">سالن ارائه‌دهنده مدل:</span>
              <select
                value={activeSalonId}
                onChange={(e) => {
                  setActiveSalonId(e.target.value);
                  const s = salons.find(item => item.id === e.target.value);
                  if (s && s.portfolio.length > 0) {
                    setSelectedPortfolioId(s.portfolio[0].id);
                  }
                }}
                className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-[#3b185f] focus:outline-none"
              >
                {salons.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.gender === 'women' ? 'بانوان' : 'آقایان'})</option>
                ))}
              </select>
            </div>

            <div className="text-[11px] text-slate-500">
              {currentSalon.portfolio.length} مدل ژورنالی موجود در این سالن
            </div>
          </div>

          {/* Main Visual Simulator Arena */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Interactive Comparison Canvas */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-200 shadow-inner flex items-center justify-center">
                {isProcessing && (
                  <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white gap-2">
                    <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
                    <span className="text-xs font-bold">در حال پردازش و انطباق مدل بر چهره...</span>
                  </div>
                )}

                {!userPhoto ? (
                  /* Placeholder when no user photo uploaded */
                  <div className="text-center p-6 space-y-3 max-w-sm">
                    <div className="w-14 h-14 mx-auto rounded-full bg-purple-950/60 text-purple-300 flex items-center justify-center border border-purple-500/30">
                      <Upload className="w-7 h-7 text-amber-400" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-white">تصویر چهره خود را بارگذاری کنید</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        برای شبیه‌سازی مدل مو و آرایش، یک عکس پرتره واضح از چهره خود انتخاب کنید.
                      </p>
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-xs"
                    >
                      انتخاب تصویر از گالری
                    </button>
                  </div>
                ) : (
                  /* Before / After Interactive Split-View Comparison Slider */
                  <div className="relative w-full h-full select-none overflow-hidden">
                    {/* Layer 1: Simulated Result (Right side) */}
                    <div className="absolute inset-0">
                      <img
                        src={currentPortfolio?.imageUrl || userPhoto}
                        alt="مدل شبیه‌سازی‌شده"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-bold text-amber-300">
                        پیش‌نمایش مدل: {currentPortfolio?.title}
                      </div>
                    </div>

                    {/* Layer 2: Original User Photo (Left side cropped by slider) */}
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                    >
                      <img
                        src={userPhoto}
                        alt="تصویر اصلی کاربر"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-bold text-white">
                        تصویر اصلی چهره شما
                      </div>
                    </div>

                    {/* Draggable Divider Line */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-amber-400 z-20 cursor-ew-resize flex items-center justify-center shadow-lg"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md text-[10px] font-bold">
                        ↔
                      </div>
                    </div>

                    {/* Invisible Range Input for dragging */}
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={sliderPosition}
                      onChange={(e) => setSliderPosition(Number(e.target.value))}
                      className="absolute inset-0 opacity-0 cursor-ew-resize z-25 w-full h-full"
                    />
                  </div>
                )}
              </div>

              {/* Upload & Slider helper controls */}
              <div className="flex items-center justify-between text-slate-500 text-[11px] px-1">
                {userPhoto ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[#3b185f] hover:underline font-semibold"
                    >
                      تغییر تصویر چهره
                    </button>
                    <span>·</span>
                    <button
                      onClick={handleResetPhoto}
                      className="text-red-600 hover:underline"
                    >
                      حذف عکس
                    </button>
                  </div>
                ) : (
                  <span>یک تصویر با نور مناسب انتخاب کنید</span>
                )}

                <span className="text-slate-400">
                  {userPhoto ? 'اسلایدر را جهت مقایسه قبل و بعد جابه‌جا کنید' : ''}
                </span>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Right Column: Model Selection from Salon Portfolio */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1">
                <span className="font-bold text-slate-800 text-sm block">
                  انتخاب مدل مو یا آرایش از سالن:
                </span>
                <p className="text-[11px] text-slate-500">
                  مدل موردنظر خود را از آلبوم واقعی آرایشگاه انتخاب کنید تا روی چهره آزمایش شود.
                </p>
              </div>

              {/* Portfolio Grid */}
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {currentSalon.portfolio.map((item) => {
                  const isSelected = selectedPortfolioId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedPortfolioId(item.id)}
                      className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-[#3b185f] bg-purple-50/80 shadow-xs ring-1 ring-[#3b185f]'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-200 shrink-0 border">
                          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs">{item.title}</div>
                          <span className="text-[10px] text-purple-700 font-semibold">{item.category}</span>
                          <p className="text-[10px] text-slate-500 line-clamp-1">{item.description}</p>
                        </div>
                      </div>

                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-[#3b185f] bg-[#3b185f] text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Matched Service Card */}
              {matchedService && (
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-950 flex items-center gap-1">
                      <Scissors className="w-3.5 h-3.5 text-amber-700" />
                      خدمت مرتبط با این مدل:
                    </span>
                    <strong className="text-slate-900 font-bold tabular-nums">
                      {matchedService.priceFormatted}
                    </strong>
                  </div>
                  <div className="text-[11px] text-slate-700 font-semibold">
                    {matchedService.name} ({matchedService.durationMinutes} دقیقه)
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onBookService(currentSalon, matchedService);
                    }}
                    className="w-full py-2.5 px-4 bg-[#3b185f] hover:bg-[#2b1047] text-white font-bold rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5 text-amber-300" />
                    <span>رزرو مستقیم همین مدل در «{currentSalon.name}»</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Privacy & Technical Notice */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>رعایت کامل حریم خصوصی و امنیت تصاویر:</span>
            </div>
            <p className="leading-relaxed text-slate-500">
              تصویر شخصی شما به صورت کاملاً محلی در مرورگر پردازش می‌شود و در هیچ پایگاه داده یا سروری ذخیره یا منتشر نخواهد شد. پیش‌نمایش بر اساس انطباق ژورنالی سالن پیاده‌سازی شده است.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
