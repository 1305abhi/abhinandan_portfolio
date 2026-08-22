"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// Shared easing so every animation on the page feels like one hand.
export const EASE = [0.22, 1, 0.36, 1] as const;

// A safe, typed map of the intrinsic tags we animate. Using motion.<tag>
// directly (rather than motion(stringTag)) keeps this reliable across versions.
const motionTags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  ul: motion.ul,
  li: motion.li,
  p: motion.p,
  h2: motion.h2,
  h3: motion.h3,
  span: motion.span,
  footer: motion.footer
} as const;

type Tag = keyof typeof motionTags;

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
  delay?: number;
  y?: number;
  once?: boolean;
  amount?: number;
  id?: string;
};

/**
 * Fades + rises a block into view on scroll. Collapses to a plain fade
 * (no movement) when the visitor prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  y = 34,
  once = true,
  amount = 0.35,
  id
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motionTags[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE, delay }
    }
  };

  return (
    <MotionTag
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
  once?: boolean;
  amount?: number;
  gap?: number;
  delayChildren?: number;
  id?: string;
};

/**
 * Wraps a group whose children reveal in sequence. Pair with <StaggerItem>.
 */
export function Stagger({
  children,
  className,
  as = "div",
  once = true,
  amount = 0.25,
  gap = 0.1,
  delayChildren = 0.05,
  id
}: StaggerProps) {
  const MotionTag = motionTags[as];
  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: gap, delayChildren } }
  };

  return (
    <MotionTag
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
  y?: number;
};

export function StaggerItem({
  children,
  className,
  as = "div",
  y = 22
}: StaggerItemProps) {
  const reduce = useReducedMotion();
  const MotionTag = motionTags[as];
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }
  };

  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
