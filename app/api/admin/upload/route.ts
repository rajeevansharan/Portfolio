import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string; // "image" or "cv"

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const validTypes = ["image", "cv"];
    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: "Invalid upload type" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Create a safe, unique filename
    const ext = path.extname(file.name);
    const basenam = path.basename(file.name, ext).replace(/[^a-zA-Z0-9-]/g, "");
    const filename = `${basenam}-${Date.now()}${ext}`;
    
    // Choose output directory
    const uploadDir = path.join(process.cwd(), "public", "uploads", type === "cv" ? "cv" : "images");
    await fs.mkdir(uploadDir, { recursive: true });
    
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    // Return the relative URL to be saved in JSON
    const relativeUrl = `/uploads/${type === "cv" ? "cv" : "images"}/${filename}`;
    
    return NextResponse.json({ success: true, url: relativeUrl });
  } catch (error: any) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
