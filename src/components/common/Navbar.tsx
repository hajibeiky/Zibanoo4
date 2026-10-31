import React, { useState } from 'react';
import { Logo } from './Logo';
import { ActiveView } from '../../types';
import { 
  Sparkles, 
  Home, 
  Scissors, 
  UserCheck, 
  MapPin, 
  ArrowLeftRight, 
  CalendarCheck, 
  Briefcase, 
  BookOpen, 
  Menu, 
  X,
  ShieldAlert
} from 'lucide-react';

interface NavbarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView, extra?: any) => void;
  compareCount: number;
  bookingsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  compareCount,
  bookingsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDossier = activeView === 'dossier';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-amber-900/10 shadow-xs">
      {/* Top Academic Dual-Mode Switcher Bar */}
      <div className="bg-[#2a0e44] text-white px-4 py-2 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-medium text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              پروژه فاز اول درس تجارت الکترونیکی — دانشگاه یزد
            </span>
            <span className="hidden md:inline text-purple-300/70">|</span>
            <span className="hidden md:inline text-purple-200">
              نسخه اولیه آزمایشی (MVP) و پرونده تحلیلی
            </span>
          </div>

          {/* Quick Dual Switcher Pills */}
          <div className="flex items-center gap-1.5 p-0.5 bg-purple-950/80 rounded-lg border border-purple-800/60">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                !isDossier
                  ? 'bg-amber-400 text-[#2a0e44] shadow-xs font-semibold'
                  : 'text-purple-200 hover:text-white'
              }`}
            >
              سامانه و رزرو آنلاین (MVP)
            </button>
            <button
              onClick={() => onNavigate('dossier')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                isDossier
                  ? 'bg-amber-400 text-[#2a0e44] shadow-xs font-semibold'
                  : 'text-purple-200 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              پرونده تحلیلی کسب‌وکار
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div 
            onClick={() => onNavigate('home')} 
            className="cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <Logo showSlogan size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-700">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeView === 'home' 
                  ? 'text-[#3b185f] font-bold bg-purple-50' 
                  : 'hover:text-[#3b185f] hover:bg-slate-50'
              }`}
            >
              صفحه اصلی
            </button>

            <button
              onClick={() => onNavigate('search', { gender: 'women' })}
              className="px-3 py-2 rounded-lg transition-colors hover:text-[#3b185f] hover:bg-slate-50"
            >
              آرایشگاه‌های زنانه
            </button>

            <button
              onClick={() => onNavigate('search', { gender: 'men' })}
              className="px-3 py-2 rounded-lg transition-colors hover:text-[#3b185f] hover:bg-slate-50"
            >
              آرایشگاه‌های مردانه
            </button>

            <button
              onClick={() => onNavigate('search', { homeServiceOnly: true })}
              className="px-3 py-2 rounded-lg transition-colors hover:text-[#3b185f] hover:bg-slate-50 text-amber-800 font-medium"
            >
              خدمات در محل
            </button>

            <button
              onClick={() => onNavigate('compare')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeView === 'compare'
                  ? 'text-[#3b185f] font-bold bg-purple-50'
                  : 'hover:text-[#3b185f] hover:bg-slate-50'
              }`}
            >
              <ArrowLeftRight className="w-4 h-4 text-amber-600" />
              <span>مقایسه</span>
              {compareCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-[11px] font-bold bg-amber-500 text-slate-900 rounded-full">
                  {compareCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('my-bookings')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeView === 'my-bookings'
                  ? 'text-[#3b185f] font-bold bg-purple-50'
                  : 'hover:text-[#3b185f] hover:bg-slate-50'
              }`}
            >
              <CalendarCheck className="w-4 h-4 text-purple-700" />
              <span>نوبت‌های من</span>
              {bookingsCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold bg-purple-100 text-purple-800 rounded-md">
                  {bookingsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('barber-panel')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeView === 'barber-panel'
                  ? 'text-[#3b185f] font-bold bg-purple-50'
                  : 'hover:text-[#3b185f] hover:bg-slate-50 text-slate-600'
              }`}
            >
              <Briefcase className="w-4 h-4 text-slate-500" />
              <span>پنل آرایشگر</span>
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => onNavigate('search')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#3b185f] hover:bg-[#2b1047] rounded-lg shadow-sm transition-all duration-150 flex items-center gap-1.5"
            >
              <Scissors className="w-3.5 h-3.5 text-amber-300" />
              جستجوی آرایشگاه
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onNavigate('compare')}
              className="p-2 text-slate-600 hover:text-[#3b185f] relative"
              aria-label="مقایسه"
            >
              <ArrowLeftRight className="w-5 h-5" />
              {compareCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold bg-amber-500 text-slate-900 rounded-full flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="منو"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg text-xs font-medium bg-purple-50 text-[#3b185f] text-center"
            >
              محیط اصلی (MVP)
            </button>
            <button
              onClick={() => {
                onNavigate('dossier');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg text-xs font-medium bg-amber-50 text-amber-900 text-center flex items-center justify-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              پرونده تحلیلی
            </button>
          </div>

          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="w-full text-right py-2 px-3 rounded-md text-sm font-medium hover:bg-slate-50 flex items-center gap-2"
          >
            <Home className="w-4 h-4 text-purple-800" />
            صفحه اصلی
          </button>

          <button
            onClick={() => {
              onNavigate('search', { gender: 'women' });
              setMobileMenuOpen(false);
            }}
            className="w-full text-right py-2 px-3 rounded-md text-sm font-medium hover:bg-slate-50 flex items-center gap-2"
          >
            <Scissors className="w-4 h-4 text-purple-600" />
            آرایشگاه‌های زنانه
          </button>

          <button
            onClick={() => {
              onNavigate('search', { gender: 'men' });
              setMobileMenuOpen(false);
            }}
            className="w-full text-right py-2 px-3 rounded-md text-sm font-medium hover:bg-slate-50 flex items-center gap-2"
          >
            <Scissors className="w-4 h-4 text-amber-700" />
            آرایشگاه‌های مردانه
          </button>

          <button
            onClick={() => {
              onNavigate('search', { homeServiceOnly: true });
              setMobileMenuOpen(false);
            }}
            className="w-full text-right py-2 px-3 rounded-md text-sm font-medium hover:bg-slate-50 flex items-center gap-2 text-amber-900"
          >
            <MapPin className="w-4 h-4 text-amber-600" />
            خدمات زیبایی در محل
          </button>

          <button
            onClick={() => {
              onNavigate('compare');
              setMobileMenuOpen(false);
            }}
            className="w-full text-right py-2 px-3 rounded-md text-sm font-medium hover:bg-slate-50 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-amber-600" />
              لیست مقایسه آرایشگاه‌ها
            </span>
            {compareCount > 0 && (
              <span className="text-xs bg-amber-500 text-slate-900 px-2 py-0.5 rounded-full font-bold">
                {compareCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              onNavigate('my-bookings');
              setMobileMenuOpen(false);
            }}
            className="w-full text-right py-2 px-3 rounded-md text-sm font-medium hover:bg-slate-50 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-purple-700" />
              نوبت‌ها و رهگیری رزرو
            </span>
            {bookingsCount > 0 && (
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-bold">
                {bookingsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              onNavigate('barber-panel');
              setMobileMenuOpen(false);
            }}
            className="w-full text-right py-2 px-3 rounded-md text-sm font-medium hover:bg-slate-50 flex items-center gap-2 text-slate-700"
          >
            <Briefcase className="w-4 h-4 text-slate-500" />
            پنل مدیریت آرایشگر (آزمایشی)
          </button>

          <div className="pt-2">
            <button
              onClick={() => {
                onNavigate('search');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-[#3b185f] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Scissors className="w-4 h-4 text-amber-300" />
              جستجوی سریع آرایشگاه
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
