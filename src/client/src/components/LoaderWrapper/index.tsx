import React from 'react';
import { Spinner } from 'react-bootstrap';

interface ILoaderWrapperProps {
  loading: boolean;
}

const LoaderWrapper: React.FC<ILoaderWrapperProps> = ({ loading, children }): React.ReactElement =>
  loading ? (
    <div style={{ position: 'relative', height: '100%' }}>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <>{children}</>
  );

export default LoaderWrapper;
