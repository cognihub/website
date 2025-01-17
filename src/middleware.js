import createMiddleware from 'next-intl/middleware'
import {
    isUserLoggedIn,
    setResponseToDeleteCookie,
    setResponseToUpdateSessionCookieOrThrowError,
} from './lib/auth'
import { routing } from './i18n/routing'
import { isLoginPage, isPageAuthorized } from './lib/routing'

const handleI18nRouting = createMiddleware(routing)

function getLocalizedResponse(request, urlToRedirect) {
    if (urlToRedirect) request.nextUrl.pathname = urlToRedirect
    return handleI18nRouting(request)
}

function metadataFileRequest(pathname) {
    return (pathname === 'robots.txt' || pathname === 'sitemap.xml')
}

async function authorizeRequestAndGetLocalizedResponse(request) {
    const [, locale, ...segments] = request.nextUrl.pathname.split('/')

    const unlocalizedUrl = segments.join('/')

    if (metadataFileRequest(unlocalizedUrl)) {
        const metadataFileRequest = unlocalizedUrl;
        return Response.redirect(new URL('/' + metadataFileRequest, request.url), 308)
    }

    if (!isPageAuthorized(unlocalizedUrl)) return getLocalizedResponse(request)

    const userIsLoggedIn = isUserLoggedIn()

    if (isLoginPage(unlocalizedUrl)) {
        return userIsLoggedIn
            ? getLocalizedResponse(request, '/auth/admin')
            : getLocalizedResponse(request)
    }

    // If request reaches here, it means we are on an authorized page
    try {
        const response = getLocalizedResponse(request)
        return await setResponseToUpdateSessionCookieOrThrowError(response)
    } catch (e) {
        return setResponseToDeleteCookie(
            getLocalizedResponse(request, '/auth/login'),
        )
    }
}

export async function middleware(request) {
    const response = authorizeRequestAndGetLocalizedResponse(request)
    
    // add the CORS headers to the response
    res.headers.append('Access-Control-Allow-Credentials', "true")
    res.headers.append('Access-Control-Allow-Origin', '*') // replace this your actual origin
    res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    res.headers.append(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    
    return response
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
