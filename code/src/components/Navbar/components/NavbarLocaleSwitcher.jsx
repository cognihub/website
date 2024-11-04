import { useLocale } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { usePathname, useRouter } from '@/i18n/routing'

export default function NavbarLocaleSwitcher() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()
    const params = useSearchParams()

    async function changeLocale() {
        const nextLocale = (locale === 'el' ? 'en' : 'el')
        router.push(pathname + '?' + new URLSearchParams(params.toString()), { locale: nextLocale })
    }

    return (
        <div className='navButton' onClick={changeLocale}>
            {locale === 'el' ? '🇬🇷' : '🇬🇧'}
        </div>
    )
}
