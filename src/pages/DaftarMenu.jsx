import { useState } from 'react';
import { SLOTS } from '../data/constants';
import { formatRupiah } from '../lib/helpers';
import DishForm from '../components/DishForm';
import { useToast } from '../hooks/useToast';

export default function DaftarMenu({ dishes, addDish, updateDish, deleteDish }) {
  const [filterSlot, setFilterSlot] = useState('semua');
  const [formOpen, setFormOpen] = useState(false);
  const [editDish, setEditDish] = useState(null);
  const { showToast } = useToast();

  let filtered = dishes;
  if (filterSlot !== 'semua') {
    filtered = dishes.filter(d => d.slot === filterSlot);
  }
  filtered = [...filtered].sort((a, b) => {
    if (a.slot !== b.slot) return SLOTS.indexOf(a.slot) - SLOTS.indexOf(b.slot);
    return a.name.localeCompare(b.name);
  });

  const handleSave = async (formData) => {
    if (editDish) {
      await updateDish(editDish.id, formData);
      showToast('Menu diperbarui');
    } else {
      await addDish(formData);
      showToast('Menu ditambahkan');
    }
    setFormOpen(false);
    setEditDish(null);
  };

  const openAdd = () => {
    setEditDish(null);
    setFormOpen(true);
  };

  const openEdit = (dish) => {
    setEditDish(dish);
    setFormOpen(true);
  };

  return (
    <div id="view-daftar">
      <div className="daftar-filters">
        <button
          className={`chip ${filterSlot === 'semua' ? 'chip--active' : ''}`}
          onClick={() => setFilterSlot('semua')}
        >Semua</button>
        {SLOTS.map(s => (
          <button
            key={s}
            className={`chip ${filterSlot === s ? 'chip--active' : ''}`}
            onClick={() => setFilterSlot(s)}
          >{s}</button>
        ))}
      </div>

      <div className="daftar-list">
        {filtered.length === 0 ? (
          <div style={{ padding: '48px 16px', textAlign: 'center', color: 'var(--abu)' }}>
            Belum ada menu di kategori ini.
          </div>
        ) : (
          filtered.map(dish => (
            <button
              key={dish.id}
              className="kartu-menu"
              style={{ opacity: dish.active ? 1 : 0.6 }}
              onClick={() => openEdit(dish)}
            >
              <div className="kartu-menu__content">
                <div className="kartu-menu__name">
                  {dish.name} {!dish.active && '(Nonaktif)'}
                </div>
                <div className="kartu-menu__meta">
                  <div className="kartu-menu__tags">
                    <span className="kartu-menu__tag">{dish.slot}</span>
                    <span className="kartu-menu__tag">{dish.protein_tag}</span>
                    <span className="kartu-menu__tag">{dish.method_tag}</span>
                  </div>
                </div>
              </div>
              <div className="kartu-menu__right">
                <span className="kartu-menu__cost num">{formatRupiah(dish.cost_per_portion)}</span>
                <div style={{ fontSize: '12px', color: 'var(--abu)', marginTop: '4px' }}>Edit ✎</div>
              </div>
            </button>
          ))
        )}
      </div>

      <button className="fab" onClick={openAdd} aria-label="Tambah Menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>

      <DishForm
        open={formOpen}
        dish={editDish}
        onSave={handleSave}
        onDelete={async (id) => {
          await deleteDish(id);
          showToast('Menu dihapus');
          setFormOpen(false);
          setEditDish(null);
        }}
        onClose={() => { setFormOpen(false); setEditDish(null); }}
      />
    </div>
  );
}
