import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./Routes/PrivateRoute";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";



const customTheme = createTheme({
  palette: {
    color1: "#082032",
    green: "#4E9F3D",
    gray: "#EEEEEE",
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

function App() {
  const [signedIn, hasSignedIn] = useState({
    userStatus: false,
    userid: "",
  });

  return (
    <ThemeProvider theme={customTheme}>
      <Toaster></Toaster>
      <Router>
        <Navbar signedIn={signedIn} hasSignedIn={hasSignedIn} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/sign-in"
            component={() => (
              <SignIn signedIn={signedIn} hasSignedIn={hasSignedIn} />
            )}
          />
          <PrivateRoute
            path="/dashboard"
            component={() => <Dashboard userid={signedIn.userid} />}
            signedIn={signedIn}
          ></PrivateRoute>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
