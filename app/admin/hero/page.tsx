"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { IconUpload, IconDeviceFloppy, IconLoader2 } from "@tabler/icons-react";

export default function AdminHeroPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hero, setHero] = useState({
    subtitle: "",
    title: { firstName: "", lastName: "" },
    description: "",
    ctaText: "",
    contactText: "",
    scrollText: "",
    imagePath: "",
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const res = await fetch("/api/admin/files?file=hero.json");
      const data = await res.json();
      if (data && !data.error) {
        setHero(data);
      }
    } catch (error) {
      console.error("Failed to fetch hero:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/admin/files?file=hero.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hero),
      });

      if (res.ok) {
        setMessage({
          type: "success",
          text: "Hero section updated successfully!",
        });
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update hero section." });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "image");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setHero({ ...hero, imagePath: data.url });
        setMessage({
          type: "success",
          text: "Image uploaded! Remember to save changes.",
        });
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error: any) {
      console.error("Upload failed:", error);
      setMessage({ type: "error", text: `Upload failed: ${error.message}` });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <IconLoader2 className="animate-spin text-cyan-500" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Hero Section</h1>
          <p className="text-zinc-400">
            Manage the main landing section of your portfolio.
          </p>
        </div>
      </div>

      {message.text && (
        <div
          className={`p-4 rounded-lg mb-6 ${
            message.type === "success"
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">
              Text Content
            </h2>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">
                Description
              </label>
              <textarea
                value={hero.description}
                onChange={(e) =>
                  setHero({ ...hero, description: e.target.value })
                }
                rows={12}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
              />
            </div>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">
              Hero Image
            </h2>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Hero Image
              </label>
              <div className="flex items-center gap-4">
                <div className="relative w-32 h-32 bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700">
                  {hero.imagePath ? (
                    <Image
                      src={hero.imagePath}
                      alt="Hero"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600">
                      No Image
                    </div>
                  )}
                  {uploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <IconLoader2 className="animate-spin text-white" />
                    </div>
                  )}
                </div>
                <label className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg cursor-pointer transition-colors">
                  <IconUpload size={18} />
                  <span>Upload</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-white font-bold rounded-lg transition-all"
          >
            {saving ? (
              <IconLoader2 className="animate-spin" size={20} />
            ) : (
              <IconDeviceFloppy size={20} />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
