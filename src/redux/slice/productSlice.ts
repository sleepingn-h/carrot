import type { RootState } from '../store';
import type { FetchArticle, FetchNearby } from '@/model/article';
import { createSlice } from '@reduxjs/toolkit';

type ProductState = {
  products: FetchArticle[];
  nearby: FetchNearby[];
  minPrice: number;
  maxPrice: number;
};

const initialState: ProductState = {
  products: [],
  nearby: [],
  minPrice: 0,
  maxPrice: 10000,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    STORE_PRODUCTS: (state, action) => {
      state.products = action.payload.products;
    },
    STORE_NEARBY: (state, action) => {
      state.nearby = action.payload.nearby;
    },
  },
});

export const { STORE_PRODUCTS, STORE_NEARBY } = productSlice.actions;
export const selectProducts = (state: RootState) => state.product.products;
export const selectNearby = (state: RootState) => state.product.nearby;

export default productSlice.reducer;
