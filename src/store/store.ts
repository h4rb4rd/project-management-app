import { combineReducers, configureStore } from '@reduxjs/toolkit';

import AccountFormReducer from './reducers/AccountFormSlice';
import AuthReducer from './reducers/AuthSlice';
import BoardsReducer from './reducers/BoardsSlice';
import LocationReducer from './reducers/LocationSlice';
import LoginFormReducer from './reducers/LoginFormSlice';
import SignUpFormReducer from './reducers/SignUpFormSlice';
import UserModalReducer from './reducers/UserModalSlice';
import BoardReducer from './reducers/BoardSlice';

const rootReducer = combineReducers({
  AuthReducer,
  AccountFormReducer,
  BoardsReducer,
  LocationReducer,
  LoginFormReducer,
  SignUpFormReducer,
  UserModalReducer,
  BoardReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
