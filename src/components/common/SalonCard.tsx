import React from 'react';
import { Salon } from '../../types';
import { 
  Star, 
  MapPin, 
  Home, 
  Check, 
  Plus, 
  ArrowLeftRight, 
  Calendar,
  Sparkles
} from 'lucide-react';

interface SalonCardProps {
  salon: Salon;
  onSelect: (salon: Salon) => void;
  onBook: (salon: Salon) => void;
  onToggleCompare: (salon: Salon) => void;
  isCompared: boolean;
}

export const SalonCard: React.FC<SalonCardProps> = ({
  salon,
  onSelect,
  onBook,
  onToggleCompare,
  isCompared
}) => {
  const genderLabel = salon.gender === 'women' ? 'بانوان' : salon.gender === 'men' ? 'آقایان' : 'بانوان و آقایان';

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      {/* Top Media */}
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onSelect(salon)}>
          <img
            src={salon.imageUrl}
            alt={salon.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Top Info Overlay */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white/95 text-[#2a0e44] backdrop-blur-xs shadow-xs">
              {genderLabel}
            </span>
            {salon.hasHomeService && (
              <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-amber-500 text-slate-900 shadow-xs flex items-center gap-1">
                <Home className="w-3 h-3" />
                خدمات در محل
              </span>
            )}
          </div>

          {/* Location & Rating on Bottom Edge */}
          <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-1 drop-shadow-sm font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>{salon.city}، {salon.district}</span>
            </div>
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold tabular-nums">{salon.rating}</span>
              <span className="text-white/70 text-[11px]">({salon.reviewsCount} نظر)</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          <div>
            <h3 
              onClick={() => onSelect(salon)}
              className="text-lg font-bold text-slate-900 hover:text-[#3b185f] cursor-pointer transition-colors line-clamp-1"
            >
              {salon.name}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
              {salon.description}
            </p>
          </div>

          {/* Clean Unboxed Metadata with Bullet Separators */}
          <div className="flex items-center flex-wrap gap-1.5 text-xs text-slate-600 pt-1 border-t border-slate-100">
            <span className="font-medium text-[#3b185f]">رده قیمتی: {salon.priceLevel}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="tabular-nums text-slate-700 font-medium">{salon.priceRangeText}</span>
          </div>

          {/* Featured Services Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {salon.featuredServices.slice(0, 3).map((srv, idx) => (
              <span 
                key={idx} 
                className="text-[11px] px-2 py-0.5 rounded-md bg-purple-50 text-purple-900 font-medium"
              >
                {srv}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="p-4 pt-2 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={() => onBook(salon)}
          className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-[#3b185f] hover:bg-[#2e1065] rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
        >
          <Calendar className="w-3.5 h-3.5 text-amber-300" />
          رزرو آزمایشی
        </button>

        <button
          onClick={() => onSelect(salon)}
          className="py-2 px-3 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
        >
          جزئیات
        </button>

        <button
          onClick={() => onToggleCompare(salon)}
          title={isCompared ? 'حذف از مقایسه' : 'افزودن به مقایسه'}
          className={`p-2 rounded-xl text-xs font-medium border transition-colors flex items-center justify-center ${
            isCompared 
              ? 'bg-amber-500 border-amber-600 text-slate-900 font-bold' 
              : 'border-slate-200 hover:border-purple-300 text-slate-600 hover:text-purple-900 bg-white'
          }`}
          aria-label={isCompared ? 'حذف از مقایسه' : 'افزودن به مقایسه'}
        >
          <ArrowLeftRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
};
