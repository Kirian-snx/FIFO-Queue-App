import React from 'react';
import '../styles/queueStyles.css';
import '../styles/buttonStyles.css';

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
    <div className="queue">
      <h2>Queue</h2>
      <ul className="horizontal-queue">
        {queue.map((action, index) => (
          <li className="queue-item" key={index}>
            {action.type}
          </li>
        ))}
      </ul>
      <button className="round-button" onClick={executeAction}>Execute Action</button>
    </div>
  );
};

export default Queue;