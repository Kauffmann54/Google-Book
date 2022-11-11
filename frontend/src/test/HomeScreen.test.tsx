import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomeScreen from '../screens/home/view/HomeScreen';
import { Provider } from 'react-redux';
import store from '../hooks/store';
import { BrowserRouter } from 'react-router-dom';

describe('HomeScreen component testing', function() {
  it('Check if checkbox change value to checked', function() {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <HomeScreen />
            </BrowserRouter>
        </Provider>
    );
            
    const checkBox = screen.getByTestId('home-screen-filters-checkbox-download');
    fireEvent.click(checkBox);
    expect(checkBox).toHaveClass('Mui-checked');
  });
});