"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════
   SERVICES DATA
   ═══════════════════════════════════════════════════════ */
const services = [
  {
    num: "01",
    tag: "Identidad & Estrategia",
    title: "Branding",
    badge: "Estrategia 360°",
    description:
      "Construimos identidades de marca memorables, escalables y con peso visual para destacar en mercados competitivos.",
    features: ["Estrategia de marca", "Identidad visual", "Naming & Storytelling", "Guías de marca completas"],
    image: "/service-branding.jpeg",
    accent: "#6D5DFB",
    gradient: "from-[#6D5DFB]/30 via-[#6D5DFB]/10 to-transparent",
  },
  {
    num: "02",
    tag: "Experiencia Web",
    title: "Diseño Web Premium",
    badge: "Conversión Optimizada",
    description:
      "Sitios web cinematográficos perfectos hasta el último píxel que combinan fluidez estética y arquitectura de conversión.",
    features: ["Landing pages de alto impacto", "Experiencias interactivas", "Arquitectura ultra rápida", "CRO & Copywriting"],
    image: "/service-webdesign.jpeg",
    accent: "#00D4FF",
    gradient: "from-[#00D4FF]/30 via-[#00D4FF]/10 to-transparent",
  },
  {
    num: "03",
    tag: "Operaciones Inteligentes",
    title: "Automatización con IA",
    badge: "Ahorra +40h/mes",
    description:
      "Optimizamos tus flujos de trabajo con sistemas inteligentes que reducen tareas repetitivas y escalan tu negocio 24/7.",
    features: ["Automatización de procesos", "Integración Make/Zapier", "Captura de leads en CRM", "Pipelines sin fricción"],
    image: "/service-automation.jpeg",
    accent: "#8A63FF",
    gradient: "from-[#8A63FF]/30 via-[#8A63FF]/10 to-transparent",
  },
  {
    num: "04",
    tag: "Comunicaciones & Voz",
    title: "Agentes de Voz IA",
    badge: "Disponibilidad 24/7",
    description:
      "Agentes de voz impulsados por IA con tono humano natural que atienden llamadas, cualifican prospectos y agendan citas.",
    features: ["Atención telefónica 24/7", "Recepcionistas inteligentes", "Agendamiento sincronizado", "Integración con WhatsApp"],
    image: "/service-voiceagents.jpeg",
    accent: "#6D5DFB",
    gradient: "from-[#6D5DFB]/30 via-[#00D4FF]/10 to-transparent",
  },
  {
    num: "05",
    tag: "Ingeniería a Medida",
    title: "Desarrollo de Software",
    badge: "Arquitectura Cloud",
    description:
      "Soluciones de software a medida diseñadas para el máximo rendimiento, seguridad robusta y escalabilidad sin límites.",
    features: ["Web apps modernas", "Plataformas internas", "Herramientas a medida", "APIs & Microservicios"],
    image: "/service-software.jpeg",
    accent: "#00D4FF",
    gradient: "from-[#00D4FF]/30 via-[#8A63FF]/10 to-transparent",
  },
  {
    num: "06",
    tag: "Contenido Audiovisual",
    title: "Producción Audiovisual",
    badge: "+300% Engagement",
    description:
      "Contenido visual cinemático que comunica la visión de tu marca, genera estatus y captura la atención en redes sociales.",
    features: ["Video marketing", "Motion graphics 3D", "Contenido publicitario", "Edición cinemática"],
    image: "/service-audiovisual.jpeg",
    accent: "#8A63FF",
    gradient: "from-[#8A63FF]/30 via-[#6D5DFB]/10 to-transparent",
  },
];

/* ═══════════════════════════════════════════════════════
   DECK CARD COMPONENT
   ═══════════════════════════════════════════════════════ */
function ServiceDeckCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative shrink-0 w-[85vw] sm:w-[580px] md:w-[680px] lg:w-[780px] h-[520px] sm:h-[540px] rounded-3xl overflow-hidden group bg-white dark:bg-[#0c0f18] border border-slate-200/90 dark:border-white/[0.09] shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-300 select-none flex flex-col justify-between"
    >
      {/* ── Spotlight Glow ── */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30"
        style={{
          background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(109, 93, 251, 0.25), rgba(0, 212, 255, 0.1) 40%, transparent 80%)`,
        }}
      />

      {/* Ambient background glow */}
      <div
        className={`absolute top-0 right-0 w-[450px] h-[350px] bg-gradient-to-bl ${service.gradient} rounded-full blur-[90px] pointer-events-none z-0`}
      />

      {/* Content Grid */}
      <div className="relative z-20 h-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 p-6 sm:p-9 lg:p-10 items-center">
        {/* ── LEFT: Text & Capabilities ── */}
        <div className="flex flex-col items-start justify-between h-full">
          <div>
            {/* Header tags */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-white px-3 py-1 rounded-full gradient-aurora shadow-sm">
                {service.badge}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-500 dark:text-silver/50 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/[0.06]">
                {service.tag}
              </span>
            </div>

            {/* Number + Title */}
            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-4xl sm:text-5xl font-black font-cabinet text-gradient-aurora leading-none select-none">
                {service.num}
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-cabinet text-slate-900 dark:text-white tracking-tight leading-tight">
                {service.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-silver/70 mt-3 leading-relaxed max-w-md font-normal">
              {service.description}
            </p>
          </div>

          {/* Features list */}
          <div className="w-full pt-4 border-t border-slate-200/60 dark:border-white/[0.06]">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#6D5DFB] dark:text-[#8A63FF] block mb-2.5">
              Capacidades Clave:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-silver/80"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] shrink-0 shadow-[0_0_6px_#00D4FF]" />
                  <span className="line-clamp-1">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold text-white gradient-aurora hover:shadow-[0_0_25px_rgba(109,93,251,0.5)] transition-all duration-300 btn-glow hover:scale-105"
          >
            <span>Ver Casos de Éxito</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

        {/* ── RIGHT: Cinematic Artwork Window ── */}
        <div className="relative h-full min-h-[200px] sm:min-h-[260px] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/[0.08] bg-black/60 shadow-lg">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
          
          {/* Card Index Watermark */}
          <span className="absolute bottom-3 right-4 text-6xl font-black font-cabinet text-white/10 select-none pointer-events-none">
            {service.num}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN SERVICES COMPONENT WITH STICKY HORIZONTAL SCROLL
   ═══════════════════════════════════════════════════════ */
export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook scroll progress of the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progression
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 20,
    restDelta: 0.001,
  });

  // Transform vertical scroll progress into horizontal translateX
  // Range moves all 6 cards across the screen
  const x = useTransform(smoothProgress, [0, 1], ["2%", "-76%"]);

  // Calculate active index for HUD
  const activeStep = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [1, 2, 3, 4, 5, 6]);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative h-[340vh] bg-transparent"
    >
      {/* ── STICKY VIEWPORT CONTAINER ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden py-8 sm:py-12">
        {/* Background Atmospheric Glows */}
        <div className="absolute top-1/3 left-1/3 w-[800px] h-[800px] bg-[#6D5DFB]/[0.04] rounded-full blur-[200px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-[#00D4FF]/[0.03] rounded-full blur-[180px] pointer-events-none" />

        {/* ── Top Section Header & HUD ── */}
        <div className="max-w-7xl w-full mx-auto px-6 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#6D5DFB]">
              SERVICIOS &amp; SOLUCIONES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-cabinet text-slate-900 dark:text-white mt-1.5 tracking-tight">
              Ingeniería Digital de Alto Nivel
            </h2>
          </div>

          {/* Scroll progress hint */}
          <div className="flex items-center gap-3 bg-slate-100/80 dark:bg-white/[0.04] px-4 py-2 rounded-full border border-slate-200/60 dark:border-white/[0.06] backdrop-blur-md self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse shadow-[0_0_8px_#00D4FF]" />
            <span className="text-xs font-mono font-medium text-slate-600 dark:text-silver/70">
              Desplaza hacia abajo para navegar
            </span>
          </div>
        </div>

        {/* ── HORIZONTAL DECK TRACK ── */}
        <div className="relative w-full z-10 my-auto overflow-visible">
          <motion.div
            style={{ x }}
            className="flex items-center gap-6 sm:gap-8 px-6 sm:px-12 w-max"
          >
            {services.map((service, index) => (
              <ServiceDeckCard
                key={service.num}
                service={service}
                index={index}
              />
            ))}
          </motion.div>
        </div>

        {/* ── Bottom HUD Indicator & Progress Line ── */}
        <div className="max-w-7xl w-full mx-auto px-6 z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400 dark:text-silver/40">
            <span className="text-slate-900 dark:text-white font-bold text-sm">01</span>
            <span>/</span>
            <span>06 SERVICIOS</span>
          </div>

          {/* Progress bar line */}
          <div className="w-48 sm:w-64 h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden relative">
            <motion.div
              style={{ scaleX: smoothProgress }}
              className="h-full w-full rounded-full gradient-aurora origin-left"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
