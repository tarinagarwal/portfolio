"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";
import { personalInfo, socialLinks } from "@/data/portfolio";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send contact form data
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#0d1425]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-2 glass text-emerald-400 rounded-full text-xs sm:text-sm font-semibold mb-4">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Have a project in mind? Let's discuss how we can work together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="glass glass-hover rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                Contact Information
              </h3>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold mb-1 text-sm sm:text-base">
                      Email
                    </h4>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-gray-400 hover:text-emerald-400 transition-colors text-sm sm:text-base break-all"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold mb-1 text-sm sm:text-base">
                      Phone
                    </h4>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="text-gray-400 hover:text-emerald-400 transition-colors text-sm sm:text-base"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold mb-1 text-sm sm:text-base">
                      Location
                    </h4>
                    <p className="text-gray-400 text-sm sm:text-base">
                      {personalInfo.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass glass-hover rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                Follow Me
              </h3>
              <div className="flex gap-3 sm:gap-4">
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 glass glass-hover rounded-xl flex items-center justify-center hover:bg-emerald-500/20 transition-colors group"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 glass glass-hover rounded-xl flex items-center justify-center hover:bg-emerald-500/20 transition-colors group"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 glass glass-hover rounded-xl flex items-center justify-center hover:bg-emerald-500/20 transition-colors group"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass glass-hover rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 sm:space-y-6"
            >
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-white text-sm sm:text-base"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-white text-sm sm:text-base"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-white text-sm sm:text-base"
                  placeholder="Project inquiry"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-2">
                  Message
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors resize-none text-white text-sm sm:text-base"
                  placeholder="Tell me about your project..."
                />
              </div>

              {success && (
                <div className="p-3 sm:p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-emerald-400 text-sm sm:text-base">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full font-bold text-base sm:text-lg shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
