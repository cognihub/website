export function isPageAuthorized(pathname) {
    return pathname.startsWith('auth')
}

export function isLoginPage(pathname) {
    return pathname === 'auth/login'
}
