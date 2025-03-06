import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ExpensesChart = ({ transactions }) => {
  // Group transactions by month
  const monthlyData = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString("default", { month: "short" });
    acc[month] = (acc[month] || 0) + t.amount;
    return acc;
  }, {});

  // Convert to Recharts format
  const chartData = Object.keys(monthlyData).map((month) => ({
    name: month,
    amount: monthlyData[month],
  }));

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensesChart;
