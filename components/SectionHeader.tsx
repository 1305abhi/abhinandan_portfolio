"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type SectionHeaderProps = {
  number: string;
  title: string;
};

export function SectionHeader({ number, title }: SectionHeaderProps) {
  const reduce = useReducedMotion();

  const parent: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
  };
  const numberVariant: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : -14 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } }
  };
  const titleVariant: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }
  };

  return (
    <motion.div
      className="section-heading"
      variants={parent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
    >
      <motion.span variants={numberVariant}>{number}</motion.span>
      <motion.h2 variants={titleVariant}>{title}</motion.h2>
    </motion.div>
  );
}
