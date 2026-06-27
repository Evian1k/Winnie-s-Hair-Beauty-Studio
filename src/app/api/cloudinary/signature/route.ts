import { NextResponse } from "next/server";
import { generateUploadSignature, cloudinaryEnabled } from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function GET() {
  if (!cloudinaryEnabled) {
    return NextResponse.json(
      {
        enabled: false,
        message: "Cloudinary not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to .env",
      },
      { status: 200 }
    );
  }
  const signature = generateUploadSignature();
  if (!signature) {
    return NextResponse.json({ error: "Failed to generate signature" }, { status: 500 });
  }
  return NextResponse.json({ enabled: true, ...signature });
}
