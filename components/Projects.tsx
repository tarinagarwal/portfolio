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
    <section id="projects" className="py-16 sm:py-24 bg-[#0a0f1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-2 glass text-emerald-400 rounded-full text-xs sm:text-sm font-semibold mb-4">
            PROJECTS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4">
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
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="glass glass-hover rounded-2xl sm:rounded-3xl overflow-hidden h-full flex flex-col"
                  >
                    <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden flex-shrink-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      {project.badge && (
                        <div className="absolute top-3 right-3 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full text-xs font-bold text-black shadow-lg flex items-center gap-1">
                          <span>⭐</span>
                          <span>{project.badge}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 sm:p-6 flex flex-col flex-grow">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base flex-grow">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                        {project.tags.map((tag, j) => (
                          <span
                            key={j}
                            className="px-2.5 sm:px-3 py-0.5 sm:py-1 glass rounded-full text-emerald-400 text-xs sm:text-sm h-fit"
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
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors text-white text-sm"
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
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors text-white text-sm"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 glass glass-hover rounded-full hover:bg-emerald-500/20 transition-colors z-10"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 glass glass-hover rounded-full hover:bg-emerald-500/20 transition-colors z-10"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
          </button>
        </div>
      </div>
    </section>
  );
}
