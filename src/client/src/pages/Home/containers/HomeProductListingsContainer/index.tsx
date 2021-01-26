import React from 'react';

import { useProductListings } from 'contexts/ProductListingsContext';
import ListingsFilters from 'components/ListingsFilters';
import Paginator from 'components/Paginator';
import HomeProductListings from 'pages/Home/components/HomeProductListings';
import usePagination from 'hooks/usePagination';

import { IListingFilters } from 'models/filter';

import styles from 'pages/Home/containers/HomeProductListingsContainer/styles.module.scss';

const HomeProductListingsContainer: React.FC = (): React.ReactElement => {
  const { data, filteredData, viewType, updateFilter, updateViewType } = useProductListings();
  const {
    totalPages,
    currentPage,
    handlePageChange,
    resetPagination,
    nextEnabled,
    pageSize
  } = usePagination(filteredData.length);

  const handleUpdateFilter = (filter: IListingFilters): void => {
    resetPagination();
    updateFilter(filter);
  };

  const offset = (currentPage - 1) * pageSize;
  const currentListings = filteredData.slice(offset, offset + pageSize);

  return (
    <div>
      <ListingsFilters
        updateFilter={handleUpdateFilter}
        totalItems={data.length}
        viewType={viewType}
        updateViewType={updateViewType}
      />
      <HomeProductListings listings={currentListings} viewType={viewType} />
      {nextEnabled && (
        <div className={styles.paginatorContainer}>
          <Paginator
            totalPages={totalPages}
            currentPage={currentPage}
            changePageHandler={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default HomeProductListingsContainer;
