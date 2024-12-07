import AnnouncementForm from '../../components/AnnouncementForm'
import { createOrEditAnnouncementAction } from '@/app/actions'
import { getAnnouncement } from '@/lib/cognihub-facade'
import { timestampDateToDateInput } from '@/lib/util'

import styles from '../../../Form.module.css'

export default async function Page({ params }) {
    const announcement = await getAnnouncement(params.id)

    announcement.date = timestampDateToDateInput(announcement.date)
    announcement.links = announcement.links.join(',')

    return (
        <div className={styles.FormPageContainer}>
            <h2>Επεξεργασία ανακοίνωσης</h2>
            <AnnouncementForm serverAction={createOrEditAnnouncementAction} announcement={announcement} />
        </div>
    )
}
