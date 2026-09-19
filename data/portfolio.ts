export type Experience = {
  period: string;
  role: string;
  company: string;
  points: string[];
};

export type CaseStudy = {
  category: string;
  title: string;
  sections: {
    heading: string;
    body: string;
  }[];
  tools: string[];
  featured?: boolean;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type ContactLink = {
  label: string;
  value: string;
  href: string;
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
    ]
  },
  intro:
    "I help product teams ship software they can trust — uncovering hidden permission leaks, stress-testing APIs before release, and writing defect reports developers actually respect.",
  experience: [
    {
      period: "July 2026 – Present",
      role: "Software Tester",
      company: "Social Media Management SaaS",
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
  skills: [
    {
      title: "API & Security Testing",
      items: [
        "Postman API Testing & Collection Design",
        "Broken Object Level Authorization (BOLA / IDOR)",
        "Authentication, Token Expiration & JWT Validation",
        "Burp Suite Traffic Inspection & Negative Testing"
      ]
    },
    {
      title: "Functional & Mobile QA",
      items: [
        "Web, Android, and iOS Exploratory Testing",
        "Multi-Tenant & RBAC Permission Boundaries",
        "Regression Testing & Release Sign-Off",
        "Complex State & Workflow Validation (Kanban, Multi-User Sync)"
      ]
    },
    {
      title: "Tools & Methodologies",
      items: [
        "Browser DevTools Debugging & Network Profiling",
        "Bug Reporting & Reproducible Defect Logs",
        "Jira / Agile Sprint Management",
        "Requirement & Acceptance Criteria Analysis"
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
