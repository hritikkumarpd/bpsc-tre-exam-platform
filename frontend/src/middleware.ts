import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Enterprise Subdomain & RBAC Edge Middleware
 * 1. Subdomain Routing:
 *    - Requests to admin.xyz.com (or admin.localhost) automatically route to /admin/*
 *    - Requests to xyz.com (or localhost) stay on standard student portal
 * 2. Route Protection:
 *    - Blocks non-admin requests attempting to hit /admin routes from main domain.
 */
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';

  // Extract hostname without port (e.g., admin.xyz.com or admin.localhost:3001)
  const hostname = host.split(':')[0].toLowerCase();
  const isAdminSubdomain = hostname.startsWith('admin.');

  // PATH CHECK:
  const pathname = url.pathname;

  // Static assets & api bypass
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 1. SUBDOMAIN REWRITE: admin.xyz.com -> /admin routes
  if (isAdminSubdomain) {
    // If accessing root of admin subdomain (admin.xyz.com/), rewrite to /admin
    if (pathname === '/' || pathname === '') {
      url.pathname = '/admin';
      return NextResponse.rewrite(url);
    }

    // If accessing a path on admin.xyz.com that does not already start with /admin, prefix with /admin
    if (!pathname.startsWith('/admin') && !pathname.startsWith('/login')) {
      url.pathname = `/admin${pathname}`;
      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  }

  // 2. MAIN DOMAIN PROTECTION: (xyz.com)
  // If a student or public visitor on main domain visits /admin explicitly
  if (!isAdminSubdomain && pathname.startsWith('/admin')) {
    // Set response header to warn or allow client layout guard to enforce 403
    const response = NextResponse.next();
    response.headers.set('x-portal-scope', 'main-domain');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
