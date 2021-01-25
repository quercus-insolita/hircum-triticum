import React from 'react';
import map from 'lodash/map';

import ProductCardGrid from 'components/ProductCardGrid';

import { IProduct } from 'models/product';

import styles from 'pages/Home/containers/HomeProductListings/styles.module.scss';

interface IHomeProductListingsProps {
  listings: IProduct[];
}

const HomeProductListings: React.FC<IHomeProductListingsProps> = ({
  listings
}): React.ReactElement => {
  return (
    <div className={styles.categoryGrid}>
      {map(listings, listing => (
        <ProductCardGrid listing={listing} key={listing.url} />
      ))}
    </div>
  );
};

export default HomeProductListings;
