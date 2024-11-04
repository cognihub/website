import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { Suspense } from 'react'

import './styles/globals.css'
import './styles/popover.css'
import './styles/landing-page.css'
import './styles/skeleton.css'
import './styles/tape.css'
import './styles/suneditor.css'

const font = Inter({
    weight: ['400'],
    subsets: ['latin'],
    display: 'swap',
})

export const metadata = {
    title: 'Cognihub',
    description: 'The furure is interdisciplinary',
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }))
}

export default async function LocalizedLayout({ children, params: { locale } }) {
    unstable_setRequestLocale(locale)

    const messages = await getMessages()

    return (
        <html lang={locale}>
            <body className={font.className}>
                <NextIntlClientProvider messages={messages}>
                    <Suspense>
                        <Navbar />
                        <main>
                            {children}
                        </main>
                        <Footer />
                    </Suspense>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
