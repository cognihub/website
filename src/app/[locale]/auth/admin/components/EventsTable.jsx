import { Icon } from '@iconify/react'
import { Link } from '@/i18n/routing'
import { getEventsByDescendingOrder } from '@/lib/cognihub-facade'
import { timestampDateToString } from '@/lib/util'

export async function EventsTable() {
    const events = await getEventsByDescendingOrder()

    return (
        <div>
            <h3>Δράσεις</h3>
            <table>
                <thead>
                    <tr>
                        <th>Τίτλος</th>
                        <th>Ημ/νία</th>
                        <th><Icon icon='material-symbols:settings' width='20' /></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Μια νέα δράση γεννιέται</td>
                        <td>-/-/-</td>
                        <td>
                            <Link href='/auth/events/create'>
                                <Icon icon='material-symbols:add' width='24' />
                            </Link>
                        </td>
                    </tr>
                    {events.map((event) => (
                        <tr key={event.id}>
                            <td>{event.title}</td>
                            <td>{timestampDateToString(event.date)}</td>
                            <td>
                                <Link href={`/auth/events/edit/${event.id}`}>
                                    <Icon icon='material-symbols:edit' width='20' />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
