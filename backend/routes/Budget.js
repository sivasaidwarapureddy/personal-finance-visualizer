// const express = require("express");
// const Budget = require("../models/Budget");
// const router = express.Router();

// // Get all budgets
// router.get("/", async (req, res) => {
//   const budgets = await Budget.find();
//   res.json(budgets);
// });
// router.post("/budgets", async (req, res) => {
//   try {
//     const { category, amount, month } = req.body;
//     if (!month) {
//       return res.status(400).json({ error: "Month is required" });
//     }

//     const newBudget = new Budget({ category, amount, month });
//     await newBudget.save();
//     res.status(201).json(newBudget);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
