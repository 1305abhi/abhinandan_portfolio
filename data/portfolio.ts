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

// Shorter entries rendered as a compact list under the full case-study cards.
export type AdditionalWork = {
  category: string;
  title: string;
  summary: string;
  tools: string[];
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
    "I help teams ship software they can trust - hunting the edge cases, pressure-testing access control, and writing defect reports developers actually enjoy reading.",
  experience: [
    {
      period: "Mar 2025 - Present",
      role: "Jr. Software Tester",
      company: "Zluck Solutions",
      points: [
        "Run UI, regression, and exploratory testing across Web, Android, and iOS release cycles.",
        "Test APIs and access control with Postman, DevTools, and Burp Suite.",
        "Write defect reports with clear repro steps, severity, and expected-vs-actual detail."
      ]
    },
    {
      period: "Dec 2024 - Mar 2025",
      role: "Software Testing Intern",
      company: "Zluck Solutions",
      points: [
        "Tested auth flows across login, signup, and messaging on Web, Android, and iOS.",
        "Supported regression testing across release cycles in an agile team."
      ]
    }
  ] satisfies Experience[],
  caseStudies: [
    {
      category: "Security",
      title: "Broken access control (IDOR) testing",
      sections: [
        {
          heading: "Context",
          body: "QueryLoom is a social media platform with user accounts, channels, posts, and messaging. I tested the account and channel management APIs for authorization gaps - whether the server checked that the logged-in user was allowed to perform the action, or just trusted the request."
        },
        {
          heading: "Approach",
          body: "Captured requests in Burp Suite and replayed them in Postman with modified object IDs - another user's user ID, and a channel ID I was not an admin of. Compared each response against what that role should have been allowed to do."
        },
        {
          heading: "Outcome",
          body: "Found two broken access control (IDOR) issues: any user's account could be deleted by altering the user ID in the request, and a channel could be deleted without channel-admin rights. Reported both with reproduction steps and severity; fixed and verified in retesting."
        }
      ],
      tools: ["Postman", "Burp Suite", "DevTools"]
    },
    {
      category: "API & Security",
      title: "Authentication API testing",
      sections: [
        {
          heading: "Context",
          body: "Login, signup, and forgot password are the critical APIs on QueryLoom. The forgot-password flow used an OTP sent to the user, so it needed testing for authentication weaknesses as well as normal functional coverage."
        },
        {
          heading: "Approach",
          body: "Manual API testing in Postman across the auth endpoints - valid and invalid credentials, token handling, expired and tampered tokens, and negative cases. For forgot password, I repeated OTP verification requests to check for rate limiting, an attempt limit, or lockout."
        },
        {
          heading: "Outcome",
          body: "The OTP verification had no rate limiting or attempt limit, so it could be brute-forced to reset another user's password and take over the account. Reported as a high-severity bug with steps; rate limiting was added and I retested the flow."
        }
      ],
      tools: ["Postman", "Burp Suite", "DevTools"]
    },
    {
      category: "AI Features",
      title: "AI feature testing",
      sections: [
        {
          heading: "Context",
          body: "QueryLoom has AI features built on top of posts - Explain Post, Ask About Post, and Generate Chat. These were new features, so they needed functional and exploratory testing to confirm responses were relevant and the states around them behaved correctly."
        },
        {
          heading: "Approach",
          body: "Tested each feature end to end with a range of inputs - long posts, very short posts, empty content, special characters, and questions unrelated to the post. Checked response relevance, loading and error states, timeouts, and behaviour on repeated requests."
        },
        {
          heading: "Outcome",
          body: "Reported cases where responses were irrelevant or the error state was missing entirely, plus UI issues in the loading states. Verified the fixes in retesting on both web and mobile."
        }
      ],
      tools: ["Manual sessions", "DevTools", "Trello"]
    }
  ] satisfies CaseStudy[],
  additionalWork: [
    {
      category: "Functional & E2E",
      title: "Messaging module, end to end",
      summary:
        "End-to-end and regression testing of one-to-one and channel messaging across Web, Android, and iOS - send and receive, media attachments, offline send, notifications, and app permissions.",
      tools: ["Manual sessions", "Device matrix", "Trello"]
    },
    {
      category: "Functional & E2E",
      title: "Election module, end to end",
      summary:
        "End-to-end functional testing of the in-app election module - candidate setup, casting a vote, one-vote-per-user validation, result counts, and edge cases around start and end times.",
      tools: ["Manual sessions", "Postman", "Trello"]
    },
    {
      category: "Regression",
      title: "Social platform regression",
      summary:
        "Regression and exploratory testing of the core social features each release - posts, comments, likes, follows, channels, profiles, and search - with defects logged by severity and priority.",
      tools: ["Manual sessions", "Trello", "DevTools"]
    }
  ] satisfies AdditionalWork[],
  skills: [
    {
      title: "Manual Testing",
      items: [
        "UI, regression & exploratory - Web, Android, iOS",
        "Requirement analysis & test-case design",
        "Defect reporting with severity classification"
      ]
    },
    {
      title: "API & Security",
      items: [
        "Postman & browser DevTools",
        "Burp Suite traffic inspection",
        "Access-control & JWT validation"
      ]
    },
    {
      title: "Tools",
      items: ["Browser DevTools for debugging", "Trello for sprint & defect tracking"]
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
      "Open to QA roles, freelance testing work, or just a conversation about what's breaking in your release pipeline.",
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
