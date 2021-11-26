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
import Profile from "./Profile";
import Download from "../components/export";

const Dashboard = ({ userid }) => {
  const [userData, setUserData] = useState({});
  const [budgetNames, setBudgetNames] = useState([]);

  //fetch user details and budgetNames
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    await axios.get(`/dashboard/fetchUser/${userid}`).then((res) => {
      setUserData(res.data.userData[0]);
      setBudgetNames(res.data.budgetList);
    });
  };

  return (
    <Router>
      {userData ? (
        <div>
          <Box sx={{ display: "flex", width: "100%" }}>
            <Box
              sx={{ width: "20%", height: " 91vh", backgroundColor: "#fff" }}
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
                    <Link to="/dashboard/Profile">
                      <Avatar
                        src={userData.picture}
                        sx={{ width: "100px", height: "100px" }}
                      ></Avatar>
                    </Link>
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
                height: "91vh",
                display: "flex",
                flexDirection: "column",
                justify: "center",
                alignItems: "center",
              }}
            >
              <Switch>
                <Route
                  exact
                  path="/dashboard/Profile"
                  component={() => <Profile userData={userData} />}
                />
                <Route
                  exact
                  path="/dashboard/AddBudget"
                  component={() => (
                    <AddBudget userData={userData} fetchUser={fetchUser} />
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
                  component={() => (
                    <DataGraph userData={userData} budgetNames={budgetNames} />
                  )}
                />
                <Route
                  exact
                  path="/dashboard/Notes"
                  component={() => <AddNotes userData={userData} />}
                />
              </Switch>
            </Box>
          </Box>
        </div>
      ) : null}
    </Router>
  );
};

export default Dashboard;
