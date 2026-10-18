"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { CaseStudy } from "@/data/portfolio";

const EASE = [0.16, 1, 0.3, 1] as const;

type CaseStudyCardProps = {
  item: CaseStudy;
  index: number;
  total?: number;
};

export function CaseStudyCard({ item, index, total = 4 }: CaseStudyCardProps) {
  const reduce = useReducedMotion();

  const card: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }
  };

  const idxStr = String(index).padStart(2, "0");
  // Staggered sticky top offset: each card tabs down by 32px so previous audit headers remain visible
  const topOffset = `calc(var(--nav-h, 68px) + 20px + ${(index - 1) * 32}px)`;

  return (
    <motion.article
      className="case-minimal-card is-stacked-deck"
      style={{
        top: topOffset,
        zIndex: index
      }}
      variants={card}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      data-audit-index={idxStr}
    >
      <span aria-hidden="true" className="skills-hover-bar" />

      {/* Top Meta Strip / File Dossier Header */}
      <div className="case-minimal-top">
        <div className="case-top-left">
          <span className="skills-code-pill">AUDIT // {idxStr}</span>
          <span className="case-cat-pill">{item.category}</span>
          {item.severity ? (
            <span className="case-sev-pill">{item.severity}</span>
          ) : null}
          <span className="case-deck-badge" aria-hidden="true">
            FILE {index} OF {total}
          </span>
        </div>
        {item.metric && (
          <div className="case-metric-badge">
            <span className="case-metric-val">{item.metric}</span>
            {item.metricLabel && (
              <span className="case-metric-label">{item.metricLabel}</span>
            )}
          </div>
        )}
      </div>

      <h3 className="case-minimal-title">{item.title}</h3>
      <span className="skills-card-divider" aria-hidden="true" />

      {/* 3 Clear Narrative Steps: Context, Approach, Outcome */}
      <div className="case-narrative-grid">
        {item.sections.map((section, sIdx) => (
          <div className="case-narrative-col" key={section.heading}>
            <div className="case-col-label">
              <span className="case-step-num">0{sIdx + 1}</span>
              <span className="case-step-heading">{section.heading}</span>
            </div>
            <p className="case-step-body">{section.body}</p>
          </div>
        ))}
      </div>

      {/* Minimal Tools Row */}
      <div className="case-tools-footer">
        <span className="case-tools-tag">STACK &middot; TOOLS</span>
        <div className="case-tools-list">
          {item.tools.map((tool) => (
            <span key={tool} className="case-tool-chip">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
