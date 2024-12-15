const express = require('express');
const protect = require('../middleware/authMiddleware')
const { getExpenses, addExpense, updateExpense, deleteExpense, expenseSummary } = require('../controller/expenseController')
const router = express.Router()

router.route('/').get(protect, getExpenses).post(protect, addExpense)
router.route('/:id').put(protect, updateExpense).delete(protect, deleteExpense)
router.route('/summary').get(protect, expenseSummary)

module.exports = router