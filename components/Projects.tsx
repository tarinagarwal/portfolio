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
            <div className="flex gap-4 sm:gap-6">
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="flex-[0_0_100%] sm:flex-[0_0_80%] md:flex-[0_0_50%] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="glass glass-hover rounded-2xl sm:rounded-3xl overflow-hidden group h-full"
                  >
                    <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center gap-3 sm:gap-4 p-4 sm:p-6">
                        <a
                          href={project.github}
                          className="p-2.5 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                        >
                          <Github className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </a>
                        <a
                          href={project.live}
                          className="p-2.5 sm:p-3 bg-emerald-500 rounded-full hover:bg-emerald-600 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </a>
                      </div>
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {project.tags.map((tag, j) => (
                          <span
                            key={j}
                            className="px-2.5 sm:px-3 py-0.5 sm:py-1 glass rounded-full text-emerald-400 text-xs sm:text-sm"
                          >
                            {tag}
                          </span>
                        ))}
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
