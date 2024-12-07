import Image from 'next/image'
import Link from 'next/link'
import { timestampDateToString } from '@/lib/util'
import { getEventsByDescendingOrder } from '@/lib/cognihub-facade'
import { ScienceIcons } from '@/components/ScienceIcons'

import styles from './Events.module.css'

function EventCard({
    event: {
        id, title, image, date, category, description, sciences
    }
}) {
    return (
        <div key={id} className={styles.EventCard}>
            <div className={styles.EventPreview}>
                <Link href={`/events?categories=${category}`}>
                    <Image src={image} fill alt="Event's banner" sizes='auto' />
                </Link>
            </div>
            <div className={styles.EventData}>
                <Link href={`/events/${id}`}>
                    <h3>{title}</h3>
                </Link>
                <Link href={`/events?categories=${category}`}>
                    <h6>{category}</h6>
                </Link>
                <p>{description}</p>
                <div>
                    <p>{timestampDateToString(date)}</p>
                    <ScienceIcons sciences={sciences} />
                </div>
            </div>
        </div>
    )
}

export default async function Events() {
    const events = await getEventsByDescendingOrder({ limit: 4 })

    return (
        <div className={styles.EventsInHomePageContainer}>
            <div className={styles.RecentEventsTextContainer}>
                <h3>Πρόσφατες δράσεις</h3>
                <p>↴</p>
            </div>
            <div className={styles.EventsContainer}>
                {events.map((event) => <EventCard key={event.id} event={event} />)}
            </div>
            <h3>
                <Link href='/events'>
                    Όλες οι δράσεις ←
                </Link>
            </h3>
        </div>
    )
}
