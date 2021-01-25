import React, { useState, useContext, createContext, useMemo } from 'react';

import LoaderWrapper from 'components/LoaderWrapper';
import useFetch from 'hooks/useFetch';
import { filterProductListings } from 'utils/filtering.utils';

import { ProductListingsContextData } from 'contexts/ProductListingsContext/types';
import { IListingFilters } from 'models/filter';

export const ProductListingsContext = createContext<ProductListingsContextData>(
  {} as ProductListingsContextData
);

export const ProductListingsConsumer: React.Consumer<ProductListingsContextData> =
  ProductListingsContext.Consumer;

export const ProductListingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, applyFilters] = useState<IListingFilters>({} as IListingFilters);
  const { data, isLoading } = useFetch('/api/goods/listAll', {
    type: 'GET',
    dataType: 'jsonp'
  });

  const productListingsContext = useMemo(
    () => ({
      updateFilter: (appliedFilters: IListingFilters) => {
        applyFilters(appliedFilters);
      }
    }),
    []
  );

  const filteredData = filterProductListings(data, filters);

  return (
    <ProductListingsContext.Provider value={{ data, filteredData, ...productListingsContext }}>
      <LoaderWrapper loading={isLoading}>{children}</LoaderWrapper>
    </ProductListingsContext.Provider>
  );
};

export const useProductListings = (): ProductListingsContextData => {
  const context = useContext(ProductListingsContext);

  return context;
};
