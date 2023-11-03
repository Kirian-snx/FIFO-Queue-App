import React from 'react';

type Action ={
  id: number;
  type: string;
};

type QueueProps = {
  queue: Action[];
  executeAction: () => void;
};

const Queue: React.FC<QueueProps> = ({ queue, executeAction }) => {
  return (
    <div>
      <h2>Queue</h2>
      <ul>
        {queue.map((action, index) => (
          <li key={index}>{action.type}</li>
        ))}
      </ul>
      <button onClick={executeAction}>Execute Action</button>
    </div>
  );
};

export default Queue;