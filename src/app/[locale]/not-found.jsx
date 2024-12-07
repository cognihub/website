import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

export default function NotFound() {
    const t = useTranslations('NotFound')

    return (
        <div className='PageContainer404'>
            <h1>404 - 🧠 {t('text')}</h1>
            <Link href='/'>{t('back')} ↩</Link>
        </div>
    )
}
