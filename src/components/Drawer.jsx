import { useNavigate, useLocation } from 'react-router-dom';

export default function Drawer({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { label: 'Susun Menu', path: '/' },
    { label: 'Daftar Menu', path: '/daftar' },
  ];

  const handleNav = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div
      className={`drawer-overlay ${open ? 'drawer-overlay--open' : ''}`}
      aria-hidden={!open}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <nav className="drawer" aria-label="Navigasi Utama">
        <div className="drawer__header safe-top">
          <h2 className="drawer__title">Menu Minggu</h2>
        </div>
        <ul className="drawer__list">
          {items.map(item => (
            <li key={item.path}>
              <button
                className={`drawer__item ${location.pathname === item.path ? 'drawer__item--active' : ''}`}
                onClick={() => handleNav(item.path)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
