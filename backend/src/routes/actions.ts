import express, { Request, Response } from 'express';
import { Action } from '../models/Action';
import { Credit } from '../models/Credit';
import { initializeCredits, updateCredits } from './credits';
import { ActionType } from '../models/ActionTypes';

const router = express.Router();
const queue: Action[] = [];
const actionTypes: ActionType[] = [
  { type: 'A', maxCredits: 5 },
	{ type: 'B', maxCredits: 10 },
	{ type: 'C', maxCredits: 10 },
];
let credits: Credit[] = initializeCredits(actionTypes);

setInterval(updateCredits, 24 * 60 * 60 * 1000);

// Add a new action to the queue
router.post('/add-action', (req: Request, res: Response) => {
  const { type } = req.body;
  const creditIndex = credits.findIndex((credit) => credit.type === type);
  if (creditIndex === -1) {
    res.status(400).json({ message: 'Invalid action type.' });
  } else {
    const newAction: Action = {
      id: queue.length + 1,
      type: type,
    };
    queue.push(newAction);
    res.status(200).json({ message: 'Action added to the queue.' });
  }
});

// Execute the first available action from the queue
router.post('/execute-action', (req: Request, res: Response) => {
  if (queue.length === 0) {
    res.status(400).json({ message: 'Queue is empty.' });
    return;
  }
  const action = queue.find((action) => {
    const creditIndex = credits.findIndex((credit) => credit.type === action.type);
    return creditIndex !== -1 && credits[creditIndex].value > 0;
  });
  if (!action) {
    res.status(400).json({ message: 'No enought credits to execute actions in the queue.' });
    return;
  }
  const creditIndex = credits.findIndex((credit) => credit.type === action.type);
  credits[creditIndex].value--;
  const actionIndex = queue.findIndex((queueAction) => queueAction === action);
  if (actionIndex > -1) {
    queue.splice(actionIndex, 1);
  }
  console.log("actionIndex : " + actionIndex);
  res.status(200).json({ message: 'Action executed.', action: action });
});


// Get the current queue status
router.get('/queue-status', (req: Request, res: Response) => {
  const queueStatus: { queue: Action[]; credits: Credit[] } = {
    queue,
    credits,
  };
  res.status(200).json(queueStatus);
});

export default router;
