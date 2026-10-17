"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants
} from "framer-motion";
import { useRef, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type HeroProps = {
  kicker: string;
  nameLines: [string, string];
  role: string;
  tags: string[];
  location?: string;
  status?: string;
  tickerRows?: string[][];
};

const TAG_INSPECTOR: Record<
  string,
  {
    code: string;
    method: string;
    endpoint: string;
    verdict: string;
    detail: string;
  }
> = {
  "Postman API Testing": {
    code: "SUITE-01",
    method: "POST",
    endpoint: "/api/v2/collections/contract-run",
    verdict: "200 OK · 80+ SCHEMAS PASSED",
    detail:
      "Modular collections with dynamic token handshakes, pre-request scripts & strict JSON schema assertions."
  },
  "API Security & RBAC": {
    code: "SEC-02",
    method: "DELETE",
    endpoint: "/api/v1/workspaces/tenant_b/channel_42",
    verdict: "403 FORBIDDEN · BOLA BLOCKED",
    detail:
      "Intercepted via Burp Suite: cross-tenant object ID tampering & unauthorized role escalation neutralized."
  },
  "Web & Mobile QA": {
    code: "PLAT-03",
    method: "SYNC",
    endpoint: "matrix://web-android-ios/kanban-board",
    verdict: "3x PLATFORMS · ZERO REGRESSIONS",
    detail:
      "End-to-end functional, UI, and multi-user state synchronization verified across Web, Android, and iOS."
  },
  "Exploratory Testing": {
    code: "EXPL-04",
    method: "BURST",
    endpoint: "/api/v1/auth/verify-otp?attempt=50",
    verdict: "429 RATE LIMIT · LOCKOUT ACTIVE",
    detail:
      "Uncovering edge-case race conditions, silent 500s, and missing rate limits beyond standard happy-path scripts."
  }
};

export function Hero({
  kicker,
  nameLines,
  role,
  tags,
  location = "India → Global",
  status = "Available for QA & Security Engagements",
  tickerRows = []
}: HeroProps) {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [activeTag, setActiveTag] = useState<string>(tags[0] ?? "Postman API Testing");

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -45]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.03]);

  const parent: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.09, delayChildren: 0.06 }
    }
  };

  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } }
  };

  const lineMask: Variants = {
    hidden: { y: reduce ? 0 : "108%" },
    visible: { y: 0, transition: { duration: 0.8, ease: EASE } }
  };

  const activeInspection =
    TAG_INSPECTOR[activeTag] ?? Object.values(TAG_INSPECTOR)[0];

  return (
    <section className="hero-section" aria-label="Hero" id="top" ref={heroRef}>
      <div className="kk-wrap hero-split-layout">
        {/* LEFT COLUMN: Retro Poster Typography + Interactive Specialty Inspector */}
        <motion.div
          className="hero-copy-col"
          variants={parent}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-top-badges" variants={rise}>
            <span className="t-label badge-primary">
              <span className="pulse-dot-secondary" aria-hidden="true" />
              {status}
            </span>
            <span className="t-label badge-outline">{location}</span>
          </motion.div>

          <motion.p className="t-label hero-kicker-line" variants={rise}>
            <span className="kicker-index">00 // INTRO</span> &mdash; {kicker}
          </motion.p>

          <h1 className="t-mega hero-poster-name">
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
          </h1>

          <motion.div className="hero-role-banner" variants={rise}>
            <span className="t-label role-banner-tag">ROLE // SPECIALIZATION</span>
            <p className="hero-role-title">{role}</p>
          </motion.div>

          {/* Interactive Specialty Tags + Live QA Inspector Console */}
          <motion.div className="hero-inspector-box" variants={rise}>
            <div className="inspector-header">
              <span className="t-label">
                Select a specialty to inspect test vector:
              </span>
              <span className="t-label inspector-code-pill">
                {activeInspection.code}
              </span>
            </div>

            <ul className="hero-tag-selector" aria-label="Testing specialities">
              {tags.map((tag) => {
                const isSelected = tag === activeTag;
                return (
                  <li key={tag}>
                    <button
                      type="button"
                      onClick={() => setActiveTag(tag)}
                      onMouseEnter={() => setActiveTag(tag)}
                      className={`hero-tag-btn ${isSelected ? "is-active" : ""}`}
                      aria-pressed={isSelected}
                    >
                      <span className="tag-indicator" aria-hidden="true" />
                      {tag}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="inspector-readout" key={activeTag}>
              <div className="inspector-request-line">
                <span className="t-label method-chip">{activeInspection.method}</span>
                <code className="inspector-endpoint">{activeInspection.endpoint}</code>
                <span className="t-label verdict-chip">{activeInspection.verdict}</span>
              </div>
              <p className="inspector-detail">{activeInspection.detail}</p>
            </div>
          </motion.div>

          <motion.div className="hero-cta-row" variants={rise}>
            <a href="#case-studies" className="kk-btn kk-btn--solid">
              See Case Studies <span className="kk-arrow" aria-hidden="true">&darr;</span>
            </a>
            <a href="#skills" className="kk-btn kk-btn--secondary">
              Explore Capabilities <span className="kk-arrow" aria-hidden="true">&rarr;</span>
            </a>
            <a href="#contact" className="kk-btn kk-btn--line">
              Get in Touch <span className="kk-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Retro Security Dossier Frame + Stylized Portrait */}
        <motion.div
          className="hero-dossier-col"
          initial={{ opacity: 0, x: reduce ? 0 : 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.18 }}
        >
          <div className="dossier-frame">
            {/* Top Dossier Strip */}
            <div className="dossier-topbar">
              <span className="t-label">DOSSIER // AT-2026</span>
              <span className="dossier-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className="t-label dossier-clearance">CLEARANCE: VERIFIED</span>
            </div>

            {/* Portrait Canvas */}
            <div className="dossier-stage">
              <div className="dossier-grid-overlay" aria-hidden="true" />

              {/* Floating Retro Telemetry Stamps */}
              <div className="dossier-stamp dossier-stamp-tl">
                <span className="t-label text-stone">API COVERAGE</span>
                <strong className="font-display">80+ ENDPOINTS</strong>
              </div>

              <div className="dossier-stamp dossier-stamp-bl">
                <span className="t-label text-stone">SECURITY FOCUS</span>
                <strong className="font-display">BOLA &amp; IDOR</strong>
              </div>

              <motion.div
                className="portrait-note"
                initial={{ opacity: 0, rotate: reduce ? 0 : -6 }}
                animate={{ opacity: 1, rotate: -3 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.65 }}
              >
                <p>Yes, that&apos;s me!</p>
              </motion.div>

              <motion.div
                className="hero-portrait-motion"
                style={{ y: portraitY }}
              >
                <motion.img
                  className="hero-portrait"
                  src="/hero-portrait.png"
                  alt="Stylized side profile portrait of Abhinandan Tiwari"
                  style={{ scale: portraitScale }}
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
                <span className="t-label text-stone">ARSENAL</span>
                <span className="t-label">POSTMAN &middot; BURP SUITE</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Dual-Row Marquee Strip */}
      {tickerRows.length > 0 && (
        <div className="ticker-section">
          <div className="kk-wrap ticker-header">
            <span className="t-label text-stone">
              Core testing arsenal &amp; security vectors
            </span>
            <span className="t-label text-stone hide-mobile">Scroll &updownarrow;</span>
          </div>
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


