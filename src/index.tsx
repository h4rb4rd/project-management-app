import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import Preloader from './pages/Preloader';
import { setupStore } from './store/store';

import './i18next';
import './styles/index.scss';

export const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <>
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <Suspense fallback={<Preloader />}>
            <App />
          </Suspense>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  </>
);
