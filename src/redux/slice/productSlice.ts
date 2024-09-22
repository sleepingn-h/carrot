import type { RootState } from '../store';
import type { FetchArticle } from '@/model/article';
import { createSlice } from '@reduxjs/toolkit';

type ProductState = {
  products: FetchArticle[];
  minPrice: number;
  maxPrice: number;
};

const initialState: ProductState = {
  products: [],
  minPrice: 0,
  maxPrice: 10000,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    STORE_PRODUCTS(state, action) {
      state.products = action.payload.products;
    },
  },
});

export const { STORE_PRODUCTS } = productSlice.actions;
export const selectProducts = (state: RootState) => state.product.products;

export default productSlice.reducer;
