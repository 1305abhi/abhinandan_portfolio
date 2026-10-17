"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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

  // Interactive Tension Cord ("Slack") state inspired by kreativeknotmedia.com
  const [cordY, setCordY] = useState(15);
  const [cordX, setCordX] = useState(75);
  const [slackVal, setSlackVal] = useState(8);
  const velocityRef = useRef(0);
  const targetYRef = useRef(15);
  const currentYRef = useRef(15);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const animateCord = () => {
      const stiffness = 0.14;
      const damping = 0.82;
      const force = (targetYRef.current - currentYRef.current) * stiffness;
      velocityRef.current = (velocityRef.current + force) * damping;
      currentYRef.current += velocityRef.current;

      setCordY(currentYRef.current);
      const deviation = Math.min(
        99,
        Math.max(4, Math.round(Math.abs(currentYRef.current - 15) * 3.8 + 8))
      );
      setSlackVal(deviation);

      if (
        Math.abs(velocityRef.current) > 0.02 ||
        Math.abs(targetYRef.current - currentYRef.current) > 0.05
      ) {
        rafRef.current = requestAnimationFrame(animateCord);
      } else {
        currentYRef.current = targetYRef.current;
        setCordY(targetYRef.current);
        rafRef.current = null;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const normY = (e.clientY / window.innerHeight - 0.5) * 24;
      const normX = 35 + (e.clientX / window.innerWidth) * 80;
      setCordX(normX);
      targetYRef.current = 15 + normY;
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animateCord);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const pluckCord = () => {
    velocityRef.current = 14;
    targetYRef.current = 15;
    const step = () => {
      const force = (15 - currentYRef.current) * 0.18;
      velocityRef.current = (velocityRef.current + force) * 0.84;
      currentYRef.current += velocityRef.current;
      setCordY(currentYRef.current);
      setSlackVal(
        Math.min(99, Math.max(8, Math.round(Math.abs(currentYRef.current - 15) * 4.5 + 8)))
      );
      if (Math.abs(velocityRef.current) > 0.04 || Math.abs(15 - currentYRef.current) > 0.05) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        currentYRef.current = 15;
        setCordY(15);
        setSlackVal(8);
        rafRef.current = null;
      }
    };
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(step);
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

        <button
          type="button"
          className="cord-widget"
          onClick={pluckCord}
          title="Move your cursor or click to pluck the QA signal cord"
          aria-label="Interactive signal cord"
        >
          <span className="t-label text-stone">Signal</span>
          <svg
            aria-hidden="true"
            width="140"
            height="30"
            viewBox="0 0 150 30"
            className="cord-svg"
          >
            <line
              x1="0"
              y1="15"
              x2="150"
              y2="15"
              stroke="var(--line)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <path
              d={`M 0 15 Q ${cordX.toFixed(1)} ${cordY.toFixed(1)} 150 15`}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="0" cy="15" r="2.4" fill="var(--text)" />
            <circle cx="150" cy="15" r="2.4" fill="var(--text)" />
          </svg>
          <span className="t-label cord-readout" aria-hidden="true">
            {String(slackVal).padStart(3, "0")}
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

