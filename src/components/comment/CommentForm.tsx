import type { Comment } from '@/model/article';
import { ChangeEvent, FormEvent } from 'react';
import { useParams } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import useFormArticle from '@/hooks/useFormArticle';
import Inputs from '../input/Input';
import styles from './CommentAction.module.css';
import { IoIosSend } from 'react-icons/io';

const INITIAL_COMMENT_DATA: Comment = {
  comment: '',
  user: {
    userID: '',
    userName: '',
    photoURL: '',
  },
};

type Props = {
  onChangeComments: (comment: Comment) => void;
};

const CommentForm = ({ onChangeComments }: Props) => {
  const { id } = useParams();
  const { uid, photoURL, userName } = useAuth();

  const {
    article: comment,
    setArticle: setComment,
    addedComment,
    updatedComment,
  } = useFormArticle<Comment>({
    ...INITIAL_COMMENT_DATA,
    user: {
      userID: uid,
      userName,
      photoURL,
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  const registerComment = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addedComment(comment, 'nearby', id! as string);
      const update = await updatedComment('nearby', id! as string);
      onChangeComments(update);
      setComment({
        ...INITIAL_COMMENT_DATA,
        user: {
          userID: uid,
          userName,
          photoURL,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.form} onSubmit={registerComment}>
      <Inputs.Root className={styles.inputs} id='comment' dir='row' label required>
        <Inputs.Label>코멘트</Inputs.Label>
        <Inputs.Input
          placeholder='코멘트 입력해주세요'
          value={comment.comment}
          onChange={handleChange}
        />
        <Inputs.Button type='submit'>
          <span className='sr-only'>등록</span>
          <IoIosSend size={24} />
        </Inputs.Button>
      </Inputs.Root>
    </form>
  );
};

export default CommentForm;
