import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { Login, Logout } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { loginWithRedirect, logout, user } = useAuth0();
  const [signedIn, hasSignedIn] = useState(false);
  console.log(user);

  return (
    <div>
      <nav className="w-full h-16 bg-primary flex justify-between items-center">
        <Typography
          variant="h5"
          component="h4"
          className="text-white px-5 font-bold"
        >
          Budget Tracker
        </Typography>
        <ul className="w-1/3 flex justify-around items-center text-white">
          <li className="cursor-pointer">
            <Typography>
              <Link to="/">Home</Link>
            </Typography>
          </li>
          <li className="cursor-pointer">
            <Typography>
              <Link to="/dashboard">Dashboard</Link>
            </Typography>
          </li>
          <Button
            variant="contained"
            startIcon={<Login />}
            className="bg-primary_light"
            onClick={() => {
              loginWithRedirect();
            }}
          >
            <Typography>Login</Typography>
          </Button>
          <Button
            variant="contained"
            startIcon={<Logout />}
            className="bg-primary_light"
            onClick={() => {
              logout();
            }}
          >
            <Typography>Log Out</Typography>
          </Button>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
