import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Navbar from "./components/pages/Navbar";
import Dashboard from "./components/pages/Dashboard";
import PrivateRoute from "./components/Routes/PrivateRoute";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#082032",
      light: "#334756",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h4: {
      fontWeight: "bolder",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#334756",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
