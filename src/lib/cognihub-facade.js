import JSZip from 'jszip'
import {
    createOrEditDocumentInCollection,
    fetchAndAddFirestoreCollectionsToZipFile,
    FirebaseQueryBuilder,
    getDocumentFromCollection,
    performFirebaseQueryAndReturnResults,
} from './firebase/firestore-facade'
import { fetchAndAddStorageFilesToZip, resolveGoogleStorageLocationToDownloadUrl, uploadFileToDirectoryWithName } from './firebase/storage-facade'
import { castParamToArrayIfNeeded, isObjectEmpty } from './util'
import { loginToFirebaseWithEmailAndPassword } from './firebase/auth-facade'

export async function getEvent(eventId) {
    return getDocumentFromCollection('events', eventId)
}

export async function getAnnouncement(announcementId) {
    return getDocumentFromCollection('announcements', announcementId)
}

export async function getEventsByDescendingOrder(searchParams = {}) {
    const categories = castParamToArrayIfNeeded(searchParams.categories)
    const scienceTags = castParamToArrayIfNeeded(searchParams.scienceTags)

    const eventQueryBuilder = new FirebaseQueryBuilder(
        new FirebaseQueryBuilder.OrderBy('date', 'desc')
    )

    eventQueryBuilder.setModelRef('events')

    const searchParamsPresent = () => !isObjectEmpty(searchParams)
        && (categories.length > 0 || scienceTags.length > 0)

    if (searchParamsPresent()) {
        const orConditions = []

        if (categories && categories.length > 0) {
            orConditions.push(
                new FirebaseQueryBuilder.Filter('category', 'in', categories)
            )
        }

        if (scienceTags && scienceTags.length > 0) {
            scienceTags.forEach((tag) => {
                orConditions.push(
                    new FirebaseQueryBuilder.Filter('sciences', 'array-contains', tag)
                )
            })
        }

        if (orConditions.length > 0) {
            eventQueryBuilder.setOrFilter(orConditions)
        }
    }

    if (searchParams.limit) {
        eventQueryBuilder.setLimit(searchParams.limit)
    }

    return performFirebaseQueryAndReturnResults(eventQueryBuilder.build())
}

export async function getAnnouncementsByDescendingOrderAndLimit(limit) {
    const announcementsQueryBuilder = new FirebaseQueryBuilder(
        new FirebaseQueryBuilder.OrderBy('date', 'desc')
    )

    announcementsQueryBuilder.setModelRef('announcements')

    if (limit) announcementsQueryBuilder.setLimit(limit)

    return performFirebaseQueryAndReturnResults(announcementsQueryBuilder.build())
}

export async function getFaQ() {
    const faqQueryBuilder = new FirebaseQueryBuilder(
        new FirebaseQueryBuilder.OrderBy('question', 'asc')
    )
    faqQueryBuilder.setModelRef('faq')
    return performFirebaseQueryAndReturnResults(faqQueryBuilder.build())
}

// Curently there isn't an admin panel for members administration implying direct access to firebase
export async function getMembers() {
    const faqQueryBuilder = new FirebaseQueryBuilder(
        new FirebaseQueryBuilder.OrderBy('name', 'asc')
    )
    faqQueryBuilder.setModelRef('members')
    const members = await performFirebaseQueryAndReturnResults(faqQueryBuilder.build())

    const membersWithDownloadablePhotos = await Promise.all(
        members.map(async (member) => {
            const photoUrl = await resolveGoogleStorageLocationToDownloadUrl(member.photo)
            return { ...member, photo: photoUrl }
        })
    )

    return membersWithDownloadablePhotos
}

export async function createOrEditEvent(eventBannerFile, eventData) {
    if (eventBannerFile.size > 0) {
        const fileDownloadUrl = await uploadFileToDirectoryWithName('events_banners', eventData.id, eventBannerFile)
        eventData.image = fileDownloadUrl
    }

    await createOrEditDocumentInCollection('events', eventData.id, eventData)
}

export async function createOrEditAnnouncement(announcementData) {
    await createOrEditDocumentInCollection('announcements', announcementData.id, announcementData)
}

export async function loginToCognihub(email, password) {
    const userInfo = await loginToFirebaseWithEmailAndPassword(email, password)
    return {
        email: userInfo.email,
        lastLoginTime: userInfo.metadata.lastSignInTime
    }
}

export async function backupCognihubAndReturnZipAsBlob() {
    const zip = new JSZip()

    try {
        await fetchAndAddFirestoreCollectionsToZipFile(zip, 'announcements', 'events', 'faq', 'members')
        await fetchAndAddStorageFilesToZip(zip)

        return zip.generateAsync({ type: 'blob' })
    } catch (err) {
        console.error('Error generating or saving the zip file:', err)
    }
}
