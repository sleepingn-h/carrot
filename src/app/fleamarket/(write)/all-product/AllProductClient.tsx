'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useFecthCollection from '@/hooks/useFecthCollection';
import useProductsState from '@/hooks/useProductsState';
import usePagination from '@/hooks/usePagination';
import Pagination from '@/components/pagination/Pagination';
import Heading from '@/components/heading/Heading';
import Trigger from '@/components/trigger/Trigger';
import Loader from '@/components/loader/Loader';
import styles from '../../fleamarket.module.css';

const AllProductClient = () => {
  const router = useRouter();
  const [productsPerPage, _] = useState(10);
  const [search, setSearch] = useState('');
  const { data, isLoading } = useFecthCollection('products');
  const { dispatch, products, storeProducts, filterBySearch, filteredProducts, deleteProducts } =
    useProductsState();
  const {
    currentPage,
    setCurrentPage,
    indexOfFirst: indexOfFirstProduct,
    indexOfLast: indexOfLastProduct,
  } = usePagination(productsPerPage);

  console.log(products);

  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    dispatch(storeProducts({ products: data }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, data]);
  useEffect(() => {
    dispatch(filterBySearch({ products, search }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, products, search]);

  return (
    <section className={styles.table}>
      <Heading title='모든 상품' />
      <table>
        <thead>
          <tr>
            <th className={styles.index} scope='col'>
              순서
            </th>
            <th className={styles.content} scope='col'>
              상품
            </th>
            <th className={styles.price} scope='col'>
              가격
            </th>
            <th className={styles.btnSec} scope='col'>
              수정 및 삭제
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td className={styles.nodata} colSpan={4}>
                <Loader />
                {!isLoading && currentProducts.length === 0 && '등록된 상품이 없습니다.'}
              </td>
            </tr>
          )}
          {currentProducts.length > 0 &&
            currentProducts.map(({ id, category, name, imageURL, price }, index) => (
              <>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className={styles.product}>
                      <div className={styles.image}>
                        <Image src={imageURL} alt={name} width={100} height={100} />
                      </div>
                      <div className={styles.info}>
                        <span className={styles.category}>{category}</span>
                        <span className={styles.title}>{name}</span>
                      </div>
                    </div>
                  </td>
                  <td>{price}원</td>
                  <td>
                    <Trigger
                      size='sm'
                      bgColor='gray-900'
                      className={styles.button}
                      onClick={() => router.push(`/admin/edit-product/${id}`)}
                    >
                      수정
                    </Trigger>
                    <Trigger
                      size='sm'
                      bgColor='secondary'
                      className={styles.button}
                      onClick={() => deleteProducts(id, imageURL)}
                    >
                      삭제
                    </Trigger>
                  </td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sortingPage={productsPerPage}
        total={filteredProducts.length}
        sortingPerPage={productsPerPage}
      />
    </section>
  );
};

export default AllProductClient;
