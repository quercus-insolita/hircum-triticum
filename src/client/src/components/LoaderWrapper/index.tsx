import React from 'react';
import { Spinner } from 'react-bootstrap';

import styles from 'components/LoaderWrapper/styles.module.scss';

interface ILoaderWrapperProps {
  loading: boolean;
}

const LoaderWrapper: React.FC<ILoaderWrapperProps> = ({ loading, children }): React.ReactElement =>
  loading ? (
    <div className={styles.container}>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <>{children}</>
  );

export default LoaderWrapper;
