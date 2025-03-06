const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  category: { type: String, required: true },  
  month: { type: String, required: true }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
