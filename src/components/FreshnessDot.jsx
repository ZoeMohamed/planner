import { daysSinceServed, freshnessLevel, freshnessLabel } from '../lib/helpers';

export default function FreshnessDot({ lastServedDate }) {
  const days = daysSinceServed(lastServedDate);
  const level = freshnessLevel(days);
  const label = freshnessLabel(days);

  return (
    <span className={`freshness-dot freshness-dot--${level}`}>
      <span className="freshness-dot__circle" />
      <span className="freshness-dot__text">{label}</span>
    </span>
  );
}
