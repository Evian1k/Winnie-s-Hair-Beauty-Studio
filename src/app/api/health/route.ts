import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase";
import { isCloudinaryConfigured } from "@/lib/cloudinary";
import { isResendConfigured } from "@/lib/resend";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    integrations: {
      database: "prisma-sqlite",
      supabase: isSupabaseConfigured(),
      cloudinary: isCloudinaryConfigured(),
      resend: isResendConfigured(),
    },
  });
}
