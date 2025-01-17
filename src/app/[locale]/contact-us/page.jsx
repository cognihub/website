'use client'

import { useFormState } from 'react-dom'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { communicateWithCognihub } from '@/app/actions'
import { useTheme } from '@/components/Navbar/hooks'
import FormButton from '@/components/FormButton/FormButton'
import ReCAPTCHA from 'react-google-recaptcha'

import styles from './ContactUs.module.css'
import config from '@/lib/config'

export default function Page() {
    const t = useTranslations('Navbar')
    const [theme, toggleTheme] = useTheme()

    const [isVerified, setIsVerified] = useState(false)

    const [message, formAction] = useFormState(communicateWithCognihub, '')

    const handleCaptchaSubmission = async (token) => {
        try {
            if (token) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/el/contact-us/recaptcha`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token })                
                })

                if(response.ok) setIsVerified(true)
                else throw new Error("Error with our site's end")
            }
        } catch (e) {
            setIsVerified(false)
            throw e
        }
    }
    
    const handleChange = async (token) => {
        await handleCaptchaSubmission(token)
    }

    const handleExpired = () => {
        setIsVerified(false);
    }

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
                <ReCAPTCHA
                    sitekey={config.recaptcha.siteKey}
                    onChange={handleChange}
                    onExpired={handleExpired}
                    theme={theme}
                />
                <FormButton message={message} disabled={!isVerified} />
            </form>
        </div>
    )
}
