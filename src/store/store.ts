import { combineReducers, configureStore } from '@reduxjs/toolkit';

import AccountFormReducer from './reducers/AccountFormSlice';
import AuthReducer from './reducers/AuthSlice';
import loginFormReducer from './reducers/LoginFormSlice';
import signUpFormReducer from './reducers/SignUpFormSlice';
import userModalReducer from './reducers/UserModalSlice';

const rootReducer = combineReducers({
  AuthReducer,
  userModalReducer,
  loginFormReducer,
  signUpFormReducer,
  AccountFormReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
