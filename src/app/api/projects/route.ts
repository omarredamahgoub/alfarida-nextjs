// src/app/api/projects/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const projectSchema = z.object({
  slug:          z.string().min(2).max(100),
  status:        z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  featured:      z.boolean().default(false),
  order:         z.number().default(0),
  titleAr:       z.string().min(2),
  titleEn:       z.string().min(2),
  descriptionAr: z.string().min(10),
  descriptionEn: z.string().min(10),
  clientAr:      z.string().optional(),
  clientEn:      z.string().optional(),
  locationAr:    z.string().optional(),
  locationEn:    z.string().optional(),
  coverImage:    z.string().url().optional(),
  images:        z.array(z.string().url()).default([]),
  category:      z.enum(["CONSTRUCTION","INFRASTRUCTURE","INTERIOR","INDUSTRIAL","COMMERCIAL","RESIDENTIAL","OTHER"]).default("OTHER"),
  tags:          z.array(z.string()).default([]),
  completedAt:   z.string().datetime().optional(),
  externalUrl:   z.string().url().optional(),
});

// GET /api/projects — public, returns published projects
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");

  const projects = await prisma.project.findMany({
    where: {
      status: "PUBLISHED",
      ...(category ? { category: category.toUpperCase() as "COMMERCIAL" } : {}),
      ...(featured === "true" ? { featured: true } : {}),
    },
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  });

  return NextResponse.json({ success: true, data: projects });
}

// POST /api/projects — admin only
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = projectSchema.parse(body);

    const project = await prisma.project.create({
      data: {
        ...data,
        completedAt: data.completedAt ? new Date(data.completedAt) : undefined,
      },
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
