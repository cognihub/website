'use client'

import { useFormState } from 'react-dom'
import { useState } from 'react'
import { MultiSelect } from 'react-multi-select-component'

import SunEditorForm from '@/components/SunEditor'
import FormButton from '@/components/FormButton/FormButton'

import { EVENT_CATEGORIES } from '@/lib/dictionaries/event-categories'
import { SCIENCE_TAGS } from '@/lib/dictionaries/science-tags'

import styles from '../../Form.module.css'

function NewEventBannerInput() {
    return (
        <input
            type='file'
            id='eventBanner'
            name='eventBanner'
            accept='image/png, image/gif, image/jpeg, image/jpg'
        />
    )
}

function CancellableNewEventBannerInput({ image }) {
    const [uploadNewImage, setUploadNewImage] = useState(image === '')

    const handleImageChangeOrCancel = () => {
        setUploadNewImage(!uploadNewImage)
    }

    return !uploadNewImage
        ? (
            <>
                <img src={image} width='100%' onClick={handleImageChangeOrCancel} />
                <p onClick={handleImageChangeOrCancel}>Κάντε κλικ στην εικόνα για να την αλλάξετε</p>
            </>
        )
        : (
            <>
                <input
                    type='file'
                    id='eventBanner'
                    name='eventBanner'
                    accept='image/png, image/gif, image/jpeg, image/jpg'
                />
                <p onClick={handleImageChangeOrCancel}>cancel</p>
            </>
        )
}

export default function EventForm({ serverAction, event }) {
    const {
        id, title, description, image, date, category, content, sciences, links, resources
    } = event

    const [statefulFormData, setStatefulFormData] = useState({
        sciences,
        content
    })

    const serverActionWithEventData = serverAction.bind(null, statefulFormData, id)

    const [message, formAction] = useFormState(serverActionWithEventData, '')

    const handleScienceChange = (updatedValues) => {
        setStatefulFormData({
            ...statefulFormData,
            sciences: updatedValues
        })
    }

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
                    <div className={styles.EventBannerFormContainer}>
                        <label htmlFor='eventBanner'>Εικόνα δράσης</label>
                        {image ? <CancellableNewEventBannerInput image={image} /> : <NewEventBannerInput />}
                    </div>
                    <label htmlFor='date'>Ημ/νία</label>
                    <input
                        className='InputFullWidth'
                        type='date'
                        id='date'
                        name='date'
                        defaultValue={date}
                        required
                    />
                    <label htmlFor='category'>Κατηγορία δράσης</label>
                    <select
                        className='InputFullWidth'
                        id='category'
                        name='category'
                        defaultValue={category}
                        required
                    >
                        {EVENT_CATEGORIES.map((eventCategory) => <option value={eventCategory.value}>{eventCategory.label}</option>)}
                    </select>
                    <label htmlFor='sciences'>Επιστήμες</label>
                    <MultiSelect
                        className={styles.MultiSelect}
                        id='sciences'
                        name='sciences'
                        value={statefulFormData.sciences}
                        options={SCIENCE_TAGS}
                        hasSelectAll={false}
                        disableSearch
                        overrideStrings={{
                            selectSomeItems: 'Διαθέσιμες επιλογές...',
                        }}
                        onChange={handleScienceChange}
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
                    <label htmlFor='message'>Υλικό</label>
                    <input
                        className='InputFullWidth'
                        type='text'
                        id='resources'
                        name='resources'
                        placeholder='Επικολλήστε το σύνδεσμο για το υλικό της δράσης'
                        defaultValue={resources}
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
