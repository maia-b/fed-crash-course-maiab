import React from 'react';
import Register from './Register';
import { render, fireEvent } from '@testing-library/react';

describe('Register component', () => {
  it('Should not call onStart in case one of the names are empty', () => {
    const spy = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <Register onStart={spy} />,
    );

    const player1Input = getByPlaceholderText('Player 1 Name');
    const player2Input = getByPlaceholderText('Player 2 Name');
    const button = getByText(/start game/i);

    fireEvent.change(player1Input, { target: { value: 'A' } });
    fireEvent.click(button);

    expect(spy).not.toHaveBeenCalled();

    fireEvent.change(player2Input, { target: { value: 'B' } });
    fireEvent.click(button);

    expect(spy).toHaveBeenCalledWith('A', 'B');
  });
});
