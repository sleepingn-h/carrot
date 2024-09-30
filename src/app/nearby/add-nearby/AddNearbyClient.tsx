'use client';

import type { Nearby } from '@/model/article';
import { ChangeEvent, FormEvent, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import useFormArticle from '@/hooks/useFormArticle';
import Heading from '@/components/heading/Heading';
import Inputs from '@/components/input/Input';
import Trigger from '@/components/trigger/Trigger';
import Align from '@/components/align/Align';
import LabelSelect, { LabelSelectOptionsProps } from '@/components/select/LabelSelect';
import { RiHomeHeartFill } from 'react-icons/ri';
import { FaUsers } from 'react-icons/fa';
import styles from './AddNearbyClient.module.css';

const categories: LabelSelectOptionsProps[] = [
  {
    __type: 'group',
    name: '동네정보',
    icons: <RiHomeHeartFill color='#3EC16B' size={20} />,
    fields: [
      { id: 'nearbyInfo1', name: '맛집' },
      { id: 'nearbyInfo2', name: '생활/편의' },
      { id: 'nearbyInfo3', name: '병원/약국' },
      { id: 'nearbyInfo4', name: '이사/시공' },
      { id: 'nearbyInfo5', name: '주거/부동산' },
      { id: 'nearbyInfo6', name: '교육' },
      { id: 'nearbyInfo7', name: '미용' },
    ],
  },
  {
    __type: 'group',
    name: '이웃과 함께',
    icons: <FaUsers color='#4A9FFF' size={20} />,
    fields: [
      { id: 'nearbyWith1', name: '반려동물' },
      { id: 'nearbyWith2', name: '운동' },
      { id: 'nearbyWith3', name: '고민/사연' },
      { id: 'nearbyWith4', name: '동네친구' },
      { id: 'nearbyWith5', name: '취미' },
      { id: 'nearbyWith6', name: '동네풍경' },
      { id: 'nearbyWith7', name: '임신/육아' },
    ],
  },
];

const INITIAL_NEARBY_DATA: Nearby = {
  category: '',
  title: '',
  content: '',
  user: {
    userID: '',
    userName: '',
    photoURL: '',
  },
  area: '',
  comments: [],
};

const AddNearbyClient = () => {
  const router = useRouter();
  const { uid, userName, photoURL } = useAuth();
  const { article, setArticle, added } = useFormArticle<Nearby>({
    ...INITIAL_NEARBY_DATA,
    user: { userID: uid, userName, photoURL },
  });
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setArticle({
      ...article,
      [name]: value,
    });
  };
  const handleSelect = (category: string) => {
    setArticle({ ...article, category });
  };
  const registerNearby = (e: FormEvent) => {
    e.preventDefault();

    startTransition(() => {
      try {
        added(article, 'nearby');
        setArticle({ ...INITIAL_NEARBY_DATA });
        router.push('/nearby');
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <section className={styles.form}>
      <Heading title='동네생활 글쓰기' />
      <form onSubmit={registerNearby}>
        <LabelSelect
          id='category'
          label='게시글 주제'
          controls='nearbyMenu'
          options={categories}
          onChange={handleSelect}
          variation='chips'
        />
        <Inputs.Root id='title' required>
          <Inputs.Label>제목</Inputs.Label>
          <Inputs.Input
            placeholder='제목을 입력해주세요'
            value={article.title ?? ''}
            onChange={handleChange}
          />
        </Inputs.Root>
        <Inputs.Root id='content'>
          <Inputs.Label>상세 내용</Inputs.Label>
          <Inputs.Textarea
            placeholder='상세 내용을 입력해주세요'
            value={article.content ?? ''}
            onChange={handleChange}
          />
        </Inputs.Root>
        <Inputs.Root id='area' required>
          <Inputs.Label>동네</Inputs.Label>
          <Inputs.Input
            placeholder='동네를 입력해주세요'
            value={article.area ?? ''}
            onChange={handleChange}
          />
        </Inputs.Root>
        <Align dir='right' width='auto'>
          <Trigger type='submit' disabled={isPending}>
            {isPending ? '등록중...' : '등록하기'}
          </Trigger>
        </Align>
      </form>
    </section>
  );
};

export default AddNearbyClient;
