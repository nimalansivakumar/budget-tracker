import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Icon,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { MonetizationOn, Money, AccountBalance } from "@mui/icons-material";
import CountUp from "react-countup";
import axios from "axios";

const BoxTheme = {
  width: "100%",
  height: "100%",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
};

const CardTheme = {
  width: "25%",
  height: "70%",
  backgroundColor: "#082032",
  display: "flex",
  justifyContent: "space-around",
};

const CardContentTheme = {
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
};

const DataBoard = ({ userData, budgetNames }) => {
  const [budget, setBudget] = useState("");

  const handleChange = async () => {
    axios.post("/dashboard/DataEntry", { email: userData.email, budget });
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "30%",
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
          onChange={(e) => {
            setBudget(e.target.value);
            handleChange();
          }}
        >
          {budgetNames.map((name, key) => (
            <MenuItem value={name} key={key}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={BoxTheme}>
        <Card sx={CardTheme}>
          <CardContent sx={CardContentTheme}>
            <Box>
              <Typography variant="h6" component="h6" color="white">
                Fund Alloted
              </Typography>
              <Typography variant="h6" component="h6" color="white">
                <CountUp
                  start={0}
                  end={45000}
                  duration={1.75}
                  separator=","
                ></CountUp>
              </Typography>
            </Box>
            <Icon sx={{ color: "#fff", height: "100%" }}>
              <MonetizationOn></MonetizationOn>
            </Icon>
          </CardContent>
        </Card>
        <Card sx={CardTheme}>
          <CardContent sx={CardContentTheme}>
            <Box>
              <Typography variant="h6" component="h6" color="white">
                Spend
              </Typography>
              <Typography variant="h6" component="h6" color="white">
                <CountUp
                  start={0}
                  end={10000}
                  duration={1.75}
                  separator=","
                ></CountUp>
              </Typography>
            </Box>
            <Icon sx={{ color: "#fff", height: "100%" }}>
              <Money></Money>
            </Icon>
          </CardContent>
        </Card>
        <Card sx={CardTheme}>
          <CardContent sx={CardContentTheme}>
            <Box>
              <Typography variant="h6" component="h6" color="white">
                Balance
              </Typography>
              <Typography variant="h6" component="h6" color="white">
                <CountUp
                  start={0}
                  end={35000}
                  duration={1.75}
                  separator=","
                ></CountUp>
              </Typography>
            </Box>
            <Icon sx={{ color: "#fff", height: "100%" }}>
              <AccountBalance></AccountBalance>
            </Icon>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default DataBoard;
