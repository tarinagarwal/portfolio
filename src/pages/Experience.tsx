import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building, Star } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SkeletonLoader from '../components/SkeletonLoader';

interface Experience {
  id: number;
  company: string;
  position: string;
  description: string;
  start_date: string;
  end_date: string | null;
  location: string;
  technologies: string[];
}

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  avatar_url: string;
  rating: number;
}

const Experience: React.FC = () => {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expResponse, testResponse] = await Promise.all([
          fetch('http://localhost:3001/api/experience'),
          fetch('http://localhost:3001/api/testimonials')
        ]);
        
        const expData = await expResponse.json();
        const testData = await testResponse.json();
        
        setExperience(expData);
        setTestimonials(testData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDateRange = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate).toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
    const end = endDate 
      ? new Date(endDate).toLocaleDateString('en-US', { 
          month: 'short', 
          year: 'numeric' 
        })
      : 'Present';
    
    return `${start} - ${end}`;
  };

  const calculateDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                   (end.getMonth() - start.getMonth());
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
    } else if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'year' : 'years'}`;
    } else {
      return `${years}${years === 1 ? 'yr' : 'yrs'} ${remainingMonths}${remainingMonths === 1 ? 'mo' : 'mos'}`;
    }
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
              My <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Experience</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              My professional journey and the companies I've worked with
            </p>
          </motion.div>

          {/* Experience Timeline */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500 hidden md:block"></div>
              
              <div className="space-y-12">
                {loading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="relative flex items-start">
                      <SkeletonLoader variant="avatar" className="w-16 h-16 mr-6" />
                      <SkeletonLoader variant="card" className="flex-1" />
                    </div>
                  ))
                ) : (
                  experience.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      className="relative flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      {/* Timeline dot */}
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold border-4 border-gray-900 mr-6">
                        <Building size={24} />
                      </div>
                      
                      {/* Experience card */}
                      <motion.div
                        className="flex-1 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300"
                        whileHover={{ y: -5 }}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                              {exp.position}
                            </h3>
                            <h4 className="text-xl text-purple-400 font-semibold mb-2">
                              {exp.company}
                            </h4>
                          </div>
                          
                          <div className="text-right text-sm text-gray-400">
                            <div className="flex items-center mb-1">
                              <Calendar size={16} className="mr-2" />
                              {formatDateRange(exp.start_date, exp.end_date)}
                            </div>
                            <div className="flex items-center mb-1">
                              <MapPin size={16} className="mr-2" />
                              {exp.location}
                            </div>
                            <div className="font-medium text-purple-400">
                              {calculateDuration(exp.start_date, exp.end_date)}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 leading-relaxed mb-6">
                          {exp.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                What People Say
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Here's what my colleagues and clients have to say about working with me
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonLoader key={index} variant="card" />
                ))
              ) : (
                testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    {/* Content */}
                    <p className="text-gray-300 leading-relaxed mb-6">
                      "{testimonial.content}"
                    </p>
                    
                    {/* Author */}
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar_url}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="text-white font-semibold">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {testimonial.position} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Career Stats */}
          <motion.div
            className="mt-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Career Highlights</h3>
              <p className="text-gray-300">
                Key milestones and achievements throughout my career
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">6+</div>
                <div className="text-gray-300">Years of Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">4</div>
                <div className="text-gray-300">Companies Worked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
                <div className="text-gray-300">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">100K+</div>
                <div className="text-gray-300">Users Impacted</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Experience;