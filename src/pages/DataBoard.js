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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
import { CSVLink } from "react-csv";

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

  const handleChange = async (budget) => {
    setCurrentBudget(budget);
    await toast.promise(
      axios
        .post("/dashboard/dataBoard", { userid: userData.email, budget })
        .then((res) => {
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

  const headers = [
    { label: "Date", key: "expenseDate" },
    {
      label: "Expense",
      key: "spentOn",
    },
    {
      label: "Amount",
      key: "amount",
    },
  ];

  const csvReport = {
    filename: "Report.csv",
    headers: headers,
    data: expenses,
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
        <TableContainer
          component={Paper}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Table sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow sx={{ fontWeight: "bolder" }}>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Expense</TableCell>
                <TableCell align="left">Amount</TableCell>
                <TableCell align="left">Delete Item</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((data) => (
                <TableRow
                  key={data._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{data.expenseDate}</TableCell>
                  <TableCell align="left">{data.spentOn}</TableCell>
                  <TableCell align="left">
                    ₹{" "}
                    <CountUp
                      start={0}
                      end={data.amount}
                      duration={1}
                      separator=","
                    ></CountUp>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        deleteItem(data._id, currentBudget);
                      }}
                    >
                      <HighlightOff />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            variant="contained"
            sx={{
              width: "30%",
              margin: "20px",
              backgroundColor: "#71EFA3",
              ":hover": {
                backgroundColor: "#34BE82",
              },
            }}
          >
            <CSVLink {...csvReport}>Export</CSVLink>
          </Button>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default DataBoard;

{
  /* {expenses
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
          : null} */
}
