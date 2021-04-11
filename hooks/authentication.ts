import firebase from 'firebase/app';
import { User } from '../models/Users';
import { atom, useRecoilState } from 'recoil';
import { useEffect } from 'react';

const userState = atom<User>({
  key: 'user',
  default: null,
});
export function useAuthentication() {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    console.log('Start useEffect');
    firebase
      .auth()
      .signInAnonymously()
      .catch((error) => {
        console.log(error);
      });

    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const loginUser: User = {
          uid: firebaseUser.uid,
          isAnonymous: firebaseUser.isAnonymous,
          name: '',
        };
        setUser(loginUser);
        createUserIfNotFound(loginUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });
  }, []);

  return { user };
}

async function createUserIfNotFound(user: User) {
  const userRef = firebase.firestore().collection('users').doc(user.uid);
  const doc = await userRef.get();
  if (doc.exists) {
    //
    return;
  }
  await userRef.set({
    name: 'taro' + new Date().getTime(),
  });
}
