import React, { useEffect } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppRouter from '../AppRouter';
import { checkIsAuth } from '../../store/thunks/AuthThunks';
import ErrorFallback from '../ErrorFallback';
import { MAX_TOASTS_COUNT } from '../../constants';
import Preloader from '../../pages/Preloader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const App = () => {
  const { isChecking, error } = useAppSelector((state) => state.AuthReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkIsAuth());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (isChecking) {
    return <Preloader />;
  }

  return (
    <>
      <AppRouter />
      <ToastContainer
        limit={MAX_TOASTS_COUNT}
        position="bottom-right"
        theme="colored"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </>
  );
};

export default withErrorBoundary(App, {
  fallback: <ErrorFallback />,
});
