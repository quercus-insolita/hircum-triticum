import React from 'react';
import { Container } from 'react-bootstrap';

import HomeBanner from 'pages/Home/components/HomeBanner';
import HomeProductListings from 'pages/Home/containers/HomeProductListings';
import ListingsFilters from 'components/ListingsFilters';
import { ProductListingsProvider, ProductListingsConsumer } from 'contexts/ProductListingsContext';

const Home: React.FC = (): React.ReactElement => {
  return (
    <Container className="mt-4 mb-4">
      <HomeBanner />
      <ProductListingsProvider>
        <ProductListingsConsumer>
          {({ data, filteredData, updateFilter }) => (
            <>
              <ListingsFilters updateFilter={updateFilter} totalItems={data.length} />
              <HomeProductListings listings={filteredData} />
            </>
          )}
        </ProductListingsConsumer>
      </ProductListingsProvider>
    </Container>
  );
};

export default Home;
