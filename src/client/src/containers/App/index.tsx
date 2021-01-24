import React from 'react';
import { Router } from 'react-router-dom';

import Routing from 'containers/Routing';

import { history } from 'helpers/history.helper';

const App: React.FC = (): React.ReactElement => {
  return (
    <Router history={history}>
      <Routing />
    </Router>
  );
};

export default App;
