import firebase from 'firebase/app'
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCo5g6Xku2VYSgSDT9KR8LaoYvf2PPSKDg',
  authDomain: 'groceready.firebaseapp.com',
  projectId: 'groceready',
  storageBucket: 'groceready.appspot.com',
  appId: '1:1007333681801:android:3c3089ca3c06304ccf3458',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };