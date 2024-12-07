import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import config from '../config';

initializeApp(config.firebase);

const firestore = getFirestore();
const storage = getStorage();
const auth = getAuth();

export { firestore, storage, auth };
