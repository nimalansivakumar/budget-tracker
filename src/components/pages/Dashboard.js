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
import DataGraph from "./Graph";
import AddBudget from "./AddBudget";

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ width: "20%", height: " 90vh", backgroundColor: "#fff" }}>
        <nav className="w-full">
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <AttachMoney></AttachMoney>
                </ListItemIcon>
                <ListItemText>Add Budget</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <Money></Money>
                </ListItemIcon>
                <ListItemText>Budget</ListItemText>
              </ListItemButton>
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
              <ListItemButton>
                <ListItemIcon>
                  <GraphicEq></GraphicEq>
                </ListItemIcon>
                <ListItemText>Visualize</ListItemText>
              </ListItemButton>
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
        {/* <DataBoard />
        <AddBudget /> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
