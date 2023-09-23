import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';  // for the "toBeInTheDocument" matcher
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import uiSlice from './store/uiStateSlice';
import {api} from './store/productsApi';

// Mocking your store
const store = configureStore({
  reducer: {
    uiState: uiSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
});

test('renders App component without crashing', () => {
  const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
  );
  // eslint-disable-next-line testing-library/prefer-screen-queries
  expect(getByText('Replace')).toBeInTheDocument();
});

