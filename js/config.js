const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || 'AIzaSyDVSASjewTZJexL64aFf3nQL2gA5bzO5b4',
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'taichungbus-a6cc5.firebaseapp.com',
    projectId: process.env.FIREBASE_PROJECT_ID || 'taichungbus-a6cc5',
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'taichungbus-a6cc5.firebasestorage.app',
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '959390803671',
    appId: process.env.FIREBASE_APP_ID || '1:959390803671:web:bc5c79576e5884737cf292',
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || 'G-2W3F922KRZ',
    databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://taichungbus-a6cc5-default-rtdb.asia-southeast1.firebasedatabase.app'
};

export { firebaseConfig }; 