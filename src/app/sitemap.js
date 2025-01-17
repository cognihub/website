import { SUPPORTED_LOCALES } from '@/i18n/routing'
import { getEventsByDescendingOrder } from '@/lib/cognihub-facade'

export default async function sitemap() {
    const URL = process.env.NEXT_PUBLIC_SITE_URL
    const paths = [
        '',
        '/aboutus',
        '/announcements',
        '/become-member',
        '/contact-us',
        '/cooperate',
        '/events',
        '/events-guide',
        '/faq',
        '/mentorhub',
    ]

    const events = await getEventsByDescendingOrder()
    const eventsPaths = events.map((event) => '/events/' + event.id)
    paths.push(...eventsPaths)

    const localizedPaths = SUPPORTED_LOCALES.map(
        (supportedLocale) => URL + '/' + supportedLocale
    )

    return paths.map((path) => {
        const alternates = Object.entries(localizedPaths).reduce(
            (acc, [locale, baseUrl]) => {
                acc[locale] = `${baseUrl}${path}`
                return acc
            },
            {}
        )

        return {
            url: `${URL}${path}`,
            lastModified: new Date(),
            alternates: {
                languages: alternates,
            },
        }
    })
}
