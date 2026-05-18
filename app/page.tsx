import { CaseStudyCard } from "@/components/CaseStudyCard";
import { ContactRow } from "@/components/ContactRow";
import { ExperienceItem } from "@/components/ExperienceItem";
import { SectionHeader } from "@/components/SectionHeader";
import { SkillGroup } from "@/components/SkillGroup";
import { portfolio } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <header className="site-nav">
        <a className="brand" href="#top">
          Abhinandan<span>.</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#experience">Work</a>
          <a href="#case-studies">Case Studies</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="site-shell" id="top">
        <section className="hero" aria-label="Hero">
          <div className="hero-copy">
            <p className="hero-kicker">Hey, I&apos;m</p>
            <h1>
              Abhinandan
              <br />
              Tiwari
            </h1>
            <p className="hero-role">QA Tester</p>
            <ul className="hero-tags" aria-label="Testing specialities">
              {portfolio.hero.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <div className="hero-actions">
              <a className="primary-link" href="#case-studies">
                See case studies &darr;
              </a>
              <a href="#contact">Get in touch &rarr;</a>
            </div>
          </div>

          <div className="hero-portrait-wrap" aria-label="Portrait illustration">
            <div className="portrait-note">
              <span aria-hidden="true" />
              <p>Yes, that&apos;s me!</p>
            </div>
            <img
              className="hero-portrait"
              src="/hero-portrait.png"
              alt="Stylized side profile portrait of Abhinandan Tiwari"
            />
          </div>
        </section>

      <section className="intro" aria-label="Introduction">
        <h1>{portfolio.intro}</h1>
      </section>

      <section className="section-block" id="experience">
        <SectionHeader number="01" title="Experience" />
        <div className="timeline-list">
          {portfolio.experience.map((item) => (
            <ExperienceItem key={item.role} item={item} />
          ))}
        </div>
      </section>

      <section className="section-block" id="case-studies">
        <SectionHeader number="02" title="Case Studies" />
        <div className="case-list">
          {portfolio.caseStudies.map((item, index) => (
            <CaseStudyCard key={item.title} item={item} index={index + 1} />
          ))}
        </div>
      </section>

      <section className="section-block" id="skills">
        <SectionHeader number="03" title="Skills" />
        <div className="skill-grid">
          {portfolio.skills.map((group) => (
            <SkillGroup key={group.title} group={group} />
          ))}
        </div>
      </section>

      <section className="split-section">
        <div>
          <p className="eyebrow">Certifications</p>
          <div className="line-list">
            {portfolio.certifications.map((item) => (
              <div className="line-item" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.source}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">Education</p>
          <div className="line-list">
            {portfolio.education.map((item) => (
              <div className="line-item line-item-with-date" key={item.title}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
                <span>{item.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block contact-section" id="contact">
        <SectionHeader number="04" title="Contact" />
        <h2>
          Let&apos;s
          <br />
          talk<span>.</span>
        </h2>
        <p>{portfolio.contact.note}</p>
        <div className="contact-list">
          {portfolio.contact.links.map((link) => (
            <ContactRow key={link.label} link={link} />
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <p className="footer-line">Let&apos;s build something solid.</p>
          <p>&copy; 2026 Abhinandan Tiwari</p>
        </div>
        <div>
          <a href={`mailto:${portfolio.contact.email}`}>{portfolio.contact.email}</a>
          <a href={portfolio.contact.linkedinUrl}>LinkedIn / abhinandantiwari</a>
        </div>
      </footer>
      </main>
    </>
  );
}
