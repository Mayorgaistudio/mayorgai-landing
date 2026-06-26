"use client";

import { useState, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════
   PROCESS DATA
   ═══════════════════════════════════════════════════════ */
const steps = [
  {
    num: "01",
    title: "Descubrimiento",
    description:
      "Nos sumergimos en tu negocio, objetivos y audiencia para construir la estrategia correcta.",
    image: "/jarvis-chubby/jarvis-detective.png",
    milestones: [
      "Brief estratégico",
      "Investigación",
      "Objetivos del proyecto",
      "Público objetivo",
      "Arquitectura inicial",
    ],
    accent: "#6D5DFB",
  },
  {
    num: "02",
    title: "Diseño",
    description:
      "Transformamos estrategia en experiencias visuales memorables y premium.",
    image: "/jarvis-chubby/jarvis-dise%C3%B1o.png",
    milestones: [
      "Moodboard",
      "Wireframes",
      "Sistema visual",
      "Prototipos",
      "Revisiones colaborativas",
    ],
    accent: "#8A63FF",
  },
  {
    num: "03",
    title: "Desarrollo",
    description:
      "Construimos tecnología moderna y experiencias digitales listas para escalar.",
    image: "/jarvis-chubby/jarvis-matrix.png",
    milestones: [
      "Desarrollo",
      "Responsive",
      "Optimización",
      "Animaciones",
      "Testing y QA",
    ],
    accent: "#00D4FF",
  },
  {
    num: "04",
    title: "Escalabilidad",
    description:
      "Automatizamos y optimizamos para convertir crecimiento en sistema.",
    image: "/jarvis-chubby/jarvis-estratega.png",
    milestones: [
      "Automatizaciones",
      "SEO y analítica",
      "Integraciones",
      "Infraestructura escalable",
      "Optimización continua",
    ],
    accent: "#6D5DFB",
  },
];

/* ═══════════════════════════════════════════════════════
   HOLOGRAPHIC CHECK ICON
   ═══════════════════════════════════════════════════════ */
function HoloCheck() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className="shrink-0"
    >
      <circle
        cx="9"
        cy="9"
        r="8"
        stroke="url(#holoGrad)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M5.5 9.2L7.8 11.5L12.5 6.5"
        stroke="url(#holoGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="holoGrad"
          x1="0"
          y1="18"
          x2="18"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6D5DFB" />
          <stop offset="0.5" stopColor="#8A63FF" />
          <stop offset="1" stopColor="#00D4FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   FLIP CARD COMPONENT
   ═══════════════════════════════════════════════════════ */
function FlipCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // ── Mouse parallax ──
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const mouseX = useSpring(rawX, springConfig);
  const mouseY = useSpring(rawY, springConfig);

  const rotateCardY = useTransform(mouseX, [0, 1], [-6, 6]);
  const rotateCardX = useTransform(mouseY, [0, 1], [4, -4]);
  const glowX = useTransform(mouseX, [0, 1], ["10%", "90%"]);
  const glowY = useTransform(mouseY, [0, 1], ["10%", "90%"]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isFlipped) return;
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set((e.clientX - rect.left) / rect.width);
      rawY.set((e.clientY - rect.top) / rect.height);
    },
    [rawX, rawY, isFlipped]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0.5);
    rawY.set(0.5);
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped((prev) => !prev)}
      className="relative w-full cursor-pointer group"
      style={{
        perspective: "1200px",
        minHeight: "480px",
      }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          minHeight: "480px",
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* ══════════════════════════════════════
            FRONT FACE
           ══════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            rotateX: isFlipped ? 0 : rotateCardX,
            rotateY: isFlipped ? 0 : rotateCardY,
          }}
        >
          {/* Animated border glow */}
          <div
            className="absolute inset-0 rounded-2xl p-px"
            style={{
              background:
                "linear-gradient(135deg, rgba(109,93,251,0.3), rgba(138,99,255,0.15), rgba(0,212,255,0.3))",
              opacity: 0.5,
            }}
          >
            <div className="absolute inset-px rounded-[15px] bg-slate-50 dark:bg-[#0D0F18]" />
          </div>

          {/* Hover glow border overlay */}
          <motion.div
            className="absolute inset-0 rounded-2xl p-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, #6D5DFB, #8A63FF, #00D4FF, #8A63FF, #6D5DFB)",
              backgroundSize: "300% 300%",
              animation: "borderShift 4s ease infinite",
            }}
          >
            <div className="absolute inset-px rounded-[15px] bg-slate-50 dark:bg-[#0D0F18]" />
          </motion.div>

          {/* Inner content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-between pt-7 px-7 pb-11 sm:pt-8 sm:px-8 sm:pb-12">
            {/* Dynamic hover glow */}
            <motion.div
              className="absolute w-[200px] h-[200px] rounded-full pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                left: glowX,
                top: glowY,
                x: "-50%",
                y: "-50%",
                background: `radial-gradient(circle, ${step.accent}20 0%, transparent 70%)`,
                filter: "blur(40px)",
              }}
            />

            {/* Step number */}
            <div className="w-full text-left relative z-10">
              <span className="text-5xl sm:text-6xl font-bold font-cabinet text-gradient-aurora select-none leading-none">
                {step.num}
              </span>
            </div>

            {/* Jarvis chubby — floating animation */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-4">
              <motion.img
                src={step.image}
                alt={step.title}
                className="w-36 h-36 sm:w-40 sm:h-40 object-contain select-none pointer-events-none"
                style={{
                  filter: `drop-shadow(0 0 20px ${step.accent}40) drop-shadow(0 0 40px ${step.accent}15)`,
                }}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4 + index * 0.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            </div>

            {/* Title & Description */}
            <div className="w-full text-left relative z-10">
              <h3 className="text-xl font-bold font-cabinet text-slate-900 dark:text-white tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-silver/60 mt-2 leading-relaxed">
                {step.description}
              </p>

              {/* Interaction hint */}
              <div className="flex items-center gap-2 mt-4 text-xs text-slate-400 dark:text-purple-light/60 group-hover:text-[#6D5DFB] dark:group-hover:text-purple-light transition-colors duration-300">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-70 group-hover:rotate-180 transition-transform duration-500"
                >
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                  <path d="M3 21v-5h5" />
                </svg>
                <span>Haz clic para descubrir más</span>
              </div>
            </div>
          </div>

          {/* Subtle bottom gradient line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(90deg, transparent, #6D5DFB, #00D4FF, transparent)",
            }}
          />
        </motion.div>

        {/* ══════════════════════════════════════
            BACK FACE
           ══════════════════════════════════════ */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Border */}
          <div
            className="absolute inset-0 rounded-2xl p-px"
            style={{
              background:
                "linear-gradient(135deg, #6D5DFB, #8A63FF, #00D4FF)",
            }}
          >
            <div className="absolute inset-px rounded-[15px] bg-slate-50 dark:bg-[#0D0F18]" />
          </div>

          {/* Background glow accent */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: `radial-gradient(ellipse at 50% 100%, ${step.accent}12 0%, transparent 60%)`,
            }}
          />

          {/* Background mascot watermark */}
          <div
            className="absolute right-[-20px] bottom-[-20px] w-40 h-40 pointer-events-none z-0"
            style={{
              backgroundImage: `url(${step.image})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              opacity: 0.06,
              filter: "blur(1px)",
            }}
          />

          {/* Back content */}
          <div className="relative z-10 h-full flex flex-col pt-7 px-7 pb-11 sm:pt-8 sm:px-8 sm:pb-12">
            {/* Back header */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold font-cabinet text-gradient-aurora select-none">
                {step.num}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#6D5DFB]/30 to-transparent" />
            </div>

            <h4 className="text-lg font-bold font-cabinet text-slate-900 dark:text-white tracking-tight">
              {step.title}
            </h4>

            <p className="text-xs uppercase tracking-[0.2em] text-[#6D5DFB] font-medium mt-4 mb-5">
              Incluye:
            </p>

            {/* Milestones list */}
            <ul className="space-y-3 flex-1">
              {step.milestones.map((milestone, i) => (
                <motion.li
                  key={milestone}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isFlipped ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <HoloCheck />
                  <span className="text-sm text-slate-600 dark:text-silver/70">{milestone}</span>
                </motion.li>
              ))}
            </ul>

            {/* Close hint */}
            <div className="flex items-center gap-2 mt-4 text-xs text-slate-400 dark:text-silver/40">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="opacity-60"
              >
                <path
                  d="M4 4l6 6M10 4l-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span>Clic para volver</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-20 md:py-28 lg:py-32 relative overflow-hidden"
    >
      {/* Background volumetric glows */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#6D5DFB]/[0.04] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#00D4FF]/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ── Section header ── */}
        <motion.div
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#6D5DFB]">
            PROCESO
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-cabinet text-slate-900 dark:text-white mt-4 tracking-tight">
            Cómo Trabajamos
          </h2>
          <p className="text-lg text-slate-600 dark:text-silver/70 mt-4 max-w-2xl font-normal leading-relaxed">
            Un proceso claro, transparente y diseñado para generar resultados.
          </p>
        </motion.div>

        {/* ── Flip cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {steps.map((step, index) => (
            <FlipCard key={step.num} step={step} index={index} />
          ))}
        </div>


      </div>

      {/* ── Animated border keyframe ── */}
      <style jsx>{`
        @keyframes borderShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
}
