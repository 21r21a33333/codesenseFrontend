import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

export const options = {
  title: "Total Score",
  hAxis: { title: "Month", titleTextStyle: { color: "#333" } },
  vAxis: { minValue: 0 },
  colors: ['#76A9FA', '#3F83F8', '#1C64F2', '#1A56DB', '#1E429F'],
  chartArea: { width: "60%", height: "70%" },
};

export default function TotalScoreGraph({ data }) {
  const [selectedYear, setSelectedYear] = useState("2024"); // Initial year
  const [monthlyData, setMonthlyData] = useState({});

  useEffect(() => {
    const monthlyCounts = {};
    const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    data.forEach(entry => {
      const year = new Date(entry.date).getFullYear().toString();
      const month = new Date(entry.date).toLocaleString('default', { month: 'short' });

      if (!monthlyCounts[year]) {
        monthlyCounts[year] = {};
        // Initialize all months to 0
        allMonths.forEach(m => {
          monthlyCounts[year][m] = {
            CodeChef: 0,
            CodeForces: 0,
            HackerRank: 0,
            LeetCode: 0,
            Spoj: 0,
          };
        });
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

  const chartData = [["Month", "CodeChef", "CodeForces", "HackerRank", "LeetCode", "Spoj"]];
  if (monthlyData[selectedYear]) {
    Object.keys(monthlyData[selectedYear]).forEach(month => {
      const { CodeChef, CodeForces, HackerRank, LeetCode, Spoj } = monthlyData[selectedYear][month];
      chartData.push([month, CodeChef, CodeForces, HackerRank, LeetCode, Spoj]);
    });
  }

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
