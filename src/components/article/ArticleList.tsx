'use client';

import type { FetchNearby } from '@/model/article';
import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import useAuth from '@/hooks/useAuth';
import useArticleState from '@/hooks/useArticleState';
import { getAllCollections } from '@/lib/firebase/firebase-database';
import ArticleNearbyItem from './ArticleNearbyItem';
import Align from '../align/Align';
import Trigger from '../trigger/Trigger';
import { GoPlus } from 'react-icons/go';
import styles from './Article.module.css';
import ArticleLoadingSkeleton from './ArticleLoadingSkeleton';

const ArticleList = () => {
  const { token } = useAuth();
  const [data, setData] = useState<FetchNearby[]>([]);
  const [currentArticle, _] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(10);
  const [isLastArticle, setIsLastArticle] = useState(false);
  const articles = useMemo(async () => {
    // console.log('useMemo');
    await getAllCollections<FetchNearby>('nearby') //
      .then((res) => setData(res));
  }, []);
  const { dispatch, STORE_NEARBY, nearby } = useArticleState();

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
    dispatch(STORE_NEARBY({ nearby: data }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, data]);

  if (nearby.length === 0) return <ArticleLoadingSkeleton type='nearby' />;

  return (
    <>
      <section className={classNames(styles.article, styles.col)}>
        {currentArticles.map((nearby) => (
          <ArticleNearbyItem key={nearby.id} {...nearby} />
        ))}
      </section>
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
      {token && (
        <Trigger className={styles.write} size='sm' href={'/nearby/add-nearby'}>
          <GoPlus size={20} />
          <span>글쓰기</span>
        </Trigger>
      )}
    </>
  );
};

export default ArticleList;
