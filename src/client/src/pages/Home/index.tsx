import React from 'react';
import { Container } from 'react-bootstrap';

import HomeBanner from 'pages/Home/components/HomeBanner';
import HomeProductListings from 'pages/Home/containers/HomeProductListings';
import ListingsFilters from 'components/ListingsFilters';
import { ProductListingsProvider, ProductListingsConsumer } from 'contexts/ProductListingsContext';

const Home: React.FC = (): React.ReactElement => {
  return (
    <Container>
      <HomeBanner />
      <ProductListingsProvider>
        <ProductListingsConsumer>
          {({ data, updateFilter }) => (
            <>
              <ListingsFilters updateFilter={updateFilter} />
              <HomeProductListings listings={data} />
            </>
          )}
        </ProductListingsConsumer>
      </ProductListingsProvider>
    </Container>
  );
};

export default Home;
