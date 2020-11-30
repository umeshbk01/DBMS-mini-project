const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Please add some text']
    },
    comment: {
        type: String,
        trim: true,
        required: [true, 'Please add some text']
    },
    amount: {
        type: Number,
        required: [true, 'Please add a positive or negative']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" }

});

module.exports = mongoose.model('expense', ExpenseSchema);