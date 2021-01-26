import React from 'react';
import { Container } from 'react-bootstrap';

import HomeBanner from 'pages/Home/components/HomeBanner';
import HomeProductListings from 'pages/Home/components/HomeProductListings';
import ListingsFilters from 'components/ListingsFilters';
import { ProductListingsProvider, ProductListingsConsumer } from 'contexts/ProductListingsContext';

const Home: React.FC = (): React.ReactElement => {
  return (
    <Container className="mt-2 mb-4">
      <HomeBanner />

      <ProductListingsProvider>
        <ProductListingsConsumer>
          {({ data, filteredData, viewType, updateFilter, updateViewType }) => (
            <>
              <ListingsFilters
                updateFilter={updateFilter}
                totalItems={data.length}
                viewType={viewType}
                updateViewType={updateViewType}
              />
              <HomeProductListings listings={filteredData} viewType={viewType} />
            </>
          )}
        </ProductListingsConsumer>
      </ProductListingsProvider>
    </Container>
  );
};

export default Home;
