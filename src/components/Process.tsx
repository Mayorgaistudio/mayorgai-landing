"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════
   PROCESS DATA
   ═══════════════════════════════════════════════════════ */
const steps = [
  {
    num: "01",
    phase: "Fase de Análisis",
    title: "Descubrimiento & Estrategia",
    description:
      "Nos sumergimos en el ADN de tu negocio, analizando competidores, cuellos de botella y audiencia para estructurar un mapa de ruta claro hacia la rentabilidad.",
    image: "/jarvis-chubby/jarvis-detective.png",
    duration: "Semana 1",
    deliverables: [
      "Auditoría técnica & de marca",
      "Arquitectura de conversión",
      "Brief de requerimientos IA",
      "Definición de KPIs",
    ],
    accent: "#6D5DFB",
    gradient: "from-[#6D5DFB]/20 via-[#6D5DFB]/5 to-transparent",
  },
  {
    num: "02",
    phase: "Fase Visual & UX",
    title: "Diseño & Prototipado Cinemático",
    description:
      "Convertimos la estrategia en experiencias visuales de alta gama. Cada layout, tipografía y micro-interacción está pensada para proyectar autoridad inmediata.",
    image: "/jarvis-chubby/jarvis-dise%C3%B1o.png",
    duration: "Semana 2",
    deliverables: [
      "Sistema de diseño & UI Kit",
      "Wireframes interactivos",
      "Dirección de arte premium",
      "Validación de flujos CRO",
    ],
    accent: "#8A63FF",
    gradient: "from-[#8A63FF]/20 via-[#8A63FF]/5 to-transparent",
  },
  {
    num: "03",
    phase: "Fase de Ingeniería",
    title: "Desarrollo & Automatización IA",
    description:
      "Construimos sobre Next.js 16 con código limpio, seguro y ultra rápido. Integramos agentes inteligentes, APIs y bases de datos preparadas para alto tráfico.",
    image: "/jarvis-chubby/jarvis-matrix.png",
    duration: "Semana 3",
    deliverables: [
      "Desarrollo Full-Stack moderno",
      "Integración de agentes IA",
      "Optimización 100/100 Core Web Vitals",
      "Testing exhaustivo QA",
    ],
    accent: "#00D4FF",
    gradient: "from-[#00D4FF]/20 via-[#00D4FF]/5 to-transparent",
  },
  {
    num: "04",
    phase: "Fase de Despliegue",
    title: "Lanzamiento & Escalabilidad",
    description:
      "Publicamos tu plataforma en producción global con CDN de baja latencia, configuramos analítica avanzada y dejamos tus pipelines automáticos funcionando 24/7.",
    image: "/jarvis-chubby/jarvis-estratega.png",
    duration: "Semana 4",
    deliverables: [
      "Despliegue cloud global",
      "Capacitación de uso de sistemas",
      "Entrega de código fuente",
      "Soporte y optimización continua",
    ],
    accent: "#6D5DFB",
    gradient: "from-[#6D5DFB]/20 via-[#00D4FF]/5 to-transparent",
  },
];

/* ═══════════════════════════════════════════════════════
   STICKY STACKING PROCESS CARD
   ═══════════════════════════════════════════════════════ */
function StickyProcessCard({
  step,
  index,
  totalSteps,
}: {
  step: (typeof steps)[0];
  index: number;
  totalSteps: number;
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

  // Sticky offset so cards stack neatly over each other with a top margin cascade
  const topOffset = 100 + index * 28;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={{
        top: `${topOffset}px`,
      }}
      className="sticky w-full rounded-3xl transition-all duration-500 group mb-12 last:mb-0"
    >
      {/* Card Body */}
      <div
        className="relative rounded-3xl overflow-hidden p-6 sm:p-10 lg:p-12 transition-all duration-500 bg-white dark:bg-[#0c0f18] border border-slate-200/90 dark:border-white/[0.09] shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
      >
        {/* ── Spotlight Glow Following Cursor ── */}
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30"
          style={{
            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(109, 93, 251, 0.22), rgba(0, 212, 255, 0.08) 40%, transparent 80%)`,
          }}
        />

        {/* Ambient Top Glow */}
        <div
          className={`absolute top-0 right-0 w-[500px] h-[300px] bg-gradient-to-bl ${step.gradient} rounded-full blur-[90px] pointer-events-none z-0`}
        />

        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center">
          {/* ── LEFT COLUMN: Text & Deliverables ── */}
          <div className="flex flex-col items-start text-left">
            {/* Phase pill + duration badge */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-white px-3 py-1 rounded-full gradient-aurora shadow-sm">
                {step.phase}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-500 dark:text-silver/50 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/[0.06]">
                ⏱ {step.duration}
              </span>
            </div>

            {/* Step Number + Title */}
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-4xl sm:text-5xl font-black font-cabinet text-gradient-aurora leading-none select-none">
                {step.num}
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-cabinet text-slate-900 dark:text-white tracking-tight leading-tight">
                {step.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-silver/70 mt-4 leading-relaxed max-w-xl font-normal">
              {step.description}
            </p>

            {/* Deliverables Checklist */}
            <div className="mt-6 w-full pt-6 border-t border-slate-200/60 dark:border-white/[0.06]">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#6D5DFB] dark:text-[#8A63FF] block mb-3">
                Entregables Clave:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {step.deliverables.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-700 dark:text-silver/80"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] shrink-0 shadow-[0_0_6px_#00D4FF]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Mascot 3D Illustration & Visual Frame ── */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square rounded-2xl bg-slate-100/70 dark:bg-black/40 border border-slate-200/60 dark:border-white/[0.07] p-6 flex items-center justify-center overflow-hidden">
              {/* Background circular halo */}
              <div
                className="absolute w-44 h-44 rounded-full blur-2xl opacity-60"
                style={{
                  background: `radial-gradient(circle, ${step.accent}50, transparent 70%)`,
                }}
              />

              {/* Floating Jarvis Illustration */}
              <motion.img
                src={step.image}
                alt={step.title}
                className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 object-contain select-none pointer-events-none drop-shadow-[0_10px_25px_rgba(109,93,251,0.25)]"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 5 + index * 0.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />

              {/* Step indicator watermark */}
              <span className="absolute bottom-2 right-4 text-7xl font-black font-cabinet text-slate-900/[0.04] dark:text-white/[0.04] select-none pointer-events-none">
                0{index + 1}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PROCESS COMPONENT WITH STACKING CARDS
   ═══════════════════════════════════════════════════════ */
export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-visible"
    >
      {/* Background Volumetric Glows */}
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-[#6D5DFB]/[0.04] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#00D4FF]/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20"
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#6D5DFB]">
            METODOLOGÍA DE AUTOR
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-cabinet text-slate-900 dark:text-white mt-4 tracking-tight">
            Cómo Creamos Tu Sistema
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-silver/60 mt-3 max-w-2xl font-normal leading-relaxed">
            Un ciclo de trabajo transparente, ágil y estructurado para entregar activos digitales de alto impacto en 4 semanas.
          </p>
        </motion.div>

        {/* ── Sticky Stacking Cards Container ── */}
        <div className="relative w-full">
          {steps.map((step, index) => (
            <StickyProcessCard
              key={step.num}
              step={step}
              index={index}
              totalSteps={steps.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
