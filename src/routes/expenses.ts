import express, { Router } from 'express';
import { Expense } from '../models/Expense';
import { Server as SocketIOServer } from 'socket.io';

export const createExpensesRouter = (io: SocketIOServer) => {
  const router = Router();

  // GET all expenses
  router.get('/', async (req, res) => {
    try {
      const expenses = await Expense.find().sort({ createdAt: -1 });
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching expenses', error });
    }
  });

  // POST new expense
  router.post('/', async (req, res) => {
    try {
      const { title, amount, category } = req.body;

      if (!title || !amount || !category) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const expense = new Expense({
        title,
        amount: parseFloat(amount),
        category,
      });

      await expense.save();

      // Broadcast to all connected clients
      io.emit('expense-added', expense);

      res.status(201).json(expense);
    } catch (error) {
      res.status(500).json({ message: 'Error creating expense', error });
    }
  });

  // DELETE expense
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const expense = await Expense.findByIdAndDelete(id);

      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }

      // Broadcast to all connected clients
      io.emit('expense-deleted', id);

      res.json({ message: 'Expense deleted', expense });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting expense', error });
    }
  });

  return router;
};
