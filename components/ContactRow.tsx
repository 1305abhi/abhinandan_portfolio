"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useState } from "react";
import type { ContactLink } from "@/data/portfolio";

const EASE = [0.16, 1, 0.3, 1] as const;

type ContactRowProps = {
  link: ContactLink;
  index?: number;
};

export function ContactRow({ link, index = 0 }: ContactRowProps) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } }
  };

  return (
    <motion.div className="contact-row" variants={variants}>
      <span aria-hidden="true" className="skills-hover-bar" />
      <span className="contact-row-label">
        <span className="contact-row-idx">0{index + 1}</span> &middot; {link.label}
      </span>
      <a
        href={link.href}
        target={link.href.startsWith("http") ? "_blank" : undefined}
        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="contact-row-link"
      >
        {link.value} <span className="kk-arrow" aria-hidden="true">&rarr;</span>
      </a>
    </motion.div>
  );
}

const QA_SCOPES = [
  "Full-Time Quality Analyst Role",
  "Postman API Test Suite",
  "API Security & Access Control (IDOR)",
  "Web & Mobile QA Testing",
  "User Roles & Permissions Testing",
  "Login & Rate-Limit Testing",
  "Release Sign-Off & Verification"
];

type ContactBuilderProps = {
  email: string;
  linkedinUrl: string;
};

export function ContactBuilder({ email, linkedinUrl }: ContactBuilderProps) {
  const [selected, setSelected] = useState<string[]>([
    "Full-Time Quality Analyst Role",
    "API Security & Access Control (IDOR)"
  ]);

  const toggleScope = (scope: string) => {
    setSelected((prev) =>
      prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]
    );
  };

  const subject = encodeURIComponent(
    `QA / Security Inquiry: ${selected.slice(0, 2).join(" & ") || "Let's Talk"}`
  );
  const body = encodeURIComponent(
    `Hi Abhinandan,\n\nI checked out your portfolio and would love to connect regarding:\n${
      selected.length > 0 ? selected.map((s) => `- ${s}`).join("\n") : "- Quality Assurance / API Security"
    }\n\nLet's set up a quick chat!`
  );

  return (
    <div className="contact-builder-card">
      <span aria-hidden="true" className="skills-hover-bar" />
      <div className="contact-builder-top">
        <span className="skills-code-pill">SCOPE BUILDER</span>
        <span className="t-label text-muted">Select 1 or more priorities</span>
      </div>

      <div className="contact-builder-body">
        <h3 className="contact-builder-title">What can I help verify or test?</h3>
        <p className="contact-builder-sub">
          Click any focus areas below to pre-configure a direct outreach brief.
        </p>

        <div className="contact-pills-wrap" role="group" aria-label="Select QA scopes">
          {QA_SCOPES.map((scope) => {
            const isActive = selected.includes(scope);
            return (
              <button
                key={scope}
                type="button"
                aria-pressed={isActive}
                onClick={() => toggleScope(scope)}
                className={`contact-scope-pill ${isActive ? "is-selected" : ""}`}
              >
                <span className="scope-pill-check" aria-hidden="true">
                  {isActive ? "✓" : "+"}
                </span>
                {scope}
              </button>
            );
          })}
        </div>
      </div>

      <div className="contact-builder-footer">
        <a
          href={`mailto:${email}?subject=${subject}&body=${body}`}
          className="kk-btn kk-btn--solid contact-launch-btn"
        >
          Send Configured Brief{" "}
          <span className="kk-arrow" aria-hidden="true">
            &rarr;
          </span>
        </a>
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="kk-btn kk-btn--secondary"
        >
          LinkedIn / abhinandantiwari{" "}
          <span className="kk-arrow" aria-hidden="true">
            ↗
          </span>
        </a>
      </div>
    </div>
  );
}

type RetroFooterProps = {
  email: string;
  linkedinUrl: string;
};

export function RetroFooter({ email, linkedinUrl }: RetroFooterProps) {
  return (
    <footer className="retro-footer">
      <div className="kk-wrap retro-footer-inner">
        <div className="retro-footer-top">
          <div>
            <span className="t-label skills-eyebrow-line">
              <span className="skills-eyebrow-dot" aria-hidden="true" />
              <span>QA &middot; API SECURITY &middot; EXPLORATORY</span>
            </span>
            <p className="retro-footer-statement">
              Let&apos;s build software that <span className="text-vermillion">holds up.</span>
            </p>
          </div>
          <div className="retro-footer-ctas">
            <a href={`mailto:${email}`} className="kk-btn kk-btn--solid">
              Email Abhinandan <span className="kk-arrow" aria-hidden="true">&rarr;</span>
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="kk-btn kk-btn--secondary"
            >
              LinkedIn <span className="kk-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="retro-footer-bottom">
          <span className="t-label retro-footer-brand">
            &copy; 2026 Abhinandan Tiwari &middot; Quality Analyst
          </span>
          <div className="retro-footer-links">
            <a href="#skills" className="t-label retro-link">Capabilities</a>
            <a href="#protocol" className="t-label retro-link">QA Protocol</a>
            <a href="#experience" className="t-label retro-link">Experience</a>
            <a href="#case-studies" className="t-label retro-link">Case Studies</a>
            <a href={`mailto:${email}`} className="t-label retro-link">{email}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
