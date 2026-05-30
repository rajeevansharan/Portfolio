"use client";

import { useState, useEffect } from "react";
import { IconPlus, IconEdit, IconTrash, IconUpload } from "@tabler/icons-react";

interface Project {
  id: string | number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
  featured: boolean;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form state
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [form, setForm] = useState<Partial<Project>>({
    title: "", description: "", image: "", technologies: [], liveLink: "", githubLink: "", featured: false
  });
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/files?file=projects.json");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load projects", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formToSave = { 
        ...form, 
        technologies: techInput.split(",").map(t => t.trim()).filter(Boolean) 
      } as Project;

      let updatedProjects;
      if (editingId) {
        updatedProjects = projects.map(p => p.id === editingId ? { ...p, ...formToSave } : p);
      } else {
        const newProject = { ...formToSave, id: Date.now().toString() };
        updatedProjects = [...projects, newProject];
      }

      await fetch("/api/admin/files?file=projects.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProjects),
      });

      setProjects(updatedProjects);
      resetForm();
    } catch (error) {
      console.error("Failed to save project", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const updatedProjects = projects.filter(p => p.id !== id);
      await fetch("/api/admin/files?file=projects.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProjects),
      });
      setProjects(updatedProjects);
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ title: "", description: "", image: "", technologies: [], liveLink: "", githubLink: "", featured: false });
    setTechInput("");
  };

  const editProject = (project: Project) => {
    setEditingId(project.id);
    setForm(project);
    setTechInput(project.technologies?.join(", ") || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const fileInput = e.target;
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("type", "image");

    try {
      // In local dev, uploading might fail without actual server config, 
      // but this matches the API logic provided.
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) setForm(prev => ({ ...prev, image: data.url }));
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      fileInput.value = "";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Manage Projects
        </h1>
      </div>

      {/* Editor Form */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          {editingId ? <IconEdit size={20} className="text-cyan-400" /> : <IconPlus size={20} className="text-cyan-400" />}
          {editingId ? "Edit Project" : "Add New Project"}
        </h2>
        
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Title</label>
              <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 focus:border-cyan-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Technologies (comma separated)</label>
              <input type="text" value={techInput} onChange={e => setTechInput(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 focus:border-cyan-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Live Demo URL</label>
              <input type="url" value={form.liveLink || ""} onChange={e => setForm({...form, liveLink: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 focus:border-cyan-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">GitHub Repo URL</label>
              <input type="url" value={form.githubLink || ""} onChange={e => setForm({...form, githubLink: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 focus:border-cyan-500 transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Description</label>
            <textarea required rows={4} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 focus:border-cyan-500 transition-colors" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Image URL (or upload)</label>
              <div className="flex gap-2 text-zinc-400">
                <input type="text" value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 focus:border-cyan-500 transition-colors" />
                <label className="bg-zinc-800 border-zinc-700 p-2.5 rounded-lg border cursor-pointer hover:bg-zinc-700 transition">
                  <IconUpload size={20} />
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>
            </div>
            <div className="flex items-center gap-2 h-11">
              <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="w-4 h-4 rounded bg-zinc-950 border-zinc-800 text-cyan-500 focus:ring-cyan-500" />
              <label htmlFor="featured" className="text-sm font-medium text-zinc-400 cursor-pointer">Featured Project</label>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-zinc-800">
            <button type="submit" disabled={saving} className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2">
              {saving ? "Saving..." : "Save Project"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-zinc-800 bg-zinc-950/50">
          <h2 className="font-semibold text-lg">Existing Projects</h2>
        </div>
        {loading ? (
          <div className="p-8 text-center text-zinc-500">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="p-8 text-center text-zinc-500">No projects found.</div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {projects.map((project) => (
              <div key={project.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:bg-zinc-800/20 transition-colors">
                {project.image && (
                  <div className="w-full sm:w-24 h-16 rounded-md bg-zinc-800 bg-cover bg-center shrink-0 border border-zinc-700" style={{ backgroundImage: `url(${project.image})` }} />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-white truncate">{project.title}</h3>
                    {project.featured && <span className="bg-cyan-500/20 text-cyan-400 text-xs px-2 py-0.5 rounded-full font-medium">Featured</span>}
                  </div>
                  <p className="text-sm text-zinc-400 line-clamp-1 mb-2">{project.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {project.technologies?.map(t => (
                      <span key={t} className="bg-zinc-800 text-zinc-300 text-xs px-2 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                  <button onClick={() => editProject(project)} className="flex-1 sm:flex-none p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors center justify-center flex">
                    <IconEdit size={18} />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="flex-1 sm:flex-none p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors center justify-center flex">
                    <IconTrash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
