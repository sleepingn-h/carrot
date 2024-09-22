'use client';

import useAuth from '@/hooks/useAuth';
import Heading from '@/components/heading/Heading';
import Inputs from '@/components/input/Input';
import Trigger from '@/components/trigger/Trigger';
import Align from '@/components/align/Align';
import { ChangeEvent, FormEvent, useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { HiOutlineInbox } from 'react-icons/hi';
import { addArticleImage } from '@/lib/firebase/firebase-storage';
import { updateUserProfile } from '@/lib/firebase/firebase-auth';

type MYProps = {
  displayName: string;
  photoURL: string;
};

const INITIAL_MY_DATA = {
  displayName: '',
  photoURL: '',
};

const MyClient = () => {
  const router = useRouter();
  const { userName, photoURL } = useAuth();
  const [my, setMy] = useState<MYProps>(INITIAL_MY_DATA);
  const [inputImageURL, setInputImageURL] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMy({
      ...my,
      [name]: value,
    });
    console.log(my);
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const url = await addArticleImage({ file, dir: 'images/user' });
    setInputImageURL(file.name);
    setMy({ ...my, photoURL: url });
  };

  const registerMy = (e: FormEvent) => {
    e.preventDefault();

    try {
      startTransition(() => {
        updateUserProfile(my.displayName, my.photoURL);
        router.push('/');
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setMy({ displayName: userName, photoURL });
  }, [userName, photoURL]);

  return (
    <section>
      <Heading title='내 정보 수정' />
      <form onSubmit={registerMy}>
        <Inputs.Root id='displayName'>
          <Inputs.Label>이름</Inputs.Label>
          <Inputs.Input
            placeholder='이름을 입력해주세요'
            value={my.displayName || userName}
            onChange={handleChange}
          />
        </Inputs.Root>
        <Inputs.Wrap>
          <Inputs.Root id='image'>
            <Inputs.Label>프로필 이미지</Inputs.Label>
            <Inputs.Input value={inputImageURL} placeholder='이미지 URL' disabled />
          </Inputs.Root>
          <Inputs.Root id='imageURL' as='file'>
            <Inputs.Label>
              <HiOutlineInbox size={24} /> 파일 선택
            </Inputs.Label>
            <Inputs.Input type='file' onChange={handleImageChange} accept='image/*' />
          </Inputs.Root>
          <Inputs.Info>이미지 권장 사이즈: 40X40(가로X세로)</Inputs.Info>
        </Inputs.Wrap>
        <Align dir='right' width='auto'>
          <Trigger type='submit' disabled={isPending}>
            {isPending ? '회원정보 수정중...' : '회원정보 수정하기'}
          </Trigger>
        </Align>
      </form>
    </section>
  );
};

export default MyClient;
