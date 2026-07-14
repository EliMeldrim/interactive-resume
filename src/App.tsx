import { useCallback, useMemo, useState } from 'react';
import { SkillId, projects, skills, timeline } from './data/resume';
import Hero from './components/Hero';
import SkillsExplorer from './components/SkillsExplorer';
import Timeline from './components/Timeline';
import ProjectsGrid from './components/ProjectsGrid';
import Publications from './components/Publications';

export type MatchMode = 'any' | 'all';

export interface SkillSelection {
  selected: ReadonlySet<SkillId>;
  matchMode: MatchMode;
  /** Toggle a skill in/out of the selection. */
  toggle: (id: SkillId) => void;
  /** null = no active selection (nothing filtered); boolean = does this skill set match? */
  matches: (skillIds: readonly SkillId[]) => boolean | null;
}

export default function App() {
  const [selected, setSelected] = useState<ReadonlySet<SkillId>>(new Set());
  const [matchMode, setMatchMode] = useState<MatchMode>('any');

  const toggle = useCallback((id: SkillId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const clear = useCallback(() => setSelected(new Set()), []);

  const matches = useCallback(
    (skillIds: readonly SkillId[]): boolean | null => {
      if (selected.size === 0) return null;
      const ids = new Set(skillIds);
      const wanted = [...selected];
      return matchMode === 'all'
        ? wanted.every((id) => ids.has(id))
        : wanted.some((id) => ids.has(id));
    },
    [selected, matchMode],
  );

  const selection: SkillSelection = useMemo(
    () => ({ selected, matchMode, toggle, matches }),
    [selected, matchMode, toggle, matches],
  );

  // How many times each skill is referenced across the timeline and projects.
  const usageCounts = useMemo(() => {
    const counts = new Map<SkillId, number>();
    for (const skill of skills) counts.set(skill.id, 0);
    for (const entry of timeline) {
      for (const id of entry.skills) counts.set(id, (counts.get(id) ?? 0) + 1);
    }
    for (const project of projects) {
      for (const id of project.skills) counts.set(id, (counts.get(id) ?? 0) + 1);
    }
    return counts;
  }, []);

  const matchedTimeline = useMemo(
    () => timeline.filter((e) => matches(e.skills) !== false).length,
    [matches],
  );
  const matchedProjects = useMemo(
    () => projects.filter((p) => matches(p.skills) !== false).length,
    [matches],
  );

  return (
    <div className="page">
      <Hero />
      <main>
        <SkillsExplorer
          selection={selection}
          usageCounts={usageCounts}
          onClear={clear}
          onMatchModeChange={setMatchMode}
          matchedTimeline={matchedTimeline}
          totalTimeline={timeline.length}
          matchedProjects={matchedProjects}
          totalProjects={projects.length}
        />
        <Timeline selection={selection} />
        <ProjectsGrid selection={selection} />
        <Publications />
      </main>
      <footer className="site-footer">
        <p>
          Built with React + TypeScript + Vite. All content lives in a single typed
          data file — <code>src/data/resume.ts</code>.
        </p>
        <button className="print-button" type="button" onClick={() => window.print()}>
          Print / save as PDF
        </button>
      </footer>
    </div>
  );
}
