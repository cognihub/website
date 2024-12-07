import { v4 as uuid } from 'uuid'
import { unstable_setRequestLocale } from 'next-intl/server'
import AnnouncementForm from '../components/AnnouncementForm'
import { createOrEditAnnouncementAction } from '@/app/actions'

import styles from '../../Form.module.css'

export default function Page({ params: { locale } }) {
    unstable_setRequestLocale(locale)

    const announcement = {
        id: uuid(),
        title: '',
        description: '',
        date: '',
        content: '',
        links: [],
    }

    return (
        <div className={styles.FormPageContainer}>
            <h2>Δημιουργία ανακοίνωσης</h2>
            <AnnouncementForm serverAction={createOrEditAnnouncementAction} announcement={announcement} />
        </div>
    )
}
