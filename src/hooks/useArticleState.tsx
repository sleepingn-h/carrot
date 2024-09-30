import type { GeoArticle } from '@/model/article';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectNearby,
  selectProducts,
  STORE_NEARBY,
  STORE_PRODUCTS,
} from '@/redux/slice/productSlice';
import { FILTER_BY_SEARCH, selectFilteredProducts } from '@/redux/slice/filterSlice';

const useArticleState = () => {
  const dispatch = useDispatch();

  const article = useSelector(selectProducts);
  const nearby = useSelector(selectNearby);
  const filteredArticles = useSelector(selectFilteredProducts);

  return {
    dispatch,
    STORE_PRODUCTS,
    STORE_NEARBY,
    FILTER_BY_SEARCH,
    article,
    nearby,
    filteredArticles,
  };
};

export default useArticleState;
