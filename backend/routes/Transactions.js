const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transactions");
const mongoose = require("mongoose");
const moment = require("moment");


// Get transactions with filtering and sorting
// Get all transactions without filtering
router.get("/", async (req, res) => {
  try {
    const { category } = req.query; // Get category from query params
    const filter = category && category !== "All" ? { category } : {}; // Apply filter only if category is selected

    const transactions = await Transaction.find(filter);
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Server error" });
  }
});



// Add a transaction
router.post("/", async (req, res) => {
  try {
    const { amount, date, description, category } = req.body;
    const month = moment(date).format("YYYY-MM"); // Extract month from date

    const newTransaction = new Transaction({ amount, date, description, category, month });
    await newTransaction.save();

    res.status(201).json({ message: "Transaction added successfully", transaction: newTransaction });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Edit a transaction
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid transaction ID" });
  }

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json(updatedTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a transaction
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid transaction ID" });
  }

  try {
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
