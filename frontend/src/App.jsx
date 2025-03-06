import { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import ExpensesChart from "./components/ExpensesChart";
import CategoryPieChart from "./components/CategoryPieChart.jsx";
import Layout from "./Layout.jsx";

export default function App() {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions on mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  const [loading, setLoading] = useState(true);

const fetchTransactions = async () => {
  setLoading(true);
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/transactions`);
    if (!res.ok) throw new Error("Failed to fetch transactions");
    
    const data = await res.json();
    setTransactions(data);
  } catch (error) {
    console.error("Error fetching transactions:", error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchTransactions();
}, []);

  
const addTransaction = async (transaction) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/transactions`,
     {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });

    if (!res.ok) throw new Error("Failed to add transaction");

    await fetchTransactions(); // 🔄 Refresh full list
  } catch (error) {
    console.error("Error adding transaction:", error);
  }
};


  const deleteTransaction = async (id) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/api/transactions/${id}`, { 
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete transaction");

      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <TransactionForm addTransaction={addTransaction} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              {/* Pass transactions & fetch function as props */}
              <TransactionList 
                transactions={transactions} 
                fetchTransactions={fetchTransactions}
                deleteTransaction={deleteTransaction}
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-lg shadow-lg text-white">
              <h2 className="text-xl font-semibold mb-4">Expenses Overview</h2>
              <ExpensesChart transactions={transactions} />
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-700 p-6 rounded-lg shadow-lg text-white">
              <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
              <CategoryPieChart transactions={transactions} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
