"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconCalendar, IconBooks, IconBriefcase } from "@tabler/icons-react";

import { useState, useEffect } from "react";
import { educationData as defaultEdu, experienceData as defaultExp, aboutContent as defaultAbout } from "@/data";

export function About() {
  const [loading, setLoading] = useState(true);
  const [about, setAbout] = useState(defaultAbout);
  const [education, setEducation] = useState(defaultEdu);
  const [experience, setExperience] = useState(defaultExp);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, eduRes, expRes] = await Promise.all([
          fetch("/api/admin/files?file=about.json", { cache: 'no-store' }),
          fetch("/api/admin/files?file=education.json", { cache: 'no-store' }),
          fetch("/api/admin/files?file=experience.json", { cache: 'no-store' })
        ]);

        const [aboutData, eduData, expData] = await Promise.all([
          aboutRes.json(),
          eduRes.json(),
          expRes.json()
        ]);

        if (aboutData && !aboutData.error) setAbout(aboutData);
        if (Array.isArray(eduData)) setEducation(eduData);
        if (Array.isArray(expData)) setExperience(expData);
      } catch (error) {
        console.error("Failed to fetch about data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
            {about.sectionTitle}
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accentColors-primary to-accentColors-highlight"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            {about.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Education Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="space-y-8">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 flex items-center gap-2">
                <IconBooks size={22} className="text-accentColors-highlight" />
                {about.educationTitle}
              </h3>
              {education.map((edu, index) => (
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
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1 sm:gap-0">
                      <span className="text-accentColors-secondary text-sm sm:text-base">
                        {edu.institution}
                      </span>
                      <span className="text-zinc-500 text-sm flex items-center gap-1">
                        <IconCalendar size={14} />
                        {edu.duration}
                      </span>
                    </div>
                    {edu.description && (
                      <p className="text-zinc-400 text-xs sm:text-sm">
                        {edu.description}
                      </p>
                    )}
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="space-y-8">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 flex items-center gap-2">
                <IconBriefcase size={22} className="text-accentColors-highlight" />
                {about.experienceTitle}
              </h3>
              {experience.map((exp, index) => (
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
                      {exp.title}
                    </h4>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1 sm:gap-0">
                      <span className="text-accentColors-secondary text-sm sm:text-base">
                        {exp.company}
                      </span>
                      <span className="text-zinc-500 text-sm flex items-center gap-1">
                        <IconCalendar size={14} />
                        {exp.duration}
                      </span>
                    </div>
                    <div className="text-zinc-400 text-xs sm:text-sm">
                      {Array.isArray(exp.description) ? (
                        <ul className="list-disc list-inside space-y-1">
                          {exp.description.map((desc, i) => (
                            <li key={i}>{desc}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{exp.description}</p>
                      )}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* CV Download / Contact button integration from about.json */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
           {about.cvPath && (
              <a 
                href={about.cvPath} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-accentColors-primary to-accentColors-secondary text-white font-bold rounded-lg hover:scale-105 transition-transform"
              >
                {about.resumeButtonText || "Download CV"}
              </a>
           )}
           <a 
             href="#contact" 
             className="px-8 py-3 border border-zinc-700 text-white font-bold rounded-lg hover:bg-zinc-800 transition-colors"
           >
             {about.contactButtonText || "Contact Me"}
           </a>
        </div>
      </div>
    </section>
  );
}
