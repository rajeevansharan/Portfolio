"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  IconBrandReact,
  IconBrandNextjs,
  IconBrandTypescript,
  IconBrandJavascript,
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandTailwind,
  IconBrandNodejs,
  IconBrandPython,
  IconBrandGit,
  IconBrandGithub,
  IconBrandDocker,
  IconBrandFigma,
  IconDatabase,
  IconCode,
  IconDevices,
  IconPalette,
  IconServer,
  IconBrandMysql,
  IconBrandPostgresql,
  IconBrandBootstrap,
  IconBrandJava,
  IconApi,
} from "@tabler/icons-react";

import { skillsData, skillsContent } from "@/data";

/**
 * Icon mapping for skill categories
 * Maps icon names to their respective Tabler Icons components
 */
const iconMap: {
  [key: string]: React.ComponentType<{ size?: number; className?: string }>;
} = {
  IconCode,
  IconDevices,
  IconPalette,
  IconServer,
};

/**
 * Icon mapping for individual skills
 * Maps technology names to their respective brand/technology icons
 */
const skillIconMap: {
  [key: string]: React.ComponentType<{ size?: number; className?: string }>;
} = {
  React: IconBrandReact,
  "Next.js": IconBrandNextjs,
  TypeScript: IconBrandTypescript,
  JavaScript: IconBrandJavascript,
  HTML: IconBrandHtml5,
  CSS: IconBrandCss3,
  "Tailwind CSS": IconBrandTailwind,
  "Node.js": IconBrandNodejs,
  Python: IconBrandPython,
  Java: IconBrandJava,
  Git: IconBrandGit,
  GitHub: IconBrandGithub,
  Docker: IconBrandDocker,
  Figma: IconBrandFigma,
  MySQL: IconBrandMysql,
  PostgreSQL: IconBrandPostgresql,
  MongoDB: IconDatabase,
  "REST API": IconApi,
  Bootstrap: IconBrandBootstrap,
};

/**
 * Skills Section Component
 * Displays a modern, responsive grid of skills grouped by categories
 * Features hover animations, accessibility tags, and professional styling
 */
export function Skills() {
  return (
    <section
      id="skills"
      className="py-16 md:py-20 lg:py-24 px-4 sm:px-8 lg:px-16 bg-zinc-900/50 relative overflow-hidden"
      aria-labelledby="skills-heading"
    >
      {/* Background decorative elements for visual depth */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accentColors-primary/5 rounded-full filter blur-3xl opacity-40 animate-moveHorizontal will-change-transform" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accentColors-highlight/5 rounded-full filter blur-3xl opacity-30 animate-moveInCircle will-change-transform" />
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
            {skillsContent.sectionTitle}
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
            {skillsContent.description}
          </p>
        </motion.div>

        {/* Skills Grid - Responsive layout with category grouping */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {skillsData.map((category, categoryIndex) => {
            // Get the icon component for this category
            const CategoryIcon = iconMap[category.icon] || IconCode;

            return (
              <motion.div
                key={category.category}
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
                  <div className="p-3 bg-gradient-to-br from-accentColors-primary/20 to-accentColors-highlight/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <CategoryIcon
                      size={28}
                      className="text-accentColors-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
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
                    // Get the icon component for this skill
                    const SkillIcon = skillIconMap[skill.name] || IconCode;

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
                        className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-700/50 hover:border-accentColors-primary/50 hover:bg-zinc-800/80 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-accentColors-primary/10 group/skill"
                        role="listitem"
                        tabIndex={0}
                        aria-label={`${skill.name} - Proficiency ${skill.level}%`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.currentTarget.click();
                          }
                        }}
                      >
                        <div className="flex flex-col items-center text-center gap-2">
                          {/* Skill Icon */}
                          <div className="p-2.5 bg-zinc-800/80 rounded-lg group-hover/skill:bg-accentColors-primary/10 transition-colors duration-300">
                            <SkillIcon
                              size={32}
                              className="text-zinc-400 group-hover/skill:text-accentColors-primary transition-colors duration-300"
                              aria-hidden="true"
                            />
                          </div>

                          {/* Skill Name */}
                          <span className="text-sm font-semibold text-zinc-300 group-hover/skill:text-white transition-colors duration-300">
                            {skill.name}
                          </span>

                          {/* Proficiency Bar */}
                          <div className="w-full mt-1">
                            <div
                              className="h-1.5 bg-zinc-700/50 rounded-full overflow-hidden"
                              role="progressbar"
                              aria-valuenow={skill.level}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-label={`${skill.name} proficiency`}
                            >
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{
                                  duration: 1,
                                  delay: 0.5 + skillIndex * 0.1,
                                }}
                                viewport={{ once: true }}
                                className="h-full bg-gradient-to-r from-accentColors-primary to-accentColors-highlight rounded-full"
                              />
                            </div>
                            {/* Proficiency Percentage */}
                            <span
                              className="text-xs text-zinc-500 mt-1 block group-hover/skill:text-accentColors-primary/80 transition-colors duration-300"
                              aria-hidden="true"
                            >
                              {skill.level}%
                            </span>
                          </div>
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
            {skillsContent.footer}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
