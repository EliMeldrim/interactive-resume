import { SkillId, skillCategories, skills } from '../data/resume';
import type { MatchMode, SkillSelection } from '../App';
import SkillChip from './SkillChip';

interface Props {
  selection: SkillSelection;
  usageCounts: ReadonlyMap<SkillId, number>;
  onClear: () => void;
  onMatchModeChange: (mode: MatchMode) => void;
  matchedTimeline: number;
  totalTimeline: number;
  matchedProjects: number;
  totalProjects: number;
}

export default function SkillsExplorer({
  selection,
  usageCounts,
  onClear,
  onMatchModeChange,
  matchedTimeline,
  totalTimeline,
  matchedProjects,
  totalProjects,
}: Props) {
  const hasSelection = selection.selected.size > 0;

  return (
    <section className="section skills-explorer" id="skills" aria-label="Skills explorer">
      <div className="section-heading">
        <h2>Skills Explorer</h2>
        <p className="section-sub">
          Every skill is linked to the roles and projects that used it. Pick a few
          and watch the rest of the page respond.
        </p>
      </div>

      <div className="explorer-toolbar" role="toolbar" aria-label="Skill filter controls">
        <div className="match-mode" role="group" aria-label="Match mode">
          <span className="match-mode-label">Match</span>
          <button
            type="button"
            className={selection.matchMode === 'any' ? 'mode-btn mode-btn--active' : 'mode-btn'}
            onClick={() => onMatchModeChange('any')}
            aria-pressed={selection.matchMode === 'any'}
          >
            any
          </button>
          <button
            type="button"
            className={selection.matchMode === 'all' ? 'mode-btn mode-btn--active' : 'mode-btn'}
            onClick={() => onMatchModeChange('all')}
            aria-pressed={selection.matchMode === 'all'}
          >
            all
          </button>
        </div>

        <div className="explorer-status" aria-live="polite">
          {hasSelection ? (
            <>
              <strong>{selection.selected.size}</strong> selected ·{' '}
              {matchedTimeline}/{totalTimeline} timeline · {matchedProjects}/{totalProjects} projects
            </>
          ) : (
            <span className="muted">No skills selected — showing everything</span>
          )}
        </div>

        <button
          type="button"
          className="clear-btn"
          onClick={onClear}
          disabled={!hasSelection}
        >
          Clear
        </button>
      </div>

      <div className="skill-groups">
        {skillCategories.map((category) => {
          const group = skills.filter((s) => s.category === category.id);
          if (group.length === 0) return null;
          return (
            <div className="skill-group" key={category.id}>
              <h3>{category.label}</h3>
              <div className="chip-row">
                {group.map((skill) => (
                  <SkillChip
                    key={skill.id}
                    id={skill.id}
                    selection={selection}
                    count={usageCounts.get(skill.id) ?? 0}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
