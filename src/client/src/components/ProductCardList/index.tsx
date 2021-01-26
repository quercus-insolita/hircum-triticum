import React, { useCallback } from 'react';
import { Card } from 'react-bootstrap';

import { IProduct } from 'models/product';

import styles from 'components/ProductCardList/styles.module.scss';

interface IProductCardListProps {
  listing: IProduct;
}

const ProductCardList: React.FC<IProductCardListProps> = ({
  listing: { title, price, imageURL, url }
}): React.ReactElement => {
  const onClick = useCallback(() => window.open(url, '_blank'), [url]);

  return (
    <>
      <Card className={styles.cardContainer}>
        <div className={styles.cardImgContainer}>
          <Card.Img src={imageURL} className={styles.cardImg} />
        </div>
        <Card.Body className={styles.cardBody}>
          <Card.Title className={styles.cardTitle}>{title}</Card.Title>
          <Card.Text className={styles.cardPricing}>{price} UAH</Card.Text>
        </Card.Body>
      </Card>
      <div className={styles.divider} />
    </>
  );
};

export default ProductCardList;
