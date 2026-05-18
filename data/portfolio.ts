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
    tags: ["Manual Testing", "API Testing", "Security Testing", "Automation"]
  },
  intro:
    "I help teams ship software they can trust - finding the edge cases, validating access control, and writing defect reports developers actually enjoy reading.",
  experience: [
    {
      period: "Mar 2025 - Present",
      role: "Jr. Software Tester",
      company: "Zluck Solutions",
      points: [
        "UI, regression, and exploratory testing across Web, Android, and iOS release cycles.",
        "API and access-control testing with Postman, DevTools, and Burp Suite.",
        "Defect reports with clear reproduction, severity, and expected-vs-actual context."
      ]
    },
    {
      period: "Dec 2024 - Mar 2025",
      role: "Software Testing Intern",
      company: "Zluck Solutions",
      points: [
        "Auth flow testing across login, signup, and messaging on Web, Android, and iOS.",
        "Regression support across release cycles in an agile environment."
      ]
    }
  ] satisfies Experience[],
  caseStudies: [
    {
      category: "API & Security",
      title: "Catching a role-bypass before release",
      sections: [
        {
          heading: "Context",
          body: "A multi-role web app was about to ship a permissions revamp. Roles and routes had drifted apart over several sprints."
        },
        {
          heading: "Approach",
          body: "Built a role x endpoint matrix, replayed authenticated requests in Postman, and inspected traffic in Burp Suite to confirm server-side enforcement."
        },
        {
          heading: "Outcome",
          body: "Surfaced endpoints honoring client-side role checks only. Filed reproducible reports, and the issue was fixed before release."
        }
      ],
      tools: ["Postman", "Burp Suite", "DevTools"]
    },
    {
      category: "Cross-Platform",
      title: "Keeping one feature honest across Web, Android & iOS",
      sections: [
        {
          heading: "Context",
          body: "A messaging feature shipped to three platforms from a shared backend. Each client interpreted edge cases differently."
        },
        {
          heading: "Approach",
          body: "Wrote a single regression checklist mapped to platform-specific quirks, permissions, and offline send behavior."
        },
        {
          heading: "Outcome",
          body: "Caught platform-only defects that would not have shown up in a web-only pass. Release went out with no P0/P1 escapes."
        }
      ],
      tools: ["Manual sessions", "Trello", "Device matrix"]
    },
    {
      category: "Manual & Exploratory",
      title: "Hardening auth on a WordPress client portal",
      sections: [
        {
          heading: "Context",
          body: "Client-facing WordPress platforms needed layout and functional validation under real-world auth flows."
        },
        {
          heading: "Approach",
          body: "Combined UI and layout checks with exploratory passes against auth surfaces, including expired tokens and logged-out states."
        },
        {
          heading: "Outcome",
          body: "Documented session edge cases and layout regressions with severity tags, improving release confidence."
        }
      ],
      tools: ["DevTools", "Postman", "Trello"],
      featured: true
    }
  ] satisfies CaseStudy[],
  skills: [
    {
      title: "Manual Testing",
      items: [
        "UI, regression, exploratory - Web, Android, iOS",
        "Requirement analysis and test case design",
        "Defect reporting with severity classification"
      ]
    },
    {
      title: "API & Security",
      items: [
        "Postman and Browser DevTools",
        "Burp Suite traffic inspection",
        "Access control and JWT validation"
      ]
    },
    {
      title: "Tools",
      items: ["Browser DevTools for debugging", "Trello for sprint and defect tracking"]
    },
    {
      title: "Automation",
      items: ["Selenium WebDriver basics", "Cypress fundamentals for UI workflows"]
    }
  ] satisfies SkillGroup[],
  certifications: [
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
      detail: "B.Tech CSE - GPA 7.03/10",
      year: "2025"
    },
    {
      title: "Genius Educational Academy",
      detail: "12th, GSEB - 83/100",
      year: "2021"
    },
    {
      title: "Genius Educational Academy",
      detail: "10th, GSEB - 85/100",
      year: "2019"
    }
  ],
  contact: {
    email: "tiwariabhinandan99@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/abhinandantiwari",
    note:
      "Open to QA roles, freelance testing engagements, or just a chat about what's breaking in your release pipeline.",
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
