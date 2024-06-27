import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

export const options = {
  title: "Total Score",
  hAxis: { title: "Month", titleTextStyle: { color: "#333" } },
  vAxis: { minValue: 0 },
  chartArea: { width: "80%", height: "70%" },
  colors: ["#964B00", "#2196F3", "#4CAF50", "#FF9800", "#9C27B0"],
  
};

export default function TotalScoreGraph({ data }) {
  const [selectedYear, setSelectedYear] = useState("2024"); // Initial year
  const [monthlyData, setMonthlyData] = useState({});

  // Transform data into monthly counts for all years
  useEffect(() => {
    const monthlyCounts = {};

    data.forEach(entry => {
      const year = new Date(entry.date).getFullYear().toString();
      const month = new Date(entry.date).toLocaleString('default', { month: 'short' });

      if (!monthlyCounts[year]) {
        monthlyCounts[year] = {};
      }
      if (!monthlyCounts[year][month]) {
        monthlyCounts[year][month] = {
          CodeChef: 0,
          CodeForces: 0,
          HackerRank: 0,
          LeetCode: 0,
          Spoj: 0,
        };
      }

      monthlyCounts[year][month].CodeChef += parseInt(entry.codechef_solved_today);
      monthlyCounts[year][month].CodeForces += parseInt(entry.codeforces_solved_today);
      monthlyCounts[year][month].HackerRank += parseInt(entry.hackerrank_solved_today);
      monthlyCounts[year][month].LeetCode += parseInt(entry.leetcode_solved_today);
      monthlyCounts[year][month].Spoj += parseInt(entry.spoj_solved_today);
    });

    setMonthlyData(monthlyCounts);
  }, [data]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // Prepare chart data based on selected year
  const chartData = [["Month", "CodeChef", "CodeForces", "HackerRank", "LeetCode", "Spoj"]];
  if (monthlyData[selectedYear]) {
    Object.keys(monthlyData[selectedYear]).forEach(month => {
      const { CodeChef, CodeForces, HackerRank, LeetCode, Spoj } = monthlyData[selectedYear][month];
      chartData.push([month, CodeChef, CodeForces, HackerRank, LeetCode, Spoj]);
    });
  }

  // Derive available years from monthlyData
  const years = Object.keys(monthlyData);

  return (
    <div>
      <select value={selectedYear} onChange={handleYearChange}>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <Chart
        chartType="AreaChart"
        width="100%"
        height="400px"
        data={chartData}
        options={options}
      />
    </div>
  );
}
