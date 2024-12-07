import { defineRouting } from 'next-intl/routing'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'

export const SUPPORTED_LOCALES = ['el', 'en']
export const DEFAULT_LOCALE = 'el'

export const routing = defineRouting({
    locales: SUPPORTED_LOCALES,
    defaultLocale: DEFAULT_LOCALE,
    localeDetection: false // TODO: Ignores Accept-Language header
})

export const {
    Link, redirect, usePathname, useRouter, getPathname
} = createSharedPathnamesNavigation(routing)
