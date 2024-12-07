import Image from 'next/image'
import { Link } from '@/i18n/routing'

import styles from './HelpUs.module.css'

const helpUsBy = [
    {
        youAre: 'Φοιτητές',
        youCanHelpUsBy:
            'Παρουσίασέ μας το ερευνητικό σου έργο ή μίλησέ μας για την εμπειρία σου.',
        anchorId: 'stud',
        icon: '/student.png',
        altImage: 'Student Icon'
    },
    {
        youAre: 'Ειδικοί',
        youCanHelpUsBy:
            'Μιλήστε μας για το αντικείμενό σας και εμείς θα σας προτείνουμε το κατάλληλο είδος δράσης',
        anchorId: 'experts',
        icon: '/scientist.png',
        altImage: 'Scientist Icon'
    },
    {
        youAre: 'Επιχειρήσεις',
        youCanHelpUsBy:
            'Μοιραστείτε μαζί μας τις εμπειρίες και τις συμβουλές σας. Από την πλευρά μας θα φροντίσουμε να συγκεντρώσουμε τις απορίες των φοιτητών.',
        anchorId: 'enterprise',
        icon: '/enterprise.png',
        altImage: 'Enterprise Icon'
    },
    {
        youAre: 'Οργανισμοί',
        youCanHelpUsBy:
            'Θα χαρούμε να εξετάσουμε τρόπους συνεργασίας ή διοργάνωσης κοινών δράσεων',
        anchorId: 'org',
        icon: '/organization.png',
        altImage: 'Organization Icon'
    },
]

export default function HelpUs() {
    return (
        <div className={styles.HelpUsContainer}>
            <h2><Link href='/cooperate'>Ας συνεργαστούμε</Link></h2>
            <p>↓</p>
            <div className={styles.CardsContainer}>
                {helpUsBy.map((idea) => (
                    <div className={styles.HelpUsCard} key={idea.anchorId}>
                        <div className='tape' />
                        <div className={styles.HelpUsShortInfoContainer}>
                            <Image src={idea.icon} width={52} height={52} alt={idea.altImage} />
                            <Link href='/cooperate'>
                                <h2> {idea.youAre} </h2>
                            </Link>
                        </div>
                        <p> {idea.youCanHelpUsBy} </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
