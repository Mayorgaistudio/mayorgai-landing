"use client";

import { motion } from "framer-motion";

const marqueeItems = [
  { text: "BRANDING DE IMPACTO", isGradient: false },
  { text: "SISTEMAS DE IA", isGradient: true },
  { text: "DISEÑO WEB PREMIUM", isGradient: false },
  { text: "AUTOMATIZACIÓN 24/7", isGradient: true },
  { text: "SOFTWARE A MEDIDA", isGradient: false },
  { text: "AGENTES DE VOZ", isGradient: true },
  { text: "CORE WEB VITALS 100", isGradient: false },
  { text: "ESTRATEGIA DIGITAL", isGradient: true },
];

export default function KineticMarquee({
  reverse = false,
  className = "",
}: {
  reverse?: boolean;
  className?: string;
}) {
  // Duplicate array for seamless infinite loop
  const list = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div
      className={`relative w-full overflow-hidden py-5 sm:py-7 border-y border-slate-200/60 dark:border-white/[0.05] bg-slate-50/60 dark:bg-black/40 backdrop-blur-md select-none ${className}`}
    >
      {/* Edge Gradient Mask for seamless fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 dark:from-[#090B12] dark:via-[#090B12]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 dark:from-[#090B12] dark:via-[#090B12]/80 to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <motion.div
        className="flex items-center gap-6 sm:gap-10 w-max"
        animate={{
          x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
        whileHover={{
          transition: { duration: 45, repeat: Infinity, ease: "linear" },
        }}
      >
        {list.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 sm:gap-10 shrink-0">
            <span
              className={`text-sm sm:text-base lg:text-lg font-black font-cabinet uppercase tracking-[0.25em] transition-all duration-300 ${
                item.isGradient
                  ? "text-gradient-aurora drop-shadow-[0_0_15px_rgba(109,93,251,0.3)]"
                  : "text-slate-800 dark:text-silver/80 hover:text-slate-950 dark:hover:text-white"
              }`}
            >
              {item.text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] shadow-[0_0_6px_#00D4FF] shrink-0 opacity-75" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
