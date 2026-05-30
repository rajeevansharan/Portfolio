"use client";

import { useState, useEffect } from "react";
import { IconPlus, IconEdit, IconTrash } from "@tabler/icons-react";

interface Experience {
  id: string | number;
  title: string;
  company: string;
  duration: string;
  description: string[];
}

export default function AdminExperience() {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [form, setForm] = useState<Partial<Experience>>({
    title: "", company: "", duration: "", description: []
  });
  const [descText, setDescText] = useState("");

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/files?file=experience.json");
      const data = await res.json();
      setExperience(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load experience", error);
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
        description: descText.split("\n").map(d => d.trim()).filter(Boolean) 
      } as Experience;

      let updatedExperience;
      if (editingId) {
        updatedExperience = experience.map(p => p.id === editingId ? { ...p, ...formToSave } : p);
      } else {
        const newExperience = { ...formToSave, id: Date.now().toString() };
        updatedExperience = [...experience, newExperience];
      }

      await fetch("/api/admin/files?file=experience.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedExperience),
      });

      setExperience(updatedExperience);
      resetForm();
    } catch (error) {
      console.error("Failed to save experience", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    try {
      const updatedExperience = experience.filter(p => p.id !== id);
      await fetch("/api/admin/files?file=experience.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedExperience),
      });
      setExperience(updatedExperience);
    } catch (error) {
      console.error("Failed to delete experience", error);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ title: "", company: "", duration: "", description: [] });
    setDescText("");
  };

  const editExperience = (exp: Experience) => {
    setEditingId(exp.id);
    setForm(exp);
    setDescText(Array.isArray(exp.description) ? exp.description.join("\n") : String(exp.description || ""));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Manage Experience
        </h1>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          {editingId ? <IconEdit size={20} className="text-purple-400" /> : <IconPlus size={20} className="text-purple-400" />}
          {editingId ? "Edit Experience" : "Add New Experience"}
        </h2>
        
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Job Title</label>
              <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 focus:border-purple-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Company</label>
              <input type="text" required value={form.company || ""} onChange={e => setForm({...form, company: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 focus:border-purple-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Duration (e.g., 2024 - Present)</label>
              <input type="text" required value={form.duration || ""} onChange={e => setForm({...form, duration: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 focus:border-purple-500 transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Responsibilities (One per line)</label>
            <textarea required rows={4} value={descText} onChange={e => setDescText(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 focus:border-purple-500 transition-colors" placeholder="Built responsive UI...&#10;Integrated REST APIs..." />
          </div>

          <div className="flex gap-3 pt-4 border-t border-zinc-800">
            <button type="submit" disabled={saving} className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2">
              {saving ? "Saving..." : "Save Experience"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-zinc-800 bg-zinc-950/50">
          <h2 className="font-semibold text-lg">Work Experience</h2>
        </div>
        {loading ? (
          <div className="p-8 text-center text-zinc-500">Loading experience...</div>
        ) : experience.length === 0 ? (
          <div className="p-8 text-center text-zinc-500">No experience found.</div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {experience.map((exp) => (
              <div key={exp.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:bg-zinc-800/20 transition-colors">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white truncate">{exp.title}</h3>
                  <div className="flex gap-2 text-sm text-zinc-400 mb-2">
                    <span className="text-purple-400">{exp.company}</span>
                    <span>•</span>
                    <span>{exp.duration}</span>
                  </div>
                  <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
                    {Array.isArray(exp.description) ? exp.description.map((desc, i) => (
                      <li key={i} className="line-clamp-1">{desc}</li>
                    )) : <li className="line-clamp-1">{exp.description}</li>}
                  </ul>
                </div>
                <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                  <button onClick={() => editExperience(exp)} className="flex-1 sm:flex-none p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors center item-center justify-center flex">
                    <IconEdit size={18} />
                  </button>
                  <button onClick={() => handleDelete(exp.id)} className="flex-1 sm:flex-none p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors center justify-center flex">
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
