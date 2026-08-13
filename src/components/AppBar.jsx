export default function AppBar({ title, onDrawerOpen }) {
  return (
    <header className="app-bar safe-top">
      <button className="app-bar__btn" onClick={onDrawerOpen} aria-label="Menu navigasi">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
      <h1 className="app-bar__title">{title}</h1>
      <button className="app-bar__btn" aria-label="Opsi lainnya">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="6" r="1.5"/>
          <circle cx="12" cy="12" r="1.5"/>
          <circle cx="12" cy="18" r="1.5"/>
        </svg>
      </button>
    </header>
  );
}
