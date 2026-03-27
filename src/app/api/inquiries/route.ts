// src/app/api/inquiries/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const inquirySchema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email(),
  phone:   z.string().optional(),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10).max(2000),
  locale:  z.enum(["ar", "en"]).default("ar"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = inquirySchema.parse(body);

    const inquiry = await prisma.inquiry.create({
      data: {
        name:      data.name,
        email:     data.email,
        phone:     data.phone,
        company:   data.company,
        subject:   data.subject,
        message:   data.message,
        locale:    data.locale,
        source:    "website",
        ipAddress: request.headers.get("x-forwarded-for") ?? undefined,
        userAgent: request.headers.get("user-agent") ?? undefined,
      },
    });

    return NextResponse.json({ success: true, id: inquiry.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }
    console.error("Inquiry creation error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
