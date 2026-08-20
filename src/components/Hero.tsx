"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

// ── Film grain ──
function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
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
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ mixBlendMode: "screen", opacity: 0.25, zIndex: 2 }} />;
}

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);

  // Normalized raw mouse X (no spring — LERP handles easing in RAF)
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  // Springs only for CSS transforms (3D tilt + parallax + glow)
  const springCss = { stiffness: 70, damping: 20, mass: 0.5 };
  const springX   = useSpring(rawX, springCss);
  const springY   = useSpring(rawY, springCss);

  const rotateY = useTransform(springX, [0, 1], [-10, 10]);
  const rotateX = useTransform(springY, [0, 1], [5, -5]);
  const leftX   = useTransform(springX, [0, 1], [8, -8]);
  const rightX  = useTransform(springX, [0, 1], [-8, 8]);
  const glowX   = useTransform(springX, [0, 1], ["-20%", "20%"]);
  const glowY   = useTransform(springY, [0, 1], ["-10%", "10%"]);

  // ── Professional canvas scrubbing: LERP + drawImage ──
  useEffect(() => {
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let currentT = 0.5; // current lerped position (0-1)
    let rafId: number;

    const tick = () => {
      const targetT = rawX.get();
      // LERP: smooth interpolation — 0.08 gives nice weighted feel
      currentT += (targetT - currentT) * 0.08;

      if (video.readyState >= 2 && video.duration && isFinite(video.duration)) {
        video.currentTime = currentT * video.duration;
        // Draw the current decoded frame to canvas — smooth and GPU-composited
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      rafId = requestAnimationFrame(tick);
    };

    const onMeta = () => {
      // Set canvas to exact video dimensions for crisp rendering
      canvas.width  = video.videoWidth;
      canvas.height = video.videoHeight;
      // Draw first frame immediately
      video.currentTime = 0.5 * video.duration;
      rafId = requestAnimationFrame(tick);
    };

    video.addEventListener("loadedmetadata", onMeta);
    // Force the browser to actually start loading the file
    video.load();
    if (video.readyState >= 1) onMeta();

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [rawX]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width);
    rawY.set((e.clientY - rect.top)  / rect.height);
  };
  const handleMouseLeave = () => { rawX.set(0.5); rawY.set(0.5); };

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
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
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(155deg, #07090f 0%, #0b0e1a 45%, #080d17 100%)" }}
    >
      <FilmGrain />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 110% 90% at 50% 50%, transparent 35%, rgba(0,0,0,0.82) 100%)",
        zIndex: 3,
      }} />

      {/* Central glow */}
      <div className="absolute pointer-events-none" style={{
        top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(109,93,251,0.14) 0%, rgba(0,212,255,0.06) 45%, transparent 70%)",
        filter: "blur(70px)", zIndex: 1,
      }} />

      {/* Mouse glow */}
      <div className="absolute pointer-events-none" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1 }}>
        <motion.div style={{
          width: "700px", height: "700px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(109,93,251,0.08) 0%, rgba(0,212,255,0.04) 50%, transparent 70%)",
          filter: "blur(90px)", x: glowX, y: glowY,
        }} />
      </div>

      {/* Scan lines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(109,93,251,0.01) 3px, rgba(109,93,251,0.01) 4px)",
        zIndex: 1,
      }} />

      {/* Decorative rings */}
      {[480, 600, 720].map((size, i) => (
        <div key={size} className="absolute pointer-events-none" style={{
          top: "50%", left: "50%",
          width: `${size}px`, height: `${size}px`,
          marginLeft: `-${size / 2}px`, marginTop: `-${size / 2}px`,
          borderRadius: "50%",
          border: `1px solid rgba(109,93,251,${(0.07 - i * 0.018).toFixed(3)})`,
          zIndex: 1,
        }} />
      ))}

      {/* 3-column layout */}
      <div className="relative w-full max-w-[1400px] mx-auto px-8 z-10 py-28 lg:min-h-screen lg:flex lg:items-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-16 items-center w-full">

          {/* LEFT — Headline */}
          <motion.div style={{ x: leftX }} className="flex flex-col items-start lg:items-end text-left lg:text-right">
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="inline-flex items-center gap-2 mb-8">
              <span className="text-[9px] uppercase tracking-[0.4em] font-semibold" style={{ color: "rgba(200,206,218,0.3)" }}>MAYORGAI STUDIO</span>
              <span className="w-1 h-1 rounded-full" style={{ background: "rgba(109,93,251,0.7)" }} />
              <span className="text-[9px] uppercase tracking-[0.28em] font-semibold text-gradient-aurora">AI &amp; TECH</span>
            </motion.div>

            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
              className="font-cabinet font-black text-white leading-[1.0] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.6rem, 4.5vw, 4.8rem)" }}>
              Build<br />
              <span className="text-gradient-aurora">Beautiful</span><br />
              Systems.
            </motion.h1>

            <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="mt-10 flex items-center gap-4 justify-start lg:justify-end">
              <span className="text-[9px] uppercase tracking-[0.35em]" style={{ color: "rgba(200,206,218,0.18)" }}>Est. 2024</span>
              <div className="h-px w-16" style={{ background: "linear-gradient(90deg, rgba(109,93,251,0.5), transparent)" }} />
            </motion.div>
          </motion.div>

          {/* CENTER — Robot via canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] as any }}
            className="flex justify-center"
          >
            <div style={{ perspective: "1000px" }}>
              <motion.div style={{
                rotateY, rotateX,
                transformStyle: "preserve-3d",
                willChange: "transform",
                animation: "float 7s ease-in-out infinite",
              }}>
                {/* Premium frame — reduced size to match paragraph height */}
                <div style={{
                  position: "relative",
                  width: "clamp(200px, 20vw, 280px)",
                  borderRadius: "20px",
                  padding: "2px",
                  background: "linear-gradient(135deg, rgba(109,93,251,0.7) 0%, rgba(0,212,255,0.25) 50%, rgba(109,93,251,0.5) 100%)",
                  boxShadow: "0 0 0 1px rgba(109,93,251,0.12), 0 0 50px rgba(109,93,251,0.22), 0 0 100px rgba(0,212,255,0.08), 0 40px 70px rgba(0,0,0,0.65)",
                }}>
                  <div style={{ borderRadius: "19px", overflow: "hidden", background: "#000", position: "relative" }}>

                    {/* Chrome bar */}
                    <div style={{
                      height: "24px",
                      background: "linear-gradient(90deg, rgba(109,93,251,0.18), rgba(0,212,255,0.06))",
                      borderBottom: "1px solid rgba(109,93,251,0.14)",
                      display: "flex", alignItems: "center", paddingLeft: "10px", gap: "5px",
                    }}>
                      {["rgba(251,109,109,0.65)", "rgba(251,200,109,0.65)", "rgba(109,251,130,0.65)"].map((c, i) => (
                        <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />
                      ))}
                      <span className="text-[8px] tracking-widest uppercase"
                        style={{ color: "rgba(200,206,218,0.18)", marginLeft: "auto", marginRight: 10 }}>
                        JARVIS · ONLINE
                      </span>
                    </div>

                    {/* Canvas — receives LERP-interpolated video frames */}
                    <canvas
                      ref={canvasRef}
                      style={{
                        display: "block",
                        width: "100%",
                        height: "auto",
                        background: "#000",
                      }}
                    />

                    {/* Hidden video — source for canvas frames */}
                    <video
                      ref={videoRef}
                      src="/mascot/Personaje_gira_su_cabeza_202608201419.mp4"
                      muted
                      playsInline
                      preload="auto"
                      style={{ display: "none" }}
                    />

                    {/* Scanlines */}
                    <div style={{
                      position: "absolute", inset: 0, pointerEvents: "none",
                      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
                    }} />
                    <div style={{
                      position: "absolute", top: 24, right: 0, width: "70px", height: "70px", pointerEvents: "none",
                      background: "radial-gradient(circle at top right, rgba(0,212,255,0.13), transparent 70%)",
                    }} />
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, height: "60px", pointerEvents: "none",
                      background: "linear-gradient(to top, rgba(109,93,251,0.10), transparent)",
                    }} />
                  </div>
                </div>

                {/* Reflection */}
                <div style={{
                  position: "absolute", bottom: "-18px", left: "50%", transform: "translateX(-50%)",
                  width: "65%", height: "24px", pointerEvents: "none",
                  background: "radial-gradient(ellipse at 50% 0%, rgba(109,93,251,0.25) 0%, transparent 70%)",
                  filter: "blur(10px)",
                }} />
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT — Paragraph + CTAs */}
          <motion.div style={{ x: rightX }} className="flex flex-col items-start">
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
              className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full"
              style={{ background: "rgba(109,93,251,0.08)", border: "1px solid rgba(109,93,251,0.18)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{
                background: "#4ade80", boxShadow: "0 0 8px rgba(74,222,128,0.9)",
                animation: "glow-pulse 2s ease-in-out infinite",
              }} />
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold" style={{ color: "rgba(200,206,218,0.55)" }}>
                Disponible para proyectos
              </span>
            </motion.div>

            <motion.p custom={1} variants={fadeUp} initial="hidden" animate="visible"
              className="text-lg leading-[1.85] mb-10 max-w-[320px]"
              style={{ color: "rgba(200,206,218,0.48)", fontWeight: 300 }}>
              Combinamos{" "}
              <span style={{ color: "rgba(200,206,218,0.88)", fontWeight: 500 }}>creatividad</span> e{" "}
              <span style={{ color: "rgba(200,206,218,0.88)", fontWeight: 500 }}>inteligencia artificial</span>{" "}
              para diseñar marcas, sitios web y sistemas de automatización que hacen crecer tu negocio.
            </motion.p>

            <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col gap-3 w-full max-w-[260px]">
              <a href="#contact" onClick={(e) => scrollTo(e, "#contact")}
                className="gradient-aurora px-8 py-4 rounded-full text-base font-semibold text-white text-center transition-all duration-300 btn-glow"
                style={{ boxShadow: "0 0 30px rgba(109,93,251,0.25), 0 0 60px rgba(109,93,251,0.08)" }}>
                Agendar Llamada
              </a>
              <a href="#portfolio" onClick={(e) => scrollTo(e, "#portfolio")}
                className="px-8 py-4 rounded-full text-base font-medium text-center transition-all duration-300"
                style={{ color: "rgba(200,206,218,0.5)", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(109,93,251,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(200,206,218,0.5)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                }}>
                Ver Proyectos →
              </a>
            </motion.div>

            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="mt-12 flex items-center gap-4">
              <div className="h-px w-12" style={{ background: "rgba(109,93,251,0.25)" }} />
              <span className="text-[9px] uppercase tracking-[0.4em] font-semibold text-gradient-aurora">Branding</span>
              <span className="text-[9px] uppercase tracking-[0.4em]" style={{ color: "rgba(200,206,218,0.18)" }}>· Web · Automatización · IA</span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
