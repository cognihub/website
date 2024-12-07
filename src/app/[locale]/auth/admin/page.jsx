import { unstable_setRequestLocale } from 'next-intl/server'
import { EventsTable } from './components/EventsTable'
import { AnnouncementsTable } from './components/AnnouncementsTable'
import AdminHeader from './components/AdminHeader'

import styles from './Admin.module.css'

export default async function Page({ params: { locale } }) {
    unstable_setRequestLocale(locale)

    return (
        <>
            <div className={styles.AdminPageHeader}>
                <h2>Σελίδα Διαχειριστή</h2>
                <AdminHeader />
            </div>
            <div className={styles.AdminPageContainer}>
                <EventsTable />
                <AnnouncementsTable />
            </div>
        </>
    )
}
