import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import store from '../hooks/store';
import { BrowserRouter } from 'react-router-dom';

describe('App component testing', function() {
  it('Check if header appear', function() {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
           
    const header = screen.getByTestId('header-background');
    expect(header).toBeVisible();
  });
});