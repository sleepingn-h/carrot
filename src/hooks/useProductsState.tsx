import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, STORE_PRODUCTS } from '@/redux/slice/productSlice';
import { FILTER_BY_SEARCH, selectFilteredProducts } from '@/redux/slice/filterSlice';
import { deleteArticle } from '@/lib/firebase/firebase-database';
import { deleteProductImage } from '@/lib/firebase/firebase-storage';

const useProductsState = () => {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);

  const storeProducts = STORE_PRODUCTS;
  const filterBySearch = FILTER_BY_SEARCH;

  const deleteProducts = async (id: string, imageURL: string) => {
    await deleteArticle(id, 'products');
    await deleteProductImage(imageURL);
  };

  return { dispatch, storeProducts, filterBySearch, products, filteredProducts, deleteProducts };
};

export default useProductsState;
