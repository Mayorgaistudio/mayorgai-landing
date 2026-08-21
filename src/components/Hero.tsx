"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

// ── Film grain canvas overlay (adapted for light & dark mode) ──
function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { width: w, height: h } = canvas;
      const img = ctx.createImageData(w, h);
      const buf = img.data;
      for (let i = 0; i < buf.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        buf[i] = buf[i + 1] = buf[i + 2] = v;
        buf[i + 3] = 8;
      }
      ctx.putImageData(img, 0, 0);
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-20 dark:opacity-25 mix-blend-multiply dark:mix-blend-screen z-[2]"
    />
  );
}

export default function Hero() {
  const sectionRef      = useRef<HTMLElement>(null);
  const videoDarkRef    = useRef<HTMLVideoElement>(null);
  const videoLightRef   = useRef<HTMLVideoElement>(null);
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const [isDark, setIsDark] = useState(true);

  // ── Listen to theme changes in real-time ──
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Normalized raw mouse X (LERP handles easing in RAF)
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  // Springs for 3D tilt, parallax and ambient glow movement
  const springCss = { stiffness: 70, damping: 20, mass: 0.5 };
  const springX   = useSpring(rawX, springCss);
  const springY   = useSpring(rawY, springCss);

  const rotateY = useTransform(springX, [0, 1], [-10, 10]);
  const rotateX = useTransform(springY, [0, 1], [5, -5]);
  const leftX   = useTransform(springX, [0, 1], [8, -8]);
  const rightX  = useTransform(springX, [0, 1], [-8, 8]);
  const glowX   = useTransform(springX, [0, 1], ["-20%", "20%"]);
  const glowY   = useTransform(springY, [0, 1], ["-10%", "10%"]);

  // ── Canvas scrubbing with LERP (Dual Video Engine: Dark + Light) ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let currentT = 0.5; // current lerped position (0-1)
    let rafId: number;

    const tick = () => {
      const targetT = rawX.get();
      // Smooth interpolation — 0.05 gives balanced cinematic inertia
      currentT += (targetT - currentT) * 0.05;

      const activeVideo = isDark ? videoDarkRef.current : videoLightRef.current;
      if (activeVideo && activeVideo.readyState >= 2 && activeVideo.duration && isFinite(activeVideo.duration)) {
        activeVideo.currentTime = currentT * activeVideo.duration;

        // Keep canvas in sync with video dimensions
        if (canvas.width !== activeVideo.videoWidth && activeVideo.videoWidth > 0) {
          canvas.width  = activeVideo.videoWidth;
          canvas.height = activeVideo.videoHeight;
        }

        ctx.drawImage(activeVideo, 0, 0, canvas.width, canvas.height);
      }

      rafId = requestAnimationFrame(tick);
    };

    const setupVideo = (video: HTMLVideoElement | null) => {
      if (!video) return;
      video.load();
      const onMeta = () => {
        if (canvas && video.videoWidth > 0) {
          canvas.width  = video.videoWidth;
          canvas.height = video.videoHeight;
        }
        video.currentTime = 0.5 * (video.duration || 1);
      };
      video.addEventListener("loadedmetadata", onMeta);
      if (video.readyState >= 1) onMeta();
    };

    setupVideo(videoDarkRef.current);
    setupVideo(videoLightRef.current);

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [rawX, isDark]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width);
    rawY.set((e.clientY - rect.top)  / rect.height);
  };

  const handleMouseLeave = () => {
    rawX.set(0.5);
    rawY.set(0.5);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, delay: i * 0.13, ease: [0.16, 1, 0.3, 1] as any },
    }),
  };

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-white via-slate-50/80 to-slate-100/60 dark:from-[#07090f] dark:via-[#0b0e1a] dark:to-[#080d17] transition-colors duration-300"
    >
      <FilmGrain />

      {/* Vignette for dark mode */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-300 z-[3]"
        style={{
          background:
            "radial-gradient(ellipse 110% 90% at 50% 50%, transparent 35%, rgba(0,0,0,0.82) 100%)",
        }}
      />

      {/* Central ambient glow behind robot */}
      <div
        className="absolute pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full filter blur-[70px] z-[1] opacity-70 dark:opacity-100"
        style={{
          background:
            "radial-gradient(circle, rgba(109,93,251,0.15) 0%, rgba(0,212,255,0.07) 45%, transparent 70%)",
        }}
      />

      {/* Mouse-reactive glow orb */}
      <div className="absolute pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
        <motion.div
          className="w-[700px] h-[700px] rounded-full filter blur-[90px] opacity-60 dark:opacity-100"
          style={{
            background:
              "radial-gradient(circle, rgba(109,93,251,0.10) 0%, rgba(0,212,255,0.05) 50%, transparent 70%)",
            x: glowX,
            y: glowY,
          }}
        />
      </div>

      {/* Subtle scan lines */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-50 dark:opacity-100"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(109,93,251,0.015) 3px, rgba(109,93,251,0.015) 4px)",
        }}
      />

      {/* Decorative orbital rings */}
      {[480, 600, 720].map((size, i) => (
        <div
          key={size}
          className="absolute pointer-events-none rounded-full top-1/2 left-1/2 z-[1]"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            marginLeft: `-${size / 2}px`,
            marginTop: `-${size / 2}px`,
            border: `1px solid rgba(109,93,251,${(0.08 - i * 0.02).toFixed(3)})`,
          }}
        />
      ))}

      {/* ── 3-column layout ── */}
      <div className="relative w-full max-w-[1400px] mx-auto px-8 z-10 py-28 lg:min-h-screen lg:flex lg:items-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-16 items-center w-full">

          {/* ══════════════════════════
              LEFT — Headline
          ══════════════════════════ */}
          <motion.div style={{ x: leftX }} className="flex flex-col items-start lg:items-end text-left lg:text-right">
            {/* Eyebrow */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="inline-flex items-center gap-2 mb-8">
              <span className="text-[9px] uppercase tracking-[0.4em] font-semibold text-slate-500/70 dark:text-silver/40">
                MAYORGAI STUDIO
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple/70" />
              <span className="text-[9px] uppercase tracking-[0.28em] font-semibold text-gradient-aurora">
                AI &amp; TECH
              </span>
            </motion.div>

            {/* Big Headline */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-cabinet font-black text-slate-900 dark:text-white leading-[1.0] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.6rem, 4.5vw, 4.8rem)" }}
            >
              Build<br />
              <span className="text-gradient-aurora">Beautiful</span><br />
              Systems.
            </motion.h1>

            {/* Sub-label divider */}
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-10 flex items-center gap-4 justify-start lg:justify-end"
            >
              <span className="text-[9px] uppercase tracking-[0.35em] text-slate-400 dark:text-silver/25">
                Est. 2024
              </span>
              <div className="h-px w-16 bg-gradient-to-r from-purple/40 to-transparent dark:from-purple/50" />
            </motion.div>
          </motion.div>

          {/* ══════════════════════════
              CENTER — Robot Canvas Display (Dual Light/Dark Mode)
          ══════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] as any }}
            className="flex justify-center"
          >
            <div style={{ perspective: "1000px" }}>
              <motion.div
                style={{
                  rotateY,
                  rotateX,
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                  animation: "float 7s ease-in-out infinite",
                }}
              >
                {/* Premium Console Frame */}
                <div
                  className="relative rounded-[20px] p-[2px] shadow-2xl shadow-purple/15 dark:shadow-purple/20 transition-all duration-300"
                  style={{
                    width: "clamp(200px, 20vw, 280px)",
                    background:
                      "linear-gradient(135deg, rgba(109,93,251,0.7) 0%, rgba(0,212,255,0.3) 50%, rgba(109,93,251,0.5) 100%)",
                  }}
                >
                  <div className="rounded-[19px] overflow-hidden bg-white dark:bg-black relative transition-colors duration-300">
                    {/* Device Chrome Bar */}
                    <div
                      className="h-[24px] flex items-center px-2.5 gap-1.5 border-b border-slate-200/80 dark:border-purple/20 bg-slate-100/90 dark:bg-gradient-to-r dark:from-purple/20 dark:to-cyan/10 transition-colors"
                    >
                      {["rgba(251,109,109,0.85)", "rgba(251,200,109,0.85)", "rgba(109,251,130,0.85)"].map((c, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
                      ))}
                      <span className="text-[8px] tracking-widest uppercase text-slate-500 dark:text-silver/30 ml-auto mr-1 font-mono">
                        JARVIS · ONLINE
                      </span>
                    </div>

                    {/* Canvas displaying scrubbed video frames */}
                    <canvas
                      ref={canvasRef}
                      className="block w-full h-auto bg-white dark:bg-black transition-colors"
                    />

                    {/* Hidden Dark Mode Video Source */}
                    <video
                      ref={videoDarkRef}
                      src="/mascot/Personaje_gira_su_cabeza_202608201419.mp4"
                      muted
                      playsInline
                      preload="auto"
                      className="hidden"
                    />

                    {/* Hidden Light Mode Video Source (Jarvis_Blanco) */}
                    <video
                      ref={videoLightRef}
                      src="/mascot/Jarvis_Blanco.mp4"
                      muted
                      playsInline
                      preload="auto"
                      className="hidden"
                    />

                    {/* Screen Scanline Texture */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-100"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
                      }}
                    />

                    {/* Holographic Cyan Corner Flare */}
                    <div
                      className="absolute top-6 right-0 w-[70px] h-[70px] pointer-events-none opacity-60 dark:opacity-100"
                      style={{
                        background:
                          "radial-gradient(circle at top right, rgba(0,212,255,0.18), transparent 70%)",
                      }}
                    />

                    {/* Bottom Aurora Ambient Bloom */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[60px] pointer-events-none opacity-40 dark:opacity-100"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(109,93,251,0.15), transparent)",
                      }}
                    />
                  </div>
                </div>

                {/* Ground Reflection Flare */}
                <div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[65%] h-[24px] pointer-events-none filter blur-[10px]"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 0%, rgba(109,93,251,0.3) 0%, transparent 70%)",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* ══════════════════════════
              RIGHT — Paragraph & Actions
          ══════════════════════════ */}
          <motion.div style={{ x: rightX }} className="flex flex-col items-start">
            {/* Availability Status Badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full bg-purple/5 border border-purple/20 dark:bg-purple/[0.08] dark:border-purple/20 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)] animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-slate-700 dark:text-silver/60">
                Disponible para proyectos
              </span>
            </motion.div>

            {/* Description Text */}
            <motion.p
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-lg leading-[1.85] mb-10 max-w-[320px] text-slate-600 dark:text-silver/50 font-normal"
            >
              Combinamos{" "}
              <span className="text-slate-900 dark:text-silver/90 font-semibold">creatividad</span> e{" "}
              <span className="text-slate-900 dark:text-silver/90 font-semibold">inteligencia artificial</span>{" "}
              para diseñar marcas, sitios web y sistemas de automatización que hacen crecer tu negocio.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-3 w-full max-w-[260px]"
            >
              <a
                href="#contact"
                onClick={(e) => scrollTo(e, "#contact")}
                className="gradient-aurora px-8 py-4 rounded-full text-base font-semibold text-white text-center transition-all duration-300 btn-glow shadow-lg shadow-purple/25 hover:shadow-purple/40"
              >
                Agendar Llamada
              </a>
              <a
                href="#portfolio"
                onClick={(e) => scrollTo(e, "#portfolio")}
                className="px-8 py-4 rounded-full text-base font-medium text-center text-slate-700 hover:text-slate-950 bg-slate-100/90 hover:bg-slate-200/90 border border-slate-200/90 dark:text-silver/60 dark:bg-white/[0.03] dark:border-white/[0.08] dark:hover:text-white dark:hover:border-purple/40 transition-all duration-300"
              >
                Ver Proyectos →
              </a>
            </motion.div>

            {/* Bottom Service Pillars */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-12 flex items-center gap-4"
            >
              <div className="h-px w-12 bg-purple/30 dark:bg-purple/25" />
              <span className="text-[9px] uppercase tracking-[0.4em] font-semibold text-gradient-aurora">
                Branding
              </span>
              <span className="text-[9px] uppercase tracking-[0.4em] text-slate-400 dark:text-silver/25">
                · Web · Automatización · IA
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
