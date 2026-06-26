import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/* ══════════════════════════════════════════════════════════════
   PORTFOLIO FOLDER NAMING CONVENTION
   ══════════════════════════════════════════════════════════════
   Format:  slug[Cat1,Cat2,Cat3]
   Example: santos-beltran[Diseño web,Salud]
            mi-marca[Branding,Identidad visual]

   Rules:
   - slug  → becomes the folder ID and is auto-formatted into a title
             (dashes converted to spaces, each word capitalised)
   - [...]  → comma-separated category tags shown on the card
   - If no brackets are present, the folder is still shown but with
     a default "Proyectos" category label.
   ══════════════════════════════════════════════════════════════ */

export interface ProjectMeta {
  slug: string;          // clean ID derived from folder name (no brackets)
  folderName: string;    // raw folder name on disk
  title: string;         // auto-formatted from slug
  categories: string[];  // parsed from [Cat1,Cat2] suffix
  images: string[];      // public URLs to every image inside the folder
}

/** Parse a raw folder name into its slug + categories. */
function parseFolderName(folderName: string): { slug: string; categories: string[] } {
  const bracketStart = folderName.indexOf("[");
  const bracketEnd   = folderName.lastIndexOf("]");

  if (bracketStart !== -1 && bracketEnd > bracketStart) {
    const slug       = folderName.slice(0, bracketStart).trim();
    const tagString  = folderName.slice(bracketStart + 1, bracketEnd);
    const categories = tagString
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    return { slug, categories };
  }

  // No brackets → use the whole name as slug
  return { slug: folderName, categories: ["Proyectos"] };
}

/** Convert a slug like "santos-beltran" → "Santos Beltrán". */
function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function GET() {
  try {
    const portfolioDir = path.join(process.cwd(), "public", "portfolio");

    if (!fs.existsSync(portfolioDir)) {
      return NextResponse.json([]);
    }

    const items = fs.readdirSync(portfolioDir, { withFileTypes: true });
    const projects: ProjectMeta[] = [];

    for (const item of items) {
      if (!item.isDirectory()) continue;

      const { slug, categories } = parseFolderName(item.name);
      const projectDir = path.join(portfolioDir, item.name);

      const files = fs.readdirSync(projectDir);
      const images = files
        .filter((file) => /\.(png|jpe?g|webp|svg)$/i.test(file))
        .sort() // consistent order
        .map((file) => `/portfolio/${encodeURIComponent(item.name)}/${file}`);

      projects.push({
        slug,
        folderName: item.name,
        title: slugToTitle(slug),
        categories,
        images,
      });
    }

    // Stable sort: alphabetically by slug
    projects.sort((a, b) => a.slug.localeCompare(b.slug));

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error scanning portfolio directory:", error);
    return NextResponse.json([], { status: 500 });
  }
}
