import { unstable_setRequestLocale } from 'next-intl/server'
import Announcements from '@/components/home/Announcements/Announcements'
import Events from '@/components/home/Events/Events'
import HelpUs from '@/components/home/HelpUs/HelpUs'
import LandingScreen from '@/components/home/LandingScreen/LandingScreen'
import Social from '@/components/home/Social/Social'
import Partners from '@/components/home/Partners/Partners'

export async function generateMetadata() {
    return {
        title: 'Cognihub',
        description: 'The future is interdisciplinary',
        author: 'Evangelos Garaganis',
        openGraph: {
            title: 'Cognihub',
            description: "Welcome to Cognihub, the cognitive science's hub that promotes interdisciplinarity, through events, workshops and more.",
            type: 'website',
            url: 'https://website-nine-omega-32.vercel.app',
            images: [
                {
                    url: '/home.png',
                    width: 1200,
                    height: 630,
                    alt: 'Screenshot of our home page',
                }
            ],
        },
    }
}

export default function Home({ params: { locale } }) {
    unstable_setRequestLocale(locale)

    return (
        <div>
            <LandingScreen />
            <Events />
            <HelpUs />
            <Announcements />
            <Social />
            <Partners />
        </div>
    )
}
