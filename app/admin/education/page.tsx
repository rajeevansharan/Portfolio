"use client";

import { useState, useEffect } from "react";
import { IconPlus, IconEdit, IconTrash } from "@tabler/icons-react";

interface Education {
  id: string | number;
  title: string;
  institution: string;
  duration: string;
  description: string;
}

export default function AdminEducation() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [form, setForm] = useState<Partial<Education>>({
    title: "", institution: "", duration: "", description: ""
  });

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/files?file=education.json");
      const data = await res.json();
      setEducation(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load education", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let updatedEducation;
      if (editingId) {
        updatedEducation = education.map(p => p.id === editingId ? { ...p, ...form } as Education : p);
      } else {
        const newEducation = { ...form, id: Date.now().toString() } as Education;
        updatedEducation = [...education, newEducation];
      }

      await fetch("/api/admin/files?file=education.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEducation),
      });

      setEducation(updatedEducation);
      resetForm();
    } catch (error) {
      console.error("Failed to save education", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this education entry?")) return;
    try {
      const updatedEducation = education.filter(p => p.id !== id);
      await fetch("/api/admin/files?file=education.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEducation),
      });
      setEducation(updatedEducation);
    } catch (error) {
      console.error("Failed to delete education", error);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ title: "", institution: "", duration: "", description: "" });
  };

  const editEducation = (edu: Education) => {
    setEditingId(edu.id);
    setForm(edu);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Manage Education
        </h1>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          {editingId ? <IconEdit size={20} className="text-green-400" /> : <IconPlus size={20} className="text-green-400" />}
          {editingId ? "Edit Education" : "Add Education"}
        </h2>
        
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Degree / Course Title</label>
              <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 focus:border-green-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Institution</label>
              <input type="text" required value={form.institution || ""} onChange={e => setForm({...form, institution: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 focus:border-green-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Duration (e.g., 2023 - 2027)</label>
              <input type="text" required value={form.duration || ""} onChange={e => setForm({...form, duration: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 focus:border-green-500 transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Description (Optional)</label>
            <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 focus:border-green-500 transition-colors" />
          </div>

          <div className="flex gap-3 pt-4 border-t border-zinc-800">
            <button type="submit" disabled={saving} className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2">
              {saving ? "Saving..." : "Save Education"}
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
          <h2 className="font-semibold text-lg">Education History</h2>
        </div>
        {loading ? (
          <div className="p-8 text-center text-zinc-500">Loading education...</div>
        ) : education.length === 0 ? (
          <div className="p-8 text-center text-zinc-500">No education found.</div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {education.map((edu) => (
              <div key={edu.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:bg-zinc-800/20 transition-colors">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white truncate">{edu.title}</h3>
                  <div className="flex gap-2 text-sm text-zinc-400 mb-1">
                    <span className="text-green-400">{edu.institution}</span>
                    <span>•</span>
                    <span>{edu.duration}</span>
                  </div>
                  {edu.description && (
                    <p className="text-sm text-zinc-400 line-clamp-2">{edu.description}</p>
                  )}
                </div>
                <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                  <button onClick={() => editEducation(edu)} className="flex-1 sm:flex-none p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors center justify-center flex">
                    <IconEdit size={18} />
                  </button>
                  <button onClick={() => handleDelete(edu.id)} className="flex-1 sm:flex-none p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors center justify-center flex">
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
