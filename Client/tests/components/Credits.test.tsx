import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Credits from '../../src/components/Credits';

test('Credits component renders correctly', () => {
  const credits = [
    { type: 'A', value: 20, lastUpdated: '2023-10-30T12:37:36.869Z' },
    { type: 'B', value: 20, lastUpdated: '2023-10-30T12:37:36.869Z' },
    { type: 'C', value: 30, lastUpdated: '2023-10-30T12:37:36.869Z' },
  ];
  render(<Credits credits={credits} />);

  const creditItems = screen.getAllByRole('listitem');
  expect(creditItems).toHaveLength(3);
  expect(creditItems[0]).toHaveTextContent('Type: A, Value: 20');
  expect(creditItems[1]).toHaveTextContent('Type: B, Value: 20');
  expect(creditItems[2]).toHaveTextContent('Type: C, Value: 30');
});
