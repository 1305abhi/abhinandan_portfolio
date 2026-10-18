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
      "Access Control & Security",
      "Web & Mobile QA",
      "Exploratory Testing"
    ],
    status: "Available for QA & Security Engagements"
  },
  tickerRows: [
    [
      "Postman API Test Suites",
      "Access Control & IDOR Checks",
      "Burp Suite Security Testing",
      "User Roles & Permissions (RBAC)",
      "Login & Session Security",
      "API Response & Schema Checks",
      "Rate Limiting & Abuse Prevention"
    ],
    [
      "Web · Android · iOS Testing",
      "Edge Case & Error Handling",
      "Network Request & Log Analysis",
      "Clear, Reproducible Bug Reports",
      "Release Sign-Off & Verification",
      "Real-Time Collaboration Testing",
      "Password Reset & OTP Security"
    ]
  ],
  intro:
    "I help product teams ship software they can trust — catching unauthorized access leaks, verifying APIs before launch, and writing clear bug reports that developers can easily fix.",
  benchmark: {
    eyebrow: "Interactive QA Benchmark Audit",
    title: "Ad-hoc release checks vs. Structured QA Protocol",
    metrics: [
      {
        label: "API Coverage & Response Verification",
        ours: "80+ Endpoints",
        theirs: "Happy-path only",
        ourScale: 0.96,
        theirScale: 0.28
      },
      {
        label: "Access Control & Data Privacy Checks (IDOR / BOLA)",
        ours: "Tested on every endpoint",
        theirs: "Checked only on UI",
        ourScale: 1,
        theirScale: 0.22
      },
      {
        label: "Defect Clarity (Exact Steps + Network Logs)",
        ours: "Reproducible on first pass",
        theirs: "Frequent back-and-forth",
        ourScale: 0.99,
        theirScale: 0.55
      },
      {
        label: "Cross-Platform Testing Coverage",
        ours: "Web · iOS · Android",
        theirs: "Single browser",
        ourScale: 1,
        theirScale: 0.33
      }
    ],
    pillars: ["API Security", "Functional QA", "Release Sign-Off"],
    proofs: [
      { label: "Bug report quality", value: "cURL + Network Logs" },
      { label: "User permissions", value: "Multi-Role Tested" },
      { label: "Unhandled server errors", value: "Caught Pre-Release" }
    ]
  },
  protocolSteps: [
    {
      index: "01",
      title: "Recon",
      cadence: "Phase 01 · Planning",
      summary:
        "Map out all endpoints, user roles, account boundaries, and authentication flows before writing test cases."
    },
    {
      index: "02",
      title: "Intercept",
      cadence: "Phase 02 · Hands-on Testing",
      summary:
        "Test edge cases — swap user IDs to check access control, send invalid data, test expired sessions, and check rate limits under heavy traffic."
    },
    {
      index: "03",
      title: "Automate",
      cadence: "Phase 03 · Automated Suites",
      summary:
        "Build reusable Postman test suites that handle login tokens automatically and verify status codes, data types, and response formats."
    },
    {
      index: "04",
      title: "Verify",
      cadence: "Phase 04 · Sign-Off",
      summary:
        "Deliver clear, reproducible bug reports with exact steps and network logs, then retest fixes to guarantee zero regressions."
    }
  ] satisfies ProtocolStep[],
  experience: [
    {
      period: "July 2026 – Present",
      role: "Software Tester",
      company: "Social Media Management SaaS",
      badge: "Current Role · SaaS",
      points: [
        "Built automated Postman test suites for public developer APIs, verifying status codes, response formats, and authentication flows.",
        "Led end-to-end testing for complex product features including real-time Kanban boards and multi-account workspace management.",
        "Tested user permissions and role boundaries (RBAC) to ensure accounts cannot access or modify another team's data."
      ]
    },
    {
      period: "Jan 2025 – Jul 2026",
      role: "Quality Analyst / Software Tester",
      company: "Zluck Solutions",
      badge: "Full-Stack QA · 1.5 Yrs",
      points: [
        "Led functional, UI, and exploratory QA across Web, Android, and iOS platforms.",
        "Conducted API security reviews using Postman and Burp Suite to identify permission bypasses, broken access control, and rate-limiting gaps.",
        "Documented high-severity bugs with reproducible steps, expected vs. actual outcomes, and network request logs."
      ]
    },
    {
      period: "Dec 2024 – Mar 2025",
      role: "Software Testing Intern",
      company: "Zluck Solutions",
      badge: "Foundation · Agile QA",
      points: [
        "Tested core authentication flows (signup, login, password recovery, session tokens) across mobile and web builds.",
        "Executed regression test runs and verified bug fixes in weekly agile sprints."
      ]
    }
  ] satisfies Experience[],
  caseStudies: [
    {
      category: "API Security",
      title: "Broken Access Control (BOLA / IDOR) Testing",
      metric: "2 Critical",
      metricLabel: "Access control flaws found and fixed before launch",
      severity: "HIGH / CRITICAL",
      sections: [
        {
          heading: "Context",
          body: "A high-traffic social media platform supporting user accounts, channels, and direct messaging. The objective was verifying whether backend APIs enforce strict ownership checks or simply trust user IDs sent from the client."
        },
        {
          heading: "Approach",
          body: "Intercepted API requests using Burp Suite and Postman, attempting to delete or update resources by substituting another user's account ID and unauthorized channel IDs."
        },
        {
          heading: "Outcome",
          body: "Identified two critical Broken Object Level Authorization (IDOR) vulnerabilities where restricted resources could be deleted without required permissions. Documented clear reproduction steps for developers; retested and verified the patches."
        }
      ],
      tools: ["Postman", "Burp Suite", "Browser DevTools"]
    },
    {
      category: "Auth & Security",
      title: "Authentication & Rate-Limiting Review",
      metric: "Protected",
      metricLabel: "OTP brute-force loophole closed on retest",
      severity: "HIGH SEVERITY",
      sections: [
        {
          heading: "Context",
          body: "Core authentication and password reset APIs on a social web/mobile application. The recovery flow relied on SMS/email OTP verification and required rigorous security assessment beyond basic functional checks."
        },
        {
          heading: "Approach",
          body: "Tested positive and negative test cases for token handling, expiration, and invalid payloads in Postman. Repeated OTP verification requests under rapid burst conditions to evaluate rate limiting and account lockout protection."
        },
        {
          heading: "Outcome",
          body: "Discovered missing rate-limiting on the OTP endpoint, which exposed accounts to automated brute-force takeover. Reported as a high-severity flaw; verified server-side rate limits and lockout policies upon retest."
        }
      ],
      tools: ["Postman", "Burp Suite", "DevTools"]
    },
    {
      category: "API Validation",
      title: "Public Developer API Test Suite",
      metric: "80+ APIs",
      metricLabel: "Endpoints validated with automated test suites",
      severity: "CONTRACT SUITE",
      sections: [
        {
          heading: "Context",
          body: "A public-facing REST API used by third-party developers and agency integrations. Required end-to-end test suites to guarantee consistent responses, clear error handling, and complete data accuracy."
        },
        {
          heading: "Approach",
          body: "Built modular Postman test collections with automatic token management, environment variables, pre-request scripts, and automated status and schema validation across 80+ endpoints."
        },
        {
          heading: "Outcome",
          body: "Caught missing data fields, unhandled 500 errors on invalid inputs, and mid-flight token expiration bugs before the public developer release."
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
      label: "REST API endpoints covered by automated test suites",
      detail:
        "Automated Postman suites verifying status codes, response formats, and error handling."
    },
    {
      index: "02",
      tag: "Security",
      value: "BOLA",
      label: "Critical IDOR & access control flaws caught before release",
      detail:
        "Thorough permission testing across multi-user workspaces, private channels, and account data."
    },
    {
      index: "03",
      tag: "Platforms",
      value: "3x",
      label: "Web, Android, and iOS builds verified end-to-end",
      detail:
        "Hands-on exploratory, UI, and regression testing across desktop and mobile devices."
    },
    {
      index: "04",
      tag: "Credentials",
      value: "04",
      label: "Security & cloud certifications backing practical QA",
      detail:
        "Google Cloud Cybersecurity, TryHackMe Network Security, and Microsoft Cybersecurity Essentials."
    }
  ] satisfies StatItem[],
  skills: [
    {
      title: "API & Security Testing",
      code: "SEC-01",
      items: [
        "Postman API Testing & Collection Design",
        "Access Control & IDOR Testing (BOLA)",
        "Authentication, Token Expiration & Login Security",
        "Burp Suite Traffic Inspection & Negative Testing"
      ],
      tags: [
        ["Collections", "Env Vars", "Assertions"],
        ["Access Control", "User Roles", "Data Privacy"],
        ["Login Flows", "OTP Limits", "Session Tokens"],
        ["Proxy", "Invalid Payloads", "Rate Limits"]
      ]
    },
    {
      title: "Functional & Mobile QA",
      code: "QA-02",
      items: [
        "Web, Android, and iOS Exploratory Testing",
        "Multi-User Roles & Workspace Permissions",
        "Regression Testing & Release Sign-Off",
        "Complex Workflows & State Sync (Kanban, Real-Time Updates)"
      ],
      tags: [
        ["Cross-Device", "UI Edge Cases", "Mobile & Web"],
        ["Account Isolation", "User Roles", "Workspaces"],
        ["Sprint Cycles", "Smoke Tests", "Release Ready"],
        ["Real-Time", "Kanban", "Live Sync"]
      ]
    },
    {
      title: "Tools & Methodologies",
      code: "OPS-03",
      items: [
        "Browser DevTools Debugging & Network Profiling",
        "Bug Reporting & Reproducible Defect Logs",
        "Jira & Agile Sprint Collaboration",
        "Reviewing Requirements & Defining Test Scenarios"
      ],
      tags: [
        ["Network Logs", "Console Errors", "Response Times"],
        ["Steps to Repro", "Expected vs Actual", "cURL"],
        ["Bug Triage", "Severity", "Retesting Fixes"],
        ["Edge Cases", "Acceptance Criteria", "Test Plans"]
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
      "Open to Quality Analyst roles, API testing & security engagements, or helping your team ship bug-free releases.",
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

