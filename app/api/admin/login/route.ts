import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // Fallback to 'admin123' if no env variable is set
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (password === adminPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Incorrect credentials' }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
