import { SLOTS, DAY_NAMES } from '../data/constants';
import { formatRupiah, formatShortDate, daysSinceServed, freshnessLevel, freshnessLabel } from '../lib/helpers';
import { analyzeMenu } from '../lib/autofill';
import FreshnessDot from './FreshnessDot';

export default function KotakHari({ dayIndex, dayMenu, weekStart, onCompartmentTap, onShuffle, weekMenu }) {
  const dayDate = new Date(weekStart);
  dayDate.setDate(dayDate.getDate() + dayIndex);

  let dayCost = 0;
  for (const slot of SLOTS) {
    if (dayMenu[slot]) dayCost += dayMenu[slot].cost_per_portion;
  }

  // Check protein warnings
  const analysis = analyzeMenu(weekMenu);
  const warningProteins = new Set();
  for (const [protein, count] of Object.entries(analysis.proteinCounts)) {
    if (count >= 3) warningProteins.add(protein);
  }

  const slotClassMap = {
    'Lauk Utama': 'lauk-utama',
    'Sayur': 'sayur',
    'Pelengkap': 'pelengkap',
    'Buah/Dessert': 'buah',
  };

  return (
    <div className="kotak-hari">
      <div className="kotak-hari__header">
        <span className="kotak-hari__day">
          {DAY_NAMES[dayIndex]}
          <span className="kotak-hari__day-date">{formatShortDate(dayDate)}</span>
        </span>
        <span className="kotak-hari__cost num">{dayCost > 0 ? formatRupiah(dayCost) : '—'}</span>
      </div>
      <div className="kotak-hari__grid">
        {SLOTS.map(slot => {
          const dish = dayMenu[slot];
          const slotClass = slotClassMap[slot];
          const hasWarning = slot === 'Lauk Utama' && dish && warningProteins.has(dish.protein_tag);

          if (!dish) {
            return (
              <button
                key={slot}
                className={`kompartemen kompartemen--${slotClass} kompartemen--empty`}
                onClick={() => onCompartmentTap(dayIndex, slot)}
                aria-label={`${slot} ${DAY_NAMES[dayIndex]}, kosong. Ketuk untuk isi.`}
              >
                <span className="kompartemen__label">{slot}</span>
                <span className="kompartemen__empty-text">Ketuk untuk isi</span>
              </button>
            );
          }

          return (
            <button
              key={slot}
              className={`kompartemen kompartemen--${slotClass}${hasWarning ? ' kompartemen--warning' : ''}`}
              onClick={() => onCompartmentTap(dayIndex, slot)}
              aria-label={`${slot} ${DAY_NAMES[dayIndex]}, ${dish.name}. Ketuk untuk ganti.`}
            >
              <span className="kompartemen__label">{slot}</span>
              <span className="kompartemen__dish">{dish.name}</span>
              <div className="kompartemen__info">
                <FreshnessDot lastServedDate={dish.last_served_date} />
              </div>
              <span className="kompartemen__cost">{formatRupiah(dish.cost_per_portion)}</span>
              <span
                className="kompartemen__shuffle"
                onClick={(e) => { e.stopPropagation(); onShuffle(dayIndex, slot); }}
                role="button"
                aria-label={`Acak ${slot}`}
              >
                🔀
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
