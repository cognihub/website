import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'

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

export async function generateMetadata() {
    return {
        title: "Cognihub",
        description: "The future is interdisciplinary",
        author: "Evangelos Garaganis",
        openGraph: {
            title: "Cognihub",
            description: "Welcome to Cognihub, the cognitive science's hub that promotes interdisciplinarity, through events, workshops and more.",
            images: [
                {
                    url: "/logo.png",
                    width: 1200,
                    height: 630,
                    alt: "Our cognilogo",
                }
            ],
            type: "website",
            url: "https://website-nine-omega-32.vercel.app",
        },
    }
}

// TODO: This marks all pages as static. Needs further investigation.
// export function generateStaticParams() {
//     return routing.locales.map((locale) => ({ locale }))
// }

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
