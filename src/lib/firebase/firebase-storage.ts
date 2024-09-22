import type { AddProductImage, ImageURL } from '@/model/firebase';
import { storage } from './firebase-config';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export async function addArticleImage({
  file,
  dir,
  setUploadProgress,
}: AddProductImage): Promise<ImageURL> {
  const storageRef = ref(storage, `${dir}/${Date.now()}${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        if (setUploadProgress !== undefined) {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        }
      },
      (error) => reject(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref) //
          .then((downloadURL) => {
            setUploadProgress && setUploadProgress(0);
            resolve(downloadURL);
          });
      }
    );
  });
}

export async function deleteProductImage(imageURL: string) {
  const storageRef = ref(storage, imageURL);
  await deleteObject(storageRef);
}
