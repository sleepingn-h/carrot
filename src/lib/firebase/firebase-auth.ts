import type {
  CreateUserWithEmailAndPassword,
  LoginUserWithEmailAndPassword,
  LoginWithGoogle,
  OnUserStateChange,
} from '@/model/firebase';
import { auth, provider } from './firebase-config';
import {
  Auth,
  createUserWithEmailAndPassword,
  getIdToken,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { AuthProps, SimpleUser } from '@/model/user';
import { getBizUser } from './firebase-database';

export function loginEmailAndPassword({
  email,
  password,
  successHandler,
  errorHandler,
}: LoginUserWithEmailAndPassword) {
  signInWithEmailAndPassword(auth, email, password) //
    .then(() => {
      successHandler();
    })
    .catch((error) => {
      console.error('login-email', error.code);
      if (error.code === 'auth/invalid-credential') {
        errorHandler();
      }
    });
}

export function loginGoogle({ successHandler }: LoginWithGoogle) {
  signInWithPopup(auth, provider) //
    .then((user) => {
      successHandler();
    })
    .catch((error) => console.error('login-google', error));
}

export function logout(handler: () => void) {
  signOut(auth) //
    .then(() => {
      handler();
      console.log('@@@');
    })
    .catch((error) => console.error('logout', error));
}

export function createNewUserWithEmailAndPassword({
  email,
  password,
  errorHandler,
}: CreateUserWithEmailAndPassword) {
  createUserWithEmailAndPassword(auth, email, password) //
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        console.error('createuser', error);
        errorHandler();
      }
    });
}

export function onUserStateChange(callback: OnUserStateChange) {
  onAuthStateChanged(auth, (user) => {
    if (user?.displayName === null) {
      const uName = user.email!.substring(0, user.email!.indexOf('@'));
      updateProfile(user, { displayName: uName });
    }

    callback(user);
  });
}
async function getCurrentUser(auth: Auth) {
  await auth.authStateReady();
  if (!auth.currentUser) return;

  return auth.currentUser;
}

async function getAuthIdToken(auth: Auth) {
  await auth.authStateReady();
  if (!auth.currentUser) return;

  return await getIdToken(auth.currentUser);
}

export async function onUserIdTokenChanged(): Promise<AuthProps> {
  return new Promise((resolve, reject) => {
    auth.onIdTokenChanged(async (user) => {
      try {
        if (user) {
          const bizUser = await getBizUser(user);

          if (user?.displayName === null) {
            const uName = user.email!.substring(0, user.email!.indexOf('@'));
            updateProfile(user, { displayName: uName });
          }

          resolve({
            uid: user.uid,
            token: await user.getIdToken(),
            currentUser: await getCurrentUser(auth),
            bizUser: user.uid === bizUser,
            userName: user.displayName,
            photoURL: user.photoURL,
          });
        }
      } catch (error) {
        reject('No Logged In User!');
      }
    });
  });
}

export async function getUserIdToken(): Promise<SimpleUser> {
  return new Promise((resolve, reject) => {
    auth.onIdTokenChanged(async (user) => {
      try {
        if (user) {
          resolve(user);
        }
      } catch (error) {
        reject('No Logged In User!');
      }
    });
  });
}

export function updateUserProfile(displayName?: string, photoURL?: string) {
  onAuthStateChanged(auth, (user) => {
    updateProfile(user, { displayName, photoURL });
  });
}
