import { ThemeToggle } from '../components/ThemeToggle';
import { portfolio } from '../content/portfolio';

function Arrow() {
  return <span aria-hidden="true">{'\u2197'}</span>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label">{children}</p>;
}

function FilmFrame({ film }: { film: (typeof portfolio.films)[number] }) {
  return (
    <div className={`film-frame film-frame-${film.tone}`} aria-label={`${film.title} film still placeholder`}>
      <span className="film-frame-grain" aria-hidden="true" />
      <span className="film-frame-mark">{film.title}</span>
      <span className="film-frame-caption">still / {film.year}</span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#about">Skip to content</a>
      <div className="ambient-glow" aria-hidden="true" />

      <main className="portfolio-shell journal-shell">
        <header className="intro-panel" id="top">
          <div className="intro-main">
            <div className="intro-topbar">
              <a className="wordmark" href="#top" aria-label="Ravi Rekhi, home">RR<span>.</span></a>
              <ThemeToggle />
            </div>

            <p className="intro-location">{portfolio.profile.location}</p>
            <h1>{portfolio.profile.name}</h1>
            <h2>{portfolio.profile.role}</h2>
            <p className="intro-headline">{portfolio.profile.headline}</p>

            <nav className="section-nav" aria-label="Portfolio sections">
              <a href="#about"><span />About</a>
              <a href="#films"><span />Films</a>
              <a href="#portraits"><span />Portraits</a>
              <a href="#contact"><span />Contact</a>
            </nav>
          </div>

          <div className="intro-footer">
            <p className="availability"><i />{portfolio.profile.availability}</p>
            <div className="profile-links">
              <a href={portfolio.contact.instagram} target="_blank" rel="noreferrer">Instagram <Arrow /></a>
              <a href={`mailto:${portfolio.contact.email}`}>Email <Arrow /></a>
            </div>
          </div>
        </header>

        <div className="content-panel">
          <section className="content-section about-section" id="about">
            <SectionLabel>About the work</SectionLabel>
            <div className="about-copy">
              {portfolio.profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="journal-note">
              <span>Field note / 01</span>
              <p>The best stories usually begin with a person trying to make an ordinary day feel manageable.</p>
            </div>
          </section>

          <section className="content-section films-section" id="films">
            <SectionLabel>Film work</SectionLabel>
            <p className="section-intro">{portfolio.filmIntro}</p>
            <div className="film-list">
              {portfolio.films.map((film, index) => (
                <article className="film-entry" key={film.title}>
                  <FilmFrame film={film} />
                  <div className="film-content">
                    <p className="project-number">{String(index + 1).padStart(2, '0')} / {film.role}</p>
                    <h3>{film.title}</h3>
                    <div className="film-meta"><span>{film.year}</span><span>{film.runtime}</span></div>
                    <p className="film-logline">{film.logline}</p>
                    <ul className="film-notes">{film.notes.map((note) => <li key={note}>{note}</li>)}</ul>
                    {film.link && <a className="inline-link" href={film.link} target="_blank" rel="noreferrer">Watch the film <Arrow /></a>}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="content-section portraits-section" id="portraits">
            <SectionLabel>Selected film portraits</SectionLabel>
            <p className="section-intro">{portfolio.portraitsIntro}</p>
            <div className="portrait-grid">
              {portfolio.portraits.map((portrait) => (
                <figure className={`portrait-tile portrait-tile-${Number(portrait.number) % 3}`} key={portrait.number}>
                  <div className="portrait-placeholder"><span>{portrait.number}</span></div>
                  <figcaption><strong>{portrait.title}</strong><span>{portrait.note}</span></figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="content-section development-section" id="development">
            <SectionLabel>In development</SectionLabel>
            {portfolio.development.map((project) => (
              <article className="development-entry" key={project.title}>
                <p className="project-number">{project.format}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </article>
            ))}
          </section>

          <section className="content-section contact-section" id="contact">
            <SectionLabel>Start a conversation</SectionLabel>
            <h2>Want to start a project with me?</h2>
            <p>For films, collaborations, or a good reason to stay up too late talking about stories.</p>
            <a className="email-link" href={`mailto:${portfolio.contact.email}`}>{portfolio.contact.email} <Arrow /></a>
          </section>

          <footer className="site-footer">
            <span>Ravi Rekhi / Writer, director, producer.</span>
            <a href="#top">Back to top ↑</a>
          </footer>
        </div>
      </main>
    </>
  );
}
