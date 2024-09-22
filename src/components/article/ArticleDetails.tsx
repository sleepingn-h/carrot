import formatDate from '@/utils/formatDate';
import ArticleImage from './ArticleImage';
import ArticleUserProfile from './ArticleUserProfile';
import styles from './Article.module.css';
import { priceFormat } from '@/utils/formatUnit';

const ArticleDetails = ({ ...articles }) => {
  const {
    category,
    imageURL,
    area,
    name,
    createdAt,
    desc,
    price,
    user: { userName, photoURL },
  } = articles;

  const dates = formatDate(createdAt);

  return (
    <section className={styles.details}>
      <ArticleImage src={imageURL} alt={name} />
      <div className={styles.user}>
        <ArticleUserProfile src={photoURL} alt={userName} />
        <div className={styles.info}>
          <p className={styles.nickname}>{userName}</p>
          <p className={styles.etc}>
            <span>{area}</span>
          </p>
        </div>
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{name}</h2>
        <p className={styles.etc}>
          {category && <span>{category}</span>}
          <span>{dates}</span>
        </p>
        {price && (
          <p className={styles.price}>
            <em>{priceFormat(price)}</em>원
          </p>
        )}
        {desc && <p className={styles.desc}>{desc}</p>}
      </div>
    </section>
  );
};

export default ArticleDetails;
