import formatDate from '@/utils/formatDate';
import { HiLink } from 'react-icons/hi';
import ArticleImage from './ArticleImage';
import ArticleUserProfile from './ArticleUserProfile';
import Trigger from '../trigger/Trigger';
import styles from './Article.module.css';

const ArticleBizDetails = ({ ...biz }) => {
  const {
    category,
    imageURL,
    area,
    name,
    url,
    createdAt,
    desc,
    price,
    user: { userName, photoURL },
  } = biz;

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
            {category && <span>{category}</span>}
          </p>
        </div>
        {url && (
          <Trigger className={styles.link} size='sm' href={url} target='_blank'>
            <HiLink size={14} />
            바로가기
          </Trigger>
        )}
      </div>
      <div className={styles.biz}>
        <h2 className={styles.title}>{name}</h2>
        <p className={styles.etc}>
          <span>{dates}</span>
        </p>
        {price && (
          <p className={styles.price}>
            <em>{price}</em>원
          </p>
        )}
        {desc && <p className={styles.desc}>{desc}</p>}
      </div>
    </section>
  );
};

export default ArticleBizDetails;
