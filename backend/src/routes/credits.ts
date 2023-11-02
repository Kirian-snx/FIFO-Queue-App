import express, { Request, Response } from 'express';
import { ActionType } from '../models/ActionTypes';
import { Credit } from '../models/Credit';

const router = express.Router();
let credits: Credit[] = [];
const actionTypes: ActionType[] = [
  { type: 'A', maxCredits: 100 },
  { type: 'B', maxCredits: 150 },
  { type: 'C', maxCredits: 200 },
];

export const initializeCredits = (actionTypes: ActionType[]): Credit[] => {
  const now = new Date();
  return actionTypes.map((actionType) => {
    const newValue = Math.floor(Math.random() * (actionType.maxCredits * 0.21) + actionType.maxCredits * 0.8);
    const value = newValue > actionType.maxCredits ? actionType.maxCredits : newValue;

    return {
      type: actionType.type,
      value: value,
      lastUpdated: now,
      maxCredits: actionType.maxCredits,
    };
  });
};

export const updateCredits = (credits: Credit[], actionTypes: ActionType[]): void => {
  const now = new Date();
  credits.forEach((credit) => {
    const actionType = actionTypes.find((at) => at.type === credit.type);
    if (!actionType) {
      return;
    }
    if (now.getTime() - new Date(credit.lastUpdated).getTime() >= 24 * 60 * 60 * 1000) {
      const newValue = Math.floor(Math.random() * (actionType.maxCredits * 0.21) + actionType.maxCredits * 0.8);
      const value = newValue > actionType.maxCredits ? actionType.maxCredits : newValue;
      credit.value = value;
      credit.lastUpdated = now;
    }
  });
};

// Get available credits
router.get('/', (req: Request, res: Response) => {
  const creditsWithMax = credits.map((credit) => {
    const actionType = actionTypes.find((at) => at.type === credit.type);
    if (actionType) {
      return { ...credit, maxCredits: actionType.maxCredits };
    }
    return credit;
  });
  res.status(200).json(creditsWithMax);
});

export default router;
