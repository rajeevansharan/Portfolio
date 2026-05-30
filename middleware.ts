import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // Define protected routes
  const isProtectedRoute = path.startsWith('/admin') && path !== '/admin/login'
  const isApiProtected = path.startsWith('/api/admin') && path !== '/api/admin/login'

  // Get session from cookie
  const session = request.cookies.get('admin_session')?.value
  
  // Check if session exists (in real app, verify a JWT)
  const isAuthenticated = session === 'authenticated'

  // Redirect to login if accessing protected route without session
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // Return unauthorized for protected API routes without session
  // Allow GET requests to /api/admin/files for public consumption of portfolio data
  if (isApiProtected && !isAuthenticated) {
    if (path === '/api/admin/files' && request.method === 'GET') {
      return NextResponse.next()
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Redirect to admin dashboard if accessing login page with valid session
  if (path === '/admin/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ]
}
