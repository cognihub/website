import Image from 'next/image'
import { Link } from '@/i18n/routing'

import styles from './Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.FooterContainer}>
            <p><Link href='https://egaraganis.dev/'>Coded</Link> with </p>
            <Link href='https://egaraganis.dev/' target='_blank' rel='noreferrer'>
                <Image
                    className={styles.zoom}
                    src='/heart.png'
                    width={22}
                    height={22}
                    alt='Evangelos Garaganis'
                />
            </Link>
            <p>CogniHub 2020 - {new Date().getFullYear()} </p>
        </footer>
    )
}
