import React from "react";
import Bar from "react-chartjs-2";

const BarChart = (
  <Bar
    data={{
      labels: ["Income", "Spend", "Balance"],
      datasets: [
        {
          label: "People",
          data: [45000, 10000, 35000],
          backgroundColor: [
            "rgb(255, 213, 107)",
            "rgb(89, 245, 128)",
            "rgb(245, 92, 71)",
          ],
          hoverBorderWidth: 3,
          hoverBorderColor: "#fff",
        },
      ],
    }}
    options={{
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      },
    }}
  />
);

const DataGraph = () => {
  return <BarChart />;
};

export default DataGraph;
