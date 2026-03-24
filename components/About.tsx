"use client";

import { motion } from "framer-motion";
import { Clock, Briefcase, Users, Coffee, Download } from "lucide-react";
import Image from "next/image";
import { about, personalInfo } from "@/data/portfolio";

const iconMap = {
  clock: Clock,
  briefcase: Briefcase,
  users: Users,
  coffee: Coffee,
};

export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-[#111111] to-[#191919]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2.5 clay-pill text-[#ffe0c2] text-xs sm:text-sm font-medium tracking-widest uppercase mb-4">
            About Me
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            Who <span className="text-gradient">I Am</span>
          </h2>
        </motion.div>

        <div className="flex flex-col items-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-6 sm:mb-8"
          >
            <div className="relative w-full h-full rounded-full overflow-hidden clay-image">
              <Image
                src={personalInfo.image}
                alt={personalInfo.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="clay clay-hover rounded-3xl p-4 sm:p-6 mb-6 sm:mb-8 max-w-2xl w-full"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#ffe0c2]/15 clay-icon flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffe0c2]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-white mb-1">
                  Currently Studying
                </h3>
                <p className="text-sm sm:text-base text-[#ffe0c2] font-semibold mb-1">
                  BMS Institute of Technology and Management
                </p>
                <p className="text-xs sm:text-sm text-[#b4b4b4] font-light">
                  Computer Science and Engineering • 3rd Year
                </p>
                <div className="flex items-center gap-1.5 mt-1 text-xs sm:text-sm text-[#888]">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Bangalore, India
                </div>
              </div>
            </div>
          </motion.div>

          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            href={personalInfo.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#ffe0c2] to-[#d4a87a] text-[#111111] clay-btn font-bold text-sm sm:text-base tracking-tight"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            View Resume
          </motion.a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {about.stats.map((stat, i) => {
            const Icon = iconMap[stat.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="clay clay-hover rounded-3xl p-4 sm:p-6 text-center"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#ffe0c2] to-[#d4a87a] clay-icon flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#111111]" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-[#b4b4b4] text-xs sm:text-sm font-light">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
