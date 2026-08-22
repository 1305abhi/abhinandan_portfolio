"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { Experience } from "@/data/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

type ExperienceItemProps = {
  item: Experience;
};

export function ExperienceItem({ item }: ExperienceItemProps) {
  const reduce = useReducedMotion();

  const parent: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } }
  };
  const fromLeft: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : -18 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } }
  };
  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }
  };

  return (
    <motion.article
      className="experience-item"
      variants={parent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.p className="experience-date" variants={fromLeft}>
        {item.period}
      </motion.p>
      <div className="experience-content">
        <motion.h3 variants={rise}>{item.role}</motion.h3>
        <motion.p className="company" variants={rise}>
          {item.company}
        </motion.p>
        <ul>
          {item.points.map((point) => (
            <motion.li key={point} variants={rise}>
              {point}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
