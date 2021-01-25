import React from 'react';
import map from 'lodash/map';

import ProductCardGrid from 'components/ProductCardGrid';

import { IProduct } from 'models/product';

import styles from 'pages/Home/components/HomeProductListings/styles.module.scss';

interface IHomeProductListingsProps {
  listings: IProduct[];
}

const HomeProductListings: React.FC<IHomeProductListingsProps> = ({
  listings
}): React.ReactElement => {
  return (
    <div className={styles.categoryContainer}>
      {listings.length ? (
        <div className={styles.categoryGrid}>
          {map(listings, listing => (
            <ProductCardGrid listing={listing} key={listing.url} />
          ))}
        </div>
      ) : (
        <div className={styles.categoryGridEmpty}>
          <p>Предмети не знайдено.</p>
        </div>
      )}
    </div>
  );
};

export default HomeProductListings;
