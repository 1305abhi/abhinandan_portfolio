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
  const fromLeft: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : -18 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } }
  };
  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }
  };

  const numStr = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      className="experience-item kk-card"
      variants={parent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div className="experience-meta" variants={fromLeft}>
        <div className="experience-index-row">
          <span className="font-display experience-num">{numStr}</span>
          {item.badge ? <span className="t-label experience-badge">{item.badge}</span> : null}
        </div>
        <p className="t-label experience-date">
          <span className="diamond-dot" aria-hidden="true" />
          {item.period}
        </p>
        <p className="experience-company">{item.company}</p>
      </motion.div>

      <div className="experience-content">
        <motion.div className="experience-title-row" variants={rise}>
          <h3 className="kk-condensed experience-role">{item.role}</h3>
          <span className="t-label text-stone experience-company-inline">{item.company}</span>
        </motion.div>

        <ol className="experience-points">
          {item.points.map((point, pIdx) => (
            <motion.li key={point} className="experience-point-row" variants={rise}>
              <span className="t-label experience-point-idx">
                {String(pIdx + 1).padStart(2, "0")}
              </span>
              <p>{point}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </motion.article>
  );
}

