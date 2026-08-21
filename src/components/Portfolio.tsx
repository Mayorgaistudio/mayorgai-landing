"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectMeta } from "@/app/api/portfolio/route";

/* ═══════════════════════════════════════════════════════
   LIGHTBOX MODAL FOR FULL SCREEN VIEWING
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (images && images.length > 1) {
        if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev + 1) % images.length);
        if (e.key === "ArrowLeft")  setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images, onClose]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!images) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!images) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const hasImages = images && images.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl rounded-3xl bg-[#090B12] border border-white/10 p-6 md:p-8 flex flex-col justify-between max-h-[90vh] shadow-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer"
          aria-label="Cerrar modal"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-12 pb-4 border-b border-white/10">
          <div>
            <div className="flex gap-2 mb-1.5 flex-wrap">
              {project.categories.map((cat, i) => (
                <span key={i} className="text-[10px] text-[#00D4FF] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20">
                  {cat}
                </span>
              ))}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-cabinet text-white tracking-tight">
              {project.title}
            </h2>
          </div>
          <a
            href="#contact"
            onClick={onClose}
            className="self-start sm:self-auto px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold text-white gradient-aurora hover:shadow-[0_0_25px_rgba(109,93,251,0.45)] transition-all"
          >
            Cotizar Similar
          </a>
        </div>

        {/* Image Container */}
        <div className="relative flex-1 min-h-[300px] sm:min-h-[460px] flex items-center justify-center overflow-hidden rounded-2xl bg-black/60 mt-4">
          {hasImages ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`${project.title} - ${currentIndex + 1}`}
                className="max-h-[60vh] w-auto max-w-full object-contain rounded-lg"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          ) : (
            <div className="text-silver/40 text-sm">Sin imágenes disponibles</div>
          )}

          {/* Navigation Arrows */}
          {hasImages && images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 border border-white/15 flex items-center justify-center text-white transition-all cursor-pointer z-30"
                aria-label="Anterior"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 border border-white/15 flex items-center justify-center text-white transition-all cursor-pointer z-30"
                aria-label="Siguiente"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Footer Dots & Counter */}
        {hasImages && (
          <div className="flex items-center justify-between pt-4 px-2">
            <span className="text-xs text-silver/40">
              Captura {currentIndex + 1} de {images.length}
            </span>
            {images.length > 1 && (
              <div className="flex gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentIndex ? "bg-[#00D4FF] w-4" : "bg-white/30 w-1.5"
                    }`}
                    aria-label={`Ir a imagen ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   EDITORIAL LOOKBOOK MAGAZINE PORTFOLIO
   ═══════════════════════════════════════════════════════ */
export default function Portfolio() {
  const [projects, setProjects]                     = useState<ProjectMeta[]>([]);
  const [currentPage, setCurrentPage]               = useState(0);
  const [currentImageIndex, setCurrentImageIndex]   = useState(0);
  const [direction, setDirection]                   = useState<"next" | "prev">("next");
  const [loading, setLoading]                       = useState(true);
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

  const totalPages = projects.length;
  const currentProject = projects[currentPage];

  // Reset image index when turning page
  const turnPage = (newPageIndex: number, dir: "next" | "prev") => {
    if (newPageIndex < 0 || newPageIndex >= totalPages) return;
    setDirection(dir);
    setCurrentPage(newPageIndex);
    setCurrentImageIndex(0);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      turnPage(currentPage + 1, "next");
    } else {
      turnPage(0, "next"); // loop
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      turnPage(currentPage - 1, "prev");
    } else {
      turnPage(totalPages - 1, "prev"); // loop
    }
  };

  return (
    <section id="portfolio" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-[#6D5DFB]/[0.04] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#00D4FF]/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ── HEADER ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#6D5DFB]">
              PORTAFOLIO EDITORIAL
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-cabinet text-slate-900 dark:text-white mt-1.5 tracking-tight">
              Revista de Proyectos
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-silver/60 mt-1 max-w-md font-normal">
              Explora nuestra colección de casos de estudio pasando las hojas de nuestra revista interactiva.
            </p>
          </div>

          {/* Page Counter */}
          {!loading && totalPages > 0 && (
            <div className="self-start sm:self-auto px-4 py-2 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] text-xs font-mono text-slate-700 dark:text-silver/70 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6D5DFB] dark:bg-[#00D4FF] animate-pulse" />
              <span>CASO</span>
              <span className="text-[#6D5DFB] dark:text-[#00D4FF] font-bold">
                {String(currentPage + 1).padStart(2, "0")}
              </span>
              <span>/</span>
              <span>{String(totalPages).padStart(2, "0")}</span>
            </div>
          )}
        </div>

        {/* ── THE EDITORIAL MAGAZINE BOOK SPREAD WITH SIDE NAVIGATION ── */}
        {!loading && currentProject && (
          <div className="relative group/magazine px-2 sm:px-4">
            
            {/* Floating Left Navigation Arrow */}
            <button
              onClick={handlePrevPage}
              className="absolute -left-2 sm:-left-4 lg:-left-7 top-1/2 -translate-y-1/2 z-30 w-11 sm:w-13 h-11 sm:h-13 rounded-full bg-white/95 dark:bg-[#0c0f18]/95 border border-slate-200/90 dark:border-white/15 shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 text-slate-800 dark:text-white flex items-center justify-center backdrop-blur-xl transition-all duration-300 hover:border-[#6D5DFB] dark:hover:border-[#00D4FF] cursor-pointer group/arrow"
              aria-label="Hoja Anterior"
            >
              <svg className="w-5 h-5 transform group-hover/arrow:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Floating Right Navigation Arrow */}
            <button
              onClick={handleNextPage}
              className="absolute -right-2 sm:-right-4 lg:-right-7 top-1/2 -translate-y-1/2 z-30 w-11 sm:w-13 h-11 sm:h-13 rounded-full bg-white/95 dark:bg-[#0c0f18]/95 border border-slate-200/90 dark:border-white/15 shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 text-slate-800 dark:text-white flex items-center justify-center backdrop-blur-xl transition-all duration-300 hover:border-[#6D5DFB] dark:hover:border-[#00D4FF] cursor-pointer group/arrow"
              aria-label="Siguiente Hoja"
            >
              <svg className="w-5 h-5 transform group-hover/arrow:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Main Magazine Frame */}
            <div
              className="relative rounded-3xl overflow-hidden bg-white/95 dark:bg-[#0b0e17] border border-slate-200/90 dark:border-white/[0.09] shadow-[0_25px_70px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
              style={{ perspective: 1800 }}
            >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentPage}
                initial={{
                  opacity: 0,
                  rotateY: direction === "next" ? 35 : -35,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  rotateY: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotateY: direction === "next" ? -35 : 35,
                  scale: 0.97,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: direction === "next" ? "left center" : "right center",
                }}
                className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px] lg:min-h-[580px]"
              >
                
                {/* ── LEFT PAGE: EDITORIAL SPECS & STORY (5 cols) ── */}
                <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200/70 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.015]">
                  <div>
                    {/* Magazine Header Eyebrow */}
                    <div className="flex items-center justify-between pb-6 border-b border-slate-200/60 dark:border-white/[0.06] mb-8">
                      <span className="text-[11px] font-mono tracking-widest text-[#6D5DFB] dark:text-[#8A63FF] font-semibold uppercase">
                        MAYORGAI // ARCHIVO 2025
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 dark:text-silver/40">
                        HOJA {String(currentPage + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Category Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {currentProject.categories.map((cat, i) => (
                        <span
                          key={i}
                          className="text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full text-purple-dark dark:text-[#00D4FF] bg-purple/10 dark:bg-[#00D4FF]/10 border border-purple/20 dark:border-[#00D4FF]/20"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    {/* Project Title */}
                    <h3 className="text-3xl sm:text-4xl font-bold font-cabinet text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-4">
                      {currentProject.title}
                    </h3>

                    {/* Editorial Description */}
                    <p className="text-sm sm:text-base text-slate-600 dark:text-silver/70 font-normal leading-relaxed mb-6">
                      Desarrollo integral enfocado en posicionamiento de alto nivel, rendimiento de carga instantáneo y sistemas de conversión automatizados con IA.
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="space-y-2 pt-4 border-t border-slate-200/60 dark:border-white/[0.06]">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-silver/80">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>Estrategia Visual &amp; Arquitectura UI/UX</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-silver/80">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>Código Optimizado Next.js 16</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-silver/80">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>Integración de Flujos &amp; Captura de Leads</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex flex-wrap items-center gap-3 pt-8 mt-6 border-t border-slate-200/60 dark:border-white/[0.06]">
                    <button
                      onClick={() => setActiveModalProject(currentProject)}
                      className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.15em] text-white gradient-aurora hover:shadow-[0_0_25px_rgba(109,93,251,0.4)] transition-all duration-300 btn-glow cursor-pointer"
                    >
                      Ver Galería Completa ↗
                    </button>
                    <a
                      href="#contact"
                      className="px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.15em] text-slate-800 dark:text-silver/80 hover:text-slate-950 dark:hover:text-white bg-slate-200/60 dark:bg-white/[0.04] border border-slate-300/50 dark:border-white/[0.08] hover:bg-slate-300/60 dark:hover:bg-white/[0.08] transition-all"
                    >
                      Cotizar Similar
                    </a>
                  </div>
                </div>

                {/* ── RIGHT PAGE: HIGH-RES GALLERY PHOTO (7 cols) ── */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-slate-900 dark:bg-[#080a10] relative overflow-hidden">
                  
                  {/* Photo Frame Container */}
                  <div className="relative flex-1 rounded-2xl overflow-hidden bg-black/60 border border-white/10 flex items-center justify-center min-h-[340px] sm:min-h-[420px] group/photo">
                    {currentProject.images.length > 0 ? (
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentImageIndex}
                          src={currentProject.images[currentImageIndex]}
                          alt={`${currentProject.title} captura ${currentImageIndex + 1}`}
                          className="w-full h-full object-contain max-h-[460px] p-2 transition-transform duration-500 group-hover/photo:scale-[1.02]"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </AnimatePresence>
                    ) : (
                      <div className="text-silver/40 text-sm font-mono">Sin capturas disponibles</div>
                    )}

                    {/* Direct Lightbox Trigger overlay button */}
                    <button
                      onClick={() => setActiveModalProject(currentProject)}
                      className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white text-xs font-medium backdrop-blur-md transition-all opacity-0 group-hover/photo:opacity-100 flex items-center gap-1.5 cursor-pointer shadow-lg"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                      <span>Pantalla Completa</span>
                    </button>
                  </div>

                  {/* Thumbnail Strip (If multiple images exist in this project) */}
                  {currentProject.images.length > 1 && (
                    <div className="flex items-center justify-between gap-3 pt-4">
                      <div className="flex items-center gap-2 overflow-x-auto py-1">
                        {currentProject.images.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`relative w-14 h-10 rounded-lg overflow-hidden border transition-all shrink-0 cursor-pointer ${
                              idx === currentImageIndex
                                ? "border-[#00D4FF] ring-2 ring-[#00D4FF]/30 scale-105"
                                : "border-white/15 opacity-50 hover:opacity-100"
                            }`}
                          >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>

                      <span className="text-[11px] font-mono text-silver/50 whitespace-nowrap">
                        Foto {currentImageIndex + 1} de {currentProject.images.length}
                      </span>
                    </div>
                  )}
                </div>

              </motion.div>
            </AnimatePresence>
            </div>
          </div>
        )}

        {/* ── CHAPTER INDEX TABS (Quick jump to any project) ── */}
        {!loading && totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2 overflow-x-auto pb-2">
            {projects.map((proj, idx) => {
              const isCurrent = idx === currentPage;
              return (
                <button
                  key={proj.slug}
                  onClick={() => turnPage(idx, idx > currentPage ? "next" : "prev")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    isCurrent
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md font-semibold"
                      : "bg-slate-100 dark:bg-white/[0.03] text-slate-600 dark:text-silver/60 hover:bg-slate-200 dark:hover:bg-white/[0.08] border border-slate-200/60 dark:border-white/[0.05]"
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-70 mr-1.5">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {proj.title}
                </button>
              );
            })}
          </div>
        )}

      </div>

      {/* ── LIGHTBOX MODAL ── */}
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
