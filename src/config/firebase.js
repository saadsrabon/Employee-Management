import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBMiG4VSvTdNsELguuAYn_QnG2SZK7I7x0",
    authDomain: "dragon-news-auth-56265.firebaseapp.com",
    projectId: "dragon-news-auth-56265",
    storageBucket: "dragon-news-auth-56265.firebasestorage.app",
    messagingSenderId: "994066145554",
    appId: "1:994066145554:web:603af34dbe8ea59c9613cb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;