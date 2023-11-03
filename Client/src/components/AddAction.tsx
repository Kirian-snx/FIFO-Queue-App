import React, { useState } from 'react';
import '../styles/addActionStyles.css';

interface AddActionProps {
  addActionToQueue: (actionType: string) => void;
}

const AddAction: React.FC<AddActionProps> = ({ addActionToQueue }) => {
  const [actionType, setActionType] = useState<string>('');

  const handleAddAction = async () => {
    try {
      console.log('Before clearing:', actionType);
      addActionToQueue(actionType);
      setActionType('');
      console.log('After clearing:', actionType);
    } catch (error) {
      console.error('Error adding action to the queue:', error);
    }
  };  

  return (
    <div className="add-action">
      <h2>Add Action</h2>
      <input
        className="action-input"
        type="text"
        placeholder="Action Type (e.g., A, B, C)"
        value={actionType}
        onChange={(e) => setActionType(e.target.value)}
      />
      <button className="action-button" onClick={handleAddAction}>Add Action</button>
    </div>
  );
};

export default AddAction;