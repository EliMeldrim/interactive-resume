import { SkillId, skills } from '../data/resume';
import type { SkillSelection } from '../App';

const skillById = new Map(skills.map((s) => [s.id, s]));

interface Props {
  id: SkillId;
  selection: SkillSelection;
  /** Optional usage count badge (used in the explorer). */
  count?: number;
  /** Compact style used inside cards. */
  compact?: boolean;
}

/**
 * A clickable skill tag. Used both in the Skills Explorer and inside
 * timeline/project cards — clicking one anywhere toggles it in the global
 * selection, which is what makes the cross-linking feel alive.
 */
export default function SkillChip({ id, selection, count, compact }: Props) {
  const skill = skillById.get(id);
  if (!skill) return null;

  const isSelected = selection.selected.has(id);
  const classes = [
    'skill-chip',
    compact ? 'skill-chip--compact' : '',
    isSelected ? 'skill-chip--selected' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classes}
      aria-pressed={isSelected}
      onClick={() => selection.toggle(id)}
      title={isSelected ? `Deselect ${skill.name}` : `Select ${skill.name}`}
    >
      <span>{skill.name}</span>
      {count !== undefined && <span className="skill-chip-count">{count}</span>}
    </button>
  );
}
