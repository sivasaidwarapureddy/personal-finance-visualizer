import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", "#A28DFF"];

export default function CategoryPieChart({ transactions }) {
  const categoryData = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const chartData = Object.keys(categoryData).map((category, index) => ({
    name: category,
    value: categoryData[category],
    color: COLORS[index % COLORS.length],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
       
      <PieChart>
        <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
