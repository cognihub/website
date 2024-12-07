import { Icon } from '@iconify/react'
import { Link } from '@/i18n/routing'
import { getAnnouncementsByDescendingOrderAndLimit } from '@/lib/cognihub-facade'
import { timestampDateToString } from '@/lib/util'

export async function AnnouncementsTable() {
    const announcements = await getAnnouncementsByDescendingOrderAndLimit()

    return (
        <div>
            <h3>Ανακοινώσεις</h3>
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
                            <Link href='/auth/announcements/create'>
                                <Icon icon='material-symbols:add' width='24' />
                            </Link>
                        </td>
                    </tr>
                    {announcements.map((announcement) => (
                        <tr key={announcement.id}>
                            <td>{announcement.title}</td>
                            <td>{timestampDateToString(announcement.date)}</td>
                            <td>
                                <Link href={`/auth/announcements/edit/${announcement.id}`}>
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
