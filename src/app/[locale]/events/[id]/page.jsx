// TODO: Consider generating this pages statically https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#generating-static-params
// TODO: Then Update knowledge base

import Image from 'next/image'
import { Link } from '@/i18n/routing'
import html, { timestampDateToString } from '@/lib/util'
import { ScienceIcons } from '@/components/ScienceIcons'
import { getEvent } from '@/lib/cognihub-facade'

import styles from './Event.module.css'

function getStreamingPlatformImgSrc(link) {
    if (link.includes('youtu.be') || link.includes('youtube')) {
        return '/youtube.svg'
    }
    if (link.includes('spotify')) {
        return '/spotify.svg'
    }
    if (link.includes('fb.watch')) {
        return '/facebook.svg'
    }
}

export async function generateMetadata({ params }) {
    const { title, image, description } = await getEvent(params.id)

    return {
        title,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
    }
}

export default async function Page({ params }) {
    const {
        id, title, image, date, category, content, sciences, links, resources
    } = await getEvent(params.id)

    return (
        <div className={styles.EventPageContainer}>
            <div className={styles.EventInfoColumn}>
                <div className={styles.ImgContainer}>
                    <Image src={image} fill objectFit='cover' alt="Event's banner" />
                </div>
                <div className={styles.EventMetadata}>
                    <div className={styles.MetadataRow}>
                        <div>
                            <h4>Κατηγορία Δράσης</h4>
                            <Link href={`/events?categories=${category}`}>
                                <p>{category}</p>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.MetadataRow}>
                        <div>
                            <h4> Παρακολούθηση </h4>
                            <div className={styles.StreamingPlatfromsContainer}>
                                {links.map((link) => (
                                    <Link href={link} target='_blank' rel='noreferrer'>
                                        <Image width={40} height={40} src={getStreamingPlatformImgSrc(link)} alt='Steaming Platform Icon' />
                                    </Link>
                                ))}
                            </div>
                        </div>
                        {resources && (
                            <div>
                                <h4>Υλικό</h4>
                                <Link href={resources} target='_blank' rel='noreferrer'>
                                    <Image width={40} height={40} src='/folder.png' alt='Resources' />
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className={styles.MetadataRow}>
                        <div>
                            <h4>Επιστήμες</h4>
                            <ScienceIcons sciences={sciences} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.EventDetailsColumn}>
                <h1>{title}</h1>
                <p className={styles.EventDate}>{timestampDateToString(date)}</p>
                {html(content)}
            </div>
        </div>
    )
}
