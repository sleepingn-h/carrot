import store from '@/redux/store';

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

export type ReduxProduct = {
  category: string;
  id: string;
  desc: string;
  name: string;
  imageURL: string;
  brand: string;
  price: number;
};
