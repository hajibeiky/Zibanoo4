import React, { useState, useEffect } from 'react';
import { 
  Salon, 
  BookingRequest, 
  ActiveView, 
  ServiceItem,
  UserAccount,
  PortfolioItem
} from './types';
import { INITIAL_SALONS, INITIAL_BOOKINGS } from './data/mockData';
import { Navbar } from './components/common/Navbar';
import { HomeView } from './components/home/HomeView';
import { SearchView } from './components/search/SearchView';
import { SalonDetailView } from './components/salon/SalonDetailView';
import { CompareView } from './components/compare/CompareView';
import { MyBookingsView } from './components/booking/MyBookingsView';
import { BarberPanelView } from './components/barber/BarberPanelView';
import { BusinessDossierView } from './components/dossier/BusinessDossierView';
import { BookingModal } from './components/booking/BookingModal';
import { GenderScopedSalonsView } from './components/salons/GenderScopedSalonsView';
import { AuthModal } from './components/auth/AuthModal';
import { BeautySimulatorModal } from './components/simulator/BeautySimulatorModal';

const LOCAL_STORAGE_SALONS_KEY = 'zibano_salons_v1';
const LOCAL_STORAGE_BOOKINGS_KEY = 'zibano_bookings_v1';
const LOCAL_STORAGE_COMPARE_KEY = 'zibano_compare_v1';
const LOCAL_STORAGE_ACCOUNT_KEY = 'zibano_account_v1';

