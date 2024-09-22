'use client';

import type { FetchNearby } from '@/model/article';
import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { getArticle } from '@/lib/firebase/firebase-database';
import ArticleNearbyDetails from '@/components/article/ArticleNearbyDetails';

const NearbyPostClient = () => {
  const { id } = useParams();
  const [nearby, setNearby] = useState<FetchNearby>();
  const data = useMemo(
    async () =>
      await getArticle<FetchNearby>('nearby', id! as string) //
        .then((res) => setNearby(res)),
    [id]
  );

  return <ArticleNearbyDetails data={nearby} />;
};

export default NearbyPostClient;
