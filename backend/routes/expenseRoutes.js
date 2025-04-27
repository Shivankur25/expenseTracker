const express = require('express');
const { createExpense, getExpenses, updateExpense, deleteExpense, protect } = require('../controllers/expenseController');
const router = express.Router();

router.post('/create', protect, createExpense);
router.get('/', protect, getExpenses);
router.put('/:id', protect, updateExpense);
router.delete('/:id', protect, deleteExpense);

module.exports = router;
