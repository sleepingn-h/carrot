import type { Comment, FetchArticle } from '@/model/article';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type FilterState = {
  filteredProducts: FetchArticle[];
  filteredComments: Comment[];
};

const initialState: FilterState = {
  filteredProducts: [],
  filteredComments: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    FILTER_BY_SEARCH: (
      state,
      action: { payload: { products: FetchArticle[]; search: string } }
    ) => {
      const { products, search } = action.payload;
      const tempProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredProducts = tempProducts;
    },
    SORT_COMMENTS: (state, action: { payload: { comments: Comment[]; sort: string } }) => {
      const { comments, sort } = action.payload;

      let tempComments: Comment[] = [];

      if (sort === 'sorting-earliest') {
        tempComments = comments;
      }
      if (sort === 'sorting-latest') {
        tempComments = comments
          .slice() //
          .sort((a, b) => {
            return (
              new Date(b.createdAt.seconds).getTime() - new Date(a.createdAt.seconds).getTime()
            );
          });
      }

      state.filteredComments = tempComments;
    },
  },
});

export const { FILTER_BY_SEARCH, SORT_COMMENTS } = filterSlice.actions;

export const selectFilteredProducts = (state: RootState) => state.filter.filteredProducts;
export const selectFilteredComments = (state: RootState) => state.filter.filteredComments;

export default filterSlice.reducer;
