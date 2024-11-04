import Announcements from '@/components/home/Announcements/Announcements'
import Events from '@/components/home/Events/Events'
import HelpUs from '@/components/home/HelpUs/HelpUs'
import LandingScreen from '@/components/home/LandingScreen/LandingScreen'
import Social from '@/components/home/Social/Social'
import { unstable_setRequestLocale } from 'next-intl/server'

export default function Home({ params: { locale } }) {
    unstable_setRequestLocale(locale)
    return (
        <div>
            <LandingScreen />
            <Events />
            <HelpUs />
            <Announcements />
            <Social />
        </div>
    )
}
