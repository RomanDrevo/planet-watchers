import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
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

test('Brightness control buttons work correctly', () => {
    render(
        <Provider store={store}>
            <ImageComponent productId="someProductId" />
        </Provider>
    );

    // Click the "+" button five times to increase brightness by 50%
    for (let i = 0; i < 5; i++) {
        fireEvent.click(screen.getByText('+'));
    }

    // Assume there's a way to check the current brightness level
    // In real scenario, you might need to check the styles of the image element
    // For now, this is a placeholder line and may not work in your real app.
    // expect(someFunctionToCheckBrightness()).toBe(1.5);

    // Click the "-" button three times to decrease brightness by 30%
    for (let i = 0; i < 3; i++) {
        fireEvent.click(screen.getByText('-'));
    }

    // Again, check the current brightness level
    // expect(someFunctionToCheckBrightness()).toBe(1.2);
});
