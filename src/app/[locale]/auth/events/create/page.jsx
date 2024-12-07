import { v4 as uuid } from 'uuid'
import { unstable_setRequestLocale } from 'next-intl/server'
import EventForm from '../components/EventForm'
import { createOrEditEventAction } from '@/app/actions'

import styles from '../../Form.module.css'

export default function Page({ params: { locale } }) {
    unstable_setRequestLocale(locale)

    const event = {
        id: uuid(),
        title: '',
        image: '',
        description: '',
        date: '',
        category: '',
        content: '',
        sciences: [],
        links: [],
        resources: ''
    }

    return (
        <div className={styles.FormPageContainer}>
            <h2>Δημιουργία δράσης</h2>
            <EventForm serverAction={createOrEditEventAction} event={event} />
        </div>
    )
}
