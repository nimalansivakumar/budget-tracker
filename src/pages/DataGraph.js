import React, { useEffect, useRef } from "react";
import Bar from "react-chartjs-2";

const data = {
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
};

const options = {
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      beginAtZero: true,
    },
  },
};

const DataGraph = () => {

  const componentRef = useRef();
  return (
    <div>
      <h1>Bar example</h1>
      <Bar data={data} options={options} ref={componentRef} />
    </div>
  );
};

export default DataGraph;
