import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import App from '../../src/App';
import axios from '../../src/services/api';

jest.mock('../../src/services/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

const mockQueueStatus = {
  queue: [{ id: 1, type: 'A' }, { id: 2, type: 'B' }],
  credits: [
    { type: 'C', value: 100, lastUpdated: '2023-10-01' },
    { type: 'D', value: 200, lastUpdated: '2023-10-02' },
  ]
  };

beforeEach(async () => {
  (axios.get as jest.Mock).mockResolvedValue({ data: mockQueueStatus });
  await act(async () => {
    render(<App />);
  });
});

test('App component renders correctly', () => {
  expect(screen.getByText('Queue App')).toBeInTheDocument();
  expect(screen.getByText('Queue')).toBeInTheDocument();
  expect(screen.getByText('Credits')).toBeInTheDocument();
  
  const addActionButton = screen.getByRole('button', { name: 'Add Action' });
  expect(addActionButton).toBeInTheDocument();
});

test('App component calls executeAction when executing an action', async () => {
  const executeButton = screen.getByText('Execute Action');
  await act(async () => {
    executeButton.click();
  });

  expect((axios.post as jest.Mock).mock.calls[0][0]).toBe('actions/execute-action');
});

test('App component adds an action to the queue', async () => {
  const addActionInput = screen.getByPlaceholderText('Action Type (e.g., A, B, C)');
  const addActionButton = screen.getByRole('button', { name: 'Add Action' });

  fireEvent.change(addActionInput, { target: { value: 'E' } });
  act(() => {
    addActionButton.click();
  });

  expect((axios.post as jest.Mock).mock.calls[1][0]).toBe('actions/add-action');
  expect((axios.post as jest.Mock).mock.calls[1][1]).toEqual({ type: 'E' });
  expect(axios.get).toHaveBeenCalledWith('actions/queue-status');
});
