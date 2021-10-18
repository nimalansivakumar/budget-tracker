import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Money,
  TrackChanges,
  GraphicEq,
  AttachMoney,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import React from "react";
import DataBoard from "./DataBoard";
import DataGraph from "./DataGraph";
import AddBudget from "./AddBudget";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Router>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box sx={{ width: "20%", height: " 90vh", backgroundColor: "#fff" }}>
          <nav className="w-full">
            <List>
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
                      <Money></Money>
                    </ListItemIcon>
                    <ListItemText>Budget</ListItemText>
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <TrackChanges></TrackChanges>
                  </ListItemIcon>
                  <ListItemText>Track Expenses</ListItemText>
                </ListItemButton>
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
            <Route exact path="/dashboard/AddBudget" component={AddBudget} />
            <Route exact path="/dashboard/DataBoard" component={DataBoard} />
            <Route exact path="/dashboard/DataGraph" component={DataGraph} />
          </Switch>
        </Box>
      </Box>
    </Router>
  );
};

export default Dashboard;
