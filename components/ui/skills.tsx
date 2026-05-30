"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  IconCode,
  IconDevices,
  IconPalette,
  IconServer,
} from "@tabler/icons-react";

import { useState, useEffect } from "react";
import { skillsData as defaultSkills, skillsContent as defaultContent } from "@/data";

/**
 * Icon mapping for skill categories
 * Maps icon names to their respective Tabler Icons components
 */
const iconMap: {
  [key: string]: any;
} = {
  IconCode,
  IconDevices,
  IconPalette,
  IconServer,
};

/**
 * Skills Section Component
 * Displays a modern, responsive grid of skills grouped by categories
 * Features hover animations, accessibility tags, and professional styling
 */
export function Skills() {
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState(defaultSkills);
  const [content, setContent] = useState(defaultContent);

  return (
    <section
      id="skills"
      className="py-16 md:py-20 lg:py-24 px-4 sm:px-8 lg:px-16 bg-zinc-900/50 relative overflow-hidden"
      aria-labelledby="skills-heading"
    >
      {/* Background decorative elements for visual depth */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accentColors-primary/10 rounded-full filter blur-3xl opacity-50 animate-moveHorizontal will-change-transform" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accentColors-highlight/10 rounded-full filter blur-3xl opacity-40 animate-moveInCircle will-change-transform" />
        <div className="absolute top-2/3 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl opacity-30 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16 text-center"
        >
          <h2
            id="skills-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 relative inline-block"
          >
            {content.sectionTitle}
            {/* Animated underline */}
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accentColors-primary via-accentColors-highlight to-accentColors-secondary"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              aria-hidden="true"
            />
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-3xl mx-auto mt-6">
            {content.description}
          </p>
        </motion.div>

        {/* Skills Grid - Responsive layout with category grouping */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {skills.map((category, categoryIndex) => {
            // Get the icon component for this category
            const CategoryIcon = iconMap[category.icon] || IconCode;

            return (
              <motion.div
                key={category.id ? String(category.id) : category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-800/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-zinc-700/50 hover:border-accentColors-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-accentColors-primary/5 group"
                role="region"
                aria-label={`${category.category} skills`}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-accentColors-primary/30 to-accentColors-highlight/30 rounded-xl group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accentColors-primary/30 transition-all duration-300">
                    <CategoryIcon
                      size={28}
                      className="text-accentColors-primary drop-shadow-lg"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accentColors-primary group-hover:to-accentColors-highlight transition-all duration-300">
                    {category.category}
                  </h3>
                </div>

                {/* Skills Grid within each category */}
                <div
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4"
                  role="list"
                  aria-label={`${category.category} list`}
                >
                  {category.skills.map((skill, skillIndex) => {
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, y: -4 }}
                        style={
                          {
                            "--skill-color": skill.color || "#00d8ff",
                          } as React.CSSProperties
                        }
                        className="bg-zinc-900/60 p-4 rounded-xl border border-accentColors-primary/30 hover:border-[var(--skill-color)] hover:bg-zinc-800/80 transition-all duration-300 cursor-pointer shadow-sm shadow-accentColors-primary/10 hover:shadow-lg hover:shadow-[var(--skill-color)]/20 group/skill"
                        role="listitem"
                        tabIndex={0}
                        aria-label={`${skill.name} - Proficiency ${skill.level}%`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.currentTarget.click();
                          }
                        }}
                      >
                        <div className="flex flex-col items-center text-center gap-3">
                          {/* Skill Icon - Local SVG */}
                          <div className="p-3 bg-accentColors-primary/10 rounded-lg group-hover/skill:bg-[var(--skill-color)]/10 transition-colors duration-300">
                            {skill.svg ? (
                              <img
                                src={skill.svg}
                                alt={skill.name}
                                className="w-12 h-12 transition-all duration-300 grayscale brightness-150 contrast-125 group-hover/skill:grayscale-0 group-hover/skill:brightness-100 group-hover/skill:contrast-100 group-hover/skill:scale-110"
                                aria-hidden="true"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-zinc-600 to-zinc-700" />
                            )}
                          </div>

                          {/* Skill Name */}
                          <span className="text-sm font-semibold text-accentColors-accent group-hover/skill:text-white transition-colors duration-300">
                            {skill.name}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Information or CTA (Optional) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-zinc-400 text-sm md:text-base">
            {content.footer}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
