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

export function ServiceDemandChart({ data }) {
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
