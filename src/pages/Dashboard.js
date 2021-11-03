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
  Money,
  TrackChanges,
  GraphicEq,
  AttachMoney,
  Notes,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import DataBoard from "./DataBoard";
import DataGraph from "./DataGraph";
import AddBudget from "./AddBudget";
import AddNotes from "./Notes";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Dashboard = ({ userid }) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      await axios.get(`/dashboard/${userid}`).then((user) => {
        setUserData(user.data[0]);
      });
    };
    fetchUser();
  }, []);
  console.log(userid);

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
                  component={() => <AddBudget userData={userData} />}
                />
                <Route
                  exact
                  path="/dashboard/DataBoard"
                  component={DataBoard}
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
