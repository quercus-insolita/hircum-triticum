import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'pages/Home';

const Routing: React.FC = (): React.ReactElement => {
  return (
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  );
};

export default Routing;
