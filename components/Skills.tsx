"use client";

import { motion } from "framer-motion";
import { techStack, skillCategories } from "@/data/portfolio";

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 bg-gradient-to-b from-[#0d1425] to-[#0a0f1e]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 glass text-emerald-400 rounded-full text-sm font-semibold mb-4">
            SKILLS & TECH STACK
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            What I <span className="text-gradient">Know</span>
          </h2>
        </motion.div>

        {/* Tech Stack */}
        <div className="mb-20">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center">
            Tech <span className="text-gradient">Stack</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="glass glass-hover rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3"
              >
                <span className="text-white font-semibold text-xs sm:text-sm md:text-base">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Categories */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center">
            Core <span className="text-gradient">Skills</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {skillCategories.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass glass-hover rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-center"
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">
                  {skill.icon}
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                  {skill.title}
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
