'use client';

import type { SignupFormErrors, SignupFormData } from '@/model/user';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FocusEvent, FormEvent, useRef, useState, useTransition } from 'react';
import { createNewUserWithEmailAndPassword } from '@/lib/firebase/firebase-auth';
import { validateSignupFormData } from '@/lib/signup-form';
import Inputs from '@/components/input/Input';
import Trigger from '@/components/trigger/Trigger';
import styles from '../Auth.module.css';
import Align from '@/components/align/Align';
//https://nextjs.org/docs/app/building-your-application/authentication

const INITIAL_FORM_DATA: SignupFormData = {
  email: '',
  password: '',
  cPassword: '',
};

const RegisterClient = () => {
  const rotuer = useRouter();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const { errors } = validateSignupFormData(formData);
    if (errors && value.length > 0) {
      setErrors((error) => ({ ...error, [name]: errors[name as keyof typeof errors] }));
    } else {
      setErrors((error) => ({ ...error, [name]: [] }));
    }
  };

  const registerUser = async (e: FormEvent) => {
    e.preventDefault();
    const { errors, data } = validateSignupFormData(formData);

    if (errors) {
      setErrors(errors);
    } else {
      setErrors({});
      startTransition(() => {
        createNewUserWithEmailAndPassword({
          email: formData.email,
          password: formData.password,
          errorHandler: () => {
            setErrors((error) => ({
              ...error,
              email: ['이미 존재하는 이메일주소입니다. 이메일을 다시 확인해주세요.'],
            }));
            ref.current?.focus();
          },
        });
        rotuer.push('/');
      });
    }
  };

  return (
    <section className={styles.auth}>
      <form onSubmit={registerUser}>
        <Inputs.Root id='email' required>
          <Inputs.Label>이메일</Inputs.Label>
          <Inputs.Input
            type='email'
            placeholder='email@example.com'
            value={formData.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            onBlur={(e: FocusEvent<HTMLInputElement>) => handleBlur(e)}
            ref={ref}
          />
          {errors.email && <Inputs.Errors errorMessages={errors.email} />}
        </Inputs.Root>
        <Inputs.Root id='password' required>
          <Inputs.Label>비밀번호</Inputs.Label>
          <Inputs.Input
            type='password'
            placeholder='비밀번호'
            value={formData.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            onBlur={(e: FocusEvent<HTMLInputElement>) => handleBlur(e)}
            autoComplete='off'
          />
          {errors.password && <Inputs.Errors errorMessages={errors.password} />}
        </Inputs.Root>
        <Inputs.Root id='cPassword' required>
          <Inputs.Label>비밀번호 확인</Inputs.Label>
          <Inputs.Input
            type='password'
            placeholder='12341234'
            value={formData.cPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            onBlur={(e: FocusEvent<HTMLInputElement>) => handleBlur(e)}
            autoComplete='off'
          />
          {errors.cPassword && <Inputs.Errors errorMessages={errors.cPassword} />}
        </Inputs.Root>
        <Align>
          <Trigger type='submit' disabled={isPending}>
            {isPending ? '제출중...' : '제출'}
          </Trigger>
        </Align>
      </form>
    </section>
  );
};

export default RegisterClient;
