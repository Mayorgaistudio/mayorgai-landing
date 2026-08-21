"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════════════
   SERVICE DATA (Enriched with ROI & High-Ticket Metrics)
   ═══════════════════════════════════════════════════════ */
const services = [
  {
    num: "01",
    title: "Branding",
    badge: "Estrategia 360°",
    description:
      "Creamos identidades de marca memorables, escalables y construidas para durar. Cada marca que diseñamos está pensada para conectar emocionalmente con tu audiencia.",
    features: ["Estrategia de marca", "Identidad visual", "Naming & Storytelling", "Guías de marca"],
    cta: "Ver proyectos",
    image: "/service-branding.jpeg",
    position: "object-top",
  },
  {
    num: "02",
    title: "Diseño Web Premium",
    badge: "Conversión Optimizada",
    description:
      "Sitios web perfectos hasta el último píxel que convierten visitantes en clientes. Cada interacción está diseñada para cautivar y retener.",
    features: ["Landing pages de alto impacto", "Experiencias interactivas", "Arquitectura ultra rápida", "CRO & Copywriting"],
    cta: "Explorar webs",
    image: "/service-webdesign.jpeg",
  },
  {
    num: "03",
    title: "Automatización con IA",
    badge: "Ahorra +40h/mes",
    description:
      "Optimiza tus flujos de trabajo con sistemas de automatización inteligentes que reducen tareas repetitivas y escalan tu operación 24/7.",
    features: ["Automatización de procesos", "Integración con Make/Zapier", "Flujos de leads en CRM", "Pipelines sin errores"],
    cta: "Descubrir soluciones",
    image: "/service-automation.jpeg",
  },
  {
    num: "04",
    title: "Agentes de Voz IA",
    badge: "Disponibilidad 24/7",
    description:
      "Agentes de voz impulsados por IA con tono humano natural que atienden llamadas, cualifican prospectos y agendan reuniones automáticamente.",
    features: ["Atención inmediata", "Recepcionistas inteligentes", "Agendamiento sincronizado", "Integración con WhatsApp"],
    cta: "Ver demostración",
    image: "/service-voiceagents.jpeg",
  },
  {
    num: "05",
    title: "Desarrollo de Software",
    badge: "Arquitectura Cloud",
    description:
      "Soluciones de software a medida diseñadas para el máximo rendimiento, seguridad bancaria y escalabilidad sin fricción.",
    features: ["Web apps modernas", "Plataformas internas", "Herramientas a medida", "APIs & Microservicios"],
    cta: "Conocer proyectos",
    image: "/service-software.jpeg",
  },
  {
    num: "06",
    title: "Producción Audiovisual",
    badge: "+300% Engagement",
    description:
      "Contenido visual cinemático que comunica la visión de tu marca, genera estatus y captura la atención en redes sociales.",
    features: ["Video marketing", "Motion graphics 3D", "Contenido publicitario", "Edición cinemática"],
    cta: "Ver trabajos",
    image: "/service-audiovisual.jpeg",
    position: "object-top",
  },
];

/* ═══════════════════════════════════════════════════════
   SPOTLIGHT SERVICE PILL BUTTON
   ═══════════════════════════════════════════════════════ */
