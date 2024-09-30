import styles from './ArticleLoadingSkeleton.module.css';

type Props = {
  type: 'article' | 'nearby';
};

const ArticleLoadingSkeleton = ({ ...props }: Props) => {
  switch (props.type) {
    case 'article':
      return (
        <div className={styles.article}>
          {[...new Array(10)].map((_, index) => (
            <article className={styles.item} key={`article${index}`}>
              <div className={styles.link}>
                <div className={styles.image} />
                <div className={styles['item-desc']}>
                  <div className={styles.title}>제목</div>
                  <div className={styles.price}>가격</div>
                  <div className={styles.etc}>
                    <span>Etc</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      );
    case 'nearby':
      return (
        <div className={styles.nearby}>
          {[...new Array(10)].map((_, index) => (
            <article className={styles.list} key={`nearby${index}`}>
              <div>
                <div className={styles.chips}>카테고리</div>
                <div className={styles['item-desc']}>
                  <div className={styles.title}>제목</div>
                  <div className={styles.row}>
                    <div className={styles.etc}>
                      <span>Etc</span>
                    </div>
                    <div className={styles.comment}>0</div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      );

    default:
      return;
  }
};

export default ArticleLoadingSkeleton;
