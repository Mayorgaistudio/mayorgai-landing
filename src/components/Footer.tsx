"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    const observer = new MutationObserver(() => checkTheme());
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Servicios", href: "#services" },
    { label: "Portafolio", href: "#portfolio" },
    { label: "Proceso", href: "#process" },
    { label: "Por Qué MayorgAI", href: "#why-mayorgai" },
    { label: "Preguntas Frecuentes", href: "#faq" },
    { label: "Contacto", href: "#contact" },
  ];

  const socials = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/mayorgaistudio",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/mayorgaistudio/",
      icon: (
        <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      name: "X",
      href: "https://x.com/mayorgaistudio",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@mayorgaistudio",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative pt-16 pb-8 border-t border-slate-200/80 dark:border-white/[0.08] bg-slate-50/90 dark:bg-[#07090f] overflow-hidden select-none transition-colors duration-300">
      {/* Background Volumetric Flare */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#6D5DFB]/[0.05] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ── TOP ROW: Brand Info + Nav + Socials ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-slate-200/60 dark:border-white/[0.06] items-start">
          
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-start">
            <img
              src={isDark ? "/brand/logo-horizontal.svg" : "/brand/logo oscuro.png"}
              alt="MayorgAI Studio"
              className="h-8 sm:h-9 w-auto mb-4"
            />
            <p className="text-sm text-slate-500 dark:text-silver/60 max-w-sm font-normal leading-relaxed mb-4">
              Estudio creativo y tecnológico especializado en diseño web de alto impacto, branding y automatización con IA.
            </p>
            {/* Live Infrastructure Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
              <span>SISTEMAS OPERATIVOS · 99.9% UPTIME</span>
            </div>
          </div>

          {/* Quick Nav Links (4 cols) */}
          <div className="md:col-span-4">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-slate-900 dark:text-white block mb-4">
              Navegación
            </span>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs sm:text-sm text-slate-500 dark:text-silver/60 hover:text-purple dark:hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact & Socials Col (3 cols) */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-slate-900 dark:text-white block mb-4">
              Conéctate
            </span>
            <div className="flex gap-3 mb-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-200/60 dark:bg-white/[0.04] border border-slate-300/50 dark:border-white/[0.08] flex items-center justify-center text-slate-600 dark:text-silver/70 hover:text-white hover:bg-purple dark:hover:bg-purple transition-all duration-300 shadow-sm"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <a
              href="mailto:ceomayorgaistudio@gmail.com"
              className="text-xs text-slate-500 dark:text-silver/50 hover:text-purple dark:hover:text-white transition-colors"
            >
              ceomayorgaistudio@gmail.com
            </a>
            <span className="text-xs text-slate-400 dark:text-silver/40 mt-0.5">
              Quito — Ecuador
            </span>
          </div>

        </div>

        {/* ── MONUMENTAL BRAND MARK (AURORA SHIMMER & HALO ECLIPSE) ── */}
        <div className="relative pt-12 pb-6 text-center overflow-hidden flex items-center justify-center">
          {/* Central Volumetric Glow Halo */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[850px] h-[190px] rounded-full blur-[70px] pointer-events-none opacity-85 dark:opacity-95"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(109,93,251,0.38) 0%, rgba(0,212,255,0.2) 45%, transparent 80%)",
            }}
          />

          {/* Luminous Monumental Typography */}
          <span
            className="relative z-10 text-[13vw] sm:text-[14vw] font-black font-cabinet leading-none tracking-tight block select-none pointer-events-none text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-purple-dark to-slate-700 dark:from-white dark:via-purple-light/90 dark:to-cyan/80 drop-shadow-[0_10px_40px_rgba(109,93,251,0.35)] transition-all duration-300"
            style={{ letterSpacing: "-0.035em" }}
          >
            MAYORGAI
          </span>
        </div>

        {/* ── BOTTOM COPYRIGHT & BACK TO TOP ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200/60 dark:border-white/[0.04] text-xs text-slate-400 dark:text-silver/30 font-normal">
          <div>
            &copy; {new Date().getFullYear()} MayorgAI Studio. Todos los derechos reservados.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-500 dark:text-silver/50 hover:text-purple dark:hover:text-white transition-colors cursor-pointer"
          >
            <span>Volver Arriba</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </button>
        </div>

      </div>
    </footer>
  );
}
