"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { Experience } from "@/data/portfolio";

const EASE = [0.16, 1, 0.3, 1] as const;

type ExperienceItemProps = {
  item: Experience;
  index?: number;
};

export function ExperienceItem({ item, index = 0 }: ExperienceItemProps) {
  const reduce = useReducedMotion();

  const parent: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } }
  };
  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } }
  };

  const numStr = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      className="experience-minimal-card"
      variants={parent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <span aria-hidden="true" className="skills-hover-bar" />

      <motion.div className="experience-minimal-meta" variants={rise}>
        <div className="experience-meta-top">
          <span className="skills-code-pill">EXP // {numStr}</span>
          {item.badge ? <span className="experience-badge-pill">{item.badge}</span> : null}
        </div>
        <span className="t-label experience-period-text">{item.period}</span>
        <h4 className="experience-company-title">{item.company}</h4>
      </motion.div>

      <div className="experience-minimal-content">
        <motion.div className="experience-role-head" variants={rise}>
          <h3 className="experience-role-name">{item.role}</h3>
        </motion.div>

        <ol className="experience-minimal-points">
          {item.points.map((point, pIdx) => (
            <motion.li key={point} className="experience-point-item" variants={rise}>
              <span className="experience-point-index">
                {String(pIdx + 1).padStart(2, "0")}
              </span>
              <p className="experience-point-text">{point}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </motion.article>
  );
}
