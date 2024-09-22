import { HTMLAttributeAnchorTarget, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import classNames from 'classnames';
import styles from './Pagination.module.css';
import Trigger from '../trigger/Trigger';
/**
 * currentPage: 현재 페이지
 * setCurrentPage: 페이지 이동
 * sortingPage: 페이지네이션 갯수
 * total: 총 상품 갯수
 * sortingPerPage: 한 페이지당 상품 출력 갯수
 */
type PaginationProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  sortingPage: number;
  total: number;
  sortingPerPage: number;
};

const Pagination = ({
  currentPage,
  setCurrentPage,
  sortingPage,
  total,
  sortingPerPage,
}: PaginationProps) => {
  const [pageNumberLimit, _] = useState(sortingPage);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(sortingPage);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const pageNumbers = countPageNumbers(total, sortingPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginateNextPage = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const paginatePrevPage = () => {
    setCurrentPage(currentPage - 1);

    if (currentPage - (1 % pageNumberLimit) === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  if (pageNumbers.length === 0) {
    return;
  }

  return (
    <div className={styles.pagination}>
      <Trigger
        className={classNames(currentPage === pageNumbers[0] ? styles.hidden : '', styles.button)}
        bgColor='default'
        size='sm'
        onClick={paginatePrevPage}
        disabled={currentPage === pageNumbers[0] ? true : false}
      >
        <span className='sr-only'>이전</span>
        <IoIosArrowBack className={styles.icons} />
      </Trigger>
      <ul className={styles.list}>
        {pageNumbers.map((number) => {
          if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
              <li key={number} className={classNames(currentPage === number ? styles.active : '')}>
                {currentPage === number ? (
                  <>
                    <strong aria-label={`Page ${number}`} aria-current={true}>
                      {number}
                    </strong>
                  </>
                ) : (
                  <>
                    <a href='#n' onClick={() => paginate(number)} aria-label={`Page ${number}`}>
                      {number}
                    </a>
                  </>
                )}
              </li>
            );
          }
        })}
      </ul>
      <Trigger
        className={classNames(
          currentPage === pageNumbers[pageNumbers.length - 1] ? styles.hidden : '',
          styles.button
        )}
        bgColor='default'
        size='sm'
        onClick={paginateNextPage}
        disabled={currentPage === pageNumbers[pageNumbers.length - 1] ? true : false}
      >
        <span className='sr-only'>다음</span>
        <IoIosArrowForward className={styles.icons} />
      </Trigger>
    </div>
  );
};

export default Pagination;

function countPageNumbers(total: number, sortingPerPage: number): number[] {
  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / sortingPerPage); i++) {
    pageNumbers.push(i);
  }

  return pageNumbers;
}
