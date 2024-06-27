import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  title: "OVERALL CODING PLATFORM PROGRESS",
  is3D: true,
  pieSliceText: "percentage",
  slices: {
    0: { color: "brown" },    // CodeChef
    1: { color: "blue" },     // CodeForces
    2: { color: "green" },    // HackerRank
    3: { color: "darkorange" },   // LeetCode
    4: { color: "purple" }    // SPOJ
  }
};

export default function Piechart(props) {
  console.log(props.data);
  const data = props.data;
  
  // Only take the last element of the data array
  const lastEntry = data[data.length - 1];

  // Create formattedData based on the last entry
  const formattedData = [
    ["Platform", "Total Solved"],
    ["CodeChef", lastEntry.codechef_total_solved],
    ["CodeForces", lastEntry.codeforces_total_solved],
    ["HackerRank", lastEntry.hackerrank_total_solved],
    ["LeetCode", lastEntry.leetcode_total_solved],
    ["SPOJ", lastEntry.spoj_total_solved]
  ];

  return (
    <Chart
      chartType="PieChart"
      data={formattedData}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
