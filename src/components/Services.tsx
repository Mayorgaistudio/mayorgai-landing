"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════
   SERVICES DATA (Clean, Crisp & High-Impact)
   ═══════════════════════════════════════════════════════ */
const services = [
  {
    num: "01",
    title: "Branding",
    badge: "Estrategia 360°",
    description:
      "Identidades de marca memorables y construidas para durar, conectando con tu audiencia desde el primer impacto.",
    features: ["Estrategia de marca", "Identidad visual", "Naming & Storytelling", "Guías de marca"],
    image: "/service-branding.jpeg",
    accent: "#6D5DFB",
    gradient: "from-[#6D5DFB]/25 via-[#6D5DFB]/5 to-transparent",
  },
  {
    num: "02",
    title: "Diseño Web Premium",
    badge: "Conversión Optimizada",
    description:
      "Sitios web cinematográficos perfectos hasta el último píxel, diseñados para cautivar visitantes y convertirlos en clientes.",
    features: ["Landing pages de alto impacto", "Experiencias interactivas", "Carga ultra rápida", "Optimización CRO"],
    image: "/service-webdesign.jpeg",
    accent: "#00D4FF",
    gradient: "from-[#00D4FF]/25 via-[#00D4FF]/5 to-transparent",
  },
  {
    num: "03",
    title: "Automatización con IA",
    badge: "Ahorra +40h/mes",
    description:
      "Sistemas inteligentes que eliminan tareas repetitivas y ejecutan tus procesos operativos en piloto automático las 24 horas.",
    features: ["Automatización de procesos", "Integración Make/Zapier", "Captura de leads en CRM", "Flujos sin errores"],
    image: "/service-automation.jpeg",
    accent: "#8A63FF",
    gradient: "from-[#8A63FF]/25 via-[#8A63FF]/5 to-transparent",
  },
  {
    num: "04",
    title: "Agentes de Voz IA",
    badge: "Disponibilidad 24/7",
    description:
      "Agentes de voz con tono humano natural que atienden llamadas, cualifican prospectos y agendan reuniones al instante.",
    features: ["Atención inmediata 24/7", "Recepcionistas inteligentes", "Agendamiento sincronizado", "Integración con WhatsApp"],
    image: "/service-voiceagents.jpeg",
    accent: "#6D5DFB",
    gradient: "from-[#6D5DFB]/25 via-[#00D4FF]/5 to-transparent",
  },
  {
    num: "05",
    title: "Desarrollo de Software",
    badge: "Arquitectura Cloud",
    description:
      "Plataformas web y herramientas a medida desarrolladas para máximo rendimiento, seguridad bancaria y escalabilidad.",
    features: ["Web apps modernas", "Plataformas internas", "Herramientas a medida", "APIs & Microservicios"],
    image: "/service-software.jpeg",
    accent: "#00D4FF",
    gradient: "from-[#00D4FF]/25 via-[#8A63FF]/5 to-transparent",
  },
  {
    num: "06",
    title: "Producción Audiovisual",
    badge: "+300% Engagement",
    description:
      "Contenido visual de alto impacto que comunica la visión de tu marca y captura la atención en todos los canales.",
    features: ["Video marketing", "Motion graphics 3D", "Contenido publicitario", "Edición cinemática"],
    image: "/service-audiovisual.jpeg",
    accent: "#8A63FF",
    gradient: "from-[#8A63FF]/25 via-[#6D5DFB]/5 to-transparent",
  },
];

/* ═══════════════════════════════════════════════════════
   DECK CARD COMPONENT
   ═══════════════════════════════════════════════════════ */
