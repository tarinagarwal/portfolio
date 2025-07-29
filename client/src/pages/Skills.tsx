import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Database,
  Cloud,
  Palette,
  GitBranch,
  Server,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import SkeletonLoader from "../components/SkeletonLoader";

interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  icon: string;
  years_experience: number;
}

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(
          "https://portfolio-5y49.onrender.com/api/skills"
        );
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Code,
      Database,
      Cloud,
      Palette,
      GitBranch,
      Server,
      Code2: Code,
      Layers: Code,
      Box: Server,
      Share2: Code,
      Zap: Database,
      Brush: Palette,
    };
    return icons[iconName] || Code;
  };

  const categoryIcons: { [key: string]: any } = {
    Frontend: Code,
    Backend: Server,
    Database: Database,
    Cloud: Cloud,
    Design: Palette,
    Tools: GitBranch,
    DevOps: Server,
    API: Code,
  };

  const categories = Array.from(new Set(skills.map((skill) => skill.category)));

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 90) return "from-green-500 to-emerald-500";
    if (proficiency >= 80) return "from-blue-500 to-cyan-500";
    if (proficiency >= 70) return "from-purple-500 to-violet-500";
    return "from-orange-500 to-yellow-500";
  };

  const getProficiencyLabel = (proficiency: number) => {
    if (proficiency >= 90) return "Expert";
    if (proficiency >= 80) return "Advanced";
    if (proficiency >= 70) return "Intermediate";
    return "Beginner";
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              My{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Skills
              </span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Technologies and tools I use to bring ideas to life
            </p>
          </motion.div>

          {loading ? (
            <div className="space-y-12">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-6">
                  <SkeletonLoader className="h-8 w-48 mx-auto" />
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, skillIndex) => (
                      <SkeletonLoader
                        key={skillIndex}
                        variant="card"
                        className="h-32"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-16">
              {categories.map((category, categoryIndex) => {
                const categorySkills = skills.filter(
                  (skill) => skill.category === category
                );
                const CategoryIcon = categoryIcons[category] || Code;

                return (
                  <motion.div
                    key={category}
                    className="space-y-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  >
                    {/* Category Header */}
                    <div className="flex items-center justify-center space-x-3 mb-8">
                      <CategoryIcon className="w-8 h-8 text-purple-400" />
                      <h2 className="text-2xl font-bold text-white">
                        {category}
                      </h2>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categorySkills.map((skill, skillIndex) => {
                        const SkillIcon = getIconComponent(skill.icon);

                        return (
                          <motion.div
                            key={skill.id}
                            className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.6,
                              delay: skillIndex * 0.05,
                            }}
                            whileHover={{ y: -5 }}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                  <SkillIcon className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors duration-200">
                                    {skill.name}
                                  </h3>
                                  {/* <p className="text-sm text-gray-400">
                                    {skill.years_experience} years
                                  </p> */}
                                </div>
                              </div>
                              <span
                                className={`px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${getProficiencyColor(
                                  skill.proficiency
                                )} text-white`}
                              >
                                {getProficiencyLabel(skill.proficiency)}
                              </span>
                            </div>

                            {/* Proficiency Bar */}
                            {/* <div className="mb-2">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-400">Proficiency</span>
                                <span className="text-white font-medium">{skill.proficiency}%</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <motion.div
                                  className={`h-2 rounded-full bg-gradient-to-r ${getProficiencyColor(skill.proficiency)}`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.proficiency}%` }}
                                  transition={{ duration: 1, delay: skillIndex * 0.1 }}
                                />
                              </div>
                            </div> */}
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Skills Summary */}
          <motion.div
            className="mt-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Skills Overview
              </h3>
              <p className="text-gray-300">
                A comprehensive look at my technical expertise and experience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {skills.length}
                </div>
                <div className="text-gray-300">Total Skills</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {Math.round(
                    skills.reduce((acc, skill) => acc + skill.proficiency, 0) /
                      skills.length
                  )}
                  %
                </div>
                <div className="text-gray-300">Average Proficiency</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {Math.round(
                    skills.reduce(
                      (acc, skill) => acc + skill.years_experience,
                      0
                    ) / skills.length
                  )}
                </div>
                <div className="text-gray-300">Average Experience</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Skills;
