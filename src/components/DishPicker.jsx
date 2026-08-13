import { useState, useEffect, useRef } from 'react';
import { PROTEIN_TAGS } from '../data/constants';
import { daysSinceServed, formatRupiah } from '../lib/helpers';
import FreshnessDot from './FreshnessDot';

export default function DishPicker({ open, slot, dishes, currentDishId, onSelect, onShuffle, onClose }) {
  const [filter, setFilter] = useState('semua');
  const listRef = useRef(null);

  useEffect(() => {
    if (open) {
      setFilter('semua');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape' && open) onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  let filtered = dishes.filter(d => d.slot === slot && d.active);
  if (filter !== 'semua') {
    filtered = filtered.filter(d => d.protein_tag === filter);
  }
  filtered.sort((a, b) => daysSinceServed(b.last_served_date) - daysSinceServed(a.last_served_date));

  const showProteinFilters = slot === 'Lauk Utama';

  return (
    <div
      className={`sheet-overlay ${open ? 'sheet-overlay--open' : ''}`}
      aria-hidden={!open}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bottom-sheet" role="dialog" aria-modal="true" aria-label="Pilih menu">
        <div className="bottom-sheet__handle">
          <div className="bottom-sheet__handle-bar" />
        </div>
        <div className="bottom-sheet__header">
          <h2 className="bottom-sheet__title">Pilih {slot}</h2>
          <button className="bottom-sheet__close" onClick={onClose} aria-label="Tutup">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="bottom-sheet__filters">
          <button
            className={`chip ${filter === 'semua' ? 'chip--active' : ''}`}
            onClick={() => setFilter('semua')}
          >Semua</button>
          {showProteinFilters && PROTEIN_TAGS.map(tag => (
            <button
              key={tag}
              className={`chip ${filter === tag ? 'chip--active' : ''}`}
              onClick={() => setFilter(tag)}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </button>
          ))}
        </div>

        <div className="bottom-sheet__list" ref={listRef}>
          {filtered.length === 0 ? (
            <div style={{ padding: 'var(--s-7) var(--s-4)', textAlign: 'center', color: 'var(--abu)' }}>
              Tidak ada menu tersedia untuk filter ini.
            </div>
          ) : (
            filtered.map(dish => (
              <button
                key={dish.id}
                className={`kartu-menu ${currentDishId === dish.id ? 'kartu-menu--selected' : ''}`}
                onClick={() => onSelect(dish)}
              >
                <div className="kartu-menu__content">
                  <div className="kartu-menu__name">{dish.name}</div>
                  <div className="kartu-menu__meta">
                    <FreshnessDot lastServedDate={dish.last_served_date} />
                    <div className="kartu-menu__tags">
                      <span className="kartu-menu__tag">{dish.protein_tag}</span>
                      <span className="kartu-menu__tag">{dish.method_tag}</span>
                    </div>
                  </div>
                </div>
                <div className="kartu-menu__right">
                  <span className="kartu-menu__cost num">{formatRupiah(dish.cost_per_portion)}</span>
                </div>
              </button>
            ))
          )}
        </div>

        <div className="bottom-sheet__footer">
          <button className="tombol tombol--secondary tombol--full" onClick={onShuffle}>
            <span className="tombol__icon">🎲</span> Acak
          </button>
        </div>
      </div>
    </div>
  );
}
