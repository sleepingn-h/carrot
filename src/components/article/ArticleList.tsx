'use client';

import type { FetchNearby } from '@/model/article';
import classNames from 'classnames';
import ArticleNearbyItem from './ArticleNearbyItem';
import Trigger from '../trigger/Trigger';
import { GoPlus } from 'react-icons/go';
import styles from './Article.module.css';
import useAuth from '@/hooks/useAuth';

type Props<T> = {
  data: T[];
};

const ArticleList = ({ data }: Props<FetchNearby>) => {
  const { token } = useAuth();

  return (
    <section className={classNames(styles.article, styles.col)}>
      {data.map((nearby) => (
        <ArticleNearbyItem key={nearby.id} {...nearby} />
      ))}
      {token && (
        <Trigger className={styles.write} size='sm' href={'/nearby/add-nearby'}>
          <GoPlus size={20} />
          <span>글쓰기</span>
        </Trigger>
      )}
    </section>
  );
};

export default ArticleList;
