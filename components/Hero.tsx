"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#111111] via-[#191919] to-[#111111]">
        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-10 sm:top-20 sm:left-20 w-48 h-48 sm:w-96 sm:h-96 bg-[#ffe0c2]/20 rounded-full blur-3xl"
            aria-hidden="true"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-48 h-48 sm:w-96 sm:h-96 bg-[#d4a87a]/20 rounded-full blur-3xl"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 clay-pill px-4 sm:px-6 py-2.5 text-[#ffe0c2] text-xs sm:text-sm font-medium tracking-wide mb-6 sm:mb-8"
          >
            <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffe0c2] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-[#ffe0c2]"></span>
            </span>
            Available for opportunities
          </motion.div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-4 sm:mb-6 leading-[1.1] px-2">
            Hi, I'm <span className="text-gradient">Tarin Agarwal</span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-[#b4b4b4] max-w-3xl mx-auto mb-4 sm:mb-6 leading-relaxed px-4 font-light">
            Full-Stack Developer & Game Developer
            <span className="block mt-2 font-semibold text-[#ffe0c2]">
              Building modern, scalable applications and immersive gaming
              experiences
            </span>
          </p>

          <div className="flex items-center justify-center gap-2 text-[#b4b4b4] mb-8 sm:mb-12 px-4">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffe0c2]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
            <span className="text-sm sm:text-base font-light">
              Bangalore, India
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            <a
              href="#projects"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#ffe0c2] to-[#d4a87a] text-[#111111] clay-btn font-bold text-base sm:text-lg text-center tracking-tight"
              aria-label="View my projects"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 clay-pill clay-hover text-[#ffe0c2] font-semibold text-base sm:text-lg text-center"
              aria-label="Get in touch with me"
            >
              Get In Touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
