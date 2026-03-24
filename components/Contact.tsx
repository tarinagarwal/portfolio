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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    <section id="contact" className="py-16 sm:py-24 bg-[#191919]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-2.5 clay-pill text-[#ffe0c2] text-xs sm:text-sm font-medium tracking-widest uppercase mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-base sm:text-xl text-[#b4b4b4] max-w-2xl mx-auto px-4 font-light">
            Have a project in mind? Let's discuss how we can work together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="clay clay-hover rounded-3xl p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 sm:mb-6">
                Contact Information
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#ffe0c2]/15 clay-icon flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffe0c2]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold mb-1 text-sm sm:text-base">
                      Email
                    </h4>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-[#b4b4b4] hover:text-[#ffe0c2] transition-colors text-sm sm:text-base break-all font-light"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#d4a87a]/15 clay-icon flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4a87a]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold mb-1 text-sm sm:text-base">
                      Phone
                    </h4>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="text-[#b4b4b4] hover:text-[#ffe0c2] transition-colors text-sm sm:text-base font-light"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#e8c4a0]/15 clay-icon flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#e8c4a0]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold mb-1 text-sm sm:text-base">
                      Location
                    </h4>
                    <p className="text-[#b4b4b4] text-sm sm:text-base font-light">
                      {personalInfo.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="clay clay-hover rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-3 sm:mb-4">
                Follow Me
              </h3>
              <div className="flex gap-3 sm:gap-4">
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 clay-dock-icon flex items-center justify-center group"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffe0c2] group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 clay-dock-icon flex items-center justify-center group"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffe0c2] group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 clay-dock-icon flex items-center justify-center group"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffe0c2] group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form
              onSubmit={handleSubmit}
              className="clay clay-hover rounded-3xl p-6 sm:p-8 space-y-4 sm:space-y-6"
            >
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-2 tracking-wide">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 clay-input text-white text-sm sm:text-base font-light"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-2 tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 clay-input text-white text-sm sm:text-base font-light"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-2 tracking-wide">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 clay-input text-white text-sm sm:text-base font-light"
                  placeholder="Project inquiry"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-2 tracking-wide">
                  Message
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 clay-input resize-none text-white text-sm sm:text-base font-light"
                  placeholder="Tell me about your project..."
                />
              </div>
              {success && (
                <div className="p-3 sm:p-4 clay-accent text-[#ffe0c2] text-sm sm:text-base font-medium">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#ffe0c2] to-[#d4a87a] text-[#111111] clay-btn font-bold text-base sm:text-lg tracking-tight disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4 sm:w-5 sm:h-5" />
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
