import Image from 'next/image'
import Link from 'next/link'
import { timestampDateToString } from '@/lib/util'
import { ScienceIcons } from '@/components/ScienceIcons'

import styles from './EventCard.module.css'

export function EventBanner({ src }) {
    return (
        <div className={styles.EventBannerImgContainer}>
            <Image
                src={src}
                fill
                alt="Event's banner"
                style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
            />
        </div>
    )
}

export default function EventCard({
    event: {
        id, title, image, date, category, description, sciences
    }
}) {
    return (
        <div className={styles.EventCard} key={id}>
            <Link href={`/events/${id}`}>
                <EventBanner src={image} />
            </Link>
            <div className={styles.CardInfoContainer}>
                <Link href={`/events/${id}`}>
                    <h1>{title}</h1>
                </Link>
                <Link href={`/events?categories=${category}`}>
                    <h6>{category}</h6>
                </Link>
                <p>{description}</p>
                <div className={styles.BottomCardContainer}>
                    <p>{timestampDateToString(date)}</p>
                    <div className={styles.ScienceIconsContainer}>
                        <ScienceIcons sciences={sciences} />
                    </div>
                </div>
            </div>
        </div>
    )
}
