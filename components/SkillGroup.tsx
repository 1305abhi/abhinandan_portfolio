"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { SkillGroup as SkillGroupType } from "@/data/portfolio";

const EASE = [0.16, 1, 0.3, 1] as const;

const pillarMeta: Record<string, { kicker: string; toolSummary: string }> = {
  "SEC-01": {
    kicker: "API & Security",
    toolSummary: "Postman · Burp Suite · JWT"
  },
  "QA-02": {
    kicker: "Functional & Mobile",
    toolSummary: "Web · Android · iOS Sprints"
  },
  "OPS-03": {
    kicker: "Tools & Methodologies",
    toolSummary: "DevTools · cURL Logs · Jira"
  }
};

type CapabilitiesSectionProps = {
  skills: SkillGroupType[];
};

export function CapabilitiesSection({ skills }: CapabilitiesSectionProps) {
  const reduce = useReducedMotion();

  const parent: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } }
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } }
  };

  return (
    <section className="skills-minimal-section" id="skills" aria-label="Capabilities and Skill Pillars">
      <div className="kk-wrap">
        {/* Minimal Editorial Section Header */}
        <motion.header
          className="skills-minimal-header"
          variants={parent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className="skills-header-lead">
            <motion.div className="t-label skills-eyebrow-line" variants={fadeUp}>
              <span className="skills-eyebrow-dot" aria-hidden="true" />
              <span className="skills-eyebrow-index">01</span>
              <span className="skills-eyebrow-sep">/</span>
              <span>CAPABILITIES</span>
            </motion.div>
            <motion.h2 className="skills-minimal-title" variants={fadeUp}>
              What I <span className="skills-title-accent">test.</span>
            </motion.h2>
          </div>
          <motion.p className="skills-header-note" variants={fadeUp}>
            API test suites, access control &amp; IDOR audits, and cross-platform release verification.
          </motion.p>
        </motion.header>

        {/* 3 Distinct Minimalist Architectural Cards */}
        <motion.div
          className="skills-minimal-grid"
          variants={parent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {skills.map((group, groupIdx) => {
            const code = group.code ?? `SEC-0${groupIdx + 1}`;
            const meta = pillarMeta[code] ?? {
              kicker: "Core Domain",
              toolSummary: "QA Verification"
            };

            return (
              <motion.article
                key={group.title}
                className="skills-minimal-card"
                variants={fadeUp}
              >
                {/* Minimal Card Header */}
                <div className="skills-card-top">
                  <div className="skills-code-row">
                    <span className="skills-code-pill">{code}</span>
                    <span className="skills-kicker-text">{meta.kicker}</span>
                  </div>
                  <span className="skills-count-pill">{String(group.items.length).padStart(2, "0")}</span>
                </div>

                <h3 className="skills-card-heading">{group.title}</h3>
                <span className="skills-card-divider" aria-hidden="true" />

                {/* Minimal Vector Rows */}
                <ul className="skills-row-list">
                  {group.items.map((entry, idx) => {
                    const rowNum = String(idx + 1).padStart(2, "0");
                    // Pick clean primary focus tag to avoid visual clutter
                    const focusTag = group.tags?.[idx]?.[0] ?? "";

                    return (
                      <li key={entry} className="skills-row-item">
                        <span aria-hidden="true" className="skills-hover-bar" />
                        <div className="skills-row-content">
                          <span className="skills-row-index">{rowNum}</span>
                          <div className="skills-row-text">
                            <span className="skills-entry-title">{entry}</span>
                            {focusTag && (
                              <span className="skills-entry-tag">{focusTag}</span>
                            )}
                          </div>
                          <span className="skills-row-arrow" aria-hidden="true">&rarr;</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* Clean 1-Line Tooling Footer */}
                <div className="skills-card-foot">
                  <span className="skills-foot-dot" aria-hidden="true" />
                  <span className="skills-foot-text">{meta.toolSummary}</span>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// Backwards-compatible export for any legacy imports
export function SkillGroup({
  group,
  groupIndex = 0
}: {
  group: SkillGroupType;
  groupIndex?: number;
}) {
  return null;
}
