import { formatRupiah } from '../lib/helpers';

export default function SummaryStrip({ analysis }) {
  return (
    <div className="strip-ringkasan" role="status" aria-live="polite">
      <span className="strip-ringkasan__item">
        <strong className="num">{formatRupiah(analysis.avgCost)}</strong>/porsi
      </span>
      <span className="strip-ringkasan__separator">·</span>
      <span className="strip-ringkasan__item">{analysis.filledDays} hari siap</span>
      {analysis.warnings.map((warning, i) => (
        <span key={i}>
          <span className="strip-ringkasan__separator">·</span>
          <span className="strip-ringkasan__item strip-ringkasan__warning">⚠ {warning}</span>
        </span>
      ))}
    </div>
  );
}
