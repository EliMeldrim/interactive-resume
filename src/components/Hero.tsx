import { hero, portfolioUrl } from '../data/resume';

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-inner">
        <p className="hero-kicker">Interactive Resume</p>
        <h1>{hero.name}</h1>
        <p className="hero-title">{hero.title}</p>
        <p className="hero-meta">
          {hero.location} ·{' '}
          <a href={portfolioUrl} target="_blank" rel="noreferrer">
            elimeldrim.github.io
          </a>
        </p>
        <p className="hero-summary">{hero.summary}</p>
        <p className="hero-hint" aria-hidden="true">
          Select skills below to see where they were used — the timeline and
          projects light up to match.
        </p>
      </div>
    </header>
  );
}
