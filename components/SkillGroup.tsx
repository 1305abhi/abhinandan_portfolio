"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { SkillGroup as SkillGroupType } from "@/data/portfolio";

const EASE = [0.16, 1, 0.3, 1] as const;

type SkillGroupProps = {
  group: SkillGroupType;
  groupIndex?: number;
};

export function SkillGroup({ group, groupIndex = 0 }: SkillGroupProps) {
  const reduce = useReducedMotion();

  const parent: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } }
  };

  const baseIdx = groupIndex * 4;

  return (
    <motion.div
      className="svc-group"
      variants={parent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <motion.div className="svc-group-head" variants={item}>
        <h3 className={`svc-group-title ${groupIndex === 0 ? "text-vermillion-deep" : ""}`}>
          {group.title}
        </h3>
        <span className="svc-group-count">
          {String(group.items.length).padStart(2, "0")}
        </span>
      </motion.div>
      <span className="svc-group-rule" aria-hidden="true" />
      <ul className="svc-list">
        {group.items.map((entry, idx) => {
          const rowNumber = String(baseIdx + idx + 1).padStart(2, "0");
          const subTags = group.tags?.[idx] ?? [];
          return (
            <motion.li key={entry} className="svc-row" variants={item}>
              <div className="svc-row-inner">
                <span aria-hidden="true" className="svc-row-bg" />
                <span aria-hidden="true" className="svc-row-bar" />
                <span className="t-label svc-row-num">{rowNumber}</span>
                <div className="svc-row-body">
                  <span className="kk-condensed svc-row-title">{entry}</span>
                  {subTags.length > 0 && (
                    <span className="t-label svc-row-tags">
                      {subTags.map((tag, tIdx) => (
                        <span key={tag} className="svc-tag-item">
                          {tIdx > 0 && <span className="svc-tag-diamond" aria-hidden="true" />}
                          {tag}
                        </span>
                      ))}
                    </span>
                  )}
                </div>
                <span aria-hidden="true" className="svc-row-arrow">
                  &rarr;
                </span>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}

