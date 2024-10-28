'use client';

import type { SimpleArticle } from '@/model/article';
import { ChangeEvent, FormEvent, useState, useTransition } from 'react';
import { redirect, useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import useFormArticle, { categories } from '@/hooks/useFormArticle';
import Heading from '@/components/heading/Heading';
import Inputs from '@/components/input/Input';
import Trigger from '@/components/trigger/Trigger';
import Align from '@/components/align/Align';
import Select from '@/components/select/Select';
import { HiOutlineInbox } from 'react-icons/hi';
import styles from '../../fleamarket.module.css';

const INITIAL_PRODUCTS_DATA: SimpleArticle = {
  __type: 'products',
  user: {
    userID: '',
    userName: '',
    photoURL: '',
  },
  name: '',
  desc: '',
  category: '',
  imageURL: '',
  price: null,
  area: '',
  geocode: { lat: null, lng: null },
};

const AddProductClient = () => {
  const router = useRouter();
  const { uid, userName, photoURL } = useAuth();
  const { article, setArticle, uploadProgress, downloaImagedURL, added } =
    useFormArticle<SimpleArticle>({
      ...INITIAL_PRODUCTS_DATA,
      user: { userID: uid, userName, photoURL },
    });
  const [isPending, startTransition] = useTransition();
  const [inputImageURL, setInputImageURL] = useState('');

  if (!uid) {
    redirect('/');
  }

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

    startTransition(async () => {
      try {
        const geo = await fetch(`/api/fleamarket/${article.area}`) //
          .then((res) => res.json())
          .then((data) => setArticle({ ...article, geocode: { lat: data.x, lng: data.y } }));

        await added(article, 'products');
        setArticle({ ...INITIAL_PRODUCTS_DATA });
        router.push('/fleamarket');
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <section className={styles.form}>
      <Heading title='중고거래 상품 등록' />
      <form onSubmit={registerArticle}>
        <Inputs.Wrap>
          <Inputs.Root id='image' required>
            <Inputs.Label>상품 이미지</Inputs.Label>
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
          <Inputs.Label>상품 이름</Inputs.Label>
          <Inputs.Input
            placeholder='상품 이름을 입력해주세요'
            value={article.name ?? ''}
            onChange={handleChange}
          />
        </Inputs.Root>
        <Inputs.Root id='price' required>
          <Inputs.Label>상품 가격</Inputs.Label>
          <Inputs.Input
            type='number'
            placeholder='상품 가격을 입력해주세요'
            value={article.price ?? ''}
            onChange={handleChange}
          />
        </Inputs.Root>
        <Select
          id='category'
          label='카테고리'
          controls='categoryMenu'
          onChange={handleSelect}
          options={categories}
          required
        />
        <Inputs.Root id='area' required>
          <Inputs.Label>거래 장소</Inputs.Label>
          <Inputs.Input
            placeholder='거래할 장소를 입력해주세요'
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
            {isPending ? '상품 등록중...' : '상품 등록하기'}
          </Trigger>
        </Align>
      </form>
    </section>
  );
};

export default AddProductClient;
