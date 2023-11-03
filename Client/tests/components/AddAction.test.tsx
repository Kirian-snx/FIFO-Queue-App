import '@testing-library/jest-dom'
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddAction from '../../src/components/AddAction';

test('AddAction component renders correctly', () => {
  const addActionToQueue = jest.fn();
  render(<AddAction addActionToQueue={addActionToQueue} />);

  // Ensure that the component renders
  const input = screen.getByPlaceholderText('Action Type (e.g., A, B, C)');
  expect(input).toBeInTheDocument();

  const header = screen.getByRole('heading', { name: /Add Action/i });
  expect(header).toBeInTheDocument();

  const button = screen.getByRole('button', { name: /Add Action/i });
  expect(button).toBeInTheDocument();
});

test('AddAction input field updates correctly', () => {
  const addActionToQueue = jest.fn();
  render(<AddAction addActionToQueue={addActionToQueue} />);

  const input = screen.getByPlaceholderText('Action Type (e.g., A, B, C)');
  fireEvent.change(input, { target: { value: 'New Action' } });
  expect(input).toHaveValue('New Action');
});

test('AddAction "Add Action" button click', async () => {
  const addActionToQueue = jest.fn();
  render(<AddAction addActionToQueue={addActionToQueue} />);

  const input = screen.getByPlaceholderText('Action Type (e.g., A, B, C)');
  const button = screen.getByRole('button', { name: /Add Action/i });

  fireEvent.change(input, { target: { value: 'New Action' } });
  fireEvent.click(button);

  // You can assert the expected behavior after the button click.
  // For example, check if the input field is cleared.
  expect(input).toHaveValue('');
});

test('AddAction calls addActionToQueue on "Add Action" button click', () => {
  const addActionToQueue = jest.fn();
  render(<AddAction addActionToQueue={addActionToQueue} />);

  const input = screen.getByPlaceholderText('Action Type (e.g., A, B, C)');
  const button = screen.getByRole('button', { name: /Add Action/i });

  fireEvent.change(input, { target: { value: 'New Action' } });
  fireEvent.click(button);

  expect(addActionToQueue).toHaveBeenCalled();
});
