import createMiddleware from "next-intl/middleware"
import {
   isUserLoggedIn,
   setResponseToDeleteCookie,
   setResponseToUpdateSessionCookieOrThrowError,
} from "./lib/auth"
import { routing } from "./i18n/routing"
import { isLoginPage, isPageAuthorized } from "./lib/routing"
import { NextResponse } from "next/server"

const allowedOrigins = ["*"]

const corsOptions = {
   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
   "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

const handleI18nRouting = createMiddleware(routing)

function getLocalizedResponse(request, urlToRedirect) {
   if (urlToRedirect) request.nextUrl.pathname = urlToRedirect
   return handleI18nRouting(request)
}

function metadataFileRequest(pathname) {
   return pathname === "robots.txt" || pathname === "sitemap.xml"
}

async function authorizeRequestAndGetLocalizedResponse(request) {
   const [, locale, ...segments] = request.nextUrl.pathname.split("/")

   const unlocalizedUrl = segments.join("/")

   if (metadataFileRequest(unlocalizedUrl)) {
      const metadataFileRequest = unlocalizedUrl
      return Response.redirect(
         new URL("/" + metadataFileRequest, request.url),
         308
      )
   }

   if (!isPageAuthorized(unlocalizedUrl)) return getLocalizedResponse(request)

   const userIsLoggedIn = isUserLoggedIn()

   if (isLoginPage(unlocalizedUrl)) {
      return userIsLoggedIn
         ? getLocalizedResponse(request, "/auth/admin")
         : getLocalizedResponse(request)
   }

   // If request reaches here, it means we are on an authorized page
   try {
      const response = getLocalizedResponse(request)
      return await setResponseToUpdateSessionCookieOrThrowError(response)
   } catch (e) {
      return setResponseToDeleteCookie(
         getLocalizedResponse(request, "/auth/login")
      )
   }
}

export async function middleware(request) {
    const response2 = authorizeRequestAndGetLocalizedResponse(request)

    console.log("1")
   // Check the origin from the request
   const origin = request.headers.get("origin") ?? ""
   const isAllowedOrigin = allowedOrigins.includes(origin)

   // Handle preflighted requests
   const isPreflight = request.method === "OPTIONS"

   if (isPreflight) {
      const preflightHeaders = {
         ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
         ...corsOptions,
      }
      return NextResponse.json({}, { headers: preflightHeaders })
   }

   console.log("2")
   
   const response = authorizeRequestAndGetLocalizedResponse(request)
   return response
   const responseWithCORSHeaders = new Response(response.body, response);

   console.log("3")

   if (isAllowedOrigin) {
    responseWithCORSHeaders.headers.set("Access-Control-Allow-Origin", origin)
   }

   console.log({response})
   console.log("4")

   Object.entries(corsOptions).forEach(([key, value]) => {
    responseWithCORSHeaders.headers.set(key, value)
   })

   console.log("5")

   console.log({responseWithCORSHeaders})

   return responseWithCORSHeaders
}

// Routes Middleware should not run on
export const config = {
   matcher: [
      "/((?!api|_next/static|_next/image|robots.txt|sitemap.xml|.*\\.png$|.*\\.svg$|.*\\.ico$|.*\\.jpg$|.*\\.gif$).*)",
      "/",
      "/(el|en)/:path*",
      "/((?!_next|_vercel|.*\\..*).*)",
   ],
}
