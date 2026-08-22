"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { CaseStudy } from "@/data/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

type CaseStudyCardProps = {
  item: CaseStudy;
  index: number;
};

export function CaseStudyCard({ item, index }: CaseStudyCardProps) {
  const reduce = useReducedMotion();

  const card: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } }
  };
  const columns: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } }
  };
  const column: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } }
  };

  return (
    <motion.article
      className={`case-card ${item.featured ? "featured" : ""}`}
      variants={card}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <div className="case-meta">
        <span>{item.category}</span>
        <span>Case {String(index).padStart(2, "0")}</span>
      </div>
      <h3>{item.title}</h3>
      <motion.div
        className="case-columns"
        variants={columns}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {item.sections.map((section) => (
          <motion.div className="case-column" key={section.heading} variants={column}>
            <h4>{section.heading}</h4>
            <p>{section.body}</p>
          </motion.div>
        ))}
      </motion.div>
      <div className="tools-row">
        <span className="tools-label">Tools</span>
        {item.tools.map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </div>
    </motion.article>
  );
}
