import React, { useCallback } from 'react';
import { Card } from 'react-bootstrap';

import { IProduct } from 'models/product';

import styles from 'components/ProductCardGrid/styles.module.scss';

interface IProductCardGridProps {
  listing: IProduct;
}

const ProductCardGrid: React.FC<IProductCardGridProps> = ({
  listing: { title, price, imageURL, url }
}): React.ReactElement => {
  const onClick = useCallback(() => window.open(url, '_blank'), [url]);

  return (
    <Card onClick={onClick}>
      <Card.Img variant="top" src={imageURL} className={styles.cardImg} />
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styles.cardTitle}>{title}</Card.Title>
        <Card.Text className={styles.cardPricing}>{price} UAH</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCardGrid;
