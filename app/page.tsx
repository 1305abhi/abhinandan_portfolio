import { CaseStudyCard } from "@/components/CaseStudyCard";
import { ContactBuilder, ContactRow, RetroFooter } from "@/components/ContactRow";
import { ExperienceItem } from "@/components/ExperienceItem";
import { Hero } from "@/components/Hero";
import {
  BenchmarkAndDeck,
  PineFeaturePanel,
  Reveal,
  Stagger,
  StaggerItem,
  StatGrid
} from "@/components/motion";
import { SectionHeader, SectionRibbon } from "@/components/SectionHeader";
import { SiteNav } from "@/components/SiteNav";
import { SkillGroup } from "@/components/SkillGroup";
import { portfolio } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <SiteNav />

      <main className="site-shell" id="main">
        <Hero
          kicker={portfolio.hero.kicker}
          nameLines={portfolio.hero.nameLines}
          role={portfolio.hero.role}
          tags={portfolio.hero.tags}
          location={portfolio.hero.location}
          status={portfolio.hero.status}
          tickerRows={portfolio.tickerRows}
        />

        {/* 01 // CAPABILITIES & SKILLS */}
        <SectionRibbon index="01" label="Capabilities" />

        <section className="kk-wrap section-block" id="skills">
          <span aria-hidden="true" className="gutter-thread gutter-thread-right" />
          <SectionHeader
            number="01"
            eyebrow="Capabilities"
            title="What I test."
            accentTitle="Under one roof."
            note="API security, functional QA & tooling. One tester."
          />
          <div className="skill-grid">
            {portfolio.skills.map((group, idx) => (
              <SkillGroup key={group.title} group={group} groupIndex={idx} />
            ))}
          </div>
        </section>

        {/* 02 // QA EXECUTION WORKBENCH & 4-STEP PROTOCOL DECK */}
        <SectionRibbon index="02" label="QA Execution Workbench" flip />

        <section className="section-block-flush" id="protocol">
          <BenchmarkAndDeck
            intro={portfolio.intro}
            protocolSteps={portfolio.protocolSteps}
          />
        </section>

        {/* 03 // DOMAIN SPECIALIZATION (PINE) & EXPERIENCE */}
        <SectionRibbon index="03" label="Experience & Depth" />

        <section className="section-block-flush" id="experience">
          <PineFeaturePanel />

          <div className="kk-wrap experience-section-inner">
            <span aria-hidden="true" className="gutter-thread gutter-thread-left" />
            <SectionHeader
              number="03"
              eyebrow="Career Log"
              title="Work"
              accentTitle="Experience."
              note="SaaS, agency, and multi-platform release verification."
            />
            <div className="timeline-list">
              {portfolio.experience.map((item, idx) => (
                <ExperienceItem
                  key={`${item.company}-${item.role}-${item.period}`}
                  item={item}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 04 // CASE STUDIES & RESULTS IN NUMBERS */}
        <SectionRibbon index="04" label="Case Studies" flip />

        <section className="kk-wrap section-block" id="case-studies">
          <span aria-hidden="true" className="gutter-thread gutter-thread-right" />
          <SectionHeader
            number="04"
            eyebrow="Evidence Locker"
            title="Case Studies"
            accentTitle="&amp; Audits."
            note="Real vulnerabilities intercepted, documented &amp; verified."
          />

          <div className="case-cord-track">
            <span aria-hidden="true" className="case-cord-line" />
            <div className="case-list">
              {portfolio.caseStudies.map((item, index) => (
                <CaseStudyCard key={item.title} item={item} index={index + 1} />
              ))}
            </div>
          </div>

          {/* Results in Numbers (Referenced from KKM #numbers) */}
          <div className="numbers-subblock">
            <header className="numbers-header">
              <div>
                <span className="t-label text-vermillion-deep section-eyebrow">
                  <span className="diamond-dot" aria-hidden="true" />
                  Verification Telemetry
                </span>
                <h3 className="t-xl">
                  The results, <span className="text-vermillion">in numbers.</span>
                </h3>
              </div>
              <p className="t-label text-stone">
                Hover a card to inspect the scope &rarr;
              </p>
            </header>
            <StatGrid stats={portfolio.stats} />
          </div>

          {/* Certifications & Education Split Ledger */}
          <div className="split-section">
            <div className="ledger-column">
              <Reveal>
                <div className="ledger-head">
                  <span className="t-label text-vermillion-deep section-eyebrow">
                    <span className="diamond-dot" aria-hidden="true" />
                    Credentials
                  </span>
                  <h3 className="t-l">Certifications</h3>
                </div>
              </Reveal>
              <Stagger className="line-list">
                {portfolio.certifications.map((item, idx) => (
                  <StaggerItem className="line-item" key={item.title}>
                    <div className="line-item-left">
                      <span className="t-label text-stone">
                        0{idx + 1}
                      </span>
                      <div>
                        <h4 className="kk-condensed line-item-title">{item.title}</h4>
                        <p className="t-label text-stone">{item.source}</p>
                      </div>
                    </div>
                    <span className="t-label cert-badge">VERIFIED</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <div className="ledger-column">
              <Reveal>
                <div className="ledger-head">
                  <span className="t-label text-vermillion-deep section-eyebrow">
                    <span className="diamond-dot" aria-hidden="true" />
                    Academic Foundation
                  </span>
                  <h3 className="t-l">Education</h3>
                </div>
              </Reveal>
              <Stagger className="line-list">
                {portfolio.education.map((item) => (
                  <StaggerItem
                    className="line-item line-item-with-date"
                    key={`${item.title}-${item.year}`}
                  >
                    <div className="line-item-left">
                      <span className="t-label text-stone">01</span>
                      <div>
                        <h4 className="kk-condensed line-item-title">{item.title}</h4>
                        <p className="t-label text-stone">{item.detail}</p>
                      </div>
                    </div>
                    <span className="font-display edu-year-badge">{item.year}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </section>

        {/* 05 // CONTACT & INTERACTIVE BRIEF BUILDER */}
        <SectionRibbon index="05" label="Contact" />

        <section className="kk-wrap section-block contact-section" id="contact">
          <span aria-hidden="true" className="gutter-thread gutter-thread-left" />
          <div className="contact-grid">
            <div className="contact-left">
              <div>
                <span className="t-label text-vermillion-deep section-eyebrow">
                  <span className="diamond-dot" aria-hidden="true" />
                  05 &middot; Contact
                </span>
                <Reveal as="h2" className="t-xl contact-mega-heading">
                  Let&apos;s <span className="text-vermillion">talk.</span>
                </Reveal>
                <Reveal>
                  <p className="contact-lead-note">{portfolio.contact.note}</p>
                </Reveal>
              </div>

              <div className="contact-next-steps">
                <span className="t-label text-stone">What happens next</span>
                <ol className="next-steps-list">
                  <li>
                    <span className="t-label text-vermillion-deep">01</span>
                    <div>
                      <strong>Review your stack or role brief</strong>
                      <span>Same-day response on QA &amp; security inquiries</span>
                    </div>
                  </li>
                  <li>
                    <span className="t-label text-vermillion-deep">02</span>
                    <div>
                      <strong>Walk through test vectors &amp; workflows</strong>
                      <span>API collections, RBAC boundaries &amp; release goals</span>
                    </div>
                  </li>
                  <li>
                    <span className="t-label text-vermillion-deep">03</span>
                    <div>
                      <strong>Ship with confidence</strong>
                      <span>Reproducible logs, regression suites &amp; sign-off</span>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="contact-direct-block">
                <span className="t-label text-stone">Direct channels</span>
                <Stagger className="contact-list" amount={0.2}>
                  {portfolio.contact.links.map((link, idx) => (
                    <ContactRow key={link.label} link={link} index={idx} />
                  ))}
                </Stagger>
              </div>
            </div>

            <div className="contact-right">
              <ContactBuilder
                email={portfolio.contact.email}
                linkedinUrl={portfolio.contact.linkedinUrl}
              />
            </div>
          </div>
        </section>
      </main>

      <RetroFooter
        email={portfolio.contact.email}
        linkedinUrl={portfolio.contact.linkedinUrl}
      />
    </>
  );
}

