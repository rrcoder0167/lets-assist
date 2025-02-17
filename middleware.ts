import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/middleware';

const PUBLIC_PATHS = [
    '/login',
    '/',
    '/signup',
    '/error',
    '/auth/confirm',
    '/auth/callback',
    '/profile'  // Add the base profile path
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

    if (currentPath === '/account') {
        return NextResponse.redirect(new URL('/account/profile', request.url));
    }

    if (!user && !isPublicPath(currentPath)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

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