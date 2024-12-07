import { FirebaseError } from 'firebase/app'

export function printBadRequestErrorMessage(message) {
    console.log('Bad Request Error: ' + message)
}

export function printInternalServerErrorMessage(error) {
    if (error instanceof FirebaseError) console.log('Internal Server Error: Error with Firebase. Code: ' + error.code + ', Message: ' + error.message)
    else console.log('Internal Server Error: ' + error.message)
}

export function printAuthorizationErrorMessage(message) {
    console.log('Authorization Error: ' + message)
}

export function printUserNotLoggedInErrorMessage() {
    console.log('Authorization Error: You are not logged in.')
}

export class FirebaseClientError extends FirebaseError {
    constructor(error) {
        super('FirebaseClientError Error with code: ' + error.code + ', and message: ', error.message)
        this.name = this.constructor.name
    }
}
