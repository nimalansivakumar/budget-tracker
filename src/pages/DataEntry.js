import React, { useEffect, useState } from "react";
import {
  Box,
  FormGroup,
  TextField,
  Button,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const DataEntry = ({ userData, budgetNames }) => {
  const [expense, setExpense] = useState({
    budgetChose: "",
    date: "",
    amount: 0,
    spentOn: "",
  });

  const handleClick = async () => {
    toast.promise(
      axios.post("/dashboard/DataEntry", { userid: userData.email, expense }),
      {
        loading: "Adding Expenses",
        success: <b>Successfully Added!</b>,
        error: <b>Could not add, try again.</b>,
      }
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FormGroup
        sx={{
          width: "30%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="select-label">Choose Budget</InputLabel>
          <Select
            labelId="select-label"
            label="Choose Budget"
            defaultValue=""
            onChange={(e) => {
              setExpense({ ...expense, budgetChose: e.target.value });
            }}
          >
            {budgetNames.map((name, key) => (
              <MenuItem value={name} key={key}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          margin="normal"
          type="date"
          value={expense.date}
          onChange={(e) => {
            setExpense({ ...expense, date: e.target.value });
          }}
        />
        <TextField
          id="outlined-basic"
          label="Amount"
          variant="outlined"
          size="small"
          margin="normal"
          type="number"
          value={expense.amount}
          onChange={(e) => {
            setExpense({ ...expense, amount: parseInt(e.target.value) });
          }}
        />
        <TextField
          id="outlined-basic"
          label="Spent On"
          variant="outlined"
          size="small"
          margin="normal"
          type="text"
          value={expense.spentOn}
          onChange={(e) => {
            setExpense({ ...expense, spentOn: e.target.value });
          }}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            variant="contained"
            sx={{ width: "40%" }}
            color="success"
            onClick={handleClick}
          >
            Add
          </Button>
          <Button
            variant="contained"
            sx={{ width: "40%" }}
            color="error"
            onClick={() => {
              setExpense({
                date: "",
                amount: 0,
                spentOn: "",
              });
            }}
          >
            Reset
          </Button>
        </Box>
      </FormGroup>
    </Box>
  );
};

export default DataEntry;
