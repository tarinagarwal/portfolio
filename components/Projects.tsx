"use client";

import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { useCallback } from "react";
import { projects } from "@/data/portfolio";

export default function Projects() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    skipSnaps: false,
    containScroll: "trimSnaps",
  });
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  return (
    <section id="projects" className="py-16 sm:py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-2.5 clay-pill text-[#ffe0c2] text-xs sm:text-sm font-medium tracking-widest uppercase mb-4">
            Projects
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            My <span className="text-gradient">Work</span>
          </h2>
        </motion.div>

        <div className="relative px-8 sm:px-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="flex-[0_0_100%] sm:flex-[0_0_80%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-2 sm:px-3"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={scrollPrev}
            className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 clay-dock-icon z-10"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffe0c2]" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 clay-dock-icon z-10"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffe0c2]" />
          </button>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="clay clay-hover rounded-3xl overflow-hidden h-full flex flex-col"
    >
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden flex-shrink-0 clay-image-frame">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {project.badge && (
          <div
            className="absolute top-3 right-3 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full text-xs font-bold text-black clay-btn flex items-center gap-1"
            style={{
              boxShadow:
                "0 8px 20px -4px rgba(234,179,8,0.4), inset 0 2px 4px 0 rgba(255,255,255,0.3), inset 0 -2px 6px 0 rgba(0,0,0,0.2)",
            }}
          >
            <span>⭐</span>
            <span>{project.badge}</span>
          </div>
        )}
      </div>
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white mb-2">
          {project.title}
        </h3>
        <p className="text-[#b4b4b4] mb-3 sm:mb-4 text-sm sm:text-base flex-grow font-light leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
          {project.tags.map((tag, j) => (
            <span
              key={j}
              className="px-3 sm:px-3.5 py-1 sm:py-1.5 clay-tag text-[#ffe0c2] text-xs sm:text-sm font-medium h-fit"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3 pt-3 border-t border-white/10 mt-auto">
          {project.github && project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 clay-tag text-white text-sm font-medium clay-hover"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          )}
          {project.live && project.live !== "#" && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#ffe0c2] clay-btn text-[#111111] text-sm font-bold"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
