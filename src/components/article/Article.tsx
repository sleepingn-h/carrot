'use client';

import type { FetchArticle, FetchBizArticle } from '@/model/article';
import { useEffect, useMemo, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import useArticleState from '@/hooks/useArticleState';
import { getAllCollections } from '@/lib/firebase/firebase-database';
import { GoPlus } from 'react-icons/go';
import ArticleLoadingSkeleton from './ArticleLoadingSkeleton';
import ArticleBizItem from './ArticleBizItem';
import ArticleItem from './ArticleItem';
import Trigger from '../trigger/Trigger';
import Align from '../align/Align';
import styles from './Article.module.css';

const Article = ({ articles }: { articles: (FetchArticle | FetchBizArticle)[] }) => {
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const [currentArticle, _] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(10);
  const [isLastArticle, setIsLastArticle] = useState(false);
  const { dispatch, STORE_PRODUCTS, article } = useArticleState();

  const articlesMemo = useMemo(
    async () =>
      await Promise.all([
        getAllCollections<FetchArticle>('products'),
        getAllCollections<FetchBizArticle>('biz'),
      ]) //
        .then((res) => {
          const article = [...res[0], ...res[1]].sort(
            (a, b) =>
              new Date(b.editedAt?.seconds ?? b.createdAt.seconds).getTime() -
              new Date(a.editedAt?.seconds ?? a.createdAt.seconds).getTime()
          );
          setData(article);
        }),
    []
  );

  const indexOfLastArticle = currentArticle * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = data.slice(indexOfFirstArticle, indexOfLastArticle);

  const handleClick = () => setArticlesPerPage((prev) => prev + articlesPerPage);
  useEffect(() => {
    if (data.length !== 0) {
      articlesPerPage >= data.length && setIsLastArticle(!isLastArticle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articlesPerPage]);

  useEffect(() => {
    dispatch(STORE_PRODUCTS({ products: data }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dispatch]);

  if (currentArticles.length === 0)
    return <ArticleLoadingSkeleton articles={articles} type='article' />;

  return (
    <>
      <section className={styles.article}>
        {currentArticles.map((article: FetchArticle | FetchBizArticle) => {
          switch (article.__type) {
            case 'products':
              return <ArticleItem key={article.id} {...(article! as FetchArticle)} />;

            case 'biz':
              return <ArticleBizItem key={article.id} {...(article! as FetchBizArticle)} />;
            default:
              break;
          }
        })}
      </section>
      {data.length > articlesPerPage && (
        <Align dir='center' width='auto'>
          <Trigger
            className={styles.more}
            size='sm'
            bgColor='secondary'
            disabled={isLastArticle}
            onClick={handleClick}
          >
            더보기
          </Trigger>
        </Align>
      )}
      {token && (
        <Trigger className={styles.write} size='sm' href={'/fleamarket/add-product'}>
          <GoPlus size={20} />
          <span>글쓰기</span>
        </Trigger>
      )}
    </>
  );
};

export default Article;
