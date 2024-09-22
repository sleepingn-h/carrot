import type { FetchArticle } from '@/model/article';
import { getAllCollections } from '@/lib/firebase/firebase-database';
import { useCallback, useEffect, useState } from 'react';

const useFecthCollection = (collectionName: string) => {
  const [data, setData] = useState<FetchArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCollection = useCallback(async () => {
    setIsLoading(true);
    try {
      const collection = await getAllCollections<FetchArticle>(collectionName);
      setData(collection);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [collectionName]);

  useEffect(() => {
    getCollection();
  }, [getCollection]);

  return { data, isLoading };
};

export default useFecthCollection;
