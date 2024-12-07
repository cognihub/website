import Image from 'next/image'
import { Link } from '@/i18n/routing'

import styles from './Social.module.css'

export default function Social() {
    return (
        <div className={styles.SocialContainer}>
            <div className={styles.SocialIconsContainer}>
                <Link href='https://www.facebook.com/cognihubgr/' target='_blank' rel='noreferrer'>
                    <Image src='/facebook.svg' alt='Facebook' width={50} height={50} />
                </Link>
                <Link href='https://www.instagram.com/cognihub/?hl=en' target='_blank' rel='noreferrer'>
                    <Image src='/instagram.svg' alt='Instagram' width={50} height={50} />
                </Link>
                <Link href='https://www.youtube.com/channel/UCBD6NoYPTu_U7uVZX0L0R_Q' target='_blank' rel='noreferrer'>
                    <Image src='/youtube.svg' alt='Youtube' width={50} height={50} />
                </Link>
                <Link href='https://open.spotify.com/show/4lkIcHgNzjQiGqlmfuPH2P' target='_blank' rel='noreferrer'>
                    <Image src='/spotify.svg' alt='Spotify' width={50} height={50} />
                </Link>
                <Link href='https://www.linkedin.com/company/cognihub/' target='_blank' rel='noreferrer'>
                    <Image src='/linkedin.svg' alt='LinkedIn' width={50} height={50} />
                </Link>
            </div>
            <p>↑</p>
            <h3>Θα μας βρείς</h3>
        </div>
    )
}
