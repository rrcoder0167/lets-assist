import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/middleware';

const PUBLIC_PATHS = [
    '/login',
    '/',
    '/signup',
    '/error',
    '/auth/confirm',
    '/auth/callback'
]; 

const RESTRICTED_PATHS_FOR_LOGGED_IN_USERS = ['/', '/login', '/signup'];

// Function to check if a path starts with any of the public paths
function isPublicPath(path: string) {
    return PUBLIC_PATHS.some(publicPath => path === publicPath || path.startsWith(`${publicPath}/`));
}

export async function middleware(request: NextRequest) {
    // Check for noRedirect parameter first
    const searchParams = request.nextUrl.searchParams;
    if (searchParams.get('noRedirect') === '1') {
        return NextResponse.next();
    }

    const { supabase, response } = createClient(request);
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const currentPath = request.nextUrl.pathname;

    // Handle /account redirect
    if (currentPath === '/account') {
        return NextResponse.redirect(new URL('/account/profile', request.url));
    }

    // Special handling for profile paths - allow both public and private access
    if (currentPath.startsWith('/profile')) {
        return response;
    }

    // Handle non-public paths for non-authenticated users
    if (!user && !isPublicPath(currentPath)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Handle restricted paths for authenticated users
    if (user && RESTRICTED_PATHS_FOR_LOGGED_IN_USERS.includes(currentPath)) {
        return NextResponse.redirect(new URL('/home', request.url));
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};