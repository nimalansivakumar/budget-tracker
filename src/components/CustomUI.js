import React from "react";
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

const theme = () => {
  return <ThemeProvider theme={customTheme}></ThemeProvider>;
};

export default theme;
