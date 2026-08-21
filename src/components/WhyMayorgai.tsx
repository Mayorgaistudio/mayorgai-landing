"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ═══════════════════════════════════════════════════════
   SPOTLIGHT BENTO CARD WRAPPER
   ═══════════════════════════════════════════════════════ */
function BentoCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
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
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      variants={{
        hidden: { y: 35, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={`relative rounded-3xl overflow-hidden transition-all duration-300 group bg-slate-50/80 dark:bg-[#0c0f18]/80 border border-slate-200/80 dark:border-white/[0.07] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:shadow-purple/10 dark:hover:shadow-purple/20 hover:-translate-y-1 ${className}`}
    >
      {/* ── Spotlight Radial Glow ── */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30"
        style={{
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(109, 93, 251, 0.22), rgba(0, 212, 255, 0.08) 40%, transparent 80%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(109, 93, 251, 0.06), transparent 70%)`,
        }}
      />

      <div className="relative z-20 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   INTERACTIVE SIMULATED AI PIPELINE WIDGET
   ═══════════════════════════════════════════════════════ */
function PipelineWidget() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: "Lead Capturado", desc: "Webhook · Form · Redes", icon: "⚡" },
    { label: "IA Agente Analiza", desc: "Cualificación & CRM", icon: "🧠" },
    { label: "Cita Agendada", desc: "WhatsApp & Calendario", icon: "🚀" },
  ];

  return (
    <div className="w-full my-6 p-4 rounded-2xl bg-white/80 dark:bg-black/50 border border-slate-200/60 dark:border-white/[0.06] backdrop-blur-md">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200/50 dark:border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-silver/50">
            Pipeline Activo · 24/7
          </span>
        </div>
        <span className="text-[9px] font-mono text-[#6D5DFB] bg-purple/10 px-2 py-0.5 rounded-full font-semibold">
          Auto-Sync
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 relative">
        {steps.map((step, i) => {
          const isCurrent = i === activeStep;
          return (
            <div
              key={step.label}
              className={`p-2.5 rounded-xl border transition-all duration-500 relative ${
                isCurrent
                  ? "bg-purple/10 border-purple/40 dark:bg-purple/15 dark:border-purple/50 shadow-md shadow-purple/10"
                  : "bg-slate-50/50 dark:bg-white/[0.02] border-slate-200/40 dark:border-white/[0.04]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{step.icon}</span>
                <span className={`text-[11px] font-bold font-cabinet ${
                  isCurrent ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-silver/50"
                }`}>
                  {step.label}
                </span>
              </div>
              <span className="text-[9px] text-slate-400 dark:text-silver/40 block mt-1 line-clamp-1">
                {step.desc}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   INTERACTIVE AUDIO WAVEFORM WIDGET
   ═══════════════════════════════════════════════════════ */
function AudioWaveformWidget() {
  const bars = [14, 28, 45, 20, 60, 35, 75, 48, 65, 30, 50, 22, 40, 18];

  return (
    <div className="w-full my-4 p-4 rounded-2xl bg-white/80 dark:bg-black/50 border border-slate-200/60 dark:border-white/[0.06] flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00D4FF] shadow-[0_0_6px_#00D4FF]" />
          <span className="text-[10px] font-mono text-slate-500 dark:text-silver/50 uppercase tracking-wider">
            Agente de Voz en Vivo
          </span>
        </div>
        <span className="text-[9px] font-mono text-emerald-500 font-bold">LATENCIA 0.3s</span>
      </div>

      {/* Animated Soundwave bars */}
      <div className="flex items-center justify-center gap-1.5 h-14 my-1">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            className="w-1.5 rounded-full bg-gradient-to-t from-[#6D5DFB] to-[#00D4FF]"
            animate={{
              height: [`${height * 0.4}%`, `${height}%`, `${height * 0.3}%`],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 0.08,
            }}
          />
        ))}
      </div>

      <p className="text-[10px] text-center text-slate-500 dark:text-silver/50 italic mt-1">
        &ldquo;Hola, claro que sí. Tu cita quedó confirmada para el martes a las 10:00 AM.&rdquo;
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN WHY MAYORGAI BENTO GRID SECTION
   ═══════════════════════════════════════════════════════ */
export default function WhyMayorgai() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-[#6D5DFB]/5 rounded-full blur-[180px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-[#00D4FF]/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#6D5DFB]">
            POR QUÉ MAYORGAI STUDIO
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-cabinet text-slate-900 dark:text-white mt-4 tracking-tight">
            Ingeniería &amp; Diseño Digital
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-silver/60 mt-3 max-w-2xl font-normal leading-relaxed">
            Fusionamos estética cinematográfica con infraestructura tecnológica moderna para construir activos digitales que generan ventaja competitiva real.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════
            BENTO GRID ASYMMETRIC LAYOUT
           ══════════════════════════════════════════════════ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6"
        >
          {/* ── BENTO 1: Large Span (7 Cols) — Automatización & Pipelines ── */}
          <BentoCard className="lg:col-span-7">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 border border-purple/20 text-[#6D5DFB] dark:text-[#8A63FF] text-[10px] font-bold uppercase tracking-wider mb-3">
                <span>01</span>
                <span>·</span>
                <span>Automatización con IA</span>
              </div>
              <h3 className="text-2xl font-bold font-cabinet text-slate-900 dark:text-white tracking-tight">
                Sistemas Autónomos que Trabajan 24/7
              </h3>
              <p className="text-sm text-slate-600 dark:text-silver/60 mt-2 max-w-lg leading-relaxed font-normal">
                Eliminamos cuellos de botella operativos integrando agentes inteligentes, captura de leads en tiempo real y sincronización omnicanal.
              </p>
            </div>

            {/* Interactive Live Pipeline */}
            <PipelineWidget />

            <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 dark:border-white/5 text-xs text-slate-500 dark:text-silver/40">
              <span>Integrado con Make · OpenAI · CRM</span>
              <span className="font-semibold text-slate-900 dark:text-white">+40h / mes ahorradas</span>
            </div>
          </BentoCard>

          {/* ── BENTO 2: Performance & Velocidad (5 Cols) ── */}
          <BentoCard className="lg:col-span-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 text-[#00D4FF] text-[10px] font-bold uppercase tracking-wider mb-3">
                <span>02</span>
                <span>·</span>
                <span>Velocidad Extrema</span>
              </div>
              <h3 className="text-2xl font-bold font-cabinet text-slate-900 dark:text-white tracking-tight">
                Performance 100/100
              </h3>
              <p className="text-sm text-slate-600 dark:text-silver/60 mt-2 leading-relaxed font-normal">
                Desarrollado en Next.js 16 para velocidad de carga instantánea, SEO técnico de élite y tasa de retención máxima.
              </p>
            </div>

            {/* Gauge Dial Graphic */}
            <div className="my-6 p-5 rounded-2xl bg-white/80 dark:bg-black/50 border border-slate-200/60 dark:border-white/[0.06] flex items-center justify-around">
              <div className="text-center">
                <span className="text-3xl font-black font-cabinet text-emerald-500 block">100</span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-silver/40">Lighthouse</span>
              </div>
              <div className="h-8 w-px bg-slate-200 dark:bg-white/10" />
              <div className="text-center">
                <span className="text-3xl font-black font-cabinet text-gradient-aurora block">&lt;0.5s</span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-silver/40">Tiempo Carga</span>
              </div>
              <div className="h-8 w-px bg-slate-200 dark:bg-white/10" />
              <div className="text-center">
                <span className="text-3xl font-black font-cabinet text-[#00D4FF] block">60 FPS</span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-silver/40">Smooth Scroll</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/50 dark:border-white/5 text-xs text-slate-500 dark:text-silver/40 flex justify-between">
              <span>Optimización Core Web Vitals</span>
              <span className="text-emerald-500 font-semibold">100% Calificación</span>
            </div>
          </BentoCard>

          {/* ── BENTO 3: Agentes de Voz (5 Cols) ── */}
          <BentoCard className="lg:col-span-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 border border-purple/20 text-[#6D5DFB] dark:text-[#8A63FF] text-[10px] font-bold uppercase tracking-wider mb-3">
                <span>03</span>
                <span>·</span>
                <span>Voz IA Conversacional</span>
              </div>
              <h3 className="text-2xl font-bold font-cabinet text-slate-900 dark:text-white tracking-tight">
                Recepción &amp; Ventas con Voz
              </h3>
              <p className="text-sm text-slate-600 dark:text-silver/60 mt-2 leading-relaxed font-normal">
                Agentes telefónicos y de audio capaces de interactuar en lenguaje natural y cerrar llamadas en segundos.
              </p>
            </div>

            {/* Audio Waveform Graphic */}
            <AudioWaveformWidget />

            <div className="pt-2 border-t border-slate-200/50 dark:border-white/5 text-xs text-slate-500 dark:text-silver/40 flex justify-between">
              <span>Voz con acento latino/neutro</span>
              <span className="text-purple font-semibold">Cero Espera</span>
            </div>
          </BentoCard>

          {/* ── BENTO 4: Retorno de Inversión & Resultados (7 Cols) ── */}
          <BentoCard className="lg:col-span-7">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 text-[#00D4FF] text-[10px] font-bold uppercase tracking-wider mb-3">
                <span>04</span>
                <span>·</span>
                <span>Resultados Medibles</span>
              </div>
              <h3 className="text-2xl font-bold font-cabinet text-slate-900 dark:text-white tracking-tight">
                Diseñado para Generar ROI
              </h3>
              <p className="text-sm text-slate-600 dark:text-silver/60 mt-2 max-w-lg leading-relaxed font-normal">
                No hacemos sitios estáticos decorativos: construimos plataformas de captación y herramientas operativas diseñadas para multiplicar tus conversiones.
              </p>
            </div>

            {/* Comparison Bar */}
            <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.04]">
                <span className="text-xs uppercase tracking-wider text-slate-400 dark:text-silver/40 block mb-1">
                  Agencias Tradicionales
                </span>
                <p className="text-xs text-slate-600 dark:text-silver/60 leading-relaxed">
                  Plantillas genéricas, procesos lentos de meses y sistemas desconectados sin IA.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple/10 border border-purple/30 dark:bg-purple/15 dark:border-purple/40 shadow-sm">
                <span className="text-xs uppercase tracking-wider text-gradient-aurora font-bold block mb-1">
                  MayorgAI Studio
                </span>
                <p className="text-xs text-slate-700 dark:text-silver/80 leading-relaxed font-medium">
                  Diseño 100% a medida, automatizaciones nativas y entrega ágil en 2 a 4 semanas.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/50 dark:border-white/5 text-xs text-slate-500 dark:text-silver/40 flex justify-between items-center">
              <span>Entrega de activos con código fuente</span>
              <span className="text-gradient-aurora font-bold text-sm">+300% Conversión</span>
            </div>
          </BentoCard>
        </motion.div>
      </div>
    </section>
  );
}
