import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import routes from '@/routes';
import { PAGE_NOT_FOUND_URL } from './utils/urls';
import Spinner from '@/components/Spinner';

const App = () => {
  return (
    <Switch>
      <Suspense fallback={Spinner}>
        <Switch>
          {routes.map((route) => {
            const { component: Component, path, label } = route;
            return <Route exact key={label} path={path} component={Component} />;
          })}
          <Redirect path="*" to={PAGE_NOT_FOUND_URL} />
        </Switch>
      </Suspense>
    </Switch>
  );
};

export default App;
