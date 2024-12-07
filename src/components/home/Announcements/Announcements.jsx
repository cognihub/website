import { getAnnouncementsByDescendingOrderAndLimit } from '@/lib/cognihub-facade'
import { Link } from '@/i18n/routing'
import { timestampDateToString } from '@/lib/util'

import styles from './Announcements.module.css'

export default async function Announcements() {
    const announcements = await getAnnouncementsByDescendingOrderAndLimit(5)

    return (
        <div className={styles.AnnouncementsContainer}>
            <h3><Link href='/announcements'>Ανακοινώσεις ⟶</Link></h3>
            {announcements.map((announcement) => (
                <div key={announcement.id} className={styles.Announcement}>
                    <Link href={`/announcements#${announcement.id}`}>
                        <h2> {announcement.title} </h2>
                    </Link>
                    <h4>{timestampDateToString(announcement.date)}</h4>
                    <p>{announcement.description}</p>
                </div>
            ))}
        </div>
    )
}
