import { revalidatePath } from 'next/cache'
import { unstable_setRequestLocale } from 'next-intl/server'
import EventCard from './components/EventCard/EventCard'
import Filters from './components/Filters/Filters'
import { getEventsByDescendingOrder } from '@/lib/cognihub-facade'

import styles from './Events.module.css'

export default async function Page({ searchParams, locale }) {
    unstable_setRequestLocale(locale)

    // Inline Server Action
    async function revalidateEventsPageCache() {
        'use server'

        revalidatePath('/events', 'page')
    }

    const events = await getEventsByDescendingOrder(searchParams)

    return (
        <div className={styles.EventsContainer}>
            <Filters onFilterUpdate={revalidateEventsPageCache} />
            <p>Σύνολο δράσεων: {events.length}</p>
            <div className={styles.EventsResults}>
                {events.map((event) => <EventCard event={event} />)}
            </div>
        </div>
    )
}
