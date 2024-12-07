'use client'

import { useFormState } from 'react-dom'
import { useTranslations } from 'next-intl'
import { communicateWithCognihub } from '@/app/actions'
import FormButton from '@/components/FormButton/FormButton'

import styles from './ContactUs.module.css'

export default function Page() {
    const t = useTranslations('Navbar')

    const [message, formAction] = useFormState(communicateWithCognihub, '')

    return (
        <div className={styles.CommunicationPageContainer}>
            <h2>✉️ Επικοινωνία </h2>
            <p>
                Μη διστάσεις να επικοινωνήσεις μαζί μας για οποιαδήποτε πρόταση ή ερώτηση! <br />
                Μπορείς να στείλεις email στο cognihub [at] gmail [dot] gr ή να συμπληρώσεις την παρακάτω φόρμα:
            </p>
            <form action={formAction}>
                <input type='hidden' name='reason' value='I wanna contact Cognihub' />
                <div className={styles.NameAndEmailContainer}>
                    <div>
                        <label htmlFor='name'>Ονοματεπώνυμο</label>
                        <input className='InputFullWidth' placeholder='Το ονοματεπώνυμο σου' id='name' name='name' type='text' />
                    </div>
                    <div>
                        <label htmlFor='InterestedVolunteerMailInput'>Εmail</label>
                        <input className='InputFullWidth' placeholder='volunteer@mailbox.com' id='email' name='email' type='email' />
                    </div>
                </div>
                <label htmlFor='message' style={{ marginTop: '10px' }}>Μήνυμα</label>
                <textarea
                    className='InputFullWidth'
                    placeholder='Γράψε μας εδώ τον λόγο για τον οποία θα θέλατε να επικοινωνήσουμε'
                    id='message'
                    name='message'
                    style={{ height: '200px' }}
                />
                <FormButton message={message} />
            </form>
        </div>
    )
}
