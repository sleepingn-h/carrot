import { useState } from 'react';

const usePagination = (perPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;

  return { currentPage, setCurrentPage, indexOfFirst, indexOfLast };
};

export default usePagination;
