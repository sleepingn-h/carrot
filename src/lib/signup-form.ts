import { z } from 'zod';
import type { SignupFormData, SignupFormErrors, ValidateSignupFormData } from '@/model/user';

export type SignupFormState =
  | {
      errors?: SignupFormErrors;
      message?: string;
    }
  | undefined;

export const SignupFormSchema = z
  .object({
    email: z //
      .string({
        required_error: 'Required',
      })
      .email({ message: '이메일 주소를 확인해주세요.' })
      .trim(),
    password: z
      .string({
        required_error: 'Required',
      })
      .min(8, { message: '8자 이상 입력해주세요.' })
      // .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      // .regex(/[0-9]/, { message: 'Contain at least one number.' })
      // .regex(/[^a-zA-Z0-9]/, {
      //   message: 'Contain at least one special character.',
      // })
      .trim(),
    cPassword: z
      .string({
        required_error: 'Required',
      })
      .min(8, { message: '8자 이상 입력해주세요.' })
      // .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      // .regex(/[0-9]/, { message: 'Contain at least one number.' })
      // .regex(/[^a-zA-Z0-9]/, {
      //   message: 'Contain at least one special character.',
      // })
      .trim(),
  })
  .refine(
    (values) => {
      return values.password === values.cPassword;
    },
    {
      message: '비밀번호가 일치하지 않습니다',
      path: ['cPassword'],
    }
  );

export const validateEachForm = (formData: SignupFormData) => {
  const validation = SignupFormSchema.parse(formData);
};

export const validateSignupFormData = (formData: SignupFormData): ValidateSignupFormData => {
  const validation = SignupFormSchema.safeParse(formData);

  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors;
    return { errors, data: null };
  }

  return { errors: null, data: validation.data };
};
