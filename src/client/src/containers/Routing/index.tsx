import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'pages/Home';
import Header from 'components/Header';

const Routing: React.FC = (): React.ReactElement => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default Routing;
