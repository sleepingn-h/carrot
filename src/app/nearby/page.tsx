import type { FetchNearby } from '@/model/article';
import { getAllCollections } from '@/lib/firebase/firebase-database';
import Heading from '@/components/heading/Heading';
import ArticleList from '@/components/article/ArticleList';

const NearbyPage = async () => {
  const nearby = await getAllCollections<FetchNearby>('nearby');

  return (
    <>
      <Heading align='center' title='동네생활' className='fz600' />
      <ArticleList data={nearby} />
    </>
  );
};

export default NearbyPage;
