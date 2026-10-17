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
    title: "Public Developer API Contract Suites",
    subtitle: "Modular Postman Collections & Schema Validation",
    deliverable: "Automated Postman Suite + Env Matrix",
    tools: ["Postman", "JSON Schema", "Pre-Request Scripts", "REST APIs"],
    summary:
      "Built modular Postman collections for public developer APIs using dynamic token handshakes, chained environment variables, and strict status/schema assertions across 80+ endpoints.",
    assertions: [
      {
        code: "ASSERT-01",
        check: "Status code & response header contracts (200, 201, 400, 401, 403, 422)",
        status: "80+ APIs LOCKED"
      },
      {
        code: "ASSERT-02",
        check: "Strict JSON schema structure, nested data types & required field validation",
        status: "SCHEMA VERIFIED"
      },
      {
        code: "ASSERT-03",
        check: "Dynamic pre-request auth token handshakes & negative payload rejection",
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
    title: "BOLA, IDOR & Multi-Tenant RBAC Auditing",
    subtitle: "Object-Level Authorization & Workspace Isolation",
    deliverable: "Burp Suite Tamper Log & Security Advisory",
    tools: ["Burp Suite", "Postman", "Browser DevTools", "RBAC Matrix"],
    summary:
      "Intercepted live API traffic via Burp Suite and Postman to substitute user IDs, channel IDs, and workspace headers — catching critical BOLA/IDOR flaws before production.",
    assertions: [
      {
        code: "SEC-01",
        check: "Cross-user & cross-channel resource ID tampering on DELETE/PUT/PATCH routes",
        status: "BOLA BLOCKED"
      },
      {
        code: "SEC-02",
        check: "Agency multi-tenant workspace isolation & role boundary enforcement",
        status: "RBAC ISOLATED"
      },
      {
        code: "SEC-03",
        check: "Horizontal & vertical privilege escalation attempts across member roles",
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
    title: "Authentication, Session & OTP Rate-Limit Review",
    subtitle: "Brute-Force Protection & Token Lifecycle Hardening",
    deliverable: "Auth Hardening & Rate-Limit Verification Dossier",
    tools: ["Postman Runner", "Burp Intruder", "JWT Inspector", "DevTools"],
    summary:
      "Stress-tested signup, login, password recovery, and SMS/Email OTP verification endpoints under rapid burst conditions to enforce rate limiting and lockout policies.",
    assertions: [
      {
        code: "AUTH-01",
        check: "Rapid burst OTP validation testing to prevent brute-force account takeover",
        status: "429 RATE-LIMITED"
      },
      {
        code: "AUTH-02",
        check: "Account lockout threshold, cooldown timer & OTP expiration enforcement",
        status: "LOCKOUT ACTIVE"
      },
      {
        code: "AUTH-03",
        check: "Session token invalidation on logout/password reset & JWT replay rejection",
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
    title: "Multi-Platform E2E & Developer-First Bug Reports",
    subtitle: "Stateful SaaS Workflows & Reproducible Defect Logs",
    deliverable: "cURL + HAR Defect Logs & Release Sign-Off",
    tools: ["Web QA", "Android & iOS", "HAR Network Traces", "Agile Sprints"],
    summary:
      "Spearheaded end-to-end functional, UI, and exploratory QA for real-time Kanban boards and agency workspaces across Web, Android, and iOS with first-pass reproducible defect logs.",
    assertions: [
      {
        code: "PLAT-01",
        check: "Real-time multi-user Kanban board drag-and-drop & state sync verification",
        status: "SYNC VERIFIED"
      },
      {
        code: "PLAT-02",
        check: "Cross-platform functional, UI & regression runs across Web, Android & iOS",
        status: "3x PLATFORMS"
      },
      {
        code: "PLAT-03",
        check: "Exact reproduction steps, expected-vs-actual & attached network captures",
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
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (idx: string) => {
    setFlippedCards((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const activeModule = QA_WORKBENCH_MODULES[activeIdx] ?? QA_WORKBENCH_MODULES[0];

  return (
    <div className="protocol-wrapper">
      {/* Original QA Execution Workbench (No comparison!) */}
      <div className="kk-wrap benchmark-block">
        <div className="benchmark-intro-grid">
          <div className="benchmark-intro-left">
            <span className="t-label text-vermillion-deep section-eyebrow">
              <span className="diamond-dot" aria-hidden="true" />
              QA Architecture &amp; Verification Standard
            </span>
            <h2 className="t-xl benchmark-headline">
              <span>Testing that</span>{" "}
              <span className="text-vermillion">earns developer trust.</span>
            </h2>
          </div>
          <p className="benchmark-intro-copy">{intro}</p>
        </div>

        <div className="qa-workbench-panel">
          <div className="workbench-topbar">
            <div className="workbench-topbar-left">
              <span className="t-label workbench-badge-primary">
                WORKBENCH // QA-2026
              </span>
              <span className="t-label text-stone">
                Select a verification pillar to inspect my execution &amp; deliverables
              </span>
            </div>
            <span className="t-label workbench-status-pill">
              <span className="pulse-dot-secondary" aria-hidden="true" />
              ACTIVE PROTOCOL: {activeModule.code}
            </span>
          </div>

          <div className="workbench-main-grid">
            {/* Left Column: 4 Interactive Pillar Selector Cards */}
            <div
              className="workbench-rail"
              role="tablist"
              aria-label="Abhinandan QA Execution Pillars"
            >
              {QA_WORKBENCH_MODULES.map((mod, idx) => {
                const isSelected = idx === activeIdx;
                return (
                  <button
                    key={mod.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveIdx(idx)}
                    onMouseEnter={() => setActiveIdx(idx)}
                    className={`workbench-tab-card ${isSelected ? "is-active" : ""}`}
                  >
                    <div className="workbench-tab-head">
                      <span className="t-label workbench-tab-code">{mod.code}</span>
                      <span className="t-label workbench-tab-tag">{mod.tag}</span>
                    </div>
                    <h3 className="kk-condensed workbench-tab-title">{mod.title}</h3>
                    <span className="t-label workbench-tab-sub">{mod.subtitle}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Live Execution Blueprint & Artifact Trace */}
            <div className="workbench-stage" key={activeModule.id} role="tabpanel">
              <div className="workbench-stage-header">
                <div>
                  <span className="t-label text-vermillion-deep">
                    {activeModule.code} &middot; {activeModule.subtitle}
                  </span>
                  <h4 className="t-l workbench-stage-title">{activeModule.title}</h4>
                </div>
                <div className="workbench-deliverable-box">
                  <span className="t-label text-stone">PRIMARY DELIVERABLE</span>
                  <span className="t-label workbench-deliverable-val">
                    {activeModule.deliverable}
                  </span>
                </div>
              </div>

              <p className="workbench-stage-summary">{activeModule.summary}</p>

              <div className="workbench-assertions-block">
                <div className="workbench-section-label">
                  <span className="t-label text-stone">
                    KEY ASSERTIONS &amp; CHECKS EXECUTED
                  </span>
                  <span className="t-label text-vermillion-deep">
                    3 / 3 VERIFIED
                  </span>
                </div>
                <ul className="workbench-assertions-list">
                  {activeModule.assertions.map((a) => (
                    <li key={a.code} className="workbench-assertion-row">
                      <span className="t-label assertion-code">{a.code}</span>
                      <span className="assertion-check">{a.check}</span>
                      <span className="t-label assertion-status">{a.status}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dark Retro Blueprint Telemetry Console */}
              <div className="workbench-trace-console">
                <div className="workbench-trace-head">
                  <span className="t-label">{activeModule.traceTitle}</span>
                  <div className="workbench-tools-list">
                    {activeModule.tools.map((tool) => (
                      <span key={tool} className="t-label workbench-tool-chip">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="workbench-trace-body">
                  {activeModule.traceLines.map((line, i) => (
                    <code key={i} className="workbench-trace-line">
                      {line}
                    </code>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Part B: 4-Step QA Protocol Playing Card Deck */}
      <div className="kk-wrap deck-section">
        <svg
          aria-hidden="true"
          className="deck-cord-svg"
          viewBox="0 0 1000 320"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 150 C 260 40, 420 280, 640 160 S 900 60, 1000 180"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
        </svg>

        <header className="deck-header">
          <div>
            <span className="t-label text-vermillion-deep section-eyebrow">
              <span className="diamond-dot" aria-hidden="true" />
              Recon &rarr; Intercept &rarr; Automate &rarr; Verify
            </span>
            <h3 className="t-xl">
              The 4-step <span className="text-vermillion">QA protocol.</span>
            </h3>
          </div>
          <span className="t-label text-stone">
            Click any card to flip &middot; Deal the deck &darr;
          </span>
        </header>

        <ol className="protocol-deck-grid">
          {protocolSteps.map((step) => {
            const isFlipped = Boolean(flippedCards[step.index]);
            return (
              <li key={step.index} className="protocol-card-slot">
                <button
                  type="button"
                  onClick={() => toggleCard(step.index)}
                  className="protocol-card-btn"
                  data-flipped={isFlipped ? "true" : "false"}
                  aria-label={`${step.index} ${step.title} — Click to flip card`}
                >
                  <div className="protocol-card-inner">
                    {/* Card Face */}
                    <div className="protocol-card-face">
                      <div className="protocol-card-top">
                        <span className="font-display protocol-card-num">
                          {step.index}
                        </span>
                        <span className="protocol-card-suit" aria-hidden="true">
                          &#9830;
                        </span>
                      </div>
                      <h4 className="kk-condensed protocol-card-title">
                        {step.title}
                      </h4>
                      <span className="t-label text-stone protocol-card-cadence">
                        {step.cadence}
                      </span>
                      <span className="protocol-card-dash" aria-hidden="true" />
                      <p className="protocol-card-summary">{step.summary}</p>
                      <div className="protocol-card-bottom" aria-hidden="true">
                        <span className="font-display protocol-bottom-title">
                          {step.title}
                        </span>
                        <span className="font-display protocol-bottom-num">
                          {step.index}
                        </span>
                      </div>
                    </div>

                    {/* Ornate Retro Card Back */}
                    <div className="protocol-card-back" aria-hidden="true">
                      <span className="protocol-back-pattern" />
                      <span className="protocol-back-frame-outer" />
                      <span className="protocol-back-frame-inner" />
                      <span className="protocol-back-medallion">
                        <span className="font-display">QA</span>
                      </span>
                      <span className="font-display protocol-back-corner-tl">
                        {step.index}
                      </span>
                      <span className="font-display protocol-back-corner-br">
                        {step.index}
                      </span>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

/* ============================================================
   Deep Midnight Specialization Panel
   ============================================================ */

export function PineFeaturePanel() {
  const [tab, setTab] = useState<"security" | "functional">("security");

  const content =
    tab === "security"
      ? {
          watermark: "SECURITY",
          headline: "Permission boundaries don't break on my watch.",
          subcopy:
            "Every API endpoint, tenant workspace, and authentication token is stress-tested for BOLA/IDOR, privilege escalation, and rate-limit bypasses before release.",
          items: [
            {
              num: "01",
              title: "BOLA & IDOR Tampering",
              desc: "Cross-user & cross-channel resource ID substitution via Burp Suite and Postman."
            },
            {
              num: "02",
              title: "Auth & OTP Hardening",
              desc: "Burst rate-limit verification, token expiration, and session replay checks."
            },
            {
              num: "03",
              title: "Schema & Contract Locks",
              desc: "80+ public developer endpoints validated against silent schema regressions."
            }
          ],
          statLabel: "Critical & High Auth Flaws Caught Pre-Production",
          statBig: "100%",
          bar1Label: "Object-level authorization (BOLA / IDOR) coverage",
          bar1Scale: 1,
          bar2Label: "Multi-tenant RBAC & rate-limit enforcement",
          bar2Scale: 1
        }
      : {
          watermark: "PLATFORMS",
          headline: "Built for real users across Web, Android & iOS.",
          subcopy:
            "From real-time multi-user Kanban boards to agency workspace switching, I test complex stateful workflows where standard happy-path scripts fail.",
          items: [
            {
              num: "01",
              title: "Multi-Tenant SaaS QA",
              desc: "End-to-end workspace isolation, role permissions, and real-time Kanban sync."
            },
            {
              num: "02",
              title: "Web, Android & iOS",
              desc: "Exploratory, UI, and regression testing across mobile and desktop builds."
            },
            {
              num: "03",
              title: "Developer-First Bug Logs",
              desc: "Reproducible steps, expected-vs-actual, and HAR/network request captures."
            }
          ],
          statLabel: "Platforms Verified in Weekly Agile Sprints",
          statBig: "3x",
          bar1Label: "Web, Android & iOS cross-platform matrix",
          bar1Scale: 1,
          bar2Label: "First-pass defect reproducibility with network traces",
          bar2Scale: 0.99
        };

  return (
    <div className="kk-wrap pine-section-wrap">
      <div className="pine-panel">
        <span aria-hidden="true" className="font-display pine-watermark">
          {content.watermark}
        </span>

        <header className="pine-header">
          <div className="pine-header-left">
            <span className="t-label pine-eyebrow">
              <span className="ember-dot" aria-hidden="true" />
              Domain Specialization
            </span>
            <h3 className="t-xl pine-title">
              Built for <span className="text-ember">API security</span> &amp; SaaS scale.
            </h3>
          </div>

          <div role="tablist" aria-label="Pick a testing focus" className="pine-tabs">
            <span
              aria-hidden="true"
              className="pine-tab-pill"
              data-tab={tab}
            />
            <button
              type="button"
              role="tab"
              aria-selected={tab === "security"}
              onClick={() => setTab("security")}
              className={`t-label pine-tab-btn ${tab === "security" ? "is-active" : ""}`}
            >
              API &amp; Security
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "functional"}
              onClick={() => setTab("functional")}
              className={`t-label pine-tab-btn ${tab === "functional" ? "is-active" : ""}`}
            >
              Web &amp; Mobile QA
            </button>
          </div>
        </header>

        <div className="pine-body-grid" key={tab}>
          <div className="pine-body-left">
            <div className="pine-lead-block">
              <p className="font-display pine-big-statement">{content.headline}</p>
              <p className="pine-subcopy">{content.subcopy}</p>
            </div>

            <div className="pine-list-wrap">
              <span className="t-label pine-list-caption">What I execute</span>
              <ol className="pine-list">
                {content.items.map((item) => (
                  <li key={item.num} className="pine-list-row">
                    <span className="t-label pine-row-num">{item.num}</span>
                    <div className="pine-row-text">
                      <span className="kk-condensed pine-row-title">{item.title}</span>
                      <span className="pine-row-desc">{item.desc}</span>
                    </div>
                    <span className="pine-row-arrow" aria-hidden="true">
                      &rarr;
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="pine-body-right">
            <div className="pine-stat-card">
              <span className="t-label text-stone">{content.statLabel}</span>
              <span className="font-display pine-stat-big">{content.statBig}</span>
              <div className="pine-bars">
                <div className="pine-bar-group">
                  <span className="t-label text-graphite">{content.bar1Label}</span>
                  <span className="pine-bar-track">
                    <span
                      className="pine-bar-fill-accent"
                      style={{ transform: `scaleX(${content.bar1Scale})` }}
                    />
                  </span>
                </div>
                <div className="pine-bar-group">
                  <span className="t-label text-graphite">{content.bar2Label}</span>
                  <span className="pine-bar-track">
                    <span
                      className="pine-bar-fill-accent"
                      style={{ transform: `scaleX(${content.bar2Scale})` }}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Interactive Stat Cards Grid (Referenced from KKM #numbers)
   ============================================================ */

export function StatGrid({ stats }: { stats: StatItem[] }) {
  return (
    <ul className="stat-grid">
      {stats.map((st) => (
        <li key={st.index} tabIndex={0} className="stat-card">
          <span aria-hidden="true" className="stat-card-ink-sweep" />
          <span aria-hidden="true" className="stat-card-glow" />
          <div className="stat-card-top">
            <span className="t-label stat-card-idx">{st.index}</span>
            <span className="t-label stat-card-tag">{st.tag}</span>
          </div>
          <div className="stat-card-bottom">
            <span className="font-display stat-card-val">{st.value}</span>
            <span className="stat-card-cord" aria-hidden="true">
              <span className="stat-card-cord-fill" />
            </span>
            <span className="stat-card-label">{st.label}</span>
            <p className="stat-card-detail">{st.detail}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

