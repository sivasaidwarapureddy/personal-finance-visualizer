import { useState } from "react";

const categories = ["Food", "Transport", "Shopping", "Entertainment", "Bills", "Other"];

export default function TransactionForm({ addTransaction }) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!amount || !date || !description) {
      setError("All fields are required.");
      return;
    }

    const transaction = {
      amount: parseFloat(amount),
      date,
      description,
      category,
    };

    try {
      await addTransaction(transaction); // Ensure this function is async if it makes an API call
      setAmount("");
      setDate("");
      setDescription("");
      setCategory(categories[0]);
      setError(""); // Clear error on success
    } catch (err) {
      console.error("Error adding transaction:", err);
      setError("Failed to add transaction. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg space-y-3">
      <h1 className="text-2xl font-bold text-blue-500 mb-4">Add Transaction</h1>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded">
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Add Transaction
      </button>
    </form>
  );
}
