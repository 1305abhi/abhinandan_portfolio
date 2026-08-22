"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { SkillGroup as SkillGroupType } from "@/data/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

type SkillGroupProps = {
  group: SkillGroupType;
};

export function SkillGroup({ group }: SkillGroupProps) {
  const reduce = useReducedMotion();

  const parent: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } }
  };

  return (
    <motion.div
      className="skill-group"
      variants={parent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.h3 className="eyebrow" variants={item}>
        {group.title}
      </motion.h3>
      <ul>
        {group.items.map((entry) => (
          <motion.li key={entry} variants={item}>
            {entry}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
