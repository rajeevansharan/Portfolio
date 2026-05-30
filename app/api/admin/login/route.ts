import { NextResponse } from 'next/server';

// Hardcoded for demo purposes; ideally use DB or environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'sharan2026';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true }, { status: 200 });
      
      // Set an HTTP-only cookie
      response.cookies.set({
        name: 'admin_session',
        value: 'authenticated',
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      
      return response;
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
