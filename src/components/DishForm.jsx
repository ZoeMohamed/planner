import { useState, useEffect } from 'react';
import { SLOTS, PROTEIN_TAGS, METHOD_TAGS } from '../data/constants';

export default function DishForm({ open, dish, onSave, onClose }) {
  const [form, setForm] = useState({
    name: '', slot: SLOTS[0], protein_tag: PROTEIN_TAGS[0],
    method_tag: METHOD_TAGS[0], cost_per_portion: '', active: true,
  });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      if (dish) {
        setForm({
          name: dish.name, slot: dish.slot, protein_tag: dish.protein_tag,
          method_tag: dish.method_tag, cost_per_portion: dish.cost_per_portion,
          active: dish.active,
        });
      } else {
        setForm({
          name: '', slot: SLOTS[0], protein_tag: PROTEIN_TAGS[0],
          method_tag: METHOD_TAGS[0], cost_per_portion: '', active: true,
        });
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open, dish]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      cost_per_portion: parseInt(form.cost_per_portion, 10) || 0,
      spice_level: 0,
      ingredients: dish?.ingredients || [],
    });
  };

  const allMethods = [...METHOD_TAGS, 'segar'];

  return (
    <div
      className={`sheet-overlay ${open ? 'sheet-overlay--open' : ''}`}
      aria-hidden={!open}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bottom-sheet bottom-sheet--full" role="dialog" aria-modal="true" aria-label="Form Menu">
        <div className="bottom-sheet__handle">
          <div className="bottom-sheet__handle-bar" />
        </div>
        <div className="bottom-sheet__header">
          <h2 className="bottom-sheet__title">{dish ? 'Edit Menu' : 'Tambah Menu'}</h2>
          <button className="bottom-sheet__close" onClick={onClose} aria-label="Tutup">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form className="form-menu" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="form-name">Nama Menu</label>
            <input
              type="text" id="form-name" className="form-input" required
              autoComplete="off" value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label>Kategori (Slot)</label>
            <div className="chip-group">
              {SLOTS.map(s => (
                <label key={s} className={`chip ${form.slot === s ? 'chip--active' : ''}`}>
                  <input type="radio" name="slot" value={s} className="sr-only"
                    checked={form.slot === s}
                    onChange={() => setForm(f => ({ ...f, slot: s }))}
                  />
                  {s}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Bahan Utama (Protein)</label>
            <div className="chip-group">
              {PROTEIN_TAGS.map(p => (
                <label key={p} className={`chip ${form.protein_tag === p ? 'chip--active' : ''}`}>
                  <input type="radio" name="protein" value={p} className="sr-only"
                    checked={form.protein_tag === p}
                    onChange={() => setForm(f => ({ ...f, protein_tag: p }))}
                  />
                  {p}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Cara Masak</label>
            <div className="chip-group">
              {allMethods.map(m => (
                <label key={m} className={`chip ${form.method_tag === m ? 'chip--active' : ''}`}>
                  <input type="radio" name="method" value={m} className="sr-only"
                    checked={form.method_tag === m}
                    onChange={() => setForm(f => ({ ...f, method_tag: m }))}
                  />
                  {m}
                </label>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="form-cost">Harga/Porsi (Rp)</label>
              <input
                type="number" id="form-cost" className="form-input num"
                min="0" step="100" required value={form.cost_per_portion}
                onChange={e => setForm(f => ({ ...f, cost_per_portion: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="form-active">Status Aktif</label>
              <label className="toggle">
                <input
                  type="checkbox" id="form-active"
                  checked={form.active}
                  onChange={e => setForm(f => ({ ...f, active: e.target.checked }))}
                />
                <span className="toggle__slider" />
              </label>
            </div>
          </div>

          <div className="bottom-sheet__footer safe-bottom">
            <button type="submit" className="tombol tombol--primary tombol--full">
              <span className="tombol__icon">💾</span> Simpan Menu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
