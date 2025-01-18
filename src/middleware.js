import createMiddleware from 'next-intl/middleware'
import {
    isUserLoggedIn,
    setResponseToDeleteCookie,
    setResponseToUpdateSessionCookieOrThrowError,
} from './lib/auth'
import { routing } from './i18n/routing'
import { isLoginPage, isPageAuthorized } from './lib/routing'

const handleI18nRouting = createMiddleware(routing)

function addCORSHeaders(response) {
    response.headers.set('Access-Control-Allow-Origin', '*') // Allow all origins change to specific domains in production
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return response
}

function getLocalizedResponse(request, urlToRedirect) {
    if (urlToRedirect) {
        const url = new URL(request.url)
        url.pathname = urlToRedirect
        return addCORSHeaders(handleI18nRouting({ ...request, nextUrl: url }))
    }
    return addCORSHeaders(handleI18nRouting(request))
}

function isMetadataFileRequest(pathname) {
    return pathname === 'robots.txt' || pathname === 'sitemap.xml'
}

async function authorizeRequestAndGetLocalizedResponse(request) {
    const { pathname } = request.nextUrl

    if (isMetadataFileRequest(pathname)) {
        return addCORSHeaders(
            Response.redirect(new URL(`/${pathname}`, request.url), 308)
        )
    }

    const [, locale, ...segments] = pathname.split('/')
    const unlocalizedUrl = segments.join('/')

    if (!isPageAuthorized(unlocalizedUrl)) {
        return getLocalizedResponse(request)
    }

    const userIsLoggedIn = isUserLoggedIn()

    if (isLoginPage(unlocalizedUrl)) {
        return userIsLoggedIn
            ? getLocalizedResponse(request, '/auth/admin')
            : getLocalizedResponse(request)
    }

    try {
        const response = getLocalizedResponse(request)
        return addCORSHeaders(
            await setResponseToUpdateSessionCookieOrThrowError(response)
        )
    } catch (error) {
        return addCORSHeaders(
            setResponseToDeleteCookie(getLocalizedResponse(request, '/auth/login'))
        )
    }
}

export async function middleware(request) {
    if (request.method === 'OPTIONS') {
        const response = new Response(null, { status: 204 }) // No Content response
        return addCORSHeaders(response)
    }

    return await authorizeRequestAndGetLocalizedResponse(request)
}

// Routes Middleware should not run on
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|robots.txt|sitemap.xml|.*\\.png$|.*\\.svg$|.*\\.ico$|.*\\.jpg$|.*\\.gif$).*)',
        '/',
        '/(el|en)/:path*',
        '/((?!_next|_vercel|.*\\..*).*)',
    ],
}
