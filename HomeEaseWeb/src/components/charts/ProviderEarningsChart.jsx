import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Week 1", earnings: 400 },
  { name: "Week 2", earnings: 300 },
  { name: "Week 3", earnings: 500 },
  { name: "Week 4", earnings: 780 },
  { name: "Week 5", earnings: 890 },
  { name: "Week 6", earnings: 390 },
  { name: "Week 7", earnings: 490 },
  { name: "Week 8", earnings: 600 },
];

export function ProviderEarningsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value) => [`$${value}`, "Earnings"]}
          labelFormatter={(label) => `${label}`}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="earnings"
          stroke="hsl(var(--primary))"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
