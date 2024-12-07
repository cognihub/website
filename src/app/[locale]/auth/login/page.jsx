'use client'

import { unstable_setRequestLocale } from 'next-intl/server'
import { useFormState } from 'react-dom'
import FormButton from '@/components/FormButton/FormButton'
import { login } from '@/app/actions'

import styles from './Login.module.css'

export default function Page() {
    const [message, formAction] = useFormState(login, '')

    return (
        <div className={styles.LoginPageContainer}>
            <h2>Σύνδεση Διαχειριστή</h2>
            <form action={formAction}>
                <label htmlFor='name'>Email</label>
                <input className='InputFullWidth' placeholder='Πληκτρολογήστε το διαχειριστικό email' id='email' name='email' type='email' required />
                <label htmlFor='InterestedVolunteerMailInput'>Password</label>
                <input className='InputFullWidth' placeholder='Πληκτρολογήστε το διαχειριστικό κωδικό' id='password' name='password' type='password' required />
                <FormButton message={message} placeholder='ΣΥΝΔΕΣΗ' />
            </form>
        </div>
    )
}
