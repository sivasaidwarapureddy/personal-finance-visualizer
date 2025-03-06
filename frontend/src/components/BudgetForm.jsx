import { useState } from "react";

export default function BudgetForm({ addBudget }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addBudget({ category, amount: Number(amount), month: "2025-03" });
    setCategory("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-lg font-bold">Set Budget</h2>
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter budget"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
}
