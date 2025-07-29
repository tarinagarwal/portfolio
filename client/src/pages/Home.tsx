import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import LoadingSpinner from "../components/LoadingSpinner";
import SkeletonLoader from "../components/SkeletonLoader";
import Spline from "@splinetool/react-spline";

interface Profile {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  avatar_url: string;
  resume_url: string;
  linkedin_url: string;
  github_url: string;
  twitter_url: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image_url: string;
  live_url: string;
  github_url: string;
  featured: boolean;
}

const Home: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, projectsRes] = await Promise.all([
          fetch("https://portfolio-5y49.onrender.com/api/profile"),
          fetch(
            "https://portfolio-5y49.onrender.com/api/projects?featured=true"
          ),
        ]);

        const profileData = await profileRes.json();
        const projectsData = await projectsRes.json();

        setProfile(profileData);
        setFeaturedProjects(projectsData.slice(0, 3));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {loading ? (
                <div className="space-y-4">
                  <SkeletonLoader className="h-12 w-3/4 mx-auto lg:mx-0" />
                  <SkeletonLoader className="h-6 w-1/2 mx-auto lg:mx-0" />
                  <SkeletonLoader lines={3} className="mt-6" />
                </div>
              ) : profile ? (
                <>
                  <motion.h1
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Hi, I'm{" "}
                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      {profile.name}
                    </span>
                  </motion.h1>

                  <motion.p
                    className="text-xl text-gray-300 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {profile.title}
                  </motion.p>

                  <motion.p
                    className="text-lg text-gray-400 mb-8 max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {profile.bio}
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Link
                      to="/portfolio"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
                    >
                      View My Work
                      <ArrowRight className="ml-2" size={20} />
                    </Link>

                    <a
                      href={profile.resume_url}
                      className="inline-flex items-center px-6 py-3 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:bg-gray-800 hover:border-gray-500 transition-all duration-200"
                    >
                      <Download className="mr-2" size={20} />
                      Download Resume
                    </a>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-6 justify-center lg:justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <a
                      href={profile.github_url}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={24} />
                    </a>
                    <a
                      href={profile.linkedin_url}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin size={24} />
                    </a>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Send email"
                    >
                      <Mail size={24} />
                    </a>
                  </motion.div>
                </>
              ) : null}
            </motion.div>

            {/* Profile Image */}
            <motion.div
              className="hidden md:flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {loading ? (
                <SkeletonLoader variant="avatar" className="w-80 h-80" />
              ) : profile ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-20 blur-2xl transform scale-110"></div>
                  {/* <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    className="relative w-80 h-80 rounded-full object-cover border-4 border-gray-700 shadow-2xl"
                  /> */}
                  <Spline scene="https://prod.spline.design/SqdJqi-TwKVKAbeF/scene.splinecode" />
                </div>
              ) : null}
            </motion.div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Featured Projects
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Here are some of my recent projects that showcase my skills and
                expertise
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <SkeletonLoader key={index} variant="card" />
                  ))
                : featuredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-200">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 mb-4">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded">
                              +{project.technologies.length - 3} more
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <a
                            href={project.live_url}
                            className="text-purple-400 hover:text-purple-300 font-medium"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Live →
                          </a>
                          <a
                            href={project.github_url}
                            className="text-gray-400 hover:text-white transition-colors duration-200"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github size={20} />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
            </div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Link
                to="/portfolio"
                className="inline-flex items-center px-6 py-3 border border-purple-500 text-purple-400 font-semibold rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-200"
              >
                View All Projects
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 sm:p-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Let's Work Together
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                I'm always interested in new opportunities and exciting
                projects. Let's discuss how we can bring your ideas to life.
              </p>

              {profile && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin size={20} className="text-purple-400" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone size={20} className="text-purple-400" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail size={20} className="text-purple-400" />
                    <span>{profile.email}</span>
                  </div>
                </div>
              )}

              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
              >
                Get In Touch
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;
