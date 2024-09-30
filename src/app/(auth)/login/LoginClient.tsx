'use client';

import type { UserLoginData } from '@/model/user';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import Inputs from '@/components/input/Input';
import Trigger from '@/components/trigger/Trigger';
import styles from '../Auth.module.css';
import Divider from '@/components/divider/Divider';

const INITIAL_FORM_DATA: UserLoginData = {
  email: '',
  password: '',
};

const LoginClient = () => {
  const router = useRouter();
  const { loginEmail, loginGoogle } = useAuthContext();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginUser = async (e: FormEvent) => {
    e.preventDefault();
    loginEmail({
      email: formData.email,
      password: formData.password,
      successHandler: () => {
        router.push('/');
      },
      errorHandler: () => {
        toast.error('이메일 주소 및 비밀번호를 확인해주세요!', {
          position: 'bottom-center',
          // hideProgressBar: true
        });
      },
    });
  };

  const loginWithGoogle = () => {
    loginGoogle({ successHandler: () => router.push('/') });
  };

  return (
    <section className={styles.auth}>
      <form onSubmit={loginUser}>
        <Inputs.Root id='email' required>
          <Inputs.Label>이메일</Inputs.Label>
          <Inputs.Input
            placeholder='james@gmail.com'
            value={formData.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            type='email'
          />
        </Inputs.Root>
        <Inputs.Root id='password' required>
          <Inputs.Label>비밀번호</Inputs.Label>
          <Inputs.Input
            placeholder='비밀번호'
            value={formData.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            autoComplete='off'
            type='password'
          />
        </Inputs.Root>
        <Trigger type='submit'>로그인</Trigger>
      </form>
      <Divider />
      <Trigger bgColor='gray' onClick={loginWithGoogle}>
        구글 로그인
      </Trigger>
      <Divider />
      <Trigger href='/register' bgColor='secondary'>
        회원가입
      </Trigger>
    </section>
  );
};

export default LoginClient;
