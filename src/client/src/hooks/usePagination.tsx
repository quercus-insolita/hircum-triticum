import { useState, useMemo } from 'react';

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 15;

export const getPaginationEnabled = (totalItems: number, pageSize: number): boolean =>
  totalItems > pageSize;

export const getTotalPages = (totalItems: number, pageSize: number): number =>
  Math.ceil(totalItems / pageSize);

export const getPaginationState = ({ totalItems, pageSize, currentPage }) => {
  const totalPages = getTotalPages(totalItems, pageSize);

  return {
    totalPages,
    pageSize,
    nextEnabled: getPaginationEnabled(totalItems, pageSize),
    currentPage
  };
};

function usePagination(
  totalItems: number,
  initialPage: number = DEFAULT_PAGE_NUMBER,
  initialPageSize: number = DEFAULT_PAGE_SIZE
) {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const resetPagination = (): void => {
    setCurrentPage(DEFAULT_PAGE_NUMBER);
  };

  const paginationState = useMemo(() => getPaginationState({ totalItems, pageSize, currentPage }), [
    totalItems,
    pageSize,
    currentPage
  ]);

  return {
    handlePageChange,
    resetPagination,
    ...paginationState
  };
}

export default usePagination;
