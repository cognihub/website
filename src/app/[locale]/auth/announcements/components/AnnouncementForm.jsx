'use client'

import { useFormState } from 'react-dom'
import { useState } from 'react'

import SunEditorForm from '@/components/SunEditor'
import FormButton from '@/components/FormButton/FormButton'

import styles from '../../Form.module.css'

export default function AnnouncementForm({ serverAction, announcement }) {
    const {
        id, title, description, date, content, links
    } = announcement

    const [statefulFormData, setStatefulFormData] = useState({
        content
    })

    const serverActionWithAnnouncementData = serverAction.bind(null, statefulFormData, id)

    const [message, formAction] = useFormState(serverActionWithAnnouncementData, '')

    const handleContentChange = (updatedContent) => {
        setStatefulFormData({
            ...statefulFormData,
            content: updatedContent
        })
    }

    return (
        <form action={formAction}>
            <div className={styles.FormContainer}>
                <div className={styles.BasicInfoColumn}>
                    <label htmlFor='title'>Τίτλος</label>
                    <input
                        className='InputFullWidth'
                        type='text'
                        id='title'
                        name='title'
                        placeholder='Πληκτρολογήστε το τίτλο της νέας δράσης'
                        defaultValue={title}
                        required
                    />
                    <label htmlFor='description'>Περιγραφή</label>
                    <textarea
                        className='InputFullWidth'
                        type='text'
                        id='description'
                        name='description'
                        placeholder='Πληκτρολογήστε τη περιγραφή της νέας δράσης'
                        defaultValue={description}
                        style={{ height: '80px' }}
                        required
                    />
                    <label htmlFor='date'>Ημ/νία</label>
                    <input
                        className='InputFullWidth'
                        type='date'
                        id='date'
                        name='date'
                        defaultValue={date}
                        required
                    />
                    <label htmlFor='links'>Σύνδεσμοι</label>
                    <textarea
                        className='InputFullWidth'
                        type='text'
                        id='links'
                        name='links'
                        placeholder='Επικολλήστε τους συνδέσμους και βεβαιωθείτε ότι είναι χωρισμένοι με κόμμα. https://spotify.com/123, https://youtube.com/123'
                        style={{ height: '80px' }}
                        defaultValue={links}
                    />
                    <FormButton message={message} placeholder='ΟΛΟΚΛΗΡΩΣΗ'/>
                </div>
                <div className={styles.ContentColumn}>
                    <SunEditorForm defaultValue={content} handleContentChange={handleContentChange} />
                </div>
            </div>
        </form>
    )
}
