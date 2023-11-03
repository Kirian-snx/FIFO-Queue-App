import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Queue from '../../src/components/Queue';

test('Queue component renders correctly', () => {
  const queue = [{ id: 1, type: 'A' }, { id: 2, type: 'B' }, { id: 3, type: 'C' }];
  render(<Queue queue={queue} executeAction={() => {}} />);

  const items = screen.getAllByRole('listitem');
  expect(items).toHaveLength(3);
  expect(items[0]).toHaveTextContent('A');
  expect(items[1]).toHaveTextContent('B');
  expect(items[2]).toHaveTextContent('C');
});

test('Queue component calls executeAction when the button is clicked', () => {
  const executeAction = jest.fn();
  render(<Queue queue={[{ id: 1, type: 'A' }]} executeAction={executeAction} />);

  const button = screen.getByText('Execute Action');
  fireEvent.click(button);

  expect(executeAction).toHaveBeenCalledTimes(1);
});
