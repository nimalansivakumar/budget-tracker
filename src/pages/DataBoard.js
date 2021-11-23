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
  IconButton,
  Button,
  List,
} from "@mui/material";
import {
  MonetizationOn,
  Money,
  AccountBalance,
  HighlightOff,
} from "@mui/icons-material";
import CountUp from "react-countup";
import axios from "axios";
import { toast } from "react-hot-toast";

const BoxTheme = {
  width: "100%",
  height: "30%",
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
  const [expenses, setExpenses] = useState([]);
  const [dataBoardValues, setDataBoardValues] = useState({});
  const [currentBudget, setCurrentBudget] = useState("");

  // const handleChange = async (budget) => {
  //   setCurrentBudget(budget);
  //   await toast.promise(
  //     axios
  //       .post("/dashboard/dataBoard", { userid: userData.email, budget })
  //       .then((res) => {
  //         setFetch(res.data[0].budgets);
  //         setDataBoardValues({
  //           allotedAmount: res.data[0].fundAlloted,
  //           spentAmount: calculateSpent(res.data[0].budgets),
  //           balanceAmount: calculateBalance(res.data[0].fundAlloted),
  //         });
  //       }),
  //     {
  //       loading: "Fetching...",
  //       success: <b>Fetched!</b>,
  //       error: <b>Could not fetch!</b>,
  //     }
  //   );
  // };

  const handleChange = async (budget) => {
    setCurrentBudget(budget);
    await toast.promise(
      axios
        .post("/dashboard/dataBoard", { userid: userData.email, budget })
        .then((res) => {
          console.log(res);
          setExpenses(res.data.expenseList);
          setDataBoardValues(res.data.moneyValues);
        }),
      {
        loading: "Fetching...",
        success: <b>Fetched!</b>,
        error: <b>Could not fetch!</b>,
      }
    );
  };

  const deleteItem = async (itemId, currentBudget) => {
    toast.promise(
      axios
        .post(`/dashboard/dataBoard/deleteItem/${itemId}`, {
          userid: userData.email,
          currentBudget,
        })
        .then(() => {
          handleChange(currentBudget);
        }),
      {
        loading: "Deleting...",
        success: <b>Deleted!</b>,
        error: <b>Could not delete!</b>,
      }
    );
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
          onChange={(e) => {
            handleChange(e.target.value);
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
                ₹{" "}
                <CountUp
                  start={0}
                  end={dataBoardValues.allotedAmount}
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
                ₹{" "}
                <CountUp
                  start={0}
                  end={dataBoardValues.spentAmount}
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
                ₹{" "}
                <CountUp
                  start={0}
                  end={dataBoardValues.balanceAmount}
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
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          overflow: "scroll",
        }}
      >
        {expenses
          ? expenses.map((val) => (
              <List
                key={val._id}
                sx={{
                  width: "50%",
                  height: "50px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  margin: "10px",
                  boxShadow:
                    "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                }}
              >
                <Typography>{val.expenseDate}</Typography>
                <Typography>{val.spentOn}</Typography>
                <Typography>₹ {val.amount}</Typography>
                <Button
                  onClick={() => {
                    deleteItem(val._id, currentBudget);
                  }}
                >
                  <HighlightOff />
                </Button>
              </List>
            ))
          : null}
      </Box>
    </Box>
  );
};

export default DataBoard;
