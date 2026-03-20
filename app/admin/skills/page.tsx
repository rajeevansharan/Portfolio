"use client";

import { useState, useEffect } from "react";
import { IconPlus, IconEdit, IconTrash } from "@tabler/icons-react";

interface SkillItem {
  name: string;
  level: number;
  svg: string;
  color: string;
}

interface SkillCategory {
  id: string | number;
  category: string;
  icon: string;
  skills: SkillItem[];
}

export default function AdminSkills() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [form, setForm] = useState<Partial<SkillCategory>>({
    category: "", icon: "IconCode"
  });
  const [skillsJson, setSkillsJson] = useState("[]");
  const [jsonError, setJsonError] = useState("");

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/files?file=skills.json");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load skills", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setJsonError("");
    setSaving(true);
    
    try {
      // Validate JSON
      const parsedSkills = JSON.parse(skillsJson);
      if (!Array.isArray(parsedSkills)) {
        throw new Error("Skills must be an array of objects.");
      }

      const formToSave = { 
        ...form, 
        skills: parsedSkills 
      } as SkillCategory;

      let updatedCategories;
      if (editingId) {
        updatedCategories = categories.map(p => p.id === editingId ? { ...p, ...formToSave } : p);
      } else {
        const newCategory = { ...formToSave, id: Date.now().toString() };
        updatedCategories = [...categories, newCategory];
      }

      await fetch("/api/admin/files?file=skills.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCategories),
      });

      setCategories(updatedCategories);
      resetForm();
    } catch (error: any) {
      setJsonError(error.message || "Invalid JSON format");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this skill category?")) return;
    try {
      const updatedCategories = categories.filter(p => p.id !== id);
      await fetch("/api/admin/files?file=skills.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCategories),
      });
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ category: "", icon: "IconCode" });
    setSkillsJson("[\n  {\n    \"name\": \"React\",\n    \"level\": 90,\n    \"svg\": \"/skills/react.svg\",\n    \"color\": \"#61DAFB\"\n  }\n]");
    setJsonError("");
  };

  const editCategory = (cat: SkillCategory) => {
    setEditingId(cat.id);
    setForm(cat);
    setSkillsJson(JSON.stringify(cat.skills || [], null, 2));
    setJsonError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Manage Skills
        </h1>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          {editingId ? <IconEdit size={20} className="text-yellow-400" /> : <IconPlus size={20} className="text-yellow-400" />}
          {editingId ? "Edit Category" : "Add Category"}
        </h2>
        
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Category Name</label>
              <input type="text" required value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 focus:border-yellow-500 transition-colors" placeholder="e.g. Frontend Development" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Tabler Icon Name</label>
              <input type="text" required value={form.icon || ""} onChange={e => setForm({...form, icon: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 focus:border-yellow-500 transition-colors" placeholder="e.g. IconCode" />
            </div>
          </div>

          <div>
            <div className="flex justify-between">
               <label className="block text-sm font-medium text-zinc-400 mb-1">Skills Items (JSON Array)</label>
               {jsonError && <span className="text-red-400 text-sm font-medium">{jsonError}</span>}
            </div>
            <textarea rows={8} value={skillsJson} onChange={e => setSkillsJson(e.target.value)} className={`w-full bg-zinc-950 font-mono text-xs border rounded-lg p-3 transition-colors ${jsonError ? 'border-red-500 focus:border-red-500' : 'border-zinc-800 focus:border-yellow-500'}`} />
            <p className="text-xs text-zinc-500 mt-1">Provide a valid JSON array of objects with `name`, `level`, `svg`, and `color` properties.</p>
          </div>

          <div className="flex gap-3 pt-4 border-t border-zinc-800">
            <button type="submit" disabled={saving} className="bg-yellow-600 hover:bg-yellow-500 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2">
              {saving ? "Saving..." : "Save Category"}
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
          <h2 className="font-semibold text-lg">Categories Overview</h2>
        </div>
        {loading ? (
          <div className="p-8 text-center text-zinc-500">Loading skills...</div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center text-zinc-500">No categories found.</div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {categories.map((cat) => (
              <div key={cat.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:bg-zinc-800/20 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                     <span className="text-yellow-400 font-mono text-xs px-2 py-0.5 bg-yellow-500/10 rounded">{cat.icon}</span>
                     <h3 className="font-bold text-white truncate">{cat.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills?.map((skill, i) => (
                       <span key={i} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded-md border border-zinc-700 flex items-center gap-1">
                          {skill.name} <span className="text-zinc-500">({skill.level}%)</span>
                       </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                  <button onClick={() => editCategory(cat)} className="flex-1 sm:flex-none p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors center justify-center flex">
                    <IconEdit size={18} />
                  </button>
                  <button onClick={() => handleDelete(cat.id)} className="flex-1 sm:flex-none p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors center justify-center flex">
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
