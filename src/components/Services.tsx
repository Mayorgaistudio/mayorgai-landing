"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════════════
   SERVICE DATA
   ═══════════════════════════════════════════════════════ */
const services = [
  {
    num: "01",
    title: "Branding",
    description:
      "Creamos identidades de marca memorables, escalables y construidas para durar. Cada marca que diseñamos está pensada para conectar emocionalmente con tu audiencia.",
    features: ["Estrategia de marca", "Identidad visual", "Naming", "Guías de marca"],
    cta: "Ver proyectos",
    image: "/service-branding.jpeg",
    position: "object-top",
  },
  {
    num: "02",
    title: "Diseño Web Premium",
    description:
      "Sitios web perfectos hasta el último píxel que convierten visitantes en clientes. Cada interacción está diseñada para cautivar.",
    features: ["Landing pages", "Sitios premium", "Experiencias interactivas", "Optimización de conversión"],
    cta: "Explorar webs",
    image: "/service-webdesign.jpeg",
  },
  {
    num: "03",
    title: "Automatización con IA",
    description:
      "Optimiza tus flujos de trabajo con sistemas de automatización inteligentes que trabajan por ti las 24 horas.",
    features: ["Automatización de procesos", "Integración con Make", "Flujos inteligentes", "Mayor productividad"],
    cta: "Descubrir soluciones",
    image: "/service-automation.jpeg",
  },
  {
    num: "04",
    title: "Agentes de Voz IA",
    description:
      "Agentes de voz impulsados por IA que atienden llamadas y conversaciones de forma completamente natural.",
    features: ["Atención automática", "Recepcionistas IA", "Agenda inteligente", "Integración con calendario"],
    cta: "Ver demostración",
    image: "/service-voiceagents.jpeg",
  },
  {
    num: "05",
    title: "Desarrollo de Software",
    description:
      "Soluciones de software a medida diseñadas para el rendimiento, la seguridad y la escalabilidad.",
    features: ["Apps web", "Plataformas internas", "Herramientas personalizadas", "APIs y sistemas"],
    cta: "Conocer proyectos",
    image: "/service-software.jpeg",
  },
  {
    num: "06",
    title: "Producción Audiovisual",
    description:
      "Contenido visual de alto impacto que comunica la esencia de tu marca y captura la atención de tu audiencia.",
    features: ["Video marketing", "Motion graphics", "Contenido para redes", "Producción creativa"],
    cta: "Ver trabajos",
    image: "/service-audiovisual.jpeg",
    position: "object-top",
  },
];

/* ═══════════════════════════════════════════════════════
   SPARKLE COMPONENT — subtle starfield on inactive cards
   ═══════════════════════════════════════════════════════ */
