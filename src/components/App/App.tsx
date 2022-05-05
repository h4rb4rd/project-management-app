import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';

import { setupStore } from '../../store/store';
import AppRouter from '../AppRouter';
import ErrorFallback from '../ErrorFallback';

export const store = setupStore();

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default withErrorBoundary(App, {
  fallback: <ErrorFallback />,
});
