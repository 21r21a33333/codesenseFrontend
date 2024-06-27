import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
  title: "OVERALL CODING PLATFORM PROGRESS",
  is3D: true,
  colors: ['#76A9FA', '#3F83F8', '#1C64F2', '#1A56DB', '#1E429F'],
};

export default function Piechart() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}

