import type { SelectOptions } from '@/components/select/Select';
import { useCallback, useEffect, useState } from 'react';
import {
  addComment,
  addNewArticle,
  deleteArticle,
  editArticle,
  updateComment,
} from '@/lib/firebase/firebase-database';
import { addArticleImage, deleteProductImage } from '@/lib/firebase/firebase-storage';
import { Comment } from '@/model/article';

export const categories: SelectOptions[] = [
  { id: '1', name: '디지털기기' },
  { id: '2', name: '생활가전' },
  { id: '3', name: '가구/인테리어' },
  { id: '4', name: '생활/주방' },
  { id: '5', name: '유아동' },
  { id: '6', name: '유아도서' },
  { id: '7', name: '여성의류' },
  { id: '8', name: '여성잡화' },
  { id: '9', name: '남성패션/잡화' },
  { id: '10', name: '뷰티/미용' },
  { id: '11', name: '스포츠/레저' },
  { id: '12', name: '취미/게임/음반' },
  { id: '13', name: '도서' },
  { id: '14', name: '티켓/교환권' },
  { id: '15', name: '가공식품' },
  { id: '16', name: '건강기능식품' },
  { id: '17', name: '반려동물용품' },
  { id: '18', name: '식물' },
  { id: '19', name: '기타 중고물품' },
];

export default function useFormArticle<T>(data: T) {
  const [article, setArticle] = useState<T>({ ...data });
  const [uploadProgress, setUploadProgress] = useState(0);

  const downloaImagedURL = useCallback(
    (file: File) => addArticleImage({ file, dir: 'images', setUploadProgress }),
    []
  );
  const deleteImageURL = useCallback(async (imageURL: string) => deleteProductImage(imageURL), []);
  const added = useCallback(
    async (article: T, fileds: string) => addNewArticle(article, fileds),
    []
  );
  const addedComment = useCallback(
    async (comments: T, fileds: string, id: string) => await addComment(comments, fileds, id),
    []
  );
  const updatedComment = useCallback(
    async (fileds: string, id: string) => await updateComment<Comment>(fileds, id),
    []
  );
  const edited = useCallback(
    async (article: T, id: string, fileds: string) => editArticle(article, id, fileds),
    []
  );

  const deleted = useCallback(async (id: string, imageURL: string, fileds: string) => {
    await deleteArticle(id, fileds);
    await deleteProductImage(imageURL);
  }, []);

  const getArticle = useCallback(() => {
    setArticle(data);
  }, [data]);

  useEffect(() => {
    getArticle();
  }, [getArticle]);

  useEffect(() => {
    setArticle(article);
  }, [article]);

  return {
    article,
    setArticle,
    uploadProgress,
    downloaImagedURL,
    deleteImageURL,
    added,
    edited,
    deleted,
    addedComment,
    updatedComment,
  };
}
