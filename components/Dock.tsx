"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Instagram, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { socialLinks } from "@/data/portfolio";

const DockIcon = ({
  children,
  href,
  label,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  label: string;
  onClick?: () => void;
}) => {
  const content = (
    <motion.div
      whileHover={{ scale: 1.2, y: -8 }}
      whileTap={{ scale: 0.95 }}
      className="relative group"
    >
      <div
        className="flex items-center justify-center w-12 h-12 rounded-full glass glass-hover cursor-pointer"
        aria-label={label}
        onClick={onClick}
      >
        {children}
      </div>
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {label}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </Link>
    );
  }

  return content;
};

export default function Dock() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-md"
    >
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 glass rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-2xl">
        <DockIcon href={socialLinks.github} label="GitHub">
          <Github className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
        </DockIcon>
        <DockIcon href={socialLinks.linkedin} label="LinkedIn">
          <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
        </DockIcon>
        <DockIcon href={socialLinks.instagram} label="Instagram">
          <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
        </DockIcon>
        <div className="w-px h-6 sm:h-8 bg-white/20 mx-0.5 sm:mx-1" />
        <DockIcon label="Scroll to Top" onClick={scrollToTop}>
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
        </DockIcon>
      </div>
    </motion.div>
  );
}
