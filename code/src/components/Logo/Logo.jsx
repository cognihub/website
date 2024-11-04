import Image from 'next/image'
import { Link } from '@/i18n/routing'

import styles from './Logo.module.css'

export default function Logo() {
    return (
        <Link href='\'>
            <div className={styles.LogoContainer}>
                <Image src='/logo.png' alt='Cognihub Logo' width={60} height={60} />
                <h4>CogniHub</h4>
            </div>
        </Link>
    )
}
