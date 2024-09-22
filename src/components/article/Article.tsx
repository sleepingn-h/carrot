'use client';

import type { FetchArticle, FetchBizArticle } from '@/model/article';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { STORE_PRODUCTS } from '@/redux/slice/productSlice';
import { getAllCollections } from '@/lib/firebase/firebase-database';
import ArticleBizItem from './ArticleBizItem';
import ArticleItem from './ArticleItem';
import Trigger from '../trigger/Trigger';
import { GoPlus } from 'react-icons/go';
import styles from './Article.module.css';
import useAuth from '@/hooks/useAuth';

const Article = () => {
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const articles = useMemo(
    async () =>
      await Promise.all([
        getAllCollections<FetchArticle>('products'),
        getAllCollections<FetchBizArticle>('biz'),
      ]).then((res) => {
        const article = [...res[0], ...res[1]].sort(
          (a, b) =>
            new Date(b.editedAt?.seconds ?? b.createdAt.seconds).getTime() -
            new Date(a.editedAt?.seconds ?? a.createdAt.seconds).getTime()
        );
        return setData(article);
      }),
    []
  );

  useEffect(() => {
    dispatch(STORE_PRODUCTS({ products: articles }));
  }, [articles, dispatch]);

  return (
    <section className={styles.article}>
      {data.map((article: FetchArticle | FetchBizArticle) => {
        switch (article.__type) {
          case 'products':
            return <ArticleItem key={article.id} {...(article! as FetchArticle)} />;

          case 'biz':
            return <ArticleBizItem key={article.id} {...(article! as FetchBizArticle)} />;
          default:
            break;
        }
      })}
      {token && (
        <Trigger className={styles.write} size='sm' href={'/fleamarket/add-product'}>
          <GoPlus size={20} />
          <span>글쓰기</span>
        </Trigger>
      )}
    </section>
  );
};

export default Article;
