import React from 'react';
import { Jumbotron } from 'react-bootstrap';

import styles from 'pages/Home/components/HomeBanner/styles.module.scss';

const HomeBanner: React.FC = (): React.ReactElement => {
  return (
    <Jumbotron className={styles.jumbotron}>
      <div>
        <h2 className={styles.jumbotronTitle}>Онлайн список продуктів</h2>
        <p className={styles.jumbotronSubTitle}>Замовляй зараз!</p>
      </div>
    </Jumbotron>
  );
};

export default HomeBanner;
