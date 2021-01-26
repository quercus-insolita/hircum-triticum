import React, { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import map from 'lodash/map';

import ProductCardGrid from 'components/ProductCardGrid';
import ProductCardList from 'components/ProductCardList';

import { IProduct } from 'models/product';
import { ViewType } from 'models/view';

import styles from 'pages/Home/components/HomeProductListings/styles.module.scss';

interface IHomeProductListingsProps {
  listings: IProduct[];
  viewType: ViewType;
}

const HomeProductListings: React.FC<IHomeProductListingsProps> = ({
  listings,
  viewType
}): React.ReactElement => {
  const renderEmptyComponent = () => (
    <div className={styles.categoryEmpty}>
      <p>Предмети не знайдено.</p>
    </div>
  );

  const renderListings = useCallback(
    () => (
      <div className={viewType === ViewType.GridView ? styles.categoryGrid : styles.categoryList}>
        {map(listings, listing => (
          <>
            {viewType === ViewType.GridView ? (
              <ProductCardGrid key={uuidv4()} listing={listing} />
            ) : (
              <ProductCardList key={uuidv4()} listing={listing} />
            )}
          </>
        ))}
      </div>
    ),
    [listings, viewType]
  );

  return (
    <div className={styles.categoryContainer}>
      {listings.length ? renderListings() : renderEmptyComponent()}
    </div>
  );
};

export default HomeProductListings;
