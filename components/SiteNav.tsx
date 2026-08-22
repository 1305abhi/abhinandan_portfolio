"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "#experience", label: "Work", id: "experience" },
  { href: "#case-studies", label: "Case Studies", id: "case-studies" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#contact", label: "Contact", id: "contact" }
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

  // Elevate the bar once the visitor leaves the very top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link for whichever section is in view.
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
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
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
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <a className="brand" href="#top">
        Abhinandan<span>.</span>
      </a>
      <nav aria-label="Primary navigation">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            data-active={active === link.id ? "true" : "false"}
            aria-current={active === link.id ? "true" : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <motion.span
        className="nav-progress"
        aria-hidden="true"
        style={{ scaleX: progress }}
      />
    </motion.header>
  );
}
