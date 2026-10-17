"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type SectionHeaderProps = {
  number: string;
  eyebrow?: string;
  title: string;
  accentTitle?: string;
  note?: string;
  light?: boolean;
};

export function SectionHeader({
  number,
  eyebrow,
  title,
  accentTitle,
  note,
  light = false
}: SectionHeaderProps) {
  const reduce = useReducedMotion();

  const parent: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } }
  };

  return (
    <motion.header
      className={`section-heading ${light ? "section-heading-light" : ""}`}
      variants={parent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.45 }}
    >
      <div className="section-heading-left">
        <motion.span className="t-label section-eyebrow" variants={fadeUp}>
          <span className="diamond-dot" aria-hidden="true" />
          <span>{number}</span>
          {eyebrow ? <span> &middot; {eyebrow}</span> : null}
        </motion.span>
        <motion.h2 className="t-xl section-title" variants={fadeUp}>
          <span>{title}</span>{" "}
          {accentTitle ? <span className="text-vermillion">{accentTitle}</span> : null}
        </motion.h2>
      </div>
      {note ? (
        <motion.p className="t-label section-note" variants={fadeUp}>
          {note}
        </motion.p>
      ) : null}
    </motion.header>
  );
}

type SectionRibbonProps = {
  index: string;
  label: string;
  flip?: boolean;
};

export function SectionRibbon({ index, label, flip = false }: SectionRibbonProps) {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden="true" className="section-ribbon-wrap">
      <div className="section-ribbon-svg-box">
        <svg
          className={`section-ribbon-svg ${flip ? "ribbon-flip" : ""}`}
          viewBox="0 0 1200 220"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 1260 190 C 980 210, 850 30, 600 55 S 210 200, -60 45"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="9"
            strokeLinecap="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.25, ease: EASE }}
          />
        </svg>
      </div>
      <div className="seam-node">
        <span className="t-index">{index}</span>
        <span className="t-label text-stone">{label}</span>
      </div>
    </div>
  );
}

