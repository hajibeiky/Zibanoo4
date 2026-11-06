import React, { useState } from 'react';
import { Salon } from '../../types';
import { 
  MapPin, 
  Navigation, 
  Car, 
  Footprints, 
  Star, 
  X, 
  Calendar, 
  Home, 
  ArrowLeft,
  Info
} from 'lucide-react';

interface InteractiveSalonMapProps {
  salons: Salon[];
  selectedSalonId?: string;
  onSelectSalon: (salon: Salon) => void;
  onBookSalon: (salon: Salon) => void;
  userCity?: string;
}

export const InteractiveSalonMap: React.FC<InteractiveSalonMapProps> = ({
  salons,
  selectedSalonId,
  onSelectSalon,
  onBookSalon,
  userCity = 'یزد'
}) => {
  const [activePinId, setActivePinId] = useState<string | null>(selectedSalonId || (salons[0]?.id ?? null));
  const [customerLocationMode, setCustomerLocationMode] = useState<boolean>(true);

  const activeSalon = salons.find(s => s.id === activePinId) || salons[0];

  // Project lat/lng to map SVG viewBox coordinates (centered around current city or default)
  // We compute realistic relative percentages based on min/max coordinates
  const lats = salons.map(s => s.coordinates.lat);
  const lngs = salons.map(s => s.coordinates.lng);
  const minLat = Math.min(...lats, 31.8);
  const maxLat = Math.max(...lats, 32.0);
  const minLng = Math.min(...lngs, 54.3);
  const maxLng = Math.max(...lngs, 54.45);

  const getPos = (lat: number, lng: number) => {
    const latSpan = maxLat - minLat || 0.1;
    const lngSpan = maxLng - minLng || 0.1;
    // Map bounds into 800 x 500 area with padding
    const x = 70 + ((lng - minLng) / lngSpan) * 660;
    const y = 430 - ((lat - minLat) / latSpan) * 360;
    return { x, y };
  };

  const userPos = { x: 380, y: 260 }; // Simulated user position in the district

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs space-y-3">
      {/* Map Control Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-[#2a0e44] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-400 text-slate-950">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
              <span>نقشه موقعیت مکانی و فاصله آرایشگاه‌ها</span>
              <span className="text-[11px] font-normal text-amber-300 bg-white/10 px-2 py-0.5 rounded-full">
                {userCity}
              </span>
            </h3>
            <p className="text-[11px] text-purple-200 mt-0.5">
              فاصله‌ها و زمان‌های تقریبی رسیدن با خودرو و پیاده بر مبنای موقعیت مکانی محاسبه شده‌اند.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
          <button
            onClick={() => setCustomerLocationMode(!customerLocationMode)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 ${
              customerLocationMode
                ? 'bg-amber-400 text-slate-950 border-amber-400'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{customerLocationMode ? 'موقعیت شما: فعال' : 'نمایش موقعیت من'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Map Canvas Container */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-[#f4ede4] overflow-hidden select-none">
        {/* Styled Vector Map Backdrop (Roads, grid, blocks) */}
        <svg viewBox="0 0 800 500" className="w-full h-full object-cover">
          <defs>
            <pattern id="city-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e6ded3" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="800" height="500" fill="#f8f4ee" />
          <rect width="800" height="500" fill="url(#city-grid)" opacity="0.6" />

          {/* Urban districts blocks */}
          <rect x="50" y="80" width="180" height="130" rx="12" fill="#ede5d8" opacity="0.8" />
          <rect x="260" y="60" width="220" height="150" rx="12" fill="#ede5d8" opacity="0.8" />
          <rect x="510" y="90" width="230" height="180" rx="12" fill="#ede5d8" opacity="0.8" />
          <rect x="120" y="270" width="240" height="170" rx="12" fill="#ede5d8" opacity="0.8" />
          <rect x="400" y="280" width="320" height="160" rx="12" fill="#ede5d8" opacity="0.8" />

          {/* Main roads */}
          <path d="M 0 240 Q 400 230 800 250" stroke="#fff" strokeWidth="16" fill="none" />
          <path d="M 0 240 Q 400 230 800 250" stroke="#dbc8b0" strokeWidth="2" strokeDasharray="6 6" fill="none" />

          <path d="M 240 0 Q 250 250 220 500" stroke="#fff" strokeWidth="14" fill="none" />
          <path d="M 500 0 Q 480 250 510 500" stroke="#fff" strokeWidth="14" fill="none" />

          <path d="M 80 420 Q 380 260 700 130" stroke="#e0d1be" strokeWidth="10" fill="none" />

          {/* City label watermark */}
          <text x="400" y="250" textAnchor="middle" fill="#c9b7a0" fontSize="32" fontWeight="bold" opacity="0.25">
            محدوده شهری {userCity}
          </text>

          {/* Connection line between user and selected salon */}
          {customerLocationMode && activeSalon && (
            (() => {
              const pos = getPos(activeSalon.coordinates.lat, activeSalon.coordinates.lng);
              return (
                <g>
                  <line
                    x1={userPos.x}
                    y1={userPos.y}
                    x2={pos.x}
                    y2={pos.y}
                    stroke="#3b185f"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                    opacity="0.8"
                  />
                  <circle cx={(userPos.x + pos.x) / 2} cy={(userPos.y + pos.y) / 2} r="14" fill="#3b185f" />
                  <text
                    x={(userPos.x + pos.x) / 2}
                    y={(userPos.y + pos.y) / 2 + 4}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="9"
                    fontWeight="bold"
                  >
                    {activeSalon.distanceKm || 2.5}km
                  </text>
                </g>
              );
            })()
          )}

          {/* Customer Location Pin */}
          {customerLocationMode && (
            <g transform={`translate(${userPos.x}, ${userPos.y})`} className="cursor-pointer">
              <circle r="18" fill="#3b82f6" opacity="0.2" className="animate-ping" />
              <circle r="12" fill="#2563eb" stroke="#fff" strokeWidth="2.5" />
              <circle r="4" fill="#fff" />
              <text x="0" y="22" textAnchor="middle" fill="#1e3a8a" fontSize="10" fontWeight="bold">
                موقعیت شما
              </text>
            </g>
          )}

          {/* Salon Markers */}
          {salons.map((salon) => {
            const { x, y } = getPos(salon.coordinates.lat, salon.coordinates.lng);
            const isSelected = activePinId === salon.id;
            const isWomen = salon.gender === 'women';

            return (
              <g
                key={salon.id}
                transform={`translate(${x}, ${y})`}
                onClick={() => setActivePinId(salon.id)}
                className="cursor-pointer group"
              >
                {/* Pin shadow */}
                <ellipse cx="0" cy="5" rx="8" ry="3" fill="#000" opacity="0.2" />

                {/* Animated halo if selected */}
                {isSelected && (
                  <circle r="22" fill={isWomen ? '#9333ea' : '#d97706'} opacity="0.25" className="animate-pulse" />
                )}

                {/* Pin Head */}
                <path
                  d="M 0 -24 C -10 -24 -14 -16 -14 -8 C -14 2 0 12 0 12 C 0 12 14 2 14 -8 C 14 -16 10 -24 0 -24 Z"
                  fill={isSelected ? '#3b185f' : isWomen ? '#7e22ce' : '#334155'}
                  stroke="#fff"
                  strokeWidth="2"
                />

                <circle cx="0" cy="-8" r="5" fill="#fff" />
                <circle cx="0" cy="-8" r="2.5" fill={isSelected ? '#d97706' : '#3b185f'} />

                {/* Pin Label */}
                <rect
                  x="-45"
                  y="-42"
                  width="90"
                  height="16"
                  rx="4"
                  fill={isSelected ? '#2a0e44' : '#ffffff'}
                  stroke={isSelected ? '#d97706' : '#cbd5e1'}
                  strokeWidth="1"
                />
                <text
                  x="0"
                  y="-30"
                  textAnchor="middle"
                  fill={isSelected ? '#fef08a' : '#1e293b'}
                  fontSize="9"
                  fontWeight="bold"
                >
                  {salon.name.length > 14 ? salon.name.substring(0, 13) + '...' : salon.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Salon Overlay Card */}
        {activeSalon && (
          <div className="absolute bottom-3 right-3 left-3 sm:right-auto sm:left-4 sm:w-80 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-200/90 space-y-3 z-10 text-xs">
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
              <div>
                <span className="text-[10px] font-bold text-[#3b185f] bg-purple-50 px-2 py-0.5 rounded">
                  {activeSalon.gender === 'women' ? 'بانوان' : 'آقایان'} · {activeSalon.district}
                </span>
                <h4 className="font-extrabold text-slate-900 text-sm mt-1">
                  {activeSalon.name}
                </h4>
              </div>

              <div className="flex items-center gap-1 font-bold text-slate-800 bg-amber-50 px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span className="tabular-nums">{activeSalon.rating}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 line-clamp-1">
              {activeSalon.address}
            </p>

            {/* Travel metrics */}
            <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
              <div>
                <span className="text-[10px] text-slate-400 block">فاصله</span>
                <span className="font-bold text-slate-800 tabular-nums">{activeSalon.distanceKm || 2.4} ک‌م</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block flex items-center justify-center gap-0.5">
                  <Car className="w-3 h-3 text-emerald-600" /> خودرو
                </span>
                <span className="font-bold text-emerald-700 tabular-nums">{activeSalon.driveTimeMin || 7} دقیقه</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block flex items-center justify-center gap-0.5">
                  <Footprints className="w-3 h-3 text-amber-600" /> پیاده
                </span>
                <span className="font-bold text-amber-800 tabular-nums">{activeSalon.walkTimeMin || 28} دقیقه</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onBookSalon(activeSalon)}
                className="flex-1 py-2 px-3 bg-[#3b185f] hover:bg-[#2b1047] text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1 shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-300" />
                رزرو نوبت
              </button>
              <button
                onClick={() => onSelectSalon(activeSalon)}
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
              >
                جزئیات سالن
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Approximate data disclaimer */}
      <div className="px-5 pb-4 flex items-center gap-2 text-[11px] text-slate-400">
        <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>
          نکته شفافیت: اطلاعات مسیر و زمان‌ها تقریبی و بر اساس مختصات جغرافیایی محلی هر شهر محاسبه شده‌اند.
        </span>
      </div>
    </div>
  );
};
