import { publicationKindLabels, publications } from '../data/resume';

export default function Publications() {
  return (
    <section className="section" id="publications" aria-label="Publications, patents, and talks">
      <div className="section-heading">
        <h2>Publications, Patents &amp; Talks</h2>
      </div>
      <ul className="pub-list">
        {publications.map((pub) => (
          <li className="pub-item" key={pub.id}>
            <div className="pub-badges">
              <span className={`kind-badge kind-badge--${pub.kind}`}>
                {publicationKindLabels[pub.kind]}
              </span>
              {pub.award && <span className="award-badge">🏆 {pub.award}</span>}
            </div>
            <p className="pub-title">“{pub.title}”</p>
            <p className="pub-venue">
              {pub.venue} — <span className="pub-status">{pub.status}</span>
              {pub.detail && <span className="pub-detail"> {pub.detail}</span>}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
