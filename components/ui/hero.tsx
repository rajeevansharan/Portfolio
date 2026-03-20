"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { IconArrowDown, IconDownload } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "framer-motion";
import { heroContent as defaultHero, aboutContent } from "@/data";

export function Hero() {
  const controls = useAnimation();
  const [hero, setHero] = useState(defaultHero);
  const [cvPath, setCvPath] = useState("/cv.pdf");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [heroRes, aboutRes] = await Promise.all([
          fetch("/api/admin/files?file=hero.json", { cache: "no-store" }),
          fetch("/api/admin/files?file=about.json", { cache: "no-store" }),
        ]);

        const heroData = await heroRes.json();
        const aboutData = await aboutRes.json();

        if (heroData && !heroData.error) setHero(heroData);
        if (aboutData && aboutData.cvPath) setCvPath(aboutData.cvPath);
      } catch (error) {
        console.error("Failed to fetch hero data", error);
      }
    };

    fetchData();
    controls.start({
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    });
  }, [controls]);
  return (
    <section
      id="home"
      className="relative min-h-[600px] h-screen flex items-center px-4 sm:px-8 lg:px-16"
    >
      {/* Background elements - Enhanced with dark + cyan theme and optimized for performance */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 md:w-80 md:h-80 bg-accentColors-primary/20 rounded-full filter blur-3xl opacity-60 animate-moveInCircle will-change-transform" />
        <div className="absolute top-1/4 right-1/3 w-96 h-96 md:w-[32rem] md:h-[32rem] bg-accentColors-secondary/15 rounded-full filter blur-3xl opacity-40 animate-moveHorizontal will-change-transform" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 md:w-[28rem] md:h-[28rem] bg-accentColors-highlight/20 rounded-full filter blur-3xl opacity-50 animate-fifth will-change-transform" />
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 md:w-[24rem] md:h-[24rem] bg-accentColors-accent/10 rounded-full filter blur-3xl opacity-30 animate-moveVertical will-change-transform" />
      </div>

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-2 md:gap-4 items-center">
        <div className="lg:col-span-7 lg:pr-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <p className="text-accentColors-accent mb-4 font-medium tracking-wide inline-block relative">
              <span className="relative z-10">{hero.subtitle}</span>
              <motion.span
                className="absolute bottom-0 left-0 h-[6px] bg-accentColors-primary/20 rounded-sm z-0"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.6, duration: 0.5 }}
              />
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.1 },
              },
            }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6"
          >
            {hero.title.firstName}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accentColors-primary via-accentColors-accent to-accentColors-highlight animate-text-gradient relative inline-block">
              {hero.title.lastName}
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-accentColors-primary via-accentColors-accent to-accentColors-highlight"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-3xl mb-6 md:mb-8"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3 sm:gap-4"
          >
            <Link
              href="#contact"
              className="border border-accentColors-primary/30 hover:border-accentColors-primary/80 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-accentColors-primary/10 shadow-lg shadow-accentColors-primary/5 hover:shadow-accentColors-primary/20"
            >
              {hero.contactText}
            </Link>

            <a
              href={cvPath}
              download="Rajeevan_Sharan_CV.pdf"
              className="border border-accentColors-primary/30 hover:border-accentColors-primary/80 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-accentColors-primary/10 shadow-lg shadow-accentColors-primary/5 flex items-center gap-2 hover:shadow-accentColors-primary/20"
            >
              Download CV
              <IconDownload className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        {/* Hero Image - Centered with glowing effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 sm:mt-8 lg:mt-0 flex justify-center lg:col-span-5 relative"
        >
          {/* Enhanced glowing background for dark + cyan theme */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full bg-gradient-to-r from-accentColors-primary/40 to-accentColors-accent/20 blur-2xl z-0"
            animate={{
              boxShadow: [
                "0 0 20px 5px rgba(0, 216, 255, 0.3)",
                "0 0 30px 8px rgba(0, 216, 255, 0.2)",
                "0 0 20px 5px rgba(0, 216, 255, 0.3)",
              ],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          ></motion.div>

          <div className="relative h-[400px] w-[300px] md:h-[450px] md:w-[350px] rounded-2xl overflow-hidden z-10">
            <Image
              src={hero.imagePath || "/hero image.webp"}
              alt="Developer Portrait"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 768px) 300px, 350px"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-zinc-500 text-sm mb-2">{hero.scrollText}</span>
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
        >
          <IconArrowDown className="h-5 w-5 text-zinc-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
