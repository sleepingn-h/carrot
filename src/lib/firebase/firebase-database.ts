import type { User } from 'firebase/auth';
import type { FetchArticle, SimpleArticle } from '@/model/article';
import { db } from './firebase-config';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';

export async function getBizUser(user: User): Promise<string> {
  const querySnapshot = await getDocs(collection(db, 'bizUser'));

  try {
    return new Promise((resolve, reject) => {
      if (querySnapshot.size) {
        querySnapshot.forEach((doc) => {
          const bizUser = doc.data().uid;
          resolve(bizUser);
        });
      } else {
        reject('query returned no results');
      }
    });
  } catch (error) {
    console.error(error);
  }
}

export function addNewProduct(products: SimpleArticle) {
  addDoc(collection(db, 'products'), {
    ...products,
    price: Number(products.price),
    createdAt: Timestamp.now().toDate(),
  });
}

export function editProduct(products: FetchArticle, id: string) {
  setDoc(doc(db, 'products', id), {
    ...products,
    editedAt: Timestamp.now().toDate(),
  });
}

export async function deleteProduct(id: string) {
  await deleteDoc(doc(db, 'products', id));
}

// export async function getAllCollections(collectionName: string): Promise<FetchArticle[]> {
//   const docRef = collection(db, collectionName);
//   const q = query(docRef, orderBy('createdAt', 'desc'));

//   return new Promise((resolve, reject) => {
//     onSnapshot(q, (snapshot) => {
//       try {
//         const allData = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         })) as FetchArticle[];
//         resolve(allData);
//       } catch (error) {
//         reject(error);
//       }
//     });
//   });
// }

export async function getProduct(collectionName: string, documentID: string) {
  const docRef = doc(db, collectionName, documentID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    try {
      return {
        id: documentID,
        ...docSnap.data(),
      } as FetchArticle;
    } catch (error) {
      console.error(error);
    }
  }
}

//
export function addNewArticle<T>(article: T, fileds: string) {
  addDoc(collection(db, fileds), {
    ...article,
    createdAt: Timestamp.now().toDate(),
  });
}

export async function addComment<T>(comments: T, fileds: string, id: string) {
  const ref = doc(db, fileds, id);
  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    setDoc(ref, {
      ...docSnap.data(),
      comments: [
        ...docSnap.data().comments,
        {
          ...comments,
          createdAt: Timestamp.now().toDate(),
        },
      ],
    });
  } else {
  }
}

export async function updateComment<T>(fileds: string, id: string): Promise<T> {
  const ref = doc(db, fileds, id);

  return new Promise((resolve, reject) => {
    onSnapshot(ref, (snapshot) => {
      const comments = snapshot.data().comments;
      const latestComment: T = comments[comments.length - 1];

      try {
        resolve(latestComment);
      } catch (error) {
        reject(error);
      }
    });
  });
}

export function editArticle<T>(article: T, id: string, fileds: string) {
  setDoc(doc(db, fileds, id), {
    ...article,
    editedAt: Timestamp.now().toDate(),
  });
}

export async function deleteArticle(id: string, fileds: string) {
  await deleteDoc(doc(db, fileds, id));
}

export async function getAllCollections<T>(collectionName: string): Promise<T[]> {
  const docRef = collection(db, collectionName);
  const q = query(docRef, orderBy('createdAt', 'desc'));

  return new Promise((resolve, reject) => {
    onSnapshot(q, (snapshot) => {
      try {
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))! as T[];
        resolve(allData);
      } catch (error) {
        reject(error);
      }
    });
  });
}

export async function getArticle<T>(collectionName: string, documentID: string) {
  const docRef = doc(db, collectionName, documentID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    try {
      return {
        id: documentID,
        ...docSnap.data(),
      }! as T;
    } catch (error) {
      console.error(error);
    }
  }
}
