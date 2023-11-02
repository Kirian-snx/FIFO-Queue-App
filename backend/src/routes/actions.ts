import express, { Request, Response } from 'express';
import { Action } from '../models/Action';
import { Credit } from '../models/Credit';
import { initializeCredits, updateCredits } from './credits';
import { ActionType } from '../models/ActionTypes';

const router = express.Router();
const queue: Action[] = [];
const actionTypes: ActionType[] = [
  { type: 'A', maxCredits: 100 },
	{ type: 'B', maxCredits: 150 },
	{ type: 'C', maxCredits: 200 },
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
  } else {
    const action = queue.shift();
    if (action) {
      const creditIndex = credits.findIndex((credit) => credit.type === action.type);
      if (creditIndex === -1 || credits[creditIndex].value <= 0) {
        res.status(400).json({ message: 'Insufficient credits for this action.' });
      } else {
        credits[creditIndex].value--;
        res.status(200).json({ message: 'Action executed.' });
      }
    } else {
      res.status(500).json({ message: 'Error executing action.' });
    }
  }
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
