"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expense = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const expenseSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: {
        type: String,
        enum: ['Food', 'Travel', 'Shopping', 'Other'],
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });
exports.Expense = mongoose_1.default.model('Expense', expenseSchema, 'expenses');
