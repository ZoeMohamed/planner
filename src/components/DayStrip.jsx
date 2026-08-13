import { DAY_SHORTS } from '../data/constants';
import { formatShortDate } from '../lib/helpers';

export default function DayStrip({ currentDay, onSelectDay, weekStart, isDayComplete }) {
  return (
    <nav className="day-strip" aria-label="Pilih hari">
      {DAY_SHORTS.map((short, i) => {
        const dayDate = new Date(weekStart);
        dayDate.setDate(dayDate.getDate() + i);
        const complete = isDayComplete(i);
        const active = i === currentDay;

        return (
          <button
            key={i}
            className={`day-chip${active ? ' day-chip--active' : ''}${complete ? ' day-chip--complete' : ''}`}
            onClick={() => onSelectDay(i)}
            aria-label={`${DAY_SHORTS[i]}, ${formatShortDate(dayDate)}`}
          >
            <span>{short}</span>
            <span className="day-chip__dot" />
            <span className="day-chip__date">{formatShortDate(dayDate)}</span>
          </button>
        );
      })}
    </nav>
  );
}
