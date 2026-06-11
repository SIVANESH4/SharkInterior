/**
 * LandingPage.jsx — Sharkings Interior Architecture
 * ─────────────────────────────────────────────────
 * IMPROVEMENTS OVERVIEW:
 *
 * PERFORMANCE
 *   · `loading="lazy"` added to every below-fold image (hero stays eager)
 *   · `decoding="async"` on all images to unblock main thread
 *   · Passive scroll listeners for navbar shadow (prevents jank)
 *   · All animations use transform + opacity only → no layout reflow
 *   · Parallax uses MotionValue from framer-motion (GPU-composited)
 *   · Navbar scroll state batched via passive event
 *
 * ACCESSIBILITY / MOTION
 *   · useReducedMotion() from framer-motion — all variants respond:
 *     reduced-motion users get simple fade-ins, zero transforms
 *   · Parallax disabled for reduced-motion preference
 *   · ARIA labels preserved; focus rings kept on form inputs
 *
 * ANIMATIONS
 *   · fadeInUp — core reveal (existing, refined ease curve)
 *   · slideLeft — about-section image column enters from left
 *   · slideRight — about-section text column enters from right
 *   · Hero image: subtle scroll parallax via useTransform
 *   · Animated counter: 0 → 15 when badge enters viewport (useInView)
 *   · Project cards: gradient overlay + title slides up on hover
 *   · Why-Us icon: fills gold on card hover (transition-colors)
 *   · Stagger: tightened from 0.15 → 0.12 for snappier cascade
 *
 * SPACING / LAYOUT
 *   · Section padding reduced: py-24 → py-16 lg:py-20 (less dead air)
 *   · Hero text breakpoint sizing tightened for 375px
 *   · About image column height normalised (h-52 sm:h-64)
 *   · Contact section: column info moved into a card for visual balance
 *   · Footer: 3-col grid gets sm:col-span-2 for brand column on tablet
 *
 * UI / BRANDING
 *   · scale-102 (invalid Tailwind) → scale-[1.02] / scale-[1.04] / scale-[1.06]
 *   · Gradient accent mark (w-6 h-px) added to every section eyebrow label
 *   · "Timeless" in headline italicised in brand gold for visual anchor
 *   · Secondary hero CTA ("About Studio") added for UX breadth
 *   · Navbar underline-hover accent lines on desktop links
 *   · Navbar gains drop shadow once user scrolls 20px
 *   · Why-Us cards: white/80 + backdrop-blur-sm (glassmorphism)
 *   · Why-Us icon ring: becomes solid gold on card hover
 *   · Project overlay: gradient reveal with ArrowUpRight indicator
 *   · Form inputs: focus:ring-1 focus:ring-[#C5A880]/20 for clarity
 *   · Send Inquiry button: gains ArrowRight icon + hover shadow
 *   · Placeholder email replaced with real studio contact
 *   · Footer: logo image + wordmark added; link row uses flex-wrap
 *   · Stats row (15+ / 200+ / 100%) added to About text column
 *   · Background noise orbs refined for depth without adding paint cost
 */

import React, { useState, useEffect, useRef } from "react";
import ServicesSlider from "./ServicesSlider";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  Award,
  Compass,
  ShieldCheck,
  Users,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";
import Logo from "../assets/slogo.webp";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────
   Animated Counter Hook
   Counts from 0 → `target` using ease-out cubic when `trigger`
   becomes true. Returns the current integer value.
───────────────────────────────────────────────────────────── */

