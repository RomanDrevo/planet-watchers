import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for the "toBeInTheDocument" matcher
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ImageComponent from './ImageComponent';
import uiSlice from '../store/uiStateSlice';

// Mocking your store
const store = configureStore({
    reducer: {
        uiState: uiSlice,
    },
});

test('renders Image component without crashing', () => {
    render(
        <Provider store={store}>
            <ImageComponent productId="someProductId" />
        </Provider>
    );
    expect(screen.getByText('Brightness:')).toBeInTheDocument();
});

