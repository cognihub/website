import EventForm from '../../components/EventForm'

import { createOrEditEventAction } from '@/app/actions'
import { timestampDateToDateInput, timestampDateToString } from '@/lib/util'
import { getEvent } from '@/lib/cognihub-facade'

import styles from '../../../Form.module.css'

export default async function Page({ params }) {
    const event = await getEvent(params.id)

    event.sciences = event.sciences.map((science) => ({ label: science, value: science }))
    event.date = timestampDateToDateInput(event.date)
    event.links = event.links.join(',')

    return (
        <div className={styles.FormPageContainer}>
            <h2>Επεξεργασία δράσης</h2>
            <EventForm serverAction={createOrEditEventAction} event={event} />
        </div>
    )
}
