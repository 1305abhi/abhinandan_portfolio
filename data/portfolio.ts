export type Experience = {
  period: string;
  role: string;
  company: string;
  badge?: string;
  location?: string;
  points: string[];
};

export type CaseStudy = {
  category: string;
  title: string;
  metric?: string;
  metricLabel?: string;
  severity?: string;
  sections: {
    heading: string;
    body: string;
  }[];
  tools: string[];
  featured?: boolean;
};

export type SkillGroup = {
  title: string;
  code?: string;
  items: string[];
  tags?: string[][];
};

export type ContactLink = {
  label: string;
  value: string;
  href: string;
};

export type ProtocolStep = {
  index: string;
  title: string;
  cadence: string;
  summary: string;
};

export type StatItem = {
  index: string;
  tag: string;
  value: string;
  label: string;
  detail: string;
};

export const portfolio = {
  hero: {
    kicker: "Hey, I'm",
    nameLines: ["Abhinandan", "Tiwari"] as [string, string],
    role: "Quality Analyst | API & Security Testing",
    tags: [
      "Postman API Testing",
      "API Security & RBAC",
      "Web & Mobile QA",
      "Exploratory Testing"
    ],
    location: "Vadodara / Ahmedabad, IN → Global",
    status: "Available for QA & Security Engagements"
  },
  tickerRows: [
    [
      "Postman API Collections",
      "BOLA / IDOR Auditing",
      "Burp Suite Traffic Inspection",
      "Multi-Tenant RBAC Verification",
      "JWT & Session Security",
      "JSON Schema Contract Testing",
      "Rate-Limit Stress Testing"
    ],
    [
      "Web · Android · iOS QA",
      "Negative & Boundary Testing",
      "Network Request Profiling",
      "Reproducible Defect Logs",
      "Release Sign-Off Protocol",
      "Kanban & Real-Time Sync QA",
      "Auth & OTP Flow Hardening"
    ]
  ],
  intro:
    "I help product teams ship software they can trust — uncovering hidden permission leaks, stress-testing APIs before release, and writing defect reports developers actually respect.",
  benchmark: {
    eyebrow: "Interactive QA Benchmark Audit",
    title: "Ad-hoc release checks vs. The QA Protocol",
    metrics: [
      {
        label: "API Endpoint & Schema Contract Coverage",
        ours: "80+ Endpoints",
        theirs: "Happy-path only",
        ourScale: 0.96,
        theirScale: 0.28
      },
      {
        label: "Object-Level Authorization (BOLA / IDOR) Verification",
        ours: "100% Tamper-Tested",
        theirs: "UI-role check",
        ourScale: 1,
        theirScale: 0.22
      },
      {
        label: "Defect Reproducibility (Network Logs + Exact Steps)",
        ours: "99.4% First-Pass",
        theirs: "~60% Back-and-forth",
        ourScale: 0.99,
        theirScale: 0.55
      },
      {
        label: "Cross-Platform Release Matrix Owned",
        ours: "Web · iOS · Android",
        theirs: "Single browser",
        ourScale: 1,
        theirScale: 0.33
      }
    ],
    pillars: ["API Security", "Functional QA", "Release Sign-Off"],
    proofs: [
      { label: "Defect report clarity", value: "cURL + HAR" },
      { label: "Auth & RBAC matrices", value: "Multi-Tenant" },
      { label: "Zero silent 500s shipped", value: "Pre-Release" }
    ]
  },
  protocolSteps: [
    {
      index: "01",
      title: "Recon",
      cadence: "Phase 01 · Architecture",
      summary:
        "Map every endpoint, tenant boundary, role matrix, and token lifecycle before writing a single test."
    },
    {
      index: "02",
      title: "Intercept",
      cadence: "Phase 02 · Burp & Postman",
      summary:
        "Tamper with IDs, mutate payloads, replay expired JWTs, and stress-test rate limits under burst conditions."
    },
    {
      index: "03",
      title: "Automate",
      cadence: "Phase 03 · Contract Suite",
      summary:
        "Lock in modular Postman suites with dynamic token handshakes, pre-request scripts, and JSON schema assertions."
    },
    {
      index: "04",
      title: "Verify",
      cadence: "Phase 04 · Sign-Off",
      summary:
        "Deliver developer-ready defect logs with network traces, then re-test patches until every regression passes."
    }
  ] satisfies ProtocolStep[],
  experience: [
    {
      period: "July 2026 – Present",
      role: "Software Tester",
      company: "Social Media Management SaaS",
      badge: "Current Role · SaaS",
      points: [
        "Designed and built comprehensive Postman API test suites for the public developer API, validating status assertions, response schemas, and authentication flows.",
        "Spearheaded end-to-end testing for complex product features including real-time Kanban boards and multi-tenant Agency workspace management.",
        "Verified Role-Based Access Control (RBAC) and data isolation boundaries across shared client workspaces."
      ]
    },
    {
      period: "Jan 2025 – Jul 2026",
      role: "Quality Analyst / Software Tester",
      company: "Zluck Solutions",
      badge: "Full-Stack QA · 1.5 Yrs",
      points: [
        "Led end-to-end functional, UI, and exploratory QA across Web, Android, and iOS platforms.",
        "Performed deep API security reviews using Postman, DevTools, and Burp Suite to identify authorization flaws and rate-limiting gaps.",
        "Documented high-severity vulnerabilities with reproducible steps, expected-vs-actual results, and network request logs."
      ]
    },
    {
      period: "Dec 2024 – Mar 2025",
      role: "Software Testing Intern",
      company: "Zluck Solutions",
      badge: "Foundation · Agile QA",
      points: [
        "Tested core authentication flows (signup, login, password recovery, session tokens) across mobile and web builds.",
        "Executed regression test runs and validated bug fixes in weekly agile sprints."
      ]
    }
  ] satisfies Experience[],
  caseStudies: [
    {
      category: "API Security",
      title: "Broken Access Control (BOLA / IDOR) Testing",
      metric: "2 Critical",
      metricLabel: "IDOR flaws caught & patched before exploit",
      severity: "HIGH / CRITICAL",
      sections: [
        {
          heading: "Context",
          body: "A high-traffic social media platform supporting user accounts, channels, and direct messaging. The objective was verifying whether backend APIs enforced strict object-level authorization or simply trusted user input."
        },
        {
          heading: "Approach",
          body: "Intercepted API requests using Burp Suite and Postman, tampering with resource IDs (substituting another user's ID and unauthorized channel IDs) across deletion and update endpoints."
        },
        {
          heading: "Outcome",
          body: "Identified two critical Broken Object Level Authorization (IDOR) vulnerabilities where restricted resources could be deleted without required permissions. Documented severity with step-by-step repros; retested and verified patches."
        }
      ],
      tools: ["Postman", "Burp Suite", "Browser DevTools"]
    },
    {
      category: "Auth & Security",
      title: "Authentication & Rate-Limiting Review",
      metric: "0 Takeovers",
      metricLabel: "OTP brute-force vector neutralized on retest",
      severity: "HIGH SEVERITY",
      sections: [
        {
          heading: "Context",
          body: "Core authentication and recovery APIs on a social web/mobile application. The password reset flow relied on SMS/email OTP verification and required rigorous security assessment beyond basic functional checks."
        },
        {
          heading: "Approach",
          body: "Tested positive and negative test cases for token handling, expiration, and payload tampering in Postman. Repeated OTP validation requests under rapid burst conditions to evaluate rate limiting and account lockout mechanisms."
        },
        {
          heading: "Outcome",
          body: "Discovered missing rate-limiting on the OTP endpoint, which exposed users to brute-force account takeover. Reported as a high-severity flaw; verified server-side rate limits and lockout policies upon retest."
        }
      ],
      tools: ["Postman", "Burp Suite", "DevTools"]
    },
    {
      category: "API Validation",
      title: "Public Developer API Test Suite",
      metric: "80+ APIs",
      metricLabel: "Endpoints validated with automated schema checks",
      severity: "CONTRACT SUITE",
      sections: [
        {
          heading: "Context",
          body: "A public-facing REST API used by third-party developers and agency integrations. Required end-to-end contract validation to ensure consistent responses, reliable error handling, and complete data integrity."
        },
        {
          heading: "Approach",
          body: "Built modular Postman collections leveraging environment variables, dynamic auth token handshakes, pre-request scripts, and automated status/schema validation across 80+ endpoints."
        },
        {
          heading: "Outcome",
          body: "Caught silent schema omissions, unhandled 500 errors on type mutations, and mid-flight token expiration bugs before public developer release."
        }
      ],
      tools: ["Postman", "JSON Schema", "REST API", "DevTools"],
      featured: true
    }
  ] satisfies CaseStudy[],
  stats: [
    {
      index: "01",
      tag: "Coverage",
      value: "80+",
      label: "REST API endpoints under automated contract validation",
      detail:
        "Modular Postman suites with dynamic token handshakes, status assertions, and JSON schema checks."
    },
    {
      index: "02",
      tag: "Security",
      value: "BOLA",
      label: "Critical IDOR & auth bypass flaws intercepted pre-release",
      detail:
        "Deep object-level authorization testing across multi-tenant agency workspaces and user channels."
    },
    {
      index: "03",
      tag: "Platforms",
      value: "3x",
      label: "Web, Android, and iOS builds verified end-to-end",
      detail:
        "Cross-platform exploratory, functional, and regression sign-off in fast weekly agile sprints."
    },
    {
      index: "04",
      tag: "Credentials",
      value: "04",
      label: "Security & cloud certifications backing hands-on QA",
      detail:
        "Google Cloud Cybersecurity, TryHackMe OPSEC & Network Services, and Microsoft Cybersecurity Essentials."
    }
  ] satisfies StatItem[],
  skills: [
    {
      title: "API & Security Testing",
      code: "SEC-01",
      items: [
        "Postman API Testing & Collection Design",
        "Broken Object Level Authorization (BOLA / IDOR)",
        "Authentication, Token Expiration & JWT Validation",
        "Burp Suite Traffic Inspection & Negative Testing"
      ],
      tags: [
        ["Collections", "Env Vars", "Pre-Scripts"],
        ["ID Tampering", "RBAC", "Access Control"],
        ["JWT", "OTP Burst", "Session Lifecycle"],
        ["Proxy", "Payloads", "Rate Limits"]
      ]
    },
    {
      title: "Functional & Mobile QA",
      code: "QA-02",
      items: [
        "Web, Android, and iOS Exploratory Testing",
        "Multi-Tenant & RBAC Permission Boundaries",
        "Regression Testing & Release Sign-Off",
        "Complex State & Workflow Validation (Kanban, Multi-User Sync)"
      ],
      tags: [
        ["Cross-Device", "UI Edge Cases", "Mobile"],
        ["Data Isolation", "Agency Roles", "Workspaces"],
        ["Sprint Cycles", "Smoke Suites", "Zero Blocker"],
        ["Real-Time", "Kanban", "State Sync"]
      ]
    },
    {
      title: "Tools & Methodologies",
      code: "OPS-03",
      items: [
        "Browser DevTools Debugging & Network Profiling",
        "Bug Reporting & Reproducible Defect Logs",
        "Jira / Agile Sprint Management",
        "Requirement & Acceptance Criteria Analysis"
      ],
      tags: [
        ["HAR Logs", "Console", "Latency"],
        ["Steps to Repro", "Expected vs Actual", "cURL"],
        ["Bug Triage", "Severity", "Retesting"],
        ["Edge Cases", "Spec Review", "Test Plans"]
      ]
    }
  ] satisfies SkillGroup[],
  certifications: [
    {
      title: "Google Cloud Cybersecurity Certificate",
      source: "Google Cloud"
    },
    {
      title: "Introduction to OPSEC",
      source: "TryHackMe"
    },
    {
      title: "Network Services",
      source: "TryHackMe"
    },
    {
      title: "Cybersecurity Essentials",
      source: "Microsoft / LinkedIn"
    }
  ],
  education: [
    {
      title: "Parul University",
      detail: "B.Tech in Computer Science & Engineering",
      year: "2025"
    }
  ],
  contact: {
    email: "tiwariabhinandan99@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/abhinandantiwari",
    note:
      "Open to Quality Analyst roles, security & API testing engagements, or discussions on bulletproofing your release pipelines.",
    links: [
      {
        label: "Email",
        value: "tiwariabhinandan99@gmail.com",
        href: "mailto:tiwariabhinandan99@gmail.com"
      },
      {
        label: "Phone",
        value: "+91 91737 82270",
        href: "tel:+919173782270"
      },
      {
        label: "LinkedIn",
        value: "abhinandantiwari",
        href: "https://www.linkedin.com/in/abhinandantiwari"
      }
    ] satisfies ContactLink[]
  }
};

