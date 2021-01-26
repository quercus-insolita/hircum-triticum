import React from 'react';
import { Container } from 'react-bootstrap';

import HomeBanner from 'pages/Home/components/HomeBanner';
import HomeProductListingsContainer from 'pages/Home/containers/HomeProductListingsContainer';
import { ProductListingsProvider } from 'contexts/ProductListingsContext';

interface IHomeProps {
  reloaded: boolean;
}

const Home: React.FC<IHomeProps> = ({ reloaded }): React.ReactElement => {
  return (
    <Container className="mt-2 mb-4">
      <HomeBanner />
      <ProductListingsProvider reloaded={reloaded}>
        <HomeProductListingsContainer />
      </ProductListingsProvider>
    </Container>
  );
};

export default Home;
