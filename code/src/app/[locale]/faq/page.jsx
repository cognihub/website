import Image from 'next/image'
import { Icon } from '@iconify/react'
import { getFaQ } from '@/lib/cognihub-facade'
import { unstable_setRequestLocale } from 'next-intl/server'

import styles from './FaQ.module.css'

export default async function Page({ params: { locale } }) {
    unstable_setRequestLocale(locale)

    const faq = await getFaQ()

    return (
        <div className={styles.FaQPageContainer}>
            <div>
                {faq.map((faq, index) => (
                    <>
                        <div className={styles.MessageContainer}>
                            <Image src='/logo.png' alt='Cognihub' width={40} height={40} />
                            <p>{faq.question}</p>
                        </div>
                        <div className={[styles.MessageContainer, styles.AnswerContainer].join(' ')}>
                            <Icon icon='mdi:user' width='30' />
                            <p>{faq.answer}</p>
                        </div>
                    </>
                ))}
            </div>
        </div>
    )

}