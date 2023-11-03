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
    { type: 'A', maxCredits: 5 },
    { type: 'B', maxCredits: 10 },
    { type: 'C', maxCredits: 10 },
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
    console.log("action : " + action.type);
    console.log("is : " + credits[creditIndex].type);
    console.log("is : " + credits[creditIndex].value);
    credits[creditIndex].value--;
    const actionIndex = queue.findIndex((queueAction) => queueAction === action);
    if (actionIndex > -1) {
        queue.splice(actionIndex, 1);
    }
    console.log("actionIndex : " + actionIndex);
    res.status(200).json({ message: 'Action executed.', action: action });
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
