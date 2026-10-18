"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "#skills", label: "Capabilities", id: "skills", code: "01" },
  { href: "#protocol", label: "Protocol", id: "protocol", code: "02" },
  { href: "#experience", label: "Experience", id: "experience", code: "03" },
  { href: "#case-studies", label: "Case Studies", id: "case-studies", code: "04" },
  { href: "#contact", label: "Contact", id: "contact", code: "05" }
];

export function SiteNav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contrastTone, setContrastTone] = useState<"obsidian" | "archive">("obsidian");

  // Sync theme tone with document root so all sections inherit theme
  useEffect(() => {
    document.documentElement.setAttribute("data-tone", contrastTone);
  }, [contrastTone]);

  const toggleTone = () => {
    setContrastTone((prev) => (prev === "obsidian" ? "archive" : "obsidian"));
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      className="site-nav"
      data-scrolled={scrolled ? "true" : "false"}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="site-nav-inner">
        <a className="brand" href="#top" aria-label="Abhinandan Tiwari, home">
          <span className="brand-mark" aria-hidden="true">
            <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
              <path
                d="M2 14C7 4 11 4 14 10C17 16 21 16 26 6"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                d="M2 6C7 16 11 16 14 10C17 4 21 4 26 14"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="brand-text">
            Abhinandan <span className="brand-sub">Tiwari</span>
          </span>
        </a>

        {/* Global Matte Theme Switcher Moved from Hero to Header */}
        <button
          type="button"
          className="site-tone-toggle"
          onClick={toggleTone}
          aria-label="Toggle site contrast theme"
        >
          <span className="tone-indicator-dot" aria-hidden="true" />
          <span className="t-label tone-toggle-text">
            THEME: {contrastTone === "obsidian" ? "DARK SLATE" : "WARM STONE"} &middot; SWITCH
          </span>
        </button>

        <div className="nav-right">
          <nav aria-label="Primary navigation" data-open={menuOpen ? "true" : "false"}>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                data-active={active === link.id ? "true" : "false"}
                aria-current={active === link.id ? "true" : undefined}
              >
                <span className="nav-code">{link.code}</span>
                {link.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="kk-btn kk-btn--solid nav-cta">
            Let&apos;s Talk <span className="kk-arrow" aria-hidden="true">&rarr;</span>
          </a>

          <button
            type="button"
            className="kk-btn kk-btn--line mobile-menu-btn"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "Close" : "Menu"}
            <span className="menu-bars" aria-hidden="true" data-open={menuOpen ? "true" : "false"}>
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <motion.span
        className="nav-progress"
        aria-hidden="true"
        style={{ scaleX: progress }}
      />
    </motion.header>
  );
}

