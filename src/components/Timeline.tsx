import { useMemo, useState } from 'react';
import { TimelineEntryType, timeline } from '../data/resume';
import type { SkillSelection } from '../App';
import SkillChip from './SkillChip';

type Filter = 'all' | TimelineEntryType;

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'work', label: 'Experience' },
  { id: 'education', label: 'Education' },
];

interface Props {
  selection: SkillSelection;
}

export default function Timeline({ selection }: Props) {
  const [filter, setFilter] = useState<Filter>('all');

  const entries = useMemo(
    () =>
      [...timeline]
        .filter((e) => filter === 'all' || e.type === filter)
        .sort((a, b) => b.sortKey - a.sortKey),
    [filter],
  );

  return (
    <section className="section" id="timeline" aria-label="Experience and education timeline">
      <div className="section-heading">
        <h2>Experience &amp; Education</h2>
        <div className="filter-tabs" role="tablist" aria-label="Timeline filter">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              className={filter === f.id ? 'tab tab--active' : 'tab'}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <ol className="timeline">
        {entries.map((entry) => {
          const match = selection.matches(entry.skills);
          const cardClass = [
            'timeline-card',
            match === true ? 'card--match' : '',
            match === false ? 'card--dimmed' : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <li className={`timeline-item timeline-item--${entry.type}`} key={entry.id}>
              <div className="timeline-marker" aria-hidden="true" />
              <article className={cardClass}>
                <header className="card-header">
                  <div>
                    <h3>{entry.title}</h3>
                    <p className="card-org">
                      {entry.org} · {entry.location}
                    </p>
                  </div>
                  <div className="card-header-right">
                    <span className={`type-badge type-badge--${entry.type}`}>
                      {entry.type === 'work' ? 'Work' : 'Education'}
                    </span>
                    <span className="card-period">{entry.period}</span>
                  </div>
                </header>
                {entry.summary && <p className="card-summary">{entry.summary}</p>}
                {entry.highlights.length > 0 && (
                  <ul className="card-highlights">
                    {entry.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
                {entry.skills.length > 0 && (
                  <div className="chip-row chip-row--card">
                    {entry.skills.map((id) => (
                      <SkillChip key={id} id={id} selection={selection} compact />
                    ))}
                  </div>
                )}
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
