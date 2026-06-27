/**
 * Cloudinary integration — generates signed upload payloads so the
 * client can upload images directly to Cloudinary without exposing
 * the API secret.
 *
 * In production:
 * 1. Sign up at https://cloudinary.com
 * 2. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET to .env
 *
 * When keys are absent, the upload UI shows a graceful "configure Cloudinary" message.
 */

import crypto from "crypto";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const cloudinaryEnabled = Boolean(CLOUD_NAME && API_KEY && API_SECRET);

// Alias for consistency with supabase.ts and resend.ts
export function isCloudinaryConfigured(): boolean {
  return cloudinaryEnabled;
}

export interface CloudinarySignature {
  timestamp: number;
  signature: string;
  apiKey: string;
  cloudName: string;
  uploadUrl: string;
}

export function generateUploadSignature(folder = "lizaya-studio"): CloudinarySignature | null {
  if (!cloudinaryEnabled) return null;

  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign + API_SECRET)
    .digest("hex");

  return {
    timestamp,
    signature,
    apiKey: API_KEY!,
    cloudName: CLOUD_NAME!,
    uploadUrl: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
  };
}

/**
 * Server-side image deletion (e.g. when admin removes a gallery image).
 * Pass the public_id of the image to delete.
 */
export async function deleteImage(publicId: string): Promise<boolean> {
  if (!cloudinaryEnabled) {
    console.log(`[Cloudinary — demo mode] Would delete image: ${publicId}`);
    return true;
  }

  const timestamp = Math.round(Date.now() / 1000);
  const signature = crypto
    .createHash("sha1")
    .update(`public_id=${publicId}&timestamp=${timestamp}${API_SECRET}`)
    .digest("hex");

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        public_id: publicId,
        signature,
        api_key: API_KEY,
        timestamp,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("[Cloudinary] Delete failed:", err);
    return false;
  }
}

/**
 * Extract the public_id from a Cloudinary URL.
 * Example: https://res.cloudinary.com/mycloud/image/upload/v123/lizaya-studio/abc.jpg
 * Returns: lizaya-studio/abc
 */
export function extractPublicId(url: string): string | null {
  try {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)\.[^.]+$/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}
