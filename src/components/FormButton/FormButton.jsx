import { useFormStatus } from 'react-dom'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

import styles from './FormButtom.module.css'

export default function FormButton({ message, placeholder = 'ΑΠΟΣΤΟΛΗ' }) {
    const status = useFormStatus()
    return (
        <div className={styles.FormButtonContainer}>
            <button type='submit'>{placeholder}</button>
            <div>{status.pending ? <LoadingSpinner /> : message } </div>
        </div>
    )
}
