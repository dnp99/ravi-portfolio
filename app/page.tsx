import Image from 'next/image';
import ImageGallery from '../components/ImageGallery';
import JournalHeader from '../components/JournalHeader';
import { getPortfolio } from '../lib/content';

const portfolio = getPortfolio();

function Arrow() {
  return <span aria-hidden="true">{'\u2197'}</span>;
}

function ContactIcon({ kind }: { kind: 'instagram' | 'email' | 'linktree' }) {
  if (kind === 'instagram') {
    return (
      <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.7" r="1" className="contact-icon-fill" />
      </svg>
    );
  }

  if (kind === 'email') {
    return (
      <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4.5 7 7.5 6 7.5-6" />
      </svg>
    );
  }

  return (
    <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10.2 13.8 13.8 10.2" />
      <path d="m7.5 15.8-1.1 1.1a3.2 3.2 0 1 1-4.5-4.5l3.8-3.8a3.2 3.2 0 0 1 4.5 0" />
      <path d="m16.5 8.2 1.1-1.1a3.2 3.2 0 1 1 4.5 4.5l-3.8 3.8a3.2 3.2 0 0 1-4.5 0" />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label">{children}</p>;
}

function FilmFrame({ film }: { film: (typeof portfolio.films)[number] }) {
  return (
    film.images.length > 0 ? <ImageGallery variant="film" items={film.images.map((image, index) => ({
      src: image,
      alt: `${film.imageAlt ?? `${film.title} film still`} ${index + 1}`,
      title: film.title,
      note: film.year,
      orientation: film.imageOrientation,
    }))} /> : <div className={`film-stills film-frame-${film.tone}`} aria-label={`${film.title} stills`}><div className="film-frame"><span className="film-frame-grain" aria-hidden="true" /><span className="film-frame-mark">{film.title}</span><span className="film-frame-caption">still / {film.year}</span></div></div>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#about">Skip to content</a>
      <div className="ambient-glow" aria-hidden="true" />

      <main className="portfolio-shell journal-shell">
        <JournalHeader />

        <header className="intro-panel" id="top">
          <div className="intro-main">
            <p className="intro-location">{portfolio.profile.location}</p>
            <h1>{portfolio.profile.name}</h1>
            <h2>{portfolio.profile.role}</h2>
            <p className="intro-headline">{portfolio.profile.headline}</p>
          </div>

          <div className="intro-footer">
            <p className="availability"><i />{portfolio.profile.availability}</p>
            <div className="profile-links">
              <a href={portfolio.contact.instagram} target="_blank" rel="noreferrer"><ContactIcon kind="instagram" />Instagram <Arrow /></a>
              <a href={`mailto:${portfolio.contact.email}`}><ContactIcon kind="email" />Email <Arrow /></a>
              {portfolio.contact.linktree && <a href={portfolio.contact.linktree} target="_blank" rel="noreferrer"><ContactIcon kind="linktree" />Linktree <Arrow /></a>}
            </div>
          </div>
        </header>

        <div className="content-panel">
          <section className="content-section about-section" id="about">
            <SectionLabel>About the work</SectionLabel>
            <div className="about-layout">
              <div className="about-copy">
                {portfolio.profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {portfolio.profile.image && <figure className="about-portrait"><div><Image src={portfolio.profile.image} alt={portfolio.profile.imageAlt} fill sizes="(max-width: 760px) 100vw, 28vw" /></div><figcaption>Ravi Rekhi / Toronto</figcaption></figure>}
            </div>
            <div className="journal-note">
              <span>Field note / 01</span>
              <p>{portfolio.profile.fieldNote}</p>
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
                    {film.credits && <p className="film-credits">{film.credits}</p>}
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
            <ImageGallery items={portfolio.portraits.filter((portrait) => portrait.image).map((portrait) => ({
              src: portrait.image!,
              alt: portrait.alt ?? portrait.title,
              title: portrait.title,
              note: portrait.note,
              orientation: portrait.orientation,
            }))} />
          </section>

          {portfolio.development.length > 0 && <section className="content-section development-section" id="development">
              <SectionLabel>In development</SectionLabel>
              {portfolio.development.map((project) => (
                <article className="development-entry" key={project.title}>
                  <p className="project-number">{project.format}</p>
                  <h3>{project.title}</h3>
                  <div className="development-copy"><p>{project.description}</p>{project.credits && <p className="development-credits">{project.credits}</p>}</div>
                </article>
              ))}
            </section>}

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
