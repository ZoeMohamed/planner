import { useLocation } from 'react-router-dom';

export default function AppBar({ title, onDrawerOpen, onPrevWeek, onNextWeek }) {
  const location = useLocation();
  const showNav = location.pathname === '/' && onPrevWeek && onNextWeek;

  return (
    <header className="app-bar safe-top">
      <button className="app-bar__btn" onClick={onDrawerOpen} aria-label="Menu navigasi">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
      
      <div className="app-bar__title-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {showNav && (
          <button className="app-bar__nav-btn" onClick={onPrevWeek} aria-label="Minggu sebelumnya" style={{ padding: '4px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
        )}
        <h1 className="app-bar__title" style={{ margin: 0 }}>{title}</h1>
        {showNav && (
          <button className="app-bar__nav-btn" onClick={onNextWeek} aria-label="Minggu selanjutnya" style={{ padding: '4px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        )}
      </div>
      
      <div style={{ width: 48 }}></div>
    </header>
  );
}
