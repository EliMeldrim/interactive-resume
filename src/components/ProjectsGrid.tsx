import { projects } from '../data/resume';
import type { SkillSelection } from '../App';
import SkillChip from './SkillChip';

interface Props {
  selection: SkillSelection;
}

export default function ProjectsGrid({ selection }: Props) {
  return (
    <section className="section" id="projects" aria-label="Projects">
      <div className="section-heading">
        <h2>Projects</h2>
      </div>
      <div className="projects-grid">
        {projects.map((project) => {
          const match = selection.matches(project.skills);
          const cardClass = [
            'project-card',
            match === true ? 'card--match' : '',
            match === false ? 'card--dimmed' : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <article className={cardClass} key={project.id}>
              <header className="card-header">
                <h3>{project.name}</h3>
                <span className="card-period">{project.period}</span>
              </header>
              <p className="project-tagline">{project.tagline}</p>
              <p className="project-description">{project.description}</p>
              {project.note && <p className="project-note">{project.note}</p>}
              {project.link && (
                <p className="project-link">
                  <a href={project.link.url} target="_blank" rel="noreferrer">
                    {project.link.label} ↗
                  </a>
                </p>
              )}
              <div className="chip-row chip-row--card">
                {project.skills.map((id) => (
                  <SkillChip key={id} id={id} selection={selection} compact />
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
