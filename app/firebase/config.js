import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBoOFpkelkGJ8NT_ezdpQmjwkozPy1AJQw',
  authDomain: 'workshop-b4dca.firebaseapp.com',
  databaseURL: 'https://workshop-b4dca.firebaseio.com',
  projectId: 'workshop-b4dca',
  storageBucket: 'workshop-b4dca.appspot.com',
  messagingSenderId: '663290691953',
  appId: '1:663290691953:android:617379ef6ed83f9b0076d0',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
};


export { firebase };