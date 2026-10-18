"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants
} from "framer-motion";
import { useRef, useState, type MouseEvent } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type HeroProps = {
  kicker: string;
  nameLines: [string, string];
  role: string;
  tags: string[];
  status?: string;
  tickerRows?: string[][];
};

export function Hero({
  kicker,
  nameLines,
  role,
  tags,
  status = "Available for QA & Security Engagements",
  tickerRows = []
}: HeroProps) {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // Mouse-interactive motion values for spotlight & multi-plane 3D parallax
  const mouseX = useMotionValue(520);
  const mouseY = useMotionValue(280);
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  const smoothX = useSpring(normX, { stiffness: 150, damping: 24, mass: 0.6 });
  const smoothY = useSpring(normY, { stiffness: 150, damping: 24, mass: 0.6 });
  const spotX = useSpring(mouseX, { stiffness: 220, damping: 28 });
  const spotY = useSpring(mouseY, { stiffness: 220, damping: 28 });

  // 3D Tilt & Layered Parallax Transforms
  const rotateY = useTransform(smoothX, [-0.5, 0.5], reduce ? [0, 0] : [-7, 7]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], reduce ? [0, 0] : [6, -6]);
  const portraitShiftX = useTransform(smoothX, [-0.5, 0.5], reduce ? [0, 0] : [-14, 14]);
  const portraitShiftY = useTransform(smoothY, [-0.5, 0.5], reduce ? [0, 0] : [-10, 10]);
  const stampShiftX = useTransform(smoothX, [-0.5, 0.5], reduce ? [0, 0] : [16, -16]);
  const stampShiftY = useTransform(smoothY, [-0.5, 0.5], reduce ? [0, 0] : [12, -12]);
  const gridShiftX = useTransform(smoothX, [-0.5, 0.5], reduce ? [0, 0] : [-20, 20]);
  const gridShiftY = useTransform(smoothY, [-0.5, 0.5], reduce ? [0, 0] : [-20, 20]);
  const nameParallaxX = useTransform(smoothX, [-0.5, 0.5], reduce ? [0, 0] : [-5, 5]);

  const spotlightBg = useMotionTemplate`radial-gradient(560px circle at ${spotX}px ${spotY}px, rgba(196, 98, 56, 0.16), rgba(70, 98, 130, 0.08) 45%, transparent 72%)`;
  const gridMask = useMotionTemplate`radial-gradient(380px circle at ${spotX}px ${spotY}px, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.2) 60%, transparent 100%)`;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const portraitScrollY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -36]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.03]);

  const handleHeroMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const nx = Math.max(-0.5, Math.min(0.5, x / rect.width - 0.5));
    const ny = Math.max(-0.5, Math.min(0.5, y / rect.height - 0.5));

    mouseX.set(x);
    mouseY.set(y);
    normX.set(nx);
    normY.set(ny);
  };

  const handleHeroMouseLeave = () => {
    normX.set(0);
    normY.set(0);
  };

  const parent: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.09, delayChildren: 0.05 }
    }
  };

  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }
  };

  const lineMask: Variants = {
    hidden: { y: reduce ? 0 : "108%" },
    visible: { y: 0, transition: { duration: 0.75, ease: EASE } }
  };

  return (
    <section
      className="hero-section"
      aria-label="Hero"
      id="top"
      ref={heroRef}
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
    >
      <div className="kk-wrap">
        <div className="hero-matte-stage">
          {/* Mouse-Interactive Radial Spotlight & Revealed Micro-Grid */}
          <motion.div
            aria-hidden="true"
            className="hero-cursor-spotlight"
            style={{ background: spotlightBg }}
          />
          <motion.div
            aria-hidden="true"
            className="hero-cursor-grid"
            style={{
              WebkitMaskImage: gridMask,
              maskImage: gridMask
            }}
          />

          {/* Consolidated Top Bar: Availability */}
          <div className="hero-hud-bar">
            <div className="hero-hud-left">
              <span className="t-label badge-primary">
                <span className="pulse-dot-secondary" aria-hidden="true" />
                {status}
              </span>
            </div>
            <div className="hero-hud-right">
              <span className="t-label hero-status-tag">STATUS // ACTIVE ENGAGEMENT</span>
            </div>
          </div>

          <div className="hero-split-layout">
            {/* LEFT COLUMN: Clear Identity, Rewritten Role Card & 2 Focused CTAs */}
            <motion.div
              className="hero-copy-col"
              variants={parent}
              initial="hidden"
              animate="visible"
            >
              <div className="hero-identity-group">
                <motion.p className="t-label hero-kicker-line" variants={rise}>
                  <span className="kicker-index">{kicker}</span>
                </motion.p>

                <motion.h1
                  className="t-mega hero-poster-name"
                  style={{ x: nameParallaxX }}
                >
                  <span className="line-mask">
                    <motion.span className="line-inner" variants={lineMask}>
                      {nameLines[0]}
                    </motion.span>
                  </span>
                  <span className="line-mask">
                    <motion.span
                      className="line-inner hero-lastname-contrast"
                      variants={lineMask}
                    >
                      {nameLines[1]}
                      <span className="hero-lastname-dot">.</span>
                    </motion.span>
                  </span>
                </motion.h1>
              </div>

              <motion.div className="hero-role-banner" variants={rise}>
                <div className="hero-role-head">
                  <span className="t-label role-eyebrow-pill">ROLE &amp; FOCUS</span>
                  <p className="hero-role-title">{role}</p>
                </div>
                <p className="hero-plain-summary">
                  I help product teams ship reliable software &mdash; testing REST
                  APIs in Postman, catching unauthorized data access (IDOR / BOLA) with Burp
                  Suite, and verifying web and mobile releases.
                </p>
                {tags.length > 0 && (
                  <ul className="hero-inline-tags" aria-label="Core testing specialties">
                    {tags.map((tag) => (
                      <li key={tag} className="t-label hero-inline-tag">
                        <span className="inline-tag-dot" aria-hidden="true" />
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>

              <motion.div className="hero-cta-row" variants={rise}>
                <a href="#case-studies" className="kk-btn kk-btn--solid">
                  See Case Studies{" "}
                  <span className="kk-arrow kk-arrow--down" aria-hidden="true">
                    &darr;
                  </span>
                </a>
                <a href="#contact" className="kk-btn kk-btn--secondary">
                  Get in Touch{" "}
                  <span className="kk-arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </a>
              </motion.div>
            </motion.div>

            {/* RIGHT COLUMN: 3D Mouse-Tilt Portrait Card */}
            <motion.div
              className="hero-dossier-col"
              initial={{ opacity: 0, x: reduce ? 0 : 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.14 }}
            >
              <motion.div
                className="dossier-frame"
                style={{
                  rotateX,
                  rotateY,
                  transformPerspective: 1100
                }}
              >
                {/* Top Strip */}
                <div className="dossier-topbar">
                  <span className="t-label">QA PROFILE // AT-2026</span>
                  <span className="dossier-dots" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span className="t-label dossier-clearance">VERIFIED</span>
                </div>

                {/* Portrait Canvas with Multi-Layer Mouse Parallax */}
                <div className="dossier-stage">
                  <motion.div
                    className="dossier-grid-overlay"
                    aria-hidden="true"
                    style={{ x: gridShiftX, y: gridShiftY }}
                  />

                  {/* Clean Floating Metric Stamps */}
                  <motion.div
                    className="dossier-stamp dossier-stamp-tl"
                    style={{ x: stampShiftX, y: stampShiftY }}
                  >
                    <span className="t-label text-stone">API COVERAGE</span>
                    <strong className="font-display">80+ ENDPOINTS</strong>
                  </motion.div>

                  <motion.div
                    className="dossier-stamp dossier-stamp-bl"
                    style={{ x: stampShiftX, y: stampShiftY }}
                  >
                    <span className="t-label text-stone">SECURITY FOCUS</span>
                    <strong className="font-display">BOLA &amp; IDOR</strong>
                  </motion.div>

                  <motion.div
                    className="portrait-note"
                    style={{ x: stampShiftX }}
                    initial={{ opacity: 0, rotate: reduce ? 0 : -6 }}
                    animate={{ opacity: 1, rotate: -3 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
                  >
                    <p>Yes, that&apos;s me!</p>
                  </motion.div>

                  <motion.div
                    className="hero-portrait-motion"
                    style={{
                      x: portraitShiftX,
                      y: portraitScrollY
                    }}
                  >
                    <motion.img
                      className="hero-portrait"
                      src="/hero-portrait.png"
                      alt="Stylized side profile portrait of Abhinandan Tiwari"
                      style={{
                        scale: portraitScale,
                        y: portraitShiftY
                      }}
                    />
                  </motion.div>
                </div>

                {/* Bottom Dossier Footer Bar */}
                <div className="dossier-footerbar">
                  <div className="dossier-footer-item">
                    <span className="t-label text-stone">PLATFORMS</span>
                    <span className="t-label">WEB &middot; ANDROID &middot; iOS</span>
                  </div>
                  <div className="dossier-footer-item">
                    <span className="t-label text-stone">CORE TOOLS</span>
                    <span className="t-label">POSTMAN &middot; BURP SUITE</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Dual-Row Marquee Strip */}
      {tickerRows.length > 0 && (
        <div className="ticker-section">
          <div className="kk-ticker">
            {tickerRows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`ticker-row ${
                  rowIndex === 0 ? "ticker-row-left" : "ticker-row-right"
                }`}
              >
                <div className="ticker-track">
                  {[...row, ...row, ...row].map((item, idx) => (
                    <span key={`${item}-${idx}`} className="ticker-item">
                      <span className="ticker-text">{item}</span>
                      <span className="diamond-dot" aria-hidden="true" />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}


