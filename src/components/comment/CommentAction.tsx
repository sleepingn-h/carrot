import type { Comment } from '@/model/article';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredComments, SORT_COMMENTS } from '@/redux/slice/filterSlice';
import formatDate from '@/utils/formatDate';
import CommentForm from './CommentForm';
import styles from './CommentAction.module.css';
import ArticleUserProfile from '../article/ArticleUserProfile';
import useAuth from '@/hooks/useAuth';

type Props = {
  comments: Comment[];
  onChangeComments: (comment: Comment) => void;
};
const CommentAction = ({ comments, onChangeComments }: Props) => {
  const { uid } = useAuth();
  const [sort, setSort] = useState('sorting-earliest');
  const dispatch = useDispatch();
  const filteredComments = useSelector(selectFilteredComments);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setSort(e.target.id);

  useEffect(() => {
    dispatch(SORT_COMMENTS({ comments, sort }));
  }, [dispatch, comments, sort]);

  const sortComments = filteredComments.slice(0, comments.length);
  const isRadioSelected = (value: string) => sort === value;

  return (
    <div className={styles.comment}>
      <div className={styles.top}>
        <h3>
          댓글 <span>{comments.length}</span>
        </h3>
        <ul className={styles.sorting}>
          <li>
            <input
              type='radio'
              name='sorting'
              id='sorting-earliest'
              value='sorting-earliest'
              onChange={handleChange}
              checked={isRadioSelected('sorting-earliest')}
            />
            <label htmlFor='sorting-earliest'>등록순</label>
          </li>
          <li>
            <input
              type='radio'
              name='sorting'
              id='sorting-latest'
              value='sorting-latest'
              onChange={handleChange}
              checked={isRadioSelected('sorting-latest')}
            />
            <label htmlFor='sorting-latest'>최신순</label>
          </li>
        </ul>
      </div>
      {sortComments && (
        <ul className={styles.list}>
          {sortComments.map(({ comment, user, createdAt }, index) => (
            <li key={index}>
              <ArticleUserProfile src={user.photoURL} alt={user.userName} />
              <div className={styles.content}>
                <span className={styles.info}>
                  <span className={styles.name}>{user.userName}</span>
                  <span className={styles.date}>{formatDate(createdAt)}</span>
                </span>
                <span className={styles.comm}>{comment}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      {uid && <CommentForm onChangeComments={onChangeComments} />}
    </div>
  );
};

export default CommentAction;
