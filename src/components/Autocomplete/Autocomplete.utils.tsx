import type { ReactNode } from 'react';

export const normalize = (s: unknown) =>
  String(s ?? '')
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
export const highlightParts = (label: string, query: string) => {
  const q = (query ?? '').trim();
  if (!q)
    return (
      <span className="option-label" style={{ whiteSpace: 'pre' }}>
        {label}
      </span>
    );

  const re = new RegExp(escapeRegExp(q), 'ig');
  const nodes: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(label))) {
    const start = m.index;
    const end = start + m[0].length;

    if (start > last) {
      nodes.push(
        <span key={`t-${last}`} style={{ whiteSpace: 'pre' }}>
          {label.slice(last, start)}
        </span>
      );
    }

    nodes.push(<strong key={`b-${start}`}>{label.slice(start, end)}</strong>);
    last = end;
  }

  if (last < label.length) {
    nodes.push(
      <span key={`t-${last}`} style={{ whiteSpace: 'pre' }}>
        {label.slice(last)}
      </span>
    );
  }

  return <span className="option-label">{nodes}</span>;
};
