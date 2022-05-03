import { combineReducers, configureStore } from '@reduxjs/toolkit';

import AuthReducer from './reducers/AuthSlice';
import userModalReducer from './reducers/UserModalSlice';

const rootReducer = combineReducers({
  AuthReducer,
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
