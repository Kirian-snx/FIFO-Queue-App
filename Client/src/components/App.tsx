import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import Queue from './Queue';
import Credits from './Credits';
import AddAction from './AddAction';

type Action = {
  id: number;
  type: string;
};
type Credit = {
  type: string;
  value: number;
  lastUpdated: string;
};

const App: React.FC = () => {
  const [queue, setQueue] = useState<Action[]>([]);
  const [credits, setCredits] = useState<Credit[]>([]);
  
  const fetchQueueStatus = async () => {
    try {
      console.log('Fetching queue status...');
      const response = await axios.get('actions/queue-status');
      if (Array.isArray(response.data.credits)) {
        setQueue(response.data.queue);
        setCredits(response.data.credits);

        console.log('Queue:', response.data.queue);
      } else {
        console.error('Invalid response at:', response.data);
      }
    } catch (error) {
      console.error('Error fetching queue status:', error);
    }
  };
  
  useEffect(() => {
    fetchQueueStatus();
    const interval = setInterval(fetchQueueStatus, 120000);
    return () => clearInterval(interval);
  }, []);

  const executeAction = async () => {
    try {
      await axios.post('actions/execute-action');
      fetchQueueStatus();
    } catch (error) {
      console.error('Error executing action:', error);
    }
  };

  const addActionToQueue = async (actionType: string) => {
    try {
      await axios.post('actions/add-action', { type: actionType });
      fetchQueueStatus();
    } catch (error) {
      console.error('Error adding action to the queue:', error);
    }
  };

  useEffect(() => {
    const actionTimer = setInterval(() => {
      if (queue.length > 0) {
        executeAction();
      }
    }, 120000);
    return () => clearInterval(actionTimer);
  }, [queue]);

  return (
    <div className="App">
      <h1>Queue App</h1>
      <Queue queue={queue} executeAction={executeAction} />
      <Credits credits={credits} />
      <AddAction addActionToQueue={addActionToQueue} />
    </div>

  );
};

export default App;