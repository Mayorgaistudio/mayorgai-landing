"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // ── Raw mouse position (0–1) ──
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  const springConfig = { stiffness: 80, damping: 20, mass: 0.6 };
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);

  // ── Jarvis 3-D rotation ──
  const rotateY = useTransform(springX, [0, 1], [-15, 15]);
  const rotateX = useTransform(springY, [0, 1], [8, -8]);

  /*
    ── Lit arc segment — strokeDashoffset math ──

    Arc: circle cx=260 cy=270 r=215
    Circumference ≈ 1351px
    Visible arc (dasharray="973 1351") covers ~259° sweeping clockwise
    from ~4:30 o'clock to ~1:30 o'clock (gap hidden at right side)

    Arc landmarks (px from start, clockwise from 4:30):
      9 o'clock  (left)  ≈ 450px in
      12 o'clock (top)   ≈ 785px in
      1:30 o'clock (end) ≈ 960px in

    Lit segment length: 300px  (half-segment center offset: 150px)
    dashoffset to center segment at position P: P - 150

    Mouse left  (springX=0) → light up left/9-o'clock  → P=450 → offset=300
    Mouse right (springX=1) → light up right/top area  → P=870 → offset=720

    Y adjustment: mouse top pushes bright spot toward 12 o'clock (+200),
                  mouse bottom pulls it down (-200)
  */
  const containerRef = useRef<HTMLDivElement>(null);
  const lastAngleRef = useRef<number>(-Math.PI / 2);
  const cumulativeAngleRef = useRef<number>(-Math.PI / 2);

  // Initial offset for -Math.PI / 2 (12 o'clock position)
  const rawArcOffset = useMotionValue(487.72);
  const springArcOffset = useSpring(rawArcOffset, springConfig);

  // ── Mouse handlers ──
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width);
    rawY.set((e.clientY - rect.top) / rect.height);

    const container = containerRef.current;
    if (container) {
      const cRect = container.getBoundingClientRect();
      const centerX = cRect.left + cRect.width / 2;
      const centerY = cRect.top + cRect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      const newAngle = Math.atan2(dy, dx);

      let diff = newAngle - lastAngleRef.current;
      while (diff < -Math.PI) diff += 2 * Math.PI;
      while (diff > Math.PI) diff -= 2 * Math.PI;

      cumulativeAngleRef.current += diff;
      lastAngleRef.current = newAngle;

      const targetPos = (cumulativeAngleRef.current / (2 * Math.PI)) * 1350.88;
      const targetOffset = 150 - targetPos;

      rawArcOffset.set(targetOffset);
    }
  };

  const handleMouseLeave = () => {
    rawX.set(0.5);
    rawY.set(0.5);
    lastAngleRef.current = -Math.PI / 2;
    cumulativeAngleRef.current = -Math.PI / 2;
    rawArcOffset.set(487.72);
  };

  // ── Entry animation ──
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.25 },
    },
  };

  const itemVariants = {
    hidden: { y: 36, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      {/* ── Background glows ── */}
      <div
        className="absolute top-[-10%] right-[-8%] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(109,93,251,0.12) 0%, rgba(109,93,251,0.04) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-[-5%] left-[-5%] w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(0,212,255,0.06) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      {/* ── Grid texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(109,93,251,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(109,93,251,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 60% at 60% 50%, black 0%, transparent 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 py-36 lg:pt-36 lg:pb-16 lg:min-h-screen lg:flex lg:items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center w-full">

          {/* ── Left: Text ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col text-left"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 mb-8">
              <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-slate-500/70 dark:text-silver/50">
                MAYORGAI STUDIO
              </span>
              <span className="w-1 h-1 bg-purple rounded-full opacity-70" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-gradient-aurora">
                ESTUDIO DE IA Y TECNOLOGÍA CREATIVA
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-cabinet font-bold text-slate-900 dark:text-white leading-[1.04] tracking-[-0.02em] mb-8"
              style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
            >
              Build Beautiful <br />
              <span className="text-gradient-aurora">Systems.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-600 dark:text-silver/65 font-normal leading-[1.75] max-w-md mb-12"
            >
              Combinamos creatividad e inteligencia artificial para diseñar
              marcas, sitios web y sistemas de automatización que ayudan a hacer
              crecer tu negocio.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "#contact")}
                className="px-9 py-4 rounded-full text-base font-semibold text-white gradient-aurora hover:shadow-[0_0_40px_rgba(109,93,251,0.45)] transition-all duration-300 btn-glow"
              >
                Agendar Llamada
              </a>
              <a
                href="#portfolio"
                onClick={(e) => handleScrollTo(e, "#portfolio")}
                className="px-9 py-4 rounded-full text-base font-medium text-slate-600 dark:text-silver/70 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/25 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-all duration-300"
              >
                Ver Proyectos
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right: Jarvis + Arc Halo ── */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] as any }}
            className="relative flex items-center justify-center lg:justify-end"
          >

            {/* ══════════════════════════════════════
                HALO ARC — 5-layer system
                All share: cx=260 cy=270 r=215
                           dasharray="973 1351" (visible arc)
                           rotate(120 260 270) (gap at right)

                Layer 1: base arc    — always visible, gives structure
                Layer 2: base bloom  — soft wide blur beneath the line
                Layer 3: lit bloom   — reactive wide glow (dashoffset driven)
                Layer 4: lit line    — reactive bright sharp line (dashoffset driven)
                Layer 5: lit core    — ultra-thin white-hot center line
            ══════════════════════════════════════ */}
            <svg
              className="absolute pointer-events-none"
              style={{ width: "520px", height: "520px", overflow: "visible" }}
              viewBox="0 0 520 520"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Base gradient — vivid, base colors */}
                <linearGradient id="basGrad" x1="0%" y1="100%" x2="100%" y2="0%" gradientUnits="objectBoundingBox">
                  <stop offset="0%"   stopColor="#6D5DFB" stopOpacity="0.65" />
                  <stop offset="50%"  stopColor="#8A63FF" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.65" />
                </linearGradient>

                {/* Lit gradient — vivid, saturated */}
                <linearGradient id="litGrad" x1="10%" y1="90%" x2="90%" y2="10%" gradientUnits="objectBoundingBox">
                  <stop offset="0%"   stopColor="#6D5DFB" stopOpacity="0" />
                  <stop offset="20%"  stopColor="#6D5DFB" stopOpacity="1" />
                  <stop offset="50%"  stopColor="#A78BFF" stopOpacity="1" />
                  <stop offset="80%"  stopColor="#00D4FF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
                </linearGradient>

                {/* Soft bloom blur filter */}
                <filter id="bloom" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="7" />
                </filter>

                {/* Tighter glow for the lit line */}
                <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* ── Layer 1: Dim base circle — always on ── */}
              <circle
                cx="260" cy="270" r="215"
                stroke="url(#basGrad)"
                strokeWidth="1.5"
                fill="none"
                opacity="0.8"
              />

              {/* ── Layer 2: Dim base bloom — ambient glow under full circle ── */}
              <circle
                cx="260" cy="270" r="215"
                stroke="url(#basGrad)"
                strokeWidth="12"
                fill="none"
                filter="url(#bloom)"
                opacity="0.25"
              />

              {/* ── Layer 3: Reactive bloom — wide glow follows mouse ── */}
              <motion.circle
                cx="260" cy="270" r="215"
                stroke="url(#litGrad)"
                strokeWidth="24"
                fill="none"
                strokeDasharray="300 1351"
                style={{ strokeDashoffset: springArcOffset }}
                filter="url(#bloom)"
                opacity="0.75"
              />

              {/* ── Layer 4: Reactive line — sharp bright stroke follows mouse ── */}
              <motion.circle
                cx="260" cy="270" r="215"
                stroke="url(#litGrad)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="300 1351"
                style={{ strokeDashoffset: springArcOffset }}
                filter="url(#lineGlow)"
                opacity="1"
              />
            </svg>

            {/* ── Soft ambient bloom behind head ── */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: "300px",
                height: "300px",
                background: "radial-gradient(ellipse at 50% 55%, rgba(109,93,251,0.12) 0%, rgba(0,212,255,0.05) 55%, transparent 80%)",
                filter: "blur(35px)",
              }}
            />

            {/* ── Jarvis head — float → perspective → rotation ── */}
            <div
              className="relative z-10 w-full max-w-[380px] lg:max-w-[440px] select-none pointer-events-none"
              style={{ animation: "float 7s ease-in-out infinite" }}
            >
              <div style={{ perspective: "900px", perspectiveOrigin: "50% 50%" }}>
                <motion.div
                  style={{
                    rotateY,
                    rotateX,
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                  }}
                >
                  <img
                    src="/mascot/jarvis-full.png"
                    alt="Jarvis AI Assistant"
                    className="w-full h-auto"
                    style={{
                      filter: "drop-shadow(0 0 50px rgba(109,93,251,0.25)) drop-shadow(0 0 100px rgba(0,212,255,0.1))",
                      display: "block",
                    }}
                  />
                </motion.div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
