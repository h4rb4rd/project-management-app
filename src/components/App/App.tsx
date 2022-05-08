import React, { useEffect } from 'react';
import { withErrorBoundary } from 'react-error-boundary';

import AppRouter from '../AppRouter';
import { checkIsAuth } from '../../store/thunks';
import ErrorFallback from '../ErrorFallback';
import Preloader from '../../pages/Preloader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const App = () => {
  const { isChecking } = useAppSelector((state) => state.AuthReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkIsAuth());
  }, []);

  if (isChecking) {
    return <Preloader />;
  }

  return <AppRouter />;
};

export default withErrorBoundary(App, {
  fallback: <ErrorFallback />,
});
