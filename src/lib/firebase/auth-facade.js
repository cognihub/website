import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './init'

export async function loginToFirebaseWithEmailAndPassword(email, password) {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password)
    return userCredentials.user
}
