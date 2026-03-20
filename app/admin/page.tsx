"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IconBriefcase, IconBooks, IconCode, IconUser } from "@tabler/icons-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    experience: 0,
    education: 0,
    skills: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projRes, expRes, eduRes, skillRes] = await Promise.all([
          fetch("/api/admin/files?file=projects.json"),
          fetch("/api/admin/files?file=experience.json"),
          fetch("/api/admin/files?file=education.json"),
          fetch("/api/admin/files?file=skills.json"),
        ]);

        const [projects, experience, education, skills] = await Promise.all([
          projRes.json(),
          expRes.json(),
          eduRes.json(),
          skillRes.json(),
        ]);

        let skillCount = 0;
        if (Array.isArray(skills)) {
             skills.forEach(cat => skillCount += (cat.skills || []).length);
        }

        setStats({
          projects: projects.length || 0,
          experience: experience.length || 0,
          education: education.length || 0,
          skills: skillCount,
        });
      } catch (error) {
        console.error("Failed to load stats", error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: "Projects", value: stats.projects, icon: IconBriefcase, href: "/admin/projects", color: "text-blue-400" },
    { title: "Experience", value: stats.experience, icon: IconBriefcase, href: "/admin/experience", color: "text-purple-400" },
    { title: "Education", value: stats.education, icon: IconBooks, href: "/admin/education", color: "text-green-400" },
    { title: "Skills", value: stats.skills, icon: IconCode, href: "/admin/skills", color: "text-orange-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1">
            Welcome to Portfolio Admin
          </h1>
          <p className="text-zinc-400 text-sm">
            Manage your content, upload projects, and update your details.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            href={stat.href}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-cyan-500/50 hover:bg-zinc-800/50 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg bg-zinc-950 border border-zinc-800 group-hover:bg-zinc-900 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-zinc-400 font-medium">{stat.title}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mt-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <IconUser className="text-cyan-400" /> Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/admin/about" className="flex items-center gap-3 p-4 bg-zinc-950 border border-zinc-800 rounded-lg hover:border-cyan-500/50 transition-colors">
            <div className="bg-cyan-500/10 text-cyan-400 p-2 rounded">
              <IconUser size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-white">Update Profile</h4>
              <p className="text-sm text-zinc-400">Edit about section and CV</p>
            </div>
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 p-4 bg-zinc-950 border border-zinc-800 rounded-lg hover:border-cyan-500/50 transition-colors">
            <div className="bg-blue-500/10 text-blue-400 p-2 rounded">
              <IconBriefcase size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-white">Add Project</h4>
              <p className="text-sm text-zinc-400">Showcase your new work</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
