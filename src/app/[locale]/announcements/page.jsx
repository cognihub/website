// TODO: Consider generating this pages statically https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#generating-static-params
// TODO: Then Update knowledge base

import { unstable_setRequestLocale } from 'next-intl/server'
import html, { timestampDateToString } from '@/lib/util'
import { getAnnouncementsByDescendingOrderAndLimit } from '@/lib/cognihub-facade'

import styles from './Announcement.module.css'

function Announcement({
    announcement: {
        id, title, date, content, links
    }
}) {
    return (
        <div className={styles.AnnouncementContainer} id={id}>
            <h1>{title}</h1>
            <h2 className={styles.EventDate}>{timestampDateToString(date)}</h2>
            {html(content)}
            <ul>
                {links.map((link) => <li key={link}>{link}</li>)}
            </ul>
            <div className={styles.Divider} />
        </div>
    )
}

export default async function Page({ params: { locale } }) {
    unstable_setRequestLocale(locale)

    const announcements = await getAnnouncementsByDescendingOrderAndLimit()

    return (
        <div className={styles.AnnouncementPageContainer}>
            {announcements.map((announcement) => <Announcement key={announcement.id} announcement={announcement} />)}
        </div>
    )
}
