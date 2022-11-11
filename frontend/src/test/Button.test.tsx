import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../components/buttons/Button';

describe('Button component testing', function() {
  it('Button need be disabled', function() {
    render(<Button 
        enabled={false}
        text={'Read'} />
    );

    const searchBtn = screen.getByRole("button", { name: "Read" });
    expect(searchBtn).not.toBeDisabled();
  });
});