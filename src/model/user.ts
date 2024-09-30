import type { Auth, User } from 'firebase/auth';
import type { LoginUserWithEmailAndPassword, LoginWithGoogle } from './firebase';

export type SimpleUser = User;

export type AuthProps = {
  uid: string;
  token: string;
  currentUser: SimpleUser;
  bizUser: boolean;
  userName: string;
  photoURL: string;
};

export type UserLoginData = {
  email: string;
  password: string;
};

export type SignupFormData = UserLoginData & {
  cPassword: string;
};

export type SignupFormErrors = {
  email?: string[];
  password?: string[];
  cPassword?: string[];
};

export type ValidateSignupFormData = {
  errors: SignupFormErrors | null;
  data: Partial<SignupFormData> | null;
};

export type AuthLogin = {
  loginEmail: ({
    email,
    password,
    successHandler,
    errorHandler,
  }: LoginUserWithEmailAndPassword) => void;
  loginGoogle: ({ successHandler }: LoginWithGoogle) => void;
};

export type AuthLogout = {
  logout: (handler: () => void) => void;
};
