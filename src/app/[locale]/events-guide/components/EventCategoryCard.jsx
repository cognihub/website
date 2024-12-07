import Link from 'next/link'
import Image from 'next/image'

import styles from './EventCategoryCard.module.css'

function EventCategoryCard({
    categoryTitle, categoryDescription, eventTypes, anchorId
}) {
    return (
        <div className={styles.EventCategoryCard}>
            <h3 id={anchorId}>{categoryTitle}</h3>
            <p>{categoryDescription}</p>
            <div>
                {eventTypes.map((eventType) => (
                    <div className={styles.EventTypeContainer}>
                        <Link href={eventType.href}>
                            <Image src={eventType.imgSource} width={330} height={190} alt='event type' />
                        </Link>
                        <div className={styles.EventTypeContents}>
                            <Link href={eventType.href}>
                                <h3 id={eventType.anchorId}>{eventType.title}</h3>
                            </Link>
                            <p>{eventType.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EventCategoryCard
