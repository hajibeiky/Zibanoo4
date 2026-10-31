import React from 'react';

interface LogoProps {
  className?: string;
  showSlogan?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showSlogan = false,
  size = 'md',
  variant = 'dark'
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Bespoke ZIBANO Crest */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#3b185f] to-[#240c3d] p-1.5 shadow-sm border border-amber-500/20 shrink-0 ${iconSizes[size]}`}>
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full text-amber-400">
          {/* Scissors & Floral Elegance Symbol */}
          <circle cx="20" cy="20" r="18" stroke="#d4af37" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <path
            d="M13 27L27 13M13 13L27 27"
            stroke="#d4af37"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="13" cy="27" r="3.2" stroke="#f59e0b" strokeWidth="1.8" fill="#3b185f" />
          <circle cx="27" cy="27" r="3.2" stroke="#f59e0b" strokeWidth="1.8" fill="#3b185f" />
          <path
            d="M20 7L22 11H18L20 7Z"
            fill="#d4af37"
          />
          <circle cx="20" cy="20" r="2.2" fill="#fff" />
        </svg>
      </div>

      <div className="flex flex-col leading-tight">
        <div className="flex items-baseline gap-1.5">
          <span className={`font-extrabold tracking-tight ${titleSizes[size]} ${isLight ? 'text-white' : 'text-[#2a0e44]'}`}>
            زیبانـو
          </span>
          <span className={`text-[10px] font-semibold tracking-wider uppercase ${isLight ? 'text-amber-300' : 'text-amber-700'}`}>
            ZIBANO
          </span>
        </div>
        {showSlogan && (
          <span className={`text-[11px] ${isLight ? 'text-purple-200' : 'text-slate-500'}`}>
            انتخاب آگاهانه، رزرو آسان
          </span>
        )}
      </div>
    </div>
  );
};
