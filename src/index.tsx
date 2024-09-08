import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { createClient } from '@supabase/supabase-js';
import { Provider } from 'react-redux';
import { store } from './store';

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_ANON_KEY!
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);