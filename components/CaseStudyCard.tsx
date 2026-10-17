"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { CaseStudy } from "@/data/portfolio";

const EASE = [0.16, 1, 0.3, 1] as const;

type CaseStudyCardProps = {
  item: CaseStudy;
  index: number;
};

export function CaseStudyCard({ item, index }: CaseStudyCardProps) {
  const reduce = useReducedMotion();

  const card: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 36 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } }
  };
  const columns: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } }
  };
  const column: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } }
  };

  const idxStr = String(index).padStart(2, "0");

  return (
    <motion.article
      className={`case-card kk-card ${item.featured ? "featured" : ""}`}
      variants={card}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      whileHover={reduce ? undefined : { y: -5 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      {/* Top knot & drop cord inspired by kreativeknotmedia.com #work */}
      <span className="case-knot" aria-hidden="true" />
      <span className="case-drop" aria-hidden="true" />

      <div className="case-meta">
        <div className="case-meta-left">
          <span className="t-label case-category-pill">
            <span className="diamond-dot" aria-hidden="true" />
            {item.category}
          </span>
          {item.severity ? (
            <span className="t-label case-severity-tag">{item.severity}</span>
          ) : null}
        </div>
        <span className="t-index">CASE // {idxStr}</span>
      </div>

      <div className="case-title-banner">
        <h3 className="kk-condensed case-title">{item.title}</h3>
        {item.metric ? (
          <div className="case-proof-box">
            <span className="t-counter case-proof-val">{item.metric}</span>
            {item.metricLabel ? (
              <span className="t-label text-stone case-proof-label">{item.metricLabel}</span>
            ) : null}
          </div>
        ) : null}
      </div>

      <motion.div
        className="case-columns"
        variants={columns}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        {item.sections.map((section, sIdx) => (
          <motion.div className="case-column" key={section.heading} variants={column}>
            <div className="case-col-head">
              <span className="t-label text-stone">0{sIdx + 1}</span>
              <h4 className="t-label text-vermillion-deep">{section.heading}</h4>
            </div>
            <p>{section.body}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="tools-row">
        <span className="t-label tools-label">
          <span className="diamond-dot" aria-hidden="true" />
          Stack &amp; Tools
        </span>
        <div className="tools-pills">
          {item.tools.map((tool) => (
            <span key={tool} className="t-label tool-pill">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

