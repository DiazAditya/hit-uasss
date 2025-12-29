import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const authSession = request.cookies.get('healstream_session')
    const { pathname } = request.nextUrl

    // 1. Check for auth on protected routes
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/doctor')) {
        if (!authSession) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        // Role-based Redirects
        const role = authSession.value
        if (pathname.startsWith('/doctor') && role !== 'doctor') {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        if (pathname.startsWith('/dashboard') && role === 'doctor') {
            return NextResponse.redirect(new URL('/doctor/dashboard', request.url))
        }
    }

    // 2. Redirect logged-in users away from auth pages
    if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
        if (authSession) {
            const role = authSession.value
            const target = role === 'doctor' ? '/doctor/dashboard' : '/dashboard'
            return NextResponse.redirect(new URL(target, request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/doctor/:path*', '/login', '/signup'],
}
