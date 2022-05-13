import { combineReducers, configureStore } from '@reduxjs/toolkit';

import AccountFormReducer from './reducers/AccountFormSlice';
import AuthReducer from './reducers/AuthSlice';
import BoardsReducer from './reducers/BoardsSlice';
import locationReducer from './reducers/LocationSlice';
import loginFormReducer from './reducers/LoginFormSlice';
import signUpFormReducer from './reducers/SignUpFormSlice';
import userModalReducer from './reducers/UserModalSlice';

const rootReducer = combineReducers({
  AuthReducer,
  AccountFormReducer,
  BoardsReducer,
  loginFormReducer,
  locationReducer,
  signUpFormReducer,
  userModalReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