function ServicePill({
  service,
  index,
  isActive,
  onSelect,
}: {
  service: (typeof services)[0];
  index: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <button
      ref={btnRef}
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      className={`relative group rounded-2xl px-4 py-4 text-left transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between ${
        isActive
          ? "border border-purple/60 bg-purple/10 dark:bg-purple/15 shadow-lg shadow-purple/10"
          : "border border-slate-200/80 dark:border-white/[0.06] bg-slate-50/80 dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/[0.12] hover:bg-slate-100 dark:hover:bg-white/[0.04]"
      }`}
    >
      {/* ── Spotlight Radial Glow Following Cursor ── */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, rgba(109, 93, 251, 0.25), transparent 80%)`,
        }}
      />

      <div className="flex items-center justify-between w-full relative z-20">
        <span
          className={`text-[10px] font-mono font-bold tracking-[0.2em] transition-colors duration-300 ${
            isActive ? "text-[#6D5DFB]" : "text-slate-400 dark:text-silver/35 group-hover:text-purple"
          }`}
        >
          {service.num}
        </span>
        {isActive && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] shadow-[0_0_6px_#00D4FF]" />
        )}
      </div>

      <div className="mt-3 relative z-20">
        <p
          className={`text-xs sm:text-sm font-bold font-cabinet tracking-tight leading-snug transition-colors duration-300 ${
            isActive
              ? "text-slate-900 dark:text-white"
              : "text-slate-700 dark:text-silver/60 group-hover:text-slate-950 dark:group-hover:text-white"
          }`}
        >
          {service.title}
        </p>
        <span className="text-[9px] uppercase tracking-wider text-[#6D5DFB] dark:text-[#8A63FF] font-medium block mt-1 opacity-85">
          {service.badge}
        </span>
      </div>

      {/* Active bottom gradient accent */}
      {isActive && (
        <motion.div
          layoutId="activeServiceLine"
          className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full gradient-aurora"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN SERVICES COMPONENT
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

  const imgX = useTransform(mouseX, [0, 1], [8, -8]);
  const imgY = useTransform(mouseY, [0, 1], [5, -5]);

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
    <section id="services" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background volumetric glow */}
      <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] bg-[#6D5DFB]/5 rounded-full blur-[200px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#6D5DFB]">
            SERVICIOS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-cabinet text-slate-900 dark:text-white mt-3 tracking-tight">
            Soluciones de Alto Impacto
          </h2>
          <p className="text-base text-slate-600 dark:text-silver/60 mt-3 max-w-2xl font-normal leading-relaxed">
            Ingeniería de software, diseño interactivo y sistemas de inteligencia artificial para marcas que lideran.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════
            CINEMATIC SERVICE DISPLAY
           ══════════════════════════════════════════════════ */}
        <div
          ref={panelRef}
          onMouseMove={handlePanelMouseMove}
          onMouseLeave={handlePanelMouseLeave}
          className="relative w-full rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/[0.08] aspect-[1.1/1] sm:aspect-[1.5/1] md:aspect-[1.9/1] lg:aspect-[2.4/1] max-h-[480px] min-h-[420px] lg:min-h-0 group/panel shadow-2xl shadow-purple/10"
          style={{
            background: "#080a12",
            perspective: "1600px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* ── Crossfading background images with smooth 3D flip ── */}
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
                  rotateY: dir * 60,
                  x: `${dir * 30}%`,
                  scale: 0.85,
                  opacity: 0,
                  filter: "blur(10px) brightness(1.2)",
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
                  rotateY: -dir * 60,
                  x: `${-dir * 30}%`,
                  scale: 0.85,
                  opacity: 0,
                  filter: "blur(8px) brightness(0.8)",
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
                opacity: { duration: 0.5 },
                filter: { duration: 0.5 },
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

          {/* ── Vignette for text readability ── */}
          <div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background:
                "linear-gradient(180deg, rgba(8,10,18,0.2) 0%, transparent 35%, rgba(8,10,18,0.7) 100%), linear-gradient(90deg, rgba(8,10,18,0.85) 0%, rgba(8,10,18,0.4) 45%, transparent 80%)",
            }}
          />

          {/* ── Dynamic ambient glow following mouse ── */}
          <motion.div
            className="absolute w-[450px] h-[450px] rounded-full pointer-events-none z-[1]"
            style={{
              left: glowX,
              top: glowY,
              x: "-50%",
              y: "-50%",
              background:
                "radial-gradient(circle, rgba(109,93,251,0.18) 0%, rgba(0,212,255,0.08) 40%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          {/* ── Content overlay ── */}
          <div className="absolute inset-0 z-[2] flex items-end p-6 sm:p-8 md:p-10 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-lg w-full"
              >
                <div className="w-full flex flex-col items-start">
                  {/* Badge */}
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white px-3 py-1 rounded-full gradient-aurora shadow-sm mb-3">
                    {currentService.badge}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-cabinet text-white tracking-tight leading-tight">
                    {currentService.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-silver/80 mt-2.5 leading-relaxed max-w-md">
                    {currentService.description}
                  </p>

                  {/* Features list */}
                  <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 w-full max-w-md">
                    {currentService.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-silver/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Link */}
                  <a
                    href="#portfolio"
                    className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold text-white gradient-aurora hover:shadow-[0_0_25px_rgba(109,93,251,0.5)] transition-all duration-300 btn-glow hover:scale-105"
                  >
                    <span>{currentService.cta}</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Top-right Navigation Arrows ── */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[4] flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                const prevIndex = (active - 1 + services.length) % services.length;
                handleActiveChange(prevIndex);
              }}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Anterior"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                const nextIndex = (active + 1) % services.length;
                handleActiveChange(nextIndex);
              }}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Siguiente"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            SERVICE SELECTOR CARDS WITH SPOTLIGHT GLOW
           ══════════════════════════════════════════════════ */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {services.map((service, index) => (
            <ServicePill
              key={service.num}
              service={service}
              index={index}
              isActive={index === active}
              onSelect={() => handleActiveChange(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
