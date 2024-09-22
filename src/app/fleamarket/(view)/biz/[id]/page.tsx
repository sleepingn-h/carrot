import type { FetchBizArticle } from '@/model/article';
import { getArticle } from '@/lib/firebase/firebase-database';
import ArticleBizDetails from '@/components/article/ArticleBizDetails';

const BizPage = async ({ params }: { params: { id: string } }) => {
  const biz = await getArticle<FetchBizArticle>('biz', params.id);

  return <ArticleBizDetails {...biz} />;
};

export default BizPage;
