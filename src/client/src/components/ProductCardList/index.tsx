import React, { useCallback } from 'react';
import { Card, Button } from 'react-bootstrap';

import { ShoppingCartIcon } from 'components/icons';

import { IProduct } from 'models/product';

import styles from 'components/ProductCardList/styles.module.scss';

interface IProductCardListProps {
  listing: IProduct;
}

const ProductCardList: React.FC<IProductCardListProps> = ({
  listing: { title, price, imageURL, url, mass }
}): React.ReactElement => {
  const onClick = useCallback(() => window.open(url, '_blank'), [url]);

  return (
    <>
      <Card className={styles.cardContainer}>
        <div className={styles.cardImgContainer}>
          <Card.Img src={imageURL} className={styles.cardImg} />
        </div>
        <Card.Body className={styles.cardBody}>
          <div className={styles.cardBodyContainer}>
            <Card.Title className={styles.cardTitle}>{title}</Card.Title>
            <Card.Text className={styles.cardPricing}>{price} грн / {mass} кг</Card.Text>
          </div>
          <Button onClick={onClick} className={styles.cardBodyButton}>
            <ShoppingCartIcon size={13} className={styles.cardBodyButtonIcon} />
            Купити
          </Button>
        </Card.Body>
      </Card>
      <div className={styles.divider} />
    </>
  );
};

export default ProductCardList;
