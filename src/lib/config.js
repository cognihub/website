const config = {
    'firebase': {
        'apiKey': process.env.FIREBASE_API_KEY,
        'authDomain': process.env.FIREBASE_AUTH_ADMIN,
        'projectId': process.env.FIREBASE_PROJECT_ID,
        'storageBucket': process.env.FIREBASE_STORAGE_BUCKET,
        'messagingSenderId': process.env.FIREBASE_MESSAGING_SENDER_ID,
        'appId': process.env.FIREBASE_APP_ID,
        'measurementId': process.env.FIREBASE_MEASUREMENT_ID
    },
    'emailService': {
        'apiUrl': process.env.EMAIL_SERVICE_API_URL,
        'serviceId': process.env.EMAIL_SERVICE_SERVICE_ID,
        'templateId': process.env.EMAIL_SERVICE_TEMPLATE_ID,
        'userId': process.env.EMAIL_SERVICE_USER_ID,
        'accessToken': process.env.EMAIL_SERVICE_ACCESS_TOKEN
    },
    'forms': {
        'suggestScientist': process.env.NEXT_PUBLIC_FORMS_SUGGEST_SCIENTIST,
        'suggestEvent': process.env.NEXT_PUBLIC_FORMS_SUGGEST_EVENT,
        'mentorHub': process.env.NEXT_PUBLIC_FORMS_MENTORHUB
    },
    'secretKey': process.env.SECRET_KEY
}

export default config;
