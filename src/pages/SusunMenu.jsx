import { useState, useEffect, useCallback, useRef } from 'react';
import DayStrip from '../components/DayStrip';
import KotakHari from '../components/KotakHari';
import DishPicker from '../components/DishPicker';
import SummaryStrip from '../components/SummaryStrip';
import { useToast } from '../hooks/useToast';
import { getNextMonday, toISODate } from '../lib/helpers';

export default function SusunMenu({ dishes, weekMenu, weekStart, loadingMenu, currentDay, setCurrentDay, handleAutoFill, handleClearAndRefill, handleShuffle, selectDish, analysis, isDayComplete, markWeekAsServed }) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { showToast } = useToast();
  const hasAutoFilled = useRef(false);

  // Auto-fill on first load when dishes are available
  useEffect(() => {
    if (dishes.length > 0 && !hasAutoFilled.current) {
      handleAutoFill();
      hasAutoFilled.current = true;
    }
  }, [dishes, handleAutoFill]);

  const handleCompartmentTap = (dayIndex, slot) => {
    setSelectedSlot({ day: dayIndex, slot });
    setPickerOpen(true);
  };

  const handleDishSelect = (dish) => {
    if (selectedSlot) {
      selectDish(selectedSlot.day, selectedSlot.slot, dish);
      setPickerOpen(false);
      setSelectedSlot(null);
    }
  };

  const handlePickerShuffle = () => {
    if (selectedSlot) {
      handleShuffle(selectedSlot.day, selectedSlot.slot);
      setPickerOpen(false);
      setSelectedSlot(null);
    }
  };

  const onAutoFill = () => {
    handleAutoFill();
    showToast('Menu minggu depan sudah disusun.');
  };

  const onRefill = () => {
    handleClearAndRefill();
    showToast('Menu diacak ulang.');
  };

  const onMarkDone = async () => {
    if (analysis.filledDays === 0) {
      showToast('Menu masih kosong!');
      return;
    }
    const isoDate = toISODate(weekStart);
    const success = await markWeekAsServed(isoDate, weekMenu);
    if (success) {
      showToast('Tanggal masak diperbarui!');
    } else {
      showToast('Gagal memperbarui tanggal masak.');
    }
  };

  // Swipe handling
  const touchStart = useRef({ x: 0, y: 0 });
  const swiping = useRef(false);

  const onTouchStart = (e) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    swiping.current = false;
  };

  const onTouchMove = (e) => {
    const dx = e.touches[0].clientX - touchStart.current.x;
    const dy = e.touches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) swiping.current = true;
  };

  const onTouchEnd = (e) => {
    if (!swiping.current || window.innerWidth >= 600) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    if (dx < -60 && currentDay < 5) setCurrentDay(currentDay + 1);
    else if (dx > 60 && currentDay > 0) setCurrentDay(currentDay - 1);
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;

  useEffect(() => {
    if (!isMobile) {
      const el = document.getElementById(`day-card-${currentDay}`);
      if (el) {
        // Find the scroll container (window) and scroll the element into view
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentDay, isMobile]);

  return (
    <div id="view-susun" style={{ position: 'relative' }}>
      {loadingMenu && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(255,255,255,0.7)', zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          Memuat menu minggu ini...
        </div>
      )}

      <DayStrip
        currentDay={currentDay}
        onSelectDay={setCurrentDay}
        weekStart={weekStart}
        isDayComplete={isDayComplete}
      />

      <main
        className="kotak-container"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="kotak-slider">
          {isMobile ? (
            <div className="kotak-slide">
              <KotakHari
                dayIndex={currentDay}
                dayMenu={weekMenu[currentDay] || {}}
                weekStart={weekStart}
                onCompartmentTap={handleCompartmentTap}
                onShuffle={handleShuffle}
                weekMenu={weekMenu}
              />
            </div>
          ) : (
            Array.from({ length: 6 }, (_, i) => (
              <div 
                className={`kotak-slide ${currentDay === i ? 'kotak-slide--active' : ''}`} 
                key={i} 
                id={`day-card-${i}`}
              >
                <KotakHari
                  dayIndex={i}
                  dayMenu={weekMenu[i] || {}}
                  weekStart={weekStart}
                  onCompartmentTap={handleCompartmentTap}
                  onShuffle={handleShuffle}
                  weekMenu={weekMenu}
                />
              </div>
            ))
          )}
        </div>
      </main>

      <div className="bottom-spacer" />

      <footer className="action-bar safe-bottom">
        <SummaryStrip analysis={analysis} />
        <div className="action-bar__buttons">
          <button className="tombol tombol--secondary" onClick={onRefill} aria-label="Acak Ulang" style={{ flex: '0 0 auto', padding: '0 16px' }}>
            <span className="tombol__icon">🔀</span>
          </button>
          <button className="tombol tombol--secondary" onClick={onAutoFill} style={{ flex: 1 }}>
            <span className="tombol__icon">✨</span> Isi Otomatis
          </button>
          <button className="tombol tombol--primary" onClick={onMarkDone} style={{ flex: 1 }}>
            <span className="tombol__icon">✓</span> Selesai
          </button>
        </div>
      </footer>

      <DishPicker
        open={pickerOpen}
        slot={selectedSlot?.slot || 'Lauk Utama'}
        dishes={dishes}
        currentDishId={selectedSlot ? weekMenu[selectedSlot.day]?.[selectedSlot.slot]?.id : null}
        onSelect={handleDishSelect}
        onShuffle={handlePickerShuffle}
        onClose={() => { setPickerOpen(false); setSelectedSlot(null); }}
      />
    </div>
  );
}
