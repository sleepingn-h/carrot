import { getAllCollections } from '@/lib/firebase/firebase-database';
import Article from '@/components/article/Article';
import Heading from '@/components/heading/Heading';
import { FetchArticle, FetchBizArticle } from '@/model/article';

const FleamarketPage = async () => {
  const articles = await Promise.all([
    getAllCollections<FetchArticle>('products'),
    getAllCollections<FetchBizArticle>('biz'),
  ]) //
    .then((res) => {
      const article = [...res[0], ...res[1]].sort(
        (a, b) =>
          new Date(b.editedAt?.seconds ?? b.createdAt.seconds).getTime() -
          new Date(a.editedAt?.seconds ?? a.createdAt.seconds).getTime()
      );

      return JSON.parse(JSON.stringify(article));
    });

  return (
    <>
      <Heading align='center' title='중고거래 최신매물' className='fz600' />
      <Article articles={articles} />
    </>
  );
};

export default FleamarketPage;
