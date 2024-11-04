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

async function authorizeRequestAndGetLocalizedResponse(request) {
    const [, locale, ...segments] = request.nextUrl.pathname.split('/')

    const unlocalizedUrl = segments.join('/')

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
    return authorizeRequestAndGetLocalizedResponse(request)
}

// Routes Middleware should not run on
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|.*\\.jpg$|.*\\.gif$).*)',
        '/',
        '/(el|en)/:path*',
        '/((?!_next|_vercel|.*\\..*).*)',
    ],
}
