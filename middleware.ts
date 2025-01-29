import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/middleware';

const PUBLIC_PATHS = ['/login', '/', '/signup']; // public paths that don't require authentication

export async function middleware(request: NextRequest) {
    const { supabase, response } = createClient(request);
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const currentPath = request.nextUrl.pathname;

    if (!user && !PUBLIC_PATHS.includes(currentPath)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (user && PUBLIC_PATHS.includes(currentPath)) { // redirect to home if user is already logged in, you can't access those pages
        return NextResponse.redirect(new URL('/home', request.url));
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};