export default function App() {
  // Salons state with LocalStorage persistence
  const [salons, setSalons] = useState<Salon[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_SALONS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('LocalStorage error reading salons:', e);
    }
    return INITIAL_SALONS;
  });

  // Bookings state with LocalStorage persistence
  const [bookings, setBookings] = useState<BookingRequest[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_BOOKINGS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('LocalStorage error reading bookings:', e);
    }
    return INITIAL_BOOKINGS;
  });

  // Compared salons IDs with LocalStorage persistence
  const [comparedSalonIds, setComparedSalonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_COMPARE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('LocalStorage error reading compare list:', e);
    }
    return [];
  });

  // User account state with LocalStorage persistence
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ACCOUNT_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('LocalStorage error reading account:', e);
    }
    return null;
  });

  // Active view navigation
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);

  // Search initial filters when jumping from hero
  const [searchFilters, setSearchFilters] = useState<{
    city?: string;
    gender?: 'all' | 'women' | 'men';
    category?: string;
    homeServiceOnly?: boolean;
  }>({});

  // Booking Modal State
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    salon: Salon | null;
    preselectedService?: ServiceItem;
  }>({
    isOpen: false,
    salon: null
  });

  // Auth Modal State
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Beauty Simulator Modal State
  const [simulatorModal, setSimulatorModal] = useState<{
    isOpen: boolean;
    preselectedStyle?: PortfolioItem;
  }>({
    isOpen: false
  });

  // Save to LocalStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_SALONS_KEY, JSON.stringify(salons));
    } catch (e) {
      console.warn('LocalStorage save salons error:', e);
    }
  }, [salons]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_BOOKINGS_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.warn('LocalStorage save bookings error:', e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_COMPARE_KEY, JSON.stringify(comparedSalonIds));
    } catch (e) {
      console.warn('LocalStorage save compare error:', e);
    }
  }, [comparedSalonIds]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(LOCAL_STORAGE_ACCOUNT_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_ACCOUNT_KEY);
      }
    } catch (e) {
      console.warn('LocalStorage save account error:', e);
    }
  }, [currentUser]);

  // Navigation router
  const handleNavigate = (view: ActiveView, extra?: any) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (view === 'simulator') {
      setSimulatorModal({ isOpen: true });
      return;
    }
    if (view === 'search' && extra) {
      setSearchFilters(extra);
    }
    setActiveView(view);
  };

  // Toggle Salon in compare list (max 3)
  const handleToggleCompare = (salon: Salon) => {
    setComparedSalonIds((prev) => {
      if (prev.includes(salon.id)) {
        return prev.filter(id => id !== salon.id);
      }
      if (prev.length >= 3) {
        alert('حداکثر ۳ آرایشگاه را می‌توانید به طور همزمان مقایسه کنید. لطفاً یکی از موارد قبلی را حذف کنید.');
        return prev;
      }
      return [...prev, salon.id];
    });
  };

  const handleRemoveComparedSalon = (salonId: string) => {
    setComparedSalonIds(prev => prev.filter(id => id !== salonId));
  };

  const handleClearCompareAll = () => {
    setComparedSalonIds([]);
  };

  // Open booking modal
  const handleOpenBooking = (salon: Salon, preselectedService?: ServiceItem) => {
    setBookingModal({
      isOpen: true,
      salon,
      preselectedService
    });
  };

  // Save new booking from modal
  const handleSaveBooking = (newBooking: BookingRequest) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  // Cancel booking by user
  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
  };

  // Barber panel updates
  const handleUpdateSalon = (updated: Salon) => {
    setSalons(prev => prev.map(s => s.id === updated.id ? updated : s));
    if (selectedSalon?.id === updated.id) {
      setSelectedSalon(updated);
    }
  };

  const handleUpdateBookingStatus = (bookingId: string, status: BookingRequest['status']) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
  };

  // Add new registered salon by barber
  const handleRegisterSalon = (newSalon: Salon) => {
    setSalons(prev => [newSalon, ...prev]);
    setSelectedSalon(newSalon);
  };

  // View salon details
  const handleSelectSalon = (salon: Salon) => {
    setSelectedSalon(salon);
    setActiveView('salon-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open simulator with optional style
  const handleOpenSimulator = (item?: PortfolioItem) => {
    setSimulatorModal({
      isOpen: true,
      preselectedStyle: item
    });
  };

  const comparedSalons = salons.filter(s => comparedSalonIds.includes(s.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-800">
      {/* Universal Navbar */}
      <Navbar
        activeView={activeView}
        onNavigate={handleNavigate}
        compareCount={comparedSalonIds.length}
        bookingsCount={bookings.length}
        currentUser={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={() => setCurrentUser(null)}
        onOpenSimulator={() => setSimulatorModal({ isOpen: true })}
      />

      {/* Main Content View Switcher */}
      <div className="flex-1">
        {activeView === 'home' && (
          <HomeView
            salons={salons}
            onSelectSalon={handleSelectSalon}
            onBookSalon={handleOpenBooking}
            onToggleCompare={handleToggleCompare}
            comparedSalonIds={comparedSalonIds}
            onNavigate={handleNavigate}
          />
        )}

        {activeView === 'women-salons' && (
          <GenderScopedSalonsView
            gender="women"
            salons={salons}
            onSelectSalon={handleSelectSalon}
            onBookSalon={handleOpenBooking}
            onToggleCompare={handleToggleCompare}
            comparedSalonIds={comparedSalonIds}
          />
        )}

        {activeView === 'men-salons' && (
          <GenderScopedSalonsView
            gender="men"
            salons={salons}
            onSelectSalon={handleSelectSalon}
            onBookSalon={handleOpenBooking}
            onToggleCompare={handleToggleCompare}
            comparedSalonIds={comparedSalonIds}
          />
        )}

        {activeView === 'search' && (
          <SearchView
            salons={salons}
            initialFilters={searchFilters}
            onSelectSalon={handleSelectSalon}
            onBookSalon={handleOpenBooking}
            onToggleCompare={handleToggleCompare}
            comparedSalonIds={comparedSalonIds}
          />
        )}

        {activeView === 'salon-detail' && selectedSalon && (
          <SalonDetailView
            salon={selectedSalon}
            onBack={() => setActiveView('search')}
            onBook={handleOpenBooking}
            onToggleCompare={handleToggleCompare}
            isCompared={comparedSalonIds.includes(selectedSalon.id)}
            onOpenSimulator={handleOpenSimulator}
          />
        )}

        {activeView === 'compare' && (
          <CompareView
            comparedSalons={comparedSalons}
            onRemoveSalon={handleRemoveComparedSalon}
            onClearAll={handleClearCompareAll}
            onBook={handleOpenBooking}
            onGoToSearch={() => setActiveView('search')}
            onViewSalon={handleSelectSalon}
          />
        )}

        {activeView === 'my-bookings' && (
          <MyBookingsView
            bookings={bookings}
            onCancelBooking={handleCancelBooking}
            onBookNew={() => setActiveView('search')}
          />
        )}

        {activeView === 'barber-panel' && (
          <BarberPanelView
            salons={salons}
            bookings={bookings}
            onUpdateSalon={handleUpdateSalon}
            onUpdateBookingStatus={handleUpdateBookingStatus}
          />
        )}

        {activeView === 'dossier' && (
          <BusinessDossierView
            onGoToMVP={() => setActiveView('home')}
          />
        )}
      </div>

      {/* Booking Modal */}
      {bookingModal.isOpen && bookingModal.salon && (
        <BookingModal
          salon={bookingModal.salon}
          preselectedService={bookingModal.preselectedService}
          existingBookings={bookings}
          isOpen={bookingModal.isOpen}
          onClose={() => setBookingModal({ isOpen: false, salon: null })}
          onSaveBooking={handleSaveBooking}
          onViewMyBookings={() => {
            setBookingModal({ isOpen: false, salon: null });
            setActiveView('my-bookings');
          }}
        />
      )}

      {/* Auth Modal (Customer vs Barber) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccessLogin={(account: UserAccount, newSalon?: Salon) => {
          setCurrentUser(account);
          if (newSalon) {
            handleRegisterSalon(newSalon);
          }
          if (account.role === 'barber') {
            setActiveView('barber-panel');
          }
        }}
      />

      {/* Beauty Simulator Modal */}
      <BeautySimulatorModal
        isOpen={simulatorModal.isOpen}
        onClose={() => setSimulatorModal({ isOpen: false })}
        salons={salons}
        initialPortfolioItem={simulatorModal.preselectedStyle}
        onBookService={(salon: Salon, service?: ServiceItem) => {
          setSimulatorModal({ isOpen: false });
          handleOpenBooking(salon, service);
        }}
      />
    </div>
  );
}
