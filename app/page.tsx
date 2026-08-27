import { ProjectVisual } from "../components/ProjectVisual";
import { ThemeToggle } from "../components/ThemeToggle";
import { portfolio } from "../content/portfolio";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function Arrow() {
  return <span aria-hidden="true">{"\u2197"}</span>;
}

function SocialIcon({ kind }: { kind: "github" | "linkedin" | "resume" }) {
  if (kind === "github") {
    return (
      <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.5a9.5 9.5 0 0 0-3 18.52c.48.09.66-.21.66-.46v-1.66c-2.7.59-3.27-1.14-3.27-1.14-.44-1.11-1.08-1.4-1.08-1.4-.88-.6.07-.59.07-.59.97.07 1.48 1 1.48 1 .86 1.48 2.25 1.05 2.8.8.09-.63.34-1.05.61-1.29-2.16-.25-4.43-1.08-4.43-4.8 0-1.06.38-1.92 1-2.6-.1-.25-.43-1.23.1-2.56 0 0 .82-.26 2.62.99A9.1 9.1 0 0 1 12 6.98c.83 0 1.66.11 2.44.33 1.8-1.25 2.62-.99 2.62-.99.53 1.33.2 2.31.1 2.56.62.68 1 1.54 1 2.6 0 3.73-2.27 4.55-4.44 4.79.35.3.66.87.66 1.76v2.61c0 .25.18.55.67.46A9.5 9.5 0 0 0 12 2.5Z" />
      </svg>
    );
  }

  if (kind === "linkedin") {
    return (
      <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.2 8.2H2.4v9.4h2.8V8.2Zm.18-2.92c0-.88-.67-1.58-1.57-1.58s-1.58.7-1.58 1.58.68 1.58 1.58 1.58 1.57-.7 1.57-1.58ZM21.6 12.2c0-2.83-1.5-4.15-3.5-4.15-1.62 0-2.34.89-2.74 1.5V8.2h-2.8v9.4h2.8v-4.65c0-1.22.23-2.4 1.74-2.4 1.49 0 1.5 1.4 1.5 2.49v4.56h2.8V12.2Z" />
      </svg>
    );
  }

  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 2.75h8.2L18 6.55v14.7H6V2.75Zm7.7 1.8v2.7h2.7l-2.7-2.7ZM8.5 11h7v1.5h-7V11Zm0 3h7v1.5h-7V14Z" />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label">{children}</p>;
}

export default function Home() {
  const resumeHref = `${basePath}/${portfolio.resume.fileName}`;

  return (
    <>
      <a className="skip-link" href="#about">Skip to content</a>
      <div className="ambient-glow" aria-hidden="true" />

      <main className="portfolio-shell">
        <header className="intro-panel" id="top">
          <div className="intro-main">
            <div className="intro-topbar">
              <a className="wordmark" href="#top" aria-label="Deep Patel, home">
                DP<span>.</span>
              </a>
              <ThemeToggle />
            </div>

            <p className="intro-location">{portfolio.profile.location}</p>
            <h1>{portfolio.profile.name}</h1>
            <h2>{portfolio.profile.role}</h2>
            <p className="intro-headline">{portfolio.profile.headline}</p>

            <nav className="section-nav" aria-label="Portfolio sections">
              <a href="#about"><span />About</a>
              <a href="#experience"><span />Experience</a>
              <a href="#projects"><span />Projects</a>
              <a href="#contact"><span />Contact</a>
            </nav>
          </div>

          <div className="intro-footer">
            <p className="availability"><i />{portfolio.profile.availability}</p>
            <div className="profile-links">
              <a href={portfolio.contact.github} target="_blank" rel="noreferrer">
                <SocialIcon kind="github" /> GitHub <Arrow />
              </a>
              <a href={portfolio.contact.linkedIn} target="_blank" rel="noreferrer">
                <SocialIcon kind="linkedin" /> LinkedIn <Arrow />
              </a>
              <a href={resumeHref} target="_blank" rel="noreferrer">
                <SocialIcon kind="resume" /> {portfolio.resume.label} <Arrow />
              </a>
            </div>
          </div>
        </header>

        <div className="content-panel">
          <section className="content-section about-section" id="about">
            <SectionLabel>About</SectionLabel>
            <div className="about-copy">
              {portfolio.profile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="impact-grid" aria-label="Career highlights">
              <div><strong>5+</strong><span>years shipping production systems</span></div>
              <div><strong>20-30%</strong><span>fewer incidents through stabilization</span></div>
              <div><strong>300+</strong><span>hours saved yearly through automation</span></div>
            </div>
          </section>

          <section className="content-section" id="experience">
            <SectionLabel>Experience</SectionLabel>
            <div className="experience-list">
              {portfolio.experience.map((experience) => (
                <article className="experience-card" key={`${experience.company}-${experience.role}`}>
                  <p className="experience-period">{experience.period}</p>
                  <div className="experience-detail">
                    <h3>{experience.role} <span>· {experience.company}</span></h3>
                    <p className="experience-summary">{experience.summary}</p>
                    <ul className="achievement-list">
                      {experience.achievements.map((achievement) => (
                        <li key={achievement}>{achievement}</li>
                      ))}
                    </ul>
                    <div className="tag-list" aria-label={`${experience.company} technologies`}>
                      {experience.technologies.map((technology) => (
                        <span key={technology}>{technology}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <a className="inline-link" href={resumeHref} target="_blank" rel="noreferrer">
              View full resume <Arrow />
            </a>
          </section>

          <section className="content-section projects-section" id="projects">
            <SectionLabel>Selected projects</SectionLabel>
            <p className="section-intro">{portfolio.projectsIntro}</p>
            <div className="project-list">
              {portfolio.projects.map((project, index) => (
                <article className="project-card" key={project.name}>
                  <ProjectVisual project={project} />
                  <div className="project-content">
                    <p className="project-number">{String(index + 1).padStart(2, "0")} / {project.type}</p>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <ul className="project-proof">
                      {project.proof.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                    <div className="tag-list">
                      {project.stack.split(" / ").map((technology) => (
                        <span key={technology}>{technology}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      {project.links.map((link) => (
                        <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
                          {link.label} <Arrow />
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="content-section contact-section" id="contact">
            <SectionLabel>What’s next</SectionLabel>
            <h2>Let’s build something that has to work.</h2>
            <p>
              I’m exploring senior engineering roles where product judgment,
              backend depth, and dependable delivery matter.
            </p>
            <a className="email-link" href={`mailto:${portfolio.contact.email}`}>
              {portfolio.contact.email} <Arrow />
            </a>
            <a
              className="contact-link"
              href={portfolio.contact.linkedIn}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <Arrow />
            </a>
          </section>

          <footer className="site-footer">
            <span>Designed and built by Deep Patel.</span>
            <a href="#top">Back to top ↑</a>
          </footer>
        </div>
      </main>
    </>
  );
}
