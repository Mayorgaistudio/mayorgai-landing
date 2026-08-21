"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Initial theme detection
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  const navLinks = [
    { name: "Servicios", href: "#services" },
    { name: "Portafolio", href: "#portfolio" },
    { name: "Proceso", href: "#process" },
    { name: "Contacto", href: "#contact" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 pointer-events-none flex justify-center px-4 sm:px-6 pt-3 sm:pt-4">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto w-full max-w-6xl rounded-full transition-all duration-500 flex items-center justify-between ${
            scrolled
              ? "py-2.5 px-4 sm:px-6 bg-white/75 dark:bg-[#090B12]/75 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] ring-1 ring-slate-900/5 dark:ring-white/[0.08]"
              : "py-3 px-2 sm:px-4 bg-transparent ring-0 shadow-none"
          }`}
        >
          {/* Logo */}
          <a
            href="#"
            className="flex items-center group py-1"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {/* Dark mode logo */}
            <img
              src="/brand/logo-horizontal.svg"
              alt="MayorgAI Studio"
              className="h-8 sm:h-9 w-auto opacity-90 group-hover:opacity-100 transition-all duration-300 hidden dark:block"
            />
            {/* Light mode logo (optically scaled to match SVG) */}
            <img
              src="/brand/logo oscuro.png"
              alt="MayorgAI Studio"
              className="h-10 sm:h-11 md:h-12 w-auto opacity-90 group-hover:opacity-100 transition-all duration-300 block dark:hidden object-contain -my-1.5 origin-left scale-105"
            />
          </a>

          {/* Desktop Nav Links with Floating Pill Hover */}
          <div
            className="hidden md:flex items-center gap-1 bg-slate-100/50 dark:bg-white/[0.03] p-1 rounded-full border border-slate-200/40 dark:border-white/[0.04]"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                onMouseEnter={() => setHoveredIndex(index)}
                className="relative px-4 py-1.5 text-xs uppercase tracking-[0.18em] font-semibold text-slate-600 hover:text-slate-900 dark:text-silver/65 dark:hover:text-white transition-colors duration-200"
              >
                {hoveredIndex === index && (
                  <motion.span
                    layoutId="navHoverPill"
                    className="absolute inset-0 rounded-full bg-white dark:bg-white/10 shadow-sm shadow-slate-900/5"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            ))}
          </div>

          {/* Actions: Theme Toggle + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100/80 hover:bg-slate-200 text-slate-700 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] dark:text-white border border-slate-200/60 dark:border-white/[0.1] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-sm"
              aria-label="Cambiar tema"
            >
              {theme === "dark" ? (
                /* Bombillito blanco */
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                </svg>
              ) : (
                /* Luna para volver al modo oscuro */
                <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>

            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="relative inline-flex items-center justify-center px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-semibold text-white gradient-aurora hover:shadow-[0_0_25px_rgba(109,93,251,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 btn-glow"
            >
              Agendar Llamada
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] dark:text-white border border-slate-200 dark:border-white/10 transition-all cursor-pointer"
              aria-label="Cambiar tema"
            >
              {theme === "dark" ? (
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8 h-8 rounded-full flex flex-col items-center justify-center gap-1 bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              <span
                className={`w-4 h-[1.5px] bg-slate-800 dark:bg-white rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? "transform rotate-45 translate-y-[5.5px]" : ""
                }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-slate-800 dark:bg-white rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-slate-800 dark:bg-white rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? "transform -rotate-45 -translate-y-[5.5px]" : ""
                }`}
              />
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-deep-space/95 flex flex-col justify-center items-center px-6 md:hidden"
          >
            <div className="flex flex-col items-center gap-8 text-center">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * idx, duration: 0.4 }}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-xl uppercase tracking-[0.25em] font-semibold text-slate-700 hover:text-slate-900 dark:text-silver/80 dark:hover:text-white transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                href="#contact"
                onClick={(e) => handleScrollTo(e, "#contact")}
                className="mt-4 px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.25em] font-semibold text-white gradient-aurora hover:shadow-[0_0_35px_rgba(109,93,251,0.5)] transition-all"
              >
                Agendar Llamada
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
