import { TextField, FormGroup } from "@mui/material";
import React from "react";

const AddBudget = () => {
  return (
    <FormGroup sx={{ width: "30%" }}>
      <TextField
        id="outlined-basic"
        variant="outlined"
        size="small"
        margin="normal"
        type="date"
      />
      <TextField
        id="outlined-basic"
        label="Amount"
        variant="outlined"
        size="small"
        margin="normal"
        type="number"
      />
      <TextField
        id="outlined-basic"
        label="Description"
        variant="outlined"
        size="small"
        margin="normal"
        type="text"
      />
    </FormGroup>
  );
};

export default AddBudget;
