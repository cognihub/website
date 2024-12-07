import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { getMembers } from '@/lib/cognihub-facade'

import styles from './Members.module.css'

export default async function Members() {
    const members = await getMembers()

    return (
        <div className={styles.MembersContainer}>
            {members.map((memberData) => (
                <Link key={memberData.name} href={memberData.link} target='_blank' rel='noreferrer'>
                    <div className={styles.MemberCard}>
                        <Image
                            src={memberData.photo}
                            className={styles.MemberPhoto}
                            width={200}
                            height={200}
                            alt='Member photo'
                        />
                        <h3>{memberData.name}</h3>
                        <p>{memberData.studies}</p>
                        <p className={styles.MemberQuote}>{memberData.quote}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}
