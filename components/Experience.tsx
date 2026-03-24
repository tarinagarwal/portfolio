"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24 bg-[#191919]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-2.5 clay-pill text-[#ffe0c2] text-xs sm:text-sm font-medium tracking-widest uppercase mb-4">
            Work Experience
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            My <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#ffe0c2] via-[#d4a87a] to-transparent hidden sm:block" />

          <div className="space-y-8 sm:space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute left-2.5 sm:left-6 top-6 w-3 h-3 sm:w-5 sm:h-5 bg-[#ffe0c2] rounded-full border-2 sm:border-4 border-[#191919] clay-dot hidden sm:block" />

                <div className="sm:ml-12 md:ml-20 clay clay-hover rounded-3xl p-4 sm:p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 sm:mb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-[#ffe0c2] font-semibold text-sm sm:text-base">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-[#b4b4b4] text-xs sm:text-sm font-light mt-2 md:mt-0">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-[#b4b4b4] mb-3 sm:mb-4 text-sm sm:text-base font-light leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, j) => (
                      <span
                        key={j}
                        className="px-3 sm:px-4 py-1.5 clay-tag text-[#ffe0c2] text-xs sm:text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
