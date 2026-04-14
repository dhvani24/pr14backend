import mongoose from 'mongoose';

interface IExpense {
  title: string;
  amount: number;
  category: 'Food' | 'Travel' | 'Shopping' | 'Other';
  createdAt: Date;
}

const expenseSchema = new mongoose.Schema<IExpense>(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: {
      type: String,
      enum: ['Food', 'Travel', 'Shopping', 'Other'],
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Expense = mongoose.model<IExpense>('Expense', expenseSchema, 'expenses');
