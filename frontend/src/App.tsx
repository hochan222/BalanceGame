import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import routes from '@/routes';
import { PAGE_NOT_FOUND_URL } from '@/utils/urls';
import Spinner from '@/components/Spinner';
import StoreContext from '@/contexts/Store';
import RootStore from '@/stores/RootStore';

const App = () => {
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StoreContext.Provider value={new RootStore()}>
      <ChakraProvider>
        <Suspense fallback={Spinner}>
          <Switch>
            {routes.map((route) => {
              const { component: Component, path, label } = route;
              return <Route exact key={label} path={path} component={Component} />;
            })}
            <Redirect path="*" to={PAGE_NOT_FOUND_URL} />
          </Switch>
        </Suspense>
      </ChakraProvider>
    </StoreContext.Provider>
  );
};

export default App;
