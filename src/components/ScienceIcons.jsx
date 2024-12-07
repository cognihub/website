import { Icon } from '@iconify/react'
import Tooltip from './Tooltip/Tooltip'
import { Link } from '@/i18n/routing'

import styles from './components.module.css'

const SCIENCE_ICON = {
    'Ψυχολογία': 'hugeicons:brain-02',
    'Γνωσιακή Επιστήμη': 'fluent:brain-circuit-20-regular',
    'Πληροφορική': 'ph:code-bold',
    'Βιολογία': 'streamline:ecology-science-dna-biology-experiment-lab-science',
    'Νευροεπιστήμη': 'eos-icons:neural-network',
    'Τεχνητή Νοημοσύνη': 'eos-icons:ai',
    'Επικοινωνία Επιστήμης': 'streamline:ai-science-spark',
    'Γλωσσολογία': 'lucide:speech'
}

export function ScienceIcons({ sciences, activeLink = true }) {
    return (
        <div className={styles.ScienceIconsContainer}>
            {sciences.map((science) => (
                <Tooltip key={science} title={science} position='bottom-left'>
                    {
                        activeLink
                            ? <Link href={`/events?scienceTags=${science}`} aria-label={science}><Icon icon={SCIENCE_ICON[science]} width='24' /></Link>
                            : <Icon icon={SCIENCE_ICON[science]} width='24' />
                    }
                </Tooltip>
            ))}
        </div>
    )
}
