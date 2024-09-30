import type { FetchNearby } from '@/model/article';
import Link from 'next/link';
import formatDate from '@/utils/formatDate';
import Chips from '../chips/Chips';
import { FaRegComment } from 'react-icons/fa';
import styles from './Article.module.css';

const ArticleNearbyItem = ({ ...nearby }) => {
  const { id, category, title, createdAt, area, comments } = nearby;

  return (
    <article className={styles.list}>
      <Link href={`/nearby/${id}`}>
        <Chips chips={category} />
        <div className={styles['item-desc']}>
          <h3 className={styles.title}>
            <span>{title}</span>
          </h3>
          <div className={styles.row}>
            <p className={styles.etc}>
              <span>{area}</span>
              <span>{formatDate(createdAt)}</span>
            </p>
            <p className={styles.comment}>
              <FaRegComment size={14} />
              {comments.length}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ArticleNearbyItem;
