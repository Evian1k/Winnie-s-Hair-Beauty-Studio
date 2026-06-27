import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "../_auth";

export const runtime = "nodejs";

/**
 * Verify admin password.
 * Returns a token the client can use for subsequent admin API calls.
 * In production, replace this with Supabase Auth or NextAuth.
 */
export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "winnie2024";

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // The "token" is just the password itself (verified by verifyAdmin).
    // In production, use a real JWT or session cookie.
    return NextResponse.json({
      success: true,
      token: ADMIN_PASSWORD,
      message: "Authenticated",
    });
  } catch (err) {
    console.error("[POST /api/admin/verify] Error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

// Allow client to check if currently authed
export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ authed: false }, { status: 200 });
  }
  return NextResponse.json({ authed: true });
}
