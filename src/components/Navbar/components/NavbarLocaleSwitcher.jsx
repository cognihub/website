import { useLocale } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import { usePathname, useRouter } from '@/i18n/routing'

import 'react-toastify/dist/ReactToastify.css';

export default function NavbarLocaleSwitcher() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()
    const params = useSearchParams()

    const notify = () => toast.info('English version soon!', { theme: 'colored', position: 'bottom-center' });

    async function changeLocale() {
        const nextLocale = (locale === 'el' ? 'en' : 'el')
        notify()
        // router.push(pathname + '?' + new URLSearchParams(params.toString()), { locale: nextLocale })
    }

    return (
        <div className='navButton' onClick={changeLocale}>
            {locale === 'el' ? '🇬🇷' : '🇬🇧'}
            <ToastContainer />
        </div>
    )
}
