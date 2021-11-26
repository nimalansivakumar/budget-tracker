import React from "react";
import { Box, Card, Typography, Avatar } from "@mui/material";
const Profile = ({ userData }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#ebebeb",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: "50%",
          height: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
          ":hover": {
            boxShadow:
              " 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
            transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
          },
        }}
      >
        <Avatar
          src={userData.picture}
          sx={{ width: "100px", height: "100px" }}
        ></Avatar>
        <Typography variant="h5" compoennt="h3">
          {userData.firstname + " " + userData.lastname}
        </Typography>
        <Typography variant="subtitle1" component="div">
          {userData.email}
        </Typography>
        <Box>
          <Box>
            <Typography variant="subtitle1" component="div">
              
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default Profile;
