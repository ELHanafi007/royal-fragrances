import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Found" : "❌ Missing",
    supabase_key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Found" : "❌ Missing",
    admin_pass: process.env.ADMIN_PASSWORD ? "✅ Found" : "❌ Missing",
    node_env: process.env.NODE_ENV,
  });
}
