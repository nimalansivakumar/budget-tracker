import React, { useEffect } from "react";
import { Select, Box, FormControl, InputLabel, MenuItem } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import axios from "axios";
import toast from "react-hot-toast";

ChartJS.register(...registerables);

const DataGraph = ({ userData, budgetNames }) => {
  const labels = ["2017", "2018", "2019", "2020", "2021"];

  const data = {
    labels,
    datasets: [
      {
        label: "Fund",
        data: ["300000", "560000", "450000", "205000", "230000"],
        backgroundColor: "#17D7A0",
      },
      {
        label: "Spend",
        data: ["230000", "500000", "340300", "5000", "30000"],
        backgroundColor: "#FF5151",
      },
      {
        label: "Balance",
        data: ["70000", "60000", "109700", "20000", "200000"],
        backgroundColor: "#88E0EF",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bar Chart for ...",
      },
    },
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FormControl sx={{ width: "40%", margin: "10px" }}>
        <InputLabel id="select-label">Choose Budget</InputLabel>
        <Select
          labelId="select-label"
          label="Choose Budget"
          defaultValue=""
          // onChange={(e) => {
          //   handleChange(e.target.value);
          // }}
        >
          {budgetNames.map((name, key) => (
            <MenuItem value={name} key={key}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ width: "90%", height: "auto" }}>
        <Bar data={data} options={options} />
      </Box>
    </Box>
  );
};
export default DataGraph;