function ServiceDeckCard({
  service,
}: {
  service: (typeof services)[0];
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
      className="relative shrink-0 w-[82vw] sm:w-[520px] md:w-[600px] lg:w-[680px] h-[450px] sm:h-[470px] rounded-3xl overflow-hidden group bg-white dark:bg-[#0c0f18] border border-slate-200/90 dark:border-white/[0.09] shadow-[0_16px_48px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-all duration-300 select-none flex flex-col justify-between"
    >
      {/* ── Spotlight Glow ── */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30"
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(109, 93, 251, 0.22), rgba(0, 212, 255, 0.08) 40%, transparent 80%)`,
        }}
      />

      {/* Ambient background glow */}
      <div
        className={`absolute top-0 right-0 w-[400px] h-[300px] bg-gradient-to-bl ${service.gradient} rounded-full blur-[80px] pointer-events-none z-0`}
      />

      {/* Content Grid */}
      <div className="relative z-20 h-full grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 p-6 sm:p-8 items-center">
        {/* ── LEFT: Text & Info ── */}
        <div className="flex flex-col items-start justify-between h-full">
          <div>
            {/* Header tag */}
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white px-3 py-1 rounded-full gradient-aurora shadow-sm inline-block mb-2.5">
              {service.badge}
            </span>

            {/* Number + Title */}
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-3xl sm:text-4xl font-black font-cabinet text-gradient-aurora leading-none select-none">
                {service.num}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-cabinet text-slate-900 dark:text-white tracking-tight leading-tight">
                {service.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-silver/70 mt-2.5 leading-relaxed font-normal">
              {service.description}
            </p>
          </div>

          {/* Features list */}
          <div className="w-full pt-3.5 border-t border-slate-200/60 dark:border-white/[0.06]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-silver/80"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] shrink-0 shadow-[0_0_5px_#00D4FF]" />
                  <span className="line-clamp-1">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 mt-3.5 px-5 py-2 rounded-full text-xs uppercase tracking-[0.18em] font-semibold text-white gradient-aurora hover:shadow-[0_0_20px_rgba(109,93,251,0.45)] transition-all duration-300 btn-glow hover:scale-105"
          >
            <span>Ver Proyectos</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

        {/* ── RIGHT: Visual Window ── */}
        <div className="relative h-full min-h-[170px] sm:min-h-[220px] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/[0.08] bg-black/60 shadow-md">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN SERVICES COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 20,
    restDelta: 0.001,
  });

  const x = useTransform(smoothProgress, [0, 1], ["2%", "-76%"]);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative h-[320vh] bg-transparent"
    >
      {/* ── STICKY VIEWPORT CONTAINER ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden pt-24 sm:pt-28 pb-8 sm:pb-10">
        {/* Background Atmospheric Glows */}
        <div className="absolute top-1/3 left-1/3 w-[700px] h-[700px] bg-[#6D5DFB]/[0.04] rounded-full blur-[200px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#00D4FF]/[0.03] rounded-full blur-[180px] pointer-events-none" />

        {/* ── Top Section Header (Centered & Perfectly Cleared below Navbar) ── */}
        <div className="max-w-3xl w-full mx-auto px-6 z-10 text-center">
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#6D5DFB]">
            SERVICIOS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-cabinet text-slate-900 dark:text-white mt-1 tracking-tight">
            Nuestras Soluciones
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-silver/60 mt-1 max-w-lg mx-auto font-normal">
            Sistemas inteligentes, diseño y automatización para hacer crecer tu negocio.
          </p>
        </div>

        {/* ── HORIZONTAL DECK TRACK ── */}
        <div className="relative w-full z-10 my-auto overflow-visible py-2">
          <motion.div
            style={{ x }}
            className="flex items-center gap-5 sm:gap-7 px-6 sm:px-12 w-max"
          >
            {services.map((service) => (
              <ServiceDeckCard
                key={service.num}
                service={service}
              />
            ))}
          </motion.div>
        </div>

        {/* ── Bottom HUD Indicator & Progress Line ── */}
        <div className="max-w-5xl w-full mx-auto px-6 z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400 dark:text-silver/40">
            <span className="text-slate-900 dark:text-white font-bold text-xs">01</span>
            <span>/</span>
            <span>06 SERVICIOS</span>
          </div>

          <span className="text-[11px] font-mono text-slate-400 dark:text-silver/40 hidden sm:inline">
            Desplaza hacia abajo para navegar →
          </span>

          {/* Progress bar line */}
          <div className="w-36 sm:w-56 h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden relative">
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
