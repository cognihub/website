import {
    getDownloadURL,
    getBytes, listAll,
    ref,
    uploadBytes,
} from 'firebase/storage'
import { storage } from './init'

function qualifyFilePathForFirebaseStorage(directoryName, fileName) {
    return directoryName + '/' + fileName
}

export async function uploadFileToDirectoryWithName(directoryName, fileName, file) {
    const filePathOnFirebaseStorage = qualifyFilePathForFirebaseStorage(directoryName, fileName)

    const fileRefToStorage = ref(storage, filePathOnFirebaseStorage)

    await uploadBytes(fileRefToStorage, file)
    const fileDownloadUrl = await getDownloadURL(fileRefToStorage, qualifyFilePathForFirebaseStorage(directoryName, fileName))

    return fileDownloadUrl
}

export async function fetchAndAddStorageFilesToZip(zip, directoryPath = '') {
    const directoryContentsRef = ref(storage, directoryPath)
    const directoryContents = await listAll(directoryContentsRef)

    for (const file of directoryContents.items) {
        const filePath = file._location.path_
        const fileRef = ref(storage, filePath)
        const fileBytes = await getBytes(fileRef)
        zip.file(file.fullPath, fileBytes)
    }

    for (const folder of directoryContents.prefixes) {
        const directoryPath = folder._location.path_

        await fetchAndAddStorageFilesToZip(zip, directoryPath)
    }
}

export async function resolveGoogleStorageLocationToDownloadUrl(gsLocation) {
    const fileRefToStorage = ref(storage, gsLocation)
    const fileDownloadUrl = await getDownloadURL(fileRefToStorage)
    return fileDownloadUrl
}
