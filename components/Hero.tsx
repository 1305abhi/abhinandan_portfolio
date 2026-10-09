"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants
} from "framer-motion";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type HeroProps = {
  kicker: string;
  nameLines: [string, string];
  role: string;
  tags: string[];
};

export function Hero({ kicker, nameLines, role, tags }: HeroProps) {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // Portrait drifts as the page scrolls — the signature parallax moment.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.05]);

  const parent: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.11, delayChildren: 0.15 }
    }
  };

  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 26 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }
  };

  // Each name line rises out from behind a mask.
  const lineMask: Variants = {
    hidden: { y: reduce ? 0 : "110%" },
    visible: { y: 0, transition: { duration: 0.9, ease: EASE } }
  };

  return (
    <section className="hero" aria-label="Hero" id="top" ref={heroRef}>
      <svg
        className="hero-thread"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M560 620 C650 620 685 575 755 600 S835 685 900 600 C970 510 900 390 1010 315 C1125 238 1288 292 1305 410 C1322 526 1190 620 1080 545 C1005 493 1045 372 1120 345" />
        <circle cx="1120" cy="345" r="5" />
      </svg>
      <motion.div
        className="hero-copy"
        variants={parent}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero-kicker" variants={rise}>
          {kicker}
        </motion.p>

        <h1>
          <span className="line-mask">
            <motion.span className="line-inner" variants={lineMask}>
              {nameLines[0]}
            </motion.span>
          </span>
          <span className="line-mask">
            <motion.span className="line-inner" variants={lineMask}>
              {nameLines[1]}
            </motion.span>
          </span>
        </h1>

        <motion.p className="hero-role" variants={rise}>
          {role}
        </motion.p>

        <motion.ul
          className="hero-tags"
          aria-label="Testing specialities"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
          }}
        >
          {tags.map((tag) => (
            <motion.li
              key={tag}
              variants={{
                hidden: { opacity: 0, y: reduce ? 0 : 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }
              }}
            >
              {tag}
            </motion.li>
          ))}
        </motion.ul>

        <motion.aside
          className="qa-console"
          variants={rise}
          aria-label="Quality assurance snapshot"
        >
          <div className="qa-console-top">
            <span><i aria-hidden="true" /> QA SIGNAL / 01</span>
            <span>FIELD NOTES</span>
          </div>
          <div className="qa-console-metrics">
            <div>
              <span className="qa-console-label">API COVERAGE</span>
              <strong>80<span>+</span></strong>
              <small>ENDPOINTS VALIDATED</small>
            </div>
            <div>
              <span className="qa-console-label">SECURITY FINDINGS</span>
              <strong>02</strong>
              <small>ACCESS FLAWS RETESTED</small>
            </div>
          </div>
          <div className="qa-console-footer">
            <span className="qa-console-status">
              <i aria-hidden="true" /> PATCHES RETESTED
            </span>
            <span>POSTMAN / BURP SUITE</span>
          </div>
        </motion.aside>

        <motion.div className="hero-actions" variants={rise}>
          <a className="primary-link" href="#case-studies">
            See case studies{" "}
            <motion.span
              className="bob"
              aria-hidden="true"
              animate={reduce ? undefined : { y: [0, 5, 0] }}
              transition={
                reduce
                  ? undefined
                  : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
              }
            >
              &darr;
            </motion.span>
          </a>
          <a className="ghost-link" href="#contact">
            Get in touch <span aria-hidden="true">&rarr;</span>
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-portrait-wrap"
        aria-label="Portrait illustration"
        style={{ y: portraitY }}
        initial={{ opacity: 0, scale: reduce ? 1 : 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
      >
        <motion.div
          className="portrait-note"
          initial={{ opacity: 0, rotate: reduce ? 0 : -8 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 1.05 }}
        >
          <span aria-hidden="true" />
          <p>Yes, that&apos;s me!</p>
        </motion.div>
        <motion.img
          className="hero-portrait"
          src="/hero-portrait.png"
          alt="Stylized side profile portrait of Abhinandan Tiwari"
          style={{ scale: portraitScale }}
        />
      </motion.div>
    </section>
  );
}
