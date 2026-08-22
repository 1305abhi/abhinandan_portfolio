"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ContactLink } from "@/data/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

type ContactRowProps = {
  link: ContactLink;
};

export function ContactRow({ link }: ContactRowProps) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } }
  };

  return (
    <motion.div className="contact-row" variants={variants}>
      <span>{link.label}</span>
      <a href={link.href}>
        {link.value} <span className="arrow" aria-hidden="true">&rarr;</span>
      </a>
    </motion.div>
  );
}
