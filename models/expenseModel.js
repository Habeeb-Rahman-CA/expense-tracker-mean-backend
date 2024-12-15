const mongoose = require('mongoose')

const expenseScheme = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now() }
}, {
    timestamps: true
})

module.exports = mongoose.model("Expenses", expenseScheme)