function Sparkle({ delay }: { delay: number }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const randomize = () => {
      setPos({ x: Math.random() * 100, y: Math.random() * 100 });
    };
    randomize();
    const interval = setInterval(randomize, 3000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        width: "3px",
        height: "3px",
        background: "radial-gradient(circle, rgba(109,93,251,0.9) 0%, rgba(0,212,255,0.6) 50%, transparent 100%)",
        boxShadow: "0 0 6px 2px rgba(109,93,251,0.3)",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1.2, 1, 0],
      }}
      transition={{
        duration: 2.5,
        delay,
        repeat: Infinity,
        repeatDelay: 3 + Math.random() * 5,
        ease: "easeInOut",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function Services() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleActiveChange = (index: number) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };

  // ── Mouse parallax for the cinematic panel ──
  const rawMouseX = useMotionValue(0.5);
  const rawMouseY = useMotionValue(0.5);
  const springConfig = { stiffness: 60, damping: 25, mass: 0.8 };
  const mouseX = useSpring(rawMouseX, springConfig);
  const mouseY = useSpring(rawMouseY, springConfig);

  // Image parallax: subtle drift
  const imgX = useTransform(mouseX, [0, 1], [8, -8]);
  const imgY = useTransform(mouseY, [0, 1], [5, -5]);
  const imgScale = useTransform(mouseX, [0, 0.5, 1], [1.06, 1.04, 1.06]);

  // Glow position
  const glowX = useTransform(mouseX, [0, 1], ["20%", "80%"]);
  const glowY = useTransform(mouseY, [0, 1], ["20%", "80%"]);

  const handlePanelMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = panelRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawMouseX.set((e.clientX - rect.left) / rect.width);
      rawMouseY.set((e.clientY - rect.top) / rect.height);
    },
    [rawMouseX, rawMouseY]
  );

  const handlePanelMouseLeave = useCallback(() => {
    rawMouseX.set(0.5);
    rawMouseY.set(0.5);
  }, [rawMouseX, rawMouseY]);

  const currentService = services[active];

  return (
    <section id="services" className="py-16 md:py-24 lg:py-28 relative overflow-hidden">
      {/* Background volumetric glow */}
      <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] bg-[#6D5DFB]/5 rounded-full blur-[200px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ── Section header ── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#6D5DFB]">
            SERVICIOS
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-cabinet text-slate-900 dark:text-white mt-4 tracking-tight">
            Lo Que Hacemos
          </h2>
          <p className="text-lg text-slate-600 dark:text-silver/70 mt-4 max-w-2xl font-normal leading-relaxed">
            Experiencias digitales cinematográficas que elevan marcas e impulsan el crecimiento.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════
            CINEMATIC PANEL — upper 70%
           ══════════════════════════════════════════════════ */}
        <div
          ref={panelRef}
          onMouseMove={handlePanelMouseMove}
          onMouseLeave={handlePanelMouseLeave}
          className="relative w-full rounded-3xl overflow-hidden border border-white/[0.06] aspect-[1.1/1] sm:aspect-[1.5/1] md:aspect-[1.9/1] lg:aspect-[2.5/1] max-h-[480px] min-h-[420px] lg:min-h-0 group/panel"
          style={{
            background: "#0A0C14",
            perspective: "1600px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* ── Crossfading background images — cinematic 3D Y-axis flip ── */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentService.image}
              className="absolute inset-0 overflow-hidden origin-center"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
              custom={direction}
              variants={{
                enter: (dir: number) => ({
                  rotateY: dir * 75,
                  x: `${dir * 40}%`,
                  scale: 0.8,
                  opacity: 0,
                  filter: "blur(12px) brightness(1.3)",
                }),
                center: {
                  rotateY: 0,
                  x: 0,
                  scale: 1,
                  opacity: 1,
                  filter: "blur(0px) brightness(1)",
                  zIndex: 2,
                },
                exit: (dir: number) => ({
                  rotateY: -dir * 75,
                  x: `${-dir * 40}%`,
                  scale: 0.8,
                  opacity: 0,
                  filter: "blur(8px) brightness(0.7)",
                  zIndex: 1,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 100, damping: 20, mass: 0.8 },
                rotateY: { type: "spring", stiffness: 100, damping: 20, mass: 0.8 },
                scale: { type: "spring", stiffness: 100, damping: 20, mass: 0.8 },
                opacity: { duration: 0.6 },
                filter: { duration: 0.6 },
              }}
            >
              <motion.img
                src={currentService.image}
                alt={currentService.title}
                className={`w-full h-full object-cover ${currentService.position || "object-center"}`}
                style={{
                  x: imgX,
                  y: imgY,
                }}
                /* Slow Ken Burns drift while active */
                animate={{
                  scale: [1.05, 1.12],
                }}
                transition={{
                  duration: 16,
                  ease: "easeOut",
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* ── Cinematic Light Leak Transition Flash ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`leak-${active}`}
              className="absolute inset-0 pointer-events-none z-[3] mix-blend-screen"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.35, 0],
              }}
              transition={{
                duration: 0.8,
                times: [0, 0.2, 1],
                ease: "easeInOut",
              }}
              style={{
                background: "radial-gradient(circle at 70% 30%, rgba(109,93,251,0.4) 0%, rgba(0,212,255,0.25) 45%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
          </AnimatePresence>

          {/* ── Subtle vignette optimized for text readability without box background ── */}
          <div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background:
                "linear-gradient(180deg, rgba(9,11,18,0.15) 0%, transparent 40%, rgba(9,11,18,0.45) 100%), linear-gradient(90deg, rgba(9,11,18,0.75) 0%, rgba(9,11,18,0.35) 45%, transparent 80%)",
            }}
          />

          {/* ── Dynamic ambient glow following mouse ── */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full pointer-events-none z-[1]"
            style={{
              left: glowX,
              top: glowY,
              x: "-50%",
              y: "-50%",
              background:
                "radial-gradient(circle, rgba(109,93,251,0.12) 0%, rgba(0,212,255,0.06) 40%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          {/* ── Content overlay — left-aligned, glassmorphism ── */}
          <div className="absolute inset-0 z-[2] flex items-end p-6 sm:p-8 md:p-10 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30, scale: 0.97, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, scale: 0.98, filter: "blur(6px)" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-md w-full"
              >
                {/* Minimalist container */}
                <motion.div
                  className="w-full flex flex-col items-start"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.06,
                        delayChildren: 0.05,
                      },
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Service number */}
                  <motion.span
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                    }}
                    className="text-xs font-medium text-[#6D5DFB] tracking-[0.2em] uppercase block"
                  >
                    {currentService.num} — Servicio
                  </motion.span>

                  {/* Title */}
                  <motion.h3
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                    }}
                    className="text-xl sm:text-2xl md:text-3xl font-bold font-cabinet text-white mt-2 tracking-tight leading-tight"
                  >
                    {currentService.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                    }}
                    className="text-sm text-silver/70 mt-3 leading-relaxed"
                  >
                    {currentService.description}
                  </motion.p>

                  {/* Features list */}
                  <motion.ul
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.04,
                        },
                      },
                    }}
                    className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5"
                  >
                    {currentService.features.map((feature) => (
                      <motion.li
                        key={feature}
                        variants={{
                          hidden: { opacity: 0, x: -8 },
                          visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
                        }}
                        className="flex items-center gap-2.5 text-sm text-silver/60"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6D5DFB] shrink-0" />
                        {feature}
                      </motion.li>
                    ))}
                  </motion.ul>

                  {/* CTA */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                    }}
                  >
                    <a
                      href="#portfolio"
                      className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full text-sm font-medium text-white gradient-aurora hover:shadow-[0_0_30px_rgba(109,93,251,0.35)] transition-all duration-300"
                    >
                      {currentService.cta}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </a>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Top-right navigation controls ── */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[4] flex items-center gap-2 opacity-60 md:opacity-0 md:group-hover/panel:opacity-100 transition-opacity duration-350">
            <button
              onClick={(e) => {
                e.stopPropagation();
                const prevIndex = (active - 1 + services.length) % services.length;
                handleActiveChange(prevIndex);
              }}
              className="w-10 h-10 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] hover:border-white/[0.15] flex items-center justify-center text-white/35 hover:text-white/85 transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Anterior"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                const nextIndex = (active + 1) % services.length;
                handleActiveChange(nextIndex);
              }}
              className="w-10 h-10 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] hover:border-white/[0.15] flex items-center justify-center text-white/35 hover:text-white/85 transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Siguiente"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            SERVICE SELECTOR CARDS — bottom strip
           ══════════════════════════════════════════════════ */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {services.map((service, index) => {
            const isActive = index === active;
            return (
              <button
                key={index}
                onClick={() => handleActiveChange(index)}
                className={`relative group rounded-xl px-4 py-5 text-left transition-all duration-500 overflow-hidden cursor-pointer ${
                  isActive
                    ? "border border-[#6D5DFB]/40 bg-[#6D5DFB]/[0.08]"
                    : "border border-slate-200 dark:border-white/[0.05] bg-slate-50 dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/[0.12] hover:bg-slate-100 dark:hover:bg-white/[0.04]"
                }`}
              >
                {/* Active glow */}
                {isActive && (
                  <motion.div
                    layoutId="serviceGlow"
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{
                      boxShadow: "0 0 40px rgba(109,93,251,0.15), inset 0 0 30px rgba(109,93,251,0.05)",
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}

                {/* Sparkles on inactive cards */}
                {!isActive && (
                  <>
                    <Sparkle delay={Math.random() * 3} />
                    <Sparkle delay={1.5 + Math.random() * 3} />
                  </>
                )}

                {/* Number */}
                <span
                  className={`text-xs font-semibold tracking-[0.15em] transition-colors duration-300 ${
                    isActive ? "text-[#6D5DFB]" : "text-slate-400 dark:text-silver/30 group-hover:text-slate-600 dark:group-hover:text-silver/50"
                  }`}
                >
                  {service.num}
                </span>

                {/* Title */}
                <p
                  className={`text-sm font-medium mt-1.5 tracking-tight leading-snug transition-colors duration-300 ${
                    isActive ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-silver/50 group-hover:text-slate-800 dark:group-hover:text-silver/80"
                  }`}
                >
                  {service.title}
                </p>

                {/* Active indicator line */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #6D5DFB, #00D4FF)",
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
