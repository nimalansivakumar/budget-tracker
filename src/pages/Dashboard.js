import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";
import {
  TrackChanges,
  GraphicEq,
  AttachMoney,
  Notes,
  LibraryBooks,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import DataBoard from "./DataBoard";
import DataGraph from "./DataGraph";
import AddBudget from "./AddBudget";
import AddNotes from "./Notes";
import DataEntry from "./DataEntry";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)

const Dashboard = ({ userid }) => {
  const [userData, setUserData] = useState({});
  const [budgetNames, setBudgetNames] = useState([]);

  //fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      await axios.get(`/dashboard/fetchUser/${userid}`).then((user) => {
        setUserData(user.data[0]);
      });
    };

    fetchUser();
  }, [userid]);

  //fetch budgetNames entered so far
  useEffect(() => {
    fetchBudgetNames();
  }, []);

  const fetchBudgetNames = async () => {
    var fetchedArray = await axios.get(`/dashboard/fetchBudget/${userid}`);
    setBudgetNames(fetchedArray.data);
  };

  return (
    <Router>
      {userData ? (
        <div>
          <Box sx={{ display: "flex", width: "100%" }}>
            <Box
              sx={{ width: "20%", height: " 90vh", backgroundColor: "#fff" }}
            >
              <nav className="w-full">
                <List>
                  <ListItem
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Avatar
                      src={userData.picture}
                      sx={{ width: "100px", height: "100px" }}
                    ></Avatar>
                    <Typography
                      variant="h5"
                      component="h5"
                      sx={{ fontSize: "20px", textAlign: "center" }}
                    >
                      {userData.firstname + " " + userData.lastname}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Link to="/dashboard/AddBudget">
                      <ListItemButton>
                        <ListItemIcon>
                          <AttachMoney></AttachMoney>
                        </ListItemIcon>
                        <ListItemText>Add Budget</ListItemText>
                      </ListItemButton>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/dashboard/DataEntry">
                      <ListItemButton>
                        <ListItemIcon>
                          <LibraryBooks></LibraryBooks>
                        </ListItemIcon>
                        <ListItemText>Data Entry</ListItemText>
                      </ListItemButton>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/dashboard/DataBoard">
                      <ListItemButton>
                        <ListItemIcon>
                          <TrackChanges></TrackChanges>
                        </ListItemIcon>
                        <ListItemText>Track Expenses</ListItemText>
                      </ListItemButton>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/dashboard/DataGraph">
                      <ListItemButton>
                        <ListItemIcon>
                          <GraphicEq></GraphicEq>
                        </ListItemIcon>
                        <ListItemText>Visualize</ListItemText>
                      </ListItemButton>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/dashboard/Notes">
                      <ListItemButton>
                        <ListItemIcon>
                          <Notes></Notes>
                        </ListItemIcon>
                        <ListItemText>Notes</ListItemText>
                      </ListItemButton>
                    </Link>
                  </ListItem>
                </List>
              </nav>
            </Box>
            <Box
              sx={{
                width: "80%",
                height: "90vh",
                display: "flex",
                flexDirection: "column",
                justify: "center",
                alignItems: "center",
              }}
            >
              <Switch>
                <Route
                  exact
                  path="/dashboard/AddBudget"
                  component={() => (
                    <AddBudget
                      userData={userData}
                      fetchBudgetNames={fetchBudgetNames}
                    />
                  )}
                />
                <Route
                  exact
                  path="/dashboard/DataEntry"
                  component={() => (
                    <DataEntry
                      userData={userData}
                      budgetNames={budgetNames}
                      setBudgetNames={setBudgetNames}
                    />
                  )}
                />
                <Route
                  exact
                  path="/dashboard/DataBoard"
                  component={() => (
                    <DataBoard userData={userData} budgetNames={budgetNames} />
                  )}
                />
                <Route
                  exact
                  path="/dashboard/DataGraph"
                  component={DataGraph}
                />
                <Route exact path="/dashboard/Notes" component={AddNotes} />
              </Switch>
            </Box>
          </Box>
        </div>
      ) : null}
    </Router>
  );
};

export default Dashboard;
