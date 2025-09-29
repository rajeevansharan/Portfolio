"use client";

// Import the new zinc-themed UI components
import { Sidebar } from "@/components/ui/sidebar";
import { Hero } from "@/components/ui/hero";
import { Projects } from "@/components/ui/projects";
import { About } from "@/components/ui/about";
import { Contact } from "@/components/ui/contact";
import { Footer } from "@/components/ui/footer";
const Home = () => {
  return (
    <main className="relative bg-zinc dark:bg-zinc-900 text-black dark:text-white min-h-screen w-full overflow-x-hidden">
      <Sidebar />
    
      <div className="lg:ml-20"> 
    
        <Hero />
        <Projects />
        <About />
        <Contact />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
