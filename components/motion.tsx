"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useState, type ReactNode } from "react";
import type { ProtocolStep, StatItem } from "@/data/portfolio";

// Shared easing so every animation on the page feels like one hand.
export const EASE = [0.16, 1, 0.3, 1] as const;

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

export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  y = 30,
  once = true,
  amount = 0.3,
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

/* ============================================================
   Original QA Execution Workbench + 4-Step Playing Card Deck
   ============================================================ */

type BenchmarkProps = {
  intro: string;
  benchmark?: {
    eyebrow: string;
    title: string;
    metrics: {
      label: string;
      ours: string;
      theirs: string;
      ourScale: number;
      theirScale: number;
    }[];
    pillars: string[];
    proofs: { label: string; value: string }[];
  };
  protocolSteps: ProtocolStep[];
};

const QA_WORKBENCH_MODULES = [
  {
    id: "contract",
    code: "MOD-01",
    tag: "80+ ENDPOINTS",
    title: "Public Developer API Test Suites",
    subtitle: "Automated Postman Suites & Schema Validation",
    deliverable: "Automated Postman Suite + Environment Matrix",
    tools: ["Postman", "JSON Schema", "Pre-Request Scripts", "REST APIs"],
    summary:
      "Created automated Postman test collections for public developer APIs, handling login tokens automatically and verifying HTTP status codes, data types, and response structure across 80+ endpoints.",
    assertions: [
      {
        code: "ASSERT-01",
        check: "Status code & response header checks (200, 201, 400, 401, 403, 422)",
        status: "80+ APIs LOCKED"
      },
      {
        code: "ASSERT-02",
        check: "JSON schema validation for nested structures and required data fields",
        status: "SCHEMA VERIFIED"
      },
      {
        code: "ASSERT-03",
        check: "Automatic auth token handling and invalid payload rejection",
        status: "AUTOMATED"
      }
    ],
    traceTitle: "POSTMAN // CONTRACT RUNNER TELEMETRY",
    traceLines: [
      "▶ RUN: Public Developer API Suite (84 requests · 252 assertions)",
      "✓ [POST /v2/oauth/token] -> 200 OK · env.auth_token refreshed",
      "✓ [GET  /v2/workspaces/{id}/posts] -> Schema & types matched (142ms)",
      "✓ [POST /v2/channels/publish] -> 422 Unprocessable on malformed payload"
    ]
  },
  {
    id: "security",
    code: "MOD-02",
    tag: "ZERO LEAKS",
    title: "Access Control & Permission Audits (BOLA / IDOR)",
    subtitle: "Data Privacy & Multi-User Workspace Isolation",
    deliverable: "Security Tamper Log & Audit Report",
    tools: ["Burp Suite", "Postman", "Browser DevTools", "RBAC Matrix"],
    summary:
      "Intercepted live API traffic using Burp Suite and Postman, swapping user IDs, channel IDs, and workspace headers to catch unauthorized access flaws before release.",
    assertions: [
      {
        code: "SEC-01",
        check: "Tested swapping user and channel IDs on delete and update requests",
        status: "BOLA BLOCKED"
      },
      {
        code: "SEC-02",
        check: "Verified that multi-tenant workspaces keep client data strictly separated",
        status: "RBAC ISOLATED"
      },
      {
        code: "SEC-03",
        check: "Checked role permissions to prevent unauthorized privilege escalation",
        status: "403 ENFORCED"
      }
    ],
    traceTitle: "BURP SUITE // INTERCEPTED TAMPER LOG",
    traceLines: [
      "▶ INTERCEPT: DELETE /api/v1/channels/ch_90412 HTTP/1.1",
      "⚡ TAMPER: Substituted Actor Token (User_B) on User_A owned resource",
      "✓ RESPONSE: 403 Forbidden · {\"error\":\"UNAUTHORIZED_RESOURCE_ACCESS\"}",
      "✓ VERDICT: Object-level ownership check verified after patch retest"
    ]
  },
  {
    id: "auth",
    code: "MOD-03",
    tag: "BURST HARDENED",
    title: "Authentication & OTP Rate-Limiting Review",
    subtitle: "Brute-Force Protection & Session Security",
    deliverable: "Auth Verification Dossier & Rate-Limit Test Log",
    tools: ["Postman Runner", "Burp Intruder", "JWT Inspector", "DevTools"],
    summary:
      "Tested login, registration, password reset, and SMS/Email OTP flows under rapid requests to verify rate limits and account lockout protection.",
    assertions: [
      {
        code: "AUTH-01",
        check: "Rapid OTP submission testing to verify brute-force protection",
        status: "429 RATE-LIMITED"
      },
      {
        code: "AUTH-02",
        check: "Account lockout threshold, cooldown timer, and OTP expiration checks",
        status: "LOCKOUT ACTIVE"
      },
      {
        code: "AUTH-03",
        check: "Session termination on logout and password reset to prevent reuse",
        status: "TOKEN HARDENED"
      }
    ],
    traceTitle: "SECURITY // OTP BURST STRESS TEST",
    traceLines: [
      "▶ BURST: POST /api/v1/auth/verify-otp (50 rapid requests / 4.2s)",
      "✓ Attempt 01..05 -> 401 Invalid OTP ( attempts_remaining decremented )",
      "✓ Attempt 06..50 -> 429 Too Many Requests · Retry-After: 900s",
      "✓ VERDICT: Brute-force takeover vector neutralized on server side"
    ]
  },
  {
    id: "platforms",
    code: "MOD-04",
    tag: "WEB · iOS · ANDROID",
    title: "Cross-Platform QA & Developer-Friendly Bug Reports",
    subtitle: "Web, Android & iOS Testing with Reproducible Logs",
    deliverable: "Reproducible Bug Reports with Network Traces & Sign-Off",
    tools: ["Web QA", "Android & iOS", "HAR Network Traces", "Agile Sprints"],
    summary:
      "Tested complex features like real-time Kanban boards and multi-account workspaces across Web, Android, and iOS, providing developers with clear, reproducible bug reports.",
    assertions: [
      {
        code: "PLAT-01",
        check: "Real-time drag-and-drop and live sync testing on multi-user Kanban boards",
        status: "SYNC VERIFIED"
      },
      {
        code: "PLAT-02",
        check: "Hands-on UI, functional, and regression testing across Web, Android, and iOS",
        status: "3x PLATFORMS"
      },
      {
        code: "PLAT-03",
        check: "Clear bug reports with exact steps, screenshots, and attached network logs",
        status: "99.4% FIRST-PASS"
      }
    ],
    traceTitle: "DEFECT DOSSIER // REPRODUCIBLE BUG LOG",
    traceLines: [
      "▶ ISSUE: Kanban card state desync on concurrent workspace role switch",
      "✓ ATTACHED: HAR network capture + cURL replay + screen recording",
      "✓ ENVIRONMENT: Web (Chrome 132) · Android 14 · iOS 18.2 verified",
      "✓ SIGN-OFF: Patch verified in sprint regression · Zero regressions"
    ]
  }
];

