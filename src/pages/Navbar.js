import React from "react";
import { Button, Typography } from "@mui/material";
import { Login, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";
import fire from "../components/firebase";
import { Redirect } from "react-router";
import toast from "react-hot-toast";

const Navbar = ({ signedIn, hasSignedIn }) => {
  const handleLogOut = async () => {
    await toast.promise(
      fire
        .auth()
        .signOut()
        .then(() => {
          hasSignedIn({
            userStatus: false,
            userid: "",
          });
        }),
      {
        loading: "Logging Out...",
        success: <b>Successfully Logged Out!</b>,
        error: <b>Could not Log Out.</b>,
      }
    );
  };

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

          {signedIn.userStatus ? (
            <Button
              variant="contained"
              startIcon={<Logout />}
              className="bg-primary_light"
              onClick={handleLogOut}
            >
              <Typography>Log Out</Typography>
            </Button>
          ) : (
            <Link to="/sign-in">
              <Button
                variant="contained"
                startIcon={<Login />}
                className="bg-primary_light"
              >
                <Typography>Login</Typography>
              </Button>
            </Link>
          )}
        </ul>
        {signedIn === false ? <Redirect to="/"></Redirect> : null}
      </nav>
    </div>
  );
};

export default Navbar;
