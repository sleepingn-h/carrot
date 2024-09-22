'use client';

import type { SimpleBizArticle } from '@/model/article';
import { ChangeEvent, FormEvent, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import useFormArticle, { categories } from '@/hooks/useFormArticle';
import Heading from '@/components/heading/Heading';
import Inputs from '@/components/input/Input';
import Trigger from '@/components/trigger/Trigger';
import Align from '@/components/align/Align';
import { HiOutlineInbox } from 'react-icons/hi';
import styles from '../../fleamarket/fleamarket.module.css';
import { useAuthContext } from '@/context/AuthContext';
import Select from '@/components/select/Select';

const INITIAL_ARTICLE_DATA: SimpleBizArticle = {
  __type: 'biz',
  user: {
    userID: '',
    userName: '',
    photoURL: '',
  },
  name: '',
  url: '',
  imageURL: '',
  area: '',
  category: '',
  desc: '',
};

const AddBizClient = () => {
  const router = useRouter();
  const { uid, userName, photoURL } = useAuthContext();
  const { article, setArticle, uploadProgress, downloaImagedURL, added } =
    useFormArticle<SimpleBizArticle>({
      ...INITIAL_ARTICLE_DATA,
      user: { userID: uid, userName, photoURL },
    });
  const [isPending, startTransition] = useTransition();
  const [inputImageURL, setInputImageURL] = useState('');

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

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const url = (await downloaImagedURL(file)) as string;

    setInputImageURL(file.name);
    setArticle({ ...article, imageURL: url });
  };

  const registerArticle = (e: FormEvent) => {
    e.preventDefault();

    startTransition(() => {
      try {
        added(article, 'biz');
        setArticle({ ...INITIAL_ARTICLE_DATA });
        router.push('/');
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <section className={styles.form}>
      <Heading title='광고 등록' />
      <form onSubmit={registerArticle}>
        <Inputs.Wrap>
          <Inputs.Root id='image' required>
            <Inputs.Label>광고 이미지</Inputs.Label>
            {uploadProgress === 0 ? null : (
              <div className={styles.progress}>
                <div className={styles['progress-bar']}>
                  {uploadProgress < 100
                    ? `Uploading... ${uploadProgress}%`
                    : `Uploading Complete ${uploadProgress}%`}
                </div>
              </div>
            )}
            <Inputs.Input value={inputImageURL} placeholder='이미지 URL' disabled />
          </Inputs.Root>
          <Inputs.Root id='imageURL' as='file' required>
            <Inputs.Label>
              <HiOutlineInbox size={24} /> 파일 선택
            </Inputs.Label>
            <Inputs.Input type='file' onChange={handleImageChange} accept='image/*' required />
          </Inputs.Root>
        </Inputs.Wrap>
        <Inputs.Root id='name' required>
          <Inputs.Label>광고 이름</Inputs.Label>
          <Inputs.Input
            placeholder='광고 이름을 입력해주세요'
            value={article.name ?? ''}
            onChange={handleChange}
          />
        </Inputs.Root>
        <Select
          id='category'
          label='카테고리'
          controls='categoryMenu'
          onChange={handleSelect}
          options={categories}
        />
        <Inputs.Root id='url'>
          <Inputs.Label>URL</Inputs.Label>
          <Inputs.Input
            placeholder='연결될 url을 입력해주세요'
            value={article.url ?? ''}
            onChange={handleChange}
          />
        </Inputs.Root>
        <Inputs.Root id='area'>
          <Inputs.Label>거래 지역</Inputs.Label>
          <Inputs.Input
            placeholder='거래 지역을 입력해주세요'
            value={article.area ?? ''}
            onChange={handleChange}
          />
        </Inputs.Root>
        <Inputs.Root id='desc'>
          <Inputs.Label>상세 내용</Inputs.Label>
          <Inputs.Textarea
            placeholder='상세 내용을 입력해주세요'
            value={article.desc ?? ''}
            onChange={handleChange}
          />
        </Inputs.Root>
        <Align dir='right' width='auto'>
          <Trigger type='submit' disabled={isPending}>
            {isPending ? '광고 등록중...' : '광고 등록하기'}
          </Trigger>
        </Align>
      </form>
    </section>
  );
};

export default AddBizClient;
