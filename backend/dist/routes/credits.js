"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCredits = exports.initializeCredits = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
let credits = [];
const actionTypes = [
    { type: 'A', maxCredits: 5 },
    { type: 'B', maxCredits: 10 },
    { type: 'C', maxCredits: 10 },
];
const initializeCredits = (actionTypes) => {
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
exports.initializeCredits = initializeCredits;
const updateCredits = (credits, actionTypes) => {
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
exports.updateCredits = updateCredits;
// Get available credits
router.get('/', (req, res) => {
    const creditsWithMax = credits.map((credit) => {
        const actionType = actionTypes.find((at) => at.type === credit.type);
        if (actionType) {
            return Object.assign(Object.assign({}, credit), { maxCredits: actionType.maxCredits });
        }
        return credit;
    });
    res.status(200).json(creditsWithMax);
});
exports.default = router;
