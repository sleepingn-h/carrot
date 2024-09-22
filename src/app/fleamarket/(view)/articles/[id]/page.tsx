import type { FetchArticle } from '@/model/article';
import { getArticle } from '@/lib/firebase/firebase-database';
import ArticleDetails from '@/components/article/ArticleDetails';

const ArticlesPage = async ({ params }: { params: { id: string } }) => {
  const articles = await getArticle<FetchArticle>('products', params.id);

  return <ArticleDetails {...articles} />;
};

export default ArticlesPage;
