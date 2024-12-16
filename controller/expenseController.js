const { default: mongoose } = require('mongoose')
const Expenses = require('../models/expenseModel')

const getExpenses = async (req, res) => {
    try {
        const expenses = await Expenses.find({ user: req.user }).sort({ date: -1 })
        res.status(200).json(expenses)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const addExpense = async (req, res) => {
    const { title, amount, category } = req.body
    if (!title || !amount || !category) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const newExpense = new Expenses({
            user: req.user, title, amount, category
        })

        const saveExpense = await newExpense.save()
        res.status(200).json(saveExpense)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updateExpense = async (req, res) => {
    const id = req.params.id
    const { title, amount, category } = req.body
    try {
        const updatedExpense = await Expenses.findByIdAndUpdate(id, {
            title, amount, category,
        }, { new: true })
        if (!updatedExpense) return res.status(404).json({ message: "Expense not found" });
        res.status(200).json(updatedExpense)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteExpense = async (req, res) => {
    const id = req.params.id
    try {
        const deletedExpense = await Expenses.findByIdAndDelete(id)
        if (!deletedExpense) return res.status(404).json({ message: "Expense not found" });
        res.status(200).json({ message: "Deleted Successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const expenseSummary = async (req, res) => {
    try {
        const summary = await Expenses.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(req.user) } },
            { $group: { _id: "$category", total: { $sum: "$amount" } } },
            { $sort: { total: -1 } }
        ])
        res.status(200).json(summary)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { getExpenses, addExpense, updateExpense, deleteExpense, expenseSummary }