import Image from 'next/image'
import { Link } from '@/i18n/routing'

import styles from './Partners.module.css'

export default function Partners() {
    return (
        <div className={styles.PartnersContainer}>
            <div className={styles.PartnersIconsContainer}>
                <Link href='https://citycampus.gr/' target='_blank' rel='noreferrer'>
                    <Image className='invertable' src='/citycampus.png' alt='Facebook' width={160} height={160} />
                </Link>
                <Link href='https://www.glossis.gr/' target='_blank' rel='noreferrer'>
                    <Image src='/glossis.png' alt='Instagram' width={160} height={160} />
                </Link>
                <Link className='invertable' href='https://uni-ties.gr/' target='_blank' rel='noreferrer'>
                    <Image src='/unities.png' alt='Youtube' width={160} height={160} />
                </Link>
            </div>
        </div>
    )
}
