"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { footerContent, socialLinks, websiteInfo } from "@/data";
import { 
  IconBrandGithub, 
  IconBrandLinkedin, 
  IconBrandTwitter,
  IconChevronRight
} from "@tabler/icons-react";

// Map string icon names to actual icon components
const getIconComponent = (iconName: string, size = 20) => {
  switch (iconName) {
    case 'IconBrandGithub': return <IconBrandGithub size={size} />;
    case 'IconBrandLinkedin': return <IconBrandLinkedin size={size} />;
    case 'IconBrandTwitter': return <IconBrandTwitter size={size} />;
    default: return null;
  }
};

export function Footer() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
      }
    }
  };

  return (
    <footer className="bg-zinc-900 border-t border-zinc-800/50 mt-20">
      
      
      {/* Bottom footer with legal links and copyright */}
      <div className="border-t border-zinc-800/50 py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-zinc-400 text-sm mb-4 md:mb-0">
            {footerContent.copyright}
          </div>
          
          <motion.div 
            className="flex flex-wrap gap-6 justify-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {footerContent.legalLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-zinc-500 hover:text-accentColors-primary text-sm transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
