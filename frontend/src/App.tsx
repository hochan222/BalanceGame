import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import routes from '@/routes';
import { PAGE_NOT_FOUND_URL } from './utils/urls';

const App = () => {
  return (
    <Switch>
      <Suspense fallback={<p>spinner</p>}>
        <Switch>
          {routes.map((route) => {
            const { component: Component, path, label } = route;
            return (
              <Route exact key={label} path={path} component={Component}/>
            );
          })}
          <Redirect path="*" to={PAGE_NOT_FOUND_URL}/>
        </Switch>
      </Suspense>
    </Switch>
  );
};

export default App;
