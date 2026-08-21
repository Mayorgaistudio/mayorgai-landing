"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectMeta } from "@/app/api/portfolio/route";

/* ═══════════════════════════════════════════════════════
   FILTER PILLARS DEFINITION (4 Clean Categories)
   ═══════════════════════════════════════════════════════ */
const PILLARS = [
  { key: "all", label: "Todos" },
  { key: "branding", label: "Branding" },
  { key: "web", label: "Diseño Web" },
  { key: "social", label: "Contenido & Redes" },
];

/* ═══════════════════════════════════════════════════════
   GRADIENT PALETTE
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
          transition={{ duration: 0.35 }}
        />
      </AnimatePresence>

      {/* Subtle overlay gradient to maintain contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none z-10" />

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 opacity-0 group-hover/slider:opacity-100 backdrop-blur-md cursor-pointer"
            aria-label="Anterior"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 opacity-0 group-hover/slider:opacity-100 backdrop-blur-md cursor-pointer"
            aria-label="Siguiente"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-md border border-white/10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setCurrentIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "bg-white w-3" : "bg-white/40 w-1.5"
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
   SPOTLIGHT PORTFOLIO CARD
   ═══════════════════════════════════════════════════════ */
function PortfolioCard({
  project,
  index,
  onOpenModal,
}: {
  project: ProjectMeta;
  index: number;
  onOpenModal: (project: ProjectMeta) => void;
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

  const hasImages = project.images.length > 0;
  const gradient  = GRADIENTS[index % GRADIENTS.length];
  const initials  = project.slug
    .split("-")
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 3) || "P";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between h-full group bg-slate-50/70 dark:bg-[#0c0f18]/80 border border-slate-200/80 dark:border-white/[0.07] hover:-translate-y-1.5 shadow-sm hover:shadow-2xl hover:shadow-purple/10 dark:hover:shadow-purple/20"
    >
      {/* ── Spotlight Radial Glow ── */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30"
        style={{
          background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(109, 93, 251, 0.25), rgba(0, 212, 255, 0.1) 40%, transparent 80%)`,
        }}
      />

      {/* Image Preview Window */}
      <div
        onClick={() => onOpenModal(project)}
        className="aspect-[16/10] relative overflow-hidden bg-[#090B12] flex items-center justify-center border-b border-slate-200/80 dark:border-white/[0.06] cursor-pointer"
      >
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0" />

        {/* Real images slider */}
        <ProjectSlider images={project.images} title={project.title} />

        {/* Fallback initials if no images */}
        {!hasImages && (
          <>
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-40 group-hover:scale-[1.05] transition-transform duration-700 ease-out`} />
            <span className="text-6xl font-bold font-cabinet text-white/5 relative z-10 tracking-widest select-none group-hover:scale-110 group-hover:text-white/10 transition-all duration-700">
              {initials}
            </span>
          </>
        )}

        {/* Hover Explore Pill Overlay */}
        <div className="absolute top-3.5 right-3.5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
          <span className="px-3 py-1 rounded-full text-[10px] font-semibold text-white bg-black/60 backdrop-blur-md border border-white/20 shadow-lg inline-flex items-center gap-1">
            <span>Ver Caso</span>
            <span>↗</span>
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between relative z-20">
        <div>
          {/* Category tags */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {project.categories.map((cat, i) => (
              <span
                key={i}
                className="text-[10px] text-[#6D5DFB] dark:text-[#8A63FF] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-purple/5 dark:bg-purple/10 border border-purple/15"
              >
                {cat}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-bold font-cabinet text-slate-900 dark:text-white tracking-tight group-hover:text-purple dark:group-hover:text-[#00D4FF] transition-colors line-clamp-1">
            {project.title}
          </h3>
        </div>

        <button
          onClick={() => onOpenModal(project)}
          className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs uppercase tracking-[0.18em] font-semibold text-slate-800 dark:text-silver/80 bg-white dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] hover:bg-slate-950 hover:text-white dark:hover:bg-white/[0.1] dark:hover:text-white hover:border-slate-950 dark:hover:border-purple/40 transition-all duration-300 cursor-pointer group/btn shadow-sm"
        >
          <span>Explorar Proyecto</span>
          <svg
            className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   LIGHTBOX MODAL
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
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
   MAIN PORTFOLIO COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function Portfolio() {
  const [projects, setProjects]                     = useState<ProjectMeta[]>([]);
  const [filteredProjects, setFilteredProjects]     = useState<ProjectMeta[]>([]);
  const [activeCategory, setActiveCategory]         = useState<string>("all");
  const [loading, setLoading]                       = useState(true);
  const [activeModalProject, setActiveModalProject] = useState<ProjectMeta | null>(null);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data: ProjectMeta[]) => {
        setProjects(data);
        setFilteredProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading portfolio assets:", err);
        setLoading(false);
      });
  }, []);

  const handleFilter = (pillarKey: string) => {
    setActiveCategory(pillarKey);
    if (pillarKey === "all") {
      setFilteredProjects(projects);
    } else if (pillarKey === "branding") {
      setFilteredProjects(
        projects.filter((p) =>
          p.categories.some((c) => {
            const lc = c.toLowerCase();
            return lc.includes("brand") || lc.includes("logo") || lc.includes("identidad") || lc.includes("fintech");
          })
        )
      );
    } else if (pillarKey === "web") {
      setFilteredProjects(
        projects.filter((p) =>
          p.categories.some((c) => {
            const lc = c.toLowerCase();
            return lc.includes("web") || lc.includes("diseño web") || lc.includes("e-commerce");
          })
        )
      );
    } else if (pillarKey === "social") {
      setFilteredProjects(
        projects.filter((p) =>
          p.categories.some((c) => {
            const lc = c.toLowerCase();
            return lc.includes("redes") || lc.includes("post") || lc.includes("social") || lc.includes("salud");
          })
        )
      );
    }
  };

  return (
    <section id="portfolio" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Volumetric Glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#00D4FF]/[0.04] rounded-full blur-[140px] pointer-events-none translate-x-24 translate-y-24" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ── HEADER ROW WITH INLINE MINIMALIST FILTER TABS ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#6D5DFB]">
              PORTAFOLIO
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-cabinet text-slate-900 dark:text-white mt-1.5 tracking-tight">
              Casos de Éxito
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-silver/60 mt-1 max-w-md font-normal">
              Proyectos reales donde fusionamos estrategia de marca, diseño e inteligencia artificial.
            </p>
          </div>

          {/* Minimalist Segmented Filter Tabs */}
          {!loading && (
            <div className="flex items-center gap-1 p-1 rounded-full bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.07] backdrop-blur-md self-start md:self-auto overflow-x-auto max-w-full shrink-0 shadow-sm">
              {PILLARS.map((cat) => {
                const isActive = cat.key === activeCategory;
                return (
                  <button
                    key={cat.key}
                    onClick={() => handleFilter(cat.key)}
                    className={`relative px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-300 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "text-white"
                        : "text-slate-600 dark:text-silver/60 hover:text-slate-950 dark:hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="portfolioActivePill"
                        className="absolute inset-0 rounded-full gradient-aurora shadow-sm"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── PROJECTS GRID (2/3 Col Editorial Grid) ── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <PortfolioCard
                key={project.slug}
                project={project}
                index={index}
                onOpenModal={setActiveModalProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 dark:text-silver/40 text-sm">
              No hay proyectos disponibles en esta categoría.
            </p>
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
