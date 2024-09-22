import type { FetchBizArticle } from '@/model/article';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Article.module.css';

const ArticleItem = ({ ...article }: FetchBizArticle) => {
  const { imageURL, name, id, area } = article;
  return (
    <article className={styles.item}>
      <Link href={`/fleamarket/biz/${id}`}>
        <div className={styles.image}>
          <Image src={imageURL} alt={name} width={300} height={300} />
        </div>
        <div className={styles['item-desc']}>
          <h3 className={styles.title}>
            <span>{name}</span>
          </h3>
          <p className={styles.etc}>
            <span>{area}</span>
            <span className={styles.biz}>광고</span>
          </p>
        </div>
      </Link>
    </article>
  );
};

export default ArticleItem;
