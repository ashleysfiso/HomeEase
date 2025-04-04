import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Cleaning", bookings: 240 },
  { name: "Plumbing", bookings: 180 },
  { name: "Electrical", bookings: 150 },
  { name: "Gardening", bookings: 120 },
  { name: "Painting", bookings: 90 },
];

export function ServiceDemandChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value) => [`${value}`, "Bookings"]}
          labelFormatter={(label) => `Service: ${label}`}
        />
        <Legend />
        <Bar dataKey="bookings" fill="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  );
}
