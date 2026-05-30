import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const allowedFiles = [
  "projects.json",
  "education.json",
  "experience.json",
  "skills.json",
  "about.json",
  "hero.json",
  "contact.json",
  "socials.json",
];

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const file = searchParams.get("file");

    if (!file || !allowedFiles.includes(file)) {
      return NextResponse.json({ error: "Invalid or missing file parameter" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "data", file);
    
    // Check if file exists, if not return empty array or object based on typical usage
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json(file === "about.json" ? {} : []);
    }

    const fileContents = await fs.readFile(filePath, "utf8");
    return NextResponse.json(JSON.parse(fileContents), {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      }
    });
  } catch (error: any) {
    console.error("Error reading file:", error);
    return NextResponse.json({ error: "Failed to read data file" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const file = searchParams.get("file");

    if (!file || !allowedFiles.includes(file)) {
      return NextResponse.json({ error: "Invalid or missing file parameter" }, { status: 400 });
    }

    const body = await req.json();
    const filePath = path.join(process.cwd(), "data", file);

    // Write formatted JSON
    await fs.writeFile(filePath, JSON.stringify(body, null, 2), "utf8");

    return NextResponse.json({ success: true, message: `${file} updated successfully` });
  } catch (error: any) {
    console.error("Error writing file:", error);
    return NextResponse.json({ error: "Failed to save data file" }, { status: 500 });
  }
}
