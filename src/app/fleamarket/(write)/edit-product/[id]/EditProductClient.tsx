'use client';

import type { FetchArticle } from '@/model/article';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState, useTransition } from 'react';
import useFetchDocument from '@/hooks/useFetchDocument';
import useFormArticle, { categories } from '@/hooks/useFormArticle';
import Heading from '@/components/heading/Heading';
import Inputs from '@/components/input/Input';
import Trigger from '@/components/trigger/Trigger';
import Align from '@/components/align/Align';
import Select from '@/components/select/Select';
import { HiOutlineInbox } from 'react-icons/hi';
import styles from '../../../fleamarket.module.css';

type Params = {
  id: string;
};

const EditProductClient = () => {
  const { id } = useParams<Params>();
  const router = useRouter();
  const { document: data } = useFetchDocument<FetchArticle>('products', id);
  const { article, setArticle, uploadProgress, downloaImagedURL, deleteImageURL, edited } =
    useFormArticle<FetchArticle>(data);
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

    try {
      if (data.imageURL !== article.imageURL) {
        deleteImageURL(data.imageURL);
      }

      startTransition(async () => {
        const geo = await fetch(`/api/fleamarket/${article.area}`) //
          .then((res) => res.json())
          .then((data) => setArticle({ ...article, geocode: { lat: data.x, lng: data.y } }));

        await edited(article, id, 'products');
        router.push('/');
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.form}>
      <Heading title='중고 거래 상품 수정' />
      {article && (
        <form onSubmit={registerArticle}>
          <Inputs.Wrap>
            <Inputs.Root id='image'>
              <Inputs.Label>상품 이미지</Inputs.Label>
              {/* <Image src={article.imageURL} alt='' width={900} height={300} /> */}
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
            <Inputs.Root id='imageURL' as='file'>
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
              {isPending ? '상품 수정중...' : '상품 수정하기'}
            </Trigger>
          </Align>
        </form>
      )}
    </section>
  );
};

export default EditProductClient;
