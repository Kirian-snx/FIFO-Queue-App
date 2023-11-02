"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const credits_1 = require("./credits");
const router = express_1.default.Router();
const queue = [];
const actionTypes = [
    { type: 'A', maxCredits: 100 },
    { type: 'B', maxCredits: 150 },
    { type: 'C', maxCredits: 200 },
];
let credits = (0, credits_1.initializeCredits)(actionTypes);
setInterval(credits_1.updateCredits, 24 * 60 * 60 * 1000);
// Add a new action to the queue
router.post('/add-action', (req, res) => {
    const { type } = req.body;
    const creditIndex = credits.findIndex((credit) => credit.type === type);
    if (creditIndex === -1) {
        res.status(400).json({ message: 'Invalid action type.' });
    }
    else {
        const newAction = {
            id: queue.length + 1,
            type: type,
        };
        queue.push(newAction);
        res.status(200).json({ message: 'Action added to the queue.' });
    }
});
// Execute the first available action from the queue
router.post('/execute-action', (req, res) => {
    if (queue.length === 0) {
        res.status(400).json({ message: 'Queue is empty.' });
    }
    else {
        const action = queue.shift();
        if (action) {
            const creditIndex = credits.findIndex((credit) => credit.type === action.type);
            if (creditIndex === -1 || credits[creditIndex].value <= 0) {
                res.status(400).json({ message: 'Insufficient credits for this action.' });
            }
            else {
                credits[creditIndex].value--;
                res.status(200).json({ message: 'Action executed.' });
            }
        }
        else {
            res.status(500).json({ message: 'Error executing action.' });
        }
    }
});
// Get the current queue status
router.get('/queue-status', (req, res) => {
    const queueStatus = {
        queue,
        credits,
    };
    res.status(200).json(queueStatus);
});
exports.default = router;
