const Expense = require('../models/Expense');
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const createExpense = async (req, res) => {
    try {
        const { amount, category, description, date } = req.body;
        const expense = new Expense({ amount, category, description, date, user: req.user.id });
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getExpenses = async (req, res) => {
    try {
        let expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });

        if (expenses.length === 0) {
            const defaultExpense = new Expense({
                amount: 0,
                category: 'General',
                description: 'Welcome! Start adding your expenses.',
                date: new Date(),
                user: req.user.id
            });
            await defaultExpense.save();
            expenses = [defaultExpense];
        }

        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateExpense = async (req, res) => {
    try {
        const updatedExpense = await Expense.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true });
        res.json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteExpense = async (req, res) => {
    try {
        await Expense.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createExpense, getExpenses, updateExpense, deleteExpense, protect };
