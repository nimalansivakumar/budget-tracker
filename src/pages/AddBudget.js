import {
  TextField,
  FormGroup,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CountUp from "react-countup";
import { CSVLink, CSVDownload } from "react-csv";
import Export from "../components/export";

const AddBudget = ({ userData, fetchUser }) => {
  const [fetchedBudgets, setFetchedBudgets] = useState([]);
  const [newBudget, setBudget] = useState({
    date: "",
    fundAlloted: 0,
    budgetName: "",
  });
  const [download, canDownload] = useState(false);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    await axios
      .get(`/dashboard/addBudget/fetchBudgets/${userData.email}`)
      .then((res) => {
        setFetchedBudgets(res.data);
      });
  };

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
        fetchBudgets();
      });
  };

  const headers = [
    { label: "Date", key: "date" },
    {
      label: "Budget Name",
      key: "budgetName",
    },
    {
      label: "Fund Alloted",
      key: "fundAlloted",
    },
  ];

  const csvReport = {
    filename: "Report.csv",
    headers: headers,
    data: fetchedBudgets,
  };

  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
      <Box
        sx={{
          width: "50%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormGroup
          sx={{
            width: "50%",
            height: "100%",
            justifyContent: "center",
          }}
        >
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
              setBudget({
                ...newBudget,
                fundAlloted: parseInt(e.target.value),
              });
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
      </Box>

      <Box
        sx={{
          width: "50%",
          height: "100%",
          border: "2px solid #2e2e2e",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" component="h6">
          Budgets List
        </Typography>
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
              <TableRow sx={{ fontWeight: "bolder", fontSize: "2rem" }}>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Budget</TableCell>
                <TableCell align="left">Fund</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchedBudgets.map((data) => (
                <TableRow
                  key={data._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{data.date}</TableCell>
                  <TableCell align="left">{data.budgetName}</TableCell>
                  <TableCell align="left">
                    ₹{" "}
                    <CountUp
                      start={0}
                      end={data.fundAlloted}
                      duration={1}
                      separator=","
                    ></CountUp>
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

export default AddBudget;