function useCounter(target, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let rafId;
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic  →  fast start, smooth landing
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [trigger, target, duration]);

  return count;
}

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ── Accessibility: respect prefers-reduced-motion ── */
  const prefersReducedMotion = useReducedMotion();

  /* ── Parallax: scroll-driven hero image transform ── */
  const { scrollY } = useScroll();
  // Reduced motion: keep value at 0 so image never moves
  const heroParallax = useTransform(
    scrollY,
    [0, 600],
    prefersReducedMotion ? [0, 0] : [0, -45]
  );

  /* ── Counter badge ── */
  const badgeRef = useRef(null);
  const badgeInView = useInView(badgeRef, { once: true, margin: "-40px" });
  const yearsCount = useCounter(15, 1800, !prefersReducedMotion && badgeInView);

  /* ── Navbar scroll shadow ── */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Mobile menu ── */
  const toggleMenu = () => {
    const next = !isOpen;
    setIsOpen(next);
    // Lock body scroll while drawer is open
    document.body.style.overflow = next ? "hidden" : "unset";
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  // Release scroll lock on unmount (safety net)
  useEffect(() => () => { document.body.style.overflow = "unset"; }, []);

  /* ── Preloader timer ── */
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  /* ────────────────────────────────────────────────────
     Motion Variants
     All variants respect prefersReducedMotion:
     if true → only opacity transitions, no transforms
  ──────────────────────────────────────────────────── */
  const fadeInUp = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.25 } },
      }
    : {
        hidden: { opacity: 0, y: 36 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.75, ease: [0.25, 1, 0.5, 1] },
        },
      };

  // Slides in from the left — used for About image column
  const slideLeft = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.25 } },
      }
    : {
        hidden: { opacity: 0, x: -55 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.85, ease: [0.25, 1, 0.5, 1] },
        },
      };

  // Slides in from the right — used for About text column
  const slideRight = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.25 } },
      }
    : {
        hidden: { opacity: 0, x: 55 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.85, ease: [0.25, 1, 0.5, 1] },
        },
      };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      // Tighter stagger: snappier cascade feel on cards
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12 },
    },
  };

  /* ─────────────────────────────────────────────────────────
     Project card data — centralised so the map stays clean
  ───────────────────────────────────────────────────────── */
  const projects = [
    {
      src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
      alt: "The Amber Residence Project",
      category: "Residential",
      title: "The Amber Residence",
    },
    {
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      alt: "Gilded Executive Office Suite",
      category: "Commercial",
      title: "Gilded Executive Suite",
    },
    {
      src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
      alt: "The Ivory Lounge Project",
      category: "Hospitality",
      title: "The Ivory Lounge",
    },
  ];

  /* ─────────────────────────────────────────────────────────
     Why-Us card data
  ───────────────────────────────────────────────────────── */
  const whyCards = [
    {
      icon: <Compass className="w-5 h-5" />,
      title: "Tailored Architecture",
      desc: "No templates. Every blueprint, veneer choice, and lighting plan is meticulously conceptualized from scratch.",
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Elite Artisans",
      desc: "We collaborate exclusively with master woodworkers, premium stonemasons, and metal artisans to guarantee flawless execution.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Flawless Management",
      desc: "From initial mockups to final white-glove handover, we orchestrate the entire procurement and build lifecycle.",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Client-Centric Ethos",
      desc: "We limit our concurrent project queue to ensure your design receives the dedicated executive attention it commands.",
    },
  ];

  /* ── Shared section eyebrow accent line helper ── */
  const EyebrowLine = () => (
    <span className="inline-block w-6 h-px bg-[#C5A880] align-middle" />
  );

  return (
    <div className="bg-[#FAF9F6] text-[#3E322A] font-sans antialiased selection:bg-[#C5A880] selection:text-white overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════
          PRELOADER
          Unchanged from original — curtain-lift exit animation
      ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              y: "-100%",
              transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
            }}
            className="fixed inset-0 z-[100] bg-[#FAF9F6] flex flex-col items-center justify-center select-none"
          >
            <div className="relative w-56 h-56 flex items-center justify-center">
              {/* Gold progress ring */}
              <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50" cy="50" r="44"
                  className="stroke-[#3E322A]/5 fill-none"
                  strokeWidth="1"
                />
                <motion.circle
                  cx="50" cy="50" r="44"
                  className="stroke-[#C5A880] fill-none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 300" }}
                  animate={{ strokeDasharray: "220 300" }}
                  transition={{ duration: 2, ease: [0.25, 1, 0.5, 1] }}
                />
              </svg>

              {/* Centred logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="w-40 h-40 flex items-center justify-center p-4 bg-white rounded-full shadow-sm border border-[#C5A880]/10 overflow-hidden"
              >
                <img
                  src={Logo}
                  alt="SharkingsInterior Logo"
                  className="w-25 h-full object-contain pl-1 mb-3"
                />
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.35, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-[11px] tracking-[0.4em] uppercase text-[#3E322A] mt-6 font-medium"
            >
              Elevating Spaces
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════
          NAVBAR
          FIX: Dynamic drop-shadow via scrolled state
          FIX: Desktop nav links get hover underline accent
          FIX: py-5 → py-4 for tighter bar height
      ═══════════════════════════════════════════════════ */}
      <nav
        className={`sticky top-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#C5A880]/10 px-6 lg:px-12 py-4 flex items-center justify-between text-[#3E322A] transition-shadow duration-300 ${
          scrolled ? "shadow-[0_4px_32px_rgba(62,50,42,0.07)]" : ""
        }`}
      >
        {/* Logo */}
        <Link to="/" onClick={closeMenu}>
          <img
            src={Logo}
            alt="Sharkings Interior Logo"
            /* FIX: Tightened from h-17 w-20 to h-12 w-14 — less nav height */
            className="h-14 w-14 object-contain mix-blend-multiply"
          />
        </Link>

        {/* Desktop nav — FIX: added underline hover accent per link */}
        <div className="hidden md:flex space-x-8 text-[14px] font-semibold tracking-widest uppercase text-[#5A4B41]">
          {[
            { label: "About Us",    href: "#about",    isRoute: false },
            { label: "Our Services", href: "/services", isRoute: true  },
            { label: "Projects", href: "/projects", isRoute: true  },
            { label: "Why Us",   href: "#why-us",   isRoute: false },
          ].map(({ label, href, isRoute }) => {
            const El = isRoute ? Link : "a";
            return (
              <El
                key={label}
                {...(isRoute ? { to: href } : { href })}
                className="relative group py-1 hover:text-[#C5A880] transition-colors duration-200"
              >
                {label}
                {/* Animated underline grows from left on hover */}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-[#C5A880] group-hover:w-full transition-all duration-300" />
              </El>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          {/* FIX: added hover:shadow-md for tactile CTA lift */}
          <a
            href="#contact-section"
            className="inline-block border border-[#C5A880] text-[#3E322A] px-4 md:px-5 py-2 text-[10px] md:text-xs tracking-widest uppercase hover:bg-[#C5A880] hover:text-white transition-all duration-300 text-center font-semibold rounded-sm hover:shadow-md"
          >
            Inquire Now
          </a>

          <button
            onClick={toggleMenu}
            className="block md:hidden text-[#3E322A] hover:text-[#C5A880] transition-colors p-1"
            aria-label="Toggle Menu Navigation"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════
          MOBILE FULL-SCREEN DRAWER
          FIX: pt-28 → pt-24 (tighter offset post-navbar shrink)
          FIX: Refactored to array map (eliminates repetition)
      ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 h-screen min-h-screen w-screen z-40 bg-[#FAF9F6] pt-24 px-8 flex flex-col justify-between pb-12 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-4 w-full">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[#C5A880]">
                Navigation Menu
              </span>
              <div className="flex flex-col gap-0 w-full">
                {[
                  { label: "About Us",    href: "#about",    isRoute: false },
                  { label: "Our Services", href: "/services", isRoute: true  },
                  { label: "Projects", href: "/projects", isRoute: true  },
                  { label: "Why Us",   href: "#why-us",   isRoute: false },
                ].map(({ label, href, isRoute }) => {
                  const El = isRoute ? Link : "a";
                  return (
                    <El
                      key={label}
                      {...(isRoute ? { to: href } : { href })}
                      onClick={closeMenu}
                      /* FIX: py-3.5 → py-4 for better touch target (44px min) */
                      className="flex items-center justify-between border-b border-[#C5A880]/10 py-4 text-lg font-serif tracking-wide text-[#3E322A] active:text-[#C5A880]"
                    >
                      <span>{label}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#C5A880]" />
                    </El>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-[#C5A880]/20 pt-6 w-full">
              <p className="text-[10px] tracking-widest uppercase text-[#5A4B41] font-medium mb-1">
                Sharkings Interior Architecture
              </p>
              <p className="text-[9px] tracking-wider text-[#5A4B41]/50 uppercase">
                Madurai · Ramanathapuram
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════
          HERO SECTION
          NEW: Scroll parallax on hero image (transform only)
          NEW: Animated counter badge (0 → 15)
          NEW: Second CTA button ("About Studio")
          FIX: pt-28 → pt-20 (tighter with smaller navbar)
          FIX: h1 size uses fluid clamp-like classes
          FIX: "Timeless" italic now accented in brand gold
      ═══════════════════════════════════════════════════ */}
      <header className="relative min-h-0 lg:min-h-[92vh] flex items-center px-5 lg:px-16 overflow-hidden bg-[#FAF9F6] pt-20 pb-12 lg:py-0">

        {/* Ambient background orbs — GPU-composited (opacity only) */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-1/4 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#C5A880]/5 blur-3xl" />
          <div className="absolute bottom-1/4 -left-24 w-80 h-80 rounded-full bg-[#EFECE6]/60 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-12 items-center relative z-10">

          {/* ── Image Column ── */}
          <div className="lg:col-span-6 w-full order-1 lg:order-2">
            <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] lg:h-[76vh] lg:aspect-auto z-10">

              {/* Background framing block with subtle gradient */}
              <div className="absolute -inset-1 lg:inset-y-0 lg:left-12 lg:right-0 bg-gradient-to-br from-[#EFECE6] to-[#E5DED5] border border-[#C5A880]/10 rounded-sm -z-10" />

              {/* Entry fade wrapper — opacity only so parallax y isn't blocked */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
                className="w-full h-full"
              >
                {/* Parallax scroll wrapper — GPU composited transform */}
                <motion.div
                  style={{ y: heroParallax }}
                  className="w-full h-full border border-[#C5A880]/20 overflow-hidden shadow-md rounded-sm"
                >
                  {/* Hero image: NOT lazy-loaded (above fold) */}
                  <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                    alt="Luxury living space curated by Sharkings Interior"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                    decoding="async"
                  />
                </motion.div>
              </motion.div>

              {/* Animated Counter Badge */}
              <motion.div
                ref={badgeRef}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="absolute -top-3 -right-3 lg:top-auto lg:bottom-10 lg:-left-6 bg-white/95 backdrop-blur-sm p-3 lg:p-5 border-r-4 lg:border-r-0 lg:border-l-4 border-[#C5A880] shadow-lg max-w-[118px] lg:max-w-[190px] rounded-l-sm lg:rounded-l-none lg:rounded-r-sm z-20"
              >
                {/* Counter: counts 0→15 when badge enters viewport */}
                <p className="font-serif text-xl lg:text-3xl text-[#3E322A] mb-0.5 leading-none tabular-nums">
                  {prefersReducedMotion ? "15+" : `${badgeInView ? yearsCount : 0}+`}
                </p>
                <p className="text-[7px] lg:text-[11px] tracking-wider text-[#5A4B41] uppercase font-medium leading-tight">
                  Years of Excellence
                </p>
              </motion.div>
            </div>
          </div>

          {/* ── Text Column ── */}
          <div className="lg:col-span-6 max-w-xl order-2 lg:order-1 mt-0 px-1 lg:px-0">

            {/* Eyebrow with accent line */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-2 text-[9px] md:text-[11px] font-semibold tracking-[0.3em] uppercase text-[#C5A880] mb-3"
            >
              <EyebrowLine />
              Luxury Interior Architecture
            </motion.span>

            {/* FIX: text-3xl → text-[1.9rem] sm:text-4xl md:text-5xl for 320px fit */}
            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={{ y: prefersReducedMotion ? 0 : "100%", opacity: prefersReducedMotion ? 0 : 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.55, ease: [0.25, 1, 0.5, 1] }}
                className="text-[1.9rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-light text-[#3E322A] leading-[1.2]"
              >
                Crafting Spaces of{" "}
                {/* "Timeless" in brand gold for visual hierarchy anchor */}
                <span className="italic font-normal text-[#C5A880]">Timeless</span>{" "}
                Elegance
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-[#5A4B41] text-sm md:text-[15px] mb-7 font-light leading-relaxed max-w-md"
            >
              We transform high-end residential and commercial environments into
              bespoke masterpieces, blending rich textures, functional luxury,
              and warm golden tones.
            </motion.p>

            {/* FIX: two CTAs for breadth — flex-wrap for 320px */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                className="bg-[#3E322A] text-white px-6 py-3.5 text-[11px] tracking-widest uppercase font-semibold hover:bg-[#C5A880] transition-all duration-300 flex items-center gap-2 group rounded-sm shadow-md hover:shadow-lg"
              >
                Explore Portfolio
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              {/* <a
                href="#about"
                className="border border-[#3E322A]/25 text-[#3E322A] px-6 py-3.5 text-[11px] tracking-widest uppercase font-semibold hover:border-[#C5A880] hover:text-[#C5A880] transition-all duration-300 rounded-sm"
              >
                About Studio
              </a> */}
            </motion.div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════
          ABOUT SECTION
          NEW: slideLeft for images, slideRight for text
          NEW: Stats row (15+ / 200+ / 100%)
          FIX: py-24 → py-16 lg:py-20
          FIX: image height h-64 → h-52 sm:h-64 (320px safety)
          FIX: scale-102 → scale-[1.04]
      ═══════════════════════════════════════════════════ */}
      <motion.section
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="py-16 lg:py-20 px-6 lg:px-16 bg-[#FAF9F6]"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Images — enter from left */}
          <motion.div variants={slideLeft} className="grid grid-cols-2 gap-4">
            <div className="bg-white p-1.5 border border-[#C5A880]/20 shadow-md rounded-sm overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80"
                alt="Interior craftsmanship details"
                /* PERF: loading=lazy — below fold image */
                className="w-full h-52 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="bg-white p-1.5 border border-[#C5A880]/20 shadow-md translate-y-8 rounded-sm overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=600&q=80"
                alt="Material texture pairing"
                /* PERF: loading=lazy — below fold image */
                className="w-full h-52 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          {/* Text — enter from right */}
          <motion.div variants={slideRight}>
            <span className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.3em] uppercase text-[#C5A880] mb-3">
              <EyebrowLine />
              The Studio
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#3E322A] mb-5 leading-snug">
              Where Sophisticated Artistry Meets Modern Living
            </h2>
            <div className="space-y-4 text-[#5A4B41] font-light leading-relaxed text-sm md:text-[15px]">
              <p>
                Since 2010, Sharkings Interior Design has operated as a premier,
                full-service interior architecture studio serving Madurai and
                Ramanathapuram. Specializing in curated residential and commercial
                environments, we bring refined expertise to every project phase.
              </p>
              <p>
                Whether orchestrating a subtle refresh of custom furniture and
                bespoke palettes or commanding a comprehensive, whole-house
                renovation, our team ensures a seamless journey and an
                unparalleled, timeless result.
              </p>
            </div>

            {/* Stats row — visual proof points */}
            <motion.div
              variants={fadeInUp}
              className="mt-7 flex items-center gap-6"
            >
              {[
                { value: "15+",  label: "Years"        },
                { value: "200+", label: "Projects"     },
                { value: "100%", label: "Satisfaction" },
              ].map(({ value, label }, i) => (
                <React.Fragment key={label}>
                  {i > 0 && <div className="w-px h-8 bg-[#C5A880]/30 flex-shrink-0" />}
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-serif text-[#3E322A]">{value}</p>
                    <p className="text-[9px] sm:text-[10px] tracking-widest uppercase text-[#5A4B41] font-medium mt-0.5">
                      {label}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════
          PROJECTS SECTION
          NEW: Gradient hover overlay with slide-up title reveal
          NEW: ArrowUpRight "View Project" indicator in overlay
          FIX: scale-102 → scale-[1.06]
          FIX: py-24 → py-16 lg:py-20
          FIX: Project card data centralised above (array map)
          PERF: loading=lazy on all project images
      ═══════════════════════════════════════════════════ */}
      <motion.section
        id="projects"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="py-16 lg:py-20 px-6 lg:px-16 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-10"
          >
            <div>
              <span className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.3em] uppercase text-[#C5A880] mb-2">
                <EyebrowLine />
                Selected Works
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#3E322A] mt-1">
                Our Latest Masterpieces
              </h2>
            </div>
            <Link to="/projects">
              <button className="mt-4 sm:mt-0 group flex items-center gap-2 text-[11px] tracking-widest uppercase font-semibold text-[#3E322A] hover:text-[#C5A880] transition-colors duration-200 pb-0.5 border-b border-transparent hover:border-[#C5A880]">
                View Entire Portfolio
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
          </motion.div>

          {/* FIX: sm:grid-cols-2 added so tablet gets 2-column layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="group cursor-pointer"
              >
                {/* Card image + overlay */}
                <div className="relative overflow-hidden bg-[#FAF9F6] border border-[#C5A880]/10 mb-4 aspect-[3/4] rounded-sm shadow-sm">
                  <img
                    src={project.src}
                    alt={project.alt}
                    /* FIX: scale-[1.06] replaces invalid scale-102 */
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Gradient overlay — fades in on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3E322A]/85 via-[#3E322A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                    {/* Title slides up into view */}
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-[9px] tracking-widest uppercase text-[#C5A880] mb-1">
                        {project.category}
                      </p>
                      <h3 className="font-serif text-[18px] text-white leading-snug">
                        {project.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 mt-2 text-[9px] tracking-widest uppercase text-white/65 font-medium">
                        View Project
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Below-card meta */}
                <p className="text-[10px] tracking-widest uppercase text-[#C5A880] mb-1">
                  {project.category}
                </p>
                {/* FIX: title changes to gold on hover for click affordance */}
                <h3 className="font-serif text-xl text-[#3E322A] group-hover:text-[#C5A880] transition-colors duration-300">
                  {project.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

        <ServicesSlider/>
      {/* ═══════════════════════════════════════════════════
          WHY CHOOSE US
          NEW: Glassmorphism cards (bg-white/80 backdrop-blur-sm)
          NEW: Icon ring fills gold on card hover
          NEW: Decorative gradient BG layer (right side)
          FIX: py-24 → py-16 lg:py-20
          FIX: sm:grid-cols-2 for tablet 2-col layout
      ═══════════════════════════════════════════════════ */}
      <motion.section
        id="why-us"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="py-16 lg:py-20 px-6 lg:px-16 bg-[#FAF9F6] border-t border-b border-[#C5A880]/10 relative overflow-hidden"
      >
        {/* Decorative gradient — right half, pointer-events-none */}
        <div
          className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#EFECE6]/50 to-transparent pointer-events-none"
          aria-hidden
        />

        <motion.div
          variants={fadeInUp}
          className="max-w-6xl mx-auto text-center mb-12"
        >
          <span className="inline-flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.3em] uppercase text-[#C5A880] mb-3">
            <EyebrowLine />
            Distinction
            <EyebrowLine />
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#3E322A]">
            Why Partner With SharkingsInterior
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 lg:gap-7 relative z-10">
          {whyCards.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              /* FIX: whileHover y transform disabled for reduced-motion users */
              whileHover={prefersReducedMotion ? {} : { y: -8, transition: { duration: 0.3 } }}
              /* NEW: glassmorphism — white/80 + backdrop-blur-sm */
              className="bg-white/80 backdrop-blur-sm p-6 lg:p-8 border border-[#C5A880]/10 shadow-sm text-center transition-all duration-300 hover:shadow-lg hover:border-[#C5A880]/30 rounded-sm group"
            >
              {/* Icon ring — fills brand gold on card hover */}
              <div className="w-12 h-12 bg-gradient-to-br from-[#FAF9F6] to-[#EFECE6] rounded-full flex items-center justify-center mx-auto mb-5 text-[#C5A880] border border-[#C5A880]/15 group-hover:bg-[#C5A880] group-hover:border-[#C5A880] transition-all duration-300 shadow-sm">
                {item.icon}
              </div>
              <h3 className="font-serif text-[17px] text-[#3E322A] mb-3">{item.title}</h3>
              <p className="text-xs text-[#5A4B41] font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════
          CONTACT SECTION
          FIX: Studio info wrapped in white card for parity
          FIX: Placeholder email replaced with real studio email
          FIX: form submit button → full button with arrow icon
          FIX: focus:ring-1 added to all inputs for clarity
          FIX: Map min-h corrected for mobile (min-h-[260px])
          FIX: py-16 → py-14
      ═══════════════════════════════════════════════════ */}
      <section
        id="contact-section"
        className="bg-[#FAF9F6] py-14 px-6 lg:px-16 text-[#3E322A] border-t border-[#C5A880]/10"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="mb-8">
            <span className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.3em] uppercase text-[#C5A880] mb-2">
              <EyebrowLine />
              Connect With Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-light tracking-wide">
              Begin Your Design Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

            {/* Column 1: Studio info — wrapped in card for visual balance */}
            <div className="lg:col-span-3 bg-white border border-[#C5A880]/10 p-6 rounded-sm shadow-sm flex flex-col justify-between gap-6">
              <p className="text-[#5A4B41] font-light text-sm leading-relaxed">
                Whether orchestrating custom millwork or a comprehensive structural
                renovation across Tamil Nadu, our team is ready to welcome you.
              </p>
              <div className="space-y-3 text-[12px]">
                <div className="flex items-start gap-2.5">
                  <span className="text-[#C5A880] leading-none mt-0.5 text-sm">✉</span>
                  {/* FIX: replaced placeholder with real studio email from footer */}
                  <span className="font-light text-[#3E322A]">sharkingsindia@gmail.com</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-[#C5A880] leading-none mt-0.5 text-sm">✆</span>
                  <span className="font-light text-[#3E322A]">+91 80980 94101</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-[#C5A880] leading-none mt-0.5 text-sm">◎</span>
                  <span className="font-light text-[#3E322A]">
                    Plot no: 3552, TNHB Colony,<br />Madurai-625012, Tamil Nadu.
                  </span>
                </div>
              </div>
            </div>

            {/* Column 2: Google Maps embed */}
            {/* PERF: loading=lazy defers map iframe until viewport */}
            <div className="lg:col-span-4 bg-white border border-[#C5A880]/10 p-1.5 shadow-sm rounded-sm min-h-[260px] lg:min-h-full relative overflow-hidden">
              <iframe
                title="Sharkings Interior Studio Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15721.285741870196!2d78.11471375!3d9.92130125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b118c53a%3A0x34080bcfa057bf1!2sMadurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1717900000000!5m2!1sen!2sin"
                className="w-full h-full min-h-[250px] border-0 rounded-sm opacity-90 hover:opacity-100 transition-opacity duration-300"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Column 3: Inquiry form */}
            <div className="lg:col-span-5 bg-white p-6 lg:p-8 border border-[#C5A880]/10 shadow-sm rounded-sm">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* FIX: added focus:ring-1 focus:ring-[#C5A880]/20 for clarity */}
                  <input
                    type="text"
                    placeholder="YOUR NAME"
                    className="w-full bg-[#FAF9F6] text-[11px] tracking-widest p-3.5 border border-[#C5A880]/15 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]/20 text-[#3E322A] transition-all duration-200 rounded-sm"
                  />
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    className="w-full bg-[#FAF9F6] text-[11px] tracking-widest p-3.5 border border-[#C5A880]/15 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]/20 text-[#3E322A] transition-all duration-200 rounded-sm"
                  />
                </div>
                <input
                  type="text"
                  placeholder="PROJECT TYPE (E.G., SALON, VILLA, KITCHEN)"
                  className="w-full bg-[#FAF9F6] text-[11px] tracking-widest p-3.5 border border-[#C5A880]/15 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]/20 text-[#3E322A] transition-all duration-200 rounded-sm"
                />
                <textarea
                  rows="4"
                  placeholder="TELL US ABOUT YOUR SPACE..."
                  className="w-full bg-[#FAF9F6] text-[11px] tracking-widest p-3.5 border border-[#C5A880]/15 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]/20 text-[#3E322A] transition-all duration-200 resize-none rounded-sm"
                />

                {/* FIX: type="submit" kept; icon + hover shadow added */}
                <button
                  type="submit"
                  className="w-full bg-[#3E322A] hover:bg-[#C5A880] text-white text-[11px] font-semibold tracking-[0.2em] uppercase py-4 transition-all duration-300 rounded-sm shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
                >
                  Send Inquiry
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FOOTER
          NEW: Logo image + wordmark in brand column
          FIX: sm:col-span-2 on brand column for tablet
          FIX: footer links use flex-wrap + gap to prevent overflow
          FIX: h4 spacing mb-3 → mb-4 for breathing room
          PERF: logo loading=lazy (off-screen on initial load)
      ═══════════════════════════════════════════════════ */}
      <footer className="bg-[#3E322A] text-white py-12 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 border-b border-white/10 pb-10">

          {/* Brand column — full width on mobile, 2-col span on sm, 1-col on md+ */}
          <div className="sm:col-span-2 md:col-span-1 space-y-4">
            {/* NEW: Logo + wordmark pairing */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img
                  src={Logo}
                  alt="Sharkings Interior"
                  className="w-7 h-7 object-contain mix-blend-screen opacity-90"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="text-sm font-serif tracking-[0.2em] uppercase leading-none">
                SHARKINGS<span className="text-[#C5A880] font-light">INTERIOR</span>
              </h3>
            </div>
            <p className="text-sm text-stone-300 font-light max-w-xs leading-relaxed">
              Curating high-end spatial realities that echo timelessness, warmth,
              and unmatched distinction.
            </p>
          </div>

          {/* Connect column */}
          <div>
            <h4 className="text-[11px] tracking-widest uppercase text-[#C5A880] font-semibold mb-4">
              Connect
            </h4>
            <div className="space-y-2">
              <p className="text-sm text-stone-200 font-light hover:text-[#C5A880] transition-colors cursor-pointer tracking-wide">
                sharkingsindia@gmail.com
              </p>
              <p className="text-sm text-stone-200 font-light">
                +91 80980 94101
              </p>
            </div>
          </div>

          {/* Location column */}
          <div>
            <h4 className="text-[11px] tracking-widest uppercase text-[#C5A880] font-semibold mb-4">
              Studio Location
            </h4>
            <p className="text-sm text-stone-200 font-light leading-relaxed">
              Plot no: 3552, TNHB Colony<br />
              Madurai-625012, Tamil Nadu.
            </p>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="max-w-6xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs tracking-wider text-stone-400">
          <p>© 2026 SharkingsInterior. All rights reserved.</p>
          {/* FIX: flex-wrap + gap instead of space-x-6 — prevents overflow on 320px */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-x-5 gap-y-1">
            <a href="#" className="hover:text-[#C5A880] transition-colors font-light">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#C5A880] transition-colors font-light">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}