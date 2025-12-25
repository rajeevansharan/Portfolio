"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconCalendar, IconBooks } from "@tabler/icons-react";

import { educationData, aboutContent } from "@/data";

export function About() {
  return (
    <section
      id="about"
      className="py-16 md:py-20 lg:py-24 px-4 sm:px-8 lg:px-16 bg-zinc-900/30 relative overflow-hidden"
    >
      {/* Background design elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-accentColors-primary/10 rounded-full filter blur-3xl opacity-30 animate-moveHorizontal will-change-transform" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accentColors-secondary/10 rounded-full filter blur-3xl opacity-20 animate-moveInCircle will-change-transform" />
      </div>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 relative inline-block">
            {aboutContent.sectionTitle}
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accentColors-primary to-accentColors-highlight"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            {aboutContent.description}
          </p>
        </motion.div>

        {/* Education Timeline - Centered single column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 flex items-center justify-center gap-2">
                <IconBooks size={22} className="text-accentColors-highlight" />
                {aboutContent.educationTitle}
              </h3>
              {educationData.map((edu, index) => (
                <div
                  key={index}
                  className="relative pl-10 border-l border-zinc-700"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-accentColors-accent to-accentColors-highlight shadow-sm shadow-accentColors-accent/50"
                  ></motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 * index }}
                    className="bg-zinc-800/50 p-6 rounded-lg border border-zinc-700/50 hover:border-accentColors-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accentColors-accent/5"
                  >
                    <h4 className="text-base sm:text-lg font-semibold text-white">
                      {edu.title}
                    </h4>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-accentColors-secondary">
                        {edu.institution}
                      </span>
                      <span className="text-zinc-500 text-sm flex items-center gap-1">
                        <IconCalendar size={14} />
                        {edu.duration}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-xs sm:text-sm">
                      {edu.description}
                    </p>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
