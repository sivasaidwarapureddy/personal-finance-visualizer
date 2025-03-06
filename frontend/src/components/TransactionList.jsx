import { useState, useEffect } from "react";

const categories = ["All", "Food", "Transport", "Shopping", "Entertainment", "Bills", "Other"];

export default function TransactionsList({ transactions, fetchTransactions, deleteTransaction }) {
  const [category, setCategory] = useState("All");
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  useEffect(() => {
    if (category === "All") {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(transactions.filter(t => t.category === category));
    }
  }, [category, transactions]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-bold">Transactions</h2>

      {/* Category Filter */}
      <div className="flex space-x-2 mb-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Transaction List */}
      <ul className="space-y-2">
        {filteredTransactions.length === 0 ? (
          <p className="text-gray-500">No transactions found.</p>
        ) : (
          filteredTransactions.map((t) => (
            <li key={t._id} className="p-2 bg-white rounded shadow flex justify-between items-center">
              <span>{t.description}</span>
              <span>{t.amount} ₹</span>
              <span className="text-sm text-gray-500">{new Date(t.date).toLocaleDateString()}</span>
              <button
                onClick={() => deleteTransaction(t._id)}
                className="p-1 bg-red-500 text-white rounded"
              >
                ❌
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
