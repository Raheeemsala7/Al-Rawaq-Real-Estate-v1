import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
    const isDashboard = req.nextUrl.pathname.includes('/dashboard');

    if (isDashboard) {
        const token = await getToken({ req });

        // If user is not logged in, or not an admin, redirect them
        const user = token?.user as any;
        if (!token || user?.role !== 'admin') {
            const url = req.nextUrl.clone();
            // Redirect to home page or login page
            url.pathname = '/';
            return NextResponse.redirect(url);
        }
    }

    return intlMiddleware(req);
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};
