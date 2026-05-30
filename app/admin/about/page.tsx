"use client";

import { useState, useEffect } from "react";
import { IconDeviceFloppy, IconUpload } from "@tabler/icons-react";

interface AboutData {
  sectionTitle: string;
  subtitle: string;
  description: string;
  skillsTitle: string;
  experienceTitle: string;
  educationTitle: string;
  resumeButtonText: string;
  contactButtonText: string;
  cvPath: string;
}

export default function AdminAbout() {
  const [form, setForm] = useState<Partial<AboutData>>({
    cvPath: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/files?file=about.json");
      const data = await res.json();
      if (data && Object.keys(data).length > 0) {
        setForm(data);
      }
    } catch (error) {
      console.error("Failed to load about data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await fetch("/api/admin/files?file=about.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setMessage("About section successfully updated!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to save changes.");
      console.error("Failed to save about", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("type", "cv"); // specifies CV folder layout

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) setForm({ ...form, cvPath: data.url });
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  if (loading) return <div className="p-8 text-center text-zinc-500">Loading About configuration...</div>;

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          CV Configuration
        </h1>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
        <form onSubmit={handleSave} className="space-y-6">
          {message && (
             <div className="bg-green-500/10 text-green-500 border border-green-500/50 p-3 rounded-lg text-sm font-medium">
               {message}
             </div>
          )}

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl space-y-4">
             <h3 className="text-lg font-semibold text-white mb-4">Resume / CV File</h3>
             <div className="flex gap-2 text-zinc-400">
                <input type="text" placeholder="/uploads/cv/file.pdf" value={form.cvPath || ""} onChange={e => setForm({...form, cvPath: e.target.value})} className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 focus:border-orange-500 transition-colors" />
                <label className="bg-zinc-800 border-zinc-700 p-2.5 rounded-lg border cursor-pointer hover:bg-zinc-700 transition flex items-center gap-2">
                  <IconUpload size={20} />
                  <span className="text-sm">Upload PDF</span>
                  <input type="file" accept="application/pdf" className="hidden" onChange={handleCVUpload} />
                </label>
              </div>
          </div>

          <div className="pt-4 border-t border-zinc-800">
            <button type="submit" disabled={saving} className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2">
              <IconDeviceFloppy size={20} />
              {saving ? "Saving Changes..." : "Save About Data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
