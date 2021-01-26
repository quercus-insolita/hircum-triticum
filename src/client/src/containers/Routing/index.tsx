import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'pages/Home';
import Header from 'components/Header';
import LoaderWrapper from 'components/LoaderWrapper';

const Routing: React.FC = (): React.ReactElement => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [reloaded, setReloaded] = useState<boolean>(false);

  useEffect(() => {
    if (window.performance && performance.navigation.type === 1) {
      setReloaded(true);
    }

    setLoading(false);
  }, []);

  return (
    <LoaderWrapper loading={isLoading}>
      <Header />
      <Switch>
        <Route path="/" render={() => <Home reloaded={reloaded} />} />
      </Switch>
    </LoaderWrapper>
  );
};

export default Routing;
