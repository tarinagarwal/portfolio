import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Users, Coffee, Clock, Download } from "lucide-react";
import PageTransition from "../components/PageTransition";
import SkeletonLoader from "../components/SkeletonLoader";

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

const About: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "https://portfolio-5y49.onrender.com/api/profile"
        );
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const stats = [
    { label: "Years Experience", value: "3+", icon: Clock },
    { label: "Projects Completed", value: "30+", icon: Award },
    { label: "Happy Clients", value: "10+", icon: Users },
    { label: "Cups of Coffee", value: "1000+", icon: Coffee },
  ];

  const values = [
    {
      title: "Innovation",
      description:
        "Always staying ahead of the curve with the latest technologies and best practices.",
      icon: "🚀",
    },
    {
      title: "Quality",
      description:
        "Delivering pixel-perfect, performant, and maintainable code every time.",
      icon: "⭐",
    },
    {
      title: "Collaboration",
      description:
        "Working closely with teams to understand needs and exceed expectations.",
      icon: "🤝",
    },
    {
      title: "Growth",
      description:
        "Continuously learning and adapting to new challenges and technologies.",
      icon: "📈",
    },
  ];

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
              About{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Me
              </span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Get to know the person behind the code
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
            {/* Profile Image and Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {loading ? (
                <div className="space-y-6">
                  <SkeletonLoader
                    variant="image"
                    className="w-full h-96 rounded-2xl"
                  />
                  <SkeletonLoader lines={4} />
                </div>
              ) : profile ? (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-20 blur-2xl transform scale-105"></div>
                    <img
                      src={profile.avatar_url}
                      alt={profile.name}
                      className="relative w-full h-96 object-cover rounded-2xl border-2 border-gray-700 shadow-2xl"
                    />
                  </div>

                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {profile.name}
                    </h2>
                    <p className="text-purple-400 font-semibold mb-4">
                      {profile.title}
                    </p>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {profile.bio}
                    </p>

                    <a
                      href={profile.resume_url}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
                    >
                      <Download className="mr-2" size={20} />
                      Download Resume
                    </a>
                  </div>
                </>
              ) : null}
            </motion.div>

            {/* Story and Values */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">My Story</h3>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Hey there! I'm Tarin Agarwal. A self-taught Full Stack Web
                    and Game Developer, happily crafting anything that eases
                    life or gives people some fun. For years, I've been all over
                    the place, from set implementations like
                    AI-powered-learning-companion Learnify to a Paying Guest
                    marketplace: with React, Node.js, MongoDB, Supabase, and the
                    rest. I love mixing creativity into code to breathe life
                    into ideas that can have utility and meaning.
                  </p>
                  <p>
                    Starting from curiosity, this has grown into a passion. I
                    dabbled in game development with Unity and Unreal Engine and
                    have explored everything from designing UI to backend APIs,
                    ever-actively trying to find ways to upgrade my
                    skillset—through the process of building, breaking, and
                    fixing. I do not seek perfect code, I want impact. And if
                    technology can bring a smile on someone's face, I call that
                    a win.
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    >
                      <IconComponent className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Values Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white text-center mb-12">
              My Core Values
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h4 className="text-xl font-semibold text-white mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
