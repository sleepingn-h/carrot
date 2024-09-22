import type { User } from 'firebase/auth';
import type { UserLoginData } from './user';

export type CreateUserWithEmailAndPassword = UserLoginData & {
  errorHandler: () => void;
};

export type LoginUserWithEmailAndPassword = UserLoginData & {
  successHandler: () => void;
  errorHandler: () => void;
};

export type LoginWithGoogle = {
  successHandler: () => void;
};

export type OnUserStateChange = (user: User | null) => void;

export type AddProductImage = {
  file: File;
  dir: string;
  setUploadProgress?: (progress: number) => void;
};

export type ImageURL = string;
