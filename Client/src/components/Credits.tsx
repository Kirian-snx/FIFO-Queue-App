import React from 'react';

type Credit = {
  type: string;
  value: number;
  lastUpdated: string;
};

type CreditsProps = {
  credits: Credit[];
};

const Credits: React.FC<CreditsProps> = ({ credits }) => {
  return (
    <div>
      <h2>Credits</h2>
      <ul>
        {credits.map((credit, index) => (
          <li key={index}>
            Type: {credit.type}, Value: {credit.value}, Last Updated: {credit.lastUpdated}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Credits;