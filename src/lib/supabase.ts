import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client (server-side).
 * Returns null if env vars are not configured — callers should fall back to
 * Prisma/SQLite in that case.
 */
let _client: SupabaseClient | null | undefined = undefined;

export function getSupabase(): SupabaseClient | null {
  if (_client !== undefined) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    _client = null;
    return null;
  }
  try {
    _client = createClient(url, key, { auth: { persistSession: false } });
    return _client;
  } catch (e) {
    console.error("[Supabase] init failed:", e);
    _client = null;
    return null;
  }
}

export function isSupabaseConfigured(): boolean {
  return getSupabase() !== null;
}
