import { TextField, FormGroup, Button, Box } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddBudget = ({ userData, fetchUser }) => {
  const [newBudget, setBudget] = useState({
    date: "",
    fundAlloted: 0,
    budgetName: "",
  });

  const createBudget = async () => {
    toast
      .promise(
        axios.post(`/dashboard/addBudget`, {
          id: userData.email,
          newBudget,
        }),
        {
          loading: "Creating Budget...",
          success: <b>Budget Created</b>,
          error: <b>Could not create.</b>,
        }
      )
      .then(() => {
        fetchUser();
      });
  };

  return (
    <FormGroup sx={{ width: "30%", height: "100%", justifyContent: "center" }}>
      <TextField
        id="outlined-basic"
        variant="outlined"
        size="small"
        margin="normal"
        type="date"
        value={newBudget.date}
        onChange={(e) => {
          setBudget({ ...newBudget, date: e.target.value });
        }}
      />
      <TextField
        id="outlined-basic"
        label="Fund Allotted"
        variant="outlined"
        size="small"
        margin="normal"
        type="number"
        value={newBudget.fundAlloted}
        onChange={(e) => {
          setBudget({ ...newBudget, fundAlloted: parseInt(e.target.value) });
        }}
      />
      <TextField
        id="outlined-basic"
        label="Budget Name"
        variant="outlined"
        size="small"
        margin="normal"
        type="text"
        value={newBudget.budgetName}
        onChange={(e) => {
          setBudget({ ...newBudget, budgetName: e.target.value });
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
          onClick={createBudget}
        >
          Create
        </Button>
        <Button
          variant="contained"
          sx={{ width: "40%" }}
          color="error"
          onClick={() => {
            setBudget({
              date: "",
              fundAlloted: 0,
              budgetName: "",
            });
          }}
        >
          Reset
        </Button>
      </Box>
    </FormGroup>
  );
};

export default AddBudget;
