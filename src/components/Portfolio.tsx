"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectMeta } from "@/app/api/portfolio/route";

/* ═══════════════════════════════════════════════════════
   GRADIENT PALETTE — cycles deterministically per project
   ═══════════════════════════════════════════════════════ */
const GRADIENTS = [
  "from-[#6D5DFB]/30 to-[#8A63FF]/20",
  "from-[#6D5DFB]/30 to-[#00D4FF]/20",
  "from-[#00D4FF]/30 to-[#6D5DFB]/10",
  "from-[#8A63FF]/30 to-[#6D5DFB]/20",
  "from-[#00D4FF]/25 to-[#8A63FF]/15",
];

/* ═══════════════════════════════════════════════════════
   PROJECT SLIDER (CAROUSEL) SUB-COMPONENT
   ═══════════════════════════════════════════════════════ */
function ProjectSlider({ images, title }: { images: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="absolute inset-0 z-10 w-full h-full overflow-hidden group/slider">
      {/* Active Image with Fade transition and Hover Zoom */}
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} - Preview ${currentIndex + 1}`}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      </AnimatePresence>

      {/* Subtle overlay gradient to maintain contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090B12]/75 via-transparent to-transparent pointer-events-none z-10" />

      {/* Navigation Arrows (Visible only if more than 1 image exists) */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 opacity-0 group-hover/slider:opacity-100 backdrop-blur-sm cursor-pointer"
            aria-label="Anterior"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 opacity-0 group-hover/slider:opacity-100 backdrop-blur-sm cursor-pointer"
            aria-label="Siguiente"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-black/40 px-2 py-1 rounded-full backdrop-blur-md border border-white/5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setCurrentIndex(i);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "bg-white w-3" : "bg-white/40"
                }`}
                aria-label={`Imagen ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   LIGHTBOX / SCREENSHOT MODAL SUB-COMPONENT
   ═══════════════════════════════════════════════════════ */
function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectMeta;
  onClose: () => void;
}) {
  const images = project.images;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (images && images.length > 1) {
        if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev + 1) % images.length);
        if (e.key === "ArrowLeft")  setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [images, onClose]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const hasImages  = images && images.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-white/95 dark:bg-[#090B12]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-all duration-300 cursor-pointer"
        aria-label="Cerrar modal"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Modal Container */}
      <div
        className="relative max-w-5xl w-full h-[85vh] flex flex-col justify-between items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title + categories (Top) */}
        <div className="text-center w-full pb-4 shrink-0">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {project.categories.map((cat, i) => (
              <span key={i} className="text-xs text-[#6D5DFB] uppercase tracking-wider font-semibold bg-[#6D5DFB]/10 border border-[#6D5DFB]/20 px-2 py-0.5 rounded-full">
                {cat}
              </span>
            ))}
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-cabinet text-slate-900 dark:text-white tracking-tight mt-2">
            {project.title}
          </h3>
        </div>

        {/* Center: Image Display */}
        <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/40 p-4">
          {hasImages ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`${project.title} - Screenshot ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg select-none"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </AnimatePresence>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400 dark:text-silver/40">
              <p className="text-sm">Próximamente capturas de pantalla de este proyecto.</p>
            </div>
          )}

          {/* Left Arrow */}
          {hasImages && images.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/70 hover:bg-white/90 dark:bg-black/40 dark:hover:bg-black/60 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-white/50 hover:text-slate-900 dark:hover:text-white transition-all duration-300 cursor-pointer z-30 shadow-md dark:shadow-none"
              aria-label="Imagen anterior"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Right Arrow */}
          {hasImages && images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/70 hover:bg-white/90 dark:bg-black/40 dark:hover:bg-black/60 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-white/50 hover:text-slate-900 dark:hover:text-white transition-all duration-300 cursor-pointer z-30 shadow-md dark:shadow-none"
              aria-label="Siguiente imagen"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </div>

        {/* Bottom: dots and count */}
        {hasImages && (
          <div className="w-full flex flex-col items-center gap-3 pt-6 shrink-0">
            {images.length > 1 && (
              <div className="flex gap-2 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/5 z-20">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentIndex ? "bg-[#00D4FF] w-4" : "bg-slate-300 dark:bg-white/30"
                    }`}
                    aria-label={`Ir a imagen ${i + 1}`}
                  />
                ))}
              </div>
            )}
            <span className="text-xs text-slate-400 dark:text-silver/40">
              Captura {currentIndex + 1} de {images.length}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PORTFOLIO COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function Portfolio() {
  const [projects, setProjects]               = useState<ProjectMeta[]>([]);
  const [loading, setLoading]                 = useState(true);
  const [activeModalProject, setActiveModalProject] = useState<ProjectMeta | null>(null);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data: ProjectMeta[]) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading portfolio assets:", err);
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section id="portfolio" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Volumetric Glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#00D4FF]/[0.03] rounded-full blur-[140px] pointer-events-none translate-x-24 translate-y-24" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#6D5DFB]">
            PORTAFOLIO
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-cabinet text-slate-900 dark:text-white mt-4 tracking-tight">
            Proyectos Destacados
          </h2>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center mt-20">
            <div className="w-8 h-8 rounded-full border-2 border-[#6D5DFB]/30 border-t-[#6D5DFB] animate-spin" />
          </div>
        )}

        {/* Empty state — shown when no folders have been created yet */}
        {!loading && projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center mt-20 gap-5 text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-[#6D5DFB]/10 border border-[#6D5DFB]/20 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#6D5DFB]/60">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <p className="text-slate-400 dark:text-silver/40 text-sm max-w-xs leading-relaxed">
              Los proyectos aparecerán aquí automáticamente cuando agregues carpetas en{" "}
              <code className="text-[#6D5DFB]/70 bg-[#6D5DFB]/10 px-1 py-0.5 rounded text-xs">
                public/portfolio/
              </code>
            </p>
          </motion.div>
        )}

        {/* Portfolio Grid */}
        {!loading && projects.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          >
            {projects.map((project, index) => {
              const hasImages = project.images.length > 0;
              const gradient  = GRADIENTS[index % GRADIENTS.length];
              const initials  = project.slug
                .split("-")
                .map((w) => w[0]?.toUpperCase() ?? "")
                .join("")
                .slice(0, 3) || "P";

              return (
                <motion.div
                  key={project.slug}
                  variants={cardVariants}
                  className="glass rounded-2xl overflow-hidden group hover:border-slate-350 dark:hover:border-white/[0.12] transition-all duration-500 flex flex-col justify-between h-full"
                >
                  {/* Image / Preview Area */}
                  <div
                    onClick={() => setActiveModalProject(project)}
                    className="aspect-[4/3] relative overflow-hidden bg-[#090B12] flex items-center justify-center border-b border-slate-200 dark:border-white/[0.06] cursor-pointer"
                  >
                    {/* Subtle Grid Pattern Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0" />

                    {/* Slider containing real folder images */}
                    <ProjectSlider images={project.images} title={project.title} />

                    {/* Fallback Initials Glow if no images exist yet */}
                    {!hasImages && (
                      <>
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-40 group-hover:scale-[1.05] transition-transform duration-700 ease-out`} />
                        <span className="text-6xl font-bold font-cabinet text-white/5 relative z-10 tracking-widest select-none group-hover:scale-110 group-hover:text-white/10 transition-all duration-700">
                          {initials}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category tags */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {project.categories.map((cat, i) => (
                          <span
                            key={i}
                            className="text-[10px] text-[#6D5DFB] uppercase tracking-wider font-semibold"
                          >
                            {cat}{i < project.categories.length - 1 ? " /" : ""}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg font-bold font-cabinet text-slate-900 dark:text-white tracking-tight group-hover:text-[#00D4FF] transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white dark:text-silver/70 bg-slate-900 dark:bg-white/[0.03] border border-slate-900 dark:border-white/[0.08] hover:bg-slate-800 dark:hover:bg-white/[0.05] hover:border-slate-800 dark:hover:border-white/25 hover:text-white transition-all duration-300 cursor-pointer group/btn focus:outline-none"
                    >
                      Ver Proyecto
                      <svg
                        className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                        fill="none" stroke="currentColor" strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Lightbox / Modal Overlay */}
      <AnimatePresence>
        {activeModalProject && (
          <ProjectModal
            project={activeModalProject}
            onClose={() => setActiveModalProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
