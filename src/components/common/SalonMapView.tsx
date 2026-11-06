import React, { useState } from 'react';
import { Salon } from '../../types';
import { 
  MapPin, 
  Navigation, 
  Car, 
  Footprints, 
  Star, 
  Calendar, 
  ChevronLeft, 
  X, 
  Layers, 
  Info,
  Home
} from 'lucide-react';
import { calculateDistanceKm, estimateTravelTimes, DEFAULT_USER_LOCATION } from '../../data/mockData';

interface SalonMapViewProps {
  salons: Salon[];
  selectedSalonId?: string;
  onSelectSalon: (salon: Salon) => void;
  onBookSalon: (salon: Salon) => void;
  userLocation?: { lat: number; lng: number; city: string; district: string };
  onUpdateUserLocation?: (loc: { lat: number; lng: number; city: string; district: string }) => void;
  className?: string;
  compact?: boolean;
}

export const SalonMapView: React.FC<SalonMapViewProps> = ({
  salons,
  selectedSalonId,
  onSelectSalon,
  onBookSalon,
  userLocation = DEFAULT_USER_LOCATION,
  onUpdateUserLocation,
  className = '',
  compact = false
}) => {
  const [activeSalonId, setActiveSalonId] = useState<string | null>(selectedSalonId || salons[0]?.id || null);
  const [isLocating, setIsLocating] = useState(false);
  const [activeCity, setActiveCity] = useState(userLocation.city || 'یزد');

  // Filter salons matching active city
  const citySalons = salons.filter(s => s.city === activeCity);
  const displayedSalons = citySalons.length > 0 ? citySalons : salons;

  // Active salon detail
  const activeSalon = displayedSalons.find(s => s.id === activeSalonId) || displayedSalons[0];

  // Geolocation simulation or browser navigator
  const handleGetLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLocating(false);
          if (onUpdateUserLocation) {
            onUpdateUserLocation({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              city: activeCity,
              district: 'موقعیت زنده شما'
            });
          }
        },
        () => {
          setIsLocating(false);
          // Fallback to default
        },
        { timeout: 5000 }
      );
    } else {
      setTimeout(() => setIsLocating(false), 600);
    }
  };

  // Convert coords to SVG box percentage (relative to center of active city)
  const cityBounds: Record<string, { minLat: number; maxLat: number; minLng: number; maxLng: number }> = {
    'یزد': { minLat: 31.81, maxLat: 31.92, minLng: 54.30, maxLng: 54.42 },
    'تهران': { minLat: 35.68, maxLat: 35.82, minLng: 51.30, maxLng: 51.48 },
    'اصفهان': { minLat: 32.58, maxLat: 32.72, minLng: 51.60, maxLng: 51.75 },
    'شیراز': { minLat: 29.56, maxLat: 29.70, minLng: 52.45, maxLng: 52.60 },
    'مشهد': { minLat: 36.22, maxLat: 36.36, minLng: 59.50, maxLng: 59.65 },
    'تبریز': { minLat: 38.02, maxLat: 38.14, minLng: 46.25, maxLng: 46.40 }
  };

  const bounds = cityBounds[activeCity] || cityBounds['یزد'];

  const getPercentPos = (lat: number, lng: number) => {
    const latSpan = bounds.maxLat - bounds.minLat;
    const lngSpan = bounds.maxLng - bounds.minLng;
    // Invert lat for SVG Y (top is north)
    const y = 90 - Math.min(80, Math.max(10, ((lat - bounds.minLat) / latSpan) * 80));
    // Invert lng for RTL horizontal representation or standard map
    const x = Math.min(90, Math.max(10, ((lng - bounds.minLng) / lngSpan) * 80 + 10));
    return { x, y };
  };

  const userPos = getPercentPos(userLocation.lat, userLocation.lng);

  return (
    <div className={`relative rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-900 text-white shadow-md ${className}`}>
      {/* Top Map Controls Header */}
      <div className="absolute top-4 right-4 left-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 shadow-xs text-xs">
          <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-bold text-white">نقشه سالن‌های شهر:</span>
          <select
            value={activeCity}
            onChange={(e) => setActiveCity(e.target.value)}
            className="bg-transparent text-amber-300 font-bold focus:outline-none cursor-pointer"
          >
            {Object.keys(cityBounds).map(c => (
              <option key={c} value={c} className="bg-slate-900 text-white">{c}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={handleGetLocation}
            className="px-3 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 text-xs font-semibold text-purple-200 hover:text-white flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Navigation className={`w-3.5 h-3.5 text-emerald-400 ${isLocating ? 'animate-spin' : ''}`} />
            <span>موقعیت من</span>
          </button>
        </div>
      </div>

      {/* Interactive Vector Map Grid Area */}
      <div className={`w-full relative select-none overflow-hidden ${compact ? 'h-80' : 'h-[440px]'}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full object-cover bg-gradient-to-br from-[#1a1329] via-[#161224] to-[#0f0b18]"
          preserveAspectRatio="none"
        >
          {/* Subtle Grid and City Arteries */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />

          {/* Abstract roads / boulevards */}
          <path d="M 0 35 Q 40 45 100 30" fill="none" stroke="rgba(212, 175, 55, 0.15)" strokeWidth="1.8" />
          <path d="M 10 0 Q 30 50 20 100" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" />
          <path d="M 80 0 Q 70 60 90 100" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" />
          <path d="M 0 75 Q 50 65 100 80" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" />
          <circle cx="50" cy="50" r="18" fill="none" stroke="rgba(168, 85, 247, 0.1)" strokeWidth="1.2" strokeDasharray="2 2" />

          {/* User Location Pulse Marker */}
          <g transform={`translate(${userPos.x}, ${userPos.y})`}>
            <circle cx="0" cy="0" r="4.5" fill="rgba(16, 185, 129, 0.2)" className="animate-ping" />
            <circle cx="0" cy="0" r="2.8" fill="#10b981" stroke="#ffffff" strokeWidth="0.8" />
            <text x="0" y="-4.5" fill="#a7f3d0" fontSize="2.2" textAnchor="middle" fontWeight="bold">شما</text>
          </g>

          {/* Connection Line between User and Active Salon */}
          {activeSalon && (
            (() => {
              const salonPos = getPercentPos(activeSalon.latitude, activeSalon.longitude);
              return (
                <line
                  x1={userPos.x}
                  y1={userPos.y}
                  x2={salonPos.x}
                  y2={salonPos.y}
                  stroke="#f59e0b"
                  strokeWidth="0.6"
                  strokeDasharray="1.5 1.5"
                  opacity="0.7"
                />
              );
            })()
          )}

          {/* Salon Markers */}
          {displayedSalons.map((salon) => {
            const pos = getPercentPos(salon.latitude, salon.longitude);
            const isSelected = activeSalonId === salon.id;

            return (
              <g
                key={salon.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                className="cursor-pointer transition-transform hover:scale-125"
                onClick={() => setActiveSalonId(salon.id)}
              >
                {/* Marker Pin */}
                <circle
                  cx="0"
                  cy="0"
                  r={isSelected ? 4.2 : 3.2}
                  fill={isSelected ? '#f59e0b' : salon.gender === 'women' ? '#c084fc' : '#60a5fa'}
                  stroke="#ffffff"
                  strokeWidth={isSelected ? 1.2 : 0.8}
                />
                <circle cx="0" cy="0" r="1.4" fill="#1e1b4b" />

                {/* Text Label */}
                <text
                  x="0"
                  y="5.5"
                  fill={isSelected ? '#fcd34d' : '#e2e8f0'}
                  fontSize={isSelected ? '2.8' : '2.2'}
                  textAnchor="middle"
                  fontWeight={isSelected ? 'bold' : 'normal'}
                  className="pointer-events-none drop-shadow-md"
                >
                  {salon.name.replace('سالن زیبایی ', '').replace('استودیو پیرایش آقایان ', '')}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Bottom Floating Salon Summary Card */}
        {activeSalon && (
          <div className="absolute bottom-4 right-4 left-4 z-20 max-w-lg mx-auto bg-slate-900/95 backdrop-blur-md border border-white/15 rounded-2xl p-4 shadow-xl text-xs space-y-3">
            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-white/20">
                  <img
                    src={activeSalon.imageUrl}
                    alt={activeSalon.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-white">
                      {activeSalon.name}
                    </h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-amber-300 font-semibold">
                      {activeSalon.gender === 'women' ? 'بانوان' : 'آقایان'}
                    </span>
                  </div>
                  <div className="text-slate-300 text-[11px] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{activeSalon.city}، {activeSalon.district}</span>
                    <span>·</span>
                    <span className="text-slate-400">مسئول: {activeSalon.ownerName}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-amber-400/20 text-amber-300 px-2 py-1 rounded-lg font-bold shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="tabular-nums">{activeSalon.rating}</span>
              </div>
            </div>

            {/* Calculated Distance & Travel Times */}
            {(() => {
              const distKm = calculateDistanceKm(
                userLocation.lat,
                userLocation.lng,
                activeSalon.latitude,
                activeSalon.longitude
              );
              const travelTimes = estimateTravelTimes(distKm);

              return (
                <div className="grid grid-cols-3 gap-2 bg-white/5 p-2 rounded-xl border border-white/10 text-center text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px]">فاصله تخمینی:</span>
                    <strong className="text-white font-bold tabular-nums">{distKm} کیلومتر</strong>
                  </div>
                  <div className="border-r border-l border-white/10 px-1">
                    <span className="text-slate-400 block text-[10px] flex items-center justify-center gap-1">
                      <Car className="w-3 h-3 text-amber-300" />
                      با خودرو:
                    </span>
                    <strong className="text-amber-300 font-bold tabular-nums">حدود {travelTimes.carMinutes} دقیقه</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] flex items-center justify-center gap-1">
                      <Footprints className="w-3 h-3 text-emerald-400" />
                      پیاده‌روی:
                    </span>
                    <strong className="text-emerald-300 font-bold tabular-nums">حدود {travelTimes.walkMinutes} دقیقه</strong>
                  </div>
                </div>
              );
            })()}

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onBookSalon(activeSalon)}
                className="flex-1 py-2 px-3 bg-[#f59e0b] hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>رزرو آنلاین نوبت</span>
              </button>
              <button
                onClick={() => onSelectSalon(activeSalon)}
                className="py-2 px-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs transition-colors"
              >
                مشاهده جزئیات
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info Notice */}
      <div className="px-4 py-2.5 bg-slate-950/90 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>مسافت‌ها و زمان‌های رسیدن تقریبی و بر اساس محاسبات جغرافیایی هستند.</span>
        </span>
        <span className="hidden sm:inline text-purple-300 font-medium">
          مجموع {displayedSalons.length} سالن فعال در {activeCity}
        </span>
      </div>
    </div>
  );
};
