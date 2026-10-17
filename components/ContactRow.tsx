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
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } }
  };

  return (
    <motion.div className="contact-row" variants={variants}>
      <span className="t-label contact-row-label">
        <span className="text-stone">0{index + 1}</span> &middot; {link.label}
      </span>
      <a
        href={link.href}
        target={link.href.startsWith("http") ? "_blank" : undefined}
        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="kk-condensed contact-row-link"
      >
        {link.value} <span className="kk-arrow" aria-hidden="true">&rarr;</span>
      </a>
    </motion.div>
  );
}

const QA_SCOPES = [
  "Full-Time Quality Analyst Role",
  "Postman API Contract Suite",
  "BOLA / IDOR Security Audit",
  "Web & Mobile Exploratory QA",
  "RBAC & Multi-Tenant Testing",
  "Auth & Rate-Limit Review",
  "Release Pipeline Sign-Off"
];

type ContactBuilderProps = {
  email: string;
  linkedinUrl: string;
};

export function ContactBuilder({ email, linkedinUrl }: ContactBuilderProps) {
  const [selected, setSelected] = useState<string[]>([
    "Full-Time Quality Analyst Role",
    "BOLA / IDOR Security Audit"
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
      <div className="contact-builder-top">
        <span className="t-label text-white-60">Interactive Scope Selector</span>
        <span className="contact-builder-dots" aria-hidden="true">
          <span className="dot-active" />
          <span className={selected.length > 1 ? "dot-active" : ""} />
          <span className={selected.length > 2 ? "dot-active" : ""} />
        </span>
      </div>

      <div className="contact-builder-body">
        <div>
          <h3 className="kk-condensed contact-builder-title">
            What can I help verify or test?
          </h3>
          <p className="contact-builder-sub">
            Pick as many focus areas as you like to pre-configure your outreach.
          </p>
        </div>

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
                  {isActive ? "✓" : ""}
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
          className="kk-btn kk-btn--line-light"
        >
          Connect on LinkedIn{" "}
          <span className="kk-arrow" aria-hidden="true">
            &nearr;
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
  const [cordOffset, setCordOffset] = useState(0);

  return (
    <footer
      className="retro-footer"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const relY = ((e.clientY - rect.top) / rect.height - 0.5) * 90;
        setCordOffset(relY);
      }}
      onPointerLeave={() => setCordOffset(0)}
    >
      {/* Interactive Background Thread Strands */}
      <svg
        aria-hidden="true"
        className="footer-threads-svg"
        viewBox="0 0 1200 500"
        preserveAspectRatio="none"
      >
        <path
          d={`M -50 180 Q 600 ${180 + cordOffset} 1250 180`}
          fill="none"
          stroke="var(--secondary)"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
        <path
          d={`M -50 250 Q 600 ${250 - cordOffset * 1.15} 1250 250`}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
        />
        <path
          d={`M -50 320 Q 600 ${320 + cordOffset * 0.8} 1250 320`}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1.2"
        />
      </svg>

      <div className="kk-wrap retro-footer-hero">
        <span className="t-label text-white-60">
          Move through the threads &middot; Zero permission leaks shipped
        </span>
        <p className="kk-condensed retro-footer-statement">
          Let&apos;s build something that{" "}
          <span className="text-vermillion">holds up.</span>
        </p>
        <div className="retro-footer-ctas">
          <a href={`mailto:${email}`} className="kk-btn kk-btn--white">
            Email Abhinandan <span className="kk-arrow" aria-hidden="true">&rarr;</span>
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="kk-btn kk-btn--line-light"
          >
            LinkedIn / abhinandantiwari{" "}
            <span className="kk-arrow" aria-hidden="true">&nearr;</span>
          </a>
        </div>
      </div>

      <div className="kk-wrap retro-footer-bottom">
        <span className="retro-footer-brand">
          <span className="diamond-dot" aria-hidden="true" />
          <span className="t-label text-white-60">
            &copy; 2026 Abhinandan Tiwari &middot; Quality Analyst
          </span>
        </span>
        <div className="retro-footer-links">
          <a href="#skills" className="kk-link t-label text-white-60">
            Capabilities
          </a>
          <a href="#protocol" className="kk-link t-label text-white-60">
            QA Protocol
          </a>
          <a href="#experience" className="kk-link t-label text-white-60">
            Experience
          </a>
          <a href="#case-studies" className="kk-link t-label text-white-60">
            Case Studies
          </a>
          <a href={`mailto:${email}`} className="kk-link t-label text-white-60">
            {email}
          </a>
        </div>
      </div>
    </footer>
  );
}

