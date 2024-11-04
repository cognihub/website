import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { printAuthorizationErrorMessage } from './errors'

// TODO: Not safe plain text here
const SECRET_KEY = 'secret'
const key = new TextEncoder().encode(SECRET_KEY)
const COOKIE_EXPIRES_AT = 7 * 24 * 60 * 60 * 1000
const JWT_TOKEN_EXPIRES_AT = '7d'
const COOKIE_SESSION_ID = 'session'

export async function encrypt(payload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(JWT_TOKEN_EXPIRES_AT)
        .sign(key)
}

export async function decrypt(input) {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256'],
    })

    return payload
}

export function deleteCookie() {
    cookies().delete(COOKIE_SESSION_ID)
}

export async function encryptUserAndSetCookie(user) {
    const expiresAt = new Date(Date.now() + COOKIE_EXPIRES_AT)
    const session = await encrypt(user)

    cookies().set(COOKIE_SESSION_ID, session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function getUserFromSession() {
    const session = cookies().get(COOKIE_SESSION_ID)?.value

    if (!session) return null
    return await decrypt(session)
}

export function isUserLoggedIn() {
    const session = cookies().get(COOKIE_SESSION_ID)?.value

    return !session ? false : true
}

/*
ReadonlyRequestCookiesError: Cookies can only be modified in a Server Action or Route Handler.
Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options

Due to this next/heads api restrictions will set cookie directly from the NextResponse.
*/
export async function setResponseToDeleteCookie(response) {
    response.cookies.set(COOKIE_SESSION_ID, '', {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
        sameSite: 'lax',
        path: '/',
    })

    return response
}

export async function setResponseToUpdateSessionCookieOrThrowError(response) {
    const session = cookies().get(COOKIE_SESSION_ID)?.value

    try {
        const payload = await decrypt(session)

        if (!session || !payload) {
            throw new Error('No valid session found in cookie')
        }

        const updatedSession = await encrypt(payload)
        const expires = new Date(Date.now() + COOKIE_EXPIRES_AT)

        response.cookies.set(COOKIE_SESSION_ID, updatedSession, {
            httpOnly: true,
            secure: true,
            expires: expires,
            sameSite: 'lax',
            path: '/',
        })

        return response
    } catch (e) {
        printAuthorizationErrorMessage(e.message)
        throw new Error(e.message)
    }
}