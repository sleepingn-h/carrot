import type { Comment, FetchNearby } from '@/model/article';
import { useEffect, useState } from 'react';
import formatDate from '@/utils/formatDate';
import ArticleUserProfile from './ArticleUserProfile';
import Chips from '../chips/Chips';
import CommentAction from '../comment/CommentAction';
import styles from './Article.module.css';

type Props = {
  data: FetchNearby;
};

const ArticleNearbyDetails = ({ data }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const onChangeComments = (comment: Comment) => setComments([...comments, comment]);

  useEffect(() => {
    data && setComments(data.comments);
  }, [data]);

  return (
    <>
      {data && (
        <section className={styles.details}>
          <Chips chips={data.category} />
          <div className={styles.user}>
            <ArticleUserProfile src={data.user.photoURL} alt={data.user.userName} />
            <div className={styles.info}>
              <p className={styles.nickname}>{data.user.userName}</p>
              <p className={styles.etc}>
                <span>{data.area}</span>
                <span>{formatDate(data.createdAt)}</span>
              </p>
            </div>
          </div>
          <div className={styles.biz}>
            <h2 className={styles.title}>{data.title}</h2>
            {data.content && <p className={styles.desc}>{data.content}</p>}
          </div>
          <CommentAction comments={comments} onChangeComments={onChangeComments} />
        </section>
      )}
    </>
  );
};

export default ArticleNearbyDetails;
