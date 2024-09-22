import type { SelectOptions } from '@/components/select/Select';
import type { FetchArticle, SimpleArticle } from '@/model/article';
import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { addNewProduct, editProduct } from '@/lib/firebase/firebase-database';
import { addArticleImage, deleteProductImage } from '@/lib/firebase/firebase-storage';

export const categories: SelectOptions[] = [
  { id: '1', name: 'Laptop' },
  { id: '2', name: 'Electronics' },
  { id: '3', name: 'Fashion' },
  { id: '4', name: 'Phone' },
  { id: '5', name: 'Movies & Television' },
  { id: '6', name: 'Home & Kitchen' },
  { id: '7', name: 'Automotive' },
  { id: '8', name: 'Software' },
  { id: '9', name: 'Video Games' },
  { id: '10', name: 'Sports & Outdoor' },
  { id: '11', name: 'Toys & Games' },
  { id: '12', name: 'Industrial & Scientific' },
];

export default function useFormProducts<T>(data: T) {
  const { uid } = useAuthContext();
  const [products, setProducts] = useState<T>({ ...data, uid });
  const [uploadProgress, setUploadProgress] = useState(0);

  const downloaImagedURL = useCallback(
    (file: File) => addArticleImage({ file, dir: 'images', setUploadProgress }),
    []
  );
  const deleteImageURL = useCallback((imageURL: string) => deleteProductImage(imageURL), []);
  const addProducts = useCallback((products: SimpleArticle) => addNewProduct(products), []);
  const editProducts = useCallback(
    (products: FetchArticle, id: string) => editProduct(products, id),
    []
  );
  const getProduct = useCallback(() => {
    setProducts(data);
  }, [data]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  useEffect(() => {
    setProducts(products);
    console.log(products);
  }, [products]);

  return {
    products,
    setProducts,
    uploadProgress,
    downloaImagedURL,
    deleteImageURL,
    addProducts,
    editProducts,
  };
}
