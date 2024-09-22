import type { FetchArticle } from '@/model/article';
import { getArticle } from '@/lib/firebase/firebase-database';
import { useCallback, useEffect, useState } from 'react';

export type DocumentId = {
  id: string;
};

export default function useFetchDocument<T>(collectionName: string, documentID: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [document, setDocument] = useState<T | null>(null);
  const getDocument = useCallback(async () => {
    setIsLoading(true);
    try {
      const doc = await getArticle<T>(collectionName, documentID);
      setDocument(doc);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [collectionName, documentID]);

  useEffect(() => {
    getDocument();
  }, [getDocument]);

  return { isLoading, document };
}