export function BenchmarkAndDeck({
  intro,
  protocolSteps
}: BenchmarkProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activeModule = QA_WORKBENCH_MODULES[activeIdx] ?? QA_WORKBENCH_MODULES[0];

  return (
    <div className="protocol-minimal-wrapper">
      <div className="kk-wrap">
        {/* Minimal Section Header */}
        <header className="protocol-minimal-header">
          <div className="protocol-header-lead">
            <div className="t-label skills-eyebrow-line">
              <span className="skills-eyebrow-dot" aria-hidden="true" />
              <span className="skills-eyebrow-index">02</span>
              <span className="skills-eyebrow-sep">/</span>
              <span>QA PROTOCOL</span>
            </div>
            <h2 className="protocol-minimal-title">
              How I verify. <span className="skills-title-accent">The 4-step sequence.</span>
            </h2>
          </div>
          <p className="protocol-header-note">{intro}</p>
        </header>

        {/* 4-Phase Clean Architectural Cards */}
        <div className="protocol-step-grid">
          {protocolSteps.map((step) => (
            <article key={step.index} className="protocol-step-card">
              <span aria-hidden="true" className="protocol-hover-bar" />
              <div className="protocol-card-top">
                <span className="protocol-phase-pill">PHASE // {step.index}</span>
                <span className="protocol-step-cadence">{step.cadence}</span>
              </div>
              <h3 className="protocol-step-title">{step.title}</h3>
              <p className="protocol-step-summary">{step.summary}</p>
            </article>
          ))}
        </div>

        {/* Minimal Interactive Workbench Detail */}
        <div className="workbench-minimal-panel">
          <div className="workbench-panel-head">
            <div className="workbench-head-left">
              <span className="t-label workbench-tag">EXECUTION BENCH</span>
              <span className="workbench-head-title">Select a core domain to inspect execution deliverables &amp; checks:</span>
            </div>
            <span className="t-label workbench-live-chip">
              <span className="pulse-dot-secondary" aria-hidden="true" />
              {activeModule.code} ACTIVE
            </span>
          </div>

          {/* Module Selector Pill Tabs */}
          <div className="workbench-tab-row" role="tablist" aria-label="Verification domain modules">
            {QA_WORKBENCH_MODULES.map((mod, idx) => {
              const isSelected = idx === activeIdx;
              return (
                <button
                  key={mod.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveIdx(idx)}
                  className={`workbench-tab-pill ${isSelected ? "is-active" : ""}`}
                >
                  <span className="tab-pill-code">{mod.code}</span>
                  <span className="tab-pill-title">{mod.title}</span>
                </button>
              );
            })}
          </div>

          {/* Clean 2-Column Execution Detail */}
          <div className="workbench-detail-grid" key={activeModule.id}>
            <div className="workbench-detail-left">
              <div className="workbench-module-header">
                <span className="workbench-deliverable-chip">DELIVERABLE: {activeModule.deliverable}</span>
                <h4 className="workbench-module-title">{activeModule.title}</h4>
                <p className="workbench-module-summary">{activeModule.summary}</p>
              </div>

              <div className="workbench-checks-block">
                <span className="t-label workbench-checks-title">KEY VERIFICATIONS EXECUTED:</span>
                <ul className="workbench-checks-list">
                  {activeModule.assertions.map((a) => (
                    <li key={a.code} className="workbench-check-item">
                      <span className="check-status-pill">{a.status}</span>
                      <span className="check-text">{a.check}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="workbench-detail-right">
              <div className="workbench-trace-header">
                <span className="t-label trace-head-title">{activeModule.traceTitle}</span>
                <div className="trace-tools-row">
                  {activeModule.tools.map((t) => (
                    <span key={t} className="trace-tool-pill">{t}</span>
                  ))}
                </div>
              </div>
              <div className="workbench-trace-lines">
                {activeModule.traceLines.map((line, i) => (
                  <div key={i} className="trace-line">{line}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Minimal Domain Specialization Panel
   ============================================================ */

export function PineFeaturePanel() {
  const [tab, setTab] = useState<"security" | "functional">("security");
  const content =
    tab === "security"
      ? {
          headline: "Permission boundaries don't break on my watch.",
          subcopy:
            "I test every API endpoint, account boundary, and login token to catch access control flaws (BOLA/IDOR), role bypasses, and rate-limiting gaps before production.",
          points: [
            { num: "01", title: "Access Control & IDOR Checks", desc: "Testing what happens when users swap IDs to access private data." },
            { num: "02", title: "Login & OTP Security", desc: "Checking rate limits, session timeouts, and password reset security." },
            { num: "03", title: "API Response Validation", desc: "Verifying 80+ endpoints so unexpected changes don't break integrations." }
          ],
          statBig: "100%",
          statLabel: "Access Flaws Intercepted Pre-Production"
        }
      : {
          headline: "Built for real users across Web, Android & iOS.",
          subcopy:
            "From real-time Kanban updates to multi-account workspace switching, I test real-world user flows where simple automated scripts often miss bugs.",
          points: [
            { num: "01", title: "Multi-Account SaaS QA", desc: "Testing workspace isolation, team roles, and real-time data sync." },
            { num: "02", title: "Web, Android & iOS", desc: "Hands-on exploratory, UI, and regression testing on real devices." },
            { num: "03", title: "Developer-Friendly Bug Logs", desc: "Clear reproduction steps, expected vs. actual outcomes, and network logs." }
          ],
          statBig: "3x",
          statLabel: "Platforms Verified in Weekly Agile Sprints"
        };

  return (
    <div className="kk-wrap pine-minimal-wrap">
      <div className="pine-minimal-card">
        <div className="pine-minimal-top">
          <div className="pine-top-left">
            <span className="t-label skills-code-pill">DEPTH</span>
            <span className="pine-top-kicker">DOMAIN SPECIALIZATION</span>
          </div>
          <div className="pine-tab-group" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={tab === "security"}
              onClick={() => setTab("security")}
              className={`pine-tab-btn ${tab === "security" ? "is-active" : ""}`}
            >
              API &amp; Security
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "functional"}
              onClick={() => setTab("functional")}
              className={`pine-tab-btn ${tab === "functional" ? "is-active" : ""}`}
            >
              Web &amp; Mobile QA
            </button>
          </div>
        </div>

        <div className="pine-minimal-body">
          <div className="pine-body-info">
            <h3 className="pine-statement-title">{content.headline}</h3>
            <p className="pine-statement-sub">{content.subcopy}</p>

            <div className="pine-points-list">
              {content.points.map((pt) => (
                <div key={pt.num} className="pine-point-item">
                  <span className="t-label pine-point-num">{pt.num}</span>
                  <div>
                    <strong className="pine-point-heading">{pt.title}</strong>
                    <p className="pine-point-desc">{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pine-minimal-stat">
            <span className="font-display pine-stat-number">{content.statBig}</span>
            <span className="pine-stat-caption">{content.statLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Minimal Stat Cards Grid
   ============================================================ */

export function StatGrid({ stats }: { stats: StatItem[] }) {
  return (
    <ul className="stat-minimal-grid">
      {stats.map((st) => (
        <li key={st.index} className="stat-minimal-card">
          <span aria-hidden="true" className="skills-hover-bar" />
          <div className="stat-card-top">
            <span className="t-label stat-idx-pill">{st.index}</span>
            <span className="t-label stat-tag-pill">{st.tag}</span>
          </div>
          <span className="font-display stat-number-big">{st.value}</span>
          <span className="stat-label-title">{st.label}</span>
          <p className="stat-detail-text">{st.detail}</p>
        </li>
      ))}
    </ul>
  );
}

