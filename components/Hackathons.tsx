"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Medal } from "lucide-react";
import { hackathons as hackathonsData } from "@/data/portfolio";

const iconMap: Record<string, any> = {
  Winner: Trophy,
  "Runner-Up": Award,
  "Top 100": Medal,
  "3rd Place": Medal,
};
const colorMap: Record<string, string> = {
  Winner: "from-yellow-400 to-orange-400",
  "Runner-Up": "from-purple-400 to-pink-400",
  "Top 100": "from-blue-400 to-cyan-400",
  "3rd Place": "from-[#ffe0c2] to-[#d4a87a]",
};
const hackathons = hackathonsData.map((hack) => ({
  ...hack,
  icon: iconMap[hack.position] || Trophy,
  color: colorMap[hack.position] || "from-[#ffe0c2] to-[#d4a87a]",
}));

export default function Hackathons() {
  return (
    <section
      id="hackathons"
      className="py-16 sm:py-24 bg-gradient-to-b from-[#111111] to-[#191919]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-2.5 clay-pill text-[#ffe0c2] text-xs sm:text-sm font-medium tracking-widest uppercase mb-4">
            Achievements
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            Hackathons & <span className="text-gradient">Awards</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {hackathons.map((hack, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="clay clay-hover rounded-3xl p-6 sm:p-8 relative overflow-hidden"
            >
              <div
                className={`absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br ${hack.color} opacity-10 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16`}
              />
              <div className="relative">
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${hack.color} clay-icon flex items-center justify-center mb-4 sm:mb-6`}
                >
                  <hack.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2">
                  <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                    {hack.title}
                  </h3>
                  <span
                    className={`px-3 sm:px-4 py-1.5 bg-gradient-to-r ${hack.color} text-white rounded-full text-xs sm:text-sm font-bold self-start sm:self-auto tracking-wide`}
                    style={{
                      boxShadow:
                        "4px 4px 14px -2px rgba(0,0,0,0.35), inset 0 1.5px 3px 0 rgba(255,255,255,0.25), inset 0 -2px 5px 0 rgba(0,0,0,0.2)",
                    }}
                  >
                    {hack.position}
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-semibold text-[#ffe0c2] mb-2">
                  {hack.project}
                </h4>
                <p className="text-[#b4b4b4] text-sm sm:text-base font-light leading-relaxed">
                  {hack.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
