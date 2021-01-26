import React, { useState, useContext, createContext, useMemo } from 'react';

import LoaderWrapper from 'components/LoaderWrapper';
import useFetch from 'hooks/useFetch';
import { filterProductListings } from 'utils/filtering.utils';

import { ProductListingsContextData } from 'contexts/ProductListingsContext/types';
import { IListingFilters } from 'models/filter';
import { ViewType } from 'models/view';

export const ProductListingsContext = createContext<ProductListingsContextData>(
  {} as ProductListingsContextData
);

export const ProductListingsConsumer: React.Consumer<ProductListingsContextData> =
  ProductListingsContext.Consumer;

export const ProductListingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewType, setViewType] = useState<ViewType>(ViewType.GridView);
  const [filters, applyFilters] = useState<IListingFilters>({} as IListingFilters);
  const { data, isLoading } = useFetch('/_api/goods/listAll', {
    type: 'GET',
    dataType: 'jsonp'
  });

  const productListingsContext = useMemo(
    () => ({
      updateFilter: (appliedFilters: IListingFilters) => {
        applyFilters(appliedFilters);
      },
      updateViewType: (view: ViewType) => setViewType(view)
    }),
    []
  );

  const filteredData = filterProductListings(data, filters);

  return (
    <ProductListingsContext.Provider
      value={{ data, filteredData, viewType, ...productListingsContext }}
    >
      <LoaderWrapper loading={isLoading}>{children}</LoaderWrapper>
    </ProductListingsContext.Provider>
  );
};

export const useProductListings = (): ProductListingsContextData => {
  const context = useContext(ProductListingsContext);

  return context;
};
