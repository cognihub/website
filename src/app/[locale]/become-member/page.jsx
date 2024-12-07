'use client'

import { useFormState } from 'react-dom'
import { useTranslations } from 'next-intl'
import { communicateWithCognihub } from '@/app/actions'
import FormButton from '@/components/FormButton/FormButton'

import styles from './BecomeMember.module.css'

export default function Page() {
    const t = useTranslations('Navbar')

    const [message, formAction] = useFormState(communicateWithCognihub, '')

    return (
        <div className={styles.BecomeMemberPageContainer}>
            <h2>🤝 Θέλω να γίνω μέλος</h2>
            <p>
                Νέα μέλη γίνονται σε συγκεκριμένα χρονικά διαστήματα, μέσω open calls.
                Μπορείς να δηλώσεις το ενδιαφέρον σου στην παρακάτω φόρμα,
                και εμείς να σε βάλουμε σε σειρά προτεραιότητας στο επόμενό μας open call.
            </p>
            <form action={formAction}>
                <input type='hidden' name='reason' value='I wanna become member' />
                <label htmlFor='name'>Ονοματεπώνυμο</label>
                <input className='InputFullWidth' placeholder='Το ονοματεπώνυμο σου' id='name' name='name' type='text' />
                <label htmlFor='InterestedVolunteerMailInput'>Εmail</label>
                <input className='InputFullWidth' placeholder='volunteer@mailbox.com' id='email' name='email' type='email' />
                <label htmlFor='message' style={{ marginTop: '10px' }}>Motivation</label>
                <textarea
                    className='InputFullWidth'
                    placeholder='Γράψε μας εδώ τον λόγο για τον οποία θα ήθελες να συμμετάσχεις'
                    id='message'
                    name='message'
                    style={{ height: '200px' }}
                />
                <FormButton message={message} />
            </form>
        </div>
    )
}
