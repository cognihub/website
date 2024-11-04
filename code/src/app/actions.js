'use server'

import {
    formDateToFirebaseDate,
    performPostRequestWithJsonBody,
} from '@/lib/util'
import {
    createOrEditAnnouncement,
    createOrEditEvent,
    loginToCognihub,
} from '@/lib/cognihub-facade'
import {
    deleteCookie,
    encryptUserAndSetCookie,
    isUserLoggedIn,
} from '@/lib/auth'
import {
    printInternalServerErrorMessage,
    printUserNotLoggedInErrorMessage,
} from '@/lib/errors'
import { revalidatePath } from 'next/cache'
import config from '../lib/config.json'
import { redirect } from '@/i18n/routing'

export async function communicateWithCognihub(prevState, formData) {
    const emailRequest = {
        service_id: config.emailService.serviceId,
        template_id: config.emailService.templateId,
        user_id: config.emailService.userId,
        template_params: {
            reason: formData.get('reason'),
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            message: formData.get('message'),
        },
        accessToken: config.emailService.accessToken,
    }

    try {
        const response = await performPostRequestWithJsonBody(
            config.emailService.apiUrl,
            emailRequest
        )

        if (!response.ok) {
            const errorDetails = await res.text()
            console.log('Bad Request: ', errorDetails)
            return 'Υπήρξε πρόβλημα κατά την εγγραφή του αιτήματος.'
        }

        return '👍'
    } catch (error) {
        console.log('Internal Server Error:', error)
        return 'Υπήρξε πρόβλημα κατά την εγγραφή του αιτήματος.'
    }
}

export async function login(_currentState, formData) {
    try {
        // const user = { name: 'dev' }
        const user = await loginToCognihub(
            formData.get('email'),
            formData.get('password')
        )
        encryptUserAndSetCookie(user)
    } catch (error) {
        printInternalServerErrorMessage(error)
        return 'Ανεπιτυχής σύνδεση'
    }
    redirect('/auth/admin')
}

export async function logout() {
    if (!isUserLoggedIn()) {
        printUserNotLoggedInErrorMessage()
        return 'Ο χρήστης δεν έχει συνδεθεί'
    }

    deleteCookie()
    redirect('/')
}

export async function createOrEditEventAction(
    statefulFormData,
    id,
    prevState,
    formData
) {
    if (!isUserLoggedIn()) {
        printUserNotLoggedInErrorMessage()
        return 'Ο χρήστης δεν έχει συνδεθεί'
    }

    const eventBannerFile = formData.get('eventBanner')
    const eventData = {
        id: id,
        title: formData.get('title'),
        description: formData.get('description'),
        date: formDateToFirebaseDate(formData.get('date')),
        category: formData.get('category'),
        sciences: statefulFormData.sciences.map((science) => science.value),
        content: statefulFormData.content,
        links: formData.get('links').split(','),
        image: '',
        resources: formData.get('resources'),
    }

    try {
        await createOrEditEvent(eventBannerFile, eventData)
    } catch (error) {
        printInternalServerErrorMessage(error)
        return 'Υπήρξε σφάλμα κατά την αποθήκευση.'
    }

    redirect(`/events/${eventData.id}`)
}

export async function createOrEditAnnouncementAction(
    statefulFormData,
    id,
    prevState,
    formData
) {
    if (!isUserLoggedIn()) {
        printUserNotLoggedInErrorMessage()
        return 'Ο χρήστης δεν έχει συνδεθεί'
    }

    const announcementData = {
        id: id,
        title: formData.get('title'),
        description: formData.get('description'),
        date: formDateToFirebaseDate(formData.get('date')),
        content: statefulFormData.content,
        links: formData.get('links').split(','),
    }

    try {
        await createOrEditAnnouncement(announcementData)
    } catch (error) {
        printInternalServerErrorMessage(error)
        return 'Υπήρξε σφάλμα κατά την αποθήκευση.'
    }

    redirect(`/announcements`)
}
