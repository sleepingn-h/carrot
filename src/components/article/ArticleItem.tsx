import type { FetchArticle } from '@/model/article';
import Link from 'next/link';
import Image from 'next/image';
import { priceFormat } from '@/utils/formatUnit';
import styles from './Article.module.css';

const ArticleItem = ({ ...article }: FetchArticle) => {
  const { imageURL, name, price, id, area } = article;

  return (
    <article className={styles.item}>
      <Link href={`/fleamarket/articles/${id}`}>
        <div className={styles.image}>
          <Image src={imageURL} alt={name} width={300} height={300} />
        </div>
        <div className={styles['item-desc']}>
          <h3 className={styles.title}>
            <span>{name}</span>
          </h3>
          <p className={styles.price}>
            <em>{priceFormat(price)}</em>원
          </p>
          <p className={styles.etc}>
            <span>{area}</span>
          </p>
        </div>
      </Link>
    </article>
  );
};

export default ArticleItem;
