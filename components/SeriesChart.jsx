import React, { Component, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
const SeriesChart = (props) => {
  const data = Object.entries(props.chartData).map(([year, count]) => ({ year, count }));
  console.log(data)
  return (
    <div className="chart">
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Line type="monotone" dataKey="count" stroke="#ed1f22" />
      </LineChart>
    </div>
  );
};

export default SeriesChart;
