import { useFormStatus } from 'react-dom'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

import styles from './FormButtom.module.css'

export default function FormButton({ message, placeholder = 'ΑΠΟΣΤΟΛΗ', disabled = false }) {
    const status = useFormStatus()
    return (
        <div className={styles.FormButtonContainer}>
            <button type='submit' disabled={disabled}>{placeholder}</button>
            <div>{status.pending ? <LoadingSpinner /> : message } </div>
        </div>
    )
}
