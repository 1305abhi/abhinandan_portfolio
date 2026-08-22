import { AdditionalWorkList } from "@/components/AdditionalWorkList";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { ContactRow } from "@/components/ContactRow";
import { ExperienceItem } from "@/components/ExperienceItem";
import { Hero } from "@/components/Hero";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeader } from "@/components/SectionHeader";
import { SiteNav } from "@/components/SiteNav";
import { SkillGroup } from "@/components/SkillGroup";
import { portfolio } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <SiteNav />

      <main className="site-shell">
        <Hero
          kicker="Hey, I'm"
          nameLines={["Abhinandan", "Tiwari"]}
          role="QA Tester"
          tags={portfolio.hero.tags}
        />

        <section className="intro" aria-label="Introduction">
          <Reveal>
            <h1>{portfolio.intro}</h1>
          </Reveal>
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
          <AdditionalWorkList
            items={portfolio.additionalWork}
            startIndex={portfolio.caseStudies.length}
          />
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
            <Reveal>
              <p className="eyebrow">Certifications</p>
            </Reveal>
            <Stagger className="line-list">
              {portfolio.certifications.map((item) => (
                <StaggerItem className="line-item" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.source}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div>
            <Reveal>
              <p className="eyebrow">Education</p>
            </Reveal>
            <Stagger className="line-list">
              {portfolio.education.map((item) => (
                <StaggerItem
                  className="line-item line-item-with-date"
                  key={`${item.title}-${item.year}`}
                >
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                  <span>{item.year}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="section-block contact-section" id="contact">
          <SectionHeader number="04" title="Contact" />
          <Reveal as="h2">
            Let&apos;s
            <br />
            talk<span>.</span>
          </Reveal>
          <Reveal>
            <p>{portfolio.contact.note}</p>
          </Reveal>
          <Stagger className="contact-list" amount={0.2}>
            {portfolio.contact.links.map((link) => (
              <ContactRow key={link.label} link={link} />
            ))}
          </Stagger>
        </section>

        <Reveal as="footer" className="site-footer">
          <div>
            <p className="footer-line">Let&apos;s build something that holds up.</p>
            <p>&copy; 2026 Abhinandan Tiwari</p>
          </div>
          <div>
            <a href={`mailto:${portfolio.contact.email}`}>{portfolio.contact.email}</a>
            <a href={portfolio.contact.linkedinUrl}>LinkedIn / abhinandantiwari</a>
          </div>
        </Reveal>
      </main>
    </>
  );
}
